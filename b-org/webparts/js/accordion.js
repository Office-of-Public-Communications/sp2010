var runApi1, runApi2, runApi3;

if (useApi1) {
    var runApi1 = function () {
        $.ajax({
            url: apiUrl1,
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                var thisAccResults = data.d.results;
                //console.log(thisAccResults);
                $('.accordionMain')
                    .append($('<section id="pageAccordion" class="pageACC"><div class="container"><h2>' + title1 + '</h2>')
                        .append($('<div class="accordion ACCStyles md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true"></div>')));

                $.each(thisAccResults, function (ind, accItems) {
                    // CHANGE COLUMN NAMES BELOW (CASE SENSITIVE)
                    var ACCTitle = accItems.Title;
                    var ACCInfo = accItems.Info;
                    var ACCID = accItems.GUID;
                    // DO NOT CHANGE ANYTHING BELOW THIS LINE UNLESS ADDING MULTIPLE ACCORDIONS ON ONE PAGE- MUST ADD ID'S
                    $('.ACCStyles')
                        //CREATES HEADER OF EACH ACCORDION ENTRY
                        .append($('<div class="card">')
                            .append($('<div class="card-header pb-1 pl-0" role="tab">').attr("id", ACCID + "Title").attr("aria-labelledby", "Title " + ACCID)
                                .append($('<a class="collapsed" data-toggle="collapse" data-parent="ACCStyles" aria-expanded="false">').attr("href", "#" + ACCID + "Info").attr("aria-controls", ACCID + "Info")
                                    .append($('<h5 class="mr-2">').html(ACCTitle)
                                        .append($('<span class="rotate">')))))
                            //CREATES BODY OF EACH ACCORDION ENTRY
                            .append($('<div class="collapse" role="tabpanel">').attr("id", ACCID + "Info").attr("aria-labelledby", "Info " + ACCID)
                                .append($(' <div class="card-body pt-1 pl-2">').html(ACCInfo))));

                });
                //Accordion Icon Animation
                $('div.accordion').each(function () {
                    $('.ACCStyles > div').on('show.bs.collapse', function () {
                        $(this).find(".rotate").addClass("down");
                    });
                    $('.ACCStyles > div').on('hide.bs.collapse', function () {
                        $(this).find(".rotate").removeClass("down");
                    });
                });
            }
        });
    };
}
if (useApi2) {
    var runApi2 = function () {
        $.ajax({
            url: apiUrl2,
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                var thisAccResults = data.d.results;
                console.log(thisAccResults);
                $('.accordionMain')
                    .append($('<section id="pageAccordion2" class="pageACC"><div class="container"><h2>' + title2 + '</h2>')
                        .append($('<div class="accordion ACCStyles2 md-accordion" id="accordionEx2" role="tablist" aria-multiselectable="true"></div>')));

                $.each(thisAccResults, function (ind, accItems) {
                    // CHANGE COLUMN NAMES BELOW (CASE SENSITIVE)
                    var ACCTitle = accItems.Title;
                    var ACCInfo = accItems.Info;
                    var ACCID = accItems.GUID;
                    // DO NOT CHANGE ANYTHING BELOW THIS LINE UNLESS ADDING MULTIPLE ACCORDIONS ON ONE PAGE- MUST ADD ID'S
                    $('.ACCStyles2')
                        //CREATES HEADER OF EACH ACCORDION ENTRY
                        .append($('<div class="card">')
                            .append($('<div class="card-header pb-1 pl-0" role="tab">').attr("id", ACCID + "Title").attr("aria-labelledby", "Title " + ACCID)
                                .append($('<a class="collapsed" data-toggle="collapse" data-parent="ACCStyles2" aria-expanded="false">').attr("href", "#" + ACCID + "Info").attr("aria-controls", ACCID + "Info")
                                    .append($('<h5 class="mr-2">').html(ACCTitle)
                                        .append($('<span class="rotate">')))))
                            //CREATES BODY OF EACH ACCORDION ENTRY
                            .append($('<div class="collapse" role="tabpanel">').attr("id", ACCID + "Info").attr("aria-labelledby", "Info " + ACCID)
                                .append($(' <div class="card-body pt-1 pl-2">').html(ACCInfo))));

                });
                //Accordion Icon Animation
                $('div.ACCStyles2').each(function () {
                    $('.ACCStyles2 > div').on('show.bs.collapse', function () {
                        $(this).find(".rotate").addClass("down");
                    });
                    $('.ACCStyles2 > div').on('hide.bs.collapse', function () {
                        $(this).find(".rotate").removeClass("down");
                    });
                });
            }
        });

        $('body').on('click', '#accordionEx2 .card', function () {
            $(this).find('.collapse').collapse('toggle');
        });
    };
}
if (useApi3) {
    var runApi3 = function () {
        $.ajax({
            url: apiUrl3,
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                var thisAccResults = data.d.results;
                $('.accordionMain')
                    .append($('<section id="pageAccordion3" class="pageACC"><div class="container"><h2>' + title3 + '</h2>')
                        .append($('<div class="accordion ACCStyles3 md-accordion" id="accordionEx3" role="tablist" aria-multiselectable="true"></div>')));

                $.each(thisAccResults, function (ind, accItems) {
                    // CHANGE COLUMN NAMES BELOW (CASE SENSITIVE)
                    var ACCTitle = accItems.Title;
                    var ACCInfo = accItems.Info;
                    var ACCID = accItems.ID;
                    // DO NOT CHANGE ANYTHING BELOW THIS LINE UNLESS ADDING MULTIPLE ACCORDIONS ON ONE PAGE- MUST ADD ID'S
                    $('.ACCStyles')
                        //CREATES HEADER OF EACH ACCORDION ENTRY
                        .append($('<div class="card">')
                            .append($('<div class="card-header pb-1 pl-0" role="tab">').attr("id", ACCID + "Title").attr("aria-labelledby", "Title " + ACCID)
                                .append($('<a class="collapsed" data-toggle="collapse" data-parent="ACCStyles3" aria-expanded="false">').attr("href", "#" + ACCID + "Info").attr("aria-controls", ACCID + "Info")
                                    .append($('<h5 class="mr-2">').html(ACCTitle)
                                        .append($('<span class="rotate">')))))
                            //CREATES BODY OF EACH ACCORDION ENTRY
                            .append($('<div class="collapse" role="tabpanel">').attr("id", ACCID + "Info").attr("aria-labelledby", "Info " + ACCID)
                                .append($(' <div class="card-body pt-1 pl-2">').html(ACCInfo))));

                });
                //Accordion Icon Animation
                $('div.ACCStyles3').each(function () {
                    $('.ACCStyles3 > div').on('show.bs.collapse', function () {
                        $(this).find(".rotate").addClass("down");
                    });
                    $('.ACCStyles3 > div').on('hide.bs.collapse', function () {
                        $(this).find(".rotate").removeClass("down");
                    });
                });
            }
        });
        $('body').on('click', '#accordionEx3 .card', function () {
            $(this).find('.collapse').collapse('toggle');
        });
    };
}

if (useApi1 && !useApi2 && !useApi3) {
    runApi1();
} else if (useApi1 && useApi2 && !useApi3) {
    runApi1();
    $.when(runApi1).then(runApi2);
} else if (useApi1 && useApi2 && useApi3) {
    runApi1();
    $.when(runApi1).then(runApi2);
    $.when(runApi2).then(runApi3);
}