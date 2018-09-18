// pages/cart/isallow/isallow.js
import { wxAuthorization } from '../../../servies/services.js';
let globalData = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
    wx.hideShareMenu()
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

  // 授权触发的方法
  getUserInfo(data) {
    let detail = data.detail,
      params = null;
    if (detail.errMsg == "getUserInfo:ok") {
      params = {
        encryptedData: detail.encryptedData,
        iv: detail.iv
      }
      this.getAuthorizeUserId(params, 1);
      return;
    }
  },
  // 获取用户ID
  getAuthorizeUserId(data, wxType) {
    let _this = this,
      params = {};
    if (data != null) {
      params = Object.assign(params, data);
    }
    wx.login({
      success: function (res) {
        if (res.code) {
          params = Object.assign(params, {
            code: res.code,
            wxType: wxType,
            saleId: globalData.saleId,
            source: globalData.source
          });
          // console.log('强制授权页面传参', params)
          wxAuthorization(params).then(subRes => {
            globalData.authorize_user_id = subRes.userId;
            // console.log('aaaa', globalData.authorize_user_id)
            // 强制授权页面点击微信授权允许按钮得到userid跳转到首页渲染数据
            if (globalData.authorize_user_id != '0') {
              // console.log('跳转页面')
              wx.reLaunch({
                url: '/pages/cart/index/index?userId=' + globalData.authorize_user_id
              })
            }
          })
        }
        else {
          // console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }
})