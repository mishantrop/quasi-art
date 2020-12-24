var myimagerenderer = function(value, metaData, record, rowIndex, colIndex, store) {
  if (value) {
    var baseUrl = MODx.config.collections_renderer_basepath_img
    console.log('baseUrl: ' + baseUrl)
    console.log('value: ' + value)
    if (value.indexOf('http://') === 0) {
      baseUrl = ''
    }
    return '<div class="myimagerenderer"><img src="' + baseUrl + value + '" style="width: 100px;" alt="" /></div>'
  }
}
