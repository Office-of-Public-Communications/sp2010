$.ajax({
    url: 'https://api.weather.gov/gridpoints/MFL/109,65/forecast',
    data: {},
    type: 'GET',
    dataType: 'json',
    success: function(data){
        //alert(data);
        nwsUrl = JSON.stringify(data.properties.periods[0].icon);
        nwsTemp = JSON.stringify(data.properties.periods[0].temperature);
        nwsForecast = JSON.stringify(data.properties.periods[0].shortForecast);
    }
}).done(function(){

// TODO: need to replace this pathname part with NWS API icon url
var nwsIconPath = nwsUrl;//.split('land/')[1];
var nwsIcons = [ "skc", "few", "sct", "bkn", "ovc", "wind_skc", "wind_few", "wind_sct", "wind_bkn", "wind_ovc", "snow", "rain_snow", "rain_sleet", "snow_sleet", "fzra", "rain_fzra", "snow_fzra", "sleet", "rain", "rain_showers", "rain_showers_hi", "tsra", "tsra_sct", "tsra_hi", "tornado", "hurricane", "tropical_storm", "dust", "smoke", "haze", "hot", "cold", "blizzard", "fog" ];

// if nwsIcon is in the pathname, function to find matching Y icon
for (var i = 0; i < nwsIcons.length; i++)  {

    if (nwsIconPath.indexOf(nwsIcons[i]) > -1) {
        switch (nwsIcons[i]) {
            case 'skc':
                icon = '30';
                break;
            case 'few':
                icon = '44';
                break;
            case 'sct':
                icon = '28';
                break;
            case 'bkn':
                icon = '28';
                break;
            case 'ovc':
                icon = '23';
                break;
            case 'wind_skc':
                icon = '24';
                break;
            case 'wind_few':
                icon = '24';
                break;
            case 'wind_sct':
                icon = '24';
                break;
            case 'wind_bkn':
                icon = '24';
                break;
            case 'wind_ovc':
                icon = '24';
                break;
            case 'snow':
                icon = '41';
                break;
            case 'rain_snow':
                icon = '5';
                break;
            case 'rain_sleet':
                icon = '18';
                break;
            case 'snow_sleet':
                icon = '18';
                break;
            case 'fzra':
                icon = '10';
                break;
            case 'rain_fzra':
                icon = '10';
                break;
            case 'snow_fzra':
                icon = '5';
                break;
            case 'sleet':
                icon = '18';
                break;
            case 'rain':
                icon = '11';
                break;
            case 'rain_showers':
                icon = '11';
                break;
            case 'rain_showers_hi':
                icon = '11';
                break;
            case 'tsra':
                icon = '4';
                break;
            case 'tsra_sct':
                icon = '4';
                break;
            case 'tsra_hi':
                icon = '4';
                break;
            case 'tornado':
                icon = '0';
                break;
            case 'hurricane':
                icon = '2';
                break;
            case 'tropical_storm':
                icon = '1';
                break;
            case 'dust':
                icon = '19';
                break;
            case 'smoke':
                icon = '22';
                break;
            case 'haze':
                icon = '21';
                break;
            case 'hot':
                icon = '36';
                break;
            case 'cold':
                icon = '25';
                break;
            case 'blizzard':
                icon = '43';
                break;
            case 'fog':
                icon = '20';
                break;

            default: icon = 0;
                break;
        }
}
}
//console.log(icon);
}).done(function(){
    html = '<div class="weather-card"><h2>' + nwsTemp + '&deg;F</h2><img src="https://broward.org/Style%20Library/V7/plugins/weather/SVG/' + icon + '.svg"><p><span>' + nwsForecast.split('"').join('') + '</span></p></div>';
    $("#weather").html(html);
});

// }).done(function () {
//     html = '<h2>' + nwsTemp + '&deg; F</h2>';
//     html += '<img src="https://broward.org/Style%20Library/V7/plugins/weather/SVG/' + icon + '.svg">';
//     html += '<p><span>' + nwsForecast.split('"').join('') + '</span></p>';
//     $("#weather").html(html);
// });