(function () {
  const track = document.querySelector(".images");
  const items = Array.from(document.querySelectorAll(".images div"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!track || items.length === 0) return;

  const imagesPerSlide = 3;
  let index = 0;

  function computeStep() {
    if (items.length < 2) {
      const w = items[0].getBoundingClientRect().width;
            const style = getComputedStyle(track);
      const gap = parseFloat(style.gap) || 0;
      return w + gap;
    }
    const rect0 = items[0].getBoundingClientRect();
    const rect1 = items[1].getBoundingClientRect();
    return Math.abs(rect1.left - rect0.left);
  }

  function update() {
    const step = computeStep();
    const move = step * imagesPerSlide * index;
    track.style.transform = `translateX(${-(move)}px)`;
    updateButtons();
  }
 function updateButtons() {
    const maxIndex = Math.ceil(items.length / imagesPerSlide) - 1;
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex;
  }

  function moveSlide(direction) {
    const maxIndex = Math.ceil(items.length / imagesPerSlide) - 1;
    index += direction;
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;
    update();
  }

  prevBtn.addEventListener("click", () => moveSlide(-1));
  nextBtn.addEventListener("click", () => moveSlide(1));

  window.addEventListener("resize", () => {
    requestAnimationFrame(update);
  });

  update();
})();












