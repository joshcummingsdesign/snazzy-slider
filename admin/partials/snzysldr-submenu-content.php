<?php

/*****************************************
* Submenu content
/****************************************/

?>

<div class="wrap">
		<?php if ( empty( $options['sliders'] ) ) : ?>

			<h2 class="snzysldr_title"><?php esc_attr_e( 'Snazzy Slider', 'snazzy-slider' ); ?></h2>

		<?php else: ?>

			<h2 class="snzysldr_title"><?php printf( esc_attr__( '%s', 'snazzy-slider' ), $slider_name ); ?></h2>

		<?php endif; ?>

		<div id="snzysldr-spinner" class="spinner"></div>

		<?php settings_errors(); ?>
		<div id="snzysldr_errors"></div>

		<div id="poststuff">
			<div id="post-body" class="metabox-holder columns-1">
				<div id="post-body-content">

					<?php if ( empty( $options['sliders'] ) ) : ?>

						<p>No sliders created.</p>

					<?php else : ?>

					<div class="snzysldr_fouc" style="display: none;">

						<div class="postbox snysldr_sidebar" role="group" aria-label="sidebar">
							<h3><span><?php esc_attr_e( 'Thank you for using Snazzy Slider!', 'snazzy-slider' ); ?></span></h3>
							<div class="inside">
								<p><?php esc_attr_e( "To begin customizing your slider, click the upload button. Once you have configured and saved your settings, copy the shortcode below and paste it where you'd like your slider to be displayed. If you are creating a custom page or theme, the template code is also provided. If you have questions or feedback, or would like to watch a tutorial video, click the help button.", 'snazzy-slider' ); ?></p>
								<p class="snzysldr_jcd">&copy; <?php echo date("Y"); ?> <a href="#">Josh Cummings Design</a>.</p>
							</div>
						</div>

						<div class="postbox snzysldr_main_modules">
							<div id="snzysldr_img_modules" class="snzysldr-img-modules">

							<!-- The query for the content selects -->
							<?php
								$args = array(
									'post_type' => 'post',
									'orderby' => 'title',
									'order' => 'asc'
								);
								$admin_query = new WP_Query($args);
							?>

							<?php foreach ( $images as $key => $item ) :

								$img_num = esc_attr( $key + 1 ); ?>

								<div id="snzysldr_img_<?php echo esc_attr( $key ); ?>" tabindex="0" class="snzysldr_img" role="toolbar" aria-label="<?php printf( esc_attr__( 'image %s', 'snazzy-slider' ), $img_num ); ?>" style="background-color: <?php echo esc_attr( $settings['img_color' . $key] ); ?>; background-image: url('<?php

									if( '-1' === $images[$key] ) {
										echo plugins_url( 'snazzy-slider/admin/img/getstarted.gif' );
									} else {
										$img_src = wp_get_attachment_image_src( $images[$key], 'full' );
										echo esc_attr( $img_src[0] );
									}

								?>');">

									<div id="snzysldr_text-overlay<?php echo esc_attr( $key ); ?>" class="snzysldr_text-overlay snzysldr_overlay" role="tabpanel">
										<div class="snzysldr_text-overlay-items">
											<h3><?php esc_attr_e('Text Content', 'snazzy-slider'); ?></h3>
											<select id="snzysldr_text_content<?php echo esc_attr( $key ); ?>" name="snzysldr_settings[text_content<?php echo esc_attr( $key ); ?>]">
												<option value="-1" <?php if( empty( $settings['text_content' . $key] ) ) { echo 'selected="selected"'; } ?> disabled><?php echo esc_attr_e( 'Select Post', 'snazzy-slider' ); ?></option>

												<!-- The loop for the text content -->
												<?php
													if ( $admin_query->have_posts() ) :
														while ( $admin_query->have_posts() ) :

															$admin_query->the_post();
															$post_ID = get_the_ID();
															$post_title = get_the_title();

															if ( isset( $settings['text_content' . $key] ) && (string)$post_ID === $settings['text_content' . $key] ) {
																$selected = 'selected="selected"';
															} else {
																$selected = '';
															}
												?>

													<option value="<?php echo $post_ID; ?>" <?php echo $selected; ?>/><?php echo $post_title; ?></option>

												<?php endwhile; endif; wp_reset_postdata(); ?>

											</select>
										</div>
									</div>
									<div id="snzysldr_size-overlay<?php echo esc_attr( $key ); ?>" class="snzysldr_size-overlay snzysldr_overlay" role="tabpanel">
										<div class="snzysldr_size-overlay-items">
											<h3><?php esc_attr_e('Image Size', 'snazzy-slider'); ?></h3>
											<div class="snzysldr_radio">
												<label for="snzysldr_img-size--small<?php echo esc_attr( $key ); ?>"><?php esc_attr_e('Small', 'snazzy-slider'); ?></label>
												<input id="snzysldr_img-size--small<?php echo esc_attr( $key ); ?>" type="radio" name="snzysldr_img-size<?php echo esc_attr( $key ); ?>" value="contain" <?php checked( 'contain', $settings['img_size' . $key] ); ?>/>
											</div>
											<div class="snzysldr_radio">
												<label for="snzysldr_img-size--large<?php echo esc_attr( $key ); ?>"><?php esc_attr_e('Large', 'snazzy-slider'); ?></label>
												<input id="snzysldr_img-size--large<?php echo esc_attr( $key ); ?>" type="radio" name="snzysldr_img-size<?php echo esc_attr( $key ); ?>" value="cover" <?php checked( 'cover', $settings['img_size' . $key] ); ?>/>
											</div>
										</div>
									</div>
									<div id="snzysldr_color-overlay<?php echo esc_attr( $key ); ?>" class="snzysldr_color-overlay snzysldr_overlay" role="tabpanel">
										<div class="snzysldr_color-overlay-items">
											<h3><?php esc_attr_e('Background Color', 'snazzy-slider'); ?></h3>
											<div id="snzysldr_color_swatch<?php echo esc_attr( $key ); ?>" class="snzysldr_color_swatch" style="background-color: <?php echo esc_attr( $settings['img_color' . $key] ); ?>;"></div>
											<input type="text" id="snzysldr_color_picker<?php echo esc_attr( $key ); ?>" class="snzysldr_color_picker" maxlength="7" value="<?php echo esc_attr( $settings['img_color' . $key] ); ?>" aria-label="<?php printf( esc_attr__( 'image %s background color', 'snazzy-slider' ), $img_num ); ?>">
										</div>
									</div>
									<ul class="snzysldr_img-tools" role="tablist" aria-label="<?php printf( esc_attr__( 'image %s settings', 'snazzy-slider' ), $img_num ); ?>">
										<li id="snzysldr_img-text<?php echo esc_attr( $key ); ?>" class="snzysldr_img-tool snzysldr_img-text" role="tab" aria-label="<?php printf( esc_attr__( 'image %s text', 'snazzy-slider' ), $img_num ); ?>" aria-controls="snzysldr_text-overlay<?php echo esc_attr( $key ); ?>" tabindex="0"></li>
										<li id="snzysldr_size<?php echo esc_attr( $key ); ?>" class="snzysldr_img-tool snzysldr_size" role="tab" aria-label="<?php printf( esc_attr__( 'image %s size', 'snazzy-slider' ), $img_num ); ?>" aria-controls="snzysldr_size-overlay<?php echo esc_attr( $key ); ?>" tabindex="0"></li>
										<li id="snzysldr_color<?php echo esc_attr( $key ); ?>" class="snzysldr_img-tool snzysldr_color" role="tab" aria-label="<?php printf( esc_attr__( 'image %s background color', 'snazzy-slider' ), $img_num ); ?>" aria-controls="snzysldr_color-overlay<?php echo esc_attr( $key ); ?>" tabindex="0"></li>
										<li id="snzysldr_upload<?php echo esc_attr( $key ); ?>" class="snzysldr_img-tool snzysldr_upload" role="button" aria-label="<?php printf( esc_attr__( 'upload image %s', 'snazzy-slider' ), $img_num ); ?>" tabindex="0"></li>
										<li id="snzysldr_color_save<?php echo esc_attr( $key ); ?>" class="snzysldr_img-tool snzysldr_color_save" role="button" aria-label="<?php printf( esc_attr__( 'save image %s color', 'snazzy-slider' ), $img_num ); ?>" tabindex="0"></li>
									</ul>
									<div id="snzysldr_close<?php echo esc_attr( $key ); ?>" class="snzysldr_close snzysldr_close_bg" role="button" aria-label="<?php printf( esc_attr__( 'delete image %s', 'snazzy-slider' ), $img_num ); ?>" tabindex="0"></div>
								</div>

							<?php endforeach;

							if ( count( $images ) < 6 ) : ?>

								<div class="snzysldr_img_add" role="button" aria-label="<?php esc_attr_e( 'add image', 'snazzy-slider' ); ?>" tabindex="0"></div>

							<?php endif; ?>

							</div>
						</div>
						<div class="postbox snzysldr_main_modules">
							<form id="snzysldr_submenu_form" method="post" action="">

								<div class="snzysldr-control-modules">
									<div id="snzysldr_general_settings" class="snzysldr_control" role="group" aria-label="<?php esc_attr_e( 'general settings', 'snazzy-slider' ); ?>">
										<h3 class="snzysldr_module_heading"><?php esc_attr_e('General', 'snazzy-slider'); ?></h3>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Height (px)', 'snazzy-slider'); ?></h4>
											<input type="number" id="snzysldr_height" name="snzysldr_general_options[slider_height]" role="textbox" class="snzysldr_number" min="200" max="1080" value="<?php echo esc_attr( $settings['slider_height'] ); ?>" aria-label="<?php esc_attr_e( 'slider height', 'snazzy-slider' ); ?>">
										</div>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Arrows', 'snazzy-slider'); ?></h4>
											<div class="snzysldr_radio snzysldr_arrows">

												<?php if( is_rtl() ) : ?>

													<label for="snzysldr_arrows--off"><?php esc_attr_e('Off', 'snazzy-slider'); ?></label>
													<input id="snzysldr_arrows--on" type="radio" name="snzysldr_general_options[arrows]" value="on" <?php checked( 'on', $settings['arrows'] ); ?>/>
													<label for="snzysldr_arrows--on"><?php esc_attr_e('On', 'snazzy-slider'); ?></label>
													<input id="snzysldr_arrows--off" type="radio" name="snzysldr_general_options[arrows]" value="off" <?php checked( 'off', $settings['arrows'] ); ?>/>

												<?php else : ?>

													<label for="snzysldr_arrows--on"><?php esc_attr_e('On', 'snazzy-slider'); ?></label>
													<input id="snzysldr_arrows--on" type="radio" name="snzysldr_general_options[arrows]" value="on" <?php checked( 'on', $settings['arrows'] ); ?>/>
													<label for="snzysldr_arrows--off"><?php esc_attr_e('Off', 'snazzy-slider'); ?></label>
													<input id="snzysldr_arrows--off" type="radio" name="snzysldr_general_options[arrows]" value="off" <?php checked( 'off', $settings['arrows'] ); ?>/>

												<?php endif; ?>

											</div>
										</div>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Controls Align', 'snazzy-slider'); ?></h4>
											<select id="snzysldr_controls_align" name="snzysldr_general_options[controls_align]">

											<?php
												$cntrl_pos = array(
													'left' => 'Left',
													'center' => 'Center',
													'right' => 'Right'
												);

												foreach ( $cntrl_pos as $pos => $name ) :

												if ( $pos === $settings['controls_align'] ) {
													$sel = 'selected="selected"';
												} else {
													$sel = '';
												}
											?>

												<option value="<?php echo esc_attr($pos); ?>" <?php echo $sel; ?>/><?php esc_attr_e( $name, 'snazzy-slider' ); ?></option>

											<?php endforeach; ?>

											</select>
										</div>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Controls Color', 'snazzy-slider'); ?></h4>
											<div class="snzysldr_color_module">
												<input type="text" id="snzysldr_controls_color" class="snzysldr_picker" name="snzysldr_general_options[controls_color]" maxlength="7" value="<?php echo esc_attr( $settings['controls_color'] ); ?>" aria-label="<?php esc_attr_e( 'controls color', 'snazzy-slider' ); ?>">
												<div id="snzysldr_cntrl_color_save" class="snzysldr_save" style="background-color: <?php echo esc_attr( $settings['controls_color'] ); ?>;"></div>
											</div>
										</div>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Selected Color', 'snazzy-slider'); ?></h4>
											<div class="snzysldr_color_module">
												<input type="text" id="snzysldr_sel_color" class="snzysldr_picker" name="snzysldr_general_options[sel_color]" maxlength="7" value="<?php echo esc_attr( $settings['sel_color'] ); ?>" aria-label="<?php esc_attr_e( 'selected color', 'snazzy-slider' ); ?>">
												<div id="snzysldr_sel_color_save" class="snzysldr_save" style="background-color: <?php echo esc_attr( $settings['sel_color'] ); ?>;"></div>
											</div>
										</div>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Autoplay', 'snazzy-slider'); ?></h4>
											<div class="snzysldr_radio snzysldr_autoplay">

												<?php if( is_rtl() ) : ?>

													<label for="snzysldr_autoplay--on"><?php esc_attr_e('On', 'snazzy-slider'); ?></label>
													<input id="snzysldr_autoplay--off" type="radio" name="snzysldr_general_options[autoplay]" value="off" <?php checked( 'off', $settings['autoplay'] ); ?>/>
													<label for="snzysldr_autoplay--off"><?php esc_attr_e('Off', 'snazzy-slider'); ?></label>
													<input id="snzysldr_autoplay--on" type="radio" name="snzysldr_general_options[autoplay]" value="on" <?php checked( 'on', $settings['autoplay'] ); ?>/>

												<?php else : ?>

													<label for="snzysldr_autoplay--off"><?php esc_attr_e('Off', 'snazzy-slider'); ?></label>
													<input id="snzysldr_autoplay--off" type="radio" name="snzysldr_general_options[autoplay]" value="off" <?php checked( 'off', $settings['autoplay'] ); ?>/>
													<label for="snzysldr_autoplay--on"><?php esc_attr_e('On', 'snazzy-slider'); ?></label>
													<input id="snzysldr_autoplay--on" type="radio" name="snzysldr_general_options[autoplay]" value="on" <?php checked( 'on', $settings['autoplay'] ); ?>/>

												<?php endif; ?>

											</div>
										</div>
										<div id="snzysldr_duration_module" class="snzysldr_sub_module" aria-live="assertive">
											<h4><?php esc_attr_e('Duration (ms)', 'snazzy-slider'); ?></h4>
											<input type="number" id="snzysldr_duration" class="snzysldr_number" role="textbox" name="snzysldr_general_options[slide_duration]" min="5000" max="20000" value="<?php echo esc_attr( $settings['slide_duration'] ); ?>" aria-label="<?php esc_attr_e( 'slide duration', 'snazzy-slider' ); ?>">
										</div>
										<div id="snzysldr_effect_module" class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Effect', 'snazzy-slider'); ?></h4>
											<div class="snzysldr_radio snzysldr_fx">

												<?php if( is_rtl() ) : ?>

													<label for="snzysldr_fx--fade"><?php esc_attr_e('Fade', 'snazzy-slider'); ?></label>
													<input id="snzysldr_fx--slide" type="radio" name="snzysldr_general_options[fx]" value="slide" <?php checked( 'slide', $settings['fx'] ); ?>/>
													<label for="snzysldr_fx--slide"><?php esc_attr_e('Slide', 'snazzy-slider'); ?></label>
													<input id="snzysldr_fx--fade" type="radio" name="snzysldr_general_options[fx]" value="fade" <?php checked( 'fade', $settings['fx'] ); ?>/>

												<?php else : ?>

													<label for="snzysldr_fx--slide"><?php esc_attr_e('Slide', 'snazzy-slider'); ?></label>
													<input id="snzysldr_fx--slide" type="radio" name="snzysldr_general_options[fx]" value="slide" <?php checked( 'slide', $settings['fx'] ); ?>/>
													<label for="snzysldr_fx--fade"><?php esc_attr_e('Fade', 'snazzy-slider'); ?></label>
													<input id="snzysldr_fx--fade" type="radio" name="snzysldr_general_options[fx]" value="fade" <?php checked( 'fade', $settings['fx'] ); ?>/>

												<?php endif; ?>

											</div>
										</div>
										<div id="snzysldr_fade_color_module" class="snzysldr_sub_module" aria-live="assertive">
											<h4><?php esc_attr_e('Fade Color', 'snazzy-slider'); ?></h4>
											<div class="snzysldr_color_module">
												<input type="text" id="snzysldr_fade_color" class="snzysldr_picker" name="snzysldr_general_options[fade_color]" maxlength="7" value="<?php echo esc_attr( $settings['fade_color'] ); ?>" aria-label="<?php esc_attr_e( 'fade color', 'snazzy-slider' ); ?>">
												<div id="snzysldr_fade_color_save" class="snzysldr_save" style="background-color: <?php echo esc_attr( $settings['fade_color'] ); ?>;"></div>
											</div>
										</div>
									</div>
									<div id="snzysldr_text_settings" class="snzysldr_control" role="group" aria-label="<?php esc_attr_e( 'text settings', 'snazzy-slider' ); ?>">
										<input type="checkbox" id="snzysldr_text_enable" name="snzysldr_general_options[text_enable]" value="on" <?php checked( 'on', $settings['text_enable'] ); ?> aria-hidden="true">
										<label for="snzysldr_text_enable"><span class="snzysldr_close_bg" role="button" aria-label="<?php esc_attr_e( 'disable text', 'snazzy-slider' ); ?>" tabindex="0"></span></label>
										<h3 class="snzysldr_module_heading"><?php esc_attr_e('Text', 'snazzy-slider'); ?></h3>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Text Effect', 'snazzy-slider'); ?></h4>
											<select id="snzysldr_text_fx" name="snzysldr_general_options[text_fx]">

											<?php
												$text_fx = array(
													'none' => 'None',
													'slide' => 'Slide',
													'fade' => 'Fade'
												);

												foreach ( $text_fx as $fx => $fx_name ) :

												if ( $fx === $settings['text_fx'] ) {
													$select = 'selected="selected"';
												} else {
													$select = '';
												}
											?>

												<option value="<?php echo esc_attr($fx); ?>" <?php echo $select; ?>/><?php esc_attr_e( $fx_name, 'snazzy-slider' ); ?></option>

											<?php endforeach; ?>

											</select>
										</div>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Text Color', 'snazzy-slider'); ?></h4>
											<div class="snzysldr_color_module">
												<input type="text" id="snzysldr_text_color" class="snzysldr_picker" name="snzysldr_general_options[text_color]" maxlength="7" value="<?php echo esc_attr( $settings['text_color'] ); ?>" aria-label="<?php esc_attr_e( 'text color', 'snazzy-slider' ); ?>">
												<div id="snzysldr_text_color_save" class="snzysldr_save" style="background-color: <?php echo esc_attr( $settings['text_color'] ); ?>;"></div>
											</div>
										</div>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Background', 'snazzy-slider'); ?></h4>
											<div class="snzysldr_color_module">
												<input type="text" id="snzysldr_text_bg" class="snzysldr_picker" name="snzysldr_general_options[text_bg]" maxlength="7" value="<?php echo esc_attr( $settings['text_bg'] ); ?>" aria-label="<?php esc_attr_e( 'text background color', 'snazzy-slider' ); ?>">
												<div id="snzysldr_text_bg_save" class="snzysldr_save" style="background-color: <?php echo esc_attr( $settings['text_bg'] ); ?>;"></div>
											</div>
										</div>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Link Color', 'snazzy-slider'); ?></h4>
											<div class="snzysldr_color_module">
												<input type="text" id="snzysldr_link_color" class="snzysldr_picker" name="snzysldr_general_options[link_color]" maxlength="7" value="<?php echo esc_attr( $settings['link_color'] ); ?>" aria-label="<?php esc_attr_e( 'link color', 'snazzy-slider' ); ?>">
												<div id="snzysldr_link_save" class="snzysldr_save" style="background-color: <?php echo esc_attr( $settings['link_color'] ); ?>;"></div>
											</div>
										</div>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Link Hover', 'snazzy-slider'); ?></h4>
											<div class="snzysldr_color_module">
												<input type="text" id="snzysldr_link_hover" class="snzysldr_picker" name="snzysldr_general_options[link_hover]" maxlength="7" value="<?php echo esc_attr( $settings['link_hover'] ); ?>" aria-label="<?php esc_attr_e( 'link hover color', 'snazzy-slider' ); ?>">
												<div id="snzysldr_link_hover_save" class="snzysldr_save" style="background-color: <?php echo esc_attr( $settings['link_hover'] ); ?>;"></div>
											</div>
										</div>
										<div class="snzysldr_sub_module">
											<h4><?php esc_attr_e('Link Align', 'snazzy-slider'); ?></h4>
											<select id="snzysldr_link_align" name="snzysldr_general_options[link_align]">

											<?php
												$link_pos = array(
													'left' => 'Left',
													'center' => 'Center',
													'right' => 'Right'
												);

												foreach ( $link_pos as $position => $pos_name ) :

												if ( $position === $settings['link_align'] ) {
													$slct = 'selected="selected"';
												} else {
													$slct = '';
												}
											?>

												<option value="<?php echo esc_attr( $position ); ?>" <?php echo $slct; ?>/><?php esc_attr_e( $pos_name, 'snazzy-slider' ); ?></option>

											<?php endforeach; ?>

											</select>
										</div>
									</div>
									<div class="snzysldr_control" role="group" aria-label="<?php esc_attr_e( 'save settings', 'snazzy-slider' ); ?>">
										<h3 class="snzysldr_module_heading"><?php esc_attr_e('Copy Shortcode', 'snazzy-slider'); ?></h3>
										<div class="snzysldr_shortcode_module snzysldr_sub_module">
											<input type="text" class="snzysldr_copy_shortcode" value="<?php printf( esc_attr('[snazzy_slider name="%s"]'), $current ); ?>" readonly>
										</div>
										<h3 class="snzysldr_module_heading"><?php esc_attr_e('Copy Template Code', 'snazzy-slider'); ?></h3>
										<div class="snzysldr_shortcode_module snzysldr_sub_module">
											<input type="text" class="snzysldr_copy_shortcode" value="<?php printf( esc_attr("<?php do_shortcode('[snazzy_slider name=\"%s\"]'); ?>"), $current ); ?>" readonly>
										</div>
										<input id="snzysldr_submit_btn" type="button" value="<?php esc_attr_e( 'Save', 'dbtest' ); ?>">
										<a href="#" id="snzysldr_help_btn"><?php esc_attr_e('Help', 'snazzy-slider'); ?></a>
									</div>

									<?php if ( 'off' === $settings['text_enable'] ) : ?>

										<div class="snzysldr_text_add" role="button" aria-label="<?php esc_attr_e( 'enable text', 'snazzy-slider' ); ?>" tabindex="0"></div>

									<?php endif; ?>

								</div>
							</form>
						</div>
					</div>

					<?php endif; ?>

				</div>
			</div>
			<br class="clear">
		</div>
</div>
