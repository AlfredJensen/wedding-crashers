$(function() {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			geocoder = new google.maps.Geocoder();
			canvas = document.getElementById('map-canvas')
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			var latlng = new google.maps.LatLng(lat, lon);

			map = displayMap(canvas, 15, latlng);
			addMarker(map, latlng);

			getEventsByLatAndLong(lat, lon, function(events) {
				events.forEach(function(en, index) {
					$('.event-wrapper').append('<div id=content_' + index + ' class=event-content><div id=logistics_' + index + ' class=event-logistics></div></div>')
					$('#logistics_' + index).append('<p id=name_' + index + ' class=\"event-name\">' + en.name + '</p>')
					$('#logistics_' + index).append('<div class="event-address"><p>' + en.location[0].street + ', ' + en.location[0].city + ', ' + en.location[0].state + ', ' + en.location[0].zip + '</p></div>')
					$('#content_' + index).append('<p class=\"event-description\">' + en.description + '</p>')
					$('#content_' + index).append('<p class=\"event-time\">' + en.date + '</p>')
					$('#content_' + index).append('<p class=\"event-price\">' + en.price + '</p>')
					$('#content_' + index).append('<p class=\"event-distance\">' + distanceFormula(lat, en.location[0].latitude, lon, en.location[0].longitude) + ' miles away</p>')

					addMarker(map, new google.maps.LatLng(en.location[0].latitude, en.location[0].longitude));
				});
			});
		});
	};
});

function distanceFormula(lat1, lat2, lon1, lon2){
	var R = 3963;
	var φ1 = lat1.toRadians();
	var φ2 = lat2.toRadians();
	var Δφ = (lat2-lat1).toRadians();
	var Δλ = (lon2-lon1).toRadians();

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
	        Math.cos(φ1) * Math.cos(φ2) *
	        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	return d;
}

function displayMap(element, zoom, position) {
	var mapOptions = {
		zoom: zoom,
		center: position
	}
	return new google.maps.Map(element, mapOptions);
}

function addMarker(map, position) {
	var marker = new google.maps.Marker({
		position: position,
		map: map,
	});
}

function lookupLocation(location, callback) {
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDyu6x8R7Tb2uvTehyPKPC9yTiWkMIM1VQ";
	$.get(url, function(json) {

		var loc = {
			zip: searchAddressJSON(json, "postal_code"),
			city: searchAddressJSON(json, "locality"),
			state: searchAddressJSON(json, "administrative_area_level_1"),
			latitude: json["results"][0]["geometry"]["location"]["lat"],
			longitude: json["results"][0]["geometry"]["location"]["lng"]
		}
		callback(loc);
	});
}

function searchAddressJSON(json, type) {
	var rtn;
	json["results"][0]["address_components"].forEach(function(obj) {
		obj["types"].forEach(function(ty) {
			if(ty == type) {
				rtn = obj["long_name"];
			}
		})
	});
	return rtn;
}