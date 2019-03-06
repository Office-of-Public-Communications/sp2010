$(".emptyHide").html(function (i, html) {
    return html.replace(/&nbsp;/g, '');
});

//Hide empty Urgent
var urgentHide = $('.urgent.emptyHide > div')[0];
var urgentEnter = urgentHide.innerText;
var urgentLength = urgentEnter.length;

if (urgentLength == 0) {

    $(".urgent.emptyHide").parent().hide()
}

//Hide empty survey

var surveyHide = $('.survey.emptyHide > div')[0];
var surveyEnter = surveyHide.innerText;
var surveyLength = surveyEnter.length;

if (surveyLength == 0) {

    $(".survey.emptyHide").parent().hide()
}