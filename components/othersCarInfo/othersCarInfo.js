import { getBrandList, getOnSaleData, buttonStat } from '../../servies/services.js';
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
    brandId: '',    // 车型id
    userId: app.globalData.authorize_user_id,  // 用户id
    page: 1,        // 当前页
    lastPage: 1,       // 总页数
    noData: false             // 缺省页面
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
        wx.stopPullDownRefresh();
      })      
    },
    // 获取车型列表
    getCarListData: function (loadKind) {
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
        userId: _this.data.userId,      // 当前用户Id [必传]
        toUserId: '5',                  // 被查看用户Id [必传]
        page: pageNum,                  // 当前页 [必传]
        brandId: _this.data.brandId,    // 品牌id [非必传]
        status: '',                     // 上下架状态 1上架 2下架 [非必传]
        type: ''                        // 1 自营 2 一猫 [非必传]
      }

      getOnSaleData(params).then(function (res) {
        if (loadKind == 9) {
          _this.setData({
            list: _this.data.list.concat(res.list),
            lastPage: res.page.lastPage,
            page: res.page.currentPage,
            noData: false
          });
        } else {
          if (res.list.length > 0) {
            _this.setData({
              list: res.list,
              lastPage: res.page.lastPage,
              page: res.page.currentPage,
              noData: false
            })
          } else {
            _this.setData({
              noData: true,
              list: res.list,
              page: res.page.currentPage,
              lastPage: res.page.lastPage
            });
          }
        }
      })
    },
    // 选择品牌
    chooseBrand: function (event) {
      console.log(event)
      var brandId = event.currentTarget.dataset.brandId;
      var index = event.currentTarget.dataset.index;
      this.setData({
        chooseBrandIndex: index,
        brandId: brandId,
        page: 1
      })
      this.getCarListData();
      // 按钮统计
      var tjParam = {
        buttonType: 30,
        pageType: 10,
        appType: 1
      }
      buttonStat(tjParam).then(function (res) { })      
    },
    // 显示更多车系
    show_move: function () {
      this.setData({
        s_move: !this.data.s_move
      })
      // 按钮统计
      var tjParam = {
        buttonType: 31,
        pageType: 10,
        appType: 1
      }
      buttonStat(params).then(function (res) { }) 
    },
    // 品牌列表里选择
    chooseBrand_list: function (event) {
      console.log(event)
      var brandId = event.currentTarget.dataset.brandId;
      var index = event.currentTarget.dataset.index;
      this.setData({
        chooseBrandIndex_list: index,
        chooseBrandIndex: Number(index) + 1,
        brandId: brandId,
        s_move: false
      })
      this.getCarListData();
      // 按钮统计
      var tjParam = {
        buttonType: 32,
        pageType: 6,
        appType: 1
      }
      buttonStat(tjParam).then(function (res) { }) 
    },
    // 触底操作
    onReachBottom: function () {
      if (this.data.page < this.data.lastPage) {
        this.getCarListData(9);
      } else {
        wx.showToast({
          title: '没有更多数据了！',
        })
      }
    }
  }
})
