const slides = document.querySelectorAll(".slides");
let currSlide = 0;
const nSlides = slides.length;
const slideButtonContainer = document.querySelector(".slide--buttons");
let intervalId;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

function gotToSlide(x) {
    document.querySelector('.slide--button--active')?.classList.remove('slide--button--active');
    document.querySelector(`[data-slide="${x}"]`)?.classList.add('slide--button--active');

    slides.forEach((slide, i, slides) => {
        slide.style.transform = `translateX(${100 * (i - x)}%)`;
    });
}

//prvious and next buttons imlementation
prev.addEventListener('click', () => {
    clearInterval(intervalId);
    currSlide = (currSlide - 1 + nSlides) % nSlides;
    gotToSlide(currSlide);
    startTimer();
})

next.addEventListener('click', () => {
    clearInterval(intervalId);
    currSlide = (currSlide + 1) % nSlides;
    gotToSlide(currSlide);
    startTimer();
})


// circle-buttons below slider
slides.forEach((slide, i) => {
    slideButtonContainer.insertAdjacentHTML('beforeend',
        `
        <div class='slide--button' data-slide=${i}></div>
        `
    );
})

gotToSlide(currSlide);

function startTimer() {
    intervalId = setInterval(() => {
        currSlide = (currSlide + 1) % nSlides;
        gotToSlide(currSlide);
    }, 4000);
}

startTimer();

slideButtonContainer.addEventListener('click', (event) => {
    event.preventDefault;
    clearInterval(intervalId);
    const targetSlide = event.target.dataset.slide;
    gotToSlide(targetSlide);
    startTimer();
})