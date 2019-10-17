//Webpart Scripts

$('.searchableAccordion').append('<section aria-label="Main Page Content" id="Career"><div class="container py-3"><div class="row justify-content-between"><div class="col-md-3 col-12 pr-4"><h4 class="topicsTitle pb-md-3 font-weight-bold text-center text-md-left text-dark">TOPICS</h4><div id="topicNav" class="pb-md-3 py-md-0"><ul class="px-0" id="topicOptions" style="list-style-type:none; border-left:solid medium #eaeaea;"><!--Options injected here--></ul></div></div><div class="col-md-8 col-12"><div class="row justify-content-center justify-content-md-end my-2"><div class="col-md-6 col-10 pr-1"><div class="z-depth-1 mt-1" style="border-radius:4px;"><input class="form-control pl-3" id="faqSearch" style="border-radius:4px;" type="text" placeholder="Search" aria-label="Search" data-search/></div></div><div class="col-2 d-flex pl-1 justify-content-end"><button class="btn btn-sm px-4 d-flex justify-content-center" style="background-color:#039BE5; margin-top:4px; margin-bottom:16px" type="button" data-search-button><i class="fal fa-search" style="font-size:24px"></i></button></div></div><h2 id="faqTopicTitle" class="pb-3 font-weight-bold text-center text-md-left">' + title + '</h2><!-- Grid row --><div class="row d-flex justify-content-center"><!-- Grid column --><div class="col-md-12 pb-5 mr-1" id="accordionColumn"></div><!-- Grid column --></div><!-- Grid row --></div></div></div></section>');

var accID = 'Scoop the Poop';
var searchVal = '';

