/*****************************************
* Front End Script
/****************************************/

jQuery(document).ready(function($) {

  'use strict';

  // Turn the settings object into an array
  var snzysldr_img_array = $.map(snzysldr_obj.options.sliders[snzysldr_name].images, function(value, index) {
    return [value];
  });

  // Variables
  var snzysldrScreenWidth;
  var snzysldrImgFx = snzysldr_obj.options.sliders[snzysldr_name].settings.fx;
  var snzysldrTxtFx = snzysldr_obj.options.sliders[snzysldr_name].settings.text_fx;
  var snzysldrCurrentImg = 0;
  var snzysldrMaxImgs = snzysldr_img_array.length;
  var snzysldrScrollSpeed = 375;
  var snzysldrNth = 1;
  var snzysldrTimer = snzysldr_obj.options.sliders[snzysldr_name].settings.slide_duration;
  var snzysldrInterval;
  var snzysldrClickTimerCount = 1;
  var snzysldrClickTimerCounter;
  var snzysldrClickCount = 0;
  var snzysldrSwipeOptions = {
      triggerOnTouchEnd: true,
      swipeStatus: snzysldrSwipeStatus,
      allowPageScroll: "vertical",
      threshold: 70
  };

  // Cache the DOM
  var $snzysldrWrap = $(".snzysldr-slider-wrap");
  var $snzysldrSlides = $(".snzysldr-slider__slides");
  var $snzysldrImg = $snzysldrSlides.find(".snzysldr-slider__image");
  var $snzysldrControls = $(".snzysldr-controls");
  var $snzysldrLftBtn = $snzysldrControls.find(".snzysldr-controls__left-btn");
  var $snzysldrRtBtn = $snzysldrControls.find(".snzysldr-controls__right-btn");
  var $snzysldrDots = $snzysldrControls.find(".snzysldr-controls__dot");
  var $snzysldrDotWrap = $(".snzysldr-dot-wrap");
  var $snzysldrTxt = $(".snzysldr-text__project");
  var $snzysldrBoth = $(".snzysldr-slider__slides, .snzysldr-text__project");
  var $snzysldrFocusItems = $(".snzysldr-controls *, .site-links__item");

  // Functions
  function snzysldrAria() {
    $snzysldrDots.removeAttr("aria-selected");
    $(".snzysldr-dot-wrap:nth-child(" + snzysldrNth + ") .snzysldr-controls__dot").attr("aria-selected", "true");
    $snzysldrImg.attr("aria-hidden", "true");
    $(".snzysldr-slider__image:nth-child(" + snzysldrNth + ")").attr("aria-hidden", "false");
    $snzysldrTxt.attr("aria-hidden", "true");
    $(".snzysldr-text__project:nth-child(" + snzysldrNth + ")").attr("aria-hidden", "false");
    $snzysldrTxt.find('.snzysldr-read-more a').attr("tabindex", "-1");
    var timout = 0;
    if (snzysldrTxtFx === "fade") {
      timout = 900;
    } else if (snzysldrTxtFx === "slide") {
      timout = 300;
    }
    setTimeout(function(){
      $(".snzysldr-text__project:nth-child(" + snzysldrNth + ")").find('.snzysldr-read-more a').attr("tabindex", "0");
    }, timout);
  }

  function snzysldrHighlight() {
    $snzysldrDots.removeClass("snzysldr-dot-highlighted");
    $(".snzysldr-dot-wrap:nth-child(" + snzysldrNth + ") .snzysldr-controls__dot").addClass("snzysldr-dot-highlighted");
  }

  // Manually update the position of the slides on drag
  function snzysldrScrollImgs(distance, duration) {
    $snzysldrSlides.css("transition-duration", (duration / 1000).toFixed(1) + "s");
    // Inverse the number we set in the css
    var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
    $snzysldrSlides.css({
      '-webkit-transform' : 'translate(' + value + 'px,0)',
      '-ms-transform'     : 'translate(' + value + 'px,0)',
      'transform'         : 'translate(' + value + 'px,0)'
    });
  }

  function snzysldrScrollTxt(distance, duration) {
    $snzysldrTxt.css("transition-duration", (duration / 1000).toFixed(1) + "s");
    // Inverse the number we set in the css
    var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
    $snzysldrTxt.css({
      '-webkit-transform' : 'translate(' + value + 'px,0)',
      '-ms-transform'     : 'translate(' + value + 'px,0)',
      'transform'         : 'translate(' + value + 'px,0)'
    });
  }

  function snzysldrIncreaseCounter() {
    if (snzysldrNth !== $snzysldrDotWrap.length) {
      snzysldrNth++;
      snzysldrAria();
      snzysldrHighlight();
    } else {
      snzysldrNth = 1;
      snzysldrAria();
      snzysldrHighlight();
    }
  }

  function snzysldrDecreaseCounter() {
    if (snzysldrNth !== 1) {
      snzysldrNth--;
      snzysldrAria();
      snzysldrHighlight();
    } else {
      snzysldrNth = $snzysldrDotWrap.length;
      snzysldrAria();
      snzysldrHighlight();
    }
  }

  // Click timer function to prevent multiple click issue on fade effect
  function snzysldrClickTimer() {
    snzysldrClickTimerCount++;
    if (snzysldrClickTimerCount === 4) {
      clearInterval(snzysldrClickTimerCounter);
      snzysldrClickTimerCount = 1;
      snzysldrClickCount = 0;
      // Functions that run on timeout go here
      if (snzysldrImgFx === "fade" && snzysldrTxtFx === "fade") {
        snzysldrScrollImgs(snzysldrScreenWidth * (snzysldrNth - 1), 0);
        snzysldrScrollTxt(snzysldrScreenWidth * (snzysldrNth - 1), 0);
        $snzysldrBoth.animate({opacity: 1}, (snzysldrScrollSpeed/2));
      } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "slide") {
        snzysldrScrollImgs(snzysldrScreenWidth * (snzysldrNth - 1), 0);
        $snzysldrSlides.animate({opacity: 1}, (snzysldrScrollSpeed/2));
      } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "fade") {
        snzysldrScrollTxt(snzysldrScreenWidth * (snzysldrNth - 1), 0);
        $snzysldrTxt.animate({opacity: 1}, (snzysldrScrollSpeed/2));
      } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "none") {
        snzysldrScrollImgs(snzysldrScreenWidth * (snzysldrNth - 1), 0);
        $snzysldrSlides.animate({opacity: 1}, (snzysldrScrollSpeed/2));
      }
      return;
    }
  }

  // Triggers snzysldrClickTimer
  function snzysldrFadeChange() {
    snzysldrClickCount++;
    snzysldrClickTimerCount = 1;
    // If you haven't clicked already, start the click timer
    if (snzysldrClickCount <= 1) {
      snzysldrClickTimerCounter = setInterval(function() {
        snzysldrClickTimer();
      }, 300);
    }
  }

  function snzysldrFadeNext() {
    if (snzysldrImgFx === "fade" && snzysldrTxtFx === "fade") {
      $snzysldrBoth.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrIncreaseCounter();
      snzysldrFadeChange();
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "slide") {
      if (snzysldrNth !== $snzysldrDotWrap.length) {
        // Go to next image
        snzysldrCurrentImg = Math.min(snzysldrCurrentImg + 1, snzysldrMaxImgs - 1);
        snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      } else {
        // Go to first image
        snzysldrCurrentImg = 0;
        snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      }
      $snzysldrSlides.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrIncreaseCounter();
      snzysldrFadeChange();
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "fade") {
      snzysldrCurrentImg = Math.min(snzysldrCurrentImg + 1, snzysldrMaxImgs - 1);
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      if (snzysldrNth !== $snzysldrDotWrap.length) {
        $snzysldrTxt.animate({opacity: 0}, (snzysldrScrollSpeed/2));
        snzysldrIncreaseCounter();
        snzysldrFadeChange();
      }
    }
    else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "none") {
      if (snzysldrNth !== $snzysldrDotWrap.length) {
        // Go to next image
        snzysldrCurrentImg = Math.min(snzysldrCurrentImg + 1, snzysldrMaxImgs - 1);
        snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
      } else {
        // Go to first image
        snzysldrCurrentImg = 0;
        snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
      }
      $snzysldrSlides.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrIncreaseCounter();
      snzysldrFadeChange();
    }
  }

  function snzysldrFadePrev() {
    if (snzysldrImgFx === "fade" && snzysldrTxtFx === "fade") {
      $snzysldrBoth.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrDecreaseCounter();
      snzysldrFadeChange();
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "slide") {
      if (snzysldrNth !== 1) {
        // Go to previous image
        snzysldrCurrentImg = Math.max(snzysldrCurrentImg - 1, 0);
        snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      } else {
        // Go to last image
        snzysldrCurrentImg = snzysldrMaxImgs - 1;
        snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      }
      $snzysldrSlides.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrDecreaseCounter();
      snzysldrFadeChange();
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "fade") {
      snzysldrCurrentImg = Math.max(snzysldrCurrentImg - 1, 0);
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      if (snzysldrNth !== 1) {
        $snzysldrTxt.animate({opacity: 0}, (snzysldrScrollSpeed/2));
        snzysldrDecreaseCounter();
        snzysldrFadeChange();
      }
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "none") {
      if (snzysldrNth !== 1) {
        // Go to previous image
        snzysldrCurrentImg = Math.max(snzysldrCurrentImg - 1, 0);
        snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
      } else {
        // Go to last image
        snzysldrCurrentImg = snzysldrMaxImgs - 1;
        snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
      }
      $snzysldrSlides.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrDecreaseCounter();
      snzysldrFadeChange();
    }
  }

  function snzysldrPrevImg() {
    snzysldrCurrentImg = Math.max(snzysldrCurrentImg - 1, 0);
    if (snzysldrImgFx === "fade" && snzysldrTxtFx === "slide") {
      snzysldrFadePrev();
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "fade") {
      if (snzysldrNth !== 1) {
        snzysldrFadePrev();
      }
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "fade") {
      snzysldrFadePrev();
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "none") {
      snzysldrFadePrev();
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "none") {
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
    } else {
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    }
    if (snzysldrNth !== 1) {
      snzysldrNth--;
      snzysldrAria();
      snzysldrHighlight();
    }
  }

  function snzysldrNextImg() {
    snzysldrCurrentImg = Math.min(snzysldrCurrentImg + 1, snzysldrMaxImgs - 1);
    if (snzysldrImgFx === "fade" && snzysldrTxtFx === "slide") {
      snzysldrFadeNext();
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "fade") {
      if (snzysldrNth !== $snzysldrDotWrap.length) {
        snzysldrFadeNext();
      }
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "fade") {
      snzysldrFadeNext();
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "none") {
      snzysldrFadeNext();
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "none") {
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
    } else {
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    }
    if (snzysldrNth !== $snzysldrDotWrap.length) {
      snzysldrNth++;
      snzysldrAria();
      snzysldrHighlight();
    }
  }

  function snzysldrLastImg() {
    snzysldrCurrentImg = snzysldrMaxImgs - 1;
    if (snzysldrImgFx === "fade" && snzysldrTxtFx === "slide") {
      $snzysldrSlides.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrFadeChange();
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "fade") {
      $snzysldrTxt.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrFadeChange();
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "fade") {
      $snzysldrBoth.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrFadeChange();
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "none") {
      $snzysldrSlides.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrFadeChange();
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "none") {
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
    } else {
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    }
    snzysldrNth = $snzysldrDotWrap.length;
    snzysldrAria();
    snzysldrHighlight();
  }

  function snzysldrFirstImg() {
    snzysldrCurrentImg = 0;
    if (snzysldrImgFx === "fade" && snzysldrTxtFx === "slide") {
      $snzysldrSlides.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrFadeChange();
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "fade") {
      snzysldrFadeChange();
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "fade") {
      $snzysldrBoth.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrFadeChange();
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "none") {
      $snzysldrSlides.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrFadeChange();
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "none") {
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
    } else {
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    }
    snzysldrNth = 1;
    snzysldrAria();
    snzysldrHighlight();
  }

  function snzysldrNthImg() {
    if (snzysldrImgFx === "fade" && snzysldrTxtFx === "slide") {
      $snzysldrSlides.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrFadeChange();
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "fade") {
      $snzysldrTxt.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrFadeChange();
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "fade") {
      $snzysldrBoth.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrFadeChange();
    } else if (snzysldrImgFx === "fade" && snzysldrTxtFx === "none") {
      $snzysldrSlides.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrFadeChange();
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "none") {
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
    } else {
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    }
    snzysldrNth = snzysldrCurrentImg + 1;
  }

  /*Catch each phase of the swipe,
  move: we drag the div,
  cancel: we animate back to where we were,
  end: we animate to the next image */
  function snzysldrSwipeStatus(event, phase, direction, distance) {
    /*If we are moving before swipe and we are going L or R in X mode,
      or U or D in Y mode then drag */
    if (phase == "move" && (direction == "left" || direction == "right") && snzysldrImgFx === "slide") {
      var duration = 0;
      if (direction == "left") {
        snzysldrScrollImgs((snzysldrScreenWidth * snzysldrCurrentImg) + distance, duration);
      } else if (direction == "right") {
        snzysldrScrollImgs((snzysldrScreenWidth * snzysldrCurrentImg) - distance, duration);
      }
    } else if (phase == "cancel" && snzysldrImgFx === "slide") {
      snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
    } else if (phase == "end") {
      if (direction == "right") {
        if (snzysldrImgFx === "fade" && snzysldrNth === 1) {
          snzysldrLastImg();
        } else if (snzysldrTxtFx === "fade" || snzysldrImgFx === "fade") {
          snzysldrFadePrev();
        } else {
          snzysldrPrevImg();
        }
      } else if (direction == "left") {
        if (snzysldrImgFx === "fade" && snzysldrNth === $snzysldrDotWrap.length) {
          snzysldrFirstImg();
        } else if (snzysldrTxtFx === "fade" || snzysldrImgFx === "fade") {
          snzysldrFadeNext();
        } else {
          snzysldrNextImg();
        }
      }
    }
  }

  // Start snzysldrTimer
  function snzysldrStartTimer() {
    if (snzysldr_obj.options.sliders[snzysldr_name].settings.autoplay === 'on') {
      snzysldrInterval = setInterval(function() {
        if (snzysldrImgFx === "fade" || snzysldrTxtFx === "fade" && snzysldrImgFx !== 'slide') {
          snzysldrFadeNext();
        } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "fade") {
          if (snzysldrNth !== $snzysldrDotWrap.length) {
            // Go to next image
            snzysldrCurrentImg = Math.min(snzysldrCurrentImg + 1, snzysldrMaxImgs - 1);
            snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
          } else {
            // Go to first image
            snzysldrCurrentImg = 0;
            snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
          }
          $snzysldrTxt.animate({opacity: 0}, (snzysldrScrollSpeed/2));
          snzysldrIncreaseCounter();
          snzysldrFadeChange();
        } else {
          if (snzysldrNth !== $snzysldrDotWrap.length) {
            snzysldrNextImg();
          } else {
            snzysldrFirstImg();
          }
        }
      }, snzysldrTimer);
    }
  }

  // Stop snzysldrTimer
  function snzysldrStopTimer() {
    clearInterval(snzysldrInterval);
  }

  $(window).on("load", function(){
    // Hide the text until the page has loaded
    $(".snzysldr-slider-wrap").show();
  });

  // Set the image width on load and resize
  $(window).on("load resize",function(e){
    snzysldrScreenWidth = $snzysldrWrap.width() + 1;
    $snzysldrImg.width(snzysldrScreenWidth);
    $snzysldrTxt.width(snzysldrScreenWidth);
    // Move the image back into position
    snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, 0);
    snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
  });

  // On load
  $(function () {
    // Initialize TouchSwipe
    $snzysldrSlides.swipe(snzysldrSwipeOptions);
    // Start snzysldrTimer
    if (snzysldr_obj.options.sliders[snzysldr_name].settings.autoplay === 'on') {
      snzysldrStartTimer();
    }
    // Set properties for images
    $(".snzysldr-slider__image").attr("aria-hidden", "true");
    $(".snzysldr-slider__image:first-child").attr("aria-hidden", "false");
    // Set porperties for controls
    $(".snzysldr-dot-wrap:first-child .snzysldr-controls__dot").attr("aria-selected", "true");
    $(".snzysldr-dot-wrap:first-child .snzysldr-controls__dot").addClass("snzysldr-dot-highlighted");
    // Set porperties for text
    $(".snzysldr-text__project:first-child").attr("aria-hidden", "false");
    $(".snzysldr-text__project:first-child").find('.snzysldr-read-more a').attr("tabindex", "0");
  });

  //Make the enter key and the spacebar trigger click for accessibility
  $snzysldrFocusItems.keydown(function(event) {
      if((event.keyCode==13) || (event.keyCode==32)) {
         $(this).click();
      }
  });

  // Stop snzysldrTimer on interaction
  $snzysldrSlides.on( "swipe", function() {
    snzysldrStopTimer();
  });
  $snzysldrControls.children().bind( "click focus", function() {
    snzysldrStopTimer();
  });

  // On left button click
  $snzysldrLftBtn.click(function() {
    if (snzysldrImgFx === "fade" || snzysldrTxtFx === "fade" && snzysldrImgFx !== 'slide') {
      snzysldrFadePrev();
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "fade") {
      if (snzysldrNth !== 1) {
        // Go to previous image
        snzysldrCurrentImg = Math.max(snzysldrCurrentImg - 1, 0);
        snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      } else {
        // Go to first image
        snzysldrCurrentImg = snzysldrMaxImgs - 1;
        snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      }
      $snzysldrTxt.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrDecreaseCounter();
      snzysldrFadeChange();
    } else {
      if (snzysldrNth !== 1) {
        snzysldrPrevImg();
      } else {
        snzysldrLastImg();
      }
    }
  });

  // On right button click
  $snzysldrRtBtn.click(function() {
    if (snzysldrImgFx === "fade" || snzysldrTxtFx === "fade" && snzysldrImgFx !== 'slide') {
      snzysldrFadeNext();
    } else if (snzysldrImgFx === "slide" && snzysldrTxtFx === "fade") {
      if (snzysldrNth !== $snzysldrDotWrap.length) {
        // Go to next image
        snzysldrCurrentImg = Math.min(snzysldrCurrentImg + 1, snzysldrMaxImgs - 1);
        snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      } else {
        // Go to first image
        snzysldrCurrentImg = 0;
        snzysldrScrollImgs(snzysldrScreenWidth * snzysldrCurrentImg, snzysldrScrollSpeed);
      }
      $snzysldrTxt.animate({opacity: 0}, (snzysldrScrollSpeed/2));
      snzysldrIncreaseCounter();
      snzysldrFadeChange();
    } else {
      if (snzysldrNth !== $snzysldrDotWrap.length) {
        snzysldrNextImg();
      } else {
        snzysldrFirstImg();
      }
    }
  });

  // On dot click
  $snzysldrDotWrap.click(function() {
    // Highligth this dot
    $snzysldrDots.removeClass("snzysldr-dot-highlighted");
    $(this).find(".snzysldr-controls__dot").addClass("snzysldr-dot-highlighted");
    // Get dot number
    snzysldrCurrentImg = $(this).index();
      // Go to nth image
      snzysldrNthImg();
      if (snzysldrImgFx === "fade" && snzysldrTxtFx === "none") {
        snzysldrScrollTxt(snzysldrScreenWidth * snzysldrCurrentImg, 0);
      }
      // Set ARIA attributes
      snzysldrAria();
  });

  // If mouse leaves the slider, trigger mouseup
  $snzysldrSlides.mouseleave(function(){
    $(this).mouseup();
  });

});
