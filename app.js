//app.js
App({
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
    saleId: 12,
    // 微信唯一标识
    authorize_user_id: 12,
    // 是否覆盖信息
    iscover: 0
  }
})