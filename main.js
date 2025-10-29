'use strict';

{
  // ===========================================
  //  スクロールしたら追従ボタンが縮小
  // ===========================================

  const screenTop = document.getElementById('screen-top');
  const page = document.getElementById('page');

  const scrollObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      page.classList.remove('is-scroll');
    } else {
      page.classList.add('is-scroll');
    }
  });

  scrollObserver.observe(screenTop);

  // ===========================================
  //  ゲームモード切り替え
  // ===========================================

  const flowSection = document.getElementById('flow');
  const tamedMode = document.getElementById('tamed-mode');
  const wildMode = document.getElementById('wild-mode');
  const flowSubTitleTamed = document.getElementById('flow-sub-title-tamed');
  const flowSubTitleWild = document.getElementById('flow-sub-title-wild');

  tamedMode.addEventListener('click', () => {
    flowSection.classList.remove('is-wild');
    flowSection.classList.add('is-tamed');
  });

  wildMode.addEventListener('click', () => {
    flowSection.classList.remove('is-tamed');
    flowSection.classList.add('is-wild');
  });

  flowSubTitleTamed.addEventListener('click', () => tamedMode.click());
  flowSubTitleWild.addEventListener('click', () => wildMode.click());
}
