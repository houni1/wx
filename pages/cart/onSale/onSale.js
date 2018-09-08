import { getOnSaleData, buttonStat } from '../../../servies/services.js';

var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId: 5,            // 当前用户Id [必传]
    toUserId: 5,          // 被查看用户Id [必传]
    tabIndex: 0,            // 顶部tab切换索引
    showSelect: false,      // 全部商品筛选
    goodsSelectIndex: false,
    height: 0,
    goodsSelectName: '全部商品',
    list: [],               // 列表数据,
    brandId: '',            // 品牌id [非必传]
    status: '1',            // 1上架 2下架 [非必传]
    page: 1,              // 当前页 [必传]
    type: '',               // 商品类型：''-全部商品, 1-自营, 2-一猫 [非必传]
    onShelf: 0,             // 已售出
    unOnShelf: 0,            // 已下架
    lastPage: 1,              // 最后页数
    noData: false             // 缺省页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getLocation({
      success: function (res) {
        console.log(res)
        _this.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          }
        })
      }
    })
    _this.getDataList();
    
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: res.windowHeight - res.windowWidth / 750 * 134
        })
      }
    })
  },
  /**
   * 页面顶部tab切换
   */
  tabChange: function (event) {
    var index = event.currentTarget.dataset.index;
    this.setData({
      tabIndex: index,
      status: parseInt(index) + 1,
      showSelect: false
    });
    this.getDataList();
  },
  /*
  * 显示隐藏下拉菜单
  */ 
  filterGoodsKind: function() {
    this.setData({
      showSelect: !this.data.showSelect
    });
  },
  /**
   * 选择商品类型
   */
  goodsSelect: function (event){
    this.setData({
      showSelect: false,
      goodsSelectName: event.currentTarget.dataset.name,
      type: event.currentTarget.dataset.type,
      goodsSelectIndex: true
    });
    this.getDataList();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      lastPage: 1
    });
    this.getDataList();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.page < this.data.lastPage) {
      this.getDataList(9);
    } else {
      wx.showToast({
        title: '没有更多数据了！',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res,e) {
    console.log(res)
    console.log(res.dataset)
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
    }
    else {
      console.log("来自右上角转发菜单");
    }
    return {
      title: res.target.dataset.title,
      path: '/pages/cart/carDetail/carDetail?id=123',
      imageUrl: res.target.dataset.cover,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
    var event = e || event;
    event.stopPropagation();
    // 按钮统计
    var tjParam = {
      buttonType: 23,
      pageType: 7,
      appType: 1
    }
    buttonStat(tjParam).then(function (res) { }) 
  },
  getDataList: function (loadKind) {
    // loadKind 存在并为9时代表上拉加载更多
    var _this = this;
    // pageNum要请求的页数
    var pageNum;
    if (loadKind == 9) {
      // 上拉加载时
      pageNum = Number(_this.data.page) + 1
    } else {
      // 初始化和下拉刷新
      pageNum = 1
    }
    // 请求列表数据
    var params = {
      userId: this.data.userId,       // 当前用户Id [必传]
      toUserId: this.data.toUserId,   // 被查看用户Id [必传]
      page: pageNum,           // 当前页 [必传]
      brandId: '',                    // 品牌id [非必传]
      status: this.data.status,       // 上下架状态 1上架 2下架 [非必传]
      type: this.data.type            // 1 自营 2 一猫 [非必传]
    }

    getOnSaleData(params).then(function (res) {
      console.log(res)
      if (loadKind == 9) {
        _this.setData({
          onShelf: res.amount.onShelf,
          unOnShelf: res.amount.unOnShelf,
          list: _this.data.list.concat(res.list),
          lastPage: res.page.lastPage,
          page: res.page.currentPage,
          noData: false
        })
      } else {
        if (res.list.length > 0) {
          _this.setData({
            onShelf: res.amount.onShelf,
            unOnShelf: res.amount.unOnShelf,
            list: res.list,
            lastPage: res.page.lastPage,
            page: res.page.currentPage,
            noData: false
          })
        } else {
          _this.setData({
            onShelf: res.amount.onShelf,
            unOnShelf: res.amount.unOnShelf,
            list: res.list,
            lastPage: res.page.lastPage,
            page: res.page.currentPage,
            noData: true
          })
        }
      }
    })
  }
})