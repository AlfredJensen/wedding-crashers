$(document).ready(function() {
	console.log("JS Ready");

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
				// Do things that need to be done after submission here
				console.log("this somehow works");
			});
		});
	});
});