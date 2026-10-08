document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".section-one-right .list-slides img");
  const slidesContainer = document.querySelector(".section-one-right .list-slides");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");
  const slider = document.querySelector(".section-one-right");

  if (!slider || !slidesContainer || !prevBtn || !nextBtn || slides.length < 2) {
    return;
  }

  let currentIndex = 0;
  let intervalId;

  function updateSlideSize() {
    const slideWidth = slider.clientWidth;
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });
    slidesContainer.style.width = `${slides.length * slideWidth}px`;
    showSlide(currentIndex);
  }

  function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * slider.clientWidth}px)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function startAutoSlide() {
    intervalId = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  prevBtn.addEventListener("click", function () {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });

  nextBtn.addEventListener("click", function () {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  showSlide(currentIndex);
  updateSlideSize();
  startAutoSlide();
  window.addEventListener("resize", updateSlideSize);
});


