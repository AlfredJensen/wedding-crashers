$(function() {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			geocoder = new google.maps.Geocoder();
			canvas = document.getElementById('map-canvas')
			var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			map = displayMap(canvas, 15, latlng);
			marker = addMarker(map, latlng);
		})
	}
})

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
		title: 'TESTING'
	});

	google.maps.event.addListener(marker, 'click', function() { console.log("Clicked") });

	var infowindow =  new google.maps.InfoWindow({
		content: 'Hello World!',
		map: map
	});

	google.maps.event.addListener(marker, 'mouseover', function() {
		infowindow.open(map, this);
	});

	google.maps.event.addListener(marker, 'mouseout', function() {
		infowindow.close();
	});

	return marker;
}