/* ── 멤버십 탭 ── */
document.addEventListener("DOMContentLoaded", () => {
  const tabBtns = document.querySelectorAll(".membership-tabs button");
  const panels = document.querySelectorAll(".membership-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      const target = document.getElementById("panel-" + btn.dataset.panel);
      if (target) target.classList.add("active");
    });
  });
});
