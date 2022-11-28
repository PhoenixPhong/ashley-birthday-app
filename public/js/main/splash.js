const runScriptSplash = () => {
    const sectionSplashEl = document.getElementById("section__happy-birthday");
    const splashStartJourneyBtnEl = document.getElementById("start-journey-btn");
    const splashCloudEls = document.querySelectorAll(".splash-cloud");

    let cloudRenderTimer = null;

    const renderCloud = (index) => {
        clearTimeout(cloudRenderTimer);

        if(index >= 150) {
            splashCloudEls.forEach((cloud) => {
                cloud.classList.remove("splash-text-cloud")
                cloud.classList.add("splash-transition-cloud")
                // setTimeout(() => {
                //     cloud.style.display = "none";
                // }, 500)
            })
            setTimeout(() => {
                const nextSectionEl = document.getElementById("section__letter-intro");
                nextSectionEl.scrollIntoView({
                    behavior: "smooth"
                })
            }, 500)
            return;
        }
        cloudRenderTimer = setTimeout(() => {
            const transitionCloudEl = document.createElement("div");
            const transitionCloudImgEl = document.createElement("img");
            
            transitionCloudImgEl.src = "cloud-drawing.png";

            transitionCloudEl.classList.add("splash-transition-cloud");
            transitionCloudEl.append(transitionCloudImgEl);

            transitionCloudEl.style.width = `${Math.floor(Math.random() * (22.5 - 12.5) + 22.5)}vw`
            transitionCloudEl.style.top = `${(Math.random() * 107.5) - 7.5}vh`;
            // transitionCloudEl.style.left = `${-1 * Math.random() * 100}vh`;
            sectionSplashEl.children[0].append(transitionCloudEl);

            renderCloud(index + 1);
        }, 1)
    }

    const beginTransitionLetterOpeningScene = () => {
        sectionSplashEl.children[0].classList.add("transition-shift-left")
        setTimeout(() => {
            renderCloud(0);
        }, 250)
    }

    splashStartJourneyBtnEl.onclick = () => {
        beginTransitionLetterOpeningScene();
    }
}

runScriptSplash();