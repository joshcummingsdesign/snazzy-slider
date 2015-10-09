<?php

/*****************************************
* Submenu data processing
/****************************************/

function snzysldr_update_image() {

  check_ajax_referer( 'snzysldr-nonce', 'security' );

  $img_id = $_POST['img_id'];
  $btn = $_POST['img_btn'];

  if ( ctype_digit( $img_id ) && preg_match('/snzysldr_upload[0-5]/', $btn) ) {

    $options = get_option( 'snzysldr_options' );
    $slider_name = $options['current'];
    $images = $options['sliders'][$slider_name]['images'];
    $settings = $options['sliders'][$slider_name]['settings'];

    $img_alt = sanitize_text_field( $_POST['img_alt'] );
    $btn_num = intval( preg_replace( '/[^0-9]+/', '', $btn) );
    $images[$btn_num] = $img_id;
    $settings['img_alt' . $btn_num] = $img_alt;

    $options['sliders'][$slider_name]['images'] = $images;
    $options['sliders'][$slider_name]['settings'] = $settings;

    update_option('snzysldr_options', $options);
    echo 'updated';

  } else {
    die('error');
  }

  die();
}
add_action('wp_ajax_snzysldr_update_image', 'snzysldr_update_image');


function snzysldr_add_image() {

  check_ajax_referer( 'snzysldr-nonce', 'security' );

  $img_id = $_POST['img_id'];

  if ( ctype_digit( $img_id ) ) {

    $options = get_option( 'snzysldr_options' );
    $slider_name = $options['current'];
    $images = $options['sliders'][$slider_name]['images'];
    $settings = $options['sliders'][$slider_name]['settings'];

    $keys = array_keys($images);
    $key = 0;

    // Search for the first available key to use for the image ID
    for ( $i = 0; $i < 6; $i++ ) {
      if ( !in_array($i, $keys) ) {
        $key = $i;
        break;
      }
    }

    $images[$key] = $img_id;
    $img_alt = sanitize_text_field( $_POST['img_alt'] );
    $settings['img_alt' . $key] = $img_alt;

    $options['sliders'][$slider_name]['images'] = $images;
    $options['sliders'][$slider_name]['settings'] = $settings;

    update_option('snzysldr_options', $options);
    echo 'updated';

  } else {
    die('error');
  }

  die();
}
add_action('wp_ajax_snzysldr_add_image', 'snzysldr_add_image');


function snzysldr_save_order() {

  check_ajax_referer( 'snzysldr-nonce', 'security' );

  $options = get_option( 'snzysldr_options' );
  $slider_name = $options['current'];
  $new_order = $_POST['snzysldr_img'];
  $new_list = array();

  // Store the new order in an array
  foreach ( $new_order as $v ) {
    if ( isset( $options['sliders'][$slider_name]['images'][$v] ) ) {
        $new_list[$v] = $options['sliders'][$slider_name]['images'][$v];
    }
  }

  $options['sliders'][$slider_name]['images'] = $new_list;
  update_option('snzysldr_options', $options);

  die();
}
add_action('wp_ajax_snzysldr_update_order', 'snzysldr_save_order');


function snzysldr_delete_image() {

  check_ajax_referer( 'snzysldr-nonce', 'security' );

  $del_btn = $_POST['del_btn'];

  $btn_num = intval(preg_replace('/[^0-9]+/', '', $del_btn), 10);

  if ( is_int( $btn_num ) ) {

    $options = get_option( 'snzysldr_options' );
    $slider_name = $options['current'];
    $images = $options['sliders'][$slider_name]['images'];
    $settings = $options['sliders'][$slider_name]['settings'];

    unset( $images[$btn_num] );
    unset( $settings['text_content' . $btn_num] );

    $options['sliders'][$slider_name]['images'] = $images;
    $options['sliders'][$slider_name]['settings'] = $settings;

    update_option('snzysldr_options', $options);
    echo 'updated';

  } else {
    die('error');
  }

  die();
}
add_action('wp_ajax_snzysldr_delete_image', 'snzysldr_delete_image');


function snzysldr_save_color() {

  check_ajax_referer( 'snzysldr-nonce', 'security' );

  $color = $_POST['color'];

  if ( preg_match( '/^\#[0-9a-f]{6}$/i', $color ) ) {

    $options = get_option( 'snzysldr_options' );
    $slider_name = $options['current'];
    $settings = $options['sliders'][$slider_name]['settings'];

    $selector = $_POST['selector'];
    $select_num = intval(preg_replace('/[^0-9]+/', '', $selector), 10);
    $settings['img_color' . $select_num] = $color;

    $options['sliders'][$slider_name]['settings'] = $settings;
    update_option('snzysldr_options', $options);
    echo 'updated';

  } else {
    die('color');
  }

  die();
}
add_action('wp_ajax_snzysldr_save_color', 'snzysldr_save_color');


function snzysldr_save_text_content() {

  check_ajax_referer( 'snzysldr-nonce', 'security' );

  $post_id = $_POST['value'];

  if ( ctype_digit( $post_id ) ) {

    $options = get_option( 'snzysldr_options' );
    $slider_name = $options['current'];

    $settings = $options['sliders'][$slider_name]['settings'];
    $selector = $_POST['selector'];
    $select_num = intval(preg_replace('/[^0-9]+/', '', $selector), 10);

    $settings['text_content' . $select_num] = $post_id;

    $options['sliders'][$slider_name]['settings'] = $settings;

    update_option('snzysldr_options', $options);
    echo 'updated';

  } else {
    die('error');
  }

  die();
}
add_action('wp_ajax_snzysldr_save_text_content', 'snzysldr_save_text_content');


function snzysldr_save_sizes() {

  check_ajax_referer( 'snzysldr-nonce', 'security' );

  $size = $_POST['value'];

  if ( 'contain' === $size || 'cover' === $size ) {
    $options = get_option( 'snzysldr_options' );
    $slider_name = $options['current'];

    $settings = $options['sliders'][$slider_name]['settings'];
    $selector = $_POST['selector'];
    $select_num = intval(preg_replace('/[^0-9]+/', '', $selector), 10);

    $settings['img_size' . $select_num] = $size;

    $options['sliders'][$slider_name]['settings'] = $settings;

    update_option('snzysldr_options', $options);
    echo 'updated';

  } else {
    die('error');
  }

  die();
}
add_action('wp_ajax_snzysldr_save_sizes', 'snzysldr_save_sizes');
