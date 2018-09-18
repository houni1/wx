import { getBrandList, getOnSaleData, buttonStat, starStat, popStat } from '../../servies/services.js';
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
    list: [],                   // 车型列表
    defaultList: ['奥迪', '宝马', '奔驰', '本田'],
    brandList: [],              // 品牌列表
    chooseBrandIndex: 0,
    chooseBrandIndex_list: -1,
    s_move: false,
    brandId: '',                // 车型id
    userId: '',                 // 用户id
    saleId: '',                 // 被查看人id
    page: 1,                    // 当前页
    lastPage: 1,                // 总页数
    noData: false,               // 缺省页面
    longitude: '',
    latitude: '',
    isShowShadow: false
  },

  ready: function () {
    this.getLocation();
    this.setData({
      userId: app.globalData.authorize_user_id,
      saleId: app.globalData.saleId
    });
    // 获取品牌列表
    this.getBrandListData();
    // 获取别人车源信息列表
    this.getCarListData();

    // 猫哥卫星统计
    var params = {
      userId: app.globalData.saleId,         // 销售人员id [必传]
      checkId: app.globalData.authorize_user_id,        // 查看人id [必传]
      checkType: '1',      //行为 [必传] 1.查看车型列表 2.查看名片 3.拨打电话 4.分享名片 5.互换名片
      sourceType: '2',     // 信息来源 [必传] 1.一猫商城小程序 2.非一猫商城小程序
      buttonType: '40',     // 按钮类型（同按钮统计接口）
      pageType: '0',       // 浏览页面（同按钮统计接口）
      type: '3'            // 事件区分 1.只猫哥卫星 2.只人气统计 3.两个都需要
    }
    // console.log('猫哥卫星统计传参', params)
    starStat(params).then(function (res) {
      // console.log('别人车源猫哥卫星统计成功')
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭弹窗
    toggleShadow(e) {
      let bool = e.currentTarget.dataset.isshow;

      this.setData({
        isShowShadow: bool
      })
    },
    // 获取品牌列表
    getBrandListData: function() {
      var _this = this;
      // 请求品牌列表数据
      var params = {
        userId: _this.data.saleId     // 被查看用户Id [必传]
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
        toUserId: _this.data.saleId,                  // 被查看用户Id [必传]
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
              page: 1,
              lastPage: 1
            });
          }
        }
      })
    },
    // 选择品牌
    chooseBrand: function (event) {
      var brandId = event.currentTarget.dataset.brandId;
      var index = event.currentTarget.dataset.index;
      this.setData({
        chooseBrandIndex: index,
        chooseBrandIndex_list: index - 1,
        brandId: brandId,
        page: 1
      })
      this.getCarListData();
      // 按钮统计
      var tjParam = {
        buttonType: 30,
        pageType: 10,
        appType: 1,
        userId: app.globalData.authorize_user_id,
        formId: this.data.formId
      }
      buttonStat(tjParam).then(function (res) { 
        // console.log('品牌分类统计')
      })      
    },
    // 显示更多车系
    show_move: function () {
      // console.log(this.data.s_move)
      this.setData({
        s_move: !this.data.s_move
      })
      // 按钮统计
      var tjParam = {
        buttonType: 31,
        pageType: 10,
        appType: 1,
        userId: app.globalData.authorize_user_id,
        formId: this.data.formId
      }
      buttonStat(tjParam).then(function (res) { }) 
    },
    // 品牌列表里选择
    chooseBrand_list: function (event) {
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
        appType: 1,
        userId: app.globalData.authorize_user_id,
        formId: this.data.formId
      }
      buttonStat(tjParam).then(function (res) { }) 
    },
    clickAround(){
      this.setData({
        s_move: false
      })
    },
    // 触底操作
    onReachBottom: function () {
      if (this.data.page < this.data.lastPage) {
        this.getCarListData(9);
      } else {
        wx.showToast({
          title: '没有更多数据了！',
          icon: "none"
        })
      }
    },
    // 获取formId
    getFormId: function (e) {
      this.setData({
        formId: e.detail.formId
      })
    },
    // 点击半透明层收起品牌列表弹窗
    closeThiv: function () {
      this.setData({
        s_move: false
      });
    },
    // 获取地理定位并转化成城市信息，并存入公共空间
    getLocation() {
      let _this = this;
      wx.getLocation({
        type: 'wgs84',
        complete(res) {
          let errMsg = res.errMsg;
          if (errMsg == "getLocation:ok") {
            _this.setData({
              latitude: res.latitude,
              longitude: res.longitude
            });
            app.globalData.latitude = res.latitude
            app.globalData.longitude = res.longitude
            wx.getSetting({
              success(res) {
                if (!res.authSetting['scope.userLocation']) {
                  _this.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                  });
                }
              }
            })
          } else {
            _this.setData({
              isShowShadow: true
            });
          }
        }
      })
    }
  }
})
