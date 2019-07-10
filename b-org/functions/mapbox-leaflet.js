L.mapbox.accessToken = 'pk.eyJ1IjoibXdoYWxsZXkiLCJhIjoiY2pyd2pvcms1MDFzODN5bW5jcjEwYWZtdCJ9.34VZbZizZKHc-xqCOBa6Nw';
var map = L.map('mapid').setView([26.120848, -80.143063], 17);

L.mapbox.styleLayer('mapbox://styles/mwhalley/cjrwjqsnv01yj1fk1bqjn8f10').addTo(map);
var marker = L.marker([26.120848, -80.143063]).addTo(map);

