f1 = $.ajax({
  url: "http://bc-net/_api/web/lists/GetByTitle('specialDiscounts')/items",
  method: 'GET',
  headers: {
    'Accept': 'application/json; odata=verbose'
  },
  success: function (data) {
    var items = data.d.results;
    // console.log(items);
    // TODO: var for rating selected by user
    var newRating = 0; // var for rating selected by user to go here
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
  }
});

$.when(f1).done(
f2 = $.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
    method: "POST",
    headers: { "Accept": "application/json; odata=verbose" },
    success: function (data) {
      $('#__REQUESTDIGEST').val(data.d.GetContextWebInformation.FormDigestValue);
    },
    error: function (data, errorCode, errorMessage) {
      alert(errorMessage);
    }
  })
);

$.when(f2).done(
  $.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('specialDiscounts')/items(1)",
    method: 'POST',
    headers: {
      "accept": "application/json;odata=verbose",
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      "content-Type": "application/json;odata=verbose",
      "IF-MATCH": "*",
      "X-HTTP-Method": "MERGE"
    },
    data: "{__metadata:{'type':'SP.Data.listnameListItem'},AvgRating:'" + newAvg + ", RatingCt:'" + newCount + "}",
    /*where Title is column name and you can add more columns by splitting with ,*/
    success: function (data) {
      console.log(data.d.results);
    },
    error: function (error) {
      alert(JSON.stringify(error));
    }
  })
);
