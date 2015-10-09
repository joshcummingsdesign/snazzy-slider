<?php

/*****************************************
* The front end content
/****************************************/

?>

  <script>
    var snzysldr_name = '<?php echo $slider_name; ?>';
  </script>

  <style>
    .snzysldr-dot-highlighted {
      background-color: <?php echo esc_attr( $settings['sel_color'] ); ?>;
    }
    .snzysldr-controls__left-btn:hover .snzysldr-controls__btn-fill,
    .snzysldr-controls__left-btn:focus .snzysldr-controls__btn-fill,
    .snzysldr-controls__right-btn:hover .snzysldr-controls__btn-fill,
    .snzysldr-controls__right-btn:focus .snzysldr-controls__btn-fill {
      fill: <?php echo esc_attr( $settings['sel_color'] ); ?>;
    }
    .snzysldr-controls__dot {
      border-color: <?php echo esc_attr( $settings['controls_color'] ); ?>;
    }
    .snzysldr-read-more a:hover {
      color: <?php echo esc_attr( $settings['link_hover'] ); ?> !important;
    }
    .snzysldr-controls__dot:hover,
    .snzysldr-controls__dot:focus {
      border: 2px solid <?php echo esc_attr( $settings['sel_color'] ); ?>;
    }
  </style>

  <?php

  // Loop through and get the post title, excerpt, and link
  ${'excerpt' . $slider_name} = new SnzysldrExcerpt();

    foreach ( $images as $key => $img_id ) {

      if ( isset( $settings['text_content' . $key] ) ) {
        ${'post' . $key} = get_post( intval( $settings['text_content' . $key] ) ); // $post0
        ${'post_title' . $key} = ${'post' . $key}->post_title; // $post_title0
        ${'post_content' . $key} = ${'excerpt' . $slider_name}->excerpt( ${'post' . $key}->post_content, 300 ); // $post_content0
        ${'post_link' . $key} = get_permalink( ${'post' . $key} ); // $post_link0
      }

    }

  ?>

  <div class="snzysldr-slider-wrap" role="complementary" aria-label="<?php esc_attr_e( 'image slider', 'snazzy-slider' ); ?>">
    <div class="snzysldr-slider" style="height: <?php echo esc_attr( $settings['slider_height'] ); ?>px; background-color: <?php echo esc_attr( $settings['fade_color'] ); ?>;">
      <ul class="snzysldr-slider__slides">

        <?php

        $ordered_images = array();
        $img_src = array();

        foreach ($images as $key => $img_id) {
          $ordered_images[] = array($key => $img_id);
          $img_src[] = wp_get_attachment_image_src( $img_id, 'full' );
        }

        foreach ( $ordered_images as $key => $img_array ) :

          if ( $img_id !== '-1' ) :

            $this_img_alt = $settings['img_alt' . key($img_array)];
            $this_img_color = $settings['img_color' . key($img_array)];
            $this_img_url = $img_src[$key][0];
            $this_background_size = $settings['img_size' . key($img_array)];

          ?>

          <li class="snzysldr-slider__image" role="img" aria-label="<?php esc_attr_e( $this_img_alt, 'snazzy-slider' ); ?>" style="background: <?php echo esc_attr( $this_img_color ); ?> url('<?php echo esc_url( $this_img_url ); ?>') no-repeat center; background-size: <?php echo esc_attr( $this_background_size ); ?>;"></li>

        <?php endif; endforeach; ?>

      </ul>
    </div>
    <div class="snzysldr-controls-wrap" style="text-align: <?php echo esc_attr( $settings['controls_align'] ); ?>">

      <div class="snzysldr-controls" aria-label="<?php esc_attr_e( 'image slider controls', 'snazzy-slider' ); ?>">

      <?php if ( 'on' === $settings['arrows'] ) : ?>

        <div id="snzysldr_lft_btn" class="snzysldr-controls__left-btn" role="button" aria-label="<?php esc_attr_e( 'previous tab', 'snazzy-slider' ); ?>" tabindex="0">

          <?php if ( is_rtl() ) : ?>

            <svg focusable="false" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               viewBox="0 0 30 30" height="22px" width="22px" xml:space="preserve">
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
              </filter>
              <path filter="url(#blur)" opacity=".3" d="M14.3,28.5c-0.6,0.7-1.7,0.6-2.2,0c-0.5-0.6-0.5-1.5,0.1-2.1c3.4-3.4,6.8-6.8,10.3-10.3L12.2,5.9C11.3,5.2,11.4,4,12,3.5
                C12.6,3,13.7,3,14.3,3.8c3.9,3.9,7.8,7.7,11.7,11.7c0.2,0.2,0.4,0.5,0.4,0.8c0,0.3-0.3,0.6-0.5,0.8C21.8,20.8,18.1,24.7,14.3,28.5z"
                />
              <path class="snzysldr-controls__btn-fill" fill="<?php echo esc_attr( $settings['controls_color'] ); ?>" d="M11.4,27.5c-0.6,0.7-1.7,0.6-2.2,0c-0.5-0.6-0.5-1.5,0.1-2.1c3.4-3.4,6.8-6.8,10.3-10.3L9.2,4.8
                C8.4,4.1,8.4,2.9,9.1,2.4c0.6-0.5,1.7-0.4,2.3,0.3c3.9,3.9,7.8,7.7,11.7,11.7c0.2,0.2,0.4,0.5,0.4,0.8c0,0.3-0.3,0.6-0.5,0.8
                C18.9,19.7,15.2,23.6,11.4,27.5z"/>
            </svg>

          <?php else: ?>

            <svg focusable="false" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               viewBox="0 0 30 30" height="22px" width="22px" xml:space="preserve">
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>
              <path filter="url(#blur)" opacity=".3" d="M16.8,3.1c0.6-0.7,1.7-0.6,2.2,0c0.5,0.6,0.5,1.5-0.1,2.1C15.5,8.6,12.1,12,8.7,15.5l10.3,10.3c0.8,0.7,0.8,1.9,0.2,2.5
                c-0.6,0.5-1.7,0.4-2.3-0.3C12.9,23.9,9,20.1,5.1,16.2c-0.2-0.2-0.4-0.5-0.4-0.8c0-0.3,0.3-0.6,0.5-0.8C9.3,10.8,13,6.9,16.8,3.1z"/>
              <path class="snzysldr-controls__btn-fill" fill="<?php echo esc_attr( $settings['controls_color'] ); ?>" d="M19.6,2.5c0.6-0.7,1.7-0.6,2.2,0c0.5,0.6,0.5,1.5-0.1,2.1c-3.4,3.4-6.8,6.8-10.3,10.3l10.3,10.3
                c0.8,0.7,0.8,1.9,0.2,2.5c-0.6,0.5-1.7,0.4-2.3-0.3c-3.9-3.9-7.8-7.7-11.7-11.7c-0.2-0.2-0.4-0.5-0.4-0.8c0-0.3,0.3-0.6,0.5-0.8
                C12.1,10.3,15.8,6.4,19.6,2.5z"/>
            </svg>

          <?php endif; ?>

        </div>

        <?php endif; ?>

        <ul class="snzysldr-controls__dots" role="tablist">

        <?php foreach ( $images as $key => $img_id ) : ?>

          <div class="snzysldr-dot-wrap">
            <li class="snzysldr-controls__dot" role="tab" aria-label="<?php echo esc_attr_e( ${'post_title' . $key}, 'snzysldr-slider' ); ?>" tabindex="0" aria-controls="snzysldr-text__project<?php echo esc_attr( $key ); ?>"></li>
          </div>

        <?php endforeach; ?>

        </ul>

      <?php if ( 'on' === $settings['arrows'] ) : ?>

        <div id="snzysldr_rt_btn" class="snzysldr-controls__right-btn" role="button" aria-label="<?php esc_attr_e( 'next tab', 'snazzy-slider' );  ?>" tabindex="0">

          <?php if ( is_rtl() ) : ?>

            <svg focusable="false" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               viewBox="0 0 30 30" height="22px" width="22px" xml:space="preserve">
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>
              <path filter="url(#blur)" opacity=".3" d="M16.8,3.1c0.6-0.7,1.7-0.6,2.2,0c0.5,0.6,0.5,1.5-0.1,2.1C15.5,8.6,12.1,12,8.7,15.5l10.3,10.3c0.8,0.7,0.8,1.9,0.2,2.5
                c-0.6,0.5-1.7,0.4-2.3-0.3C12.9,23.9,9,20.1,5.1,16.2c-0.2-0.2-0.4-0.5-0.4-0.8c0-0.3,0.3-0.6,0.5-0.8C9.3,10.8,13,6.9,16.8,3.1z"/>
              <path class="snzysldr-controls__btn-fill" fill="<?php echo esc_attr( $settings['controls_color'] ); ?>" d="M19.6,2.5c0.6-0.7,1.7-0.6,2.2,0c0.5,0.6,0.5,1.5-0.1,2.1c-3.4,3.4-6.8,6.8-10.3,10.3l10.3,10.3
                c0.8,0.7,0.8,1.9,0.2,2.5c-0.6,0.5-1.7,0.4-2.3-0.3c-3.9-3.9-7.8-7.7-11.7-11.7c-0.2-0.2-0.4-0.5-0.4-0.8c0-0.3,0.3-0.6,0.5-0.8
                C12.1,10.3,15.8,6.4,19.6,2.5z"/>
            </svg>

          <?php else: ?>

            <svg focusable="false" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               viewBox="0 0 30 30" height="22px" width="22px" xml:space="preserve">
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
              </filter>
              <path filter="url(#blur)" opacity=".3" d="M14.3,28.5c-0.6,0.7-1.7,0.6-2.2,0c-0.5-0.6-0.5-1.5,0.1-2.1c3.4-3.4,6.8-6.8,10.3-10.3L12.2,5.9C11.3,5.2,11.4,4,12,3.5
                C12.6,3,13.7,3,14.3,3.8c3.9,3.9,7.8,7.7,11.7,11.7c0.2,0.2,0.4,0.5,0.4,0.8c0,0.3-0.3,0.6-0.5,0.8C21.8,20.8,18.1,24.7,14.3,28.5z"
                />
              <path class="snzysldr-controls__btn-fill" fill="<?php echo esc_attr( $settings['controls_color'] ); ?>" d="M11.4,27.5c-0.6,0.7-1.7,0.6-2.2,0c-0.5-0.6-0.5-1.5,0.1-2.1c3.4-3.4,6.8-6.8,10.3-10.3L9.2,4.8
                C8.4,4.1,8.4,2.9,9.1,2.4c0.6-0.5,1.7-0.4,2.3,0.3c3.9,3.9,7.8,7.7,11.7,11.7c0.2,0.2,0.4,0.5,0.4,0.8c0,0.3-0.3,0.6-0.5,0.8
                C18.9,19.7,15.2,23.6,11.4,27.5z"/>
            </svg>

          <?php endif; ?>

        </div>

      <?php endif; ?>

      </div>

    </div>

    <?php

      if ( 'on' === $settings['text_enable'] ) :

    ?>

    <div class="snzysldr-text" style="background-color: <?php echo esc_attr( $settings['text_bg'] ); ?>;">
      <div class="snzysldr-text__background">
        <div class="snzysldr-text__container">

        <?php foreach ( $images as $key => $img_id ) :

          if ( isset( $settings['text_content' . $key] ) ) : ?>

          <section id="snzysldr-text__project<?php echo esc_attr( $key ); ?>" class="snzysldr-text__project snzysldr-text-shown" role="tabpanel" aria-hidden="true">
            <div class="snzysldr-text__project-text">
              <h1 style="color: <?php echo esc_attr( $settings['text_color'] ); ?>"><?php echo esc_attr_e( ${'post_title' . $key}, 'snzysldr-slider' ); ?></h1>
              <p style="color: <?php echo esc_attr( $settings['text_color'] ); ?>"><?php echo esc_attr_e( strip_tags( ${'post_content' . $key} ), 'sazzy-slider' ); ?></p>
              <div class="snzysldr-read-more" style="text-align: <?php echo esc_attr( $settings['link_align'] ); ?>;">
                <a href="<?php echo esc_url( ${'post_link' . $key} ); ?>" tabindex="-1" style="color: <?php echo esc_attr( $settings['link_color'] ); ?>;"><?php esc_attr_e( 'Read More', 'snazzy-slider' ); ?></a>
              </div>
            </div>
          </section>

        <?php endif; endforeach; ?>

        </div>
      </div>
    </div>

    <?php endif; ?>

  </div>
