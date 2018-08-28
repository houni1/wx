// pages/cart/business/business.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  alarm:false
  },
  //头像预览
   preview_head(){
      wx.previewImage({
         current: "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
         urls: ["http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg"]
      }) 
   },
   //车商圈图片预览
   preview_friend(){
      wx.previewImage({
         current: "http://img.zcool.cn/community/01c60259ac0f91a801211d25904e1f.jpg@1280w_1l_2o_100sh.jpg",
         urls: ["http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg", "http://img.zcool.cn/community/01c60259ac0f91a801211d25904e1f.jpg@1280w_1l_2o_100sh.jpg",      "http://www.qqma.com/imgpic2/cpimagenew/2018/4/5/6e1de60ce43d4bf4b9671d7661024e7a.jpg"]
      }) 
   },
   quickcall(){
      wx.showModal({
         title: '拨打电话',
         content: '12345',
         success: function (res) {
            if (res.confirm) {
               console.log('用户点击确定')
            } else if (res.cancel) {
               console.log('用户点击取消')
            }
         }
      })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.refreshView = this.selectComponent("#refreshView")
  },
   checkcard(){
      wx.navigateTo({
         url: '../cardpic/cardpic',
      })
   },
   send() {
      wx.navigateTo({
         url: '../sendinfo/sendinfo',
      })
   },
   share(){
      wx.navigateTo({
         url: '../share/share',
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
   //触摸开始
   handletouchstart: function (event) {
      this.refreshView.handletouchstart(event)
   },
   //触摸移动
   handletouchmove: function (event) {
      this.refreshView.handletouchmove(event)
   },
   //触摸结束
   handletouchend: function (event) {
      this.refreshView.handletouchend(event)
   },
   //触摸取消
   handletouchcancel: function (event) {
      this.refreshView.handletouchcancel(event)
   },
   //页面滚动
   onPageScroll: function (event) {
      this.refreshView.onPageScroll(event)
   },
   onPullDownRefresh: function () {
      setTimeout(() => { this.refreshView.stopPullRefresh() }, 5000)
   },

})