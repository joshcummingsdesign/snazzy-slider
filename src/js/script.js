// Variables
var img_width;
var currentImg = 0;
var maxImages = 3;
var speed = 500;
var swipeOptions = {
    triggerOnTouchEnd: true,
    swipeStatus: swipeStatus,
    allowPageScroll: "vertical",
    threshold: 75
};

// Cache the DOM
var $slides = $(".snazzy-slider__slides");
var $image = $slides.find(".snazzy-slider__image");

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
      scrollImages((img_width * currentImg) + distance, duration);
    } else if (direction == "right") {
      scrollImages((img_width * currentImg) - distance, duration);
    }
  } else if (phase == "cancel") {
    scrollImages(img_width * currentImg, speed);
  } else if (phase == "end") {
    if (direction == "right") {
      previousImage();
    } else if (direction == "left") {
      nextImage();
    }
  }
}

function previousImage() {
  currentImg = Math.max(currentImg - 1, 0);
  scrollImages(img_width * currentImg, speed);
}

function nextImage() {
  currentImg = Math.min(currentImg + 1, maxImages - 1);
  scrollImages(img_width * currentImg, speed);
}

// Manually update the position of the $slides on drag for Snazzy Slider
function scrollImages(distance, duration) {
  $slides.css("transition-duration", (duration / 1000).toFixed(1) + "s");
  // Inverse the number we set in the css
  var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
  $slides.css("transform", "translate(" + value + "px,0)");
}

// Initialize TouchSwipe
$(function () {
  $slides.swipe(swipeOptions);
});

// Set the Snazzy Slider image width on load and resize
$(window).on("load resize",function(e){
  $screenWidth = $(window).width();
  img_width = $screenWidth;
  $image.width($screenWidth);
  // Move the image back into position
  scrollImages(img_width * currentImg, 0);
});
