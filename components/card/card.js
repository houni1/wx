// components/card/card.js
let globalData = getApp().globalData;
import { setClipboard } from '../../utils/util.js';
import { getUserInfo } from '../../servies/services.js';
Component({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    // 用户默认信息
    userInfo: {
      headPortrait: '',    // 头像
      nickName: '吉思洋', // 用户昵称
      position: '总经理', // 职位
      popularity: "30",  // 销售人气
      provinceName: '山西', // 省名
      company: '大宝汽车贸易有限公司', // 公司
      companyAddress: '北京市密云区经济开发区西通路八号西田各庄政府办公大楼1301', // 公司地址
      phone: '15311111111', // 手机号
      email: '123@qq.com', //邮箱
      wechatNumber: '15311111111',  // 微信号
      introduction: '我叫XXX，来自XXX...',   // 个人介绍
      userAlbum: [] // 图片展示
    }
  },

  created () {
    this.getUserInfo()
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