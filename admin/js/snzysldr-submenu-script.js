/*****************************************
* Submenu script
/****************************************/

jQuery(document).ready(function($) {

	'use strict';

	// Get current slider
	var snzysldr_current = snzysldr_obj.options.current;

	// Turn the images object into an array
	var snzysldr_img_array = $.map(snzysldr_obj.options.sliders[snzysldr_current].images, function(value, index) {
		return [value];
	});

	// Get the length of the array for deleting without refreshing
	var snzysldr_num_items = snzysldr_img_array.length;

	// Alert flags
	var snzysldr_change_flag = 0;
	var snzysldr_save_flag = 0;

	// Color picker variables
	var snzysldr_clicked = false;
	var snzysldr_pickers = {
		'#snzysldr_controls_color': '#snzysldr_cntrl_color_save',
		'#snzysldr_sel_color': '#snzysldr_sel_color_save',
		'#snzysldr_fade_color': '#snzysldr_fade_color_save',
		'#snzysldr_text_color': '#snzysldr_text_color_save',
		'#snzysldr_text_bg': '#snzysldr_text_bg_save',
		'#snzysldr_link_color': '#snzysldr_link_save',
		'#snzysldr_link_hover': '#snzysldr_link_hover_save'
	};

	// Stores the value of the clicked upload button
	var $uploadButton;

	// Cache the DOM
	var $snzysldr_overlay = $('.snzysldr_overlay');
	var $snzysldr_duration = $('#snzysldr_duration_module');
	var $snzysldr_fade_color = $('#snzysldr_fade_color_module');
	var $snzysldr_text_settings = $('#snzysldr_text_settings');
	var $snzysldr_text_enbale = $('input:checkbox[name="snzysldr_general_options[text_enable]"]');
	var $snzysldr_spinner = $('#snzysldr-spinner');
	var $snzysldr_loader = $('.snzysldr-loader-overlay');
	var $snzysldr_picker = $('.snzysldr_picker');
	var $snzysldr_tool = $('.snzysldr_img-tool');
	var $snzysldrFocusItems = $(".snzysldr_img-tools li, .snzysldr_close_bg, .snzysldr_text_add");
	var $snzysldr_control_modules = $('.snzysldr-control-modules');
	var $snzysldr_submit = $('#snzysldr_submit_btn');
	var $snzysldr_errors = $('#snzysldr_errors');

	// Notice generator
	function snzysldr_notice(type, message) {
		var output = '<div class="' + type + ' notice is-dismissible"> <p><strong>' + message + '</strong></p> <button type="button" class="notice-dismiss"><span class="screen-reader-text">' + snzysldr_obj.dismiss + '</span></button> </div>';
		$snzysldr_errors.append(output);
	}

	// Show warning if text is enabled and no text content is selected
	function snzysldr_text_message() {
		var text_count = 0;
		for (var i = 0; i <= snzysldr_num_items; i++) {
			if ('-1' === $('#snzysldr_text_content' + i + ' option:selected').val()){
				text_count++;
			}
		}
		if (text_count > 0 && document.getElementById('snzysldr_text_enable').checked) {
			snzysldr_notice('notice-warning', snzysldr_obj.text);
		}
	}

	// Show media upload on button click
	function snzysldrUploadMedia($button) {
		$button.click(function() {
			$uploadButton = $(this);
			window.scrollTo(0, 0);
			$snzysldr_spinner.addClass('is-active');
			$snzysldr_overlay.not('.snzysldr_color-overlay').hide();
			var image = wp.media({
					title: 'Upload',
					multiple: false
			}).open()
			.on('select', function() {
				var uploaded_image = image.state().get('selection').first();
				var image_url = uploaded_image.toJSON().url;
				var image_id = uploaded_image.toJSON().id;
				var image_alt = uploaded_image.toJSON().alt;
				// Because selector is deprecated
				var selector = (typeof($uploadButton.attr('id')) !== 'undefined' || $uploadButton.attr('id') !== null) ? '#' + $uploadButton.attr('id') :  '.' + $uploadButton.attr('class');
				console.log(selector);
				// Ajax request to save image ID
				var data = {
						action: 'snzysldr_update_image',
						security: snzysldr_obj.nonce,
						img_btn: selector,
						img_id: image_id,
						img_alt: image_alt
				};
				$.post(ajaxurl, data)
					.done(function(response) {
						$snzysldr_spinner.removeClass('is-active');
						$snzysldr_errors.html('');
						snzysldr_text_message();
						if ('updated' === response) {
							$uploadButton.parent().parent().css('background-image', "url('" + image_url + "')");
							$snzysldr_spinner.removeClass('is-active');
							$uploadButton.parent().parent().focus();
						} else {
							snzysldr_notice('error', snzysldr_obj.invalid);
						}
					})
					.fail(function() {
						$snzysldr_spinner.removeClass('is-active');
						$snzysldr_errors.html('');
						snzysldr_notice('error', snzysldr_obj.network);
				});
			});
		});
	}

	// Delete image on button click
	function snzysldrDeleteImage($button) {
		$button.click(function() {
			$snzysldr_spinner.addClass('is-active');
			// Because selector is deprecated
			var selector = (typeof($(this).attr('id')) !== 'undefined' || $(this).attr('id') !== null) ? '#' + $(this).attr('id') :  '.' + $(this).attr('class');
			// Ajax request to delete the image
			var data = {
				action: 'snzysldr_delete_image',
				security: snzysldr_obj.nonce,
				del_btn: selector
			};
			var $thisButton = $(this);
			$.post(ajaxurl, data)
				.done(function(response) {
					$snzysldr_spinner.removeClass('is-active');
					$snzysldr_errors.html('');
					if ('updated' === response) {
						$thisButton.parent().hide();
						if (6 === snzysldr_num_items) {
							$('.snzysldr-img-modules').append('<div class="snzysldr_img_add" role="button" aria-label="add image" tabindex="0"></div>');
						}
						snzysldr_num_items--;
						$snzysldr_spinner.removeClass('is-active');
						$('.snzysldr_img_add').focus();
						$thisButton.parent().attr('aria-hidden', 'true');
					} else {
						snzysldr_notice('error', snzysldr_obj.invalid);
					}
				})
				.fail(function() {
					$snzysldr_spinner.removeClass('is-active');
					$snzysldr_errors.html('');
					snzysldr_notice('error', snzysldr_obj.network);
			});
		});
	}

	// Save image colors
	function snzysldrSaveColor($button) {
		$button.click(function() {
			var $thisButton = $(this);
			var $field = $thisButton.parent().parent().find('input[id^="snzysldr_color_picker"]');
			var imgColorNum = $(this).attr('id').match(/[0-5]/);
			var imgColor = 'img_color' + imgColorNum;
			var regex = /^\#[0-9a-f]{6}$/i;
			if ($field.val().match(regex)) {
				$snzysldr_spinner.addClass('is-active');
				// Because selector is deprecated
				var selector = (typeof($(this).attr('id')) !== 'undefined' || $(this).attr('id') !== null) ? '#' + $(this).attr('id') :  '.' + $(this).attr('class');
				var data = {
					action: 'snzysldr_save_color',
					security: snzysldr_obj.nonce,
					color: $field.val(),
					selector: selector
				};
				$.post(ajaxurl, data)
					.done(function(response) {
						$snzysldr_spinner.removeClass('is-active');
						if ('updated' === response) {
							console.log($thisButton);
							$thisButton.parent().parent().find('.snzysldr_overlay').hide();
							$thisButton.siblings().show();
							$thisButton.hide();
							$thisButton.parent().parent().css('background-color', $field.val());
							// focus back on toolbar for accessibility
							$thisButton.parent().parent().focus();
						} else {
							$snzysldr_errors.html('');
							snzysldr_notice('error', snzysldr_obj.color);
						}
					})
					.fail(function() {
						$snzysldr_spinner.removeClass('is-active');
						$snzysldr_errors.html('');
						snzysldr_notice('error', snzysldr_obj.network);
				});
			} else {
				$field.effect('shake');
			}
		});
	}

	// Save image settings
	function snzysldrImageSettings($input, action) {
		$input.change(function() {
			$snzysldr_spinner.addClass('is-active');
			// Because selector is deprecated
			var selector = (typeof($(this).attr('id')) !== 'undefined' || $(this).attr('id') !== null) ? '#' + $(this).attr('id') :  '.' + $(this).attr('class');
			var value = $(this).val();
			var data = {
				action: action,
				security: snzysldr_obj.nonce,
				value: value,
				selector: selector
			};
			$.post(ajaxurl, data)
				.done(function(response) {
					$snzysldr_spinner.removeClass('is-active');
					if ('updated' === response) {
						$snzysldr_spinner.removeClass('is-active');
					} else {
						$snzysldr_errors.html('');
						snzysldr_notice('error', snzysldr_obj.invalid);
					}
				})
				.fail(function() {
					$snzysldr_spinner.removeClass('is-active');
					$snzysldr_errors.html('');
					snzysldr_notice('error', snzysldr_obj.network);
			});
		});
	}

	// Create a color picker
	function snzysldr_iris($input, $swatch, hidden) {
		$input.iris({
			width: 120,
			hide: hidden,
			change: function(event, ui) {
				$swatch.css( 'background-color', ui.color.toString());
				if ($input.parent().parent().parent().is('.snzysldr-control-modules')) {
					snzysldr_change_flag = 1;
				}
			}
		});
	}

	// Toggle form color pickers
	function snzysldr_picker_toggle(input){
		return function(){
			// regex
			var regex = /^\#[0-9a-f]{6}$/i;
			// show
			if (!$(input).hasClass('snzysldr-picker-is-open')) {
				$snzysldr_picker.iris('hide');
				$(input).iris('show');
				$(input).addClass('snzysldr-picker-is-open');
			// hide
			} else if (regex.test($(input).val())) {
				$(input).iris('hide');
				$(input).removeClass('snzysldr-picker-is-open');
			} else {
				$(input).effect('shake');
			}
		};
	}

	// Dismiss notice
	$(document).on('click', '.notice-dismiss', function(){
			$(this).parent().animate({opacity: '0'}, 120);
			$(this).parent().slideUp(120);
	});

	// Update text warning on content select
	$("select[id^='snzysldr_text_content']").change(function(){
		$snzysldr_errors.html('');
		snzysldr_text_message();
	});

	// Show media upload on plus button click
	$(document).on('click', '.snzysldr_img_add', function() {
		if (snzysldr_change_flag > 0) {
			var changes = confirm(snzysldr_obj.changes);
			if (false === changes) {
				return false;
			}
		}
		$snzysldr_loader.show();
		$snzysldr_overlay.not('.snzysldr_color-overlay').hide();
		var image = wp.media({
				title: 'Upload',
				multiple: false
		}).open()
		.on('select', function() {
			snzysldr_change_flag = 0;
			var uploaded_image = image.state().get('selection').first();
			var image_url = uploaded_image.toJSON().url;
			var image_id = uploaded_image.toJSON().id;
			var image_alt = uploaded_image.toJSON().alt;
			// Ajax request to save image ID
			var data = {
					action: 'snzysldr_add_image',
					security: snzysldr_obj.nonce,
					img_id: image_id,
					img_alt: image_alt
			};
			$.post(ajaxurl, data)
				.done(function(response) {
					$snzysldr_spinner.removeClass('is-active');
					if ('updated' === response) {
						location.reload();
					} else {
						$snzysldr_errors.html('');
						$snzysldr_loader.hide();
						snzysldr_notice('error', snzysldr_obj.invalid);
					}
				})
				.fail(function() {
					$snzysldr_loader.hide();
					$snzysldr_errors.html('');
					snzysldr_notice('error', snzysldr_obj.network);
			});
		});
	});

	// Sortable Images
	$('.snzysldr-img-modules').sortable({
		opacity: 0.75,
		items: '.snzysldr_img',
		update: function() {
			// Ajax request to save sort order
			$snzysldr_spinner.addClass('is-active');
			var order = $(this).sortable('serialize') + '&action=snzysldr_update_order&security=' + snzysldr_obj.nonce;
			$.post(ajaxurl, order)
			  .done(function(response) {
					$snzysldr_spinner.removeClass('is-active');
				})
				.fail(function() {
					$snzysldr_spinner.removeClass('is-active');
					snzysldr_notice('error', snzysldr_obj.network);
			});
		}
	});

	// Upload image
	snzysldrUploadMedia($("li[id^='snzysldr_upload']"));
	// Delete image
	snzysldrDeleteImage($("div[id^='snzysldr_close']"));
	// Save img bg colors
	snzysldrSaveColor($("li[id^='snzysldr_color_save']"));
	// Img color pickers
	snzysldr_iris($("input[id^='snzysldr_color_picker']"), $("div[id^='snzysldr_color_swatch']"), false);

	// Show text overlay
	$('.snzysldr_img-text').click(function(){
		var $instance = $(this).parent().parent().find('.snzysldr_text-overlay');
		var $color_overlay = $('.snzysldr_color-overlay');
		$snzysldr_overlay.not($instance).not($color_overlay).hide();
		$instance.toggle();
		if (!$(this).attr('aria-selected')) {
			$snzysldr_tool.removeAttr('aria-selected');
			$(this).attr('aria-selected', 'true');
			$instance.find('select').focus();
		} else {
			$snzysldr_tool.removeAttr('aria-selected');
		}
	});
	// Show/hide size overlay
	$('.snzysldr_size').click(function(){
		var $instance = $(this).parent().parent().find('.snzysldr_size-overlay');
		var $color_overlay = $('.snzysldr_color-overlay');
		$snzysldr_overlay.not($instance).not($color_overlay).hide();
		$instance.toggle();
		if (!$(this).attr('aria-selected')) {
			$snzysldr_tool.removeAttr('aria-selected');
			$(this).attr('aria-selected', 'true');
			$instance.find('input:checked').focus();
		} else {
			$snzysldr_tool.removeAttr('aria-selected');
		}
	});
	// Show/hide color overlay
	$('.snzysldr_color').click(function(){
		var $this_overlay = $(this).parent().parent().find('.snzysldr_color-overlay');
		var $this_other_overlays = $(this).parent().parent().find('.snzysldr_overlay');
		var $this_buttons = $(this).parent().children();
		var $this_color_save = $(this).parent().find('.snzysldr_color_save');
		var $this_color_input = $(this).parent().parent().find('.snzysldr_color_picker');
		$this_other_overlays.hide();
		$this_buttons.hide();
		$snzysldr_tool.removeAttr('aria-selected');
		$this_overlay.show();
		$this_color_save.show();
		$this_color_input.focus();
	});

	// Save text content settings
	snzysldrImageSettings($('.snzysldr_text-overlay select'), 'snzysldr_save_text_content');
	// Save size settings
	snzysldrImageSettings($('.snzysldr_size-overlay input[type="radio"]'), 'snzysldr_save_sizes');

	// Form color pickers
	$.each(snzysldr_pickers, function( input, swatch ) {
		snzysldr_iris($(input), $(swatch), true);
		$(swatch).mousedown(snzysldr_picker_toggle(input));
	});

	// Hide pickers on input focus
	$('input, select').focus(function(){
		$snzysldr_picker.iris('hide');
		$snzysldr_picker.removeClass('snzysldr-picker-is-open');
		if ($(this).hasClass('snzysldr_picker')) {
			$(this).iris('show');
			$(this).addClass('snzysldr-picker-is-open');
		}
	});

	// Prevent picker click from triggering link
	$('.iris-square-value').click(function(e) {
		e.preventDefault();
	});

	// Show/hide autoplay duration
	$('input:radio[name="snzysldr_general_options[autoplay]"]').change(function() {
		if (this.value === 'off') {
			$snzysldr_duration.hide();
		} else if (this.value === 'on') {
			$snzysldr_duration.show();
			$snzysldr_duration.find('#snzysldr_duration').focus();
		}
	});

	// Show/hide fade color
	$('input:radio[name="snzysldr_general_options[fx]"]').change(function() {
		if (this.value === 'slide') {
			$snzysldr_fade_color.hide();
		} else if (this.value === 'fade') {
			$snzysldr_fade_color.show();
			$snzysldr_fade_color.find('#snzysldr_fade_color').focus();
		}
	});

	// Show/hide text settings
	$snzysldr_text_enbale.change(function() {
		$snzysldr_errors.html('');
		snzysldr_text_message();
		if (this.checked === false) {
			$snzysldr_text_settings.hide();
			$snzysldr_control_modules.append('<div class="snzysldr_text_add" role="button" aria-label="enable text" tabindex="0"></div>');
			$('.snzysldr_text_add').focus();
		} else if (this.checked === true) {
			$snzysldr_text_settings.show();
			$('.snzysldr_text_add').remove();
		}
	});

	// Text settings enable button
	$(document).on('click', '.snzysldr_text_add', function() {
		$snzysldr_text_enbale.trigger('click');
		$('.snzysldr_close_bg').focus();
	});

	// On load
	$(function () {
		if (snzysldr_obj.options.sliders[snzysldr_current].settings.autoplay === 'off') {
			$snzysldr_duration.hide();
		} else if (snzysldr_obj.options.sliders[snzysldr_current].settings.autoplay === 'on') {
			$snzysldr_duration.show();
		}
		// Show/hide fade color
		if (snzysldr_obj.options.sliders[snzysldr_current].settings.fx === 'slide') {
			$snzysldr_fade_color.hide();
		} else if (snzysldr_obj.options.sliders[snzysldr_current].settings.fx === 'fade') {
			$snzysldr_fade_color.show();
		}
		// Show/hide text settings
		if (snzysldr_obj.options.sliders[snzysldr_current].settings.text_enable === 'off') {
			$snzysldr_text_settings.hide();
		} else if (snzysldr_obj.options.sliders[snzysldr_current].settings.text_enable === 'on') {
			$snzysldr_text_settings.show();
		}
		snzysldr_text_message();
		// Hide color picker controls from screen readers
		$('.ui-slider-handle').attr('aria-hidden', 'true');
		$('.iris-square-value').attr('aria-hidden', 'true');
		// Prevent FOUC
		$('.snzysldr_fouc').show();
	});

	// On submit button click
	$snzysldr_submit.click(function() {
		$snzysldr_overlay.hide();
		$snzysldr_tool.removeAttr('aria-selected');
		$snzysldr_errors.html('');
		window.scrollTo(0, 0);
		$snzysldr_loader.show();
		snzysldr_change_flag = 0;
		snzysldr_save_flag = 1;
		var data = $('form').serialize() + '&action=snzysldr_form_submit&security=' + snzysldr_obj.nonce;
		$.post(ajaxurl, data)
			.done(function(response) {
				$snzysldr_loader.hide();
				snzysldr_text_message();
				if ('updated' === response) {
					if (snzysldr_num_items < 1) {
						snzysldr_notice('error', snzysldr_obj.no_images);
					} else {
						snzysldr_notice('updated', snzysldr_obj.saved);
					}
				} else {
					// Loop through errors array and throw errors
					var errors = $.parseJSON(response);
					$.each( errors, function( i, val ) {
  					snzysldr_notice('error', snzysldr_obj[val]);
					});
				}
			})
			.fail(function() {
				$snzysldr_loader.hide();
				snzysldr_notice('error', snzysldr_obj.network);
		});
	});

	// Stop spinners on media close button
	$(document).on('click', '.media-modal-close', function() {
		$snzysldr_loader.hide();
		$snzysldr_spinner.removeClass('is-active');
	});

	// Stop spinners when pressing escape key to close media browser
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$snzysldr_loader.hide();
			$snzysldr_spinner.removeClass('is-active');
		}
	});

	// Warn user if they try to navigate away with unsaved changes
	$('.snzysldr-control-modules input, .snzysldr-control-modules select').change(function(){
		snzysldr_change_flag = 1;
	});
	window.onbeforeunload = function() {
		if ( snzysldr_save_flag === 0 && snzysldr_change_flag > 0 ) {
			return snzysldr_obj.alert;
		}
	};

	//Make the enter key trigger click for accessibility
	$($snzysldrFocusItems).on('keydown', function(event){
		if(event.keyCode==13) {
			 $(this).click();
		}
	});
	$(document).on('keydown', '.snzysldr_text_add', function(event){
		if(event.keyCode==13) {
			 $('.snzysldr_text_add').click();
		}
	});
	$(document).on('keydown', '.snzysldr_img_add', function(event){
		if(event.keyCode==13) {
			 $('.snzysldr_img_add').click();
		}
	});

	// Make enter key submit image color
	$('.snzysldr_color_picker').on('keydown', function(event){
		if(event.keyCode==13) {
			event.preventDefault();
			$(this).parent().parent().parent().find('.snzysldr_color_save').trigger('click');
		}
	});

});
