// pages/cart/mycode/mycode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toMailFlag: false, // 发送至邮箱弹框，默认不显示
    focusflag: false, // 弹框弹起默认获取焦点
    // 用户默认信息
    userInfo: {
      exclusiveCode: '', // 用户专属码
      nickName: '吉思洋', // 用户昵称
      company: '大宝汽车贸易有限公司', // 公司
      position: '总经理', // 职位
      phone: '15311111111', // 手机号
      email: '123@qq.com', //邮箱
    }
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

  // 发送至邮箱
  tomail: function () {
    this.setData({
      toMailFlag: true,
      focusflag: true
    })
  }
})