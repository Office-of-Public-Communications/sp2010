try { $(document).ready(function(e) {
	$('#hideLoad').load('/sandbox/pages/testfeed.aspx table', function (data) {

		// VARS
		imgs = $(data).find('img[src*="wowbrary"]').map(function () {
				return $(this).attr('src');
		}).get();
		titles = $(data).find('.NUTITLE').map(function () {
			return $(this).text();
		}).get();
		links = $(data).find('.NUTITLE').parent().map(function () {
			return $(this).attr('href');
		}).get();

		// COVER ITEM HTML STRUCTURE
		coverItemTemplate = '<div class="coverItemNEW">' + '<a href="" target="_blank">' + '<img  src="" alt="" class="coverImg lazyload">' + '</a>' + '</div>';

		// LOOPS TO ACCESS ARRAY DATA
		img = $.each(imgs, function (index, value) {
				return value;
		});
		title = $.each(titles, function (index, value) {
			return value;
		});
		link = $.each(links, function (index, value) {
			return value;
		});

		// LOOP TO BUILD COVER ITEMS
		for (var i = 0; i < imgs.length; i++) {
				var coverItem = $(coverItemTemplate)
					.find('a').attr('href', link[i])
					.find('img').attr('src', img[i]).attr('alt', title[i]).parents('div');
				$('#coverLoader').append(coverItem);
			}

		    $('#coverLoader').flickity({
	 	 // options
			freeScroll: true,
			wrapAround: true,
			cellSelector: '.coverItemNEW',
			pageDots: false,
			imagesLoaded: true
		});

	});
});
}
catch(error) {
console.log('the damn ' + error);
}