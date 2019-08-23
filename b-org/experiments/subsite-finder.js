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
    $.each(subsites.d.results, function () {
      getSubSites(this.ServerRelativeUrl, this.Title)
    })
  },
  error: function (subsites) {},
  async: false
})

function getSubSites (SubSiteUrl, SubSiteTitle) {
  console.log(SubSiteUrl)
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
      $.each(subsites.d.results, function(index) {
        getSubSites(this.ServerRelativeUrl, this.Title)
      })
    },
    error: function (subsites) {},
    async: false
  })
}
