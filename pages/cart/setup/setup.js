// pages/cart/setup/setup.js
let globalData = getApp().globalData;
import { getUserInfo } from '../../../servies/services.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 请求数据成功后展示页面
    flag: false,
    // 默认展示用户信息
    userInfo: {
      position: '总经理',  // 职位
      phone: '151xxxxxxxx',   // 手机号
      wechatNumber: '15311111111',  // 微信号
      email: '123@qq.com',    // 邮箱
      introduction: '我叫XXX，来自XXX...',   // 个人介绍
      headPortrait: '',    // 头像
      nickName: '吉思洋', // 用户昵称
    },
    imageList: [],
    imageArr: []
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
          imageList: res.userAlbum
        })
        console.log(this.data.imageList)
      }
    })
  },

  // 点击城市弹起城市组件
  getCityInfo: function () {
    console.log('弹起城市选择组件')
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

  // 点击添加按钮弹起选择类型框
  uploadImage: function () {
    let _this = this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.addImage('album')
          } else if (res.tapIndex == 1) {
            _this.addImage('camera')
          }
        }
      }
    })
  },

  // 选择图片，获取图片信息
  addImage: function (types) {
    var _this = this;
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [types], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        _this.setData({
          imageList: _this.data.imageList.concat(res.tempFilePaths)
        })
        if (_this.data.imageList.length > 6) {
          wx.showToast({
            icon: 'none',
            title: '您只能添加6张图'
          })
          _this.setData({
            imageList: _this.data.imageList.slice(0, 6)
          })
        }
      }
    })
  },

  // 删除图片
  closeimg: function (e) {
    var ind = e.currentTarget.dataset.ind
    console.log(ind)

    this.data.imageList.splice(ind, 1)

    this.setData({
      imageList: this.data.imageList
    })
    console.log(this.data.imageList)
  },

  // 点击预览图片
  lookpic: function (e) {
    var imgurl = e.currentTarget.dataset.imgurl
    console.log(imgurl)
    console.log(this.data.imageList)
    wx.previewImage({
      current: imgurl, // 当前显示图片的http链接
      urls: this.data.imageList // 需要预览的图片http链接列表
    })
  },


  // 提交表单提交页面
  uploadfile: function () {
    console.log(this.data.imageList.length)
    this.setData({
      imageArr: this.data.imageList.join(',')
    })
    console.log(this.data.imageArr)
    // wx.uploadFile({
    //   url: 'https://tcmapi.emao.com/lottery/imgUpload', //仅为示例，非真实的接口地址  
    //   filePath: this.data.imageArr,
    //   name: 'file',
    //   header: {
    //     "X-Emao-TCM-App": "os=Android 7.1.1;model=Xiaomi MIX2;appVersion=2.1.0",
    //     'Accept': 'application/json; version=3.8.0'
    //   },
    //   formData: {
    //     userid: '1',
    //     naem: 'jisiyang'
    //   },
    //   success: function (res) {
    //     var data = res.data
    //     console.log(data)
    //   }
    // })
  }

})