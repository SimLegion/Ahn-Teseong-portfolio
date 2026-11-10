$(function () {
  // 📌 모바일 판단 함수
  function isMobile() {
    return $(window).width() <= 768;
  }

  const backdrop = document.querySelector('.approach_bck');
  function updateBackdrop() {
    backdrop.classList.toggle('full-strength', window.scrollY >= window.innerHeight * 1.1);
  }
  updateBackdrop();
  window.addEventListener('scroll', updateBackdrop, { passive: true });
  window.addEventListener('resize', updateBackdrop);
  window.addEventListener('pageshow', updateBackdrop);
  // 📌 project_card 클릭 토글 (모바일만)
  $('.project_card').on('click', function () {
    if (isMobile()) {
      $(this).toggleClass('clicked');
    }
  });

  // 📌 브라우저 크기 변경 시 .clicked 제거
  $(window).on('resize', function () {
    $('.project_card').removeClass('clicked');
  });

  // 📌 IntersectionObserver - .scroll-fade 요소 트리거
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
      } else {
        entry.target.classList.remove('on');  // 화면에서 나가면 클래스 제거
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll('.scroll_fade').forEach(el => {
    observer.observe(el);
  });
});