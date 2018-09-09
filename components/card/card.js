// components/card/card.js
let globalData = getApp().globalData;
import { setClipboard } from '../../utils/util.js';
import { getUserInfo } from '../../servies/services.js';
Component({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取全局的userid,判断创建/进入我的名片
    cardText: '',
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
    this.getUserInfo()
    this.setData({
      cardText: globalData.authorize_user_id
    })
    console.log(this.data.cardText)
    globalData.saleId = 1
  },

  methods:{
  // 获取个人信息，默认展示数据
  getUserInfo: function () {
    let data = {
      // userId: globalData.saleId
       userId:11
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

  // 点击预览头像
  lookHeaderpic: function (e) {
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
    // 添加到手机通讯录
    wx.addPhoneContact({
      firstName: this.data.userInfo.nickName,//联系人姓名
      mobilePhoneNumber: this.data.userInfo.phone,//联系人手机号
      organization: this.data.userInfo.company,  // 公司地址
      email: this.data.userInfo.email           // 邮箱
    })

  }
}
})