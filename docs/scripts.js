"use strict";
// Source for docs/scripts.js. Edit this file and run `npm run build`.
// Loaded as a classic script: these functions are globals called from inline <script> blocks in the HTML pages.
const DEFAULT_SPEED = 20;
function loadHeader(text, speed = DEFAULT_SPEED) {
    const target = document.getElementById("typing-effect");
    if (!target) {
        return;
    }
    let idx = 0;
    const typeWriting = () => {
        if (idx <= text.length) {
            target.innerHTML = text.slice(0, idx);
            idx++;
            setTimeout(typeWriting, speed);
        }
    };
    typeWriting();
}
function animateSlideshow() {
    const prefix = "/static/coverphotos/";
    const imageArray = ["mark_providence_photo.jpg", "mark_acadia_photo.jpg", "mark_bern_photo.jpg"];
    const length = imageArray.length;
    const imageElement = document.getElementById("cover-image");
    if (!imageElement) {
        return;
    }
    let index = 0;
    const changeImage = () => {
        //fade out the current image
        imageElement.style.opacity = '0';
        //after the fade out completes, change the image
        setTimeout(() => {
            imageElement.src = prefix + imageArray[index];
            index = (index + 1) % length;
            //preloading the image to avoid any flicker
            const img = new Image();
            img.onload = () => {
                //once its loaded fade it in
                imageElement.style.opacity = '1';
            };
            img.src = imageElement.src;
        }, 500);
    };
    //initialize with first image
    const initializeSlideshow = () => {
        imageElement.src = prefix + imageArray[index];
        index = (index + 1) % length;
        //fade in the first image once it loads
        imageElement.onload = () => {
            imageElement.style.opacity = '1';
        };
    };
    initializeSlideshow();
    setInterval(changeImage, 60000);
}
function animateLoading(id) {
    window.addEventListener("load", () => {
        const section = document.getElementById(id);
        if (!section) {
            return;
        }
        section.classList.remove("opacity-0", "translate-y-5");
        section.classList.add("opacity-100", "translate-y-0");
    });
}
