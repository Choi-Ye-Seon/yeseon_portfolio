//Main Title animation
document.addEventListener('DOMContentLoaded', () => {
    // .intro 클래스를 가진 div 내의 모든 <p> 태그를 선택합니다
    const paragraphs = document.querySelectorAll('.intro p');

    paragraphs.forEach(p => {
        const textContent = p.innerHTML; // HTML을 가져옵니다

        // 텍스트를 글자별로 <span>으로 감싸기
        const wrappedHTML = textContent.split('').map(char => {
            // 공백과 HTML 엔티티를 그대로 유지하기
            if (char.trim() === '' || char === '&') {
                return char;
            }
            return `<span>${char}</span>`;
        }).join('');

        // <p> 태그의 내용을 업데이트합니다
        p.innerHTML = wrappedHTML;

        // <p> 태그 내부의 모든 <span> 요소를 선택합니다
        const spans = p.querySelectorAll('span');

        spans.forEach(span => {
            // 각 글자에 대해 마우스가 들어올 때
            span.addEventListener('mouseenter', () => {
                span.style.color = 'rgba(255, 255, 255, .8)'; // 색상 변경
            });

            // 각 글자에 대해 마우스가 나갈 때
            span.addEventListener('mouseleave', () => {
                span.style.color = ''; // 원래 색상으로 되돌리기
            });
        });
    });
});
// Navigation
const navigationEl = document.querySelector('.navigation');
const mainEl = document.querySelector('main');
/*
function mainPadding(){
    if(navigationEl.classList.contains('fold')){
        //fold 클래스가 붙으면 90px
        mainEl.style.paddingLeft = '90px'
    }else{
        //fold 클래스가 없으면 310px
         mainEl.style.paddingLeft = '320px'
    }
}
*/
//navigation 호버 시, fold 클래스 추가, 제거 함수 선언
function mouseEnter() {
    navigationEl.classList.remove('fold');
    // mainPadding();
}

function mouseLeave() {
    navigationEl.classList.add('fold');
    // mainPadding();

}
//navigation 호버 시, fold 클래스 추가, 제거 함수 실행
navigationEl.addEventListener('mouseenter', mouseEnter);
navigationEl.addEventListener('mouseleave', mouseLeave);
// updateMainPadding();






// navigation 메뉴 클릭 시, active 클래스 컨트롤
const list = document.querySelectorAll('.list');

function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'));
    this.classList.add('active');
}

list.forEach((item) =>
    item.addEventListener('click', activeLink));

// 반응형 NAV
const headerEl = document.querySelector('header');
const menuToggle = headerEl.querySelector('header .menu-toggle');
const slideNav = headerEl.querySelector('header .slide-nav');

menuToggle.addEventListener('click', function () {
    if (menuToggle.classList.contains('on')) {
        menuToggle.classList.remove('on');
        headerEl.classList.remove('menuing');
        document.documentElement.classList.remove('fixed');
    } else {
        menuToggle.classList.add('on')
        headerEl.classList.add('menuing');
        document.documentElement.classList.add('fixed');

    }
});

const menuEls = slideNav.querySelectorAll('.list');

menuEls.forEach(function (menuEl) {
    menuEl.addEventListener('click', function () {

      menuEls.forEach(function(el){
        el.classList.remove('active');
      });
        menuEl.classList.add('active');
        menuToggle.classList.remove('on');
        headerEl.classList.remove('menuing');
        document.documentElement.classList.remove('fixed');
    });
});

//반응형 html fiexd 충돌 개선
window.addEventListener('resize', function(){
    if(this.window.innerWidth > 1024){
        menuToggle.classList.remove('on');
        headerEl.classList.remove('menuing');
        document.documentElement.classList.remove('fixed');
    }
});


//ScrollMagic
const spyEls = document.querySelectorAll('.scroll-spy');

