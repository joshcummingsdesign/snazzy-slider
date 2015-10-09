/*****************************************
* Admin script
/****************************************/

jQuery(document).ready(function($) {

	'use strict';

	// Cache the DOM
	var $snzysldr_spinner = $('#snzysldr-spinner');
	var $snyzldr_add_input = $('#snyzldr_add_input');
	var $snzysldr_add_btn = $('#snyzldr_add_btn');

	// Notice generator
	function snzysldr_notice(type, message) {
		var output = '<div class="' + type + ' notice is-dismissible"> <p><strong>' + message + '</strong></p> <button type="button" class="notice-dismiss"><span class="screen-reader-text">' + snzysldr_obj.dismiss + '</span></button> </div>';
		document.getElementById('snzysldr_errors').innerHTML = output;
	}

	// Options generator
	function snzysldr_print_slider_options(value) {
		var output = '<div class="snzysldr_input_group"> <input class="snzysldr_edit_input" type="text" value="' + value + '" readonly> <button class="snyzldr_edit_btn snzysdlr_btn button-secondary">' + snzysldr_obj.edit + '</button> <div class="snzydlr_delete_group"> <button class="snyzldr_delete_btn snzysdlr_btn button-secondary" aria-haspopup="true">' + snzysldr_obj.delete + '</button> <div class="snzysldr_confirm_delete"> <p>' + snzysldr_obj.confirm + '</p> <button class="snyzldr_confirm_btn snzysdlr_btn button-secondary">' + snzysldr_obj.delete + '</button> <button class="snyzldr_keep_btn snzysdlr_btn button-secondary">' + snzysldr_obj.keep + '</button> </div> </div> </div>';
		$('#snzysldr_admin_fields').append(output);
	}

	// Dismiss notice
	$(document).on('click', '.notice-dismiss', function(){
			$(this).parent().animate({opacity: '0'}, 120);
			$(this).parent().slideUp(120);
	});

	// Add slider
	$snzysldr_add_btn.click(function() {
		$snzysldr_spinner.addClass('is-active');
		$('.snzysldr_confirm_delete').css('visibility', 'hidden');
		var name = $snyzldr_add_input.val();
		name = $.trim(name.replace(/\s+/g, ' '));
		if (name !== '') {
			if (!name.match(/[^a-zA-Z0-9_ ]/)) {
				var data = {
					action: 'snzysldr_add_slider',
					security: snzysldr_obj.nonce,
					name: name
				};
				$.post(ajaxurl, data)
					.done(function(response) {
						$snzysldr_spinner.removeClass('is-active');
						if ('blank' !== response) {
							if ('specialchars' !== response) {
								if ('updated' === response) {
									$snyzldr_add_input.val('');
									snzysldr_print_slider_options(name);
									snzysldr_notice('updated', name + ' ' + snzysldr_obj.added);
								} else if ('same' === response) {
									snzysldr_notice('error', name + ' ' + snzysldr_obj.same);
								}
							} else {
								$snzysldr_spinner.removeClass('is-active');
								snzysldr_notice('error', snzysldr_obj.specialchars);
							}
						} else {
							snzysldr_notice('error', name + ' ' + snzysldr_obj.blank);
						}
					})
					.fail(function() {
						$snzysldr_spinner.removeClass('is-active');
						snzysldr_notice('error', snzysldr_obj.network);
				});
			} else {
				$snzysldr_spinner.removeClass('is-active');
				snzysldr_notice('error', snzysldr_obj.specialchars);
			}
		} else {
			$snzysldr_spinner.removeClass('is-active');
			snzysldr_notice('error', snzysldr_obj.blank);
		}
		return false;
	});

	// Show delete confirm
	$(document).on('click', '.snyzldr_delete_btn', function() {
		$('.snzysldr_confirm_delete').css('visibility', 'hidden');
		$(this).next().css('visibility', 'visible');
		$(this).next().find('.snyzldr_confirm_btn').focus();
		return false;
	});

	// Keep slider
	$(document).on('click', '.snyzldr_keep_btn', function(){
		$('.snzysldr_confirm_delete').css('visibility', 'hidden');
		$(this).parent().parent().parent().find('.snzysldr_edit_input').focus();
		return false;
	});

	// Delete slider
	$(document).on('click', '.snyzldr_confirm_btn', function() {
		$snzysldr_spinner.addClass('is-active');
		var $div = $(this).parent().parent().parent();
		var name = $div.find('.snzysldr_edit_input').val();
		var data = {
			action: 'snzysldr_delete_slider',
			security: snzysldr_obj.nonce,
			name: name
		};
		$.post(ajaxurl, data)
			.done(function(response) {
				$snzysldr_spinner.removeClass('is-active');
				if ('updated' === response) {
					$div.hide();
					snzysldr_notice('updated', name + ' ' + snzysldr_obj.deleted);
					$('#snyzldr_add_input').focus();
				} else {
					snzysldr_notice('error', snzysldr_obj.invalid);
				}
			})
			.fail(function() {
				$snzysldr_spinner.removeClass('is-active');
				snzysldr_notice('error', snzysldr_obj.network);
		});
		return false;
	});

	// Change and go to the current slider page on edit button click
	$(document).on('click', '.snyzldr_edit_btn', function() {
		$snzysldr_spinner.addClass('is-active');
		var name = $(this).prev().val();
		name = name.split(' ').join('_');
		var data = {
				action: 'snzysldr_update_current',
				security: snzysldr_obj.nonce,
				name: name
		};
		$.post(ajaxurl, data)
			.done(function(response) {
				if ('updated' === response) {
					window.location = '?page=snazzy-slider-edit';
				} else {
					$snzysldr_spinner.removeClass('is-active');
					snzysldr_notice('error', snzysldr_obj.invalid);
				}
			})
			.fail(function() {
				$snzysldr_spinner.removeClass('is-active');
				snzysldr_notice('error', snzysldr_obj.network);
		});
		return false;
	});

});
