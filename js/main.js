$(document).ready(function () {
  /* ===================================
   Loading Timeout
   ====================================== */
  setTimeout(function () {
    $(".preloader").fadeOut("slow");
  }, 2000);
});

jQuery(function ($) {
  "use strict";
  //check for browser os
  var isMobile = false;
  var isiPhoneiPad = false;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
  }

  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    isiPhoneiPad = true;
  }

  // sections background image from data background
  var pageSection = $(".parallax, section, .bg-img, .bg");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css("background-image", "url(" + $(this).data("background") + ")");
    }
  });

  /*=============================================== */

  /*   wow
   /* =============================================== */

  var wow = new WOW({
    boxClass: 'wow',
    // animated element css class (default is wow)
    animateClass: 'animated',
    // animation css class (default is animated)
    offset: 0,
    // distance to the element when triggering the animation (default is 0)
    mobile: true,
    // trigger animations on mobile devices (default is true)
    live: true,
    // act on asynchronously loaded content (default is true)
    scrollContainer: null,
    // optional scroll container selector, otherwise use window,
    resetAnimation: true // reset animation on end (default is true)

  });
  wow.init();


  /* ===================================
   Header Appear On Scroll
   ====================================== */

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      // Set position from top to add class
      $("header").addClass("sticky header-appear");
    } else {
      $("header").removeClass("sticky header-appear");
    }
  });

  /* =====================================
          Scroll
   ====================================== */

  //scroll to appear
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 150) $(".back-to-top").fadeIn("slow");
    else $(".back-to-top").fadeOut("slow");
  });
  //Click event to scroll to top
  $(document).on("click", ".back-to-top", function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  //scroll sections
  $(".scroll").on("click", function (event) {
    event.preventDefault();
    $("html,body").animate({ scrollTop: $(this.hash).offset().top }, 750);
  });


  $('.menu-list li a ').on('click', function () {
    $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
    $('.menu-list ul').slideUp(300);
});

$('.navbar-toggle').on('click', function() {
    $('body').removeClass('menu-is-closed').addClass('menu-is-opened');
});

$('.close-menu, .click-capture').on('click', function() {
    $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
    $('.menu-list ul').slideUp(300);
});



  /* ==============================================
       Fixed Footer
    =============================================== */

  var exFooter = jQuery('.footer');

  if (exFooter.length) {
    var h = jQuery('.footer').outerHeight();
    jQuery('.page-warp').css('margin-bottom', h);
  }


  /* ==============================================
     Sliders
      =============================================== */

  $('.testimonialslider').owlCarousel({
    loop: true,
    margin: 10,
    items: 1
  });
  $('.teamSlider').owlCarousel({
    loop: true,
    margin: 10,
    items: 3,
    nav: true,
    dots: false,
    navText: ['<i class="fas fa-angle-double-left"></i>', '<i class="fas fa-angle-double-right"></i>'],
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 1
      },
      // breakpoint from 600 up
      700: {
        items: 2
      },
      // breakpoint from 900 up
      992: {
        items: 3
      }
    }
  });
  $('.brand-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    margin: 10,
    items: 6,
    nav: false,
    dots: false,
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 2
      },
      // breakpoint from 600 up
      700: {
        items: 4
      },
      // breakpoint from 900 up
      992: {
        items: 6
      }
    }
  });
  /* --------------------------------------------------------
  COUNTER JS
  ----------------------------------------------------------- */

  jQuery('.counter').counterUp({
    delay: 5,
    time: 3000
  });
  /* ==============================================
      portfolio
      =============================================== */
  // filter items on button click

  jQuery('.portfolio-categories').on('click', 'li', function (e) {
    e.preventDefault();
    jQuery('.portfolio-categories li').removeClass('active');
    jQuery(this).closest('li').addClass('active');
  });
  var filterizd = $('.filtr-container');

  if (filterizd.length > 0) {
    filterizd.filterizr({
      layout: 'sameWidth'
    });
  }
  /* ==============================================
      pop up
      =============================================== */


  jQuery('.filtr-container').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image

    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function titleSrc(item) {
        return item.el.attr('title');
      }
    },
    zoom: {
      enabled: true,
      duration: 300,
      // don't foget to change the duration also in CSS
      opener: function opener(element) {
        return element.find('img');
      }
    }
  });






});


