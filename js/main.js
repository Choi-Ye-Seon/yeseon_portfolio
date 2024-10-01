// 1. [HOME] Title animation
document.addEventListener('DOMContentLoaded', function () {
    const paragraphs = document.querySelectorAll('.intro p');

    paragraphs.forEach(function (p) {
        const textContent = p.innerHTML; // 'CHOI YE SEON PORTFOLIO' 저장

        // 텍스트를 글자별로 쪼갠 후, <span>으로 감싸기
        const wrappedHTML = textContent.split('').map(function (char) {
            // 공백도 그대로 출력하지만 <span>으로 감싸지는 않음
            if (char.trim() === '' || char === '&') {
                return char;
            }
            return '<span>' + char + '</span>'; // 공백이 아닌 순수 문자는 <span>으로 감싸기
        }).join('');

        // 위 함수 실행에 대한 결과 값(쪼개진 문자열)을 .intro p태그에 다시 저장
        p.innerHTML = wrappedHTML;

        // 각 글자에 대한 애니메이션 설정
        const spans = p.querySelectorAll('span');

        spans.forEach(function (span) {
            span.addEventListener('mouseenter', function () {
                span.style.color = 'rgba(255, 255, 255, .8)';
                // hover 컬러 변경. CSS에서도 변경 필요
            });

            span.addEventListener('mouseleave', function () {
                span.style.color = ''; // 원래 색상으로 되돌리기
            });
        });
    });
});


// 2. Navigation
// 2-1. PC - Nav : fold 상태에 따른 CSS 설정을 위해 class 컨트롤
const navigationEl = document.querySelector('.navigation');
const mainEl = document.querySelector('main');

//fold 클래스 컨트롤 함수 선언
function mouseEnter() {
    navigationEl.classList.remove('fold');
}

function mouseLeave() {
    navigationEl.classList.add('fold');
}

//fold 클래스 컨트롤 함수 실행
navigationEl.addEventListener('mouseenter', mouseEnter);
navigationEl.addEventListener('mouseleave', mouseLeave);


// 2-2. 섹션 이동 시, Nav 추적
document.addEventListener('DOMContentLoaded', function () {
    const listItems = document.querySelectorAll('.list');
    const sections = document.querySelectorAll('section');

    // 섹션과 네비게이션 링크를 연결하기 위한 함수
    function setActiveLink(activeSection) {
        listItems.forEach(function (item) {
            if (item.dataset.section === activeSection) { // list의 data 속성인 data-section 값과 섹션의 ID값을 비교
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Intersection Observer
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id); // Section이 감지될 때, data-section값과 Section의 ID값을 비교하는 함수 실행
            }
        });
    }, {
        threshold: 0.5
    }); // 50% 이상 보일 때 활성화

    // 각 섹션에 대해 observer 관찰 시작
    sections.forEach(function (section) {
        observer.observe(section);
    });

    // 2-3. 클릭 시 active 클래스 업데이트
    listItems.forEach(function (item) {
        item.addEventListener('click', function () {
            listItems.forEach(function (el) {
                el.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});


// 2-4. 반응형 모바일 기기 Navigation
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
// 2-5. 반응형 모바일 기기 Nav / active 활성화
const menuEls = slideNav.querySelectorAll('.list');

menuEls.forEach(function (menuEl) {
    menuEl.addEventListener('click', function () {

        menuEls.forEach(function (el) {
            el.classList.remove('active');
        });
        menuEl.classList.add('active');
        menuToggle.classList.remove('on');
        headerEl.classList.remove('menuing');
        document.documentElement.classList.remove('fixed');
    });
});

// 2-6. 반응형 html fiexd 충돌 개선
window.addEventListener('resize', function () {
    if (this.window.innerWidth > 1024) {
        menuToggle.classList.remove('on');
        headerEl.classList.remove('menuing');
        document.documentElement.classList.remove('fixed');
    }
});


// 3. ScrollMagic
const spyEls = document.querySelectorAll('.scroll-spy');

spyEls.forEach(function (spyEl) {

    let isDraw = false;

    const scene = new ScrollMagic
        .Scene({
            triggerElement: spyEl,
            triggerHook: .8
        })
        .on('enter', function () {
            spyEl.classList.add('show');
            startDraw(spyEl);
        })
        .on('leave', function () {
            spyEl.classList.remove('show');
        })
        .addTo(new ScrollMagic.Controller())
});



// 4. About Swiper JS
let swiperInstance = new Swiper('#profile .swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: "#profile .swiper .swiper-pagination",
        clickable: true
    },
    autoHeight: true
});


// 5. Skills / circle draw 효과 함수 선언
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
    let i = 1; // 시작값
    let func1 = setInterval(function () {
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
        // colorname 색상 : 시작점(0%)부터 i%까지 적용
        // #fff 색상 : i% 이후부터 #ffffff (흰색)으로 그라디언트가 변함 (실질적으로는 보이지 않는 색)
    });
}


//  6. Project Swiper JS
// 6-1. 개인프로젝트
const project01 = new Swiper('#project .swiper.project01', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: "#project .swiper.project01 .swiper-pagination",
        clickable: true
    },
    autoHeight: true
});

// 6-2. 상품개발
const project02 = new Swiper('#project .swiper.project02', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: "#project .swiper.project02 .swiper-pagination",
        clickable: true
    },
    autoHeight: true
});

// 6-3. 맞춤작업
const project03 = new Swiper('#project .swiper.project03', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: "#project .swiper.project03 .swiper-pagination",
        clickable: true
    },
    autoHeight: true
});


// 7. Fancybox (lightbox) 스크립트
document.addEventListener('DOMContentLoaded', function () {
    // Section 1 gallery
    Fancybox.bind('[data-fancybox="gallery1"]', {
        infinite: true,
        arrows: true,
        buttons: ["zoom", "close"],
    });

    // Section 2 gallery
    Fancybox.bind('[data-fancybox="gallery2"]', {
        infinite: true,
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


// 8. 반응형 Project 작업설명 더보기 및 swiper Autoheight
const infoViewEls = document.querySelectorAll('#project ul.description button.infoView');

infoViewEls.forEach(function (infoView) {
    infoView.addEventListener('click', function () {

        // 8-1. 작업설명 더보기 
        const arrowEl = this.querySelector('i');
        const viewmoreEls = this.closest('#project .swiper-slide').querySelectorAll('ul.description li.viewmore');

        arrowEl.classList.toggle('view');

        viewmoreEls.forEach(function (viewmoreEl) {
            viewmoreEl.classList.toggle('view');
        });

        // 8-2. Swiper Autoheight
        // updateAutoHeight() : Swiper.js에서 사용하는 메소드로, 슬라이더의 높이를 동적으로 업데이트하는 데 사용
        const swiperEl = this.closest('#project .swiper');
        if (swiperEl.classList.contains('project01')) {
            project01.updateAutoHeight();
        } else if (swiperEl.classList.contains('project02')) {
            project02.updateAutoHeight();
        } else if (swiperEl.classList.contains('project03')) {
            project03.updateAutoHeight();
        }
    });
});


// Contact / What My Team Says!
new Swiper('#contact .swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
        el: '#contact .swiper .swiper-pagination',
        clickable: true
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 30,
            slidesOffsetAfter: 0
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesOffsetAfter: 0
        }
    }
});



// Footer this-year
const yearEl = document.querySelector('footer #this-year');
yearEl.textContent = new Date().getFullYear();