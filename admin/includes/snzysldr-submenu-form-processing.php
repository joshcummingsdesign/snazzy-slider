<?php

/*****************************************
* Submenu form processing
/****************************************/

class SnzysldrFormValidation
{

  // Makes sure the radio button values are only characters
  public function validate_radio($value) {
    if ( preg_match( '/[a-z]/', $value ) !== 0 && strlen($value) <= 7 ) {
      return true;
    } else {
      return false;
    }
  }

  // Checks to see if a color is in hexidecimal format
  public function validate_color($color) {
    if ( preg_match( '/^\#[0-9a-f]{6}$/i', $color ) !== 0 ) {
      return true;
    } else {
      return false;
    }
  }

  // Checks to see if a number is within range
  public function validate_number($number, $min, $max) {
    if ( ctype_digit($number) && $number >= $min && $number <= $max ) {
      return true;
    } else {
      return false;
    }
 }

}


function snzysldr_form_submit() {

  check_ajax_referer( 'snzysldr-nonce', 'security' );

  $form_val = new SnzysldrFormValidation();
  $errors = array();

  $input = $_POST['snzysldr_general_options'];
  $output = get_option( 'snzysldr_options' );
  $slider_name = $output['current'];

  // Validate height
  if ( $form_val->validate_number( $input['slider_height'], '200', '1080' ) ) {
    $output['sliders'][$slider_name]['settings']['slider_height'] = $input['slider_height'];
  } else {
    array_push( $errors, 'slider_height');
  }

  // Validate arrows
  if ( 'on' === $input['arrows'] || 'off' === $input['arrows'] ) {
    $output['sliders'][$slider_name]['settings']['arrows'] = $input['arrows'];
  } else {
    array_push( $errors, 'arrows');
  }

  // Validate controls align
  if ( 'left' === $input['controls_align'] || 'center' === $input['controls_align'] || 'right' === $input['controls_align'] ) {
    $output['sliders'][$slider_name]['settings']['controls_align'] = $input['controls_align'];
  } else {
    array_push( $errors, 'controls_align');
  }

  // Validate colors
  $colors = array(
    'Controls' => 'controls_color',
    'Selected' => 'sel_color',
    'Fade' => 'fade_color',
    'Text' => 'text_color',
    'Text background' => 'text_bg',
    'Link' => 'link_color',
    'Link hover' => 'link_hover'
  );
  foreach ($colors as $color => $row) {
    if ( $form_val->validate_color( $input[$row] ) ) {
      $output['sliders'][$slider_name]['settings'][$row] = $input[$row];
    } else {
      array_push( $errors, $row);
    }
  }

  // Validate autoplay
  if ( 'off' === $input['autoplay'] || 'on' === $input['autoplay'] ) {
    $output['sliders'][$slider_name]['settings']['autoplay'] = $input['autoplay'];
  } else {
    array_push( $errors, 'autoplay');
  }

  // Validate duration
  if ( $form_val->validate_number( $input['slide_duration'], '5000', '20000' ) ) {
    $output['sliders'][$slider_name]['settings']['slide_duration'] = $input['slide_duration'];
  } else {
    array_push( $errors, 'slide_duration');
  }

  // Validate image effect
  if ( 'slide' === $input['fx'] || 'fade' === $input['fx'] ) {
  $output['sliders'][$slider_name]['settings']['fx'] = $input['fx'];
  } else {
    array_push( $errors, 'fx');
  }

  // Validate text enable
  if ( !isset( $input['text_enable'] ) ) {
    $output['sliders'][$slider_name]['settings']['text_enable'] = 'off';
  } else if ( 'on' === $input['text_enable'] ) {
    $output['sliders'][$slider_name]['settings']['text_enable'] = 'on';
  } else {
    array_push( $errors, 'text_enable');
  }

  // Validate text effect
  if ( 'none' === $input['text_fx'] || 'slide' === $input['text_fx'] || 'fade' === $input['text_fx'] ) {
    $output['sliders'][$slider_name]['settings']['text_fx'] = $input['text_fx'];
  } else {
    array_push( $errors, 'text_fx');
  }

  // Validate link align
  if ( 'left' === $input['link_align'] || 'center' === $input['link_align'] || 'right' === $input['link_align'] ) {
    $output['sliders'][$slider_name]['settings']['link_align'] = $input['link_align'];
  } else {
    array_push( $errors, 'link_align');
  }

  update_option( 'snzysldr_options', $output );

  if ( empty( $errors ) ) {
    echo 'updated';
  } else {
    echo wp_json_encode( $errors );
  }

  die();
}
add_action('wp_ajax_snzysldr_form_submit', 'snzysldr_form_submit');
