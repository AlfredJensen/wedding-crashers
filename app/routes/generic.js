// General routes baby!
module.exports = function(app) {

	// Wildcard route for displaying the homepage.
	// KEEP THIS AT THE BOTTOM MOFOS
	app.get('*', function(req, res) {
		res.sendFile('/public/views/index.html');
	});
}