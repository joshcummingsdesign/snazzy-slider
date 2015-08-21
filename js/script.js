// Variables
var interval;
var nthChild = 1;
var fadeSpeed = 400;
var slideSpeed = 8000;

// Cache the DOM
var $slider = $(".slider");
var $slides = $slider.find(".slides");
var $slide = $slides.find(".slide");
var $sliderControls = $slider.find(".slider-controls");
var $sliderAllControls = $sliderControls.find("*");
var $buttonLeft = $sliderControls.find(".button-left");
var $buttonRight = $sliderControls.find(".button-right");
var $sliderDots = $sliderControls.find(".slider-dot");
var $sliderDot1 = $sliderControls.find(".slider-dot--1");
var $sliderDot2 = $sliderControls.find(".slider-dot--2");
var $sliderDot3 = $sliderControls.find(".slider-dot--3");
var $slideTextContainer = $(".slider-info__text-container");
var $slideText = $slideTextContainer.find(".slider-info__text");
var $focusItems = $(".slider-controls *, .link-item");

// Functions
// Slider Controls
function slideAdvance(n) {
  // Advance slide
  $slides.animate({opacity: "0"}, fadeSpeed, function() {
    $slide.removeClass("is-shown");
    $sliderDots.removeClass("highlighted");
    $(".slide:nth-child(" + n + ")").addClass("is-shown");
    $(".slider-dot:nth-child(" + n + ")").addClass("highlighted");
  });
  $slides.animate({opacity: "1"}, fadeSpeed);
  // Advance text
  $slideTextContainer.animate({opacity: "0"}, fadeSpeed, function() {
    $slideText.removeClass("text-shown");
    $(".slider-info__text:nth-child(" + n + ")").addClass("text-shown");
  });
  $slideTextContainer.animate({opacity: "1"}, fadeSpeed);
  // Update ARIA attributes
  $sliderDots.removeAttr("aria-selected");
  $(".slider-dot:nth-child(" + n + ")").attr("aria-selected", "true");
  $slideText.attr("aria-hidden", "true");
  $(".slider-info__text:nth-child(" + n + ")").attr("aria-hidden", "false");
}

// Advance slide forward
function nextSlide() {
  if (nthChild === $slide.length) {
    slideAdvance(1);
    nthChild = 1;
  } else if (nthChild > 0 && nthChild < $slide.length) {
    nthChild++;
    slideAdvance(nthChild);
  }
}

// Advance slide backwards
function prevSlide() {
  if (nthChild === 1) {
    slideAdvance($slide.length);
    nthChild = $slide.length;
  } else if (nthChild > 1 && nthChild <= $slide.length) {
    nthChild--;
    slideAdvance(nthChild);
  }
}

// Start slider timer
function startSlider() {
  interval = setInterval(function(){
    nextSlide();
  },slideSpeed);
}

// Stop slider timer
function stopSlider() {
  clearInterval(interval);
}

// On page load
$(function() {
  // Instantiate fastclick on the body
  FastClick.attach(document.body);
  // Start the slider timer
  startSlider();
});

// Allow swipe guestures to control slides
$slider.swipe( { fingers:'all', swipeLeft:sliderSwipe, swipeRight:sliderSwipe, allowPageScroll:"vertical"} );
function sliderSwipe(event, direction, distance, duration, fingerCount) {
       switch(direction) {
         case "left":
            stopSlider();
            nextSlide();
            break;
         case "right":
            stopSlider();
            prevSlide();
            break;
       }
     }

//Make the enter key the same as a click for accessibility
$focusItems.keydown(function(event) {
    if((event.keyCode==13) || (event.keyCode==32)) {
       $(this).click();
    }
});

// Slider Controls
$buttonRight.click(function() {
  nextSlide();
});

$buttonLeft.click(function() {
  prevSlide();
});

$sliderDot1.click(function() {
  if (nthChild !== 1) {
    nthChild = 1;
    slideAdvance(nthChild);
  }
});

$sliderDot2.click(function() {
  if (nthChild !== 2) {
    nthChild = 2;
    slideAdvance(nthChild);
  }
});

$sliderDot3.click(function() {
  if (nthChild !== 3) {
    nthChild = 3;
    slideAdvance(nthChild);
  }
});

// Stop slider timer when controls are clicked or focused
$sliderAllControls.bind( "click focus", function() {
  stopSlider();
});
