function initMap() {
    var map = L.map('map').setView([26.240158, -80.160956], 10);
    //map.flyTo(new L.LatLng(lt, lg));
    var marker;
    for (i = 0; i < locations.length; i++) {
        var lt = locations[i].lt;
        var lg = locations[i].lg;
        console.log(locations[i].lt)
        var marker = L.marker([lt, lg])
            .bindPopup(locations[i].info)
            .addTo(map);

        //L.featureGroup([marker]).on('click', function() { window.open(gMapLink) }).addTo(map);
    } L.esri.basemapLayer('Streets').addTo(map);
}

function initMap() {
    L.mapbox.accessToken = 'pk.eyJ1IjoibXdoYWxsZXkiLCJhIjoiY2pyd2pvcms1MDFzODN5bW5jcjEwYWZtdCJ9.34VZbZizZKHc-xqCOBa6Nw';
    var map = L.mapbox.map('map').setView([26.240158, -80.160956], 10);
    //map.flyTo(new L.LatLng(lt, lg));
    L.mapbox.styleLayer('mapbox://styles/mwhalley/cjrwjqsnv01yj1fk1bqjn8f10').addTo(map);

    var marker;
    for (i = 0; i < locations.length; i++) {
        var lt = locations[i].lt;
        var lg = locations[i].lg;
        console.log(locations[i].lt)
        var marker = L.marker([lt, lg])
            .bindPopup(locations[i].info)
            .addTo(map);

        //L.featureGroup([marker]).on('click', function() { window.open(gMapLink) }).addTo(map);
    }
}

/*
function initMap() {

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: new google.maps.LatLng(26.240158, -80.160956),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow({});

	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i].lat, locations[i].long),
			map: map,
			animation: google.maps.Animation.DROP,
			});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i].info);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
			google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});
	}
*/