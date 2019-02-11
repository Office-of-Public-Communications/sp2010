/***********************
 * Dependencies:
 *
 * Leaflet JS ******************
 *
 * <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js" integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg==" crossorigin=""></script>
 *
 * Leaflet CSS *****************
 *
 *  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
   crossorigin=""/>
 ***********************/

var mymap = L.map('mapid').setView([26.120848, -80.143063], 17);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token=pk.eyJ1IjoiaGF5bGVlZ2Vvcmdpb3UxIiwiYSI6ImNqcmIwbWxjODAwcjY0NHBmbzlrNWF6MGkifQ.lauROjYILLYrzXCpfY8VKw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    mapboxToken: 'pk.eyJ1IjoiaGF5bGVlZ2Vvcmdpb3UxIiwiYSI6ImNqcmIwbWxjODAwcjY0NHBmbzlrNWF6MGkifQ.lauROjYILLYrzXCpfY8VKw'
}).addTo(mymap);

var marker = L.marker([26.120848, -80.143063]).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
marker.bindPopup("<b>Hello world!</b><br>I am a test Popup for the Libraray!");
mymap.on('click', onMapClick);
