"use strict";

{
  const elements = {
    home: document.querySelector(".js-home"),
    flowSection: document.querySelector(".js-flow"),
    screenTop: document.querySelector(".js-screen-top"),
  };

  // ===========================================
  //  画面のスクロール状態を監視
  // ===========================================
  // 主にCTA-Fixedのスタイル用

  function toggleBodyScrollState() {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      elements.home.classList.toggle("is-scroll", !entry.isIntersecting);
    });
    scrollObserver.observe(elements.screenTop);
  }
  toggleBodyScrollState();

  // ===========================================
  //  アニメーション対象を一括監視
  // ===========================================

  function initScrollEffectObserver() {
    const effectTargets = document.querySelectorAll(".js-fx");
    const effectObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -20%" }
    );
    effectTargets.forEach((target) => effectObserver.observe(target));
  }
  initScrollEffectObserver();

  // ===========================================
  //  アニメーション用のテキスト分割処理
  // ===========================================

  function effectSplitText() {
    const splitTextTargets = document.querySelectorAll(".js-split-text");

    splitTextTargets.forEach((target) => {
      const text = target.textContent.trim();
      target.innerHTML = "";

      const wrapSpan = document.createElement("span");
      wrapSpan.setAttribute("aria-hidden", "true");

      const textSpan = document.createElement("span");
      textSpan.textContent = text;
      textSpan.classList.add("visually-hidden");

      const letters = text.split("");
      letters.forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter === " " ? "\u00A0" : letter;
        span.classList.add("u-split-letter");
        span.style.setProperty("--index", index);
        wrapSpan.appendChild(span);
      });

      target.appendChild(wrapSpan);
      target.appendChild(textSpan);
    });
  }
  effectSplitText();

  // ===========================================
  //  ゲームモード切り替え
  // ===========================================

  function flowSectionSwitchGameMode() {
    const tamedMode = document.querySelector(".js-tamed-mode");
    const wildMode = document.querySelector(".js-wild-mode");
    const flowSubTitleTamed = document.querySelector(".js-flow-sub-title-tamed");
    const flowSubTitleWild = document.querySelector(".js-flow-sub-title-wild");

    tamedMode.addEventListener("click", () => {
      elements.flowSection.classList.remove("is-wild-mode");
      elements.flowSection.classList.add("is-tamed-mode");
    });

    wildMode.addEventListener("click", () => {
      elements.flowSection.classList.remove("is-tamed-mode");
      elements.flowSection.classList.add("is-wild-mode");
    });
    
    flowSubTitleTamed.addEventListener("click", () => tamedMode.click());
    flowSubTitleWild.addEventListener("click", () => wildMode.click());
  }
  flowSectionSwitchGameMode();
}
