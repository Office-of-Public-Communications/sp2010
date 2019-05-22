$(document).ready(function () {
  $.ajax({
    url: "http://bc-net/_api/web/lists/GetByTitle('specialDiscounts')/items",
    method: 'GET',
    headers: {
      'Accept': 'application/json; odata=verbose'
    },
    success: function (data) {
      var items = data.d.results;
      // console.log(items);

      var auto = $('#automotive');
      var entertainment = $('#entertainment');
      var healthBeauty = $('#healthBeauty');
      var travel = $('#travel');
      var electronics = $('#electronics');
      var services = $('#services');
      var housing = $('#housing');

      var autoContent = $('<div class="row animated fadeInUp"></div>');
      var entertainmentContent = $('<div class="row animated fadeInUp"></div>');
      var healthBeautyContent = $('<div class="row animated fadeInUp"></div>');
      var travelContent = $('<div class="row animated fadeInUp"></div>');
      var electronicsContent = $('<div class="row animated fadeInUp"></div>');
      var servicesContent = $('<div class="row animated fadeInUp"></div>');
      var housingContent = $('<div class="row animated fadeInUp"></div>');
      var autoRating = $('<section class ="rating-widget"> </section>');

      var itemContent;

      for (var j = 0; j < items.length; j++) {

        itemContent = '<div class="col-md-3">' +
          '<div class="card-body card-body-cascade text-center">' +
          '<div class="overlay rounded mb-lg-0 mb-4">' +
          ' <img style="width:90%" class="img-fluid card-img-top" src=" ' + items[j].Image.Url + '" alt="Sample image">' +
          '<div class="mask rgba-white-slight waves-effect waves-light"></div>' +
          '<a href=" ' + items[j].Link.Url + '" target = _blank> <p  style="margin-top: 10px" class="font-weight-bold dark-grey-text"><strong>' + items[j].Title +
          '</strong></p></a><p style="margin-top: -18px" class="card-text">' + items[j].Description + '</p>' +
          '<a href=" ' + items[j].Link.Url + '" target = _blank><button style="margin-top: -10px" type="button" class="btn btn-outline-info btn-sm waves-effect">Click Here</button></a></div></div>' +
          '<div>' + '</div>' + '<section class="rating-widget mb-5"><div class="rating-stars text-center"><ul id="stars" data-rating="' + items[j].AvgRating + '" data-id="' + items[j].ID + '"><li class="star" title="Poor" data-value="1"><i class="fa fa-star fa-fw"></i></li><li class="star" title="Fair" data-value="2"><i class="fa fa-star fa-fw"></i></li><li class="star" title="Good" data-value="3"><i class="fa fa-star fa-fw"></i></li><li class="star" title="Excellent" data-value="4"><i class="fa fa-star fa-fw"></i></li><li class="star" title="Perfect" data-value="5"><i class="fa fa-star fa-fw"></i></li></ul></div>' +
          '</section>';

        // var of star counts from GET
        stars = $(this).parent().children('li.star');
        console.log(stars)
        for (i = 0; i < items[j].AvgRating; i++) {
          //console.log(this);
          $(stars[i]).addClass('selected');
        }

        console.log(items[j].ID);
        // branching logic,
        // append the <p> in different places based on
        // different possible Category values

        switch (items[j].Category) {
          case 'Automotive':
            autoContent.append(itemContent);
            break;
          case 'Entertainment':
            entertainmentContent.append(itemContent);
            //entertainment.append(panelsContent);
            break;
          case 'Health and Beauty':
            healthBeautyContent.append(itemContent);
            //healthBeauty.append(panelsContent);
            break;
          case 'Travel':
            travelContent.append(itemContent);
            //travel.append(panelsContent);
            break;
          case 'Electronics':
            electronicsContent.append(itemContent);
            //electronics.append(panelsContent);
            break;
          case 'Services':
            servicesContent.append(itemContent);
            //services.append(panelsContent);
            break;
          case 'Housing':
            housingContent.append(itemContent);
            //housing.append(panelsContent);
            break;
          default:
            break;
        }
      }

      auto.append(autoContent);
      entertainment.append(entertainmentContent);
      healthBeauty.append(healthBeautyContent);
      travel.append(travelContent);
      electronics.append(electronicsContent);
      services.append(servicesContent);
      housing.append(housingContent);

      /* 1. Visualizing things on Hover - See next part for action on click */
      $('#stars li').on('mouseover', function () {
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function (e) {
          if (e < onStar) {
            $(this).addClass('hover');
          } else {
            $(this).removeClass('hover');
          }
        });

      }).on('mouseout', function () {
        $(this).parent().children('li.star').each(function (e) {
          $(this).removeClass('hover');
        });
      });


      /* 2. Action to perform on click */
      $('#stars li').on('click', function () {
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');
        rat = $(this).parent().data('id');
        console.log(rat);

        for (i = 0; i < stars.length; i++) {
          $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
          $(stars[i]).addClass('selected');
          console.log(onStar);
          // onStar = var for rating selected by user
          // TODO: var for item ID for use in POST url
          var newRating = onStar; // var for rating selected by user to go here
          // console.log(newRating);
          var avgRating = Number(items[0].AvgRating); // GET for this calculation only
          // console.log(avgRating);
          var ratingCount = items[0].RatingCt; // GET for this calculation only
          // console.log(ratingCount);
          newCount = ratingCount + 1; // POST this to ratingCt column
          // console.log(newCount);
          var numerator = avgRating * ratingCount + newRating; // use as local var for this calculation only
          // console.log(numerator);
          newAvg = Math.round(numerator / newCount); // POST to avgRating column
          console.log(newAvg);
          //refreshToken();
          //ratingPost();
        }
        ratingPost();
        /*
                $.ajax({
                  url: "http://bc-net/_api/web/lists/GetByTitle('specialDiscounts')/items",
                  method: 'GET',
                  headers: {
                    'Accept': 'application/json; odata=verbose'
                  },
                  success: function (data) {
                    var items = data.d.results;
                    // console.log(items);
                    // onStar = var for rating selected by user
                    // TODO: var for item ID for use in POST url
                    var newRating = onStar; // var for rating selected by user to go here
                    // console.log(newRating);
                    var avgRating = Number(items[0].AvgRating); // GET for this calculation only
                    // console.log(avgRating);
                    var ratingCount = items[0].RatingCt; // GET for this calculation only
                    // console.log(ratingCount);
                    newCount = ratingCount + 1; // POST this to ratingCt column
                    // console.log(newCount);
                    var numerator = avgRating * ratingCount + newRating; // use as local var for this calculation only
                    // console.log(numerator);
                    newAvg = Math.round(numerator / newCount); // POST to avgRating column
                    console.log(newAvg);
                    //refreshToken();
                    //ratingPost();
                  }
                });
        /*
                $.ajax({
                  url: "http://bc-net/_api/web/lists/GetByTitle('specialDiscounts')/items",
                  method: 'GET',
                  headers: {
                    'Accept': 'application/json; odata=verbose'
                  },
                  success: function (data) {
                    var items = data.d.results;
                    // console.log(items);
                    // onStar = var for rating selected by user
                    // TODO: var for item ID for use in POST url
                    var newRating = onStar; // var for rating selected by user to go here
                    // console.log(newRating);
                    var avgRating = Number(items[0].AvgRating); // GET for this calculation only
                    // console.log(avgRating);
                    var ratingCount = items[0].RatingCt; // GET for this calculation only
                    // console.log(ratingCount);
                    newCount = ratingCount + 1; // POST this to ratingCt column
                    // console.log(newCount);
                    var numerator = avgRating * ratingCount + newRating; // use as local var for this calculation only
                    // console.log(numerator);
                    newAvg = Math.round(numerator / newCount); // POST to avgRating column
                    console.log(newAvg);
                    //refreshToken();
                    //ratingPost();
                  }
                });
        
        */
        */
        function refreshToken() {
          $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
            method: "POST",
            headers: {
              "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
              $('#__REQUESTDIGEST').val(data.d.GetContextWebInformation.FormDigestValue);
            },
            error: function (data, errorCode, errorMessage) {
              alert(errorMessage);
            }
          });
        }

        function ratingPost() {
          console.log(items);
          $.ajax({
            url: "http://bc-net/_api/web/lists/GetByTitle('specialDiscounts')/items(" + rat + ")",
            method: 'POST',
            headers: {
              "accept": "application/json;odata=verbose",
              "X-RequestDigest": $("#__REQUESTDIGEST").val(),
              "content-Type": "application/json;odata=verbose",
              "IF-MATCH": "*",
              "X-HTTP-Method": "MERGE"
            },
            data: "{__metadata:{'type':'SP.Data.SpecialDiscountsListItem'}, AvgRating:" + newAvg + ", RatingCt:" + newCount + "}",
            /*where Title is column name and you can add more columns by splitting with ,*/
            success: function (data) {
              console.log('POST successfully completed');
            },
            error: function (error) {
              alert(JSON.stringify(error));
            }
          });
        }



        // JUST RESPONSE (Not needed)
        /*
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        var msg = "";
        if (ratingValue > 1) {
            msg = "Thanks! You rated this " + ratingValue + " stars.";
        } else {
            msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
        }
        responseMessage(msg);*/

      });

      function responseMessage(msg) {
        $('.success-box').fadeIn(200);
        $('.success-box div.text-message').html("<span>" + msg + "</span>");
      }

    },
    error: function (data) {
      alert('Error: ' + data);
    }
  }); // End Service Icons  //End Service Icons
  /* 3. GET & POST info to & from list */

}); // End ready function