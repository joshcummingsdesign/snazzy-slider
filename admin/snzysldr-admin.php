<?php

/*****************************************
* Add admin menu
/****************************************/

function snzysldr_add_admin_menu() {

  $options = get_option( 'snzysldr_options' );

  add_menu_page(
    'Snazzy Slider',
    'Snazzy Slider',
    'manage_options',
    'snazzy-slider',
    'snzysldr_display_admin_content',
    'dashicons-images-alt2'
  );

  add_submenu_page(
    'snazzy-slider',
    'Snazzy Slider',
    'Add / Edit Sliders',
    'manage_options',
    'snazzy-slider'
  );

  add_submenu_page(
    'snazzy-slider',
    'Snazzy Slider Edit',
    'Edit Recent Slider',
    'manage_options',
    'snazzy-slider-edit',
    'snzysldr_display_submenu_content'
  );

}
add_action( 'admin_menu', 'snzysldr_add_admin_menu' );

/*****************************************
* Register scripts and styles
/****************************************/

function snzysldr_admin_scripts() {

  wp_register_style( 'snzysldr_admin_styles', plugins_url( 'css/snzysldr-admin.css', __FILE__ ) );
  wp_register_style( 'snzysldr_admin_styles_rtl', plugins_url( 'css/snzysldr-admin-rtl.css', __FILE__ ) );

  wp_register_script( 'jquery-ui-sortable', '', array('jquery') );
  wp_register_script( 'jquery-effects-shake', '', array('jquery') );
  wp_register_script( 'iris', '', array('jquery') );
  wp_register_script( 'snzysldr_admin_script', plugins_url( 'js/snzysldr-admin-script.js', __FILE__ ), array('jquery') );
  wp_register_script( 'snzysldr_submenu_script', plugins_url( 'js/snzysldr-submenu-script.js', __FILE__ ), array('jquery', 'jquery-ui-sortable', 'jquery-effects-shake'), '', true );


  wp_localize_script( 'snzysldr_admin_script', 'snzysldr_obj', array(
    'options' => get_option( 'snzysldr_options' ),
    'nonce' =>  wp_create_nonce( 'snzysldr-nonce' ),
    'network' => esc_attr__('Action could not be performed due to a network error.', 'snazzy-slider'),
    'invalid' => esc_attr__('Action could not be performed due to an invalid database entry.', 'snazzy-slider'),
    'dismiss' => esc_attr__( 'Dismiss this notice.', 'snazzy-slider' ),
    'edit' => esc_attr__( 'Edit', 'snazzy-slider' ),
    'delete' => esc_attr__( 'Delete', 'snazzy-slider' ),
    'keep' => esc_attr__( 'Keep', 'snazzy-slider' ),
    'confirm' => esc_attr__( 'Are you sure you want to delete this slider?', 'snazzy-slider' ),
    'added' => esc_attr__( 'added successfully.', 'snazzy-slider' ),
    'deleted' => esc_attr__( 'has been deleted.', 'snazzy-slider' ),
    'same' => esc_attr__( 'already exists.', 'snazzy-slider' ),
    'blank' => esc_attr__( 'Slider name cannot be blank.', 'snazzy-slider' ),
    'specialchars' => esc_attr__( 'Slider name cannot contain special characters.', 'snazzy-slider' )
  ));
  wp_localize_script( 'snzysldr_submenu_script', 'snzysldr_obj', array(
    'options' => get_option( 'snzysldr_options' ),
    'nonce' =>  wp_create_nonce( 'snzysldr-nonce' ),
    'network' => esc_attr__('Action could not be performed due to a network error.', 'snazzy-slider'),
    'invalid' => esc_attr__('Action could not be performed due to an invalid database entry.', 'snazzy-slider'),
    'text' => esc_attr__('Text is enabled. Make sure you have text content selected for each image.', 'snazzy-slider'),
    'no_images' => esc_attr__('No images uploaded.', 'snazzy-slider'),
    'color' => esc_attr__('Invalid image backgorund color entered.', 'snazzy-slider'),
    'slider_height' => esc_attr__('Please enter a height that is between 200 px and 1080 px.', 'snazzy-slider'),
    'arrows' => esc_attr__('Arrows value could not be saved due to an invalid database entry.', 'snazzy-slider'),
    'controls_align' => esc_attr__('Controls align value could not be saved due to an invalid database entry.', 'snazzy-slider'),
    'controls_color' => esc_attr__('Invalid controls color entered.', 'snazzy-slider'),
    'sel_color' => esc_attr__('Invalid selected color entered.', 'snazzy-slider'),
    'fade_color' => esc_attr__('Invalid fade color entered.', 'snazzy-slider'),
    'text_color' => esc_attr__('Invalid text color entered.', 'snazzy-slider'),
    'text_bg' => esc_attr__('Invalid text background color entered.', 'snazzy-slider'),
    'link_color' => esc_attr__('Invalid link color entered.', 'snazzy-slider'),
    'link_hover' => esc_attr__('Invalid link hover color entered.', 'snazzy-slider'),
    'autoplay' => esc_attr__('Autoplay value could not be saved due to an invalid database entry.', 'snazzy-slider'),
    'slide_duration' => esc_attr__('Please enter a duration that is between 5000 ms and 20000 ms.', 'snazzy-slider'),
    'fx' => esc_attr__('Image effect value could not be saved due to an invalid database entry.', 'snazzy-slider'),
    'text_enable' => esc_attr__('Text could not be enabled or disabled due to an invalid database entry.', 'snazzy-slider'),
    'text_fx' => esc_attr__('Text effect value could not be saved due to an invalid database entry.', 'snazzy-slider'),
    'text_fx' => esc_attr__('Text effect value could not be saved due to an invalid database entry.', 'snazzy-slider'),
    'link_align' => esc_attr__('Link align value could not be saved due to an invalid database entry.', 'snazzy-slider'),
    'saved' => esc_attr__('Settings saved.', 'snazzy-slider'),
    'changes' => esc_attr__('You have unsaved changes. To ignore the changes, press OK. To go back, press Cancel.', 'snazzy-slider'),
    'alert' => esc_attr__('The changes you made will be lost if you navigate away from this page.', 'snazzy-slider')
  ));

}
add_action( 'admin_enqueue_scripts', 'snzysldr_admin_scripts' );

