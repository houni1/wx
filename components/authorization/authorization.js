// components/authorization/authorization.js
import {
  getIndexData,
  wxAuthorization,
  pageStatistics
} from '../../servies/services.js';

let globalData = getApp().globalData;

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 是否显示引导授权弹窗
    isShow: false,
    // 是否需要解析微信个人信息
    wxType: 2
  },

  created () {
    let _this = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo'] && !globalData.isAuthorize) {
          _this.triggerEvent('firstAuth');
          _this.setData({
            isShow: true
          })
          globalData.isAuthorize = true
        } else {
          _this.getAuthorizeUserId(null, 2);
        }
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 授权触发的方法
    getUserInfo(data) {
      let detail = data.detail,
          params = null;
      if (detail.errMsg == "getUserInfo:ok") {
        params = {
          encryptedData: encodeURIComponent(detail.encryptedData),
          iv: encodeURIComponent(detail.iv),
          location: '5'
        }
        this.getAuthorizeUserId(params, 1);
        return;
      }
      this.getAuthorizeUserId(params, 2);
      
    },
    // 获取用户ID
    getAuthorizeUserId (data, wxType) {
      let _this = this,
        params = {};
      if (data != null) {
        params = Object.assign(params, data);
      } else {
        params = Object.assign(params, {
          location: '6'
        });
      }
      wx.login({
        success: function (res) {
          if (res.code) {
            params = Object.assign(params, {
              code: res.code,
              wxType: wxType
            });
            wxAuthorization(params).then(subRes => {
              globalData.authorize_user_id = subRes.authorizeUserId;
              _this.triggerEvent('authResult', subRes.authorizeUserId);
            })
          }
          else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    },
    // 点击授权按钮
    authBtn () {
      this.pageCount('9', '5')
      this.setData({
        isShow: false
      })
    },
    // 暂不登录
    noLogin () {
      this.pageCount('9', '6')
      this.setData({
        isShow: false
      })
      this.getAuthorizeUserId(null, 3)
    },
    // 页面浏览统计
    pageCount: function (page, location) {
      var params = {
        cityId: globalData.currentCity.id,
        authorizeUserId: globalData.authorize_user_id,
        page: page,
        location: location
      }
      pageStatistics(params);
    },
  }
})
