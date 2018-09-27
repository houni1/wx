let globalData = getApp().globalData;
import { getBusinessList,deleteCircle } from "../../../servies/services.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datashow: true,//车商圈列表是否有数据
    alarm: false,  //加载数据后提示弹框
    newNum: "",//加载数据条数
    list: [],//车商圈列表数据
    page: {
      perPage: "",//每页条数
      currentPage: "1",//当前页
      lastPage: "",//总页数
    },
    currentPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {
      currentPage: this.data.currentPage,
      shareId: globalData.authorize_user_id,
      userId: globalData.authorize_user_id
    }
    this.getData(data)
  },
  //头像预览
  preview_head(e) {
    // this.btnStat(21);
    // let head = e.currentTarget.dataset.head;
    // wx.previewImage({
    //   current: head,
    //   urls: [head]
    // })
    
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
    //跳转到别人名片页
    wx.navigateTo({
      url: '../card/card',
    })
  },
  //分享按钮点击
  share(e) {
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
  //获取列表数据
  getData(data) {
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
      this.setData({
        page: res.page,
        list: list,
        newNum: res.newNum,
      })
      wx.stopPullDownRefresh()
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
      shareId: globalData.authorize_user_id,
      userId: globalData.authorize_user_id
    }
    getBusinessList(data).then((res) => {
      let list = this.compress(res.list)
      this.setData({
        page: res.page,
        list: this.data.list.concat(list),
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
          console.log(1)
          deleteCircle(data).then(()=>{
            console.log(3)
           let list= _this.data.list;
           list.splice(index,1)
           console.log(list)
            _this.setData({
              list:list
            })
            if (_this.data.list.length == 0) {
              _this.setData({
                datashow: false
              })
            }
          })
        }else{
          console.log(2)
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
    this.uploadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})