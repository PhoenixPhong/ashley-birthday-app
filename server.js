import * as dotenv from "dotenv";
dotenv.config()

import express from "express";

import { S3Client, 
  GetObjectCommand,
  PutObjectCommand, 
  DeleteObjectCommand,
  CopyObjectCommand,
  ListObjectsCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {SESClient, SendEmailCommand} from "@aws-sdk/client-ses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { 
  DynamoDBDocumentClient, 
  PutCommand, 
  ScanCommand, 
  UpdateCommand, 
  DeleteCommand ,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";


import twilio from "twilio";

import {v4 as uuid} from "uuid";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

import path, {dirname} from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;
const app = express();

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

const s3Client = new S3Client({
    region: "us-east-1",
    credentials
})

const sesClient = new SESClient({
    region: "us-east-1",
    credentials
})

const dynamoDbClient = new DynamoDBClient({
    region: "us-east-1",
    credentials
});

const dynamoDbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);


const twilioClient = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

app.use(cookieParser());
app.use(express.static("public", {extensions: ["js"]}));
app.use(express.json());

const checkAuth = async (req, res, next) => {
    if(req.cookies.auth) {
      const jwtVerified = jwt.verify(req.cookies.auth, process.env.JWT_SECRET);

      if(jwtVerified) {
        next();
      }
    } else {
      res.status(401).json({success: false, error_message: "BAD_AUTH"});
      return res.end();
    }
}

app.post("/api/admin/check-auth", async (req, res) => {
    if(req.cookies.auth) {
      const jwtVerified = jwt.verify(req.cookies.auth, process.env.JWT_SECRET);

      if(jwtVerified) {
        res.json({success: true})
        return res.end();
      }
    }

    res.json({success: false})
})

app.get("/api/admin/posts", checkAuth, async (req, res) => {
    try {
      const data = await dynamoDbDocClient.send(new ScanCommand({TableName: "ashley-birthday-app-user-posts"}));
      console.log(data.Items);
      res.json({success: true, data: data.Items})
    } catch(err) {
      console.log(err);
      res.status(500).json({success: false, data: []});
    }
})

app.post("/api/admin/post/:id", checkAuth, async (req, res) => {
    const {date_added, approved, files} = req.body;
    console.log("From admin post!");
    console.log("Params: ", req.params.id);
    console.log("Files Arr: ", files)
    try {
        const dynamoParams = {
          TableName: "ashley-birthday-app-user-posts",
          Key: {
            id: req.params.id,
            date_added
          },
          UpdateExpression: `set approved = :approved`,
          ExpressionAttributeValues: {
            ":approved": approved ? 1 : 0,
          }
      };
      const dynamoData = await dynamoDbDocClient.send(new UpdateCommand(dynamoParams));
      console.log(dynamoData);

      if(approved) {
          for await (const file of files) {
            const copyParams = {
              Bucket: "ashley-birthday-public",
              // Need to encode URI component to handle cases with image/svg+xml
              CopySource: encodeURIComponent(`wyzant-birthday-tutorial-0/user-uploads/${file.name}`),
              Key: `user-uploads/${file.name}`
            };

            const deleteParams = {
              Bucket: "wyzant-birthday-tutorial-0",
        
              Key: `user-uploads/${file.name}`
            };

            console.log("Copy Params: ", copyParams);
            console.log("Delte Params: ", deleteParams);

            const copyRes = await s3Client.send(new CopyObjectCommand(copyParams));
            console.log("Copied Data!: ", copyRes);

            const deleteRes = await s3Client.send(new DeleteObjectCommand(deleteParams));
            console.log("Deleted Data!: ", deleteRes);
          }
      }
      res.json({success: true})
    } catch(err) {
        console.log(err);

    }
})

app.delete("/api/admin/post/:id", checkAuth, async (req, res) => {
  console.log("From admin post!");
  console.log("Params: ", req.params.id);
  const {date_added, files} = req.body;
  try {
      const dynamoParams = {
        TableName: "ashley-birthday-app-user-posts",
        Key: {
          id: req.params.id,
          date_added
        }
    };
    const dynamoData = await dynamoDbDocClient.send(new DeleteCommand(dynamoParams));
    console.log(dynamoData)

    for await (const file of files) {
      const params = {
        Bucket: "ashley-birthday-public",
        Key: `user-uploads/${file.name}`
      };

      console.log("Params: ", params);

      const data = await s3Client.send(new DeleteObjectCommand(params));
      console.log("Deleted Data!: ", data);
    }
    res.json({success: true})
  } catch(err) {
      console.log(err);
      res.json({success: false});
  }
})

app.post("/api/admin/login", async (req, res) => {
  const jwtExpiresSeconds = 604800;
  const cookieMaxAgeMillSeconds = 604800 * 1000;

  const {username, password} = req.body;

  if(req.cookies.auth) {
    const jwtVerified = jwt.verify(req.cookies.auth, process.env.JWT_SECRET);

    if(jwtVerified) {
      const accessToken = jwt.sign({user: "admin"}, process.env.JWT_SECRET, {expiresIn: jwtExpiresSeconds})
      res.cookie("auth", accessToken, {maxAge: cookieMaxAgeMillSeconds, httpOnly: true});
      res.json({success: true})
      return res.end();
    }
  }

  const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
  const passCompare = await bcrypt.compare(password, hashPassword);

  if(passCompare) {
    const accessToken = jwt.sign({user: "admin"}, process.env.JWT_SECRET, {expiresIn: jwtExpiresSeconds})
    res.cookie("auth", accessToken, {maxAge: cookieMaxAgeMillSeconds, httpOnly: true});
    res.json({success: true})
  } else {
    res.json({success: false})
  }
})

