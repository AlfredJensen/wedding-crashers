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
			$('.add-event-form').addClass('hidden');
			$(this).innerHeight(defaultHeight);
			$(this).removeClass('open');
		} 
		else {
			$(this).effect("slide", openOptions, function() {
				$(this).css('padding-left', '0px');
				$span = $(this).find('span');
				$span.css('padding-left', '30px');
				$span.find('i').remove();
				$('.add-event-form').removeClass('hidden');
				$(this).addClass('open');
				$(this).innerHeight($(this).innerHeight() + $('.add-event-form').innerHeight());

				console.log($(this).innerHeight());
			});
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