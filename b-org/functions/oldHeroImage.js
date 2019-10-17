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
$("#agencyInfo").css({
    "background":
    "url(/Style%20Library/V7/img/HomeHero/" +
    images[Math.floor(Math.random() * images.length)] +
    ") no-repeat center center", "background-size":"cover"
});

$("#fullPageContent h3, h1").each(function() {
    var $this = $(this);
    $this.html($this.html().replace(/&nbsp;/g, ''));
});

if($("div#pageCarousel img").length==0){
    $("#imageCarousel").addClass('d-none');
}

if($("#bc_video").length==0){
    document.getElementById("videoPlayer").setAttribute("style", "margin-top:-1.6rem;");
    $("#videoPlayer").removeClass('videoGrey')
}
$("#pageCarousel .carousel-item img").removeAttr("height width").addClass("w-100");
