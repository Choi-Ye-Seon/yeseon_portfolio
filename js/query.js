$(document).ready(function(){
    // Project Tab-menu 구현
    $('#project ul li.tab-menu').click(function(){
        $(this).addClass('on');
        $(this).siblings().removeClass('on');

        let idxNum = $(this).index();
        $(this).parent().siblings('.tab-con').removeClass('view');
        $(this).parent().siblings('.tab-con').eq(idxNum).addClass('view');
    });

    // Project 플러그인 Thumb img Slide 구현
    $("#project #slide a:gt(0)").css("left", "500px");  // 첫 번째 이미지를 제외한 나머지 이미지를 오른쪽에 배치
    let now = 0;
    const imgs = 2;  // 총 이미지 수(0부터 시작하므로 실제 이미지 수 - 1)
    
    setInterval(function(){
        let previous = now;
        now = (now == imgs) ? 0 : ++now;
    
        $("#project #slide a").eq(now).css("left", "500px").animate({
            "left": "0"
        }, 1000);  // 현재 이미지가 오른쪽에서 왼쪽으로 들어옴
    
        $("#project #slide a").eq(previous).animate({
            "left": "-500px"
        }, 1000);  // 이전 이미지는 왼쪽으로 나감
    }, 3500);


});