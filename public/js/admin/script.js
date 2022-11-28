import {formatDate} from "../utils.js"

const dashboardContainerEl = document.getElementById("dashboard-container");
const dahsboardPostsContainerEl = document.getElementById("dashboard-posts");

const loginFormContainerEl = document.getElementById("login-form-container");
const loginFormEl = document.getElementById("login-form");
const loginFormInputs = document.querySelectorAll("#login-form input");

const addOrDeletePost = async (id, date, add, files) => {
    try {
        const response = await fetch(`/api/admin/post/${id}`, {
            method: add ? "POST" : "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({date_added: date, approved: add, files})
        });
        const {success} = await response.json();
        console.log("Success: ", success);
        return success;
    } catch (err) {
        console.log(err);
    }
}

const getPosts = async () => {
    try {
        const response = await fetch("/api/admin/posts");
        const {success, data} = await response.json();

        if(success) {
            const pendingPostsContainerEl = document.querySelector("#posts-container-pending .posts-container-section-posts");
            const approvedPostsContainerEl = document.querySelector("#posts-container-approved .posts-container-section-posts");

            if(data.length < 1) {
                pendingPostsContainerEl.textContent = "No Posts Pending Approval";
                approvedPostsContainerEl.textContent = "No Posts Approved Yet";
                return;
            }
            for await (const post of data) {
                const filesArr = JSON.parse(post.files);
                let signedURLS = [];

                try {
                    const signedUrlsResponse = await fetch("/api/admin/get-post-signed-urls", {
                        method: "POST", 
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({files: filesArr, approved: post.approved})
                    });
                    const {success, data} = await signedUrlsResponse.json();
                    console.log("Data: ", data);
                    signedURLS = data;

                } catch(err) {
                    console.log(err);
                }

                const newPostEl = document.createElement("div");
                const newPostElContent = document.createElement("div");
                const newPostElContentPreviewsContainer = document.createElement("div");

                const newPostElDate = document.createElement("p");
                const newPostElName = document.createElement("p");
                const newPostElEmail = document.createElement("p");
                const newPostElMessage = document.createElement("pre");

                newPostElContent.classList.add("post-content");
                newPostElContentPreviewsContainer.classList.add("post-preview-container")
                newPostElDate.classList.add("post-date")

                newPostElDate.textContent = formatDate(post.date_added);
                newPostElName.textContent = post.name;
                newPostElEmail.textContent = post.email;
                newPostElMessage.textContent = post.message;

                const fileEls = [];

                signedURLS.forEach(({signedUrl, fileType}, i) => {
                    const newPostFileContainerEl = document.createElement("div");
                    let newPostFilePreviewEl = null;

                    if(fileType.includes("image")) {
                        newPostFilePreviewEl = document.createElement("img")
                        newPostFilePreviewEl.setAttribute("src", signedUrl)
                    } else if (fileType.includes("video")) {
                        const fileElSource = document.createElement("source");
                        newPostFilePreviewEl = document.createElement("video");
                        newPostFilePreviewEl.setAttribute("loop", "loop");
                        newPostFilePreviewEl.setAttribute("autoplay", "autoplay");
                        fileElSource.setAttribute("src", signedUrl);
                        fileElSource.setAttribute("type", fileType);
                        newPostFilePreviewEl.appendChild(fileElSource);
                    } else {
                        newPostFilePreviewEl = document.createElement("div")
                        newPostFilePreviewEl.textContent = "Unsupported File Type"
                    }

                    newPostFileContainerEl.classList.add("post-file-container");
                    newPostFileContainerEl.append(newPostFilePreviewEl);
                    fileEls.push(newPostFileContainerEl)
                });

                newPostEl.setAttribute("id", `post-${post.id}`);

                newPostElContentPreviewsContainer.append(...fileEls);

                newPostElContent.append(
                    newPostElName, 
                    newPostElEmail, 
                    newPostElMessage, 
                    newPostElContentPreviewsContainer
                )

                const newPostElDeleteBtn = document.createElement("button");
                newPostElDeleteBtn.classList.add("btn");
                newPostElDeleteBtn.classList.add("post-btn");
                newPostElDeleteBtn.textContent = "Delete";

                newPostElDeleteBtn.onclick = async (e) => {
                    try {
                        const currentPostEl = newPostElDeleteBtn.parentElement.parentElement;
                        const res = await addOrDeletePost(post.id, post.date_added, false, filesArr);
                        console.log("Res: ", res);
                        if(res) {
                            alert("Deleted Post!");
                            currentPostEl.remove();
                        }
                    } catch(err) {
                        alert("Error with eleting post")
                    }
                }

                const btnElsArr = [newPostElDeleteBtn];

                if(!post.approved) {
                    const newPostElApproveBtn = document.createElement("button");
                    newPostElApproveBtn.classList.add("btn");
                    newPostElApproveBtn.classList.add("post-btn");

                    newPostElApproveBtn.textContent = "Approve";

                    newPostElApproveBtn.onclick = async (e) => {
                        try {
                            const currentPostEl = newPostElApproveBtn.parentElement.parentElement;
                            const res = await addOrDeletePost(post.id, post.date_added, true, filesArr);
                            console.log("Res?: ", res);
                            if(res) {
                                alert("Approved Post!");
                                newPostElApproveBtn.remove();
                                currentPostEl.remove();
                                approvedPostsContainerEl.prepend(currentPostEl);
                            }
                        } catch(err) {
                            alert("Error with approving post")
                        }
                    }

                    btnElsArr.unshift(newPostElApproveBtn)
                }

                const newPostElBtnsContainer = document.createElement("div");
                newPostElBtnsContainer.classList.add("post-btns-container");

                newPostElBtnsContainer.append(...btnElsArr);

                newPostEl.append(
                    newPostElDate, 
                    newPostElContent,
                    newPostElBtnsContainer 
                );

                if(post.approved) {
                    approvedPostsContainerEl.append(newPostEl);
                } else {
                    pendingPostsContainerEl.append(newPostEl);
                }
                
            }
        }
    } catch (err) {
        console.log(err);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/admin/check-auth", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }
        })
    
        const data = await response.json();
        console.log(data);

        if(data.success) {
            loginFormContainerEl.style.display = "none";
            dashboardContainerEl.style.display = "flex";

            await getPosts()
        } else {
            loginFormContainerEl.style.display = "flex";
        }
    } catch(err) {
        console.log(err);
    }
})

const loginFormState = {
    username: "",
    password: ""
}

loginFormInputs.forEach((inputEl) => {
    inputEl.onchange = (e) => {
        loginFormState[e.target.name] = e.target.value
    }
})

loginFormEl.onsubmit = async (e) => {
    e.preventDefault();
    console.log(loginFormState);

    try {
        const response = await fetch("/api/admin/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginFormState)
        })
    
        const data = await response.json();
        console.log(data);

        if(data.success) {
            loginFormContainerEl.style.display = "none";
            dashboardContainerEl.style.display = "flex";

            await getPosts()
        }
    } catch(err) {
        console.log(err);
    }
}