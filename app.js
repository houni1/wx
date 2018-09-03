//app.js
App({
  globalData: {
    apiUrl: 'https://tcmapi.emao.com',
    // 授权信息
    userInfo: null,
    // 是否弹起过授权弹窗
    isAuthorizeWindowOpen: false,
    // 是否是本人
    isMe: false,
    // 来源
    isSourceApp: false
  }
})