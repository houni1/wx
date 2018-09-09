// pages/cart/mycode/mycode.js
let globalData = getApp().globalData;
import { getUserInfo } from '../../../servies/services.js';

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
      nickName: '吉思洋', // 用户昵称
      company: '大宝汽车贸易有限公司', // 公司
      position: '总经理', // 职位
      phone: '15311111111', // 手机号
      email: '123@qq.com', //邮箱
    },
     isShowShadow: false//是否显示弹窗
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
   // 保存图片
   saveImg() {
     
      let _this = this;
      // 获取图片路径并保存
      function getImgInfoToSave(src) {
         console.log(src)
         wx.getImageInfo({
            src: src,
            success: function (sres) {
               console.log('获取图片信息')
               wx.saveImageToPhotosAlbum({
                  filePath: sres.path,
                  success: function (fres) {
                     console.log('图片保存成功')
                     wx.showToast({
                        title: "图片保存成功",
                        icon: "success",
                     })
                  }
               })
            },
            fail() {
               // console.log("失败",src)

            }
         })
      }
      // 判断是否已经授权writePhotosAlbum（保存图片）
      let imgUrl = this.data.userInfo.exclusiveCode;
      wx.getSetting({
         success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
               console.log('授权失败')
               wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                     console.log("相册授权成功")
                     getImgInfoToSave(imgUrl)
                  },
                  fail() {
                     console.log("需要再次授权")
                     
                     _this.setData({
                        isShowShadow: true
                     })
                  }
               })
            } else {
               getImgInfoToSave(imgUrl)
            }
         }
      })
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
          imageList: res.userAlbum
        })
        console.log(this.data.imageList)
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
   // 关闭弹窗
   toggleShadow(e) {
      this.setData({
         isShowShadow: false
      })
   }
})