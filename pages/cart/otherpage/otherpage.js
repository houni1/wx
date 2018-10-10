// pages/cart/otherpage/otherpage.js
let globalData = getApp().globalData;
import { buttonStat } from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeshow: true,
    carshow: false,
    bushow: false,
    isIPhoneX:0,
    showTab:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()//隐藏右上角分享按钮
    //iPhone X适配
    let _this=this;
    wx.getSystemInfo({
      success: function(res) {
        let name = 'iPhone X'
        if(res.model.indexOf(name) > -1||(res.screenHeight>800&&res.brand=="iPhone")){
          _this.setData({
            isIPhoneX:"35rpx"
          })
        }
      },
      fail(){
        console.log("失败",e)
      }
    })
  },
  //首页显示
  tohome() {
    this.setData({
      showTab:true
    })
    let btnParams = {
      buttonType: '39',
      pageType: '3',
      appType: '1'
    }
    buttonStat(btnParams).then(res => {
    })
    if (this.homeshow) return;
    this.setData({
      homeshow: true,
      carshow: false,
      bushow: false
    })
    wx.setNavigationBarTitle({
      title: "电子名片",
      success() {
      }
    })
  },
  //车源显示
  tosource() {
    if (this.carshow) return;
    this.setData({
      homeshow: false,
      carshow: true,
      bushow: false
    })
    wx.setNavigationBarTitle({
      title: "在售车型",
      success() {
      }
    })
  },
  //车商圈显示
  tocircle() {
    if (this.bushow) return;
    this.setData({
      homeshow: false,
      carshow: false,
      bushow: true
    })
    wx.setNavigationBarTitle({
      title: "车商圈",
      success() {
      }
    })
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
    if (globalData.latitude == 0 || globalData.longitude == 0) {
      this.getLocation();
    }
    this.setData({
      showTab:true
    })
  },
  // 获取地理定位并转化成城市信息，并存入公共空间
  getLocation() {
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      complete(res) {
        console.log(res)
        let errMsg = res.errMsg;
        console.log('errmsg', errMsg)
        if (errMsg == "getLocation:ok") {
          
          _this.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
          globalData.latitude = res.latitude
          globalData.longitude = res.longitude
          wx.getSetting({
            success(res) {
              if (res.authSetting['scope.userLocation']) {
                _this.setData({
                  latitude: res.latitude,
                  longitude: res.longitude
                });
              }
            }
          })
        } else {
          _this.setData({
            isShowShadow: true
          });
        }
      }
    })
  },
  // 关闭弹窗
  toggleShadow(e) {
    let bool = e.currentTarget.dataset.isshow;
    this.setData({
      isShowShadow: bool
    })
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
   
    if (this.data.carshow) {
      this.getData = this.selectComponent("#othersCarInfo");
      this.getData.getBrandListData()
    }
    if (this.data.homeshow) {

      wx.stopPullDownRefresh()

      return;
    }
    if (this.data.bushow) {
      this.business = this.selectComponent("#business");
      this.business.pulldownData()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.carshow) {
      this.getData = this.selectComponent("#othersCarInfo");
      this.getData.onReachBottom()
    }
    if (this.data.bushow) {
      this.business = this.selectComponent("#business");
      this.business.uploadData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '您好，这是我的名片，请惠存',
      path: "pages/cart/mark/mark?type=2&page=2&saleId=" + globalData.saleId,
      success(inres) {
      },
      fail(inerr) {
      }
    }
  },
  onPageScroll(e){
    let _this=this;
    if (this.data.bushow) {
      this.business = this.selectComponent("#business");
      this.business.PageScroll(e)
      this.setData({
        showTab:_this.business.data.showTab
      })
    }
  },
  showTab(){
    this.setData({
      showTab:true
    })
  }
})