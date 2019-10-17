var wpUrls = []
var wpPage = ''

function getWebPartInfo () {
  function asyncForEach (arr, cb, done) {
    (function next (i) {
      if (i >= arr.length) {
        if (done) done()
        return
      }
      const stop = i + 1000
      setTimeout(next, 0, stop) // a small trick to defer actions
      while (i < arr.length && i < stop) cb(arr[i], i++, arr)
    })(0)
  }

  function wpGet () {
    // get root
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

    // get array of subsites
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
          // get count of PDFs in /Documents folders
          $.ajax({
            url:
              _spPageContextInfo.siteAbsoluteUrl +
              SubSiteUrl +
              "/_api/web/Lists/getByTitle('Documents')/Items?$select=EncodedAbsUrl",
            method: 'GET',
            headers: {
              Accept: 'application/json; odata=verbose'
            },
            success: function (data) {
              var results = data.d.results
              console.log(results)
              $.each(results, function (index, el) {
                // $.each(results, function (index, result) {
                if (el.EncodedAbsUrl.toLowerCase().indexOf('.pdf') > 0) {
                  console.log('PDF')
                  wpPage = el
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

getWebPartInfo()

$.when(getWebPartInfo)
  .promise()
  .done(function () {
    console.log(wpUrls.length)
  })
