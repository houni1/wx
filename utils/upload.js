const uploadImage = function () {
  let _this = this
  return new Promise(resolve => {
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        // console.log(1, res)
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            addImage('album').then(res => {
              resolve(res)
            })
            
          } else if (res.tapIndex == 1) {
            addImage('camera').then(res => {
              resolve(res)
            })
          }
        }
      },
      fail (err) {
        console.log('err', err)
      }
    })
  })
}

// 上传图片
const addImage = function (types) {
  var _this = this;
  return new Promise(resolve => {
    wx.chooseImage({
      count: 2, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [types], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // console.log(res.tempFilePaths[0])
        urlTobase64(res.tempFilePaths[0]).then(res => {
           resolve(res)
        })
      }
    })
  })
  
}

const urlTobase64 = function (url) {
  console.log('aaaaaaa', url)
  var httpUrl = url.replace('wxfile', 'http')
  console.log('httpUrl', httpUrl)
  return new Promise(resolve => {
    wx.request({
      url: url,
      responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
      success: res => {
        let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
        base64 = 'data:image/png;base64,' + base64　//不加上这串字符，在页面无法显示的哦
        console.log('base64base64', base64)
        resolve(base64)//打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
      }
    })
  })
  
}

export { uploadImage };