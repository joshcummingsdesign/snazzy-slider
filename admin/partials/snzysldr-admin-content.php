<?php

/*****************************************
* Admin content
/****************************************/

?>

<div class="wrap">

	<h2 class="snzysldr_title"><?php esc_attr_e( 'Snazzy Slider', 'snazzy-slider' ); ?></h2>
	<div id="snzysldr-spinner" class="spinner"></div>

	<div id="snzysldr_errors" role="alert" aria-live="assertive"></div>

	<div id="poststuff">

		<div id="post-body" class="metabox-holder columns-2">

			<div id="post-body-content">

				<div class="postbox snysldr_admin_sidebar" role="group" aria-label="sidebar">
					<h3><?php esc_attr_e( 'Thank you for using Snazzy Slider!', 'snazzy-slider' ); ?></h3>
					<div class="inside">
						<p><?php esc_attr_e( "To get started, type in a name for your slider and click the add button. Then, click the edit button to customize the slider you have just created. If you have questions or feedback, or would like to watch a tutorial video, click help.", 'snazzy-slider' ); ?></p>
						<a href="#" id="snzysldr_admin_help"><?php esc_attr_e('Help', 'snazzy-slider'); ?></a>
						<p class="snzysldr_jcd">&copy; <?php echo date("Y"); ?> <a href="#">Josh Cummings Design</a>.</p>
					</div>
				</div>

				<form id="snzysldr_admin_form" method="post" action="">

					<div class="meta-box-sortables ui-sortable">
						<div class="postbox" role="group" aria-label="add sliders">
							<h3><?php esc_attr_e( 'Add Sliders', 'snazzy-slider' ); ?></h3>
							<div class="snzysldr_inside inside">
								<div class="snzysldr_add_group">
									<input id="snyzldr_add_input" type="text" name="snsysldr_name" aria-label="slider name">
									<button id="snyzldr_add_btn" class="snzysdlr_btn button-secondary" aria-label="add slider"><?php esc_attr_e( 'Add', 'snazzy-slider' ); ?></button>
								</div>
							</div>
						</div>
					</div>

					<div class="meta-box-sortables ui-sortable">
						<div class="postbox" role="group" aria-label="edit sliders" aria-live="assertive">
							<h3><?php esc_attr_e( 'Edit Sliders', 'snazzy-slider' ); ?></h3>
							<div id="snzysldr_admin_fields" class="snzysldr_inside inside">

								<?php $sliders = array_keys( $options['sliders'] ); ?>

								<?php foreach ( $sliders as $slider ) : ?>

									<?php $slider_name = str_replace( '_', ' ', $slider ); ?>

									<div class="snzysldr_input_group">
										<input class="snzysldr_edit_input" type="text" value="<?php echo esc_attr( $slider_name ); ?>" readonly>
										<button class="snyzldr_edit_btn snzysdlr_btn button-secondary"><?php esc_attr_e( 'Edit', 'snazzy-slider' ); ?></button>
										<div class="snzydlr_delete_group">
											<button class="snyzldr_delete_btn snzysdlr_btn button-secondary" aria-haspopup="true"><?php esc_attr_e( 'Delete', 'snazzy-slider' ); ?></button>
											<div class="snzysldr_confirm_delete">
												<p><?php esc_attr_e( 'Are you sure you want to delete this slider?', 'snazzy-slider' ); ?></p>
												<button class="snyzldr_confirm_btn snzysdlr_btn button-secondary"><?php esc_attr_e( 'Delete', 'snazzy-slider' ); ?></button>
												<button class="snyzldr_keep_btn snzysdlr_btn button-secondary"><?php esc_attr_e( 'Keep', 'snazzy-slider' ); ?></button>
											</div>
										</div>
									</div>

								<?php endforeach; ?>

							</div>
						</div>
					</div>

				</form>

			</div>
		</div>

		<br class="clear">
	</div>

</div>
