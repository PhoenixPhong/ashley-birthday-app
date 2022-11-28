export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export const dataURLtoFile = (dataurl, filename) => {
 
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

export const setFileAttributes = (file, basePath = "https://ashley-birthday-public.s3.amazonaws.com/user-uploads") => {
    let fileEl = null

    if(file.type.includes("image")) {
        fileEl = document.createElement("img")
        fileEl.setAttribute("src", `${basePath}/${file.name}`)
    } else if (file.type.includes("video")) {
        const fileElSource = document.createElement("source");
        fileEl = document.createElement("video");
        fileEl.setAttribute("loop", "loop");
        fileEl.setAttribute("autoplay", "autoplay");
        fileEl.setAttribute("muted", "muted");
        fileElSource.setAttribute("src", `${basePath}/${file.name}`);
        fileElSource.setAttribute("type", file.type);
        fileEl.appendChild(fileElSource);
    }

    return fileEl;
}