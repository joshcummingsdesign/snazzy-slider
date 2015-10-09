<?php

/*****************************************
* Register scripts and styles
/****************************************/

function snzysldr_register_scripts() {

	wp_register_style( 'snzysldr_styles', plugin_dir_url( __FILE__ ) . 'css/snzysldr-styles.css' );
	wp_register_style( 'snzysldr_styles_rtl', plugin_dir_url( __FILE__ ) . 'css/snzysldr-styles-rtl.css' );

	wp_register_script( 'touchswipe_js', plugin_dir_url( __FILE__ ) . 'js/jquery.touchSwipe.js', array('jquery'), '', true );
  wp_register_script( 'snzysldr_script', plugin_dir_url( __FILE__ ) . 'js/snzysldr-script.js', array('jquery', 'touchswipe_js'), '', true );
	wp_register_script( 'snzysldr_script_rtl', plugin_dir_url( __FILE__ ) . 'js/snzysldr-script-rtl.js', array('jquery', 'touchswipe_js'), '', true );

	wp_localize_script( 'snzysldr_script', 'snzysldr_obj', array(
		'options' => get_option( 'snzysldr_options' )
	));
	wp_localize_script( 'snzysldr_script_rtl', 'snzysldr_obj', array(
		'options' => get_option( 'snzysldr_options' )
	));

}
add_action( 'wp_enqueue_scripts', 'snzysldr_register_scripts' );

/*****************************************
* Custom excerpt class
/****************************************/

class SnzysldrExcerpt
{
	function excerpt($text, $length) {
		if(strlen($text) > $length) {
			$text = substr($text, 0, strpos($text, ' ', $length));
			$text = rtrim($text, ', . ? ! - : ;')  . '&hellip;';
		}
		return $text;
	}
}

/*****************************************
* Add shortcode
/****************************************/

function snzysldr_display_slider($atts) {

	$atts = shortcode_atts(
	array(
		'name' => ''
	), $atts);

	$options = get_option( 'snzysldr_options' );
	$slider_name = esc_attr( $atts['name'] );

	if ( isset( $options['sliders'][$slider_name] ) ) {

	  if ( is_rtl() ) {
	    wp_enqueue_style( 'snzysldr_styles_rtl' );
	    wp_enqueue_script( 'snzysldr_script_rtl' );
	  } else {
	    wp_enqueue_style( 'snzysldr_styles' );
	    wp_enqueue_script( 'snzysldr_script' );
	  }
	  wp_enqueue_script( 'touchswipe_js' );

		$images = $options['sliders'][$slider_name]['images'];
		$settings = $options['sliders'][$slider_name]['settings'];

		include ( 'partials/snzysldr-public-content.php' );

	}

}
add_shortcode( 'snazzy_slider', 'snzysldr_display_slider' );
