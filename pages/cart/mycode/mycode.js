// pages/cart/mycode/mycode.js
let globalData = getApp().globalData;
import { getUserInfo, sendEmail, buttonStat } from '../../../servies/services.js';

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
    email: '', // 弹框邮箱
    formId: '',
    iphoneX:"50%"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
    let _this=this;
    wx.getSystemInfo({
      success: function(res) {
        let name = 'iPhone X'
        if(res.model.indexOf(name) > -1||res.system.indexOf("iOS 12.0")>-1){
          _this.setData({
            iphoneX:"40%"
          })
        }
      },
      fail(e){
        console.log("失败",e)
      }
    })
  },

  // formId获取
  formSubmit: function (e) {
    // console.log("formId", e.detail.formId)
    this.setData({
      formId: e.detail.formId
    })
  },

  // 有formId的按钮统计
  formStat: function (type) {
    let _this = this;
    // console.log("统计中的formId", _this.data.formId)
    buttonStat({ appType: 1, pageType: 2, buttonType: type, formId: _this.data.formId, userId: globalData.authorize_user_id }).then((res) => {
      // console.log(_this.data.formId)
      _this.setData({
        formId: ""
      })
      // console.log("按钮统计成功")
    })
  },
   // 保存图片
   saveImg() {

     this.formStat(12)
     
      let _this = this;
      // 获取图片路径并保存
      function getImgInfoToSave(src) {
        //  console.log(src)
         wx.getImageInfo({
            src: src,
            success: function (sres) {
              //  console.log('获取图片信息')
               wx.saveImageToPhotosAlbum({
                  filePath: sres.path,
                  success: function (fres) {
                    //  console.log('图片保存成功')
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
              //  console.log('授权失败')
               wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                    //  console.log("相册授权成功")
                     getImgInfoToSave(imgUrl)
                  },
                  fail() {
                    //  console.log("需要再次授权")
                     
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
    // console.log('获取个人信息userid', data)
    getUserInfo(data).then(res => {
      if (res) {
        this.setData({
          flag: true,
          userInfo: res,
          imageList: res.userAlbum,
          email: res.email
        })
        if (res.phone == '') {
          var phone = 'userInfo.phone'
          this.setData({
            [phone]: '暂无'
          })
        }
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
  
  },

  // 发送至邮箱
  tomail: function () {
    this.formStat(13)

    this.setData({
      toMailFlag: true,
      focusflag: true
    })
  },

  // 点击取消弹窗收起
  cancel: function () {
    let btnParams = {
      buttonType: '14',
      pageType: '2',
      appType: '1'
    }
    buttonStat(btnParams).then(res => {
      // console.log(res)
    })
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
    let btnParams = {
      buttonType: '15',
      pageType: '2',
      appType: '1'
    }
    buttonStat(btnParams).then(res => {
      // console.log(res)
    })
    // console.log(this.data.email)
    var emailReg = /^\w+\@+[0-9a-zA-Z]+\.(com|com.cn|edu|hk|cn|net)$/;
    if (emailReg.test(this.data.email)) {
      let params = {
        email: this.data.email,
        userId: globalData.authorize_user_id
      }
      sendEmail(params).then(res => {
        // console.log(res)
        wx.showToast({
          title: '已发送至邮箱',
          icon: 'none'
        })
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

  },
     // 关闭弹窗
     toggleShadow(e) {
      this.setData({
         isShowShadow: false
      })
   }
})