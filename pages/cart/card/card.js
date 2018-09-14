// pages/cart/card/card.js
let globalData = getApp().globalData;
import { setClipboard } from '../../../utils/util.js';
import { getUserInfo, starStat } from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 请求数据成功后展示页面
    flag: false,
    // 用户默认信息
    userInfo: {
      headPortrait: '',    // 头像
      nickName: '', // 用户昵称
      position: '', // 职位
      popularity: "",  // 销售人气
      provinceName: '', // 省名
      company: '', // 公司
      companyAddress: '', // 公司地址
      phone: '', // 手机号
      email: '', //邮箱
      wechatNumber: '',  // 微信号
      introduction: '',   // 个人介绍
      userAlbum: [] // 图片展示
    }
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
          userInfo: res
        })
      }
    })
  },

  // 点击返回首页
  toHome: function () {
    wx.switchTab({
      url: '/pages/cart/index/index'
    })
  },

  // 点击预览头像
  lookHeaderpic: function (e) {
    let btnParams = {
      buttonType: '34',
      pageType: '3',
      appType: '1'
    }
    buttonStat(btnParams).then(res => {
      console.log(res)
    })
    var imgurl = []
    imgurl = imgurl.concat(e.currentTarget.dataset.imgurl)
    console.log(typeof imgurl)
    wx.previewImage({
      current: imgurl[0], // 当前显示图片的http链接
      urls: imgurl  // 需要预览的图片链接列表
    })
  },

  // 点击预览图片
  lookpic: function (e) {
    var imgurl = e.currentTarget.dataset.imgurl
    wx.previewImage({
      current: imgurl, // 当前显示图片的http链接
      urls: this.data.userInfo.userAlbum // 需要预览的图片http链接列表
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

  // 点击发名片
  sendCard: function () {
    let btnParams = {
      userId: globalData.saleId,
      checkId: globalData.authorize_user_id,
      checkType: '4',
      sourceType: '2',
      buttonType: '2',
      pageType: '3',
      type: '3'
    }

    console.log('猫哥卫星统计传参', btnParams)
    starStat(btnParams).then(res => {
      console.log(res)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    console.log('转发好友')
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '推车猫小程序',
      path: "pages/cart/mark/mark?type=2&page=2&saleId=" + globalData.authorize_user_id,
      success(inres) {
        console.log("转发成功", inres);
      },
      fail(inerr) {
        console.log("转发失败", inerr);
      }
    }
  },


  // 复制手机号
  setPhoneToClipboard() {
    setClipboard(this.data.userInfo.phone)
  },
  // 复制微信号
  setWeChatToClipboard() {
    setClipboard(this.data.userInfo.wechatNumber)
  },
  // 复制邮箱号
  setEMallToClipboard() {
    setClipboard(this.data.userInfo.email)
  },
  // 复制公司名字
  setNameToClipboard() {
    setClipboard(this.data.userInfo.company)
  }
})