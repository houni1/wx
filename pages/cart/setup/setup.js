// pages/cart/setup/setup.js
let globalData = getApp().globalData;
import { getUserInfo, editUserInfo } from '../../../servies/services.js';

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
    imageList: []
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
          headPortrait: res.headPortrait,
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
  uploadImage: function (e) {
    let _this = this
    var pos = e.currentTarget.dataset.pos
    console.log(pos)
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.addImage('album', pos)
          } else if (res.tapIndex == 1) {
            _this.addImage('camera', pos)
          }
        }
      }
    })
  },

  // 选择图片，获取图片信息
  addImage: function (types, pos) {
    var _this = this;
    var cont = 1
    if (pos == 'header') {
      cont = 1
    } else if (pos == 'list') {
      cont = 6
    }

    wx.chooseImage({
      count: cont, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [types], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        console.log(res.tempFilePaths)
        _this.uploadDIY(res.tempFilePaths, successUp, failUp, i, length, pos);
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


  // 图片上传请求接口
  uploadDIY: function (filePaths, successUp, failUp, i, length, pos) {
    console.log(length)
    console.log(filePaths[i])
    var _this = this
    wx.uploadFile({
      url: 'https://tcmapi.emao.com/cart/user/imgUpload', //仅为示例，非真实的接口地址  
      filePath: filePaths[i],
      name: 'file',
      header: {
        "Accept": "application/json; version=3.13.0",
        "X-Emao-TCM-WeChat": "1"
      },
      success: function (res) {
        
        if (pos == 'list') {
          var data = JSON.parse(res.data).data
          console.log(data)
          _this.setData({
            imageList: _this.data.imageList.concat(data)
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
          console.log(_this.data.imageList)
        }
        if (pos == 'header') {
          var data = JSON.parse(res.data).data
          console.log(data)
          _this.setData({
            headPortrait: data
          })
          console.log(this.data.headPortrait)
        }
        successUp++;
      },
      fail: function (res) {
        failUp++;
      },
      complete: () => {
        i++;
        console.log(i)
        if (i == length) {
          console.log(successUp)
          console.log('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
        }
        else {  //递归调用uploadDIY函数
          _this.uploadDIY(filePaths, successUp, failUp, i, length, pos);
        }
      }
    })
  },


  // 编辑个人信息接口
  editUserInfo: function () {
    console.log('点击保存按钮')
    console.log(this.data.imageList)
    console.log(this.data.headPortrait)
    let params = {
      userId: this.data.userInfo.id,
      userName: this.data.userInfo.nickName,
      headPortrait: this.data.headPortrait,
      userAlbum: this.data.imageList,
      position: this.data.userInfo.position,
      provinceId: this.data.userInfo.provinceId,
      cityId: this.data.userInfo.cityId,
      provinceName: this.data.userInfo.provinceName,
      cityName: this.data.userInfo.cityName,
      phone: this.data.userInfo.phone,
      wechatNumber: this.data.userInfo.wechatNumber,
      email: this.data.userInfo.email,
      introduction: this.data.userInfo.introduction
    }
    editUserInfo(params).then(res => {
      console.log(res)
    })
  }

})