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
    wxParseData: ''
  },

  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    console.log(123, options)
    var _this = this;
    this.setData({
      userId: app.globalData.authorize_user_id,
      toUserId: options.toUserId,
      id: options.id,
      longitude: options.longitude,
      latitude: options.latitude,
      dataInfo: options
    });
    // 获取车型详情信息
    var params = {
      userId: this.data.userId,	        // 当前用户Id [必传]
      toUserId: this.data.toUserId,	    // 被查看用户Id [必传]
      id: this.data.id,	                // 车型Id [必传]
      longitude: this.data.longitude,   // 当前用户经度 [必传]
      latitude: this.data.latitude      // 当前用户纬度 [必传]
    };
    console.log(params)
    autoDetails(params).then(function (res) {
      console.log(res)
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
  // 打电话
  call: function (event) {
    var telphonenum = event.currentTarget.dataset.telphonenum
    if (telphonenum) {
      wx.makePhoneCall({
        phoneNumber: telphonenum
      })
    } else {
      wx.showToast({
        title: '没有找到电话'
      })
    }
    var tjParam = {
      buttonType: 11,
      pageType: 11,
      appType: 1
    }
    buttonStat(tjParam).then(function (res) { }) 
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
    console.log(event)
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
      appType: 1
    }
    buttonStat(tjParam).then(function (res) { }) 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if(res.form == 'button'){
      return {
        title: '',
        path: '/pages/cart/mark/mark?saleId=' + this.data.userId + '&pages=5&type=2' + '&id=' + this.data.id,
        imageUrl: this.data.dataInfo.autoInfo.logoUrl,
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    }
    // 按钮统计
    var tjParam = {
      buttonType: 23,
      pageType: 11,
      appType: 1
    }
    buttonStat(tjParam).then(function (res) { }) 
  }
})