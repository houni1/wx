// pages/cart/index/index.js
let globalData = getApp().globalData;
import { getIndexUserInfo, coverOldData, getUserWxPhone, addPhone, buttonStat, starStat } from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,  // 请求数据成功展示
    formId: '', // formId按钮统计
    // 首页用户信息
    userInfo: {
      userId : "",                   // 用户id
      userImg: "",        // 用户头像
      nickName: "",            // 姓名,
      position: "",            // 职位,  
      cityName: "",              // 城市，
      popularity: "",             // 销售人气
      phone: "",         // 手机号,
      email: "",      // 邮箱,
      company: "",   // 企业名称
      authorization: "",           //  1.一猫授权公司 2.非一猫授权公司
    },
    // 猫哥卫星列表
    catlist: [
      {
        checkId: "",                       // 查看人id
        checkName: "",               // 查看人姓名
        checkImg: "",            // 查看人头像
        checkType: "",                      // 查看类型: 1.查看车型 2.查看名片 3.拨打电话 4.分享名片
        sourceType: "",                      // 1.一猫商城 2.非一猫商城
        time: "",    // 查看时间
        tel: "",             // 拨打的电话
        number: ""                       // 同一小时同一用户的查看次数
      }
    ],
    // 请求名片交换的个数
    card: '',
    // 是否覆盖车商猫数据弹框
    isCoverBox: false,
    // 查看更多默认不显示
    moreflag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndexUserInfo()
  },


  // 获取首页个人信息，默认展示数据
  getIndexUserInfo: function () {
    console.log('获取首页个人信息', globalData.authorize_user_id)
    getIndexUserInfo().then(res => {
      if (res) {
        this.setData({
          flag: true,
          card: res.card,
          catlist: res.list,
          userInfo: res.userInfo
        })
        // 处理红点是否显示
        /*
        if (res.card > 0) {
          wx.setTabBarBadge({
            index: 3,
            text: res.card
          })
        }
        */
        if (res.list.length > '0') {
          this.setData({
            moreflag: true
          })
        }
      }
    })
  },

  // formId获取
  formSubmit: function (e) {
    console.log("formId", e.detail.formId)
    this.setData({
      formId: e.detail.formId
    })
  },

  // 有formId的按钮统计
  formStat: function (type) {
    let _this = this;
    console.log("统计中的formId", _this.data.formId)
    buttonStat({ appType: 1, pageType: 1, buttonType: type, formId: _this.data.formId, userId: globalData.authorize_user_id }).then((res) => {
      console.log(_this.data.formId)
      _this.setData({
        formId: ""
      })
      console.log("按钮统计成功")
    })
  },

  // 点击查看更多按钮
  moreCat: function () {
    wx.navigateTo({
      url: '../catlist/catlist'
    })
  },

  // 点击我的名片按钮进入名片页面
  toMyCard: function () {
    let btnParams = {
      buttonType: '3',
      pageType: '1',
      appType: '1'
    }
    buttonStat(btnParams).then(res => {
      console.log(res)
    })
    wx.navigateTo({
      url: '../card/card'
    })
  },

  // 点击名片照片按钮进入名片照片页面
  toCardPic: function () {
    let btnParams = {
      buttonType: '4',
      pageType: '1',
      appType: '1'
    }
    buttonStat(btnParams).then(res => {
      console.log(res)
    })
    wx.navigateTo({
      url: '../cardpic/cardpic'
    })
  },

  // 点击我的专属码按钮进入专属码页面
  toMyCode: function () {
    let btnParams = {
      buttonType: '6',
      pageType: '1',
      appType: '1'
    }
    buttonStat(btnParams).then(res => {
      console.log(res)
    })
    wx.navigateTo({
      url: '../mycode/mycode'
    })
  },

  // 点击预览图片
  lookpic: function (e) {
    var imgurl = []
    imgurl = imgurl.concat(e.currentTarget.dataset.imgurl)
    console.log(typeof imgurl)
    wx.previewImage({
      current: imgurl[0], // 当前显示图片的http链接
      urls: imgurl  // 需要预览的图片链接列表
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
    console.log('首页，信息是否覆盖', globalData.iscover)
    console.log('首页，来源', globalData.source)
    console.log('首页，车商猫上面的id', globalData.saleId)
    if (globalData.iscover == '1' && globalData.source == '1') {
      this.setData({
        isCoverBox: true
      })
    }
    // this.getIndexUserInfo()
  },

  // 拒绝覆盖
  cancel: function () {
    this.setData({
      isCoverBox: false
    })
  },

  // 允许覆盖
  sure: function () {
    var params = {
      userId: globalData.authorize_user_id,
      saleId: globalData.saleId
    }
    coverOldData(params).then(res => {
      console.log(res)
      this.setData({
        isCoverBox: false
      })
      this.getIndexUserInfo()
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
  
  // 点击编辑跳转到推车猫设置页面
  toSetUp: function () {
    this.formStat(1)

    wx.navigateTo({
      url: '../setup/setup'
    })
  },

  // 点击发名片按钮统计
  sendCard: function () {
    let btnParams = {
      userId: globalData.saleId,
      checkId: globalData.authorize_user_id,
      checkType: '4',
      sourceType: '2',
      buttonType: '2',
      pageType: '1',
      type: '3'
    }
    starStat(btnParams).then(res => {
      console.log(res)
    })
  },

  // 获取用户手机号
  getPhoneNumber: function (e) {
    let _this = this
    wx.login({
      success: function (res) {
        if (res.code) {
          _this.setData({
            code: res.code
          })
        }
        if (e.detail.errMsg == 'getPhoneNumber:ok') {
          let params = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            code: _this.data.code
          }

          console.log(params)

          getUserWxPhone(params).then(res => {
            console.log(res)
            if (res.phoneNumber) {
              var phone = 'userInfo.phone'
              _this.setData({
                [phone]: res.phoneNumber
              })
              let addParams = {
                userId: globalData.authorize_user_id,
                phone: res.phoneNumber
              }
              addPhone(addParams).then(res => {
                console.log(res)
              })
            }
          })

        }
      }
    })
  },
  
})