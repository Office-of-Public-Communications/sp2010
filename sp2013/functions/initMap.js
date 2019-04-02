function initMap() {
    var map = L.map('mapid').setView([lt, lg], 15);
    map.flyTo(new L.LatLng(lt, lg));
    var marker = L.marker([lt, lg]);
    L.featureGroup([marker]).on('click', function () { window.open(gMapLink); }).addTo(map);
    L.esri.basemapLayer('Streets').addTo(map);
}

// Mapbox Map
/*function initMap() {
    //L.mapbox.accessToken = 'pk.eyJ1IjoibXdoYWxsZXkiLCJhIjoiY2pyd2pvcms1MDFzODN5bW5jcjEwYWZtdCJ9.34VZbZizZKHc-xqCOBa6Nw';
    var map = L.mapbox.map('mapid').setView([lt, lg], 15);
    map.flyTo(new L.LatLng(lt, lg));
    //L.mapbox.styleLayer('mapbox://styles/mwhalley/cjrwjqsnv01yj1fk1bqjn8f10').addTo(map);
    var marker = L.marker([lt, lg]);//.addTo(map);
    L.featureGroup([marker]).on('click', function () { window.open(gMapLink); }).addTo(map);
}*/

// Google Map
/*function initMap() {
    var map = new google.maps.Map(
        document.getElementById('mapid'), {
            zoom: 10,
            center: new google.maps
                .LatLng(
                    lt, lg),
            mapTypeId: google.maps
                .MapTypeId
                .ROADMAP
        });

    marker = new google.maps.Marker({
        position: new google
            .maps
            .LatLng(
                lt,
                lg
            ),
        map: map,
        animation: google.maps
            .Animation
            .DROP,
    });
    google.maps.event.addListener(marker, 'click', function() {
    window.open(gMapLink);
});
};*/