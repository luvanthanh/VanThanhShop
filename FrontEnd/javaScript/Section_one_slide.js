document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".section-one-right .list-slides img");
  const slidesContainer = document.querySelector(".section-one-right .list-slides");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");
  let currentIndex = 0;
  let intervalId;

  slidesContainer.style.width = `${slides.length * 1095}px`;

  function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 1090}px)`;
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
    intervalId = setInterval(nextSlide, 2000);
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
  startAutoSlide();
});



