document.addEventListener("DOMContentLoaded", () => {
  const fadeText = document.querySelector(".fade-text");
  const bedroomBg = document.querySelector(".bedroom-bg");
  const lampImg = document.getElementById("lampImage");
  const innerLight = document.getElementById("innerLight");
  const lightGlow = document.getElementById("lightGlow");
  const controls = document.getElementById("controls");

  // 텍스트 등장
  setTimeout(() => {
    fadeText.classList.add("active");
  }, 500);

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    // 효과 시작 및 끝 지점 설정
    const startEffect = vh * 0.7; // 서브 비주얼 끝난 후
    const endEffect = vh * 2.5; // 스크롤 중간 지점까지

    if (scrollY > startEffect) {
      let progress = (scrollY - startEffect) / (endEffect - startEffect);
      progress = Math.max(0, Math.min(1, progress));

      // 1. 조명 기구 본체: 암흑에서 서서히 나타남
      lampImg.style.filter = `brightness(${progress})`;

      // 2. 갓 내부 빛: 가장 강하고 빠르게 켜짐
      innerLight.style.opacity = Math.pow(progress, 2) * 1.5;

      // 3. 배경 이미지: 조명이 켜짐에 따라 방 전체가 환해짐
      bedroomBg.style.opacity = progress;

      // 4. 주변 후광(Glow)
      lightGlow.style.opacity = progress * 0.8;

      // 5. 스위치 등장 (80% 지점)
      if (progress > 0.8) {
        controls.classList.add("show");
      } else {
        controls.classList.remove("show");
      }
    } else {
      // 초기 암흑화
      bedroomBg.style.opacity = 0;
      lampImg.style.filter = "brightness(0)";
      innerLight.style.opacity = 0;
      lightGlow.style.opacity = 0;
      controls.classList.remove("show");
    }

    // 다음 섹션으로 이동 시 스위치 제거
    if (scrollY > vh * 3.5) {
      controls.classList.remove("show");
    }
  });
});

// 빛 색상 변경 함수
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
