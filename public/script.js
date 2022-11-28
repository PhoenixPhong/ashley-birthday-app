// // ==============================================
// //   AWESOME BIRTHDAY SITE PROJECT REQUIREMENTS
// // ==============================================

// // 1) Display a greetings section with a special message and photo
// // 2) Display a biography section with text and links to her favorite things
// // 3) Display a photo section where guests can upload their own photos and videos
// // 4) Display a messages section where guests can write a text or email and send directly
// // 5) Make a PWA so Ashley can download the app on her phone and open directly to browser


const runScriptMain = () => {
    const mainScrollContainerEl = document.getElementById("scroll_container");

    mainScrollContainerEl.onwheel = (e) => {
        e.preventDefault();
        e.stopPropagation();

        return false;
    }
}

runScriptMain();


