$(document).ready(function() {

	var openOptions = {
		"direction" : "up",
		"mode" : "show"
	};

	var closeOptions = {
		"direction" : "down",
		"mode" : "hide"
	};

	$('.add-event').click(function() {
		var defaultHeight = 50; // This is $add-event-height in scss

		if($(this).hasClass('open')) {
			var sidebarHeight = $(this).parent().innerHeight();
			$('.add-event-form').addClass('hidden');
			var formHeight = $('.add-event-form').innerHeight();
			$('#event-list').innerHeight(sidebarHeight + (formHeight - $(this).innerHeight()));
			$(this).css('width', '100%');
			$(this).css('bottom', '0');
			$(this).css('position', 'fixed');
			$(this).removeClass('open');
		} else {
			var sidebarHeight = $(this).parent().innerHeight();
			$('.add-event-form').removeClass('hidden');
			var formHeight = $('.add-event-form').innerHeight();
			$('#event-list').innerHeight(sidebarHeight - (formHeight + $(this).innerHeight()));
			$(this).css('width', '100%');
			$(this).css('bottom', '');
			$(this).css('position', 'relative');
			$(this).addClass('open');
		}

	});

	$('.brand').click(function(){
		$(this).css('background-image', 'url(http://placekitten.com/g/455/75)');
		$(this).css('color', '#FF69B4');
	});

	$('#add-event-form').submit(function (e) {
		e.preventDefault();

		var formData = $('#add-event-form').serializeArray();
		lookupLocation(formData[2].value, function(locationData) {
			var json = {
				name: formData[0].value,
				description: formData[7].value,
				date: formData[1].value,
				price: formData[6].value,
				url: formData[4].value,
				host: formData[3].value,
				capacity: formData[5].value,
				location: locationData
			}

			$.post("/events/create", json, function(data) {
				clearForm();
				$thing = $('.add-event');

				var sidebarHeight = $thing.parent().innerHeight();
				var formHeight = $('.add-event-form').innerHeight();
				$('#event-list').innerHeight(sidebarHeight + (formHeight - $thing.innerHeight()));
				$('.add-event-form').addClass('hidden');
				$thing.css('width', '100%');
				$thing.css('bottom', '0');
				$thing.css('position', 'fixed');
				$thing.removeClass('open');

				location.reload();
			});
		});
	});
});

function clearForm() {
	$form = $('#add-event-form');

	$('input[name=eventName]').val("");
	$('input[name=date]').val("");
	$('input[name=location]').val("");
	$('input[name=email]').val("");
	$('input[name=website]').val("");
	$('input[name=capacity]').val("");
	$('input[name=price]').val("");
	$('textarea[name=description]').val("");
}