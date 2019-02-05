$(document).ready(function () {
    console.log('matt alert working');
    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "Alert",
        webURL: "/Sandbox/v6/MattDEV/",
        CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='More' /></ViewFields>",
        CAMLQuery: "",
        completefunc: function (xData, Status) {
            $(xData.responseXML)
                .SPFilterNode("z:row")
                .each(function () {
                    //Alert VARS
                    var AlertTitle = $(this).attr("ows_Title");
                    //var AlertMore= $(this).attr("ows_More")? AlertMore.split(",")[0] : false;

                    var AlertMore =
                        $(this).attr("ows_More") !== undefined ? $(this).attr("ows_More").split(",")[0] : false;
                    //Build banner, adjust navbar & page layout when alert banner present

                    if ($(this).attr("ows_Title").length > 0 && !sessionStorage.getItem('hidden_alerts')) {
                        //Build banner
                        $("#alertSystem").append(
                            $('<div class="alerts_msg slide">').append(
                                $("<span>")
                                    .html(AlertTitle)
                                    .append(
                                        AlertMore !== false ? $('<a class="alerts_link">').attr("href", AlertMore).attr("alt", "Read more").attr("target", "_blank").html("...More") : null)
                            )
                        );

                        $("#alertsWrap").css("display", "block");
                    }
                });
            // alerts on burger & in side nav when banner has been dismissed
            if ($(this).attr("ows_Title")) {
                if ($(this).attr("ows_Title").length > 0 && sessionStorage.getItem('hidden_alerts')) {
                    $('div#hamburger').append('<i id="burgerAlert" class="fas fa-exclamation-triangle"></i>')
                    $('#slide-out > li:nth-child(1) > div').parent().prepend('<nav id="sideAlert"><a href="Alerts.aspx">⚠ View Alerts</a></nav>')
                    // dismiss alert
                    $("#alertsWrap").css("display", "none");
                }
            }
        }
    });
});

$(function () {
    var flkty = new Flickity('.alerts_list', {
        // options
        wrapAround: true,
        cellSelector: '.alerts_msg',
        pageDots: false,
        autoPlay: 3000,
        dragThreshold: 10
    });
    var alertCounter = $('#alert_counter');

    function updateCounter() {
        var slideNumber = flkty.selectedIndex + 1;
        alertCounter.text(slideNumber + '/' + flkty.slides.length);
    }
    updateCounter();

    flkty.on('select', updateCounter);
});

// Dismiss banner by removing space above header & making alert invisible
$(function () {
    $(".alerts_close").on("click", function () {

        // add icon & alert link to side nav
        sessionStorage.setItem('hidden_alerts', true);
        $('div#hamburger').append('<i id="burgerAlert" class="fas fa-exclamation-triangle"></i>');
        $('#slide-out > li:nth-child(1) > div').parent().prepend('<nav id="sideAlert"><a href="/pages/Alerts.aspx"><i class="fal fa-exclamation-triangle"></i> View Alerts</a></nav>');
        // dismiss alert
        $('#alertsWrap').css('display', 'none');
    });
});

$(function () {
    if (sessionStorage.getItem('hidden_alerts')) {
        // add icon & alert link to side nav
        sessionStorage.setItem('hidden_alerts', true);
        $('div#hamburger').append('<i id="burgerAlert" class="fas fa-exclamation-triangle"></i>')
        $('#slide-out > li:nth-child(1) > div').parent().prepend('<nav id="sideAlert"><a href="Alerts.aspx">⚠ View Alerts</a></nav>')

        // do the dismissing & resizing things
        $("#alertsWrap").css("display", "none");
    }
});