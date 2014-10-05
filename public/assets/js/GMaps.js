$(function() {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			geocoder = new google.maps.Geocoder();
			canvas = document.getElementById('map-canvas')
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			var latlng = new google.maps.LatLng(lat, lon);

			map = displayMap(canvas, 15, latlng);
			addMarker(map, latlng, "blue-dot.png");

			getEventsByLatAndLong(lat, lon, function(events) {
				events.forEach(function(en, index) {
					$('.event-wrapper').append('<div id=content_' + index + ' class=event-content><div id=logistics_' + index + ' class=event-logistics></div></div>')
					$('#logistics_' + index).append('<p id=name_' + index + ' class=\"event-name\">' + en.name + '</p>')
					$('#logistics_' + index).append('<div class="event-address"><p>' + en.location[0].street + ', ' + en.location[0].city + ', ' + en.location[0].state + ', ' + en.location[0].zip + '</p></div>')
					$('#content_' + index).append('<p class=\"event-description\">' + en.description + '</p>')
					$('#content_' + index).append('<p class=\"event-time\">' + new Date(en.date).toDateString() + '</p>')
					$('#content_' + index).append('<p class=\"event-price\">' + pricer(en.price) + '</p>')
					$('#content_' + index).append('<p class=\"event-distance\">' + distanceFormula(lat, en.location[0].latitude, lon, en.location[0].longitude) + ' miles away</p>')

					addMarker(map, new google.maps.LatLng(en.location[0].latitude, en.location[0].longitude));
				});
			});
		});
	};
});

function pricer(price) {
	if(price == 0) {
		return "Free";
	} else {
		return "$" + price;
	}
}

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

function distanceFormula(lat1, lat2, lon1, lon2) {
	var R = 6371; // km 
	var x1 = lat2-lat1;
	var dLat = x1.toRad();  
	var x2 = lon2-lon1;
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
	                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
	                Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return Math.round((d * .621371) * 100) / 100;
}

function displayMap(element, zoom, position) {
	var mapOptions = {
		zoom: zoom,
		center: position
	}
	return new google.maps.Map(element, mapOptions);
}

function addMarker(map, position, color) {
	if(color) {
		var marker = new google.maps.Marker({
			position: position,
			map: map,
			icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
		});	
	} else {
		var marker = new google.maps.Marker({
			position: position,
			map: map
		});
	}
}

function lookupLocation(location, callback) {
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDyu6x8R7Tb2uvTehyPKPC9yTiWkMIM1VQ";
	$.get(url, function(json) {

		var loc = {
			zip: searchAddressJSON(json, "postal_code"),
			city: searchAddressJSON(json, "locality"),
			state: searchAddressJSON(json, "administrative_area_level_1"),
			street: searchAddressJSON(json, "street_number") + " " +
					searchAddressJSON(json, "route"),
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