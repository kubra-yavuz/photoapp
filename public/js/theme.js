(function ($) {
  "use strict";

  // Timer Initialization
  const timers = $(".timer");
  if (timers.length) {
    timers.appear(() => {
      timers.countTo();
    });
  }

  // Sticky Menu on Scroll
  $(window).on("scroll", function () {
    const stickyMenu = $(".sticky-menu");
    $(this).scrollTop() >= 100
      ? stickyMenu.addClass("fixed")
      : stickyMenu.removeClass("fixed");
  });

  // Scroll to Top Button
  $(window).on("scroll", function () {
    $(this).scrollTop() > 200
      ? $(".scroll-top").fadeIn()
      : $(".scroll-top").fadeOut();
  });

  $(".scroll-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1500);
    return false;
  });

  // Smooth Scroll for Anchors
  $("a.scroll-target").on("click", function (event) {
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname === this.hostname
    ) {
      const target = $(this.hash);
      if (target.length) {
        $("html, body").animate({ scrollTop: target.offset().top - 120 }, 1000);
        return false;
      }
    }
  });

  // Highlight Active Navigation Link
  const currentUrl = window.location.href;
  $(".navbar-nav > li a").each(function () {
    const href = $(this).attr("href");
    if (href === currentUrl || href === "") {
      $(this).addClass("active");
    }
  });

  // Slick Sliders Initialization
  $(".companies-logo-slider").slick({
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 7,
    prevArrow: $(".prev"),
    nextArrow: $(".next"),
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 991, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  });

  $(".clientSliderOne").slick({
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
    prevArrow: $(".prev_c"),
    nextArrow: $(".next_c"),
    autoplay: true,
    autoplaySpeed: 6000,
  });

  // Initialize Google Maps
  const mapCanvas = $(".map-canvas");
  if (mapCanvas.length) {
    const mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(40.72, -74),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      clickableIcons: false,
    };
    const map = new google.maps.Map(mapCanvas[0], mapOptions);

    new google.maps.Marker({
      map: map,
      draggable: true,
      position: new google.maps.LatLng(40.72, -74),
      visible: true,
    });
  }

  // Page Preloader
  $(window).on("load", function () {
    $("#ctn-preloader").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({ overflow: "visible" });
  });
})(jQuery);
