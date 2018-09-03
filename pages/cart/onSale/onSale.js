Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,        // 顶部tab切换索引
    showSelect: false,   // 全部商品筛选
    height: 0,
    goodsSelectName: '全部商品'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight - res.windowWidth / 750 * 134
        })
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
   * 页面顶部tab切换
   */
  filterTabChange: function (event) {
    var index = event.currentTarget.dataset.index;
    if (index == 2 && !this.data.showSelect) {
      this.setData({
        showSelect: true
      });
    } else {
      this.setData({
        showSelect: false
      });
    }
    this.setData({
      tabIndex: index
    });
  },
  /**
   * 全部商品下拉框显示隐藏
   */
  goodsSelect: function (event){
    this.setData({
      showSelect: false,
      goodsSelectName: event.currentTarget.dataset.name
    });
  },
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
    setTimeout(() => {
      console.log('加载更多');
      this.setData({
        isHideLoadMore: true
      })
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})