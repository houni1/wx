// pages/cart/catlist/catlist.js

let globalData = getApp().globalData;
import { getCatList } from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false, // 请求数据成功后展示
    catlist: [], // 猫哥卫星列表数据
    page: 1,  // 当前默认第几页
    currentPage: 1,  // 当前默认每页几条
    lastPage: 0, // 总页数
    params: {} // 请求猫哥卫星列表数据的参数    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      params: {
        userId: globalData.authorize_user_id,
        page: this.data.page,
        pageNumber: 10
      }
    })
    this.getCatList(this.data.params)
  },

  // 获取猫哥卫星列表数据，默认展示数据
  getCatList: function (params) {
    if (params.page == '1') {
      this.setData({
        catlist: []
      })
    }

    getCatList(params).then(res => {
      if (res) {
        this.setData({
          flag: true
        })
      }
      let catlist = params.page == 1 ? [] : this.data.catlist;
      this.setData({
        catlist: catlist.concat(res.list),
        lastPage: res.page.lastPage,
        currentPage: res.page.currentPage
      })
    })
  },

  // 上拉加载
  scrollBottom: function () {
    // console.log('上拉加载数据')
    if (this.data.params.page == this.data.lastPage) {
      return
    }

    var paramsPage = 'params.page'
    this.setData({
      [paramsPage]: this.data.params.page + 1
    })

    this.getCatList(this.data.params)

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
    wx.hideShareMenu()
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