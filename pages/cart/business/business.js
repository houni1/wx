// pages/cart/business/business.js
let globalData = getApp().globalData;
import { getBusinessList, buttonStat,deleteCircle } from "../../../servies/services.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authUser: '',  // 全局userid赋值
    alarm: false,  //加载数据后提示弹框
    datashow: true,
    newNum: "",
    page: {
      perPage: "",//每页条数
      currentPage: "",//当前页
      lastPage: "",//总页数
    },
    list: [],//车商圈列表
    currentPage: 1,
    network: true,
    formId: "",
    isAll: true,   // 是否显示全文
    showTab:true
  },
  //头像预览
  preview_head(e) {
    // this.formStat(21)
    // let head = e.currentTarget.dataset.head;
    // wx.previewImage({
    //   current: head,
    //   urls: [head]
    // })
    this.checkcard(e)
  },
  //车商圈图片预览
  preview_friend(e) {
    let img = e.currentTarget.dataset.img;
    img = img.slice(0, img.length - 6);
    let list = e.currentTarget.dataset.list;
    list.forEach((item, index) => {
      list[index] = item.slice(0, item.length - 6)
    })
    wx.previewImage({
      current: img,
      urls: list
    })
  },
  //快速联系
  quickcall(e) {
    this.formStat(11)
    let phone = e.currentTarget.dataset.phone;
    if (phone == "") {
      wx.showToast({
        title: "该用户暂无电话",
        icon: 'none',
        duration: 1500,
        mask: false,
      });
    } else {
      wx.showModal({
        title: '拨打电话',
        content: phone,
        success: function (res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: phone
            })
          } else if (res.cancel) {
          }
        }
      })
    }

  },
  //查看名片
  checkcard(e) {
    let shareId = e.currentTarget.dataset.userid;
    let userId = globalData.authorize_user_id;
    //按钮
    buttonStat({ appType: 1, pageType: 5, buttonType: 22}).then((res) => {
      wx.showTabBar();
      if (shareId == userId) {
        wx.navigateTo({
          url: '../card/card',
        })
      } else {
        globalData.saleId = shareId;
        wx.navigateTo({
          url: '../otherpage/otherpage',
        })
      }
    })
  },
  //formId获取
  formSubmit(e) {
    this.setData({
      formId: e.detail.formId
    })

  },

  //发布信息
  send() {
    this.formStat(24)
    wx.navigateTo({
      url: '../sendinfo/sendinfo',
    })
  },
  //分享
  share(e) {
    this.formStat(23)
    let userId = e.currentTarget.dataset.userid;
    let circleId = e.currentTarget.dataset.circleid;
    wx.navigateTo({
      url: '../share/share?userId=' + userId + '&circleId=' + circleId,
    })
  },
  //加压缩比
  compress(list) {
    list.forEach((item, index) => {

      if (item.prices.length == 1) {
        item.prices[0] = item.prices[0] + "/252/2"
      }
      if (item.prices.length > 1) {
        item.prices.forEach((con, num) => {
          item.prices[num] = con + "/251/2"
        })
      }
    });
    return list
  },
  //加载车商圈列表数据
  getData(data, callback) {
    var that = this;
    getBusinessList(data).then((res) => {
      if (res.list.length == 0) {
        this.setData({
          datashow: false
        })
      } else {
        this.setData({
          datashow: true
        })
      }
      
      let list = this.compress(res.list)
      for(var i=0;i<list.length;i++){
        list[i].isAll = true
      }
      this.setData({
        page: res.page,
        list: list,
        newNum: res.newNum,
      })
        
      wx.stopPullDownRefresh()
      if (callback && callback instanceof Function) {
        callback()
      }
    })
  },
  //上拉加载数据
  uploadData() {
    let curpage = this.data.currentPage - 0 + 1;
    if (curpage > this.data.page.lastPage) {
      wx.showToast({
        title: "已没有更多内容",
        icon: 'none',
        duration: 1500,
        mask: false,
      });
      return
    }
    this.setData({
      currentPage: curpage
    })
    let data = {
      currentPage: this.data.currentPage,
      userId: globalData.authorize_user_id
    }
    getBusinessList(data).then((res) => {
      let list = this.compress(res.list);
      this.setData({
        page: res.page,
        list: this.data.list.concat(list),
      })

    })
  },
  //下拉刷新数据
  pulldownData() {
    let _this = this;
    this.setData({
      currentPage: 1
    })
    let data = {
      currentPage: this.data.currentPage,
      userId: globalData.authorize_user_id
    }
    let remind = function () {
      if (!_this.data.alarm) {
        _this.setData({
          alarm: true
        })
        setTimeout(() => {
          if (_this.data.alarm) {
            _this.setData({
              alarm: false
            })
          }
        }, 2000)
      }
    }
    this.getData(data, remind)

  },
  // 显示全文，收起
  showClose: function(event){
    var index = event.currentTarget.dataset.index;
    this.data.list[index].isAll = !this.data.list[index].isAll
    this.setData({
      list:  this.data.list
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.hideShareMenu()//隐藏右上角分享按钮
   
    if(options.reload){
      this.setData({
        currentPage:1,
        list:[]
      })
    }
    let data = {
      currentPage: this.data.currentPage,
      userId: globalData.authorize_user_id,
    }
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
    this.getData(data)
  },
  //有formId的按钮统计
  formStat(type) {
    let _this = this;
    buttonStat({ appType: 1, pageType: 5, buttonType: type, formId: _this.data.formId, userId: globalData.authorize_user_id }).then((res) => {
      _this.setData({
        formId: ""
      })
    })
  },
  deleteCircle(e){
    let userId = e.currentTarget.dataset.userid;
    let circleId = e.currentTarget.dataset.circleid;
    let data={userId,circleId}
    let index=e.currentTarget.dataset.index;
    let _this=this;
    wx.showModal({
      title: "确定要删除这条动态吗？",
      content:"" ,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: res => {
        if(res.confirm){
          deleteCircle(data).then(()=>{
           let list= _this.data.list;
           list.splice(index,1)
            _this.setData({
              list:list
            })
          })
        }
      }
    });
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
    this.setData({
      authUser: globalData.authorize_user_id
    })
    buttonStat({ appType: 1, pageType: 0, buttonType: 9 }).then((res) => {
    })
  },
  onPageScroll(e){
    if(e.scrollTop > 200){
      wx.hideTabBar()
      this.setData({
        showTab:false
      })
    }else{
      this.setData({
        showTab:true
      })
      wx.showTabBar();
    }
  },
  showTab(){
    this.setData({
      showTab:true
    })
    wx.showTabBar();
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
    this.pulldownData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.uploadData()
  },

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
  }
})