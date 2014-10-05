function getAllEvents(callback) {
	dicks
	$.get("/events/search/", function(data) {
		callback(data);
	});
}

function getEventById(id, callback) {
	var url = "/events/search/"+id;
	$.get(url, function(ev) {
		callback(ev);
	});
}

function getEventsByLatAndLong(lat, lng, callback) {
	var url = "/events/search/" + lat + "/" + lng;
	$.get(url, function(data) {
		callback(data);
	});
}