

// Freelancer Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
    });

    $('nav li').click(function(){
      $('nav li').each(function(){
        $(this).children().css("background-color","");
      })
      $('.submenu').show();
    })
    $('.brand').mouseover(function(){
      $('nav li').each(function(){
        $(this).children().css("background-color","white");
      })
      $('.submenu').hide();

    })
    $('section').mouseover(function(){
      $('nav li').each(function(){
        $(this).children().css("background-color","white");
      })
      $('.submenu').hide();
    })

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    $(".carousel-cut > img").each(function(){
      var w = $(this).width();
      var h = $(this).height();
      $(this).parent().width(w);
      $(this).parent().height(h);
    })

    // Floating label headings for the contact form
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

    $('#media').carousel({
      pause: false,
      interval: false,
      dots: false,
      arrows: false,
      prevArrow: false,
      nextArrow: false
    });


    $(window).resize(function(){
      if($(window).width() < 1200){
        $('.fb-left').css("padding-left","");
        $('.fb-right').css("padding-right","");
      }else{
        $('.fb-left').css("padding-left","70px");
        $('.fb-right').css("padding-right","70px");
      }
    })

    delibe.render.start();

})(jQuery); // End of use strict
