import { getBrandList, getOnSaleData } from '../../servies/services.js';
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],          // 车型列表
    defaultList: ['奥迪', '宝马', '奔驰', '本田'],
    brandList: [],    // 品牌列表
    chooseBrandIndex: 0,
    chooseBrandIndex_list: -1,
    s_move: false,
    userId: app.globalData.authorize_user_id
  },

  ready: function () {
    // 获取品牌列表
    this.getBrandListData();
    // 获取别人车源信息列表
    this.getCarListData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取品牌列表
    getBrandListData: function() {
      var _this = this;
      // 请求品牌列表数据
      var params = {
        userId: '5'     // 被查看用户Id [必传]
      }
      getBrandList(params).then(function (res) {
        _this.setData({
          brandList: res,
          defaultList: res.slice(0, 4)
        });
        console.log(res)
      })      
    },
    // 获取车型列表
    getCarListData: function () {
      var _this = this;
      // 请求列表数据
      var params = {
        userId: _this.data.userId,     // 当前用户Id [必传]
        toUserId: '5',   // 被查看用户Id [必传]
        page: 1,        // 当前页 [必传]
        brandId: '',    // 品牌id [非必传]
        status: '1',     // 上下架状态 1上架 2下架 [非必传]
        type: ''        // 1 自营 2 一猫 [非必传]
      }
      getOnSaleData(params).then(function (res) {
        console.log(res)
        _this.setData({
          list: res.list
        });
      })
    },
    // 选择品牌
    chooseBrand: function (event) {
      var index = event.currentTarget.dataset.index;
      this.setData({
        chooseBrandIndex: index
      })
    },
    show_move: function () {
      this.setData({
        s_move: !this.data.s_move
      })
    },
    // 品牌列表里选择
    chooseBrand_list: function (event) {
      console.log(event)
      var index = event.currentTarget.dataset.index;
      this.setData({
        chooseBrandIndex_list: index
      })
    },
    onReachBottom: function () {
      if (this.data.page < this.data.lastPage) {
        this.getDataList(9);
      } else {
        wx.showToast({
          title: '没有更多数据了！',
        })
      }
    }
  }
})
