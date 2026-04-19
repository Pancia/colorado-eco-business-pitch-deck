// Accessible fade slideshow. Autoplay respects prefers-reduced-motion.
// Usage: <div class="slideshow" data-slideshow> <div class="slide">...</div> ... </div>

(function () {
  const AUTOPLAY_MS = 5500;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initSlideshow(root) {
    const slides = Array.from(root.querySelectorAll(".slide"));
    if (slides.length === 0) return;

    let index = 0;
    let timer = null;
    let paused = reducedMotion;

    // Ensure live region announces changes
    root.setAttribute("role", "region");
    root.setAttribute("aria-roledescription", "carousel");
    root.setAttribute("aria-live", "polite");

    slides.forEach((s, i) => {
      s.setAttribute("aria-hidden", i === 0 ? "false" : "true");
      if (i === 0) s.classList.add("is-active");
    });

    function show(next) {
      slides[index].classList.remove("is-active");
      slides[index].setAttribute("aria-hidden", "true");
      index = (next + slides.length) % slides.length;
      slides[index].classList.add("is-active");
      slides[index].setAttribute("aria-hidden", "false");
      updateDots();
    }

    function next() { show(index + 1); }
    function prev() { show(index - 1); }

    function startAutoplay() {
      if (paused || slides.length < 2) return;
      stopAutoplay();
      timer = setInterval(next, AUTOPLAY_MS);
    }
    function stopAutoplay() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    // Controls
    const controls = document.createElement("div");
    controls.className = "absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3";
    controls.innerHTML = `
      <button type="button" data-slide-prev aria-label="Previous slide"
        class="h-9 w-9 rounded-full bg-bone/20 hover:bg-bone/40 text-bone flex items-center justify-center backdrop-blur-sm transition">&larr;</button>
      <div data-slide-dots class="flex items-center gap-2"></div>
      <button type="button" data-slide-pause aria-label="Pause slideshow"
        class="h-9 w-9 rounded-full bg-bone/20 hover:bg-bone/40 text-bone flex items-center justify-center backdrop-blur-sm transition text-xs">II</button>
      <button type="button" data-slide-next aria-label="Next slide"
        class="h-9 w-9 rounded-full bg-bone/20 hover:bg-bone/40 text-bone flex items-center justify-center backdrop-blur-sm transition">&rarr;</button>
    `;
    root.appendChild(controls);

    const dotsWrap = controls.querySelector("[data-slide-dots]");
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.className = "h-1.5 w-6 bg-bone/40 hover:bg-bone/70 transition";
      dot.addEventListener("click", () => { show(i); });
      dotsWrap.appendChild(dot);
    });

    function updateDots() {
      Array.from(dotsWrap.children).forEach((d, i) => {
        d.classList.toggle("bg-bone", i === index);
        d.classList.toggle("bg-bone/40", i !== index);
      });
    }
    updateDots();

    controls.querySelector("[data-slide-prev]").addEventListener("click", () => { stopAutoplay(); prev(); });
    controls.querySelector("[data-slide-next]").addEventListener("click", () => { stopAutoplay(); next(); });

    const pauseBtn = controls.querySelector("[data-slide-pause]");
    pauseBtn.addEventListener("click", () => {
      paused = !paused;
      pauseBtn.textContent = paused ? "▶" : "II";
      pauseBtn.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
      if (paused) stopAutoplay(); else startAutoplay();
    });

    // Pause on hover/focus
    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", () => { if (!paused) startAutoplay(); });
    root.addEventListener("focusin", stopAutoplay);
    root.addEventListener("focusout", () => { if (!paused) startAutoplay(); });

    // Keyboard
    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); stopAutoplay(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); stopAutoplay(); next(); }
    });

    startAutoplay();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-slideshow]").forEach(initSlideshow);
  });
})();
