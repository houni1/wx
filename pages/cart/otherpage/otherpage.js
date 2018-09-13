// pages/cart/otherpage/otherpage.js
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeshow:true,
    carshow:false,
    bushow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()//隐藏右上角分享按钮
  },
  tohome(){
    if(this.homeshow)return;
   this.setData({
    homeshow:true,
    carshow:false,
    bushow:false
   })
   wx.setNavigationBarTitle({
     title:"名片",
     success(){
      console.log("当前页面是首页")
     }
   })
  },
  tosource(){
    if(this.carshow)return;
    this.setData({
      homeshow:false,
      carshow:true,
      bushow:false
     })
     wx.setNavigationBarTitle({
      title:"车源",
      success(){
        console.log("当前页面车源")
      }
    })
  },
  tocircle(){
    if(this.bushow)return;
    this.setData({
      homeshow:false,
      carshow:false,
      bushow:true
     }) 
     wx.setNavigationBarTitle({
      title:"车商圈",
      success(){
        console.log("当前页面是车商圈")
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
    if (this.data.bushow) {
      this.business = this.selectComponent("#business");   
    }
    if (this.data.carshow) {
      this.getData = this.selectComponent("#othersCarInfo");
      this.getData.getBrandListData()
    }
    console.log(1)
     if(this.data.homeshow){
       
       wx.stopPullDownRefresh()
     
      return;
     }
    if (this.data.bushow) {
        this.business = this.selectComponent("#business");  
        this.business.pulldownData() 
     }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.carshow) {
      this.getData = this.selectComponent("#othersCarInfo");
      this.getData.onReachBottom()
    }
    if (this.data.bushow) {
      this.business = this.selectComponent("#business");  
      this.business.uploadData() 
   }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    console.log('转发好友')
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log('来自页面内转发按钮', ops.target)
      console.log('转发了谁的id，在otherpage发送出去', globalData.saleId)
    }
    return {
      title: '推车猫小程序',
      path: "pages/cart/mark/mark?type=2&page=2&saleId=" + globalData.saleId,
      success(inres) {
        console.log("转发成功", inres);
      },
      fail(inerr) {
        console.log("转发失败", inerr);
      }
    }
  },
})