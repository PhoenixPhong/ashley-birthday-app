const userUploadGallerySectionEl = document.getElementById("section__user-upload-gallery");

const getUserUploadObjects = async () => {
    const response = await fetch("/api/public/uploads");
    const {success, data} = await response.json();

    if(success) {
        console.log("User Uploads: ", data);
        if(data.length < 1) return; 

        for (const {files, message, name} of data) {
            const newUserUploadDisplayEl = document.createElement("div");
            newUserUploadDisplayEl.classList.add("user-upload-container");

            const newUserUploadDisplayElContent = document.createElement("div");
            const newUserUploadDisplayElContentName = document.createElement("h3");
            const newUserUploadDisplayElContentMessage = document.createElement("pre");

            newUserUploadDisplayElContent.classList.add("hidden");
            newUserUploadDisplayElContentMessage.classList.add("user-upload-message")

            newUserUploadDisplayElContentName.textContent = `${name}`;
            newUserUploadDisplayElContentMessage.textContent = `${message}`;

            newUserUploadDisplayElContent.append(newUserUploadDisplayElContentName, newUserUploadDisplayElContentMessage)
            newUserUploadDisplayEl.append(newUserUploadDisplayElContent)

            const parsedFiles = JSON.parse(files);

            let fileEl = null;

            if(parsedFiles.length > 0) {
                for (let file of parsedFiles) {
                    console.log("File: ", file);

                    const fileElContainer = document.createElement("div");
                    fileElContainer.classList.add("user-upload-img-container");

                    if(file.type.includes("image")) {
                        fileEl = document.createElement("img")
                        fileEl.setAttribute("src", `https://ashley-birthday-public.s3.amazonaws.com/user-uploads/${file.name}`)
                    } else if (file.type.includes("video")) {
                        const fileElSource = document.createElement("source");
                        fileEl = document.createElement("video");
                        fileEl.setAttribute("loop", "loop");
                        fileEl.setAttribute("autoplay", "autoplay");
                        fileElSource.setAttribute("src", `https://ashley-birthday-public.s3.amazonaws.com/user-uploads/${file.name}`);
                        fileElSource.setAttribute("type", file.type);
                        fileEl.appendChild(fileElSource);
                    }
                    fileElContainer.append(fileEl);
                    newUserUploadDisplayEl.append(fileElContainer);
                }
            }
            
            userUploadGallerySectionEl.append(newUserUploadDisplayEl);

            newUserUploadDisplayEl.onmouseenter = () => {
                newUserUploadDisplayElContent.classList.remove("hidden");
            }

            newUserUploadDisplayEl.onmouseleave = () => {
                newUserUploadDisplayElContent.classList.add("hidden");
            }
        }

        
    }
}

getUserUploadObjects();