spyEls.forEach(function(spyEl){

    let isDraw = false;

    const scene = new ScrollMagic
    .Scene({
        triggerElement: spyEl,
        triggerHook : .8
    })
    .on('enter', function(){
        spyEl.classList.add('show');
        startDraw(spyEl);
    })
    .on('leave', function(){
        spyEl.classList.remove('show');
    })
    .addTo(new ScrollMagic.Controller())
});




// About Swiper JS
let swiperInstance = new Swiper('#profile .swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: "#profile .swiper .swiper-pagination",
        clickable: true
    },
    autoHeight: true
});

//Skills
function startDraw(spyEl) {
    if (spyEl.querySelector('.item.html')) {
        draw(110, '.item.html', '#2D593D');
    }
    if (spyEl.querySelector('.item.css')) {
        draw(110, '.item.css', '#34724B');
    }
    if (spyEl.querySelector('.item.js')) {
        draw(110, '.item.js', '#68A77C');
    }
    if (spyEl.querySelector('.item.jquery')) {
        draw(110, '.item.jquery', '#9BBE83');
    }
    if (spyEl.querySelector('.item.xd')) {
        draw(110, '.item.xd', '#9FBF98');
    }
    if (spyEl.querySelector('.item.photoshop')) {
        draw(110, '.item.photoshop', '#C4D8C0');
    }
}

function draw(max, classname, colorname) {
    var i = 1;
    var func1 = setInterval(function () {
        if (i < max) {
            color1(i, classname, colorname);
            i++;
        } else {
            clearInterval(func1);
        }
    }, 10);
}

function color1(i, classname, colorname) {
    $(classname).css({
        "background": "conic-gradient(" + colorname + " 0% " + i + "%, #ffffff " + i + "% 100%)"
    });
}


// Project Swiper JS
// 1. 개인프로젝트
const project01 = new Swiper('#project .swiper.project01', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: "#project .swiper.project01 .swiper-pagination",
        clickable: true
    },
    autoHeight: true
});

// 2. 상품개발
// Project Swiper JS
const project02 = new Swiper('#project .swiper.project02', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: "#project .swiper.project02 .swiper-pagination",
        clickable: true
    },
    autoHeight: true
});

// 3. 맞춤작업
// Project Swiper JS
const project03 = new Swiper('#project .swiper.project03', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: "#project .swiper.project03 .swiper-pagination",
        clickable: true
    },
    autoHeight: true
});


// Fancybox (lightbox) 스크립트
document.addEventListener('DOMContentLoaded', function () {
    // Section 1 gallery
    Fancybox.bind('[data-fancybox="gallery1"]', {
        infinite: true,
        arrows: true,
        buttons: ["zoom", "close"],
    });

    // Section 2 gallery
    Fancybox.bind('[data-fancybox="gallery2"]', {
        infinite: false, // 갤러리 순환 기능 비활성화
        arrows: true,
        buttons: ["zoom", "close"],
    });

    // Section 3 gallery
    Fancybox.bind('[data-fancybox="gallery3"]', {
        infinite: true,
        arrows: true,
        buttons: ["zoom", "close"],
    });
});

// 반응형 작업설명 더보기 
    const infoViewEls = document.querySelectorAll('#project ul.description button.infoView');


    infoViewEls.forEach(function(infoView){
        infoView.addEventListener('click', function(){

            const arrowEl = this.querySelector('i');
            const viewmoreEls = this.closest('#project .swiper-slide').querySelectorAll('ul.description li.viewmore');

            arrowEl.classList.toggle('view');
    
            viewmoreEls.forEach(function(viewmoreEl){
                viewmoreEl.classList.toggle('view');
            });
    
            const swiperEl = this.closest('#project .swiper');
            if(swiperEl.classList.contains('project01')){
                project01.updateAutoHeight();
            }else if(swiperEl.classList.contains('project02')){
                project02.updateAutoHeight();
            } else if(swiperEl.classList.contains('project03')){
                project03.updateAutoHeight();
            }
    
        });

    });
  

// Footer this-year
const yearEl = document.querySelector('footer #this-year');

yearEl.textContent = new Date().getFullYear();