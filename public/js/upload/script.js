import {dataURLtoFile} from "../utils";

const runScriptGalleryUpload = () => {
    let galleryUploadForm = document.getElementById("gallery-upload-form");
    let galleryUploadFormName = document.querySelector("input[name='name']");
    let galleryUploadFormEmail = document.querySelector("input[name='email']");
    let galleryUploadFormMessage = document.querySelector("textarea[name='message']");
    let galleryUploadFormFiles = document.querySelector("input[name='gallery-files']");
    let galleryUploadFilesPreview = document.getElementById("gallery-upload-preview");
    let galleryUploadPostSubmitModal = document.getElementById("gallery-upload-form-post-submit-modal");
    let galleryUploadPostSubmitModalInner = document.getElementById("gallery-upload-form-post-submit-modal-inner");
    
    const galleryUploadCameraIconEl = document.querySelector(".gallery-upload-file-handler-camera-container");
    const galleryUploadCameraContainerEl = document.getElementById("camera-capture-view-container");
    const cameraCaptureVideoEl = document.getElementById("camera-capture-video");
    const cameraCapturePreviewEl = document.getElementById("camera-capture-view-preview");
    const cameraCaptureSwitchBtnEl = document.getElementById("camera-capture-switch-btn");
    const cameraCaptureRecBtnEl = document.getElementById("camera-capture-rec-btn");
    const cameraCaptureCloseBtnEl = document.getElementById("camera-capture-close-btn");
    const recordBtnRecordingLightEl = document.getElementById("record-btn-recording-light");

    const tooltipEl = document.querySelector(".tooltip");

    const initialGalleryFormState = {
        name: "",
        message: "",
        email: "",
        files: []
    }
    
    let galleryFormState = initialGalleryFormState;

    const handleDeleteFile = (id) => {
        const filteredFiles = galleryFormState.files.filter((file) => `${file.name}-${file.lastModified}` !== id);
        console.log(filteredFiles);
        galleryFormState.files = filteredFiles;


        const fileElToDelete = Array.from(galleryUploadFilesPreview.children).find((file) => file.dataset.fileId === id);
        fileElToDelete.remove()
    }

    const createFileForPreview = (file, i) => {
        const fileContainer = document.createElement("div");
            fileContainer.classList.add("gallery-upload-file-container");

            const fileContainerDeleteEl = document.createElement("div");
            fileContainerDeleteEl.classList.add("gallery-upload-file-delete-btn");
            fileContainerDeleteEl.innerHTML = `
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
            <g class="layer">
                <line fill="none" fill-opacity="0.31" id="svg_9" points="null" stroke="#B3A394" stroke-linecap="round" stroke-width="200" transform="matrix(1 0 0 1 0 0) matrix(0.724968 -0.186276 0.144386 0.526919 22.5691 165.826)" x1="87.25" x2="452.98" y1="456.17" y2="134.02"/>
                <line fill="none" fill-opacity="0.31" id="svg_8" points="null" stroke="#B3A394" stroke-linecap="round" stroke-width="200" transform="matrix(1 0 0 1 0 0) rotate(85.5673 229 266) matrix(0.724968 -0.186276 0.144386 0.526919 22.5691 165.826)" x1="47.78" x2="413.51" y1="432.73" y2="110.57"/>
                <line fill="none" fill-opacity="0.31" id="svg_5" points="null" stroke="#B3A394" stroke-linecap="round" stroke-width="70" transform="matrix(1 0 0 1 0 0) matrix(0.854512 -0.213375 0.170187 0.603572 -5.69419 163.726)" x1="48.7" x2="414.43" y1="389.19" y2="67.04"/>
                <line fill="none" fill-opacity="0.31" id="svg_2" points="null" stroke="#F31634" stroke-linecap="round" transform="matrix(1 0 0 1 0 0)" x1="122.93" x2="377.07" y1="123.59" y2="376.41"/>
                <line fill="none" fill-opacity="0.31" id="svg_3" points="null" stroke="#F31634" stroke-linecap="round" stroke-width="200" transform="matrix(1 0 0 1 0 0) matrix(0.724968 -0.186276 0.144386 0.526919 22.5691 165.826)" x1="73.88" x2="439.61" y1="402.1" y2="79.95"/>
                <line fill="none" fill-opacity="0.31" id="svg_7" points="null" stroke="#F31634" stroke-linecap="round" stroke-width="200" transform="matrix(1 0 0 1 0 0) matrix(0.24175 0.708403 -0.514184 0.184678 311.285 10.2105)" x1="90.18" x2="455.91" y1="406.7" y2="84.55"/>
            </g>
           </svg>
            `;

            const fileId = `${file.name}-${file.lastModified}`;
            console.log(fileId)
            fileContainerDeleteEl.onclick = () => handleDeleteFile(fileId);
    
            const fileURL = URL.createObjectURL(file); 
            let fileEl = null;
    
            if(file.type.includes("image")) {
                fileEl = document.createElement("img")
                fileEl.setAttribute("src", fileURL)
            } else if (file.type.includes("video")) {
                const fileElSource = document.createElement("source");
                fileEl = document.createElement("video");
                fileEl.setAttribute("loop", "loop");
                fileEl.setAttribute("autoplay", "autoplay");
                fileEl.setAttribute("muted", "muted");
                fileEl.volume = 0;
                fileElSource.setAttribute("src", fileURL);
                fileElSource.setAttribute("type", file.type);
                fileElSource.setAttribute("muted", "muted");
                fileEl.appendChild(fileElSource);
            } else {
                fileEl = document.createElement("div")
                fileEl.textContent = "File type not supported. Please choose an image or a video!"
            }

            fileContainer.dataset.fileId = fileId;
           
            fileContainer.appendChild(fileEl);
            fileContainer.appendChild(fileContainerDeleteEl);
            fileContainer.style.animationDelay = `${(i * 0.2)}s`;
            galleryUploadFilesPreview.appendChild(fileContainer);

            galleryUploadFilesPreview.style.height = "max-content";
            galleryUploadFilesPreview.style.marginBottom = "1.5rem";
    }

    const handleMediaStream = async (cameraFacingUser = true) => {
        console.log(cameraFacingUser ? "user" : "enviroment")

        tooltipEl.textContent = "Hold to Record Video!"
        
        let recordingState = {
            isRecording: null,
            shouldCaptureVideo: false,
            cameraFacingUser,
            hasError: null
        }

        try {
            let stream = await navigator.mediaDevices.getUserMedia({ 
                audio: true, 
                video: {
                    facingMode: {
                      exact: cameraFacingUser ? "user" : "enviroment"
                    }
                } 
            });

            let mediaRecorder = null;

            cameraCaptureSwitchBtnEl.onclick = (e) => {
                e.preventDefault();

                if(mediaRecorder.state !== "inactive") {
                    mediaRecorder.stop();
                }

                if(stream) {
                    stream.getTracks().forEach((track) => track.stop());
                }

                recordBtnRecordingLightEl.style.fill = "white";

                cameraCaptureVideoEl.srcObject = null;
                cameraCaptureVideoEl.src = null;
                cameraCaptureVideoEl.muted = "muted";
                cameraCaptureVideoEl.pause();

                console.log("Switincg camera")
                handleMediaStream(!recordingState.cameraFacingUser)
            }
            if(stream) {

                let recordedChunks = [];

                mediaRecorder = new MediaRecorder(stream, {type: "video/mp4"});

                const handlePic = () => {
                    const streamSettings = stream.getVideoTracks()[0].getSettings();

                    // Make sure to cancel interactions while showing the preview
                    cameraCaptureRecBtnEl.onmousedown = () => null;
                    cameraCaptureRecBtnEl.ontouchstart = () => null;
                    cameraCaptureRecBtnEl.onclick = () => null;

                    const canvasEl = document.createElement("canvas");
                    canvasEl.style.position = "absolute";
                    canvasEl.style.top = "50%";
                    canvasEl.style.left = "50%"
                    canvasEl.style.transform = "translate(-50%, -50%)"

                    canvasEl.width = streamSettings.width;
                    canvasEl.height = streamSettings.height;

                    cameraCapturePreviewEl.append(canvasEl);

                    const canvasContext = canvasEl.getContext("2d");
                    // console.log(streamSettings, cameraCaptureVideoEl.videoWidth, cameraCaptureVideoEl.videoHeight)
                    canvasContext.drawImage(cameraCaptureVideoEl, 0, 0);

                    cameraCaptureVideoEl.srcObject = null;
                    cameraCaptureVideoEl.src = null;
                    cameraCaptureVideoEl.muted = "muted";
                    cameraCaptureVideoEl.pause();

                    const img_saved = canvasEl.toDataURL("image/png");
                    const newFileName = `user-camera-capture-${Date.now()}`;
                    const newFile = dataURLtoFile(img_saved, newFileName);
                    //const img_file = new File([img_saved], `user-camera-capture-${Date.now()}`, {type: "image/png"});

                    galleryFormState.files.push(newFile);
                    createFileForPreview(newFile, 0);

                    tooltipEl.textContent = "Took Photo!"

                    setTimeout(() => {
                        canvasContext.clearRect(0, 0, canvasEl.width, canvasEl.height);
                        canvasEl.remove();

                        tooltipEl.textContent = "Click to take again"

                        if(mediaRecorder.state !== "inactive") {
                            mediaRecorder.stop();
                        }
                        recordedChunks = [];
                        console.log(stream, mediaRecorder.state)

                        stream.getTracks().forEach((track) => track.stop())

                        handleMediaStream(recordingState.cameraFacingUser);
                    }, 2500)

                    // cameraCaptureCloseBtnEl.onclick = () => {
                    //     galleryUploadCameraContainerEl.classList.add("hidden")

                    //     stream.getTracks().forEach((track) => track.stop())
                    //     console.log(stream, mediaRecorder.state)
    
                    //     cameraCaptureVideoEl.srcObject = null;
                    //     cameraCaptureVideoEl.src = null;
                    //     cameraCaptureVideoEl.muted = "muted";
                    //     cameraCaptureVideoEl.pause();
                    // }
                }

                const handleRecord = () => {

                    if(recordingState.shouldCaptureVideo) {
                        if(recordingState.isRecording) {
                            mediaRecorder.stop();
                            recordBtnRecordingLightEl.style.fill = "white";
                            tooltipEl.textContent = "Click to Record Again"
                        } else {
                            handleMediaStream(recordingState.cameraFacingUser);
                        }

                        recordingState.isRecording = false;
                    }

                    if(recordingState.isRecording === null) {
                        longPressTimer = setTimeout(() => {
                            console.log("Long pressed")
    
                            recordedChunks = [];
                            mediaRecorder.start(1000);
                            recordBtnRecordingLightEl.style.fill = "red";

                            tooltipEl.textContent = "Recording!"
    
                            recordingState.shouldCaptureVideo = true
    
                            recordingState.isRecording = !recordingState.isRecording;
                        }, 1000)
                    }
                    
                }

                let longPressTimer = null

                cameraCaptureRecBtnEl.oncontextmenu = (e) => {
                    e.preventDefault();
                    return false;
                }
                cameraCaptureRecBtnEl.onmousedown = (e) => {
                    e.preventDefault();
                    handleRecord();
                }
                cameraCaptureRecBtnEl.ontouchstart = (e) => {
                    e.preventDefault()
                    handleRecord();
                }
                cameraCaptureRecBtnEl.onmouseup = (e) => {
                    e.preventDefault();
                    console.log("Recording state: ", recordingState)
                    if(recordingState.isRecording === null) {
                        clearTimeout(longPressTimer)
                        console.log("Cleared long press")
                        handlePic();
                    }
                }
                cameraCaptureRecBtnEl.ontouchend = (e) => {
                    e.preventDefault();
                    console.log("Recording state: ", recordingState)
                    if(recordingState.isRecording === null) {
                        clearTimeout(longPressTimer)
                        console.log("Cleared long press")
                        handlePic();
                    }
                }

                mediaRecorder.onerror = (e) => {
                    recordingState.hasError = true
                    cameraCaptureRecBtnEl.onclick = () => {}
                    console.log("Error!")
                }

                mediaRecorder.onstop = () => {
                    console.log("Stopped recorder");
                    stream.getTracks().forEach((track) => track.stop())
                    cameraCaptureVideoEl.pause()
                    const recordedBlob = new Blob(recordedChunks, {type: "video/mp4"});

                    const newFile = new File([recordedBlob], `user-camera-capture-${Date.now()}`, {
                        type: "video/mp4"
                    });

                    console.log("Recording state ? ", recordingState)
                    
                    if(!recordingState.hasError) {
                        console.log(newFile);
                        galleryFormState.files.push(newFile);
                        createFileForPreview(newFile, 0);

                        const recording = URL.createObjectURL(recordedBlob);
                        cameraCaptureVideoEl.src = recording;
                        cameraCaptureVideoEl.srcObject = null;
                        cameraCaptureVideoEl.muted = false;
                        cameraCaptureVideoEl.loop = "loop"
                        cameraCaptureVideoEl.play();
                    }
                }

                mediaRecorder.ondataavailable = (e) => {
                    recordedChunks.push(e.data);  
                }

                cameraCaptureVideoEl.muted = "muted";
                cameraCaptureVideoEl.srcObject = stream;
                cameraCaptureVideoEl.play();

                // const cameraVideoElDims = cameraCaptureVideoEl.getBoundingClientRect();
                // cameraCaptureCanvasEl.style.width = cameraCaptureVideoEl.videoWidth 
                // cameraCaptureCanvasEl.style.height = cameraCaptureVideoEl.videoHeight
                // cameraCaptureCanvasEl.style.top = cameraVideoElDims.top
                // cameraCaptureCanvasEl.style.left = cameraVideoElDims.left 

                cameraCaptureCloseBtnEl.onclick = () => {
                    console.log("Camera close action")
                    stream.getTracks().forEach((track) => track.stop())
                    galleryUploadCameraContainerEl.classList.add("hidden")
                    if(mediaRecorder.state !== "inactive") {
                        console.log("Coming from active media recorder!")
                        mediaRecorder.stop();
                    }
                    
                    console.log(stream, mediaRecorder.state)

                    recordBtnRecordingLightEl.style.fill = "white";
                    tooltipEl.textContent = "Hold to Record Video!"

                    cameraCaptureVideoEl.srcObject = null;
                    cameraCaptureVideoEl.src = null;
                    cameraCaptureVideoEl.muted = "muted";
                    cameraCaptureVideoEl.volume = 0
                    cameraCaptureVideoEl.pause();
                }

                // const canvasContext = cameraCaptureCanvasEl.getContext("2d");
                // const canvasWidth = cameraCaptureCanvasEl.width;
                // const canvasHeight = cameraCaptureCanvasEl.height;

                // canvasContext.drawImage(cameraCaptureVideoEl, 0, 0, canvasWidth, canvasHeight);
            }
        } catch(err) {
            recordingState.hasError = true

            cameraCaptureRecBtnEl.onclick = () => null;
            cameraCaptureRecBtnEl.onmousedown = () => null;
            cameraCaptureRecBtnEl.onctouchstart = () => null;
            cameraCaptureRecBtnEl.onmouseup = () => null;
            cameraCaptureRecBtnEl.onctouchend = () => null;

            cameraCaptureVideoEl.srcObject = null;
                    cameraCaptureVideoEl.src = null;
                    cameraCaptureVideoEl.muted = "muted";
                    cameraCaptureVideoEl.volume = 0
                    cameraCaptureVideoEl.pause();
            
                    alert("Sorry, couldn't access your camera");
                    console.log("Couldn't access camera: ", err, recordingState);

            recordBtnRecordingLightEl.style.fill = "white";

            cameraCaptureSwitchBtnEl.onclick = (e) => {
                e.preventDefault();

                console.log("Switincg camera")
                handleMediaStream(!recordingState.cameraFacingUser)
            }
        }
    }

    const handleUserMedia = async () => {
        galleryUploadCameraContainerEl.classList.remove("hidden");
        // window.scroll(0, 0)
        galleryUploadCameraContainerEl.onwheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            return false;
        }

        // Default to showing user facing camera
        handleMediaStream(true);
    }

    galleryUploadCameraIconEl.onmouseup = () => {
        window.scroll(0, 0)
        handleUserMedia()
    }

    galleryUploadCameraIconEl.ontouchend = () => {
        window.scroll(0, 0)
        handleUserMedia()
    }
    
    const handleGalleryTextInputChange = (e) => {
        galleryFormState[e.target.name] = e.target.value
    }
    
    galleryUploadFormName.addEventListener("input", handleGalleryTextInputChange);
    galleryUploadFormEmail.addEventListener("input", handleGalleryTextInputChange);
    galleryUploadFormMessage.addEventListener("input", handleGalleryTextInputChange);
    
    const handleGalleryFileUpload = (e) => {
        const {files} = e.target;
    
        galleryFormState.files = [...galleryFormState.files, ...files];
    
        Array.from(files).forEach((file, i) => {
            createFileForPreview(file, i)
        })
    }
    
    galleryUploadFormFiles.addEventListener("input", handleGalleryFileUpload);
    
    const uploadFileToSignedURL = async (url, file, newFileName) => {
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type
                },
                body: file
            })
            if(response.status === 200) {
                return {success: true}
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    const handleGalleryFormSubmit = async (e) => {
        e.preventDefault();
    
        // Handle loading state
        const galleryUploadPostSubmitModalBtn = document.getElementById("gallery-upload-form-post-submit-modal-add-btn");
        const galleryUploadPostSubmitModalLoadingContainer = document.createElement("div");
        const galleryUploadPostSubmitModalLoadingText = document.createElement("p");
    
        galleryUploadPostSubmitModalLoadingContainer.classList.add("gallery-upload-form-post-submit-modal-loading");
    
        galleryUploadPostSubmitModalLoadingText.textContent = "Loading...";
        galleryUploadPostSubmitModalBtn.textContent = "Close";
    
        galleryUploadPostSubmitModalLoadingContainer.append(galleryUploadPostSubmitModalLoadingText);
        galleryUploadPostSubmitModalInner.prepend(galleryUploadPostSubmitModalLoadingContainer);
        
        galleryUploadPostSubmitModal.style.display = "flex";
        
    
        const filesArr = Array.from(galleryFormState.files).map(({name, type, size}) => ({name, type, size}))
    
        const response = await fetch("/api/message/get-urls", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({files: filesArr})
        });
    
        const responseJSON = await response.json();
        console.log("Response: ", responseJSON);
    
        try {
            for await (const file of responseJSON.signedURLs) {
                const galleryFile = galleryFormState.files.find((galleryFile) => galleryFile.name === file.origninalFileName);
                await uploadFileToSignedURL(file.signedUrl, galleryFile, file.newFileName)
            }
            console.log("After post");
    
            const fileNamesArr = responseJSON.signedURLs.map((file) => ({name: file.newFileName, type: file.fileType}));
    
            const submitFormResponse = await fetch("/api/message/request", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    files: fileNamesArr,
                    name: galleryFormState.name,
                    message: galleryFormState.message,
                    email: galleryFormState.email
                })
            })
    
            const submitFormResponseJSON = await submitFormResponse.json();
            console.log(submitFormResponseJSON);  
    
    
            // const galleryUploadPostSubmitModalBtn = document.getElementById("gallery-upload-form-post-submit-modal-add-btn");
            // galleryUploadPostSubmitModal.style.display = "flex";
    
            galleryUploadPostSubmitModalLoadingText.textContent = "Success! Uploaded!";
            galleryUploadPostSubmitModalBtn.textContent = "Add More"
    
            galleryUploadPostSubmitModal.onclick = () => {
                galleryUploadPostSubmitModal.style.display = "none";
            }
            galleryUploadPostSubmitModal.children[0].onclick = (e) => {
                e.stopPropagation();
            }
            galleryUploadPostSubmitModalBtn.onclick = () => {
                // Keep name piece of state so user can keep same name
                galleryFormState = {
                    name: galleryFormState.name,
                    message: "",
                    email: galleryFormState.email,
                    files: []
                }
                galleryUploadFormMessage.value = "";
                galleryUploadFormFiles.files = null;
                galleryUploadFormFiles.value = null;
    
                console.log("Files? ", galleryUploadFormFiles.files, galleryUploadFormFiles.value)
                console.log("Gallery Form State: ", galleryFormState);
                galleryUploadFilesPreview.innerHTML = "";
                galleryUploadPostSubmitModal.style.display = "none";

                galleryUploadPostSubmitModalLoadingContainer.innerHTML = "";
            }
        } catch(err) {
            console.log(err);
            galleryUploadPostSubmitModalLoadingText.textContent = "Something Went Wrong :(";
            galleryUploadPostSubmitModalBtn.textContent = "Try Again";
        }
    
    }
    
    galleryUploadForm.addEventListener("submit", handleGalleryFormSubmit) 
}

runScriptGalleryUpload();