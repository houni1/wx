// pages/cart/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 首页用户信息
    userInfo: {
      userId : "1",                   // 用户id
      userImg: "1231231.png",        // 用户头像
      nickName: "吉思洋",            // 姓名,
      position: "总经理",            // 职位,
      cityName: "北京",              // 城市，
      popularity: "30",             // 销售人气
      phone: "130xxxxxxxx",         // 手机号,
      email: "1140222@qq.com",      // 邮箱,
      company: "大宝汽车贸易公司",   // 企业名称
      authorization: "2",           //  1.一猫授权公司 2.非一猫授权公司
    },
    // 猫哥卫星列表
    carlist: [
      {
        checkId: "2",                       // 查看人id
        checkName: "大禹治水",               // 查看人姓名
        checkImg: "12332234.png",            // 查看人头像
        checkType: "3",                      // 查看类型: 1.查看车型 2.查看名片 3.拨打电话 4.分享名片
        sourceType: "1",                      // 1.一猫商城 2.非一猫商城
        time: "2018-08-27 12:00:00",    // 查看时间
        tel: "13697855689",             // 拨打的电话
        number: "2"                       // 同一小时同一用户的查看次数
      }, 
      {
        checkId: "2",                       // 查看人id
        checkName: "luyaoya",               // 查看人姓名
        checkImg: "12332234.png",            // 查看人头像
        checkType: "1",                      // 查看类型: 1.查看车型 2.查看名片 3.拨打电话 4.分享名片
        sourceType: "2",                      // 1.一猫商城 2.非一猫商城
        time: "2018-08-27 12:00:00",    // 查看时间
        tel: "15110089876",             // 拨打的电话
        number: "8"                       // 同一小时同一用户的查看次数
      }
    ],
    // 请求名片交换的个数
    card: '3'
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
  // 点击编辑跳转到推车猫设置页面
  toSetUp: function () {
    wx.navigateTo({
      url: '../setup/setup'
    })
  }
})