document.addEventListener("DOMContentLoaded", () => {
  const lampContainer = document.getElementById("lampContainer");
  const stickySection = document.getElementById("stickySection");
  const lampImg = document.getElementById("lampImage");
  const innerLight = document.getElementById("innerLight");
  const lightGlow = document.getElementById("lightGlow");
  const bedroomBg = document.querySelector(".bedroom-bg");
  const controls = document.getElementById("controls");
  // 텍스트 박스 변수 추가
  const lightTextBox = document.getElementById("lightTextBox");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const rect = stickySection.getBoundingClientRect();

    // 메인 비주얼 구간에서의 진행률 계산 (0 ~ 1)
    let progress = Math.max(0, Math.min(1, -rect.top / vh));

    // 1. 위치 계산: translateY로 부드럽게 이동
    const startY = 10; 
    const endY = 0; 
    const currentY = startY + (endY - startY) * progress;

    // 2. transform 적용
    lampContainer.style.transform = `translateX(-50%) translateY(${currentY}vh)`;

    // 3. 클래스 제어 (크기 변화용)
    if (progress > 0.1) lampContainer.classList.add("is-main");
    else lampContainer.classList.remove("is-main");

    // 4. 조명 밝기 및 배경 인터랙션
    const startEffect = vh * 0.7;
    const endEffect = vh * 2.5;

    if (scrollY > startEffect) {
      let effectProgress = Math.min(
        1,
        (scrollY - startEffect) / (endEffect - startEffect),
      );

      lampImg.style.filter = `brightness(${effectProgress})`;
      innerLight.style.opacity = Math.pow(effectProgress, 2) * 1.5;
      bedroomBg.style.opacity = effectProgress;
      lightGlow.style.opacity = effectProgress * 0.8;

      // 텍스트는 0.6에서 먼저 등장
      if (effectProgress > 0.6) lightTextBox.classList.add("show");
      else lightTextBox.classList.remove("show");

      // 버튼은 0.8에서 나중에 등장
      if (effectProgress > 0.9) controls.classList.add("show");
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


