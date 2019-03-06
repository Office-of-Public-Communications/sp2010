var icon;

$.ajax({
    url: 'https://api.weather.gov/gridpoints/MFL/109,65/forecast',
    data: {},
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        nwsUrl = JSON.stringify(data.properties.periods[0].icon);
        nwsTemp = JSON.stringify(data.properties.periods[0].temperature);
        nwsForecast = JSON.stringify(data.properties.periods[0].shortForecast);
    }
}).done(function () {

    $.ajax({
        url: "/_api/web/lists/GetByTitle('WeatherQuotes')/items",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            quotes = data.d.results;
            console.log(data.d.results);
        }
    });
}).done(function () {

    var nwsIconPath = nwsUrl;
    var nwsIcons = ["skc", "few", "sct", "bkn", "ovc", "wind_skc", "wind_few", "wind_sct", "wind_bkn", "wind_ovc", "snow", "rain_snow", "rain_sleet", "snow_sleet", "fzra", "rain_fzra", "snow_fzra", "sleet", "rain", "rain_showers", "rain_showers_hi", "tsra", "tsra_sct", "tsra_hi", "tornado", "hurricane", "tropical_storm", "dust", "smoke", "haze", "hot", "cold", "blizzard", "fog"];

    // if nwsIcon is in the pathname, function to find matching Y icon
    for (var i = 0; i < nwsIcons.length; i++) {

        if (nwsIconPath.indexOf(nwsIcons[i]) > -1) {
            switch (nwsIcons[i]) {
                case 'skc':
                    cond = 'Fair';
                    icon = '30';
                    break;
                case 'few':
                    cond = 'Fair';
                    icon = '44';
                    break;
                case 'sct':
                    cond = 'Fair';
                    icon = '28';
                    break;
                case 'bkn':
                    Fair = 'Fair';
                    icon = '28';
                    break;
                case 'ovc':
                    cond = 'Fair';
                    icon = '23';
                    break;
                case 'wind_skc':
                    cond = 'Fair';
                    icon = '24';
                    break;
                case 'wind_few':
                    cond = 'Fair';
                    icon = '24';
                    break;
                case 'wind_sct':
                    cond = 'Fair';
                    icon = '24';
                    break;
                case 'wind_bkn':
                    cond = 'Fair';
                    icon = '24';
                    break;
                case 'wind_ovc':
                    cond = 'Fair';
                    icon = '24';
                    break;
                case 'snow':
                    cond = 'Cold';
                    icon = '41';
                    break;
                case 'rain_snow':
                    cond = 'Cold';
                    icon = '5';
                    break;
                case 'rain_sleet':
                    cond = 'Stormy';
                    icon = '18';
                    break;
                case 'snow_sleet':
                    cond = 'Stormy';
                    icon = '18';
                    break;
                case 'fzra':
                    cond = 'Stormy';
                    icon = '10';
                    break;
                case 'rain_fzra':
                    cond = 'Stormy';
                    icon = '10';
                    break;
                case 'snow_fzra':
                    cond = 'Stormy';
                    icon = '5';
                    break;
                case 'sleet':
                    cond = 'Stormy';
                    icon = '18';
                    break;
                case 'rain':
                    cond = 'Rain';
                    icon = '11';
                    break;
                case 'rain_showers':
                    cond = 'Rain';
                    icon = '11';
                    break;
                case 'rain_showers_hi':
                    cond = 'Rain';
                    icon = '11';
                    break;
                case 'tsra':
                    cond = 'Stormy';
                    icon = '4';
                    break;
                case 'tsra_sct':
                    cond = 'Stormy';
                    icon = '4';
                    break;
                case 'tsra_hi':
                    cond = 'Stormy';
                    icon = '4';
                    break;
                case 'tornado':
                    cond = 'Stormy';
                    icon = '0';
                    break;
                case 'hurricane':
                    cond = 'Hurricane';
                    icon = '2';
                    break;
                case 'tropical_storm':
                    cond = 'Stormy';
                    icon = '1';
                    break;
                case 'dust':
                    cond = 'Cloudy';
                    icon = '19';
                    break;
                case 'smoke':
                    cond = 'Cloudy';
                    icon = '22';
                    break;
                case 'haze':
                    cond = 'Cloudy';
                    icon = '21';
                    break;
                case 'hot':
                    cond = 'Hot';
                    icon = '36';
                    break;
                case 'cold':
                    cond = 'Cold';
                    icon = '25';
                    break;
                case 'blizzard':
                    cond = 'Stormy';
                    icon = '43';
                    break;
                case 'fog':
                    cond = 'Cloudy';
                    icon = '20';
                    break;

                default:
                    icon = 3200;
                    break;
            }
        }
    }
}).done(function () {
    // function to return list conditions that match nws conditions
    function matchConds(conds) {
        return conds.Condition.results.indexOf(cond) > -1;
    }
    // loop through array of weather quotes
    for (i = 0; i < quotes.length; i++) {
        var filteredConds = quotes.filter(matchConds);
        // randomize quote to be injected into html
        rquote = filteredConds[Math.floor(Math.random() * filteredConds.length)].Title;
    }
    html = '<div class="weather-card"><img src="https://broward.org/Style%20Library/V7/plugins/weather/SVG/' + icon + '.svg"><h2>' + nwsTemp + '&deg;F</h2><p><span>' + rquote + '</span></p></div>';
    $("#weather").html(html);
});