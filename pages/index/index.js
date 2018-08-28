//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  firstAuth () {
    // 这里是第一次授权触发的动作
  },
  authResult (data) {
    // 这里是授权处理完毕后触发的动作
    // data是授权成功后后台返回的 authorizeUserId
  }
})
