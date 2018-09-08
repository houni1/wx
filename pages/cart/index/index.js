// pages/cart/index/index.js
import { getIndexUserInfo } from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    // 首页用户信息
    userInfo: {
      userId : "",                   // 用户id
      userImg: "",        // 用户头像
      nickName: "",            // 姓名,
      position: "",            // 职位,
      cityName: "",              // 城市，
      popularity: "",             // 销售人气
      phone: "",         // 手机号,
      email: "",      // 邮箱,
      company: "",   // 企业名称
      authorization: "",           //  1.一猫授权公司 2.非一猫授权公司
    },
    // 猫哥卫星列表
    catlist: [
      {
        checkId: "",                       // 查看人id
        checkName: "",               // 查看人姓名
        checkImg: "",            // 查看人头像
        checkType: "",                      // 查看类型: 1.查看车型 2.查看名片 3.拨打电话 4.分享名片
        sourceType: "",                      // 1.一猫商城 2.非一猫商城
        time: "",    // 查看时间
        tel: "",             // 拨打的电话
        number: ""                       // 同一小时同一用户的查看次数
      }
    ],
    // 请求名片交换的个数
    card: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndexUserInfo()
  },


  // 获取首页个人信息，默认展示数据
  getIndexUserInfo: function () {
    console.log('获取首页个人信息')
    getIndexUserInfo().then(res => {
      if (res) {
        this.setData({
          flag: true,
          card: res.card,
          catlist: res.list,
          userInfo: res.userInfo
        })
        // 处理红点是否显示
        if (res.card > 0) {
          wx.setTabBarBadge({
            index: 3,
            text: res.card
          })
        }
      }
    })
  },

  // 点击我的名片按钮进入名片页面
  toMyCard: function () {
    wx.navigateTo({
      url: '../card/card'
    })
  },

  // 点击名片照片按钮进入名片照片页面
  toCardPic: function () {
    wx.navigateTo({
      url: '../cardpic/cardpic'
    })
  },

  // 点击我的专属码按钮进入专属码页面
  toMyCode: function () {
    wx.navigateTo({
      url: '../mycode/mycode'
    })
  },

  // 点击预览图片
  lookpic: function (e) {
    var imgurl = []
    imgurl = imgurl.concat(e.currentTarget.dataset.imgurl)
    console.log(typeof imgurl)
    wx.previewImage({
      current: imgurl[0], // 当前显示图片的http链接
      urls: imgurl  // 需要预览的图片链接列表
    })
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