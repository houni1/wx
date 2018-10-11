import { getOnSaleData, buttonStat, starStat, popStat, bindingEnterprise, getUserInfo } from '../../../servies/services.js';
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bindFlag: false,     // 输入企业账号弹框
    focusflag: false,      // 弹框弹起默认获取焦点
    phone: '',            // 绑定企业的手机号
    iphoneX: "50%",
    userId: '',            // 当前用户Id [必传]
    toUserId: '',          // 被查看用户Id [必传]
    tabIndex: 0,            // 顶部tab切换索引
    showSelect: false,      // 全部商品筛选
    goodsSelectIndex: false,
    height: 0,
    goodsSelectName: '全部商品',
    list: [],                 // 列表数据,
    brandId: '',              // 品牌id [非必传]
    status: '1',              // 1上架 2下架 [非必传]
    page: 1,                  // 当前页 [必传]
    type: '',                 // 商品类型：''-全部商品, 1-自营, 2-一猫 [非必传]
    onShelf: 0,               // 已售出
    unOnShelf: 0,             // 已下架
    lastPage: 1,              // 最后页数
    noData: false,            // 缺省页面
    longitude: '',
    latitude: '',
    formId: '',
    arrowColor: false,
    network: true, // 无网络连接
    isShowShadow: false,
    isCover: ''              //  是否绑定过企业：1--绑定过，2--未绑定
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var _this = this;
    _this.setData({
      bindFlag: false
    });
    // 按钮统计
    var tjParam = {
      buttonType: 8,
      pageType: 0,
      appType: 1,                               // 来源 [必传] 1-推车猫，2-一猫商城，3-车商猫
      formId: this.data.formId,                 // 模版ID
      userId: app.globalData.authorize_user_id, // 用户ID
    }
    buttonStat(tjParam).then(function (res) {
      // console.log(tjParam)
    }) 
    wx.getNetworkType({
      success(res) {
        if (res.networkType == "none") {
          _this.setData({
            network: false
          })
          wx.hideLoading()
          return;
        }
      }
    })

    _this.setData({
      userId: app.globalData.authorize_user_id,
      toUserId: app.globalData.authorize_user_id
    });
    
    _this.getDataList();
    
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: res.windowHeight - res.windowWidth / 750 * 134
        })
      }
    });
    
    
    wx.getSystemInfo({
      success: function (res) {
        let name = 'iPhone X'
        if (res.model.indexOf(name) > -1 || (res.screenHeight>800&&res.brand=="iPhone")) {
          _this.setData({
            iphoneX: "40%"
          })
        }
      },
      fail(e) {
        console.log("失败", e)
      }
    })

    // 判断是否绑定过企业
    var params = {
      userId: app.globalData.authorize_user_id
    }
    getUserInfo(params).then(function (res) {
      console.log(res)
      _this.setData({
        isCover: res.isSync
      });
    })
    console.log(_this.isCover)
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
      showSelect: !this.data.showSelect,
      arrowColor: true
    });
  },
  /**
   * 选择商品类型
   */
  goodsSelect: function (event){
    console.log(event.currentTarget.dataset.type)
    this.setData({
      showSelect: false,
      goodsSelectName: event.currentTarget.dataset.name,
      type: event.currentTarget.dataset.type,
      goodsSelectIndex: true
    });
    this.getDataList();
  },
  clickAround(){
    this.setData({
      showSelect: false
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 1
    });
    this.getDataList();
  },

  // 绑定企业按钮点击出弹框
  bindbtn: function () {
    this.setData({
      bindFlag: true,
      focusflag: true
    })
  },

  // 点击取消弹窗收起
  cancel: function () {
    let btnParams = {
      buttonType: '14',
      pageType: '2',
      appType: '1'
    }
    buttonStat(btnParams).then(res => {
      // console.log(res)
    })
    this.setData({
      bindFlag: false,
      focusflag: false
    })
    this.setData({
      phone: ''
    })
  },

  // 获取弹框手机号
  phone: function (e) {
    this.setData({
      phone: parseInt(e.detail.value)
    })
  },

  // 点击弹框确定按钮获取在售车型
  sure: function () {
    var _this = this;
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (phoneReg.test(this.data.phone)) {
      var params = {
        page: 1,                  // 当前页 [必传]
        brandId: '',                    // 品牌id [非必传]
        status: 1,       // 上下架状态 1上架 2下架 [非必传]
        type: '',            // 1 自营 2 一猫 [非必传]
        phone: _this.data.phone
      }
      bindingEnterprise(params).then(function (res) {
       console.log(res)
       if (res.type == 1) {
         wx.navigateTo({
           url: '../searchResults/searchResults?phone=' + _this.data.phone,
         })
         _this.setData({
           bindFlag: false,
           focusflag: false,
           phone: ''
         })
       } else {
         wx.showToast({
            title: '该账号未注册车商猫',
            icon: 'none'
         })
         _this.setData({
           focusflag: false
         })
       }
        
      })
        
     
     
    } else {
      wx.showToast({
        title: '手机号格式有误，请重新输入',
        icon: 'none',
        success: function(){
          this.setData({
            phone: ''
          })
        }
      })

      let btnParams = {
        buttonType: '15',
        pageType: '2',
        appType: '1'
      }
    }
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
        icon: "none"
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res,e) {
    if (res.from === 'button') {
      return {
        title: res.target.dataset.title,
        path: '/pages/cart/mark/mark?saleId=' + this.data.userId + '&page=5&type=2&id=' + res.target.dataset.id,
        imageUrl: res.target.dataset.cover,
        success: (res) => {
          // console.log("转发成功", res);
          // 按钮统计
          var tjParam = {
            buttonType: 23,
            pageType: 7,
            appType: 1,                               // 来源 [必传] 1-推车猫，2-一猫商城，3-车商猫
            formId: this.data.formId,                 // 模版ID
            userId: app.globalData.authorize_user_id, // 用户ID
          }
          buttonStat(tjParam).then(function (res) {
            // console.log(tjParam)
          })
        },
        fail: (res) => {
          // console.log("转发失败", res);
        }
      }
      var event = e || event;
      event.stopPropagation();
    } else {
      // console.log("来自右上角转发菜单");
    }
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
      page: pageNum,                  // 当前页 [必传]
      brandId: '',                    // 品牌id [非必传]
      status: this.data.status,       // 上下架状态 1上架 2下架 [非必传]
      type: this.data.type            // 1 自营 2 一猫 [非必传]
    }
    getOnSaleData(params).then(function (res) {
      // loadKind==9时为上拉加载动作
      if (loadKind == 9) {
        _this.setData({
          onShelf: res.amount.onShelf || 0,
          unOnShelf: res.amount.unOnShelf || 0,
          list: _this.data.list.concat(res.list),
          lastPage: res.page.lastPage,
          page: res.page.currentPage,
          noData: false
        })
      } else {
        if (res.list.length > 0) {
          _this.setData({
            onShelf: res.amount.onShelf || 0,
            unOnShelf: res.amount.unOnShelf || 0,
            list: res.list,
            lastPage: res.page.lastPage,
            page: res.page.currentPage,
            noData: false
          })
        } else {
          _this.setData({
            onShelf: res.amount.onShelf || 0,
            unOnShelf: res.amount.unOnShelf || 0,
            list: res.list,
            lastPage: 1,
            page: 1,
            noData: true
          })
        }
      }
      wx.stopPullDownRefresh();
    })
  },
  // 获取formId
  getFormId: function (e) {
    this.setData({
      formId: e.detail.formId
    })
  }

})

wx.onNetworkStatusChange((res) => {
  let pages = getCurrentPages();
  let page = pages[pages.length - 1];
  page.setData({
    network: res.isConnected
  })
  if (!res.isConnected) {
    wx.hideLoading()
  } else {
    wx.showLoading();
    page.onLoad()
    wx.hideLoading()
  }
})