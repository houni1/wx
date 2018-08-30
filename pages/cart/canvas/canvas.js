// pages/cart/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },


  fetch: function () {
    wx.chooseImage({
      count: 1,
      success: res => {
        //获取图片的宽高
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: res => {
            this.setData({
              imgWidth: res.width,
              imgHeight: res.height
            })
          }
        })

        let canvas = wx.createCanvasContext('myCanvas')

        canvas.drawImage(res.tempFilePaths[0], 0, 0, this.data.imgWidth, this.data.imgHeight) // 1. 绘制图片至canvas
        // 绘制完成后执行回调
        canvas.draw(false, () => {
          // 2. 获取图像数据
          wx.canvasGetImageData({
            canvasId: 'canvas',
            x: 0,
            y: 0,
            width: this.data.imgWidth,
            height: this.data.imgHeight,
            success(res) {
              console.log('success', res)
              // 3. png编码
              let pngData = upng.encode([res.data.buffer], res.width, res.height)
              // 4. base64编码
              let base64 = wx.arrayBufferToBase64(pngData)
              console.log(base64)
              // ...
            },
            fail(res) {
              console.log('fail', res)
            }
          })
        })
      }
    })
  }
})