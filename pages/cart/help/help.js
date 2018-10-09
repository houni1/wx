// pages/cart/help/help.js
import { useHelp } from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      content: {},//帮助页面内容
      flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      useHelp({}).then(res => {
          console.log(res)
          this.setData({
              content: res,
              flag:true
          })
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


  /* 跳往电子名片管理页面*/
  goToCard(){
      wx.navigateTo({
          url:'../helpcard/helpcard'
      })
  },


    /* 跳往猫卫星说明页面*/
    goToCat() {
        wx.navigateTo({
            url: '../helpcat/helpcat'
        })
    },

    /* 跳往车商圈说明页面*/
    goToCircle() {
        wx.navigateTo({
            url: '../helpcircle/helpcircle'
        })
    },

    /* 跳往车源列表管理页面*/
    goToCar() {
        wx.navigateTo({
            url: '../helpcar/helpcar'
        })
    }

})