/*****************************************
* Custom spinner
/****************************************/

function snzysldr_admin_head() {
  echo
    '<div class="snzysldr-loader-overlay">
    	<div class="snzysldr-loader-container">
    		<div class="snzysldr-block1"></div>
    		<div class="snzysldr-block2"></div>
    		<div class="snzysldr-block3"></div>
    		<div class="snzysldr-block4"></div>
    	</div>
    </div>';
}
add_action( 'admin_head', 'snzysldr_admin_head' );

/*****************************************
* Data processing
/****************************************/

include ( 'includes/snzysldr-admin-data-processing.php' );
include ( 'includes/snzysldr-submenu-data-processing.php' );
include ( 'includes/snzysldr-submenu-form-processing.php' );

/*****************************************
* Display admin content
/****************************************/

function snzysldr_display_admin_content() {

  if ( is_rtl() ) {
    wp_enqueue_style( 'snzysldr_admin_styles_rtl' );
  } else {
    wp_enqueue_style( 'snzysldr_admin_styles' );
  }

  wp_enqueue_script( 'snzysldr_admin_script' );

  $options = get_option( 'snzysldr_options' );

  include ( 'partials/snzysldr-admin-content.php' );

}

/*****************************************
* Display submenu content
/****************************************/

function snzysldr_display_submenu_content() {

  $options = get_option( 'snzysldr_options' );

  if ( !empty( $options['sliders'] ) ) {

    if ( is_rtl() ) {
      wp_enqueue_style( 'snzysldr_admin_styles_rtl' );
    } else {
      wp_enqueue_style( 'snzysldr_admin_styles' );
    }

    wp_enqueue_script( 'jquery-ui-sortable' );
    wp_enqueue_script( 'jquery-effects-shake' );
    wp_enqueue_script( 'iris' );
    wp_enqueue_script( 'snzysldr_submenu_script' );

    wp_enqueue_media();

    $current = $options['current'];
    $images = $options['sliders'][$current]['images'];
    $settings = $options['sliders'][$current]['settings'];
    $slider_name = str_replace( '_', ' ', $current );

  }

  include ( 'partials/snzysldr-submenu-content.php' );

}
