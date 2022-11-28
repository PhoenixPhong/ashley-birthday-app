const runScriptEndScreen = () => {
    const endScreenSectionEl = document.getElementById("section__endscreen");
    const endScreenBtnEl = document.getElementById("endscreen-btn");

    let endHeading = null;

const endHeartsArr = [];

const createEndHeartsScreen = (index) => {
    if(!endHeartsArr[index]) {
        return;
    }

    endScreenSectionEl.appendChild(endHeartsArr[index]);
    setTimeout(() => {
        if(index === 250) {
            beginMessageShow(`Of course <span class="endscreen-final-word-purple">not</span> ;)`);
        } if (index === 750) {
            beginMessageShow(`Thank you for <span class="endscreen-final-word-purple">everything,</span> Ashley...`)
        }
        if (index === 1250) {
            beginMessageShow(`My love for you is <span class="endscreen-final-word-purple">endless</span>`)
        } if (index === 1750) {
            const cycleAppEl = document.createElement("div");
            const cycleAppElImgEl = document.createElement("img");
            cycleAppElImgEl.src = "rerun-drawing.png";

            cycleAppEl.onclick = () => {
                location.reload()
            }

            cycleAppEl.classList.add("end-screen-rerun-app-img");
            cycleAppEl.append(cycleAppElImgEl);

            endHeading.append(cycleAppEl);
        }
        createEndHeartsScreen(index + 1);
    }, 10)
}

const beginMessageShow = (message) => {
    const endHeadingCurrent = document.querySelector("#section__endscreen h1");
    if(endHeadingCurrent) {
        endHeadingCurrent.remove();
    }

    endHeading = document.createElement("h1");
    endHeading.innerHTML = message;

    endHeading.classList.add("endscreen-final-heading");
    endScreenSectionEl.append(endHeading);
}

const beginHeartsShow = () => {
    endScreenSectionEl.innerHTML = "";
    endScreenSectionEl.style.flexDirection = "column";

    for(let i = 0; i < 2000; i++) {
        
        const newImg = document.createElement("img");
        newImg.setAttribute("src", "ashley-cartoon-5.png");

        newImg.style.position = "absolute";
        newImg.style.height = `${Math.floor((Math.random() * 12) + 2.5)}rem`;
        newImg.style.width = "auto";
        newImg.style.top = `${(Math.sin(Math.PI * Math.random()) * 75) - 12.5}vh`;
        newImg.style.left = `${(Math.cos(Math.PI * Math.random()) * 62.5) + 33}vw`
        newImg.style.transform = `rotate(${Math.cos(Math.PI * Math.random()) * 45}deg) translate(50%, 50%)`;
        
        // newImg.classList.add("scroll-grid-img");
        // newImg.classList.add("scroll-grid-img-sticky");
        endHeartsArr.push(newImg);
    }

    createEndHeartsScreen(0);
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

endScreenBtnEl.onclick = () => {
    beginHeartsShow();
}
}

runScriptEndScreen();