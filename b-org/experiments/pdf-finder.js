var wpUrls = []
var wpPage = '';

function getWebPartInfo () {
  function asyncForEach (arr, cb, done) {
    (function next (i) {
      if (i >= arr.length) {
        if (done) done()
        return;
      }
      const stop = i + 1000
      setTimeout(next, 0, stop) // a small trick to defer actions
      while (i < arr.length && i < stop) cb(arr[i], i++, arr)
    })(0)
  }

  function wpGet () {
    $.ajax({
      url:
        _spPageContextInfo.siteAbsoluteUrl +
        '/_api/site/rootweb?$select=Title,ServerRelativeUrl',
      method: 'GET',
      headers: {
        Accept: 'application/json; odata=verbose'
      },
      success: function (rootsite) {},
      error: function (rootsite) {},
      async: false
    })

    $.ajax({
      url:
        _spPageContextInfo.siteAbsoluteUrl +
        '/_api/web/webinfos?$select=ServerRelativeUrl,Title',
      method: 'GET',
      headers: {
        Accept: 'application/json; odata=verbose'
      },
      success: function (subsites) {
        asyncForEach(subsites.d.results, function (el) {
          getSubSites(el.ServerRelativeUrl, el.Title)
        })
      },
      error: function (subsites) {},
      async: false
    })
  }

  function getSubSites (SubSiteUrl, SubSiteTitle) {
    $.ajax({
      url:
        _spPageContextInfo.siteAbsoluteUrl +
        SubSiteUrl +
        '/_api/web/webinfos?$select=ServerRelativeUrl,Title',
      method: 'GET',
      headers: {
        Accept: 'application/json; odata=verbose'
      },
      success: function (subsites) {
        $.each(subsites.d.results, function (index, url) {
          getSubSites(url.ServerRelativeUrl, url.Title)
        })
      },
      complete: function () {
        createUrls()
        function createUrls () {
          $.ajax({
            url:
              "https://browardauthor/" + subs + "_api/web/Lists/getByTitle('Documents')/Items?$select=EncodedAbsUrl",
            method: 'GET',
            headers: {
              Accept: 'application/json; odata=verbose'
            },
            success: function (data) {
              var results = data.d.results
              console.log(results)
              $.each(results, function (index, el) {
                // $.each(results, function (index, result) {
                if (el.EncodedAbsUrl.indexOf('.pdf') > 0) {
                  console.log('PDF')
                  wpUrls.push(wpPage)
                }
              })
            },
            error: function (error) {
              console.log(error)
            },
            async: false
          })
        }
      },
      error: function (subsites) {},
      async: false
    })
  }
  wpGet()
}
/*
function wpList () {
  $.each(wpUrls, function (index, url) {
    $.ajax({
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/json; odata=verbose'
      },
      success: function (data) {
        if (data.toString().indexOf('Masonry Gallery') > 0) {
          var pgUrl = url.split('?')[0]
          console.log(pgUrl)
        } else {
          console.log('~~' + pgUrl + '~~')
        }
      },
      error: function (error) {
        console.log(url, error)
      },
      async: false
    })
  })
} */

getWebPartInfo()
/*
$.when(getWebPartInfo)
  .promise()
  .done(wpList)
  */
