function getAllEvents(callback) {
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

function getEventsByLatAndLong(lat, long, callback) {
	var url = "/events/search/" + lat + "/" + "long";
	$.get(url, function(events) {
		callback(events);
	});
}