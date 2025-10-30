'use strict';

{

  const page = document.getElementById('page');

  // ===========================================
  //  スクロールしたら追従ボタンが縮小
  // ===========================================

  const screenTop = document.getElementById('screen-top');

  const scrollObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      page.classList.remove('is-scroll');
    } else {
      page.classList.add('is-scroll');
    }
  });

  scrollObserver.observe(screenTop);

  // ===========================================
  //  アニメーション対象を一括監視
  // ===========================================

  const effectTargets = document.querySelectorAll('[data-fx]');

  const effectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -20%',
    threshold: 0,
  });

  effectTargets.forEach(el => effectObserver.observe(el));

    // ===========================================
  //  フェードイン用のテキスト分割処理
  // ===========================================

  const splitTextTargets = document.querySelectorAll('[data-fx="fadein-text"]');

  splitTextTargets.forEach(target => {
    const text = target.textContent.trim();
    const letters = text.split('');
    target.innerHTML = '';
    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.classList.add('fadein-letter');
      span.style.display = 'inline-block';
      span.style.setProperty('--index', index);
      target.appendChild(span);
    })
  });

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
