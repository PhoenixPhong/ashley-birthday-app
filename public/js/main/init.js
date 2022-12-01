import {letterMainScenes} from "../config.js";

const runInitScript = () => {
    const layoutContainer = document.getElementById("lasse__section-layout-container");
    letterMainScenes.forEach((scene, i) => {
        const photoGrid = document.createElement("div");
        photoGrid.classList.add("lasse-layout-photo-grid");

        scene.displayPhotoGrid.forEach((photo, j) => {
            const imgContainerEl = document.createElement("div");
            const imgEl = document.createElement("img");

            imgContainerEl.classList.add("img_lasse");
            imgContainerEl.dataset.mem = `${i},${j}`;
            imgContainerEl.id = `lasse-img-${i}-${j}`;

            imgEl.src = photo.src;
            imgContainerEl.append(imgEl);

            photoGrid.append(imgContainerEl);
        })

        layoutContainer.append(photoGrid);
    })

    
}

runInitScript();