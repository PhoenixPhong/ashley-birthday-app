// Can't have dashes in variable. This variable represents the whole form element 
const uploadForm = document.getElementById("upload-form")
const filesInput = document.getElementById("files-input")
const uploadPreview = document.getElementById("upload-preview")
const uploadState = {
  files: []
}

filesInput.oninput = (event) => {
  const files = event.target.files 
  console.log (files)
  uploadState.files = [...uploadState.files, ...files] 
  Array.from(files).forEach((file) => {
    const fileUrl = URL.createObjectURL(file)
    console.log ("file url", fileUrl)
    let fileElement = null
    if (file.type.includes("image")) {
    fileElement = document.createElement("img")
    } else {
    fileElement = document.createElement("video")
    }
    
    fileElement.src = fileUrl
    uploadPreview.appendChild(fileElement)
  })
}

uploadForm.onsubmit = (event) => {
  event.preventDefault()
  // Eventually need to submit this to the server
   alert(uploadState.files)

}