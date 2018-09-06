import { getCarDeatilData, autoDetails } from '../../../servies/services.js';
let WxParse = require('../../../utils/wxParse/wxParse.js');
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
    status: ''      // 上下架状态 1上架 2下架 [非必传]
    // type: ''        // 类型：1 自营 2 一猫[非必传]
  },

  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var _this = this;
    console.log(options)
    this.setData({
      userId: options.userId,
      toUserId: options.toUserId,
      id: options.id,
      // type: options.type,
      longitude: options.longitude,
      latitude: options.latitude,
      dataInfo: options
    });
    // 获取车型详情信息
    var params = {
      userId: this.data.userId,	        // 当前用户Id [必传]
      toUserId: this.data.toUserId,	    // 被查看用户Id [必传]
      id: this.data.id,	                // 车型Id [必传]
      // type: this.data.type,	        // 车型来源： 1：自营 2: 一猫车型 [必传]
      longitude: this.data.longitude,   // 当前用户经度 [必传]
      latitude: this.data.latitude      // 当前用户纬度 [必传]
    };
    autoDetails(params).then(function (res) {
      console.log(res)
      _this.setData({
        dataInfo: res
      });
      // if (!res.param.list) {
      //   var article = res.param;
      //   WxParse.wxParse('article', 'html', article, this, 5);
      // }
      // console.log(this.data.dataInfo)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {

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
    wx.makePhoneCall({
      phoneNumber: telphonenum,
    })
  },
  // 跳转到地图页面
  toMap: function (event) {
    console.log(event);
    var lon = event.currentTarget.dataset.lon;
    var lat = event.currentTarget.dataset.lat;
    wx.navigateTo({
      url: '../address/address?lon=' + lon + '&lat=' + lat,
    })
  },
  /**
   * 生命周期函数--监听页面显示
  */
  onShow: function () {

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
  onShareAppMessage: function (res) {
    if(res.form == 'button'){
      
    }
  }
})
