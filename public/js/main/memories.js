const runScriptMemories = () => {
    const lasseGridEls = document.querySelectorAll(".lasse-layout-photo-grid");
const lasseImgEls = document.querySelectorAll(".img_lasse");
const memoryTextEl = document.getElementById("lasse-layout-text-content");
const memoryTextSubtitleEl = document.getElementById("lasse-layout-text-subtitle");
const memoryExpandedViewEl = document.getElementById("memory-expanded-view");

const _lasseSectionEl = document.getElementById("section__lasse");
const lasseLayout = document.querySelector(".lasse-layout");
const lasseGridImgs = document.querySelectorAll(".lasse-layout-photo-grid div");

const lasseInfoBoxEls = document.querySelectorAll(".lasse-info-box");

const shouldParallax = true;

const memoryExpandedState = {
    currentTotalIndex: null,
    currentIndex: null,
    hasReachedEnd: false
}

const letterLines = [
    "A letter",
    "To My Best Friend",
    "If I had the gift of poetry...",
    "If I could write you a song",
    "The most amazing view...",
    "You"
]

const letterSubtitles = [
    "1 Motivational lorem ipsum sit dolor motivational quotes",
    "2 Motivational lorem ipsum sit dolor motivational quotes",
    "3 Motivational lorem ipsum sit dolor motivational quotes",
    "4 Motivational lorem ipsum sit dolor motivational quotes",
    "5 Motivational lorem ipsum sit dolor motivational quotes",
    "6 Motivational lorem ipsum sit dolor motivational quotes",
]

const colorArr = [
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

const memoryItemsArr = [
    {memory_id: 0, item_id: 0, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/1/cover-4-02-1440x1924-q75.jpg", title: "My First Memory", heading: "Memory 1", subtitle: "Inspirational Quote 1", body: "Write about a memory here with lots of details about the picture and provide context and write more and more and pour your heart out here", transitions: "Down"},
    {memory_id: 0, item_id: 1, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/2/pm_cover115-05-1420x1900-q75.jpg", title: "Test New Title", heading: "Memory 2",  subtitle: "Inspirational Quote 2", body: "Another text with lots of content that should be regarded as my true and honest feelings in all states of being and truth that spill from my mind", transitions: "Right"},
    {memory_id: 0, item_id: 2, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/3/pm_cover115-03-1420x1900-q75.jpg", title: "My First Memory (12)", heading: "Memory 3",  subtitle: "Inspirational Quote 3", body: "Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Down", endScene: true},

    {memory_id: 1, item_id: 0, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/1/cover-4-02-1440x1924-q75.jpg", title: "My First Memory", heading: "Memory 1", subtitle: "Inspirational Quote 1", body: "Write about a memory here with lots of details about the picture and provide context and write more and more and pour your heart out here", transitions: "Left"},
    {memory_id: 1, item_id: 1, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/2/pm_cover115-05-1420x1900-q75.jpg", title: "Test New Title", heading: "Memory 2",  subtitle: "Inspirational Quote 2", body: "Another text with lots of content that should be regarded as my true and honest feelings in all states of being and truth that spill from my mind", transitions: "Down"},
    {memory_id: 1, item_id: 2, src: "https://lassepedersen.biz/thumbs/editorial/maya-maty-caroline/5/180831_glitter_11_032-1440x2158-q75.jpg", title: "My First Memory (12)", heading: "Memory 3",  subtitle: "Inspirational Quote 3", body: "Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Right",},
    {memory_id: 1, item_id: 3, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/3/pm_cover115-03-1420x1900-q75.jpg", title: "My First Memory (12)", heading: "Memory 4",  subtitle: "Inspirational Quote 4", body: "444444 More Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Up", endScene: true},

    {memory_id: 2, item_id: 0, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/1/cover-4-02-1440x1924-q75.jpg", title: "My First Memory", heading: "Memory 1", subtitle: "Inspirational Quote 1", body: "Write about a memory here with lots of details about the picture and provide context and write more and more and pour your heart out here", transitions: "Left"},
    {memory_id: 2, item_id: 1, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/2/pm_cover115-05-1420x1900-q75.jpg", title: "Test New Title", heading: "Memory 2",  subtitle: "Inspirational Quote 2", body: "Another text with lots of content that should be regarded as my true and honest feelings in all states of being and truth that spill from my mind", transitions: "Down"},
    {memory_id: 2, item_id: 2, src: "https://lassepedersen.biz/thumbs/editorial/maya-maty-caroline/5/180831_glitter_11_032-1440x2158-q75.jpg", title: "My First Memory (12)", heading: "Memory 3",  subtitle: "Inspirational Quote 3", body: "Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Right",},
    {memory_id: 2, item_id: 3, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/3/pm_cover115-03-1420x1900-q75.jpg", title: "My First Memory (12)", heading: "Memory 4",  subtitle: "Inspirational Quote 4", body: "444444 More Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Up", endScene: true},

    {memory_id: 3, item_id: 0, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/1/cover-4-02-1440x1924-q75.jpg", title: "My First Memory", heading: "Memory 1", subtitle: "Inspirational Quote 1", body: "Write about a memory here with lots of details about the picture and provide context and write more and more and pour your heart out here", transitions: "Left"},
    {memory_id: 3, item_id: 1, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/2/pm_cover115-05-1420x1900-q75.jpg", title: "Test New Title", heading: "Memory 2",  subtitle: "Inspirational Quote 2", body: "Another text with lots of content that should be regarded as my true and honest feelings in all states of being and truth that spill from my mind", transitions: "Down"},
    {memory_id: 3, item_id: 2, src: "https://lassepedersen.biz/thumbs/editorial/maya-maty-caroline/5/180831_glitter_11_032-1440x2158-q75.jpg", title: "My First Memory (12)", heading: "Memory 3",  subtitle: "Inspirational Quote 3", body: "Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Right",},
    {memory_id: 3, item_id: 3, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/3/pm_cover115-03-1420x1900-q75.jpg", title: "My First Memory (12)", heading: "Memory 4",  subtitle: "Inspirational Quote 4", body: "444444 More Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Up", endScene: true},

    {memory_id: 4, item_id: 0, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/1/cover-4-02-1440x1924-q75.jpg", title: "My First Memory", heading: "Memory 1", subtitle: "Inspirational Quote 1", body: "Write about a memory here with lots of details about the picture and provide context and write more and more and pour your heart out here", transitions: "Left"},
    {memory_id: 4, item_id: 1, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/2/pm_cover115-05-1420x1900-q75.jpg", title: "Test New Title", heading: "Memory 2",  subtitle: "Inspirational Quote 2", body: "Another text with lots of content that should be regarded as my true and honest feelings in all states of being and truth that spill from my mind", transitions: "Down"},
    {memory_id: 4, item_id: 2, src: "https://lassepedersen.biz/thumbs/editorial/maya-maty-caroline/5/180831_glitter_11_032-1440x2158-q75.jpg", title: "My First Memory (12)", heading: "Memory 3",  subtitle: "Inspirational Quote 3", body: "Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Right",},
    {memory_id: 4, item_id: 3, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/3/pm_cover115-03-1420x1900-q75.jpg", title: "My First Memory (12)", heading: "Memory 4",  subtitle: "Inspirational Quote 4", body: "444444 More Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Up", endScene: true},

    {memory_id: 5, item_id: 0, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/1/cover-4-02-1440x1924-q75.jpg", title: "My First Memory", heading: "Memory 1", subtitle: "Inspirational Quote 1", body: "Write about a memory here with lots of details about the picture and provide context and write more and more and pour your heart out here", transitions: "Left"},
    {memory_id: 5, item_id: 1, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/2/pm_cover115-05-1420x1900-q75.jpg", title: "Test New Title", heading: "Memory 2",  subtitle: "Inspirational Quote 2", body: "Another text with lots of content that should be regarded as my true and honest feelings in all states of being and truth that spill from my mind", transitions: "Down"},
    {memory_id: 5, item_id: 2, src: "https://lassepedersen.biz/thumbs/editorial/maya-maty-caroline/5/180831_glitter_11_032-1440x2158-q75.jpg", title: "My First Memory (12)", heading: "Memory 3",  subtitle: "Inspirational Quote 3", body: "Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Right",},
    {memory_id: 5, item_id: 3, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/3/pm_cover115-03-1420x1900-q75.jpg", title: "My First Memory (12)", heading: "Memory 4",  subtitle: "Inspirational Quote 4", body: "444444 More Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Up", endScene: true},

    // {memory_id: 6, item_id: 0, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/1/cover-4-02-1440x1924-q75.jpg", title: "My First Memory", heading: "Memory 1", subtitle: "Inspirational Quote 1", body: "Write about a memory here with lots of details about the picture and provide context and write more and more and pour your heart out here", transitions: "Left"},
    // {memory_id: 6, item_id: 1, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/2/pm_cover115-05-1420x1900-q75.jpg", title: "Test New Title", heading: "Memory 2",  subtitle: "Inspirational Quote 2", body: "Another text with lots of content that should be regarded as my true and honest feelings in all states of being and truth that spill from my mind", transitions: "Down"},
    // {memory_id: 6, item_id: 2, src: "https://lassepedersen.biz/thumbs/editorial/maya-maty-caroline/5/180831_glitter_11_032-1440x2158-q75.jpg", title: "My First Memory (12)", heading: "Memory 3",  subtitle: "Inspirational Quote 3", body: "Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Right",},
    // {memory_id: 6, item_id: 3, src: "https://lassepedersen.biz/thumbs/editorial/cover-4/3/pm_cover115-03-1420x1900-q75.jpg", title: "My First Memory (12)", heading: "Memory 4",  subtitle: "Inspirational Quote 4", body: "444444 More Random text machine generating strings upon strings and unraveling a universe and the truth that underlies the views we all see in simplicity there is art", transitions: "Up", endScene: true}
]

function throttle(fn, delay) {
    let time = Date.now();
    return (...args) => { 
      if (time + delay - Date.now() < 0) {
          fn(...args);
          time = Date.now()
      }
    }
  } 

const registerScene = (scene, sceneConfig) => {
    const sceneObserver = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];

        if(entry.isIntersecting) {
            sceneConfig.startFn(entry)
            console.log(observer)

            if(sceneConfig.runOnce) {
                observer.unobserve(entry.target)
            }
        }
    }, {threshold: 0.75})
    
    sceneObserver.observe(scene);
}

const updateMemoryText = (index) => {
    memoryTextEl.classList.remove("lasse-text-animate");
    setTimeout(() => {
        const memoryTextLine = letterLines[index]

        const memoryTextLineWords = memoryTextLine.split(" ");
        const randNum = Math.floor(Math.random() * memoryTextLineWords.length + 3)
        const memoryTextLineWordsColored = memoryTextLineWords.map((word, i) => {
            if(i % randNum === 0) {
                return `<span class="letter-opening-colored">${word}</span>`
            }
            return word;
        }).join(" ")

        memoryTextEl.innerHTML = memoryTextLineWordsColored;
        memoryTextEl.classList.add("lasse-text-animate")

        memoryTextSubtitleEl.textContent = `— ${letterSubtitles[index]}`;
        memoryTextSubtitleEl.classList.add("lasse-text-animate")
    }, 100)
}

const initEnterObserver = new IntersectionObserver((entries, observer) => {
    const entry = entries[0];

    if(entry.isIntersecting) {
        _lasseSectionEl.onwheel = throttle((e) => {
            e.preventDefault();
            _lasseSectionEl.scrollLeft += e.deltaY + e.deltaX;
        }, 5)

        lasseGridEls[0].classList.add("lasse-photo-grid-enter");
        console.log("Observing Lasse")
    }
})

initEnterObserver.observe(_lasseSectionEl);

lasseGridEls.forEach((scene, i) => {
    registerScene(scene, {startFn: () => updateMemoryText(i)})
})

const colorWords = (el, text) => {
    const textWords = text.split(" ");
    const randNum = Math.floor(Math.random() * Math.sqrt(textWords.length) + 3)
    const textWordsColored = textWords.map((word, i) => {
        if(i % randNum === 0 || word.includes("Ashley")) {
            return `<span class="letter-opening-colored">${word}</span>`
        }
        return word;
    }).join(" ")
    el.innerHTML = textWordsColored;
}

let memoryCloudTimer = null;

const renderMemoryCloud = (index, endCb) => {
    clearTimeout(memoryCloudTimer);

    if(index >= 150) {
        endCb();
        return;
    }
    memoryCloudTimer = setTimeout(() => {
        const transitionCloudEl = document.createElement("div");
        const transitionCloudImgEl = document.createElement("img");
        
        transitionCloudImgEl.src = "cloud-drawing.png";

        transitionCloudEl.classList.add("splash-transition-cloud");
        transitionCloudEl.append(transitionCloudImgEl);

        transitionCloudEl.style.width = `${Math.floor(Math.random() * (22.5 - 12.5) + 22.5)}vw`
        transitionCloudEl.style.top = `${(Math.random() * 107.5) - 7.5}vh`;
        // transitionCloudEl.style.left = `${-1 * Math.random() * 100}vh`;
        memoryExpandedViewEl.append(transitionCloudEl);

        renderMemoryCloud(index + 1, endCb);
    }, 1)
}

const renderMemoryExpanded = ({id, initImg, initImgStyles, initImgSrc, initImgBoxShadow, initImgLoc}) => {
    memoryExpandedViewEl.innerHTML = `
    <div class="mem-item memory-expanded-view-title"></div>
    <div class="mem-item memory-expanded-view-img"></div>  
    <div class="mem-item memory-expanded-view-text-container">
        <div class="memory-expanded-view-text-heading"></div> 
        <div class="memory-expanded-view-text-subtitle"></div>  
        <div class="memory-expanded-view-text-body"></div> 
        <div class="memory-expanded-view-end-btn"></div>  
    </div>    
      
    `

    const memImgEl = document.querySelector(".memory-expanded-view-img");
    const memTitleEl = document.querySelector(".memory-expanded-view-title");

    const memTextContainerEl = document.querySelector(".memory-expanded-view-text-container");
    const memTextHeadingEl = document.querySelector(".memory-expanded-view-text-heading");
    const memTextSubtitleEl = document.querySelector(".memory-expanded-view-text-subtitle");
    const memTextBodyEl = document.querySelector(".memory-expanded-view-text-body");

    const memEndBtnEl = document.querySelector(".memory-expanded-view-end-btn");

    memoryExpandedViewEl.style.display = "flex";

    const memoryCoords = id.split(",").map(str => parseInt(str));
    console.log("Memory coords: ", memoryCoords)

    memoryExpandedState.currentIndex = memoryCoords[1];

    const currentMemoryItems = memoryItemsArr.filter((item) => item.memory_id === memoryCoords[0])
    const initItem = currentMemoryItems.find((item) => {
        return item.item_id === memoryExpandedState.currentIndex
    });
    const initItemIndex = memoryItemsArr.findIndex((item) => {
        return item.memory_id === memoryCoords[0] && item.item_id === memoryCoords[1]
    })

    memoryExpandedState.currentTotalIndex = initItemIndex;

    console.log("InitItemIndex: ", initItemIndex);

    console.log("Current Memory: ", currentMemoryItems, "Item: ", initItem);

    const memImgElImg = document.createElement("img");
    memImgElImg.setAttribute("src", initImgSrc)

    memImgEl.style.width = "35vw";
    memImgEl.style.height = "95vh";
    memImgEl.style.top = "2.5vh";
    memImgEl.style.left = initImgLoc ? `62.5vw` : "2.5vw";
    memImgEl.style.boxShadow = initImgLoc ? "-0.75rem 0 0" : "0.75rem 0 0";
    memImgEl.style.color = initImgBoxShadow;
    
    memImgEl.onmouseenter = () => {
        memImgEl.style.color = initImgBoxShadow;
    }

    memImgEl.onmouseleave = () => {
        memImgEl.style.color = "transparent";
    }

    memImgEl.append(memImgElImg);

    memTextContainerEl.style.left = initImgLoc ? "2.5vw" : "45.5vw";
    memTextContainerEl.classList.add("memTextFadeIn-Up");

    const memTextHeadingElHeading = document.createElement("h3");
    memTextHeadingElHeading.textContent = initItem.heading;
    memTextHeadingEl.append(memTextHeadingElHeading);

    colorWords(memTextHeadingEl, initItem.heading)

    const memTextSubtitleElSubtitle = document.createElement("p");
    memTextSubtitleElSubtitle.textContent = `— ${initItem.subtitle}`;
    memTextSubtitleEl.append(memTextSubtitleElSubtitle);

    const memTextBodyElBody = document.createElement("pre");
    memTextBodyElBody.textContent = initItem.body;
    memTextBodyEl.append(memTextBodyElBody);

    const startUserUploadScene = () => {
        const afterMemoryCloudCb = () => {
            memImgEl.style.position = "absolute";
            memImgEl.style.display = "none";
            memoryExpandedViewEl.style.display = "none";
        }

        initImg.style.position = "absolute";
        initImg.style.display = "none";
        memoryExpandedViewEl.classList.add("transition-shift-left")

        const nextSectionEl = document.getElementById("section__user-upload-gallery");
        nextSectionEl.scrollIntoView({
            behavior: "smooth"
        })
        // memImgEl.classList.add("transition-shift-left");
        setTimeout(() => {
            renderMemoryCloud(0, afterMemoryCloudCb);
        }, 250)

    }

    if(memoryExpandedState.currentTotalIndex === memoryItemsArr.length - 1) {
        if(!memoryExpandedState.hasReachedEnd) {
            const memBtnEndEl = document.createElement("button");
            memBtnEndEl.classList.add("btn");
            memBtnEndEl.textContent = "See More?"

            memEndBtnEl.classList.add("memory-expanded-view-end-btn-fadeIn");

            memEndBtnEl.append(memBtnEndEl)

            memoryExpandedState.hasReachedEnd = true;

            memBtnEndEl.onclick = () => {
                startUserUploadScene();
            }
        }
    }

    memoryExpandedViewEl.onwheel = throttle((e) => {
        // alert("Scrolled Memory")
        if(e.deltaY < -5) {
            if(memoryExpandedState.hasReachedEnd) {
                memEndBtnEl.innerHTML = "";
                memoryExpandedState.hasReachedEnd = false;
            }
            if(memoryItemsArr[memoryExpandedState.currentTotalIndex - 1]) {
                memoryExpandedState.currentTotalIndex --;
            }

            memoryExpandedState.currentIndex --;
            const prevItem = currentMemoryItems.find((item) => {
                return item.item_id === memoryExpandedState.currentIndex
            });

    
            if(prevItem) {
                colorWords(memTextHeadingEl, prevItem.heading)
                memTextSubtitleElSubtitle.textContent = `— ${prevItem.subtitle}`;
                memTextBodyElBody.textContent = prevItem.body;

                memTextContainerEl.classList.remove(`memTextFadeIn-Up`);
                memImgEl.classList.remove(`memImgFadeIn-Up`)
                setTimeout(() => {
                    memTextContainerEl.classList.add(`memTextFadeIn-Up`);
                }, 100)
                setTimeout(() => {
                    memImgEl.children[0].src = prevItem.src;
                    memImgEl.classList.add(`memImgFadeIn-Up`)
                }, 250)
                
            } else {
                setTimeout(() => {
                    memoryExpandedState.hasReachedEnd = false;
                    memoryExpandedViewEl.style.display = "none";
                    memImgEl.style.display = "none";
                    const restOfEls = _lasseSectionEl.querySelectorAll(`*`);

                    initImg.style.position = "absolute";
                    initImg.style.width = initImgStyles.width;
                    initImg.style.height = initImgStyles.height;
                    initImg.style.top = initImgStyles.top;
                    initImg.style.left = initImgStyles.left;

                    restOfEls.forEach((el, i) => {
                        el.style.opacity = "1";
                    })

                    lasseLayout.onwheel = throttle((e) => {
                        lasseGridImgs.forEach((img, i) => {
                            if (img.dataset.parallax) {
                                img.style.transform = `translateX(${Math.floor((0.5 * (e.deltaY + e.deltaX)))}px) scale(1)`
                            }
                        })
                    }, 50);

                    setTimeout(() => {
                        initImg.style.transitionDuration = initImgStyles.transitionDuration
                    }, 400)
                }, 250)
            }
        }
        if(e.deltaY > 5) {
            if(memoryItemsArr[memoryExpandedState.currentTotalIndex + 1]) {
                memoryExpandedState.currentTotalIndex ++;
            }

            if(!memoryExpandedState.hasReachedEnd) {
                memoryExpandedState.currentIndex ++;
            }

            const nextItem = currentMemoryItems.find((item) => {
                return item.item_id === memoryExpandedState.currentIndex
            });
    
            if(nextItem) {
                if(!memoryExpandedState.hasReachedEnd) {
                    colorWords(memTextHeadingEl, nextItem.heading)
                    memTextSubtitleElSubtitle.textContent = `— ${nextItem.subtitle}`;
                    memTextBodyElBody.textContent = nextItem.body;

                    memTextContainerEl.classList.remove(`memTextFadeIn-Up`);
                    memImgEl.classList.remove(`memImgFadeIn-Up`)
                    setTimeout(() => {
                        memTextContainerEl.classList.add(`memTextFadeIn-Up`);
                    }, 100)
                    setTimeout(() => {
                        memImgEl.children[0].src = nextItem.src;
                        memImgEl.classList.add(`memImgFadeIn-Up`)
                    }, 150)
                }

                if(memoryExpandedState.currentTotalIndex === memoryItemsArr.length - 1) {
                    if(!memoryExpandedState.hasReachedEnd) {
                        const memBtnEndEl = document.createElement("button");
                        memBtnEndEl.classList.add("btn");
                        memBtnEndEl.textContent = "See More?"

                        memEndBtnEl.append(memBtnEndEl)

                        memEndBtnEl.classList.add("memory-expanded-view-end-btn-fadeIn");

                        memoryExpandedState.hasReachedEnd = true;

                        memBtnEndEl.onclick = () => {
                            startUserUploadScene();
                        }
                    }
                } 
            } else {
                setTimeout(() => {
                    memoryExpandedState.hasReachedEnd = false;
                    memoryExpandedViewEl.style.display = "none";
                    memImgEl.style.display = "none";
    
                    initImg.style.position = "absolute";
                    initImg.style.width = initImgStyles.width;
                    initImg.style.height = initImgStyles.height;
                    initImg.style.top = initImgStyles.top;
                    initImg.style.left = initImgStyles.left;
    
                    const restOfEls = _lasseSectionEl.querySelectorAll(`*`);
                    restOfEls.forEach((el, i) => {
                        el.style.opacity = "1";
                    })

                    lasseLayout.onwheel = throttle((e) => {
                        lasseGridImgs.forEach((img, i) => {
                             if (img.dataset.parallax) {
                                img.style.transform = `translateX(${Math.floor(0.5 * e.deltaY)}px) scale(1)`
                            }
                        })
                    }, 50);
    
                    setTimeout(() => {
                        initImg.style.transitionDuration = initImgStyles.transitionDuration
                    }, 400)
                }, 150)
            }
        }
    }, 1000)
}

lasseGridImgs.forEach((img, i) => {
    img.onmouseenter = () => {
        const randCol = Math.floor(Math.random() * colorArr.length);
        img.style.color = colorArr[randCol];
        img.style.boxShadow = `-0.75rem 0px 0px ${colorArr[randCol]}`;
    }

    img.onmouseleave = () => {
        img.style.color = "transparent";
        img.style.boxShadow = "-0.75rem 0px 0px transparent";
    }
})

lasseLayout.onwheel = throttle((e) => {
    lasseGridImgs.forEach((img, i) => {
         if (img.dataset.parallax) {
            img.style.transform = `translateX(${Math.floor(0.5 * e.deltaY)}px) scale(1)`
        }
    })
}, 50);

lasseImgEls.forEach((img, i) => {
    img.onclick = () => {
        lasseLayout.onwheel = () => null;

        const leftOrRight = Math.round(Math.random());
        console.log("Left or right? ", leftOrRight);

        const dims = img.getBoundingClientRect();
        const initImgStyles = {
            position: img.style.position,
            width: img.style.width,
            height: img.style.height,
            top: img.style.top,
            left: img.style.left,
            transitionDuration: img.style.transitionDuration
        }
        console.log("Init styles: ", initImgStyles)
        console.log("Dims: ", dims);

        // img.style.height = "75vh";
        // img.style.width = "75vh";
        // img.style.position = "absolute";
        // img.style.left = leftOrRight ? `${dims.width}px` : `${dims.width}`;
        img.style.position = "fixed";
        img.style.width = "35vw";
        img.style.height = "95vh";
        img.style.top = "2.5vh";
        img.style.left = leftOrRight ? `62.5vw` : "2.5vw";
        img.style.transitionDuration = "0.4s";

        // img.classList.add("img_lasse-selected");
        // img.classList.add(leftOrRight ? "img_lasse-selected-Left" : "img_lasse-selected-Right");

        const imgBoxShadow = img.style.color;

        // _lasseSectionEl.style.overflowX = "hidden";

        const restOfEls = _lasseSectionEl.querySelectorAll(`*:not(.lasse-layout, .lasse-layout-photo-grid, .lasse-layout-photo-grid-inner, .lasse-info-box, .lasse-info-box p, #${img.id}, img)`);
        restOfEls.forEach((el, i) => {
            el.style.opacity = "0";
        })

        setTimeout(() => {
            renderMemoryExpanded({id: img.dataset.mem, initImg: img, initImgStyles, initImgSrc: img.children[0].src, initImgBoxShadow: imgBoxShadow, initImgLoc: leftOrRight})
        }, 750)

        // lasseInfoBoxEls[i].classList.add("lasse-info-box-show");
        // lasseImgEls[i].style.left = leftOrRight ? "50vw" : "15vw";
        // img.style.transform = leftOrRight ? `translate(-${dims.x - dims.width * 0.5}px, -${dims.y - 100}px)` : `translate(calc(95vw - ${dims.x}px - ${dims.width}px), -${dims.y - 100}px)`;
        // img.classList.add("lasse-grid-img-move");
        
    }
})
}

runScriptMemories();