$.ajax({
    url: apiUrl,
    method: "GET",
    headers: {
        "Accept": "application/json; odata=verbose"
    },
    success: function (data) {
        var thisFaqResults = data.d.results;

        console.log(thisFaqResults);

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        var faqItems = $.each(thisFaqResults, function (ind, faqItems) {
            return faqItems;
        });

        var allTopics = [];
        for (i = 0; i < faqItems.length; i++) {
            var filterTopics = faqItems[i];
            allTopics.push(filterTopics.Topics);
        }
        allTopics.sort();
        console.log(allTopics);

        var topicList = allTopics.filter(onlyUnique);
        for (i = 0; i < topicList.length; i++) {
            var topicName = topicList[i];
            $('#topicOptions').append('<li class="py-1 pl-3"><a href="#" class="text-dark">' + topicName + '</a></li>');
        }
        var effectIn = function () {
            $('#faqTopicTitle').html(accID).fadeTo(500, 1);
            return $("#accordionColumn").fadeTo(500, 1);
        };

        var effectOut = function () {
            $('#faqTopicTitle').fadeTo(500, 0);
            return $("#accordionColumn").fadeTo(500, 0);
        };
        //includes Polyfill
        if (!String.prototype.includes) {
            Object.defineProperty(String.prototype, 'includes', {
                value: function (search, start) {
                    if (typeof start !== 'number') {
                        start = 0;
                    }

                    if (start + search.length > this.length) {
                        return false;
                    } else {
                        return this.indexOf(search, start) !== -1;
                    }
                }
            });
        }

        function createAccordion() {
            var faqItems = $.each(thisFaqResults, function (ind, faqItems) {
                return faqItems;
            });
            if (accID != 'Search Results') {
                var filterTopic = faqItems.filter(function (e) {
                    return e.Topics == accID;
                });
            } else {
                var filterTopic = faqItems.filter(function (e) {
                    var questions = e.Question.toLowerCase();
                    return questions.includes(searchVal);
                });
            }
            var buildAcc = function () {
                var accID2 = accID.replace(/\s/g, '');
                var accBuild = '<div class="md-accordion accordion" id="' + accID2 + '" role="tablist" aria-multiselectable="true""></div>';
                $("#accordionColumn").append(accBuild);
            };
            buildAcc();
            var buildCards = function () {
                if (filterTopic.length !== 0) {
                    for (i = 0; i < filterTopic.length; i++) {
                        var accID2 = accID.replace(/\s/g, '');
                        var faqItems = filterTopic[i];
                        var headerID = "heading" + faqItems.ID;
                        var cardBodyID = "collapse" + faqItems.ID;
                        var cardTitle = faqItems.Title;
                        var cardBody = faqItems.Question;

                        var cardBuild = '<div class="card">' +
                            '<div class="card-header pb-1 pl-0" role="tab" id="' + headerID + '">' +
                            '<a class="collapsed" data-toggle="collapse" data-parent="#' + accID2 + '" href="#' + cardBodyID + '" aria-expanded="false" aria-controls="' + cardBodyID + '">' +
                            '<h5 class="mb-0 font-thin">' + cardTitle + '<span class="rotate"></span></h5>' +
                            '</a>' +
                            '</div>' +
                            '<div id="' + cardBodyID + '" class="collapse" role="tabpanel" aria-labelledby="' + headerID + '" data-parent="#' + accID + '">' +
                            '<div class="card-body py-1 pl-0"><p>' + cardBody + '</p></div>' +
                            '</div>' +
                            '</div>';
                        $(".accordion").append(cardBuild);
                    }
                } else {
                    var cardBuild = '<h4>There are no results matching your search.</div>';
                    $(".accordion").append(cardBuild);
                }
                //Accordion Icon Animation
                $('.accordion > div > div > a').on('click', function () {
                    $(this).find(".rotate").toggleClass("down");
                });
            };
            buildCards();

        }
        createAccordion();
        $("#topicOptions > li:first-child > a").parent().css({
            borderLeft: "solid medium #039BE5",
            marginLeft: "-3px"
        });

        $("#topicOptions > li > a").on("click", function () {
            event.returnValue = false;
            accID = this.innerHTML;
            $("[data-search]")[0].value = '';
            $("#topicOptions > li").css({
                borderLeft: "none",
                marginLeft: "0px"
            });
            $(this).parent().css({
                borderLeft: "solid medium #039BE5",
                marginLeft: "-3px"
            });
            $.when(effectOut()).done(function () {
                $(".accordion").remove();
                createAccordion();
                effectIn();
            });
        });

        function topicNav() {
            // Create the dropdown base
            $("<select style=\"border:none; height:50px;\" class=\"browser-default custom-select w-100 z-depth-1\" />").appendTo("#topicNav");
            // Create default option "Go to..."
            $("<option />", {
                "selected": "",
                "value": "Choose a Topic",
                "text": "Choose a Topic"
            }).appendTo("#topicNav select");

            // Populate dropdown with menu items
            $("#topicNav > ul > li > a").each(function () {
                var topicsSelect = $(this);
                $("<option />", {
                    "value": topicsSelect.text(),
                    "text": topicsSelect.text()
                }).appendTo("#topicNav select");
            });

            // To make dropdown actually work
            // To make more unobtrusive: https://css-tricks.com/4064-unobtrusive-page-changer/
            $("#topicNav select").change(function () {
                accID = $(this).find("option:selected").val();
                $.when(effectOut()).done(function () {
                    $(".accordion").remove();
                    createAccordion();
                    effectIn();
                });
            });


        }
        topicNav();

        //Search Function
        $('[data-search]').keypress(function (event) {
            if (event.which == 13) {
                event.preventDefault();
                event.returnValue = false;
                accID = 'Search Results';
                console.log($(this));

                searchVal = $(this).val().toLowerCase();
                $.when(effectOut()).done(function () {
                    $("#topicOptions > li").css({
                        borderLeft: "none",
                        marginLeft: "0px"
                    });

                    $(".accordion").remove();
                    createAccordion();
                    effectIn();
                });
                console.log(searchVal);
            }
        });
        $('[data-search-button]').on('click', function (event) {
            event.preventDefault();
            event.returnValue = false;
            accID = 'Search Results';

            $("#topicOptions > li").css({
                borderLeft: "none",
                marginLeft: "0px"
            });

            searchVal = $('#faqSearch').val().toLowerCase();
            $.when(effectOut()).done(function () {
                $("#topicOptions > li").css({
                    borderLeft: "none",
                    marginLeft: "0px"
                });

                $(".accordion").remove();
                createAccordion();
                effectIn();
            });
            console.log(searchVal);
        });
    }
}); $(function () {
    $('[data-toggle="popover-hover"]').popover();
    $('.topicsTitle').html(topicsTitle);
});