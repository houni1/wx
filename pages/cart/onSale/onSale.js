// import { getOnSaleData } from '../../../utils/request.js';
import { getOnSaleData } from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',             // 当前用户Id [必传]
    toUserId: '',           // 被查看用户Id [必传]
    tabIndex: 0,            // 顶部tab切换索引
    showSelect: false,      // 全部商品筛选
    goodsSelectIndex: false,
    height: 0,
    isHideLoadMore: true,
    goodsSelectName: '全部商品',
    list: [],               // 列表数据,
    brandId: '',            // 品牌id [非必传]
    status: '1',            // 1上架 2下架 [非必传]
    page: '1',              // 当前页 [必传]
    type: '',                // 商品类型：''-全部商品, 1-自营, 2-一猫 [非必传]
    onShelf: 0,             // 已售出
    unOnShelf: 0            // 已下架
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getOnSaleData)
    var that = this;
    this.setData({
      onShelf: dataList.amount.onShelf,
      unOnShelf: dataList.amount.unOnShelf,
      list: dataList.list
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight - res.windowWidth / 750 * 134
        })
      }
    })
    

    // 请求列表数据
    var params = {
      userId: '',     // 当前用户Id [必传]
      toUserId: '',   // 被查看用户Id [必传]
      page: 1,        // 当前页 [必传]
      brandId: '',    // 品牌id [非必传]
      status: '1',     // 上下架状态 1上架 2下架 [非必传]
      type: ''        // 1 自营 2 一猫 [非必传]
    }

    getOnSaleData(params).then(function() {
      console.log(123)
    })
  },
  /**
   * 页面顶部tab切换
   */
  tabChange: function (event) {
    var index = event.currentTarget.dataset.index;
    this.setData({
      tabIndex: index,
      status: index
    });
    var params = {
      userId: '',     // 当前用户Id [必传]
      toUserId: '',   // 被查看用户Id [必传]
      page: 1,        // 当前页 [必传]
      brandId: '',    // 品牌id [非必传]
      status: this.data.status,     // 上下架状态 1上架 2下架 [非必传]
      type: this.data.type        // 1 自营 2 一猫 [非必传]
    }
    console.log(params);
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
    this.setData({
      isHideLoadMore: false
    })
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
  onShareAppMessage: function (res) {
    console.log(res.from)
  }
})

var dataList = {
  page:{
    "perPage": "10",
    "currentPage": "1",
    "lastPage": "3",
    "count": "20"
  },
  amount: {
    onShelf: 4,
    unOnShelf: 2
  },
  list:[
    {
      "autoId": "12",                                 //车型id
      "autoName": "江淮 瑞风s2 2017款 1.5L手动豪华型",  //车型名称
      "price": "13.90",                              //现价
      "guidePrice": "42.30",                              //指导价
      "type": "1",                                 //类型: 1 自营 2 一猫
      "logoUrl": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //logo地址
      "autoThumb": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //车型封面
      "state": "1", //1：现车 2：3天后到店 3：7天后到店 4：需预订
      "stockNum": "1", //库存数
      "isHot": "1", //是否热门车型：1-是，0-否
    },
    {
      "autoId": "12",                                 //车型id
      "autoName": "江淮 瑞风s2 2017款 1.5L手动豪华型",  //车型名称
      "price": "13.90",                              //现价
      "guidePrice": "42.30",                              //指导价
      "type": "1",                                 //类型: 1 自营 2 一猫
      "logoUrl": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //logo地址
      "autoThumb": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //车型封面
      "state": "1", //1：现车 2：3天后到店 3：7天后到店 4：需预订
      "stockNum": "1", //库存数
      "isHot": "0", //是否热门车型：1-是，0-否
    },
    {
      "autoId": "12",                                 //车型id
      "autoName": "江淮 瑞风s2 2017款 1.5L手动豪华型",  //车型名称
      "price": "13.90",                              //现价
      "guidePrice": "42.30",                              //指导价
      "type": "1",                                 //类型: 1 自营 2 一猫
      "logoUrl": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //logo地址
      "autoThumb": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //车型封面
      "state": "1", //1：现车 2：3天后到店 3：7天后到店 4：需预订
      "stockNum": "1", //库存数
      "isHot": "0", //是否热门车型：1-是，0-否
    },
    {
      "autoId": "12",                                 //车型id
      "autoName": "江淮 瑞风s2 2017款 1.5L手动豪华型",  //车型名称
      "price": "13.90",                              //现价
      "guidePrice": "42.30",                              //指导价
      "type": "1",                                 //类型: 1 自营 2 一猫
      "logoUrl": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //logo地址
      "autoThumb": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //车型封面
      "state": "1", //1：现车 2：3天后到店 3：7天后到店 4：需预订
      "stockNum": "1", //库存数
      "isHot": "0", //是否热门车型：1-是，0-否
    },
  ]
}