// pages/cart/mark/mark.js
let globalData = getApp().globalData;
import { popStat } from '../../../servies/services.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: '1',  // 调到推车猫的哪个页面
    id: ''  // 车型id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene)
    console.log('扫描小程序专属码的id', scene)
    if (scene == 'undefined') {
      globalData.saleId = '0'
    } else if (scene) {
      globalData.saleId = scene
      this.setData({
        page: '2'
      })
    } 
    // console.log(globalData.saleId)
    if (options.type) {
      globalData.source = options.type
    } else {
      globalData.source = '2'
    }
    // console.log('mark-saleId:', options)
    if (options.saleId) {
      globalData.saleId = options.saleId
    }
    if (options.id) {
      this.setData({
        id: options.id
      })
    }
    if (options.kind) {
      globalData.kind = options.kind
    }
    // console.log('saleId',globalData.saleId)
    if (options.page) {
      this.setData({
        page: options.page,
      })
    }
    // console.log('kind', globalData.kind)
    // console.log('saleId', globalData.saleId)
    // console.log('source', globalData.source)
    // console.log('page', this.data.page)
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
    // console.log('全局的userid', globalData.authorize_user_id)
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
  // 用户授权
  authResult(data) {
    // console.log('授权后的id', globalData.authorize_user_id)
    // console.log('saleId', globalData.saleId)
    // console.log('oldUser', globalData.oldUser)
    // console.log('是否覆盖', globalData.iscover)
    // 如果从app进入推车猫，并且授权，则跳转至推车猫（查看自己）首页
    if (globalData.source == '1' && globalData.authorize_user_id != '0') {
      wx.reLaunch({
        url: '/pages/cart/index/index'
      })
    } else if (this.data.page == '5' && globalData.source == '2') {
      // 跳转至车型详情页面
      // console.log('跳转至车型详情页面')
      wx.redirectTo({
        url: '/pages/cart/carDetail/carDetail?id=' + this.data.id + '&saleId=' + globalData.saleId
      })
    } else if (globalData.source == '2' && globalData.saleId != '0') {
      // console.log('是从微信进入的，要区分是自己的还是别人的')
      // console.log('别人的id', globalData.saleId)
      if (globalData.saleId != globalData.authorize_user_id) {
        // console.log('跳转至别人的页面', this.data.page)

        if (this.data.page == '2') {
          // 跳转至别人的页面
          wx.redirectTo({
            url: '/pages/cart/otherpage/otherpage?page=' + this.data.page
          })
        }
      } else {
        // console.log('查看自己的页面')
        // if (globalData.oldUser == '2') {
        //   wx.reLaunch({
        //     url: '/pages/cart/guide/guide'
        //   })
        // }
        wx.reLaunch({
          url: '/pages/cart/index/index'
        })
      }
    } else if (globalData.source == '2' && globalData.saleId == '0' && globalData.authorize_user_id != '0') {
      // console.log('微信扫描app的码进入小程序')
      // console.log('查看自己的页面')
      wx.reLaunch({
        url: '/pages/cart/index/index'
      })
    }
  },
})