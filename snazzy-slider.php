<?php
/*
Plugin Name: Snazzy Slider
Plugin URI:  https://github.com/joshcummingsdesign/snazzy-slider
Description: A simple and elegant way to display three featured posts.
Version:     1.0
Author:      Josh Cummings Design
Author URI:  http://joshcummingsdesign.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: snazzy-slider
Domain Path: /languages
*/

/*****************************************
* Installation
/****************************************/

function snzysldr_install() {
	$default_options = array(
		'sliders' => array(
			'My_First_Slider' => array(
				'images' => array(
					'-1'
				),
				'settings' => array(
					'img_size0' => 'contain',
					'img_size1' => 'contain',
					'img_size2' => 'contain',
					'img_size3' => 'contain',
					'img_size4' => 'contain',
					'img_size5' => 'contain',
					'img_color0' => '#22272c',
					'img_color1' => '#22272c',
					'img_color2' => '#22272c',
					'img_color3' => '#22272c',
					'img_color4' => '#22272c',
					'img_color5' => '#22272c',
					'slider_height' => '540',
					'arrows' => 'on',
					'controls_align' => 'left',
					'controls_color' => '#ffffff',
					'sel_color' => '#ff6347',
					'autoplay' => 'on',
					'slide_duration' => '8000',
					'fx' => 'slide',
					'fade_color' => '#22272c',
					'text_enable' => 'off',
					'text_fx' => 'none',
					'text_color' => '#ffffff',
					'text_bg' => '#4688f1',
					'link_color' => '#dddddd',
					'link_hover' => '#ffffff',
					'link_align' => 'left'
				)
			)
		),
		'current' => 'My_First_Slider'
	);
	update_option( 'snzysldr_options', $default_options );
}
register_activation_hook( __FILE__, 'snzysldr_install' );

/*****************************************
* Includes
/****************************************/

include ( 'public/snzysldr-public.php' );
include ( 'admin/snzysldr-admin.php' );
