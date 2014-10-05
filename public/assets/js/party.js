$(document).ready(function() {
	console.log("JS Ready");

	$('#host a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});

	$('#attend a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});

	$('#add-event-form').submit(function (e) {
		event.preventDefault();
		console.log($('#add-event-form').serialize());	
	});
});