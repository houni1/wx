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
    page: '',       //当前页 [必传]
    brandId: '',    // 品牌id [非必传]
    status: '',     // 上下架状态 1上架 2下架 [非必传]
    type: ''        // 类型：1 自营 2 一猫[非必传]
  },

  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.setData({
      dataInfo: dataObj
    });
    // 获取车型详情信息
    var params = {
      userId: '',	  // 当前用户Id [必传]
      toUserId: '',	  // 被查看用户Id [必传]
      autoId: '',	  // 车型Id [必传]
      type: '',	  // 车型来源： 1：自营 2: 一猫车型 [必传]
      longitude: '', // 当前用户经度 [必传]
      latitude: ''  // 当前用户纬度 [必传]
    };
    autoDetails(params).then(function () {
      console.log(123)
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
  call: function (event) {
    var telphonenum = event.currentTarget.dataset.telphonenum
    wx.makePhoneCall({
      phoneNumber: telphonenum,
    })
  },
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

var dataObj = {
  "autoInfo": {
    "autoId": "12",                                                  // 车型id
    "cover": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg", //封面图
    "logo": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg",  //品牌logo
    "autoName": "江淮 瑞风S2 2017款 1.5L 手动舒适型",                   // 车型名称
    "sourceType": "1",                                                  // 是否是现车 [1 现车|2 期车]
    "carriage": "三厢车",                                              // 级别
    "gearboxType": "手动",                                                // 变速箱
    "displacement": "1.5L",                                                // 排量
    "price": "13.90",                                               // 现价
    "guidePrice": "42.20",                                             // 指导价
    "introduction": "车况优秀",                                            // 车辆简介
    "picture":                                                         // 车辆照片
      [
        "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg",
        "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
      ],
    "paramType": "1",                                                //参数类型(1-正常格式,0-富文本格式)
    "isHave": "1",                  //是否有车图  0：没有  1：车型有图  2：该车型无图但车系有图
  },
  "userInfo": {
    "headPortrait": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3058710977,3970620184&fm=27&gp=0.jpg",                                    // 用户头像
    "nickname": "疯狂",                                                 // 用户昵称
    "phone": "18888888888",                                             // 手机号
    "address": "国创园",                                               // 公司地址
    "distance": "7.5km",                                                // 导航距离
    "shopPicture": "https://img.emao.net/dealer/nd/bdc/jnlx-750x484.jpg",   // 店铺主图
    "longitude": "116.407526",                                            // 店铺经度
    "latitude": "39.904030",                                           // 店铺纬度
  },
  "autoParam":    {
    "name": "基本参数", // - 代表无，● 代表标配，○ 代表选配
    "param": [
      {
        "name": "基本参数",
        "list":
          [
            {
              "name": "一猫价",
              "value": "9.99"
            },
            {
              "name": "变速箱",
              "value": "6AT"
            }
          ]
      },
      {
        "name": "车身",
        "list":
          [
            {
              "name": "长度(mm)",
              "value": "4220"
            },
            {
              "name": "宽度(mm)",
              "value": "1740"
            },
            {
              "name": "高度(mm)",
              "value": "1615"
            },
            {
              "name": "轴距(mm)",
              "value": "2550"
            }
          ]
      },
      {
        "name": "主被动安全",
        "list":
          [
            {
              "name": "并线辅助",
              "value": "●"
            },
            {
              "name": "车道偏离系统",
              "value": "●"
            },
            {
              "name": "后排气帘",
              "value": "○"
            },
            {
              "name": "后排侧气囊",
              "value": "-"
            }
          ]
      }
    ]
  }
}