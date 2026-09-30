document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', toggle.classList.contains('open') ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Frosted home navigation
  var homeHeader = document.querySelector('.home-header');
  if (homeHeader) {
    var updateHeader = function () {
      homeHeader.classList.toggle('scrolled', window.scrollY > 50);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  // Reveal content as it enters the viewport
  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  // Lightweight testimonial carousel
  var carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(track.querySelectorAll('.review-card'));
    var dotsContainer = carousel.querySelector('[data-carousel-dots]');
    var previousButton = carousel.querySelector('[data-carousel-prev]');
    var nextButton = carousel.querySelector('[data-carousel-next]');
    var activeIndex = 0;
    var startX = null;
    var timer = null;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var dots = slides.map(function (_, index) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', 'Show review ' + (index + 1));
      dot.addEventListener('click', function () { showSlide(index); });
      dotsContainer.appendChild(dot);
      return dot;
    });

    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;
      track.style.transform = 'translate3d(-' + (activeIndex * 100) + '%, 0, 0)';
      slides.forEach(function (slide, slideIndex) {
        slide.setAttribute('aria-hidden', slideIndex === activeIndex ? 'false' : 'true');
      });
      dots.forEach(function (dot, dotIndex) {
        dot.setAttribute('aria-current', dotIndex === activeIndex ? 'true' : 'false');
      });
    }

    function stopTimer() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    function startTimer() {
      stopTimer();
      if (!reducedMotion && !document.hidden && slides.length > 1) {
        timer = window.setInterval(function () { showSlide(activeIndex + 1); }, 7000);
      }
    }

    previousButton.addEventListener('click', function () { showSlide(activeIndex - 1); });
    nextButton.addEventListener('click', function () { showSlide(activeIndex + 1); });
    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);
    carousel.addEventListener('focusin', stopTimer);
    carousel.addEventListener('focusout', function (event) {
      if (!carousel.contains(event.relatedTarget)) startTimer();
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopTimer();
      else startTimer();
    });
    carousel.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'touch') startX = event.clientX;
    });
    carousel.addEventListener('pointerup', function (event) {
      if (startX === null) return;
      var distance = event.clientX - startX;
      if (Math.abs(distance) > 45) showSlide(activeIndex + (distance < 0 ? 1 : -1));
      startX = null;
    });
    carousel.addEventListener('pointercancel', function () { startX = null; });

    showSlide(0);
    startTimer();
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });
});
