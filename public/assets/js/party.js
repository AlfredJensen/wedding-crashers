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
		$(this).effect("slide", openOptions, function() {
			$('.add-event-form').removeClass('hidden');
		});
	});

	$('#add-event-form').submit(function (e) {
		event.preventDefault();
		console.log($('#add-event-form').serialize());	
	});
});