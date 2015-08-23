// Variables
var snazzyImgWidth;
var snazzyCurrentImg = 0;
var snazzyMaxImgs = 3;
var snazzyScrollSpeed = 500;
var snazzyNth = 1;
var swipeOptions = {
    triggerOnTouchEnd: true,
    swipeStatus: swipeStatus,
    allowPageScroll: "vertical",
    threshold: 75
};

// Cache the DOM
var $snazzySlides = $(".snazzy-slider__slides");
var $snazzyImg = $snazzySlides.find(".snazzy-slider__image");
var $snazzyControls = $(".snazzy-controls");
var $snazzyLftBtn = $snazzyControls.find(".snazzy-controls__left-btn");
var $snazzyRtBtn = $snazzyControls.find(".snazzy-controls__right-btn");
var $snazzyDots = $snazzyControls.find(".snazzy-controls__dot");
var $snazzyText = $(".snazzy-text__project");
var $focusItems = $(".snazzy-controls *, .site-links__item");

// Functions
/*Catch each phase of the swipe,
move: we drag the div,
cancel: we animate back to where we were,
end: we animate to the next image */
function swipeStatus(event, phase, direction, distance) {
  /*If we are moving before swipe and we are going L or R in X mode,
    or U or D in Y mode then drag */
  if (phase == "move" && (direction == "left" || direction == "right")) {
    var duration = 0;
    if (direction == "left") {
      snazzyScrollImgs((snazzyImgWidth * snazzyCurrentImg) + distance, duration);
    } else if (direction == "right") {
      snazzyScrollImgs((snazzyImgWidth * snazzyCurrentImg) - distance, duration);
    }
  } else if (phase == "cancel") {
    snazzyScrollImgs(snazzyImgWidth * snazzyCurrentImg, snazzyScrollSpeed);
  } else if (phase == "end") {
    if (direction == "right") {
      snazzyPrevImg();
    } else if (direction == "left") {
      snazzyNextImg();
    }
  }
}

// Manually update the position of the slides on drag for Snazzy Slider
function snazzyScrollImgs(distance, duration) {
  $snazzySlides.css("transition-duration", (duration / 1000).toFixed(1) + "s");
  // Inverse the number we set in the css
  var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
  $snazzySlides.css("transform", "translate(" + value + "px,0)");
}

function snazzyAria() {
  $snazzyDots.removeAttr("aria-selected");
  $(".snazzy-controls__dot:nth-child(" + snazzyNth + ")").attr("aria-selected", "true");
  $snazzyText.attr("aria-hidden", "true");
  $(".snazzy-text__project:nth-child(" + snazzyNth + ")").attr("aria-hidden", "false");
  $snazzyImg.attr("aria-hidden", "true");
  $(".snazzy-slider__image:nth-child(" + snazzyNth + ")").attr("aria-hidden", "false");
}

function snazzyHighlight() {
  $snazzyDots.removeClass("snazzy-dot-highlighted");
  $(".snazzy-controls__dot:nth-child(" + snazzyNth + ")").addClass("snazzy-dot-highlighted");
}

function snazzyPrevImg() {
  snazzyCurrentImg = Math.max(snazzyCurrentImg - 1, 0);
  snazzyScrollImgs(snazzyImgWidth * snazzyCurrentImg, snazzyScrollSpeed);
  if (snazzyNth !== 1) {
    snazzyNth--;
    snazzyAria();
    snazzyHighlight();
    snazzyTxtChange(snazzyNth);
  }
}

function snazzyNextImg() {
  snazzyCurrentImg = Math.min(snazzyCurrentImg + 1, snazzyMaxImgs - 1);
  snazzyScrollImgs(snazzyImgWidth * snazzyCurrentImg, snazzyScrollSpeed);
  if (snazzyNth !== $snazzyDots.length) {
    snazzyNth++;
    snazzyAria();
    snazzyHighlight();
    snazzyTxtChange(snazzyNth);
  }
}

function snazzyLastImg() {
  snazzyCurrentImg = snazzyMaxImgs - 1;
  snazzyScrollImgs(snazzyImgWidth * snazzyCurrentImg, snazzyScrollSpeed);
  snazzyNth = $snazzyDots.length;
  snazzyAria();
  snazzyHighlight();
  snazzyTxtChange($snazzyDots.length);
}

function snazzyFirstImg() {
  snazzyCurrentImg = 0;
  snazzyScrollImgs(snazzyImgWidth * snazzyCurrentImg, snazzyScrollSpeed);
  snazzyNth = 1;
  snazzyAria();
  snazzyHighlight();
  snazzyTxtChange(1);
}

function snazzyTxtChange(n, direction, effect) {
  // Animate text
  // Hide current project
  $snazzyText.hide();
  // Show next project
  $(".snazzy-text__project:nth-child(" + n + ")").show();
  // Animate text
}

// Initialize TouchSwipe
$(function () {
  $snazzySlides.swipe(swipeOptions);
});

// Set the Snazzy Slider image width on load and resize
$(window).on("load resize",function(e){
  $screenWidth = $(window).width();
  snazzyImgWidth = $screenWidth;
  $snazzyImg.width($screenWidth);
  // Move the image back into position
  snazzyScrollImgs(snazzyImgWidth * snazzyCurrentImg, 0);
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
    // Go to the previous image
    snazzyPrevImg();
  } else {
    // Go to the last image
    snazzyLastImg();
  }
});

// On right button click
$snazzyRtBtn.click(function() {
  // If it's not the last image
  if (snazzyNth !== $snazzyDots.length) {
    // Go to the next image
    snazzyNextImg();
  } else {
    // Go to the first image
    snazzyFirstImg();
  }
});

// On dot click
$snazzyDots.click(function() {
  // Highligth this dot
  $snazzyDots.removeClass("snazzy-dot-highlighted");
  $(this).addClass("snazzy-dot-highlighted");
  // Go to nth image
  snazzyCurrentImg = $(this).index();
  snazzyScrollImgs(snazzyImgWidth * snazzyCurrentImg, snazzyScrollSpeed);
  snazzyNth = snazzyCurrentImg + 1;
  snazzyAria();
  snazzyTxtChange(snazzyNth);
});
