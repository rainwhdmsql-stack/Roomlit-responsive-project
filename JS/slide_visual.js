/* ── slide_visual.js (simulator) ── */
document.addEventListener("DOMContentLoaded", () => {
  const moods = {
    rest: {
      color: "rgba(255,190,60,VAR)",
      temp: 2800,
      bright: 45,
      desc: {
        title: "휴식 모드",
        text: "따뜻한 황금빛 조명이 하루의 긴장을 풀어줍니다. 낮은 밝기와 낮은 색온도로 심신의 이완을 유도합니다.",
      },
    },
    work: {
      color: "rgba(200,230,255,VAR)",
      temp: 5500,
      bright: 85,
      desc: {
        title: "집중 작업 모드",
        text: "청백색의 밝은 조명이 뇌를 각성시키고 집중력을 높여줍니다. 높은 색온도로 낮과 같은 에너지를 유지합니다.",
      },
    },
    dinner: {
      color: "rgba(255,150,50,VAR)",
      temp: 2400,
      bright: 55,
      desc: {
        title: "저녁 식사 모드",
        text: "주황빛의 따뜻한 조명이 식탁 위 음식을 더욱 맛있게 보이게 합니다. 대화와 친밀감을 높여주는 빛입니다.",
      },
    },
    night: {
      color: "rgba(180,140,255,VAR)",
      temp: 2200,
      bright: 20,
      desc: {
        title: "야간 무드",
        text: "보랏빛이 감도는 어두운 빛으로 깊은 감성과 몽환적인 분위기를 만들어냅니다.",
      },
    },
  };

  function kelvinToRgb(k) {
    k = k / 100;
    let r, g, b;
    if (k <= 66) {
      r = 255;
      g =
        k <= 0
          ? 0
          : Math.min(255, 99.4708025861 * Math.log(k) - 161.1195681661);
      b =
        k >= 19
          ? Math.min(255, 138.5177312231 * Math.log(k - 10) - 305.0447927307)
          : 0;
    } else {
      r = Math.min(255, 329.698727446 * Math.pow(k - 60, -0.1332047592));
      g = Math.min(255, 288.1221695283 * Math.pow(k - 60, -0.0755148492));
      b = 255;
    }
    return {
      r: Math.round(Math.max(0, r)),
      g: Math.round(Math.max(0, g)),
      b: Math.round(Math.max(0, b)),
    };
  }

  function updateRoom() {
    const bright = parseInt(document.getElementById("brightness").value);
    const temp = parseInt(document.getElementById("colorTemp").value);
    document.getElementById("brightnessVal").textContent = bright + "%";
    document.getElementById("tempVal").textContent = temp + "K";
    const { r, g, b } = kelvinToRgb(temp);
    const a = (bright / 100) * 0.7;
    const rl = document.getElementById("roomLight");
    rl.style.setProperty("--room-color", `rgba(${r},${g},${b},${a})`);
    rl.style.background = `radial-gradient(ellipse,rgba(${r},${g},${b},${a}) 0%,transparent 70%)`;
    document.getElementById("roomBulb").style.background =
      `rgba(${r},${g},${b},${Math.min(1, a * 1.5)})`;
    document.getElementById("roomBulb").style.boxShadow =
      `0 0 ${bright / 3}px rgba(${r},${g},${b},0.8)`;
    document.getElementById("simRoom").style.background =
      `rgb(${Math.round(13 + bright * 0.1)},${Math.round(10 + bright * 0.05)},${Math.round(7 + bright * 0.02)})`;
  }

  document.getElementById("brightness").addEventListener("input", updateRoom);
  document.getElementById("colorTemp").addEventListener("input", updateRoom);
  document.querySelectorAll(".mood-tab").forEach((t) =>
    t.addEventListener("click", function () {
      document
        .querySelectorAll(".mood-tab")
        .forEach((x) => x.classList.remove("active"));
      this.classList.add("active");
      const m = moods[this.dataset.mood];
      document.getElementById("brightness").value = m.bright;
      document.getElementById("colorTemp").value = m.temp;
      document.getElementById("moodDesc").querySelector("h4").textContent =
        m.desc.title;
      document.getElementById("moodDesc").querySelector("p").textContent =
        m.desc.text;
      updateRoom();
    }),
  );
  updateRoom();
});
