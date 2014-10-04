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
});