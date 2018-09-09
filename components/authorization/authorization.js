// components/authorization/authorization.js
import {
  wxAuthorization
} from '../../servies/services.js';

let globalData = getApp().globalData;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否主动弹起授权弹窗
    isInitiativeOpen: {
      type: Boolean,
      value: false
    },
    // 打开名片的的userId，用于跟授权获得的userID做判断，判断是否是本人
    userId: {
      type: String,
      value: ''
    }
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
        // console.log(res)
        // console.log(res.authSetting['scope.userInfo'])
        if ((globalData.source == '1' && !res.authSetting['scope.userInfo']) || (!res.authSetting['scope.userInfo'] && !globalData.isAuthorizeWindowOpen)) {
          _this.triggerEvent('firstAuth');
          _this.setData({
            isShow: true
          })
          globalData.isAuthorizeWindowOpen = true
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
      } else {
        this.goPage();
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
            // console.log(params)
            wxAuthorization(params).then(subRes => {
              globalData.authorize_user_id = subRes.userId;
              globalData.iscover = subRes.status;
              _this.triggerEvent('authResult', subRes.userId);
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
      this.setData({
        isShow: false
      })
    },
    // 暂不登录
    noLogin () {
      this.setData({
        isShow: false
      })
      this.getAuthorizeUserId(null, 3)
      this.goPage();
    },
    // 如果是app进入并且拒绝授权跳转至微信授权引导页面
    goPage () {
      if (globalData.source == '1') {
        wx.redirectTo({
          url: '/pages/cart/isallow/isallow'
        })
      } else if (globalData.source == '2' && globalData.saleId == '0' && globalData.authorize_user_id == '0') {
        wx.redirectTo({
          url: '/pages/cart/isallow/isallow'
        })
      }
    }
  }
})
