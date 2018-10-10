// pages/cart/share/share.js
import { creatPoster, sharePoster, buttonStat } from "../../../servies/services.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: "",
    createdAt: "",
    information: "",
    prices: [],//动态图片
    theme: [],
    userQrCode: "",//二维码图片
    swiperCurrent: 0,//当前轮播图索引
    list: [],//海报图片容器
    isShowShadow: false,//是否显示弹窗
    userId: "",
    circleId: "",
    isAll:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()//隐藏右上角分享按钮
    let _this = this;
    let data = {
      userId: options.userId,
      circleId: options.circleId
    }
    sharePoster(data).then((res) => {
      let prices = res.prices;
      if (prices.length == 1) {
        prices[0] = prices[0] + "/254/2"
      }
      if (prices.length > 1) {
        prices.forEach((item, index) => {
          prices[index] = item + "/255/2"
        });
      }
      this.setData({
        nickname: res.nickname,
        createdAt: res.createdAt,
        information: res.information,
        prices: prices,
        theme: res.theme,
        userQrCode: res.userQrCode,
        userId: options.userId,
        circleId: options.circleId
      })
      this.pushimg();
    })
  },
  //按钮统计
  btnStat(type) {
    buttonStat({ appType: 1, pageType: 6, buttonType: type }).then((res) => {
    })
  },
  //海报图片切换时触发
  swiperChange(e) {
    this.btnStat(25)
    this.setData({
      swiperCurrent: e.detail.current,  //获取当前轮播图片的下标
    })
  },
  //点击类型切换时触发
  clickEvent(e) {
    this.btnStat(25)
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  //预览照片
  previewImage(e) {
    let img = e.currentTarget.dataset.url;
    wx.previewImage({
      current: img,
      urls: this.data.list
    })
  },
  //提取出海报路径列表
  pushimg() {
    this.data.theme.forEach(item => {
      this.data.list.push(item.url)
    })
    this.setData({
      list: this.data.list,
    })

  },
  // 获取图片路径并保存
  getImgInfoToSave(src) {
    wx.getImageInfo({
      src: src,
      success: function (sres) {
        wx.saveImageToPhotosAlbum({
          filePath: sres.path,
          success: function (fres) {
            wx.showToast({
              title: "保存成功",
              icon: "success",
            })
          }
        })
      },
      fail() {
      }
    })
  },
  //下载海报
  downPoster() {
    let _this = this;
    creatPoster({ userId: this.data.userId, circleId: this.data.circleId, themeId: this.data.theme[this.data.swiperCurrent].themeId }).then(res => {

      // 判断是否已经授权writePhotosAlbum（保存图片）
      let imgUrl = res.posterPrice;
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                _this.getImgInfoToSave(imgUrl)
              },
              fail() {
                _this.setData({
                  isShowShadow: true
                })
              }
            })
          } else {
            _this.getImgInfoToSave(imgUrl)
          }
        }
      })
    })
  },
  // 关闭弹窗
  toggleShadow(e) {
    this.setData({
      isShowShadow: false
    })
  },
  // 显示全文，收起
  showClose: function(event){ 
    this.data.isAll = !this.data.isAll
    this.setData({
      isAll:  this.data.isAll
    });
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

  }
})