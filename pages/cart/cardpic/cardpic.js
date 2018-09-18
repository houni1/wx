// pages/cart/cardpic/cardpic.js
import { cardMake, getUserInfo, buttonStat } from "../../../servies/services.js";
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formId: '',
    background: "/images/banner.jpg",//背景图片
    exclusiveCode: "",//专属码
    nickName: "",//用户昵称
    position: "",
    phone: "",
    company: "",
    img: "",
    isShowShadow: false//是否显示弹窗
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()//隐藏右上角分享按钮
    cardMake({ userId: globalData.authorize_user_id }).then((res) => {
      this.setData({
        img: res.img
      })
    })
    getUserInfo({ userId: globalData.authorize_user_id }).then(res => {
      this.setData({
        exclusiveCode: res.exclusiveCode,
        nickName: res.nickName,
        position: res.position,
        phone: res.phone,
        company: res.company
      })
    })
  },
  // formId获取
  formSubmit: function (e) {
    this.setData({
      formId: e.detail.formId
    })
  },

  // 有formId的按钮统计
  formStat: function (type) {
    let _this = this;
    buttonStat({ appType: 1, pageType: 4, buttonType: type, formId: _this.data.formId, userId: globalData.authorize_user_id }).then((res) => {
      _this.setData({
        formId: ""
      })
    })
  },
  // 保存图片
  saveImg() {
    this.formStat(12)
    let _this = this;
    // 获取图片路径并保存
    function getImgInfoToSave(src) {
      wx.getImageInfo({
        src: src,
        success: function (sres) {
          wx.saveImageToPhotosAlbum({
            filePath: sres.path,
            success: function (fres) {
              wx.showToast({
                title: "图片保存成功",
                icon: "success",
              })
            }
          })
        },
        fail() {

        }
      })
    }
    // 判断是否已经授权writePhotosAlbum（保存图片）
    let imgUrl = this.data.img;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              getImgInfoToSave(imgUrl)
            },
            fail() {
              _this.setData({
                isShowShadow: true
              })
            }
          })
        } else {
          getImgInfoToSave(imgUrl)
        }
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
  // 关闭弹窗
  toggleShadow(e) {
    this.setData({
      isShowShadow: false
    })
  }
})