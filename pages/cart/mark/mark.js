// pages/cart/mark/mark.js
let globalData = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      globalData.source = options.type
    }
    if (options.saleId) {
      globalData.saleId = options.saleId
    }
    this.setData({
      page: options.page
    })
    // console.log(globalData.saleId)
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
  // 用户授权
  authResult(data) {
    console.log('授权后的id', globalData.authorize_user_id)
    // 如果从app进入推车猫，并且授权，则跳转至推车猫（查看自己）首页
    if (globalData.source == '1' && globalData.authorize_user_id != '0') {
      wx.reLaunch({
        url: '/pages/cart/index/index'
      })
    } else if (globalData.source == '2' && globalData.saleId != '0') {
      console.log('是从微信进入的，要区分是自己的还是别人的')
      console.log('别人的id', globalData.saleId)
      if (globalData.saleId != globalData.authorize_user_id) {
        // 跳转至别人的页面
        wx.redirectTo({
          url: '/pages/cart/otherpage/otherpage?page=' + this.data.page
        })
      } else {
        console.log('查看自己的页面')
        wx.reLaunch({
          url: '/pages/cart/index/index'
        })
      }
    } else if (globalData.source == '2' && globalData.saleId == '0') {
      console.log('微信扫码进入小程序')
      if (globalData.authorize_user_id != '0') {
        console.log('查看自己的页面')
        wx.reLaunch({
          url: '/pages/cart/index/index'
        })
      }
    }
  },
})