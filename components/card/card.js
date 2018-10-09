// components/card/card.js
let globalData = getApp().globalData;
import { setClipboard } from '../../utils/util.js';
import { getUserInfo, changeCard, popStat, buttonStat, starStat, wxAuthorization } from '../../servies/services.js';
Component({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取全局的userid,判断创建/进入我的名片
    cardText: 0,
    // 请求数据成功后展示页面内容
    flag: false,
    // 用户默认信息
    userInfo: {
      headPortrait: '',         // 头像
      nickName: '',             // 用户昵称
      position: '',             // 职位
      popularity: "",           // 销售人气
      provinceName: '',         // 省名
      company: '',              // 公司
      companyAddress: '',       // 公司地址
      phone: '',                // 手机号
      email: '',                //邮箱
      wechatNumber: '',         // 微信号
      introduction: '',         // 个人介绍
      userAlbum: []             // 图片展示
    }
  },

  created () {
    // console.log('别人名片组件初始化')
    this.getUserInfo()
    // console.log('用户授权的id,别人页面', typeof globalData.authorize_user_id)
    this.setData({
      cardText: globalData.authorize_user_id
    })
    // console.log('用户授权的id,别人页面', typeof this.data.cardText)
    // console.log('cardText == 0', this.data.cardText == 0)
    // console.log('cardText != 0', this.data.cardText != 0)
  },

  ready () {
    // console.log('用户授权的id,别人页面', globalData.authorize_user_id)
    this.setData({
      cardText: globalData.authorize_user_id
    })
    // console.log('用户授权的id,别人页面', this.data.cardText)
    // console.log('otherpage-kind', globalData.kind)
    // 如果从一猫汽车商城进入推车猫，通过kind判断，不用加猫哥卫星统计
    if (globalData.kind != '3') {
      let btnParams = {
        userId: globalData.saleId,
        checkId: globalData.authorize_user_id,
        checkType: '2',
        sourceType: '2',
        buttonType: '22',
        pageType: '3',
        type: '3'
      }

      // console.log('猫哥卫星统计传参', btnParams)
      starStat(btnParams).then(res => {
        // console.log(res)
      })
    }
  },

  methods:{
  // 获取个人信息，默认展示数据
  getUserInfo: function () {
    let data = {
      userId: globalData.saleId
    }

    // console.log('别人的名片页面saleId获取信息', globalData.saleId)
    getUserInfo(data).then(res => {
      if (res) {
        this.setData({
          flag: true,
          userInfo: res
        })
      }
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
      // console.log(res)
    })
    var imgurl = []
    imgurl = imgurl.concat(e.currentTarget.dataset.imgurl)
    // console.log(typeof imgurl)
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
  },
  // 添加通讯录
  addToAddressBook() {
    let btnParams = {
      buttonType: '18',
      pageType: '3',
      appType: '1'
    }
    buttonStat(btnParams).then(res => {
      // console.log(res)
    })
    // 添加到手机通讯录
    wx.addPhoneContact({
      firstName: this.data.userInfo.nickName,//联系人姓名
      mobilePhoneNumber: this.data.userInfo.phone,//联系人手机号
      organization: this.data.userInfo.company,  // 公司地址
      email: this.data.userInfo.email           // 邮箱
    })
  },

  // 交换名片
  changeCard: function () {
    let btnParams = {
      userId: globalData.saleId,
      checkId: globalData.authorize_user_id,
      checkType: '5',
      sourceType: '2',
      buttonType: '17',
      pageType: '3',
      type: '2'
    }
    starStat(btnParams).then(res => {
      // console.log(res)
    })
    let params = {
      requestId: globalData.authorize_user_id,
      beRequestId: globalData.saleId
    }
    changeCard(params).then(res => {
      // console.log(res)
      setTimeout(()=>{
        wx.showToast({
          title: '已发送申请',
          icon: 'none',
          duration: 1500
        })
      },500)
    })
  },


  // 进入我的名片
  inMyCard: function () {
    console.log('进入我的名片按钮统计')
    let btnParams = {
      buttonType: '20',
      pageType: '3',
      appType: '1'
    }
    buttonStat(btnParams).then(res => {
      // console.log(res)
    })
    // wx.navigateTo({
    //   url: '/pages/cart/card/card',
    // })
    wx.switchTab({
      url: '/pages/cart/index/index'
    })
  },

  // 创建我的名片
  createMyCard: function () {
    console.log('创建我的名片按钮统计')
    let btnParams = {
      buttonType: '19',
      pageType: '3',
      appType: '1'
    }
    buttonStat(btnParams).then(res => {
      // console.log(res)
    })
  },

  // 授权触发的方法
  cartedmyCard(data) {
    console.log('创建我的名片点击出弹框')
    let detail = data.detail,
      params = null;
    if (detail.errMsg == "getUserInfo:ok") {
      params = {
        encryptedData: detail.encryptedData,
        iv: detail.iv
      }
      this.getAuthorizeUserId(params, 1);
      return;
    } else {
      this.goPage()
    }
  },
  goPage: function () {
    wx.redirectTo({
      url: '/pages/cart/isallow/isallow'
    })
  },
  // 获取用户ID
  getAuthorizeUserId(data, wxType) {
    let _this = this,
      params = {};
    if (data != null) {
      params = Object.assign(params, data);
    }
    wx.login({
      success: function (res) {
        if (res.code) {
          params = Object.assign(params, {
            code: res.code,
            wxType: wxType,
            saleId: globalData.saleId,
            source: globalData.source
          });
          // console.log('强制授权页面传参', params)
          wxAuthorization(params).then(subRes => {
            globalData.authorize_user_id = subRes.userId;
            if (subRes.oldUser) {
              globalData.oldUser = subRes.oldUser;
            }
            // console.log('aaaa', globalData.authorize_user_id)
            // 强制授权页面点击微信授权允许按钮得到userid跳转到首页渲染数据
            if (globalData.authorize_user_id != '0') {
              console.log('跳转页面')
              if (globalData.oldUser == '2') {
                wx.reLaunch({
                  url: '/pages/cart/guide/guide'
                })
              }
              if (globalData.oldUser == '1') {
                wx.reLaunch({
                  url: '/pages/cart/index/index?userId=' + globalData.authorize_user_id
                })
              }
            }
          })
        }
        else {
          // console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  // 转发名片按钮统计
  sendCard: function () {
    // console.log('点击转发按钮，猫哥卫星和销售人气')
    // console.log('转发谁的名片', globalData.saleId)
    let params = {
      userId: globalData.saleId,
      checkId: globalData.authorize_user_id,
      checkType: '4',
      sourceType: '2',
      buttonType: '16',
      pageType: '3',
      type: '3'
    }
    // console.log("猫哥卫星统计传参", params)

    setTimeout(() => {
      starStat(params).then(res => {
        // console.log(res)
      })
    }, 500)
    
  },
}
})