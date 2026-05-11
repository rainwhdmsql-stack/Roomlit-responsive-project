document.addEventListener("DOMContentLoaded", () => {
  const lampContainer = document.getElementById("lampContainer");
  const stickySection = document.getElementById("stickySection");
  const lampImg = document.getElementById("lampImage");
  const innerLight = document.getElementById("innerLight");
  const lightGlow = document.getElementById("lightGlow");
  const bedroomBg = document.querySelector(".bedroom-bg");
  const controls = document.getElementById("controls");
  const lightTextBox = document.getElementById("lightTextBox");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const rect = stickySection.getBoundingClientRect();

    if (rect.bottom < vh * 0.75) lampContainer.classList.add("is-hidden");
    else lampContainer.classList.remove("is-hidden");

    let progress = Math.max(0, Math.min(1, -rect.top / vh));
    const currentY = 10 + (0 - 10) * progress;
    lampContainer.style.transform = `translateX(-50%) translateY(${currentY}vh)`;

    if (progress > 0.1) lampContainer.classList.add("is-main");
    else lampContainer.classList.remove("is-main");

    const startEffect = vh * 0.7;
    const endEffect = vh * 2.5;

    if (scrollY > startEffect) {
      let ep = Math.min(1, (scrollY - startEffect) / (endEffect - startEffect));
      lampImg.style.filter = `brightness(${ep})`;
      innerLight.style.opacity = Math.pow(ep, 2) * 1.5;
      bedroomBg.style.opacity = ep;
      lightGlow.style.opacity = ep * 0.8;
      if (ep > 0.6) lightTextBox.classList.add("show");
      else lightTextBox.classList.remove("show");
      if (ep > 0.9) controls.classList.add("show");
      else controls.classList.remove("show");
    } else {
      bedroomBg.style.opacity = 0;
      lampImg.style.filter = "brightness(0)";
      innerLight.style.opacity = 0;
      lightGlow.style.opacity = 0;
      lightTextBox.classList.remove("show");
      controls.classList.remove("show");
    }
  });
});

function changeLight(type) {
  const inner = document.getElementById("innerLight");
  const glow = document.getElementById("lightGlow");
  const themes = {
    white: "rgba(255, 250, 240, ",
    studying: "rgba(220, 240, 255, ",
    reading: "rgba(255, 220, 150, ",
    sleep: "rgba(180, 100, 40, ",
  };
  const color = themes[type];
  inner.style.background = `radial-gradient(circle, ${color}1) 0%, ${color}0) 80%)`;
  glow.style.background = `radial-gradient(circle, ${color}0.6) 0%, ${color}0) 70%)`;
}

