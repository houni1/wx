// pages/cart/otherpage/otherpage.js
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
      
  },
  tohome(){
    if(this.homeshow)return;
    this.setData({
      homeshow:true,
      carshow:false,
      bushow:false
    })
  },
  tosource(){
    if(this.carshow)return;
    this.setData({
      homeshow:false,
      carshow:true,
      bushow:false
     })
  },
  tocircle(){
    if(this.bushow)return;
    this.setData({
      homeshow:false,
      carshow:false,
      bushow:true
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
    // if (this.data.bushow) {
    //   this.business = this.selectComponent("#othersCarInfo");
    // }
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