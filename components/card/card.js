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

  created () {
    this.getUserInfo()
    this.setData({
      cardText: globalData.authorize_user_id
    })
    console.log(this.data.cardText)
  },

  methods:{
  // 获取个人信息，默认展示数据
  getUserInfo: function () {
    let data = {
      userId: globalData.saleId
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
}
})