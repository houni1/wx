// pages/cart/mycode/mycode.js
let globalData = getApp().globalData;
import { getUserInfo, sendEmail } from '../../../servies/services.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false, // 请求数据成功后展示默认数据
    toMailFlag: false, // 发送至邮箱弹框，默认不显示
    focusflag: false, // 弹框弹起默认获取焦点
    // 用户默认信息
    userInfo: {
      exclusiveCode: '', // 用户专属码
      nickName: '', // 用户昵称
      company: '', // 公司
      position: '', // 职位
      phone: '', // 手机号
      email: '', //邮箱
    },
    email: '' // 弹框邮箱
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },

  // 获取个人信息，默认展示数据
  getUserInfo: function () {
    let data = {
      userId: globalData.authorize_user_id
    }
    getUserInfo(data).then(res => {
      if (res) {
        this.setData({
          flag: true,
          userInfo: res,
          imageList: res.userAlbum,
          email: res.email
        })
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

  // 发送至邮箱
  tomail: function () {
    this.setData({
      toMailFlag: true,
      focusflag: true
    })
  },

  // 点击取消弹窗收起
  cancel: function () {
    this.setData({
      toMailFlag: false,
      focusflag: false
    })
    this.setData({
      email: ''
    })
  },

  // 改变邮箱地址发送
  email: function (e) {
    this.setData({
      email: e.detail.value
    })
  },

  // 点击弹框确定按钮发送至邮箱
  sure: function () {
    console.log(this.data.email)
    var emailReg = /^\w+\@+[0-9a-zA-Z]+\.(com|com.cn|edu|hk|cn|net)$/;
    if (emailReg.test(this.data.email)) {
      let params = {
        email: this.data.email,
        userId: globalData.authorize_user_id
      }
      sendEmail(params).then(res => {
        console.log(res)
        this.setData({
          toMailFlag: false,
          focusflag: false
        })
      })
    } else {
      wx.showToast({
        title: '邮箱格式有误，请重新输入',
        icon: 'none'
      })
      this.setData({
        email: ''
      })
    }

  }
})