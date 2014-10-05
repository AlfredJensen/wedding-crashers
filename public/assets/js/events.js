function getAllEvents(callback) {
	$.get("/events/search/", function(data) {
		callback(data);
	});
}

function getEventById(id, callback) {
	var url = "/events/search/"+id;
	$.get(url, function(data) {
		callback(data);
	});
}

function getEventsByLatAndLong(lat, lng, callback) {
	var url = "/events/search/" + lat + "/" + lng;
	$.get(url, function(data) {
		callback(data);
	});
}