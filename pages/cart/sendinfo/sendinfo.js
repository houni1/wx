// pages/cart/sendinfo/sendinfo.js
import {postMessage} from "../../../servies/services.js" ;
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
     imageList:[],
     imageArr: [],
     textinput:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
    wx.hideShareMenu()//隐藏右上角分享按钮
   if(wx.getStorageSync("textinput")){
     _this.setData({
      textinput:wx.getStorageSync("textinput")
     })
   }
   if(wx.getStorageSync("imageList")){
    _this.setData({
      imageList:wx.getStorageSync("imageList")
    })
  }
    
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
    let num=9-this.data.imageList.length;
    wx.chooseImage({
      count: num, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [types], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        // console.log(res.tempFilePaths)
        _this.uploadDIY(res.tempFilePaths, successUp, failUp, i, length);
      }
    })
  },
    // 图片上传请求接口
    uploadDIY: function (filePaths, successUp, failUp, i, length) {
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
            var data = JSON.parse(res.data).data
            // console.log(data)
            _this.setData({
              imageList: _this.data.imageList.concat(data)
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
            // console.log(_this.data.imageList)
            wx.setStorageSync("imageList",_this.data.imageList)
      
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
            _this.uploadDIY(filePaths, successUp, failUp, i, length);
          }
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
    wx.setStorageSync("imageList",this.data.imageList)
    // console.log(this.data.imageList)
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
  textinput(e){
      this.setData({
        textinput:e.detail.value
      })
      if(e.detail.value.length>=1000){
       wx.showToast({
         title: "字数不能超过1000",
         icon: 'none',
         duration: 1500,
         mask: false,
       });
      }
      wx.setStorageSync("textinput",e.detail.value)
  },

  // 提交表单提交页面
  uploadfile: function () {
    if(this.data.textinput.trim()==""&&this.data.imageList.length==0){
      wx.showToast({
        title: "请输入内容",
        icon: 'none',
        duration: 1500,
        mask: false,
      });
      return
    }
    postMessage({userId:globalData.authorize_user_id,information:this.data.textinput,file:JSON.stringify(this.data.imageList)}).then((res)=>{
    wx.removeStorage({
      key: "textinput",
      success(){
      
      }
    })
    wx.removeStorage({
      key: "imageList"
    })
    
    let pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      let prePage = pages[pages.length - 2];
      //关键在这里
      prePage.onLoad({reload:true})
    }
      wx.switchTab({
        url: "../business/business"
      });
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
  
  }
})