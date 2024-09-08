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

const setupSlider = () => {
  sliderItems.forEach((item, idx) => {
    item.style.width = sliderWidth + "px";
    sliderDot.push(`<span class="dot${idx === 0 ? " active" : ""}"></span>`);
  });

  if (dots) dots.innerHTML = sliderDot.join("");
  dotList = Array.from(carousel.querySelectorAll(".dot"));
};
setupSlider();

const setupClones = () => {
  const firstClone = sliderItems[0].cloneNode(true);
  const lastClone = sliderItems[itemLength].cloneNode(true);
  firstClone.id = "first-clone";
  lastClone.id = "last-clone";
  slider.prepend(lastClone);
  slider.append(firstClone);
};
setupClones();

const startTranslate = () => (slider.style.transform = `translateX(${-sliderWidth * index}px)`);
startTranslate();

const getSlider = () => $$(".slider-item");
const handleSlider = () => {
  startTranslate();
  slider.style.transition = "0.8s";
};

const updateSliderLayout = () => {
  sliderWidth = carousel.offsetWidth;
  sliderItems.forEach((item) => (item.style.width = sliderWidth + "px"));
};

const transitionEndHandler = () => {
  sliderItems = getSlider();
  if (sliderItems[index]?.id === "first-clone") {
    slider.style.transition = "none";
    index = 1;
    startTranslate();
  }
  if (sliderItems[index]?.id === "last-clone") {
    slider.style.transition = "none";
    index = sliderItems.length - 2;
    startTranslate();
  }
};

const startSlider = () => {
  idInterval = setInterval(() => {
    handleNextSlider();
  }, timer);
};
const pauseSlider = () => clearInterval(idInterval);

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

const handleForwardSlider = () => {
  dotList.forEach((item, idx) => {
    item.onclick = () => {
      index = idx;
      activeDot(idx);
      handleNextSlider();
    };
  });
};

const activeDot = (index) => {
  index = index > itemLength ? 0 : index;
  carousel.querySelector(".active")?.classList.remove("active");
  dotList[index].classList.add("active");
};

const setupEvents = () => {
  slider.addEventListener("transitionend", transitionEndHandler);
  carousel.addEventListener("mouseenter", pauseSlider);
  carousel.addEventListener("mouseleave", startSlider);
  nextBtn.addEventListener("click", handleNextSlider);
  prevBtn.addEventListener("click", handlePrevSlider);
  handleForwardSlider();
};
window.addEventListener("resize", updateSliderLayout);
setupEvents();

const createObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startSlider();
      } else {
        pauseSlider();
      }
    });
  });
  observer.observe(carousel);
};
createObserver();

// =====================
// ====== backToTop =======
// =====================

// const backToTop = $(".back-to-top");
window.addEventListener("scroll", () => {
  $(".back-top")?.classList.toggle("active", window.scrollY > 200);
});

AOS.init();

const handleFullscreen = (selector) => {
  const node = document.getElementById(selector);
  if (node.requestFullscreen) {
    node.requestFullscreen();
  } else if (node.mozRequestFullScreen) {
    node.mozRequestFullScreen();
  } else if (node.webkitRequestFullscreen) {
    node.webkitRequestFullscreen();
  } else if (node.msRequestFullscreen) {
    node.msRequestFullscreen();
  }
};
// const fullscreen = document.querySelector(".fullscreen");
// fullscreen.onclick = () => handleFullscreen("fullscreen-container");
