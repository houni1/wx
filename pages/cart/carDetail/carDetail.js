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
    formId: ''
  },

  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    console.log('options', options)
    var _this = this;
    wx.getLocation({
      success: function (res) {
        // console.log(res)
        _this.setData({
          hasLocation: true,
          longitude: res.longitude,
          latitude: res.latitude
        })
        _this.getData();
      }
    })
    // console.log(this.data.latitude)
    this.setData({
      userId: app.globalData.authorize_user_id,
      toUserId: options.toUserId || options.saleId,
      id: options.id,
      dataInfo: options
    });
  },
  getData(){
    var _this = this;
    // 获取车型详情信息
    var params = {
      userId: Number(this.data.userId),	        // 当前用户Id [必传]
      toUserId: Number(this.data.toUserId),	    // 被查看用户Id [必传]
      id: Number(this.data.id),	                // 车型Id [必传]
      longitude: this.data.longitude,   // 当前用户经度 [必传]
      latitude: this.data.latitude      // 当前用户纬度 [必传]
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
      console.log('电话按钮统计')
    }) 
  },
  // 跳转到地图页面
  toMap: function (event) {
    var lon = event.currentTarget.dataset.lon;
    var lat = event.currentTarget.dataset.lat;
    wx.navigateTo({
      url: '../address/address?lon=' + lon + '&lat=' + lat,
    })
  },
  previewImage: function (event) {
    var current = event.currentTarget.dataset.imgUrl;
    wx.previewImage({
      current: current,  // 当前显示图片的http链接
      urls: this.data.dataInfo.autoInfo.picture             // 需要预览的图片http链接列表
    })

    // 按钮统计
    var pageType;
    if (this.data.userId == this.data.toUserId) {
      pageType = 8
    } else {
      pageType = 11
    }
    var tjParam = {
      buttonType: 23,
      pageType: pageType,
      appType: 1,
      userId: app.globalData.authorize_user_id,
      formId: this.data.formId
    }
    buttonStat(tjParam).then(function (res) { }) 
  },
  onHide: function () {
    let pages = getCurrentPages();
    let page = pages[0]
    wx.redirectTo({
      url: "../index/index"
    });

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if(res.form == 'button'){
      return {
        title: '',
        path: '/pages/cart/mark/mark?saleId=' + this.data.userId + '&pages=5&type=2' + '&id=' + this.data.id + '&longitude=' + this.data.longitude + '&latitude=' + this.data.latitude,
        imageUrl: this.data.dataInfo.autoInfo.logoUrl,
        success: (res) => {
          // console.log("转发成功", res);
        },
        fail: (res) => {
          // console.log("转发失败", res);
        }
      }
    }
    // 按钮统计
    var tjParam = {
      buttonType: 23,
      pageType: 11,
      appType: 1,
      formId: this.data.formId,
      userId: app.globalData.authorize_user_id
    }
    buttonStat(tjParam).then(function (res) {
      console.log("按钮统计成功")
    }) 
  },
  // 获取formId
  getFormId: function (e) {
    console.log('form获取成功：',e.detail.formId)
    this.setData({
      formId: e.detail.formId
    })
  },
})