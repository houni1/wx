import { getCarDeatilData, autoDetails, buttonStat } from '../../../servies/services.js';
let WxParse = require('../../../utils/wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
  */
  data: {
    wxParseData: '',
    dataInfo: {},
    isOpen: false,
    userId: '',     // 当前用户Id [必传]
    toUserId: '',   // 被查看用户Id [必传]
    id: '',         // 车型id
    page: '',       //当前页 [必传]
    brandId: '',    // 品牌id [非必传]
    status: '',      // 上下架状态 1上架 2下架 [非必传]
    autoParam: [],
    wxParseData: '',
    longitude: '',
    latitude: '',
    formId: '',
    enterType: ''
  },
  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    console.log(options)
    var _this = this;
    var enterType = options.enterType;
    this.setData({
      userId: app.globalData.authorize_user_id,
      toUserId: options.toUserId || options.saleId,
      id: options.id,
      dataInfo: options,
      enterType: enterType,
      latitude: options.latitude || 0,
      longitude: options.longitude || 0
    });
    if (enterType == "self") {
      var tjParam = {
        buttonType: 26,
        pageType: 7,
        appType: 1,
        formId: this.data.formId,                     // 模版ID
        userId: app.globalData.authorize_user_id,     // 用户ID
      }
      buttonStat(tjParam).then(function (res) { 
        // console.log('在售车型商品图片区域')
      }) 
    } else if (enterType == "other") {
      var tjParam = {
        buttonType: 26,
        pageType: 10,
        appType: 1,
        formId: this.data.formId,                     // 模版ID
        userId: app.globalData.authorize_user_id,     // 用户ID
      }
      buttonStat(tjParam).then(function (res) { 
        // console.log('其他车源商品图片区域')
      }) 
    }
    _this.getData();
  },
  getData(){
    var _this = this;
    // 获取车型详情信息
    var params = {
      userId: Number(this.data.userId),	        // 当前用户Id [必传]
      toUserId: Number(this.data.toUserId),	    // 被查看用户Id [必传]
      id: Number(this.data.id),	                // 车型Id [必传]
      longitude: this.data.longitude || 0,      // 当前用户经度 [必传]
      latitude: this.data.latitude || 0         // 当前用户纬度 [必传]
    };
    autoDetails(params).then(function (res) {
      _this.setData({
        dataInfo: res,
        autoParam: res.autoParam.list ? res.autoParam.list[0].param : res.autoParam,
      });
      if (!res.autoParam.list) {
        var article = res.autoParam;
        WxParse.wxParse('article', 'html', article, _this, 5);
      }
    })
  },
  /**
   * 控制参数配置的显示隐藏
  */
  isOpen: function () {
    this.setData({
      isOpen: !this.data.isOpen
    });
  },
  // 获取formId
  getFormId: function (e) {
    this.setData({
      formId: e.detail.formId
    })
  },
  // 打电话
  call: function (event) {
    var telphonenum = event.currentTarget.dataset.telphonenum
    wx.makePhoneCall({
      phoneNumber: telphonenum
    })
    var tjParam = {
      buttonType: 11,
      pageType: 11,
      appType: 1,
      formId: this.data.formId,     // 模版ID
      userId: app.globalData.authorize_user_id,     // 用户ID
    }
    buttonStat(tjParam).then(function (res) { 
      // console.log('电话按钮统计')
    }) 
  },
  // 跳转到地图页面
  toMap: function (event) {
    // 导航按钮统计
    var tjParam = {
      buttonType: 33,
      pageType: 11,
      appType: 1,
      formId: this.data.formId,
      userId: app.globalData.authorize_user_id
    }
    var lon = event.currentTarget.dataset.lon;
    var lat = event.currentTarget.dataset.lat;
    if (lon && lat) {
      buttonStat(tjParam).then(function (res) {
      // console.log("导航按钮统计成功")
      }) 
      wx.navigateTo({
        url: '../address/address?lon=' + lon + '&lat=' + lat,
      }) 
    } else {
      wx.showToast({
        title: '暂无法获取到地址信息',
        icon: 'none',
        duration: 2000,
        success: function () {
          setTimeout(function(){
            buttonStat(tjParam).then(function (res) {
              // console.log("导航按钮统计成功")
            })
          },2000)
          
        }
      })
    }
      
  },
  previewImage: function (event) {
    var current = event.currentTarget.dataset.imgUrl;
    wx.previewImage({
      current: current,  // 当前显示图片的http链接
      urls: this.data.dataInfo.autoInfo.picture             // 需要预览的图片http链接列表
    })
  },
  /**
   * 用户点击右上角分享
  */
  onShareAppMessage: function (res, e) {
    var _this = this
    return {
      title: _this.data.dataInfo.autoInfo.autoName,
      path: '/pages/cart/mark/mark?saleId=' + _this.data.userId + '&page=5&type=2&id=' + res.target.dataset.id,
      imageUrl: _this.data.dataInfo.autoInfo.cover,
      success: (res) => {
        // console.log("转发成功", res);
        // 按钮统计
        var tjParam = {
          buttonType: 33,
          pageType: 11,
          appType: 1,
          formId: this.data.formId,
          userId: app.globalData.authorize_user_id
        }
        buttonStat(tjParam).then(function (res) {
          // console.log("分享按钮统计成功")
        }) 
      },
      fail: (res) => {
        // console.log("转发失败", res);
      }
    }
    var event = e || event;
    event.stopPropagation();
  },
  // 获取formId
  getFormId: function (e) {
    this.setData({
      formId: e.detail.formId
    })
  },
  // 头像区域统计
  storeStatistics: function () {
    // 按钮统计
    var tjParam = {
      buttonType: 34,
      pageType: 11,
      appType: 1,
      formId: this.data.formId,
      userId: app.globalData.authorize_user_id
    }
    buttonStat(tjParam).then(function (res) {
      // console.log("按钮统计成功")
    }) 
  }
})
