$(function () {

    $('.content').hide();

    $('.content-title').click(function () {
        $(this).next().slideToggle().siblings('.content').slideUp();
    });


    $('.gotop').click(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    const animationMove = function (selector) {
        const targetEl = document.querySelector(selector);
        const bs = window.scrollY;
        const targetSy = targetEl.getBoundingClientRect().top + bs;
        window.scrollTo({
            top: targetSy,
            behavior: 'smooth'
        });
    };

    const scrollMove = document.querySelectorAll('[data-animation-scroll="true"]');
    for (let i = 0; i < scrollMove.length; i++) {
        scrollMove[i].addEventListener('click', function () {
            const target = this.dataset.target;
            animationMove(target);
        });
    }
    document.querySelectorAll('a[data-animation-scroll="true"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('data-target'));


            let offset = 0;
            if (this.classList.contains('scroll-to-content')) {
                offset = 100;
            }


            const targetPosition = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: targetPosition + offset,
                behavior: 'smooth'
            });
        });
    });
    $('.content-title').on('click', function () {
        const isActive = $(this).hasClass('active');

        $('.content-title').removeClass('active');

        if (!isActive) {
            $(this).addClass('active');
        }
    });


});

document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = document.querySelectorAll('.profile-text p');


    paragraphs.forEach(p => {
        p.dataset.text = p.textContent;
        wrapText(p);
        p.dataset.animated = 'false';
    });

    function wrapText(p) {
        const text = p.dataset.text;
        p.innerHTML = '';
        [...text].forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = 0;
            span.style.transition = 'opacity 0.3s ease';
            p.appendChild(span);
        });
    }

    function animateText(p) {
        const spans = p.querySelectorAll('span');
        spans.forEach((span, i) => {
            setTimeout(() => {
                span.style.opacity = 1;
            }, i * 80);
        });
    }

    function handleScroll() {
        const scrollTop = window.scrollY;
        const isAtTop = scrollTop === 0;

        paragraphs.forEach(p => {
            const rect = p.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            const alreadyAnimated = p.dataset.animated === 'true';


            if (isVisible && !alreadyAnimated && !isAtTop) {
                p.dataset.animated = 'true';
                animateText(p);
            }


            if (isAtTop) {
                p.dataset.animated = 'false';
                initOpacity();
            }
        });
    }

    function initOpacity() {
        paragraphs.forEach(p => {
            const spans = p.querySelectorAll('span');
            spans.forEach(span => {
                span.style.opacity = 0;
            });
        });
    }

    initOpacity();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

});

