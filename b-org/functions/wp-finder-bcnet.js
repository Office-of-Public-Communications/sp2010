var subsites = [];
var wpUrls = [];

$.ajax({
    url: "/_api/site/rootWeb/webinfos",
    method: "GET",
    headers: {
        Accept: "application/json; odata=verbose"
    },
    success: function(data) {
        var results = data.d.results;
        console.log(results);
        $.each(results, function(index, result) {
            console.log(result);
            subsites.push(result.ServerRelativeUrl);
        });
    },
    complete: function() {
        // console.log(subsites)

        $.each(subsites, function(index, subsite) {
            console.log(subsite);
            $.ajax({
                // use page paths from previous function in url here
                url: subsite +
                    "/_api/web/Lists/getByTitle('Pages')/Items?$select=EncodedAbsUrl",
                method: "GET",
                headers: {
                    Accept: "application/json; odata=verbose"
                },
                success: function(data) {
                    var results = data.d.results;
                    $.each(results, function(index, result) {
                        var wpPage = result.EncodedAbsUrl + "?contents=1";
                        wpUrls.push(wpPage);
                    });
                    console.log(wpUrls);
                },
                complete: function() {
                    $.each(wpUrls, function(index, url) {
                        $.ajax({
                            url: url,
                            method: "GET",
                            headers: {
                                Accept: "application/json; odata=verbose"
                            },
                            success: function(data) {
                                if (data.indexOf("Inspired Tiles Web Part") > 0) {
                                    var pgUrl = url.split("?")[0];
                                    console.log(pgUrl);
                                    // $("wp-list").html(pgUrl);
                                }
                            }
                        });
                    });
                }
            });
        });
    }
});