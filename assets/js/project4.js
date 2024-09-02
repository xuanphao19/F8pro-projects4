// https://www.youtube.com/watch?v=DqkH_PV5cto

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnGroup = $("#choice .btn-group");

if (btnGroup) {
  btnGroup.onclick = (event) => {
    const btn = btnGroup.querySelectorAll(".btn");

    btn.forEach((item) => {
      const currentBtn = event.target.closest(".btn");
      if (currentBtn) {
        item.classList.remove("active");
        currentBtn.classList.add("active");
        btnGroup.title = currentBtn.innerText;
      }
    });
  };
}

/* ===================== */
/* ======  carousel  ======= */
/* ===================== */

const carousel = $(".carousel");
const slider = $(".sliders");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const dots = $(".slider-dot");
let sliderItems = $$(".slider-item");

const timer = 1800;
let index = 1;
let idInterval;
let itemLength = sliderItems.length - 1;
const sliderDot = [];

let sliderWidth = carousel.offsetWidth;

sliderItems.forEach((item, idx) => {
  item.style.width = sliderWidth + "px";
  sliderDot.push(`<span class="dot${idx === 0 ? " active" : ""}"></span>`);
});

if (dots) dots.innerHTML = sliderDot.join("");
const dotList = $$(".dot");

const firstClone = sliderItems[0].cloneNode(true);
const lastClone = sliderItems[itemLength].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";
slider.prepend(lastClone);
slider.append(firstClone);

window.addEventListener("resize", function () {
  sliderWidth = carousel.offsetWidth;
  sliderItems.forEach((item) => (item.style.width = sliderWidth + "px"));
});

const startTranslate = () => (slider.style.transform = `translateX(${-sliderWidth * index}px)`);
startTranslate();

const startSlider = () => {
  idInterval = setInterval(() => {
    handleNextSlider();
  }, timer);
};

const getSlider = () => $$(".slider-item");
const handleSlider = (index) => {
  startTranslate();
  slider.style.transition = "0.8s";
};

const handleNextSlider = () => {
  sliderItems = getSlider();
  if (index >= sliderItems.length - 1) return;
  activeDot(index);
  index++;
  handleSlider(index);
};

const handlePrevSlider = () => {
  if (index <= 0) return;
  index--;
  const idx = index === 0 ? itemLength : index - 1;
  activeDot(idx);
  handleSlider(index);
};

slider.addEventListener("transitionend", () => {
  sliderItems = getSlider();
  if (sliderItems[index]?.id === firstClone.id) {
    slider.style.transition = "none";
    index = 1;
    startTranslate();
  }
  if (sliderItems[index]?.id === lastClone.id) {
    slider.style.transition = "none";
    index = sliderItems.length - 2;
    startTranslate();
  }
});

const clearIdInterval = () => clearInterval(idInterval);
carousel.addEventListener("mouseenter", clearIdInterval);
carousel.addEventListener("mouseleave", startSlider);
nextBtn.addEventListener("click", handleNextSlider);
prevBtn.addEventListener("click", handlePrevSlider);

const activeDot = (index) => {
  index = index > itemLength ? 0 : index;
  carousel.querySelector(".active")?.classList.remove("active");
  dotList[index].classList.add("active");
};

dotList.forEach((item, idx) => {
  item.onclick = () => {
    index = idx;
    activeDot(idx);
    handleNextSlider();
  };
});

startSlider();

// ====== backToTop =======

const backToTop = $(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});
