// Variables
var screenWidth;
var snazzyImgFx = "fade";
var snazzyTxtFx = "none";
var snazzyCurrentImg = 0;
var snazzyMaxImgs = 3;
var snazzyScrollSpeed = 500;
var snazzyNth = 1;
var swipeOptions = {
    triggerOnTouchEnd: true,
    swipeStatus: swipeStatus,
    allowPageScroll: "vertical",
    threshold: 70
};

// Cache the DOM
var $snazzySlides = $(".snazzy-slider__slides");
var $snazzyImg = $snazzySlides.find(".snazzy-slider__image");
var $snazzyControls = $(".snazzy-controls");
var $snazzyLftBtn = $snazzyControls.find(".snazzy-controls__left-btn");
var $snazzyRtBtn = $snazzyControls.find(".snazzy-controls__right-btn");
var $snazzyDots = $snazzyControls.find(".snazzy-controls__dot");
var $snazzyTxt = $(".snazzy-text__project");
var $snazzyBoth = $(".snazzy-slider__slides, .snazzy-text__project");
var $focusItems = $(".snazzy-controls *, .site-links__item");

// Functions
function snazzyAria() {
  $snazzyDots.removeAttr("aria-selected");
  $(".snazzy-controls__dot:nth-child(" + snazzyNth + ")").attr("aria-selected", "true");
  $snazzyTxt.attr("aria-hidden", "true");
  $(".snazzy-text__project:nth-child(" + snazzyNth + ")").attr("aria-hidden", "false");
  $snazzyImg.attr("aria-hidden", "true");
  $(".snazzy-slider__image:nth-child(" + snazzyNth + ")").attr("aria-hidden", "false");
}

function snazzyHighlight() {
  $snazzyDots.removeClass("snazzy-dot-highlighted");
  $(".snazzy-controls__dot:nth-child(" + snazzyNth + ")").addClass("snazzy-dot-highlighted");
}

// Manually update the position of the slides on drag
function snazzyScrollImgs(distance, duration) {
  $snazzySlides.css("transition-duration", (duration / 1000).toFixed(1) + "s");
  // Inverse the number we set in the css
  var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
  $snazzySlides.css("transform", "translate(" + value + "px,0)");
}

function snazzyScrollTxt(distance, duration) {
  $snazzyTxt.css("transition-duration", (duration / 1000).toFixed(1) + "s");
  // Inverse the number we set in the css
  var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
  $snazzyTxt.css("transform", "translate(" + value + "px,0)");
}

function snazzyFadeImgs() {
  $snazzySlides.animate({opacity: 0}, (snazzyScrollSpeed/2), function(){
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, 0);
    $snazzySlides.animate({opacity: 1}, (snazzyScrollSpeed/2));
  });
}

function snazzyFadeTxt() {
  $snazzyTxt.animate({opacity: 0}, (snazzyScrollSpeed/2), function(){
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
    $snazzyTxt.animate({opacity: 1}, (snazzyScrollSpeed/2));
  });
}

function snazzyFadeBoth() {
  $snazzyBoth.animate({opacity: 0}, (snazzyScrollSpeed/2), function(){
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, 0);
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
    $snazzyBoth.animate({opacity: 1}, (snazzyScrollSpeed/2));
  });
}

