import { letterOpeningLines, mediaArr } from "../config";

const runScriptLetter = () => {
    const introSectionEl = document.getElementById("section__letter-intro");

    const wordsSceneContainerEl = document.getElementById("words-scene-conatiner");
    const letterOpeningEl = document.getElementById("words-scene-text");

    const continueBtnContainerEl = document.querySelector(".words-scene-continue-btn-container");

    const lasseSectionEl = document.querySelector(".lasse-section");

    // Use for later
    let pictureScrollerGridEl = null;



let imgElsArr = [];

const getMedia = async () => {
    const response = await fetch("/api/public/media/all");
    const {success, data} = await response.json();
    console.log(success, data);
    mediaArr = data.map((file) => ({src: `https://ashley-birthday-public.s3.amazonaws.com/${file.Key}`}));
    console.log(mediaArr)
}

const createImgElement = (index) => {
    if(!imgElsArr[index]) {
        setTimeout(() => {
            pictureScrollerGridEl.classList.add("scroll-grid-img-exit");
        }, 1500)
        setTimeout(() => {
            lasseSectionEl.scrollIntoView({
                behavior: "smooth"
            })
        }, 3250)
        return;
    }

    pictureScrollerGridEl.appendChild(imgElsArr[index]);
    setTimeout(() => {
        createImgElement(index + 1);
    }, 105)
}

const startScrollingGrid = () => {
    introSectionEl.innerHTML = `<div id="picture-scroller-grid"></div>`;
    // introSectionEl.style.flexDirection = "column";

    pictureScrollerGridEl = document.getElementById("picture-scroller-grid");

    for(let i = 0; i < 150; i++) {
        const newImg = document.createElement("img");
        newImg.setAttribute("src", mediaArr[i % mediaArr.length].src);

        // newImg.style.position = "absolute";
        newImg.style.opacity = Math.random() * (1 - 0.5) + 0.5;
        newImg.style.width = `100vw`;
        newImg.style.height = "auto";
        newImg.style.top = "0";
        newImg.style.left = "-5rem"
        
        newImg.classList.add("scroll-grid-img");
        imgElsArr.push(newImg);
    }

    createImgElement(0);
}

const animateLetterOpening = (index) => {
    if(!letterOpeningLines[index]) {
        continueBtnContainerEl.onclick = () => {
            startScrollingGrid();
        }
        continueBtnContainerEl.classList.add("words-scene-continue-enter");
        continueBtnContainerEl.style.display = "flex";
        return;
    }

    const {text, time} = letterOpeningLines[index];
    const letterOpeningWords = text.split(" ");
    const randNum = Math.floor(Math.random() * Math.sqrt(letterOpeningWords.length) + 3)
    const letterOpeningWordsColored = letterOpeningWords.map((word, i) => {
        if(i % randNum === 0 || word.includes("Ashley")) {
            return `<span class="letter-opening-colored">${word}</span>`
        }
        return word;
    }).join(" ")

    letterOpeningEl.classList.remove("letter-opening-enter");
    setTimeout(() => {
        letterOpeningEl.classList.add("letter-opening-enter");
        letterOpeningEl.innerHTML = letterOpeningWordsColored;
    }, 100)

    setTimeout(() => {
        animateLetterOpening(index + 1)
    }, time)
}

const sceneObserver = new IntersectionObserver((entries, observer) => {
    const entry = entries[0];

    if(entry.isIntersecting) {
        // getMedia();
        introSectionEl.classList.add("letter-opening-scene-begin");
        setTimeout(() => {
            animateLetterOpening(0)
        }, 2500)
        console.log(observer)
    }
})

sceneObserver.observe(introSectionEl);
}

runScriptLetter();

