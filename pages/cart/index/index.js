// pages/cart/index/index.js
let globalData = getApp().globalData;
import { getIndexUserInfo, coverOldData, getUserWxPhone, addPhone, buttonStat, starStat } from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    network: true, // 无网络连接
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
    moreflag: false,
    // 全局的是否覆盖值
    // iscover: '1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // 监听网络连接
    wx.getNetworkType({
      success(res) {
        // console.log(res.networkType)
        if (res.networkType == "none") {
          _this.setData({
            network: false
          })
          wx.hideLoading()
          return;
        }
      }
    })
    _this.getIndexUserInfo()
  },

  // 获取首页个人信息，默认展示数据
  getIndexUserInfo: function () {
    // console.log('获取首页个人信息', globalData.authorize_user_id)
    getIndexUserInfo().then(res => {
      // console.log('首页头像路径', res.userInfo.userImg)
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
        if (res.list.length > '4') {
          this.setData({
            moreflag: true
          })
        }
      }
    })
  },

  // 名片申请
  goToCardcase: function () {
    wx.navigateTo({
      url: '../cardcase/cardcase'
    })
  },

  // formId获取
  formSubmit: function (e) {
    // console.log("formId", e.detail.formId)
    this.setData({
      formId: e.detail.formId
    })
    // console.log('获取formId', this.data.formId)
  },

  // 有formId的按钮统计
  formStat: function (type) {
    let _this = this;
    // console.log("统计中的formId", _this.data.formId)
    buttonStat({ appType: 1, pageType: 1, buttonType: type, formId: _this.data.formId, userId: globalData.authorize_user_id }).then((res) => {
      // console.log(_this.data.formId)
      _this.setData({
        formId: ""
      })
      // console.log("按钮统计成功")
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
    this.formStat(3)
    wx.navigateTo({
      url: '../card/card'
    })
  },

  // 点击名片照片按钮进入名片照片页面
  toCardPic: function () {
    this.formStat(4)
    wx.navigateTo({
      url: '../cardpic/cardpic'
    })
  },

  // 点击我的专属码按钮进入专属码页面
  toMyCode: function () {
    this.formStat(6)
    wx.navigateTo({
      url: '../mycode/mycode'
    })
  },

  // 点击预览图片
  lookpic: function (e) {
    var imgurl = []
    imgurl = imgurl.concat(e.currentTarget.dataset.imgurl)
    // console.log(typeof imgurl)
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
    wx.hideShareMenu()
    this.formStat(7)
    // console.log('全局是否覆盖的值', globalData.iscover)
    // console.log('首页全局，信息是否覆盖', this.data.iscover)
    // console.log('首页，来源', globalData.source)
    // console.log('是否覆盖初始化', this.data.isCoverBox)
    // console.log('首页，车商猫上面的id', globalData.saleId)
    
    if (globalData.iscover == '1' && globalData.source == '1') {
      this.setData({
        isCoverBox: true
      })
      // console.log('是否覆盖，弹窗弹起', this.data.isCoverBox)
    }
    this.getIndexUserInfo()
  },

  // 拒绝覆盖
  cancel: function () {
    this.setData({
      isCoverBox: false
    })
    globalData.iscover = '2'
    // console.log('取消覆盖', globalData.iscover)
  },

  // 允许覆盖
  sure: function () {
    var params = {
      userId: globalData.authorize_user_id,
      saleId: globalData.saleId
    }
    coverOldData(params).then(res => {
      // console.log(res)
      this.setData({
        isCoverBox: false
      })
      globalData.iscover = '2'
      // console.log('允许覆盖', globalData.iscover)
      if (globalData.iscover == '2') {
        this.getIndexUserInfo()
      }
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
    // console.log('下拉刷新')
    this.getIndexUserInfo()
    // 停止下拉动作
    // console.log('停止下拉动作')
    wx.stopPullDownRefresh();
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
    // console.log('转发好友')

    if (ops.from === 'button') {
      // 来自页面内转发按钮
      // console.log(ops.target)
    }
    return {
      title: '您好，这是我的名片，请惠存',
      path: "pages/cart/mark/mark?type=2&page=2&saleId=" + globalData.authorize_user_id,
      success(inres) {
        // console.log("转发成功", inres);
      },
      fail(inerr) {
        // console.log("转发失败", inerr);
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

    // console.log('猫哥卫星统计传参', btnParams)
    setTimeout(() => {
      starStat(btnParams).then(res => {
        // console.log(res)
      })
    }, 500)
  },

  // 点击猫哥卫星列表头像进入对方名片页面
  toCard: function (e) {
    var saleId = e.currentTarget.dataset.checkid
    globalData.saleId = saleId
    wx.navigateTo({
      url: '../otherpage/otherpage',
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

          // console.log(params)

          getUserWxPhone(params).then(res => {
            // console.log(res)
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
                // console.log(res)
              })
            } else {
              console.log("手机号获取失败")
            }
          })

        }
      }
    })
  },
  
})
wx.onNetworkStatusChange((res) => {
  let pages = getCurrentPages();
  let page = pages[pages.length - 1];
  page.setData({
    network: res.isConnected
  })
  if (!res.isConnected) {
    wx.hideLoading()
  } else {
    wx.showLoading();
    page.onLoad()
    wx.hideLoading()
  }
})