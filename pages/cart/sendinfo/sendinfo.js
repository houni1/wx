// pages/cart/sendinfo/sendinfo.js
import {postMessage} from "../../../servies/services.js" ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     text:"我来自郑州，我是一名信息工程大学印刷工程专业应届本科即将毕业的学员，我是一名信息工程大学印刷工程专业应届本科即将毕业的学生",
     imageList:[],
     imageArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()//隐藏右上角分享按钮
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
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [types], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        _this.setData({
          imageList: _this.data.imageList.concat(res.tempFilePaths)
        })
        if (_this.data.imageList.length > 9) {
          wx.showToast({
            icon: 'none',
            title: '您只能添加9张图'
          })
          _this.setData({
            imageList: _this.data.imageList.slice(0, 9)
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
    // console.log(this.data.imageList)
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
    postMessage({userId:11,information:"123"}).then((res)=>{
      console.log(res)
      wx.switchTab({
        url: "../business/business"
      });
    })
    // if(this.data.imageList==[]){return};
    // console.log(this.data.imageList)
    // this.setData({
    //   imageArr: this.data.imageList.join(',')
    // })
    // console.log(this.data.imageArr)
    // wx.uploadFile({
    //   url: 'https://tcmapi.emao.com/cart/user/imgUpload', //仅为示例，非真实的接口地址  
    //   filePath: this.data.imageArr,
    //   name: 'file',
    //   header: {
    //     "X-Emao-TCM-App": "os=Android 7.1.1;model=Xiaomi MIX2;appVersion=2.1.0",
    //     'Accept': 'application/json; version=3.8.0'
    //   },
    //   formData: {
    //     userid: '1'
    //   },
    //   success: function (res) {
    //     var data = res.data
    //     console.log(data)
    //     wx.navigateBack({
    //       delta: 1
    //     });
    //   }
    // })
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
  
  }
})