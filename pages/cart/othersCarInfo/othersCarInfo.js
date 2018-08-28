// pages/cart/othersCarInfo/othersCarInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseBrandIndex: 0,
    chooseBrandIndex_list: -1,
    s_move: false
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
  chooseBrand: function (event) {
    var index = event.currentTarget.dataset.index;
    this.setData({
      chooseBrandIndex: index
    })
  },
  show_move: function () {
    this.setData({
      s_move: !this.data.s_move
    })
  },
  chooseBrand_list: function (event) {
    var index = event.currentTarget.dataset.index;
    this.setData({
      chooseBrandIndex_list: index
    })
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