app.post("/api/admin/get-post-signed-urls", checkAuth, async (req, res) => {
  const {files, approved} = req.body;
  const signedURLs = [];

  console.log("Files: ", files);

  for await (const file of files) {
    const bucketParams = {
        Bucket: approved ? `ashley-birthday-public` : `wyzant-birthday-tutorial-0`,
        Key: `user-uploads/${file.name}`
    };

    const command = new GetObjectCommand(bucketParams);
    // Create the presigned URL.
    try {
      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600
      });

      signedURLs.push({origninalFileName: file.name, fileType: file.type, signedUrl})
    } catch(err) {
      console.log(err);
      res.status(500).json({succes: false, data: []})
      res.end();
    }
  }

  console.log(signedURLs);
  res.status(200).json({success: true, data: signedURLs})
})

app.post("/api/admin/logout", async (req, res) => {
  res.clearCookie("auth", {httpOnly: true});
  res.json({success: true})
});

app.post("/api/message/get-urls", async (req, res) => {
    const {files, name} = req.body;
    const signedURLs = [];

    const uploaderName = name || "anonymous";

     for await (const file of files) {
        const uniqueName = encodeURIComponent(`${uuid()}.${file.type.replace(/image\/|video\//i, "")}`);
        const bucketParams = {
            Bucket: `wyzant-birthday-tutorial-0`,
            // Need to encode URI to handle image/svg+xml
            Key: `user-uploads/${uniqueName}`,
            ContentType: `${file.type}`
        };

        const newFileName = bucketParams.Key.replace("user-uploads/", "");
        const shortFileName = null;

        const command = new PutObjectCommand(bucketParams);
        // Create the presigned URL.
        try {
          const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600
          });

          signedURLs.push({origninalFileName: file.name, newFileName, signedUrl, fileType: file.type})
        } catch(err) {
          console.log(err);
          res.status(500).json({succes: false, signedURLs: []})
          res.end();
        }
    }

    console.log(signedURLs);
    res.status(200).json({success: true, signedURLs})
})

app.post("/api/message/request", async (req, res) => {
    const {files, name, message, email} = req.body;
    console.log(req.body)

    try {
        const dynamoParams = {
            TableName: "ashley-birthday-app-user-posts",
            Item: {
              id: uuid(),
              date_added: new Date().toISOString(),
              files: JSON.stringify(files),
              name,
              message,
              email,
              approved: 0
            }
        };
        const dynamoData = await dynamoDbDocClient.send(new PutCommand(dynamoParams));
        console.log(dynamoData)
        
        res.status(200).json(req.body)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message})
    }
});

app.get("/api/public/uploads", async (req, res) => {
  try {
    const dynamoParams = {
        TableName: "ashley-birthday-app-user-posts",
        IndexName: "approved-index",
        KeyConditionExpression: "approved = :approved",
        ExpressionAttributeValues: {
            ":approved": 1
          }
        };

        const dynamoData = await dynamoDbDocClient.send(new QueryCommand(dynamoParams));
        console.log(dynamoData)
        const projectedResponse = dynamoData.Items.map(({files, message, name}) => ({files, message, name}))
        res.json({success: true, data: projectedResponse})
        } catch (err) {
          console.log(err);
          res.status(500).json({success: false, data: []})
        }
})

app.get("/api/public/media/all", async (req, res) => {
  const params = {
    Bucket: "ashley-birthday-public"
  }

  try {
    const listRes = await s3Client.send(new ListObjectsCommand(params));
    console.log(listRes);
    res.json({success: true, data: listRes.Contents});
  } catch(err) {
    console.log(err);
    res.json({success: false, data: []})
  }
})


app.post("/api/contact/sms", async (req, res) => {
    try {
        const smsSentRes = await twilioClient.messages
            .create({body: 'Hi there', from: process.env.TWILIO_PHONE_NUMBER, to: "+12407515698"})
        console.log(smsSentRes);
        res.status(200).json({success: true})
    } catch(err) {
        console.log(err.message);
        res.status(500).json({error: err.message})
    }
}) 

app.post("/api/contact/send", async (req, res) => {
    console.log(req.body);

    const createSendEmailCommand = (toAddress, fromAddress) => {
        return new SendEmailCommand({
          Destination: {
            /* required */
            CcAddresses: [
              /* more items */
            ],
            ToAddresses: [
              toAddress,
              /* more To-email addresses */
            ],
          },
          Message: {
            /* required */
            Body: {
              /* required */
              Html: {
                Charset: "UTF-8",
                Data: "HTML_FORMAT_BODY",
              },
              Text: {
                Charset: "UTF-8",
                Data: "TEXT_FORMAT_BODY",
              },
            },
            Subject: {
              Charset: "UTF-8",
              Data: "EMAIL_SUBJECT",
            },
          },
          Source: fromAddress,
          ReplyToAddresses: [
            /* more items */
          ],
        });
      };

      const sendEmailCommand = createSendEmailCommand(
        "itsyaboijojohereagain@gmail.com",
        "itsyaboijojohereagain@gmail.com"
      );
    
      try {
        await sesClient.send(sendEmailCommand);
        res.status(200).json({success: true})
      } catch (err) {
        console.error("Failed to send email.");
        res.status(500).json({error: err.message})
      }
})

app.get("/upload-memories", (req, res) => {
  res.sendFile(path.join(__dirname, "public/upload-memories.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => console.log(`Process listening on port ${PORT}...`));