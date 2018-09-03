// pages/cart/carDetail/carDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen: false
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
   * 控制参数配置的显示隐藏
   */
  isOpen: function () {
    this.setData({
      isOpen: !this.data.isOpen
    });
  },
  call: function (event) {
    var telphonenum = event.currentTarget.dataset.telphonenum
    wx.makePhoneCall({
      phoneNumber: telphonenum,
    })
  },
  toMap: function (event) {
    wx.navigateTo({
      url: '../address/address',
    })
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

  }
})