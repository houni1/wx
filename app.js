//app.js

// 阿拉丁基本配置
const ald = require('./utils/ald-stat.js')
App({
  onShow: function (options) {
    const _this = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: "https://tcmapi.emao.com/cart/login/wxAuthorization",
          data: {
            code: res.code, //向后端发送jscode，由后端向微信请求拿到openid和session_key，返回给前端。 
            source: _this.globalData.source       
          },
          header: {
            "Accept": "application/json; version=3.13.0",
            "X-Emao-TCM-WeChat": "1"
          },
          method: "get",
          success: function (res) { //拿到openid和session_key
            // console.log('阿拉丁', res.data.data)
            // 调用sendOpenid方法，将openid以参数形式传入
            _this.aldstat.sendOpenid(res.data.data.openid)
            // 调用sendSession方法，将session_key以参数形式传入
            _this.aldstat.sendSession(res.data.data.sessionKey)
          }
        })
      }
    })
  },
  globalData: {
    // 全局域名
    apiUrl: 'https://tcmapi.emao.com',
    // 授权信息
    userInfo: null,
    // 是否弹起过授权弹窗
    isAuthorizeWindowOpen: false,
    // 是否是本人
    isMe: false,
    // 来源
    source: '',
    // 链接上的id
    saleId: 0,
    // 微信唯一标识
    authorize_user_id: 0,
    // 是否覆盖信息
    iscover: 0
  },
  onHide: function () {
    if (this.data.enterType == 'self') {
      console.log('other')
      wx.switchTab({
        url: '/pages/cart/index/index',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
      })
    }
  }
})