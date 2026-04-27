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
        text: "보랏빛이 감도는 어두운 빛으로 깊은 감성과 몽환적인 분위기를 만들어냅니다. 수면 전 긴장 완화에 최적입니다.",
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
    document
      .getElementById("roomLight")
      .style.setProperty("--room-color", `rgba(${r},${g},${b},${a})`);
    document.getElementById("roomLight").style.background =
      `radial-gradient(ellipse,rgba(${r},${g},${b},${a}) 0%,transparent 70%)`;
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

  const layerData = {
    ambient: {
      circles: [
        {
          cx: "50%",
          cy: "50%",
          r: "45%",
          fill: "rgba(255,200,80,0.15)",
          blur: 30,
        },
        {
          cx: "50%",
          cy: "30%",
          r: "30%",
          fill: "rgba(255,200,80,0.1)",
          blur: 20,
        },
      ],
      label: "Ambient Layer",
    },
    task: {
      circles: [
        {
          cx: "50%",
          cy: "50%",
          r: "45%",
          fill: "rgba(255,200,80,0.1)",
          blur: 30,
        },
        {
          cx: "70%",
          cy: "40%",
          r: "20%",
          fill: "rgba(200,230,255,0.35)",
          blur: 8,
        },
        {
          cx: "70%",
          cy: "40%",
          r: "8%",
          fill: "rgba(220,240,255,0.6)",
          blur: 2,
        },
      ],
      label: "+ Task Layer",
    },
    accent: {
      circles: [
        {
          cx: "50%",
          cy: "50%",
          r: "45%",
          fill: "rgba(255,200,80,0.1)",
          blur: 30,
        },
        {
          cx: "70%",
          cy: "40%",
          r: "20%",
          fill: "rgba(200,230,255,0.25)",
          blur: 8,
        },
        {
          cx: "20%",
          cy: "30%",
          r: "15%",
          fill: "rgba(255,130,60,0.4)",
          blur: 5,
        },
        {
          cx: "20%",
          cy: "60%",
          r: "10%",
          fill: "rgba(255,130,60,0.3)",
          blur: 5,
        },
      ],
      label: "+ Accent Layer",
    },
    decorative: {
      circles: [
        {
          cx: "50%",
          cy: "50%",
          r: "45%",
          fill: "rgba(255,200,80,0.1)",
          blur: 30,
        },
        {
          cx: "70%",
          cy: "40%",
          r: "20%",
          fill: "rgba(200,230,255,0.2)",
          blur: 8,
        },
        {
          cx: "20%",
          cy: "30%",
          r: "15%",
          fill: "rgba(255,130,60,0.35)",
          blur: 5,
        },
        {
          cx: "50%",
          cy: "80%",
          r: "8%",
          fill: "rgba(200,150,255,0.4)",
          blur: 6,
        },
        {
          cx: "30%",
          cy: "70%",
          r: "5%",
          fill: "rgba(200,150,255,0.3)",
          blur: 4,
        },
        {
          cx: "70%",
          cy: "75%",
          r: "5%",
          fill: "rgba(200,150,255,0.3)",
          blur: 4,
        },
      ],
      label: "Full Layering Complete",
    },
  };

  function setLayer(id, el) {
    document
      .querySelectorAll(".layer-step")
      .forEach((s) => s.classList.remove("active"));
    if (el) el.classList.add("active");
    const d = layerData[id];
    const canvas = document.getElementById("layerCanvas");
    canvas.innerHTML =
      d.circles
        .map(
          (c) =>
            `<div style="position:absolute;left:${c.cx};top:${c.cy};transform:translate(-50%,-50%);width:${c.r};height:${c.r};border-radius:50%;background:${c.fill};filter:blur(${c.blur}px);transition:all 0.8s ease;pointer-events:none"></div>`,
        )
        .join("") +
      `<div style="position:absolute;bottom:1.5rem;left:50%;transform:translateX(-50%);font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(245,237,216,0.4);white-space:nowrap">${d.label}</div>`;
  }
  setLayer("ambient", null);

  const stories = [
    {
      text: '"Amber Cocoon을 켜는 순간, 집이 호텔 스위트룸이 됐어요. 퇴근 후 그 빛 아래 앉으면 하루의 긴장이 자연스럽게 풀립니다."',
      author: "김지은 — 29세, 서울 마포구",
    },
    {
      text: '"Clarity Tower 하나로 공부 효율이 완전히 달라졌어요. 빛이 이렇게 집중력에 영향을 줄 수 있다는 걸 처음 알았습니다."',
      author: "박민준 — 26세, 서울 용산구",
    },
    {
      text: '"저녁마다 Warm Pendant 아래서 가족과 식사를 해요. 같은 밥상인데 분위기가 달라지니 대화도 자연스럽게 길어지더라고요."',
      author: "이수진 — 38세, 경기도 판교",
    },
  ];
  function setStory(i, el) {
    document.getElementById("storyText").textContent = stories[i].text;
    document.getElementById("storyAuthor").textContent = stories[i].author;
    document
      .querySelectorAll(".dot")
      .forEach((d) => d.classList.remove("active"));
    if (el) el.classList.add("active");
    else document.querySelectorAll(".dot")[i].classList.add("active");
  }
  let si = 0;
  setInterval(() => {
    si = (si + 1) % 3;
    setStory(si, null);
  }, 6000);
});
