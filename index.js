// 'use strict'

const teamPhoto = document.querySelectorAll(".img-wrapper");
const logo = document.querySelector("#home #logo");
const text = document.getElementById("text");
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
const home = document.getElementById("home");
const nanElem = document.getElementById("navElem");
let links = document.querySelector("#links");
const aboutHome = document.querySelector("#name");



const opn = {
    root: null,
    threshold: 0
}
const imageobserver = new IntersectionObserver(imageTrans, opn);

function imageTrans(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const image = entry.target;
            image.style.transform = `translateX(${0})`;
            imageobserver.unobserve(image);
        }
    });
}

const adjustHome = () => {
    const navHeight = getComputedStyle(nav).height;
    home.style.paddingTop = navHeight;
    nanElem.style.top = navHeight;
    aboutHome.style.top = navHeight;

    //which links?
    links = (parseInt(window.screen.width, 10) > 1125) ? document.querySelector("#links") : document.querySelector("#navElem");
    links.addEventListener('click', navigate);

    const sectionObserver = new IntersectionObserver(setNav, { root: null, threshold: 0, rootMargin: '-65%' });

    const sections = document.querySelectorAll(".wrapper,#home");

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


window.addEventListener('load', adjustHome);
window.addEventListener('resize', adjustHome);




teamPhoto.forEach((img) => {
    imageobserver.observe(img);
})

function nicheSeUpar(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = `translateY(0)`;
            interactionObserver.unobserve(entry.target);
        }
    });
}

const interactionObserver = new IntersectionObserver(nicheSeUpar, opn);
interactionObserver.observe(logo);
interactionObserver.observe(text);


function setNav(entries) {
    let maxInt = -1;
    let id = "home";
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxInt) {
            maxInt = entry.intersectionRatio;
            id = entry.target.getAttribute('id');
        }
    });

    if (maxInt != -1) {
        links.querySelector(".li--active")?.classList.remove("li--active");
        links.querySelector(`[data-id="${id}"]`)?.classList.add("li--active");
    }
}



function navigate(event) {
    if (event.target.dataset.id) {
        const targetId = event.target.dataset.id;
        const targetSect = document.getElementById(targetId);

        targetSect.scrollIntoView({ behavior: "smooth" });

        //close dropdown
        links.classList?.remove('links-open');
        menu.setAttribute("src", "images/hamburger.png");
    }
}




menu.addEventListener('click', () => {
    links.classList.toggle('links-open');

    if (menu.getAttribute("src") != "images/close1.png")
        menu.setAttribute("src", "images/close1.png");
    else
        menu.setAttribute("src", "images/hamburger.png");
})



document.querySelector("form").addEventListener('submit', (event) => {
    event.preventDefault();
});