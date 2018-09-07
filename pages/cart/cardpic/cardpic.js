// pages/cart/cardpic/cardpic.js
import {cardMake,getUserInfo} from "../../../servies/services.js" ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   background:"../business/images/banner.png",//背景图片
   exclusiveCode:"../business/images/car1.jpg" ,//专属码
   nickName:"小明",//用户昵称
   position:"总经理",
   phone:"12356123323",
   company:"大宝汽车贸易有限公司",
   img:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    cardMake({userId:11}).then((res)=>{
      console.log(1,res.img);
      this.setData({
        img:res.img
      })
      // console.log(res.img)
    })
    getUserInfo({userId:12}).then(res=>{
      console.log(res)
    })
  },
    // 保存图片
  saveImg() {
      let _this = this;
      // 获取图片路径并保存
      function getImgInfoToSave (src) {
        console.log(src)
        wx.getImageInfo({
          src: src,
          success: function (sres) {
            console.log('获取图片信息')
            wx.saveImageToPhotosAlbum({
              filePath: sres.path,
              success: function (fres) {
                console.log('图片保存成功')
              }
            })
          },
          fail(){
            // console.log("失败",src)
          }
        })
      } 
      // 判断是否已经授权writePhotosAlbum（保存图片）
        let imgUrl = this.data.img;
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              console.log('授权失败')
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  console.log("相册授权成功")
                  getImgInfoToSave(imgUrl)
                }
              })
            } else {
              getImgInfoToSave(imgUrl)
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