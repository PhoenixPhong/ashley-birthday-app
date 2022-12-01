export const colorArr = [
    "#0CCE6B",
    "#DCED31",
    "#DCED31",
    "#0C4767",
    "#52D1DC",
    "#1B2021",
    "#F19953",
    "#2D93AD",
    "#291720",
    "#1AC8ED",
    "#6622CC"
]

export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export function throttle(fn, delay) {
    let time = Date.now();
    return (...args) => { 
      if (time + delay - Date.now() < 0) {
          fn(...args);
          time = Date.now()
      }
    }
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

export const setFileAttributes = (file, showControls = false, shouldAutoPlay = false, basePath = "https://ashley-birthday-public.s3.amazonaws.com/user-uploads") => {
    let fileEl = null

    if(file.type.includes("image")) {
        fileEl = document.createElement("img")
        fileEl.setAttribute("src", `${basePath}/${file.name}`)
    } else if (file.type.includes("video")) {
        const fileElSource = document.createElement("source");
        fileEl = document.createElement("video");
        fileEl.setAttribute("loop", "loop");

        if(shouldAutoPlay) {fileEl.setAttribute("autoplay", "autoplay")};
        if(showControls) {fileEl.setAttribute("controls", "controls")};
        fileEl.setAttribute("muted", "muted");
        fileElSource.setAttribute("src", `${basePath}/${file.name}`);
        fileElSource.setAttribute("type", file.type);
        fileEl.appendChild(fileElSource);
    }

    return fileEl;
}