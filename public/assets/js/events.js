function getAllEvents(callback) {
	$.get("/events/search/", function(data) {
		callback(events);
	});
}

function getEventById(id, callback) {
	var url = "/events/search/"+id;
	$.get(url, function(event) {
		callback(event);
	});
}

function getEventsByLatAndLong(lat, long, callback) {
	var url = "/events/search/" + lat + "/" + "long";
	$.get(url, function(events) {
		callback(event);
	});
}