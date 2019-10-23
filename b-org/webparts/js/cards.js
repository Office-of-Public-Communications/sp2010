// Title case things - for use when delightful writers type things in all caps when they shouldn't ;)
String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = [
        "A",
        "An",
        "The",
        "And",
        "But",
        "Or",
        "For",
        "Nor",
        "As",
        "At",
        "By",
        "For",
        "From",
        "In",
        "Into",
        "Near",
        "Of",
        "On",
        "Onto",
        "To",
        "With"
    ];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(
            new RegExp("\\s" + lowers[i] + "\\s", "g"),
            function(txt) {
                return txt.toLowerCase();
            }
        ); // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ["Id", "Tv"];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(
            new RegExp("\\b" + uppers[i] + "\\b", "g"),
            uppers[i].toUpperCase()
        );
    return str;
};

$.ajax({
    url: "/bbbc/_api/web/lists/GetByTitle('Featured')/items?$top=6&$select=*,Image/Title&$expand=Image/ID",
    method: "GET",
    headers: {
        Accept: "application/json; odata=verbose"
    },
    success: function(data) {
        eventItems = data.d.results;
        // console.log(eventItems);

        $fraggle = $('<div id="eventSearchResults" class="row"></div>');

        $.each(eventItems, function(index, event) {
            // console.log(event);

            var imgId = event.ImageId;

            var title = event.Title.toTitleCase();
            var imgUrl = "";

            // if image is selected, get it
            if (imgId != null) {
                $.ajax({
                    url: "/bbbc/_api/web/lists/GetByTitle('FeaturedImages')/items?$select=*,EncodedAbsUrl&$filter=Id eq " +
                        imgId, // + " and ",
                    method: "GET",
                    async: false,
                    headers: {
                        Accept: "application/json; odata=verbose"
                    },
                    success: function(data) {
                        var imgResult = data.d.results;

                        event.imgUrl = imgResult[0].EncodedAbsUrl;
                    },
                    complete: function() {
                        frag();
                    }
                });
            }

            function frag() {
                $fraggle.append(
                    $(
                        '<div class="event col-12 col-md-6 col-lg-4 p-3 my-1"><div class="container z-depth-1 px-3 pb-3 h-100 rounded"><div class="row"><div class="col px-0"><a href="/Parks/Pages/Event.aspx?event=' +
                        event.Id +
                        '"><img class="card-img-top pkImg lazyload" data-src="' +
                        event.imgUrl +
                        '" alt="Card image cap"></a></div></div><div class="container"><div class="row"><div class="col-12"><a href="/Parks/Pages/Event.aspx?event=' +
                        event.Id +
                        '"><h5 class="pt-3 eventTitle"><strong style="letter-spacing: -.25px;">' +
                        title +
                        '</strong></h5></a><p class="my-auto pr-3 text-muted d-block"> ' +
                        event.Description +
                        "</p></div></div></div></div>"
                    )
                );
            }
        });
    },
    complete: function() {
        $fraggle.appendTo("#featEvents");
    }
});