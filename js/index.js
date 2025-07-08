$('.approach_bck').hide();

$(window).on('scroll', function () {
  const scrollTop = $(this).scrollTop();         // 현재 스크롤 위치
  const windowHeight = $(window).height();       // 브라우저 높이 (100vh)
  const triggerPoint = windowHeight * 1.1; // 110vh 계산


  if (scrollTop < triggerPoint) {
    $('.approach_bck').hide();  // 0~100vh 사이에서는 숨김
  } else {
    $('.approach_bck').show();  // 나머지 구간에서는 표시
  }
});

$(function () {
  function isMobile() {
    return $(window).width() <= 768;
  }

  // 클릭 시 .clicked 토글 (모바일에서만)
  $('.project_card').on('click', function () {
    if (isMobile()) {
      $(this).toggleClass('clicked');
    }
  });

  // 리사이즈 시 .clicked 제거
  $(window).on('resize', function () {
    $('.project_card').removeClass('clicked');
  });
});