// pages/cart/setup/setup.js
let globalData = getApp().globalData;
import { getUserInfo, editUserInfo, getUserWxPhone, getprovinceInfo, getCityInfo } from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 请求数据成功后展示页面
    flag: false,
    // 默认展示用户信息
    userInfo: {
      position: '',  // 职位
      phone: '',   // 手机号
      wechatNumber: '',  // 微信号
      email: '',    // 邮箱
      introduction: '',   // 个人介绍
      headPortrait: '',    // 头像
      nickName: '', // 用户昵称
      provinceId: '',
      provinceName: '',
      cityId: '',
      cityName: ''
    },
    imageList: [],  // 图片展示列表
    code: '', // 手机号获取用code传参
    cityShow: true,
    provinceData: [], // 获取省数据
    cityData: [],  // 获取市数据
    val: [0, 0],
    currentCity: '北京',   // 所在城市
    focusflag: false, // 输入手机号后获取焦点
    textareaFlag: true, // 默认展示textarea,城市选择框弹起隐藏
    inputFlag: false,  // 进入当前页面，内容未发生变化
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
    this.getprovinceInfo();
    this.getCityInfo(1);
  },

  onShow: function () {
    wx.hideShareMenu()
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
        if (this.data.imageList == null) {
          this.setData({
            imageList: []
          })
        }
        // console.log(this.data.imageList)
      }
    })
  },

  // 点击城市弹起城市组件
  showCityInfo: function () {
    this.setData({
      cityShow: false,
      textareaFlag: false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  onUnload: function () {
    if (this.data.inputFlag) {
      // console.log('关闭了编辑页面')
    }
    
  },

  // 点击添加按钮弹起选择类型框
  uploadImage: function (e) {
    let _this = this
    var pos = e.currentTarget.dataset.pos
    // console.log(pos)
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
        // console.log('上传图片', res.tempFilePaths)
        _this.uploadDIY(res.tempFilePaths, successUp, failUp, i, length, pos);
      }
    })
    
  },

  // 删除图片
  closeimg: function (e) {
    var ind = e.currentTarget.dataset.ind
    // console.log(ind)

    this.data.imageList.splice(ind, 1)

    this.setData({
      imageList: this.data.imageList
    })
    // console.log(this.data.imageList)
  },

  // 点击预览头像
  lookHeaderpic: function (e) {
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
    // console.log(imgurl)
    // console.log(this.data.imageList)
    wx.previewImage({
      current: imgurl, // 当前显示图片的http链接
      urls: this.data.imageList // 需要预览的图片http链接列表
    })
  },


  // 图片上传请求接口
  uploadDIY: function (filePaths, successUp, failUp, i, length, pos) {
    // console.log(length)
    // console.log(filePaths[i])
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
          // console.log(data)
          // console.log('拼接前的list', _this.data.imageList)
          _this.setData({
            imageList: _this.data.imageList.concat(data)
          })
          // console.log('拼接后的list', _this.data.imageList)
          if (_this.data.imageList.length > 6) {
            wx.showToast({
              icon: 'none',
              title: '您只能添加6张图'
            })
            _this.setData({
              imageList: _this.data.imageList.slice(0, 6)
            })
          }
          // console.log(_this.data.imageList)
        }
        if (pos == 'header') {
          var data = JSON.parse(res.data).data
          // console.log(data)
          _this.setData({
            headPortrait: data
          })
          // console.log(this.data.headPortrait)
        }
        successUp++;
      },
      fail: function (res) {
        failUp++;
      },
      complete: () => {
        i++;
        // console.log(i)
        if (i == length) {
          // console.log(successUp)
          // console.log('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
        }
        else {  //递归调用uploadDIY函数
          _this.uploadDIY(filePaths, successUp, failUp, i, length, pos);
        }
      }
    })
  },

  // 获取用户姓名
  nickName: function (e) {
    var nickName = 'userInfo.nickName'
    this.setData({
      [nickName]: e.detail.value,
      inputFlag: true
    })
    // console.log('用户姓名发生改变', this.data.inputFlag)
  },

  // 获取用户公司名称
  company: function (e) {
    var company = 'userInfo.company'
    this.setData({
      [company]: e.detail.value
    })
  },

  // 获取用户职位
  position: function (e) {
    var position = 'userInfo.position'
    this.setData({
      [position]: e.detail.value
    })
  },

  getPhoneNumber: function (e) {
    let _this = this
    wx.login({
      success: function(res) {
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
            }
          })
          
        }
      }
    })
  },

  // 获取用户手机号
  phone: function (e) {
    if (e.detail.value != '') {
      this.setData({
        focusflag: true
      })
    }
    var phone = 'userInfo.phone'
    this.setData({
      [phone]: e.detail.value
    })
  },

  // 获取用户微信号
  wechatNumber: function (e) {
    var wechatNumber = 'userInfo.wechatNumber'
    this.setData({
      [wechatNumber]: e.detail.value
    })
  },

  // 获取用户邮箱
  email: function (e) {
    var email = 'userInfo.email'
    this.setData({
      [email]: e.detail.value
    })
  },

  // 获取用户个人介绍
  introduction: function (e) {
    var introduction = 'userInfo.introduction'
    this.setData({
      [introduction]: e.detail.value
    })
  },

  // 编辑个人信息接口
  editUserInfo: function (e) {
    // console.log('点击保存按钮')
    // console.log(this.data.imageList)
    // console.log(this.data.headPortrait)
    // console.log('用户职位', this.data.userInfo.phone.trim())
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (this.data.userInfo.nickName.trim() == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入真实姓名'
      })
    } else if (this.data.userInfo.phone.trim() == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入您的手机号'
      })
    } else if (!phoneReg.test(this.data.userInfo.phone)) {
      wx.showToast({
        icon: 'none',
        title: '手机号格式有误'
      })
    } else {
      let params = {
        userId: this.data.userInfo.id,
        userName: this.data.userInfo.nickName.trim(),
        company: this.data.userInfo.company.trim(),
        headPortrait: this.data.headPortrait,
        userAlbum: this.data.imageList,
        position: this.data.userInfo.position.trim(),
        provinceId: this.data.userInfo.provinceId,
        cityId: this.data.userInfo.cityId,
        provinceName: this.data.userInfo.provinceName,
        cityName: this.data.userInfo.cityName,
        phone: this.data.userInfo.phone.trim(),
        wechatNumber: this.data.userInfo.wechatNumber.trim(),
        email: this.data.userInfo.email.trim(),
        introduction: this.data.userInfo.introduction.trim()
      }
      editUserInfo(params).then(res => {
        // console.log(res)
        // wx.switchTab({
        //   url: '/pages/cart/index/index'
        // })
        wx.navigateBack({
          delta: 1
        })
      })
    }
  },

  // 获取省数据
  getprovinceInfo: function () {
    getprovinceInfo().then(res => {
      this.setData({
        provinceData: res
      })
    })
  },

  // 获取市数据
  getCityInfo: function (id) {
    getCityInfo({ provinceId: id }).then(res => {
      this.setData({
        cityData: res
      })
    })
  },
  // 切换省份和城市
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      val: val
    })
    // 触发此方法，如果data里的provinceId与当前动作获取的provinceId一致，则为切换城市，不触发请求城市列表接口，否则为切换省份
    var provinceId = this.data.provinceData[val[0]].id
    if (e.detail.value[0] == provinceId) {
      return;
    }
    this.getCityInfo(provinceId)
  },
  // 点击完成获取到选择的省份和城市
  complete: function () {
    this.setData({
      textareaFlag: true
    })
    var val = this.data.val
    // console.log(this.data.provinceData[val[0]].name, this.data.provinceData[val[0]].id + '-' + this.data.cityData[val[1]].name)
    var provinceId = this.data.provinceData[val[0]].id
    var provinceName = this.data.provinceData[val[0]].name
    var cityId = this.data.cityData[val[1]].id
    var cityName = this.data.cityData[val[1]].name
    // console.log(provinceId)
    // console.log(provinceName)
    // console.log(cityId)
    // console.log(cityName)
    var provinceIdParams = 'userInfo.provinceId'
    var provinceNameParams = 'userInfo.provinceName'
    var cityIdParams = 'userInfo.cityId'
    var cityNameParams = 'userInfo.cityName'
    this.setData({
      [provinceIdParams]: provinceId,
      [provinceNameParams]: provinceName,
      [cityIdParams]: cityId,
      [cityNameParams]: cityName,
      cityShow: true,
      currentCity: this.data.provinceData[val[0]].name + ' ' + this.data.cityData[val[1]].name
    })
  },
  cancel: function () {
    this.setData({
      cityShow: true,
      textareaFlag: true
    })
  }
})