function snazzyPrevImg() {
  snazzyCurrentImg = Math.max(snazzyCurrentImg - 1, 0);
  if (snazzyImgFx === "fade" && snazzyTxtFx === "slide") {
    snazzyFadeImgs();
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (snazzyImgFx === "slide" && snazzyTxtFx === "fade") {
    if (snazzyNth !== 1) {
      snazzyFadeTxt();
    }
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (snazzyImgFx === "fade" && snazzyTxtFx === "fade") {
    snazzyFadeBoth();
  } else if (snazzyImgFx === "fade" && snazzyTxtFx === "none") {
    snazzyFadeImgs();
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
  } else if (snazzyImgFx === "slide" && snazzyTxtFx === "none") {
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
  } else {
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  }
  if (snazzyNth !== 1) {
    snazzyNth--;
    snazzyAria();
    snazzyHighlight();
  }
}

function snazzyNextImg() {
  snazzyCurrentImg = Math.min(snazzyCurrentImg + 1, snazzyMaxImgs - 1);
  if (snazzyImgFx === "fade" && snazzyTxtFx === "slide") {
    snazzyFadeImgs();
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (snazzyImgFx === "slide" && snazzyTxtFx === "fade") {
    if (snazzyNth !== $snazzyDots.length) {
      snazzyFadeTxt();
    }
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (snazzyImgFx === "fade" && snazzyTxtFx === "fade") {
    snazzyFadeBoth();
  } else if (snazzyImgFx === "fade" && snazzyTxtFx === "none") {
    snazzyFadeImgs();
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
  } else if (snazzyImgFx === "slide" && snazzyTxtFx === "none") {
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
  } else {
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  }
  if (snazzyNth !== $snazzyDots.length) {
    snazzyNth++;
    snazzyAria();
    snazzyHighlight();
  }
}

function snazzyLastImg() {
  snazzyCurrentImg = snazzyMaxImgs - 1;
  if (snazzyImgFx === "fade" && snazzyTxtFx === "slide") {
    snazzyFadeImgs();
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (snazzyImgFx === "slide" && snazzyTxtFx === "fade") {
    snazzyFadeTxt();
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (snazzyImgFx === "fade" && snazzyTxtFx === "fade") {
    snazzyFadeBoth();
  } else if (snazzyImgFx === "fade" && snazzyTxtFx === "none") {
    snazzyFadeImgs();
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
  } else if (snazzyImgFx === "slide" && snazzyTxtFx === "none") {
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
  } else {
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  }
  snazzyNth = $snazzyDots.length;
  snazzyAria();
  snazzyHighlight();
}

function snazzyFirstImg() {
  snazzyCurrentImg = 0;
  if (snazzyImgFx === "fade" && snazzyTxtFx === "slide") {
    snazzyFadeImgs();
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (snazzyImgFx === "slide" && snazzyTxtFx === "fade") {
    snazzyFadeTxt();
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (snazzyImgFx === "fade" && snazzyTxtFx === "fade") {
    snazzyFadeBoth();
  } else if (snazzyImgFx === "fade" && snazzyTxtFx === "none") {
    snazzyFadeImgs();
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
  } else if (snazzyImgFx === "slide" && snazzyTxtFx === "none") {
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
  } else {
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  }
  snazzyNth = 1;
  snazzyAria();
  snazzyHighlight();
}

function nthImg() {
  if (snazzyImgFx === "fade" && snazzyTxtFx === "slide") {
    snazzyFadeImgs();
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (snazzyImgFx === "slide" && snazzyTxtFx === "fade") {
    snazzyFadeTxt();
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (snazzyImgFx === "fade" && snazzyTxtFx === "fade") {
    snazzyFadeBoth();
  } else if (snazzyImgFx === "fade" && snazzyTxtFx === "none") {
    snazzyFadeImgs();
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
  } else if (snazzyImgFx === "slide" && snazzyTxtFx === "none") {
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
  } else {
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
    snazzyScrollTxt(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  }
  snazzyNth = snazzyCurrentImg + 1;
}

/*Catch each phase of the swipe,
move: we drag the div,
cancel: we animate back to where we were,
end: we animate to the next image */
function swipeStatus(event, phase, direction, distance) {
  /*If we are moving before swipe and we are going L or R in X mode,
    or U or D in Y mode then drag */
  if (phase == "move" && (direction == "left" || direction == "right") && snazzyImgFx === "slide") {
    var duration = 0;
    if (direction == "left") {
      snazzyScrollImgs((screenWidth * snazzyCurrentImg) + distance, duration);
    } else if (direction == "right") {
      snazzyScrollImgs((screenWidth * snazzyCurrentImg) - distance, duration);
    }
  } else if (phase == "cancel" && snazzyImgFx === "slide") {
    snazzyScrollImgs(screenWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (phase == "end") {
    if (direction == "right") {
      if (snazzyImgFx === "fade" && snazzyNth === 1) {
        snazzyLastImg();
      } else {
        snazzyPrevImg();
      }
    } else if (direction == "left") {
      if (snazzyImgFx === "fade" && snazzyNth === $snazzyDots.length) {
        snazzyFirstImg();
      } else {
        snazzyNextImg();
      }
    }
  }
}

// Initialize TouchSwipe
$(function () {
  $snazzySlides.swipe(swipeOptions);
});

// Set the Snazzy Slider image width on load and resize
$(window).on("load resize",function(e){
  screenWidth = $(window).width();
  $snazzyImg.width(screenWidth);
  $snazzyTxt.width(screenWidth);
  // Move the image back into position
  snazzyScrollImgs(screenWidth * snazzyCurrentImg, 0);
  snazzyScrollTxt(screenWidth * snazzyCurrentImg, 0);
});

//Make the enter key the same as a click for accessibility
$focusItems.keydown(function(event) {
    if((event.keyCode==13) || (event.keyCode==32)) {
       $(this).click();
    }
});

// On left button click
$snazzyLftBtn.click(function() {
  // If it's not the first image
  if (snazzyNth !== 1) {
    snazzyPrevImg();
  } else {
    snazzyLastImg();
  }
});

// On right button click
$snazzyRtBtn.click(function() {
  // If it's not the last image
  if (snazzyNth !== $snazzyDots.length) {
    snazzyNextImg();
  } else {
    snazzyFirstImg();
  }
});

// On dot click
$snazzyDots.click(function() {
  // Highligth this dot
  $snazzyDots.removeClass("snazzy-dot-highlighted");
  $(this).addClass("snazzy-dot-highlighted");
  // Get dot number
  snazzyCurrentImg = $(this).index();
  // Go to nth image
  nthImg();
  // Set ARIA attributes
  snazzyAria();
});
