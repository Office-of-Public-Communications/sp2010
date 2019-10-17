var agencyTitle = '';
$.ajax({
    url: "/_api/web/lists/GetByTitle('AgencyContact')/items?$top=5000&$select=*",
    method: "GET",
    headers: {
        "Accept": "application/json; odata=verbose"
    },
    success: function (data) {
        sites = data.d.results;
        thisUrl = window.location.pathname.split('/').slice(1)[0].toLowerCase();
        //console.log(thisUrl)
        //console.log(sites)
        $.each(sites, function (index, site) {
            if (site.AgencyURL != null) {
                //console.log(site.AgencyURL.split('/')[1].toLowerCase())
                var agency = site.AgencyURL.split('/')[1].toLowerCase();
                if (agency === thisUrl) {
                    agencyTitle = site.Title;
                    //console.log(agencyTitle);
                }
            }
        });
    }
}).then(function () {

    return $.ajax({
        url: "/_api/web/lists/GetByTitle('AgencyImages')/items?$top=5000&$select=*,EncodedAbsUrl",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            imgs = data.d.results;
            console.log(imgs);
            var hasUpload;
            $.each(imgs, function (index, img) {
                var agencyImg = img.Title;
                //console.log(agencyTitle);
                //console.log(agencyImg);
                // if there is an uploaded image
                if (agencyImg == agencyTitle) {
                    //set hero image variable
                    console.log(img.EncodedAbsUrl);
                    $("#agencyInfo").css({
                        "background": "url(" + img.EncodedAbsUrl + "?RenditionID=5) no-repeat center center",
                        "background-size": "cover"
                    });
                    hasUpload = true;
                }
                console.log('upload', hasUpload);
            });

            console.log(hasUpload);
            // if there is not an uploaded image
            if (hasUpload !== true) {
                var images = [
                    "hero1.jpg",
                    "hero2.jpg",
                    "hero3.jpg",
                    "hero4.jpg",
                    "hero5.jpg",
                    "hero6.jpg",
                    "hero7.jpg",
                    "hero8.jpg",
                    "hero9.jpg",
                    "hero10.jpg",
                    "hero11.jpg",
                    "hero12.jpg",
                ];
                //console.log(images);
                $("#agencyInfo").css({
                    "background": "url(/Style%20Library/V7/img/HomeHero/" +
                        images[Math.floor(Math.random() * images.length)] +
                        ") no-repeat center center",
                    "background-size": "cover"
                });
            }
        }
    });
});