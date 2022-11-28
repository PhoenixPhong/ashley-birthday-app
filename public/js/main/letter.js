const runScriptLetter = () => {
    const introSectionEl = document.getElementById("section__letter-intro");

    const wordsSceneContainerEl = document.getElementById("words-scene-conatiner");
    const letterOpeningEl = document.getElementById("words-scene-text");

    const continueBtnContainerEl = document.querySelector(".words-scene-continue-btn-container");

    const lasseSectionEl = document.querySelector(".lasse-section");

    // Use for later
    let pictureScrollerGridEl = null;

let mediaArr = [
    {
        src: "https://lassepedersen.biz/thumbs/editorial/cover-4/1/cover-4-02-1440x1924-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/cover-4/2/pm_cover115-05-1420x1900-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/maya-maty-caroline/5/180831_glitter_11_032-1440x2158-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/cover-4/3/pm_cover115-03-1420x1900-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/costume-magazine-1/custume-magazine-01/custume-magazine-01-710x950-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/important-magazine/important-01/important-01-1440x1985-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/important-magazine/important-03/important-15-1440x1991-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/important-magazine/important-05/important-05-1440x1002-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/dansk-magazine-1/ODA_DANSK_HELENA_SEVERIN_03_HIGH/oda_dansk_helena_severin_03_high-1420x1900-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/costume-magazine-3/27_05_17_COSTUME-06/27_05_17_costume-06-1420x1900-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/harpers-bazaar-mexico/Matallana_LindseyWixon_TheSociety_SS170001-03/matallana_lindseywixon_thesociety_ss170001-03-1420x1900-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/harpers-bazaar-mexico/Matallana_LindseyWixon_TheSociety_SS170001-06/matallana_lindseywixon_thesociety_ss170001-06-1420x1900-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/styleby/Helena-Severin-04/helena-severin-04-710x950-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/cover-1/RasmusSkousen_KarinSmeds_HedvigPalm_Cover-10/rasmusskousen_karinsmeds_hedvigpalm_cover-10-1420x1900-q75.jpg"
    },
    {
        src: "https://lassepedersen.biz/thumbs/editorial/elle-sweden/01/07-1440x1914-q75.jpg"
    }
];

let imgElsArr = [];

let colorsArr = [
    "black",
    "blue"
]

const getMedia = async () => {
    const response = await fetch("/api/public/media/all");
    const {success, data} = await response.json();
    console.log(success, data);
    mediaArr = data.map((file) => ({src: `https://ashley-birthday-public.s3.amazonaws.com/${file.Key}`}));
    console.log(mediaArr)
}

const letterOpeningLines = [
    {text: "There was once a girl named Ashley...", time: 6000},
    {text: "She came from a land far far away...", time: 6000},
    {text: "I wanted to paint your portrait...<br><br>But my hands can't do your beauty justice.", time: 6000},
    {text: "I wanted to write you another love song, but you remember how the last one went...", time: 6000},
    {text: "I wanted to take you around the world, but for now we'll have to continue to daydream...", time: 6000},
    {text: "I wish I could do something like this for you (and so much more) all at once...", time: 6000},
    {text: "But for this birthday of yours, I'll share the greatest gift I have ever received on this earth....", time: 6000},
    {text: "My beautiful view of you...", time: 2500}
];



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
    // const scrollTargetEl = document.createElement("div");
    // scrollTargetEl.style.marginTop = "100vh";
    // scrollTargetEl.style.width = "100vw";
    // scrollTargetEl.style.height = "100vh";
    // scrollTargetEl.style.background = "pink";
    // introSectionEl.appendChild(scrollTargetEl);

    // scrollTargetEl.scrollIntoView({
    //     behavior: "smooth"
    // })
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

