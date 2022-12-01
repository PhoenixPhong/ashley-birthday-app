import {setFileAttributes} from "../utils";
import { urls } from "../config";

const runScriptGalleryInteractions = () => {
const galleryDisplayContainerEl = document.getElementById("section__user-upload-gallery");

const cornerImgContainerEl = document.getElementById("user-upload-gallery-corner-img");
const cloudWrapperEls = document.querySelectorAll(".upload-gallery-cloud-wrapper .user-upload-gallery-cloud");

const uploadGalleryTitleEl = document.querySelector(".upload-gallery-title");

const selectViewIconsContainerEl = document.querySelector(".upload-gallery-view-icons");
const selectViewIconFirstEl = document.getElementById("upload-gallery-select-view-icon-first");
const selectViewIconSecondEl = document.getElementById("upload-gallery-select-view-icon-second");

const blackBackgroundEl = document.getElementById("cloud-view-background-black-container");
const bigCloudBackgroundEl = document.getElementById("upload-gallery-big-cloud-message");

const messageContainerEl = document.getElementById("upload-gallery-message-container");
const messageContainerTextOpening = document.querySelector(".upload-gallery-message-text-opening");
const messageContainerTextBody = document.querySelector(".upload-gallery-message-text-body");

const gridLayoutContainerEl = document.querySelector(".upload-gallery-grid-layout-container");
const gridLayoutCloseBtnEl = document.getElementById("grid-gallery-close-btn");
const gridLayoutGridContainerEl = document.getElementById("upload-gallery-grid-layout-grid");
let gridLayoutGridContainerExpandedEl = document.getElementById("upload-gallery-grid-layout-grid-expanded");


const galleryUploadInstructions = document.getElementById("upload-scroll-instructions");

const galleryUploadCloseBtnEl = document.getElementById("upload-gallery-close-btn");
const allCloudTexts = document.querySelectorAll(".upload-gallery-cloud-text p");

const nextSceneBtnEl = document.getElementById("upload-gallery-next-scene-btn");
const nextSceneSectionEl = document.getElementById("section__endscreen");

const initCornerImgParentStyles = {
    bottom: cornerImgContainerEl.parentElement.style.bottom,
    right: cornerImgContainerEl.parentElement.style.right,
    width: "90%",
    height: "90%",
    borderRadius: cornerImgContainerEl.parentElement.style.borderRadius,
    boxShadow: cornerImgContainerEl.parentElement.style.boxShadow,
}

const initCornerImgChildStyles = {
    width: "75%",
    height: "75%",
    borderRadius: "1vmax",
    objectFit: "contain"
}

let userUploads = [];

let colors = [
    "#F45B69",
    "#F64740",
    "#2EC4B6",
    "#0A122A",
    "#0DAB76",
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

let galleryDisplayState = {
    selectedView: "cloud",
    selectedCloudIndex: 2,
    scrollCount: 0,
    started: false
}

function throttle(fn, delay) {
    let time = Date.now();
    return (...args) => { 
      if (time + delay - Date.now() < 0) {
        console.log("Throttled")
          fn(...args);
          time = Date.now()
      }
    }
  } 


nextSceneBtnEl.onclick = () => {
    nextSceneSectionEl.scrollIntoView({
        behavior: "smooth"
    })
}

const renderGridViewExpanded = (upload) => {
    console.log("Expanded view upload: ", upload);
    gridLayoutGridContainerExpandedEl = document.getElementById("upload-gallery-grid-layout-grid-expanded");
    gridLayoutGridContainerExpandedEl.classList.remove("hidden");
    // gridLayoutGridContainerExpandedEl.innerHTML = `
    // <div id="upload-gallery-grid-layout-grid-expanded-inner">
    //     <div id="upload-gallery-grid-layout-expanded-text"></div>
    // </div>
    // `

    const gridLayoutGridContainerCloseEl = document.createElement("div");
    gridLayoutGridContainerCloseEl.innerHTML = `
    <div id="upload-gallery-grid-expanded-close-btn" class="upload-gallery-close-btn-container">
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
        <g class="layer">
            <line fill="none" fill-opacity="0.31" id="svg_9" points="null" stroke="#B3A394" stroke-linecap="round" stroke-width="200" transform="matrix(1 0 0 1 0 0) matrix(0.724968 -0.186276 0.144386 0.526919 22.5691 165.826)" x1="87.25" x2="452.98" y1="456.17" y2="134.02"/>
            <line fill="none" fill-opacity="0.31" id="svg_8" points="null" stroke="#B3A394" stroke-linecap="round" stroke-width="200" transform="matrix(1 0 0 1 0 0) rotate(85.5673 229 266) matrix(0.724968 -0.186276 0.144386 0.526919 22.5691 165.826)" x1="47.78" x2="413.51" y1="432.73" y2="110.57"/>
            <line fill="none" fill-opacity="0.31" id="svg_5" points="null" stroke="#B3A394" stroke-linecap="round" stroke-width="70" transform="matrix(1 0 0 1 0 0) matrix(0.854512 -0.213375 0.170187 0.603572 -5.69419 163.726)" x1="48.7" x2="414.43" y1="389.19" y2="67.04"/>
            <line fill="none" fill-opacity="0.31" id="svg_2" points="null" stroke="#FEF9FF" stroke-linecap="round" transform="matrix(1 0 0 1 0 0)" x1="122.93" x2="377.07" y1="123.59" y2="376.41"/>
            <line fill="none" fill-opacity="0.31" id="svg_3" points="null" stroke="#FEF9FF" stroke-linecap="round" stroke-width="200" transform="matrix(1 0 0 1 0 0) matrix(0.724968 -0.186276 0.144386 0.526919 22.5691 165.826)" x1="73.88" x2="439.61" y1="402.1" y2="79.95"/>
            <line fill="none" fill-opacity="0.31" id="svg_7" points="null" stroke="#FEF9FF" stroke-linecap="round" stroke-width="200" transform="matrix(1 0 0 1 0 0) matrix(0.24175 0.708403 -0.514184 0.184678 311.285 10.2105)" x1="90.18" x2="455.91" y1="406.7" y2="84.55"/>
        </g>
    </svg>
    </div>
    `
    gridLayoutGridContainerCloseEl.style.display = "block";

    const gridLayoutGridContainerExpandedInnerEl = document.getElementById("upload-gallery-grid-layout-grid-expanded-inner");
    gridLayoutGridContainerExpandedInnerEl.append(gridLayoutGridContainerCloseEl)

    const gridLayoutExpandedText = document.getElementById("upload-gallery-grid-layout-expanded-text");

    const messageParagraphs = [`From: ${upload.name}`, ...upload.message.split("\n\n")];
    messageParagraphs.forEach((p, i) => {
        const messageWords = p.split(" ");
        const messagePEl = document.createElement("p");
        
        const randNum = Math.floor(Math.random() * Math.sqrt(messageWords.length) + 3)
        messageWords.forEach((word, i) => {
            const classes = [];
            const wordSpan = document.createElement("span");

            const randFontSize = Math.random() * (2.25 - 1.75) + 1.75;

            const randMargin = {
                left: Math.floor(Math.random() * 1),
                right: Math.floor(Math.random() * 5)
            }

            const randSpaces = Math.floor(Math.random() * 10);

            wordSpan.textContent = word;

            wordSpan.style.fontSize = i === 0 ? "2.5rem" : `${randFontSize}rem`;

            wordSpan.style.marginLeft = i === 0 ? "0" : `${randMargin.left}px`;
            wordSpan.style.marginRight = i === 0 ? "0" : `${randMargin.right}px`;

            if(i % randNum === 0 || word.includes("Ashley")) {
                classes.push("letter-opening-colored")
            }
            
            classes.forEach((_class, i) => {
                wordSpan.classList.add(_class);
            })

            messagePEl.append(wordSpan);
        })
        gridLayoutExpandedText.append(messagePEl);
    })

    const gridDims = gridLayoutGridContainerExpandedInnerEl.getBoundingClientRect();
    const gridTextDims = gridLayoutExpandedText.getBoundingClientRect();

    const gridTextHeightVh = (gridTextDims.height / window.innerHeight) * 100;

    let hasSelectedFile = false;

    if(upload.files.length > 0) {
        upload.files.forEach((file, i) => {
            const randColor = colors[Math.floor(Math.random() * colors.length)];
            console.log("Rand color: ", randColor);
            const randWidth = Math.random() * (20 - 7.5) + 7.5
            const height = randWidth * 1.33;

            const randMargin = {
                left: Math.random() * (12.5 - 2.5) + 2.5,
                right: Math.random() * (12.5 - 2.5) + 2.5,
                top: Math.random() * ((gridTextHeightVh / 4) - 2.5) + 2.5,
                bottom: Math.random() * ((gridTextHeightVh / 4) - 2.5) + 2.5
            }

            const tileEl = document.createElement("div");
            tileEl.classList.add("upload-grid-expanded-view-box");

            tileEl.style.width = `${randWidth}vw`;
            tileEl.style.height = `${height}vw`;

            tileEl.style.marginLeft = `${randMargin.left}vw`;
            tileEl.style.marginRight = `${randMargin.right}vw`;
            tileEl.style.marginTop = `${randMargin.top}vh`;
            tileEl.style.marginBottom = `${randMargin.bottom}vh`;

            tileEl.style.backgroundColor = randColor;

            const tileFileEl = setFileAttributes(file);

            tileEl.append(tileFileEl);

            const initTileWidth = tileEl.style.width;
            const initTileHeight = tileEl.style.height;

            tileEl.onclick = (e) => {
                e.stopPropagation();

                if(!hasSelectedFile) {
                    tileEl.style.width = "";
                    tileEl.style.height = "";
                    tileEl.style.marginLeft = "0";
                    tileEl.style.marginTop = "0";
                    tileEl.style.marginRight = "0";
                    tileEl.style.marginBottom = "0";

                    tileEl.classList.remove("upload-grid-expanded-view-box")
                    tileEl.classList.add("upload-grid-expanded-view-box-selected");

                    if(tileEl.children[0].tagName.toLowerCase() === "video") {
                        tileEl.children[0].setAttribute("controls", "controls");
                        tileEl.children[0].load();
                        tileEl.children[0].setAttribute("muted", false);
                        tileEl.children[0].volume = 1;
                        tileEl.children[0].play();
                    }
                }

                gridLayoutGridContainerExpandedInnerEl.onclick = () => {
                    const selectedTileEls = document.querySelectorAll(".upload-grid-expanded-view-box-selected");
                    selectedTileEls.forEach((selectedTile) => {
                        selectedTile.classList.add("upload-grid-expanded-view-box")
                        selectedTile.classList.remove("upload-grid-expanded-view-box-selected");

                        if(selectedTile.children[0].tagName.toLowerCase() === "video") {
                            selectedTile.children[0].setAttribute("controls", false);
                            selectedTile.children[0].setAttribute("muted", "muted");
                            selectedTile.children[0].volume = 0;
                            selectedTile.children[0].pause();
                        }
                    })

                    hasSelectedFile = false
                }

                hasSelectedFile = true;

            }

            gridLayoutGridContainerExpandedInnerEl.append(tileEl);


        })

        console.log("Grid Dims: ", gridDims, gridTextDims);
        window.onmousemove = e => {
            const mouseX = e.clientX,
                  mouseY = e.clientY;
            
            const xDecimal = mouseX / window.innerWidth,
                  yDecimal = mouseY / window.innerHeight;
            
            const maxX = gridDims.width - window.innerWidth,
                  maxY = (Math.max(gridDims.height, gridTextDims.height)) - window.innerHeight;
            
            const panX = maxX * xDecimal * -1,
                  panY = maxY * yDecimal * -1;
            
            gridLayoutGridContainerExpandedInnerEl.animate({
              transform: `translate(${panX}px, ${panY}px)`
            }, {
              duration: 5000,
              fill: "forwards",
              easing: "ease"
            })
          }
    }

    gridLayoutGridContainerCloseEl.onclick = () => {
        gridLayoutGridContainerExpandedEl.classList.add("hidden");
        gridLayoutGridContainerExpandedEl.innerHTML = `
        <div id="upload-gallery-grid-layout-grid-expanded-inner">
                                    <div id="upload-gallery-grid-layout-expanded-text"></div>
                                </div>
        `
        gridLayoutGridContainerCloseEl.style.display = "none";
        
    }
}

const renderGridPreviews = () => {
    userUploads.forEach((upload, i) => {
        if(i === 0) {
            const gridTextHeaderEl = document.createElement("div");
            const gridTextHeaderTextEl = document.createElement("h3");
            gridTextHeaderEl.classList.add("upload-gallery-grid-layout-header");

            const careMessage = "We All Care About You!!!";
            const careWords = careMessage.split(" ");
            const spanCareWordsEls = careWords.map((word) => {
                const careSpan = document.createElement("span");
                careSpan.textContent = word;
                return careSpan;
            })

            // if(i === userUploads.length - 1) {
            //     const nextSceneBtn = 
            // }

            gridTextHeaderTextEl.append(...spanCareWordsEls);
            gridTextHeaderEl.append(gridTextHeaderTextEl);
            gridLayoutGridContainerEl.append(gridTextHeaderEl);

            const careTextObserver = new IntersectionObserver((entries, observer) => {
                const entry = entries[0];
        
                if(entry.isIntersecting) {
                    entry.target.classList.add("care-text-scroll");
                    console.log(observer)
                }
            })
            

            careTextObserver.observe(gridTextHeaderEl);
        }

        const gridPreviewEl = document.createElement("div");
        gridPreviewEl.classList.add("upload-gallery-grid-layout-grid-preview");


        console.log(upload);
        if(upload.files.length > 0) {
            const randIndex = Math.floor(Math.random() * upload.files.length);
            const randFile = upload.files[randIndex];
            const fileGridEl = document.createElement("div");
            let fileGridFileEl = setFileAttributes(randFile)

            fileGridEl.style.width = `100%`;
            fileGridEl.style.height = `100%`;
            fileGridEl.style.top = `0`;
            fileGridEl.style.left = `0`;

            fileGridEl.style.backgroundColor = `${colors[Math.floor(Math.random() * colors.length)]}`;
                
            fileGridFileEl.style.width = "100%";
            fileGridFileEl.style.height = "100%";
            fileGridFileEl.style.objectFit = "cover";

            fileGridEl.append(fileGridFileEl);



            const previewState = {
                currentIndex: randIndex
            }

            let previewInterval = null;

            const renderPreviewFile = () => {
                const file = upload.files[previewState.currentIndex];

                    const fileGridElTagType = fileGridEl.children[0].tagName.toLowerCase();
                    console.log(fileGridElTagType)

                    if(file.type.includes("video")) {
                        const newFileGridFileEl = setFileAttributes(file);
                        if(fileGridElTagType === "img") {
                            clearInterval(previewInterval);
                            fileGridEl.append(newFileGridFileEl);
                            fileGridEl.children[0].remove();
                        } else {
                            fileGridEl.children[0].src = `${urls.s3BucketPath}/user-uploads/${file.name}`;
                        }
                        // const newFileGridFileEl = setFileAttributes(file);
                        // console.log("New file: ", newFileGridFileEl)
                        // newFileGridFileEl.classList.add("cloud-view-scrolled-img");
                        // fileGridEl.children[0].children[0].src = null;
                        // fileGridEl.children[0].children[0].remove()
                        
                        fileGridEl.children[0].setAttribute("muted", "muted")
                        fileGridEl.children[0].load();
                        fileGridEl.children[0].volume = 0;
                        fileGridEl.children[0].play();
                        // newFileGridFileEl.load();
                        // newFileGridFileEl.play();
                        // fileGridEl.append(newFileGridFileEl);

                    } else if (file.type.includes("image")) {
                        console.log("File Grid Tag Type: ", fileGridElTagType);
                        if(fileGridElTagType === "video") {
                            console.log("Img from video!!!")
                            clearInterval(previewInterval);
                            const newFileGridFileEl = setFileAttributes(file);
                            // newFileGridFileEl.classList.add("cloud-view-scrolled-img");
                            fileGridEl.children[0].remove();
                            fileGridEl.append(newFileGridFileEl);
                            
                        } else {
                            fileGridEl.children[0].setAttribute("src", `${urls.s3BucketPath}/user-uploads/${file.name}`)
                        }

                    }

                    previewState.currentIndex = ((previewState.currentIndex + 1) % upload.files.length)
                    console.log("Current preview state: ", previewState)
            }

            fileGridEl.onmouseenter = () => {
                previewState.currentIndex = ((previewState.currentIndex + 1) % upload.files.length)
                const fileGridElTagName = fileGridEl.children[0].tagName.toLowerCase();
                console.log("Mouseenter")
                // renderPreviewFile();
                previewInterval = setInterval(() => {
                    renderPreviewFile()
                }, 1000)
            }

            fileGridEl.onmouseleave = () => {
                clearInterval(previewInterval);
            }

            fileGridEl.onclick = () => {  
                if(i === userUploads.length - 1) {
                    nextSceneBtnEl.classList.remove("hidden");
                }       
                renderGridViewExpanded(upload)
            }

            fileGridEl.ontouchend = () => {
                if(i === userUploads.length - 1) {
                    nextSceneBtnEl.classList.remove("hidden");
                } 
                renderGridViewExpanded(upload)
            }

            gridPreviewEl.append(fileGridEl);
        }

        gridLayoutGridContainerEl.append(gridPreviewEl);
    })
}

const renderCloudView = () => {
    // Prevent scrolling clouds when in message body
messageContainerTextBody.onwheel = (e) => {
    e.stopPropagation();
}

const closeCloudView = () => {
    galleryUploadCloseBtnEl.style.display = "none";
    galleryUploadInstructions.style.display = "block";
    blackBackgroundEl.style.opacity = "0";
    bigCloudBackgroundEl.style.opacity = "0";
    bigCloudBackgroundEl.style.transform = "rotate(-360)"
    uploadGalleryTitleEl.style.zIndex = "100";

    allCloudTexts.forEach((text) => {
        text.textContent = "???";
        text.style.color = "black";
    })

    messageContainerTextOpening.children[0].textContent = "";
    messageContainerTextBody.children[0].textContent = "";

    galleryDisplayState = {
        selectedView: "cloud",
        selectedCloudIndex: 2,
        scrollCount: 0,
        started: false
    }

    for(let style in initCornerImgParentStyles) {
        cornerImgContainerEl.parentElement.style[style] = initCornerImgParentStyles[style]
    }

    for(let style in initCornerImgChildStyles) {
        cornerImgContainerEl.children[0].style[style] = initCornerImgChildStyles[style]
    }

    messageContainerEl.onmouseenter = () => null;
}

galleryUploadCloseBtnEl.onclick = () => {
    closeCloudView();
}

// Handle setting and clearing interval for photo timer
let photoTimer = null;

galleryDisplayContainerEl.onwheel = throttle((e) => {
    const handleMediaChange = (file, containerEl) => {
        const containerChildEl = containerEl.children[0];
        if(file.type.includes("video")) {
            containerEl.innerHTML = "";
            const newFilePreviewEl = setFileAttributes(file);
            newFilePreviewEl.classList.add("cloud-view-scrolled-img");
            containerEl.append(newFilePreviewEl);
            

        } else if (file.type.includes("image")) {
            if(containerChildEl.tagName.toLowerCase() === "video") {
                containerEl.innerHTML = "";
                const newFilePreviewEl = setFileAttributes(file);
                newFilePreviewEl.classList.add("cloud-view-scrolled-img");
                containerEl.append(newFilePreviewEl);
            } else {
                containerEl.children[0].setAttribute("src", `${urls.s3BucketPath}/user-uploads/${file.name}`)
            }
        }

        cornerImgContainerEl.children[0].onmouseenter = () => {
            clearInterval(photoTimer)
            if(cornerImgContainerEl.children[0].tagName.toLowerCase() === "video") {
                cornerImgContainerEl.children[0].setAttribute("controls", "controls");
                cornerImgContainerEl.children[0].setAttribute("muted", false);
            }
        }

        cornerImgContainerEl.children[0].ontouchstart = () => {
            clearInterval(photoTimer)
            if(cornerImgContainerEl.children[0].tagName.toLowerCase() === "video") {
                cornerImgContainerEl.children[0].setAttribute("controls", "controls");
                cornerImgContainerEl.children[0].setAttribute("muted", false);
            }
        }
    }

    const handleScrollUpdate = (inc = 1) => {
        clearInterval(photoTimer);
        let photoState = {
            iterationCount: 0
        }

        if(!galleryDisplayState.started) {
            galleryUploadInstructions.style.display = "none";
            uploadGalleryTitleEl.style.zIndex = "0";
            galleryUploadCloseBtnEl.style.display = "block";
            galleryUploadCloseBtnEl.style.zIndex = "3000";


            blackBackgroundEl.style.opacity = "1";
            bigCloudBackgroundEl.style.opacity = "1";
            bigCloudBackgroundEl.style.transform = "rotate(-45deg)";


            cornerImgContainerEl.parentElement.style.bottom = "0";
                cornerImgContainerEl.parentElement.style.right = "0";
                cornerImgContainerEl.parentElement.style.width = "100vh";
                cornerImgContainerEl.parentElement.style.height = "100vh";
                cornerImgContainerEl.parentElement.style.borderRadius = "15px";
                cornerImgContainerEl.parentElement.style.boxShadow = `-2.5rem 1.5rem 0 black, -5rem 3rem 0 blueviolet, -5.25rem 3rem 2px blueviolet, -5.5rem 3rem 2px blueviolet`
                
                cornerImgContainerEl.children[0].classList.remove("corner-img-default-style");
                cornerImgContainerEl.children[0].classList.add("cloud-view-scrolled-img");
        }

        galleryDisplayState.started = true;

        const cloud0 = document.getElementById(`cloud-0`);
        const cloud1 = document.getElementById(`cloud-1`);
        const cloud2 = document.getElementById(`cloud-2`);
        const cloud3 = document.getElementById(`cloud-3`);
        const cloud4 = document.getElementById(`cloud-4`);

        galleryDisplayState.scrollCount += inc;
        const userUploadItemIndex = Math.abs(galleryDisplayState.scrollCount % userUploads.length);
        const colorIndex = Math.abs(galleryDisplayState.scrollCount % colors.length)
        

        allCloudTexts.forEach((text) => {
            text.textContent = "???";
        })

        const nextCloudText = document.querySelector(`#cloud-3 .upload-gallery-cloud-text p`);
        nextCloudText.textContent = userUploads[userUploadItemIndex].name // userUploads[userUploads.length % (galleryDisplayState.selectedCloudIndex - 2)].name;
        nextCloudText.style.color = colors[colorIndex];
        cornerImgContainerEl.style.backgroundColor = colors[colorIndex];

        if(userUploads[userUploadItemIndex].files.length > 0) {
            const firstFile = userUploads[userUploadItemIndex].files[0];

            handleMediaChange(firstFile, cornerImgContainerEl)

            if(userUploads[userUploadItemIndex].files[1]) {
                photoState.iterationCount++;

                

                photoTimer = setInterval(() => {
                    const fileIndex = photoState.iterationCount % userUploads[userUploadItemIndex].files.length;
                    const nextFile = userUploads[userUploadItemIndex].files[fileIndex];
                    console.log("Next file: ", nextFile);
                    handleMediaChange(nextFile, cornerImgContainerEl);
                    photoState.iterationCount++; 
                }, 2500)



                cornerImgContainerEl.onmouseleave = () => {
                    clearInterval(photoTimer);
                    photoTimer = setInterval(() => {
                        const fileIndex = photoState.iterationCount % userUploads[userUploadItemIndex].files.length;
                        const nextFile = userUploads[userUploadItemIndex].files[fileIndex];
                        handleMediaChange(nextFile, cornerImgContainerEl);
                        photoState.iterationCount++; 
                    }, 2500)
                }
            }
            

            
        }

        messageContainerEl.onmouseenter = () => {
            cloudWrapperEls.forEach((cloud) => {
                cloud.style.opacity = "0.15"
            })

            allCloudTexts.forEach((text) => {
                text.style.opacity = "0.15";
            })
        }

        messageContainerEl.onmouseleave = () => {
            cloudWrapperEls.forEach((cloud) => {
                cloud.style.opacity = "1"
            })

            allCloudTexts.forEach((text) => {
                text.style.opacity = "1";
            })
        }

        cloudWrapperEls.forEach((cloud) => {
            cloud.onmouseenter = () => {
                cloud.style.opacity = "1"
            }

            allCloudTexts.forEach((text) => {
                text.style.opacity = "1";
            })
        })

        messageContainerTextOpening.children[0].textContent = userUploads[userUploadItemIndex].message.split(" ").slice(0, 3).join(" ");
        messageContainerTextBody.children[0].textContent = userUploads[userUploadItemIndex].message.split(" ").slice(3).join(" ");
        // messageContainerTextOpening.style.color = colors[colorIndex];

        


        if(inc > 0) {
            cloud1.style.top = `-20%`;
        cloud1.style.left = "33%";
        // cloud1.style.opacity = "0";

        cloud2.style.top = `0%`;
        cloud2.style.left = "-10rem";

        cloud3.style.top = `22.5%`;
        cloud3.style.left = "-17.5rem";

        cloud4.display = "block";
        cloud4.opacity = "1";
        cloud4.style.top = `50%`;
        cloud4.style.left = "-15rem";

        setTimeout(() => {
            cloud2.setAttribute("id", "cloud-1")
            cloud3.setAttribute("id", "cloud-2");
            cloud4.setAttribute("id", "cloud-3");
            cloud1.setAttribute("id", "cloud-4");
            // cloud1.display = "none";
            cloud1.style.left = "-10%";
            cloud1.style.top = "75%";
        }, 500);
        } else {
            cloud0.display = "block";
        cloud0.opacity = "1";
        cloud0.style.top = `0`;
        cloud0.style.left = "-10rem";

        cloud1.style.top = `22.5%`;
        cloud1.style.left = "-17.5rem";
        // cloud1.style.opacity = "0";

        cloud2.style.top = `50%`;
        cloud2.style.left = "-15rem";

        cloud3.style.top = `75%`;
        cloud3.style.left = "-10em";

        setTimeout(() => {
            cloud0.setAttribute("id", "cloud-1")
            cloud1.setAttribute("id", "cloud-2");
            cloud2.setAttribute("id", "cloud-3");
            cloud3.setAttribute("id", "cloud-0");
            // cloud1.display = "none";
            cloud3.style.left = "-10%";
            cloud3.style.top = "75%";
        }, 500);
        }
    }



    if(e.deltaY > 5) {
        handleScrollUpdate();
    }

    else if(e.deltaY < -5) {
        handleScrollUpdate(-1)
    }
}, 500)

gridLayoutCloseBtnEl.onclick = () => {
    gridLayoutGridContainerEl.innerHTML = `
    <div id="upload-gallery-grid-layout-grid-expanded" class="hidden">
                                <div id="upload-gallery-grid-layout-grid-expanded-inner">
                                    <div id="upload-gallery-grid-layout-expanded-text"></div>
                                </div>
                            </div>
    `;
    gridLayoutGridContainerEl.scrollTop = "0";
    gridLayoutContainerEl.style.display = "none";
    gridLayoutCloseBtnEl.style.display = "none";
    gridLayoutCloseBtnEl.style.zIndex = "0";

    const firstElImg = selectViewIconFirstEl.children[0].src;
    const secondElImg = selectViewIconSecondEl.children[0].src;
    const firstElDataView = selectViewIconFirstEl.dataset.view;
    const secondElDataView = selectViewIconSecondEl.dataset.view;

    selectViewIconFirstEl.children[0].src = secondElImg;
    selectViewIconSecondEl.children[0].src = firstElImg;
    selectViewIconFirstEl.dataset.view = secondElDataView;
    selectViewIconSecondEl.dataset.view = firstElDataView;
}

selectViewIconFirstEl.onclick = () => {
    selectViewIconsContainerEl.classList.add("upload-gallery-view-icons-expanded");
    if (selectViewIconSecondEl.style.display === "block") {
        selectViewIconSecondEl.style.display = "none"
        selectViewIconsContainerEl.classList.remove("upload-gallery-view-icons-expanded");
    } else {
        selectViewIconSecondEl.style.display = "block"
    }

    const firstElImg = selectViewIconFirstEl.children[0].src;
    const secondElImg = selectViewIconSecondEl.children[0].src;
    const firstElDataView = selectViewIconFirstEl.dataset.view;
    const secondElDataView = selectViewIconSecondEl.dataset.view;

    selectViewIconSecondEl.onclick = () => {
        selectViewIconFirstEl.children[0].src = secondElImg;
        selectViewIconSecondEl.children[0].src = firstElImg;
        selectViewIconFirstEl.dataset.view = secondElDataView;
        selectViewIconSecondEl.dataset.view = firstElDataView;

        if(selectViewIconFirstEl.dataset.view === "cloud") {

        } else if (selectViewIconFirstEl.dataset.view === "grid") {
            gridLayoutContainerEl.style.display = "flex";
            gridLayoutCloseBtnEl.style.display = "block";
            gridLayoutCloseBtnEl.style.zIndex = "3000";
            
            gridLayoutContainerEl.onwheel = (e) => {
                e.stopPropagation();
            }
            renderGridPreviews()
        }

        selectViewIconSecondEl.style.display = "none";
        selectViewIconsContainerEl.classList.remove("upload-gallery-view-icons-expanded");
    }

}
}


const getUserUploadObjects = async () => {
    const response = await fetch("/api/public/uploads");
    const {success, data} = await response.json();

    if(success) {
        console.log("User Uploads: ", data);
        if(data.length < 1) return;

        for (const post of data) {
            const parsedFiles = JSON.parse(post.files);
            post.files = parsedFiles;
            userUploads.push(post)
        }

        renderCloudView();
    }
}

const galleryObserver = new IntersectionObserver((entries, observer) => {
    const entry = entries[0];

    if(entry.isIntersecting) {
        console.log("Observing gallery");
        getUserUploadObjects();
        galleryDisplayContainerEl.classList.add("user-upload-gallery-visible");
        galleryDisplayContainerEl.classList.remove("user-upload-gallery");
        console.log(observer)

        observer.unobserve(entry.target)
    }
}, {threshold: 0.75})

galleryObserver.observe(galleryDisplayContainerEl);

}

runScriptGalleryInteractions();