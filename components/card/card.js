// components/card/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户默认信息
    userInfo: {
      headPortrait: '',    // 头像
      nickName: '吉思洋', // 用户昵称
      position: '总经理', // 职位
      popularity: "30",  // 销售人气
      provinceName: '山西', // 省名
      company: '大宝汽车贸易有限公司', // 公司
      companyAddress: '北京市密云区经济开发区西通路八号西田各庄政府办公大楼1301', // 公司地址
      phone: '15311111111', // 手机号
      email: '123@qq.com', //邮箱
      wechatNumber: '15311111111',  // 微信号
      introduction: '我叫XXX，来自XXX...',   // 个人介绍
      userAlbum: [] // 图片展示
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
  // 复制手机号
  setPhoneToClipboard() {
    setClipboard(this.data.phone)
  },
  // 复制微信号
  setWeChatToClipboard() {
    setClipboard(this.data.phone)
  },
  // 复制邮箱号
  setEMallToClipboard() {
    setClipboard(this.data.phone)
  },
  // 复制公司名字
  setNameToClipboard() {
    setClipboard(this.data.phone)
  }
})