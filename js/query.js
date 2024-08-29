$(document).ready(function () {
    // PROJECT / Tab-menu 구현
    $('#project ul li.tab-menu').click(function () {
        $(this).addClass('on');
        $(this).siblings().removeClass('on');

        let idxNum = $(this).index();
        $(this).parent().siblings('.tab-con').removeClass('view');
        $(this).parent().siblings('.tab-con').eq(idxNum).addClass('view');
    });


    // PROJECT / 맞춤작업(모바일 카드 플러그인 쓰기폼) Thumbnail Slide 구현
    $("#project #slide a:gt(0)").css("left", "500px"); // 첫 번째 이미지(index = 0)를 제외한 나머지 이미지를 오른쪽에 배치

    let now = 0; //현재 표시되고 있는 이미지의 index 저장 (초기값(첫 번째 이미지) = 0)
    const imgs = 2; // 총 이미지 수(0부터 시작하므로 실제 이미지 수 - 1)

    setInterval(function () {
        let previous = now; //전환되기 전의 현재 이미지 index 저장
        now = (now == imgs) ? 0 : ++now; // 조건 불일치 시 now값 1씩 증가

        // 표시될 이미지의 left 위치 값 변경(500px -> 0px) = 노출 중인 이미지
        $("#project #slide a").eq(now).css("left", "500px").animate({
            "left": "0"
        }, 1000);

        // 이전 이미지는 왼쪽으로 -500px 이동
        $("#project #slide a").eq(previous).animate({
            "left": "-500px"
        }, 1000);
    }, 3500);
});