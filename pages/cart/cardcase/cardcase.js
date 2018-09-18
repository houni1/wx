// pages/cart/cardcase/cardcase.js
let globalData = getApp().globalData;
import { getCardList, handleCardcase} from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:[],
      apply:[],
      flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.cardListInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideShareMenu()
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
//获取名片夹列表信息
  cardListInfo: function () {
    //   params = {
    //       userId: globalData.authorize_user_id
    //   };

    //   getCardList(params).then(res => {
    //       this.setData({
    //           userInfo:res.userInfo,
    //           apply:res.apply
    //       })
    //   });

      getCardList().then(res => {
          this.setData({
              userInfo: res.userInfo,
              apply: res.apply,
              flag:true
          })
      });
 },

  //拒绝交换名片夹
  refuseCardcase:function (event){
     var proposerId = event.currentTarget.dataset.id;
      let params = {
          userIdBe: proposerId,
          state:2
      }
      handleCardcase(params).then(res => {
          this.cardListInfo();
      })
  },

    //同意交换名片夹
    consentCardcase: function (event) {
       var proposerId = event.currentTarget.dataset.id;
        let params = {
            userIdBe: proposerId,
            state: 1
        }
        handleCardcase(params).then(res => {
            this.cardListInfo();
        })
    },

    //前往名片页面
    toCard:function(event){
       var salesmanId = event.currentTarget.dataset.userid;
        // console.log(salesmanId);
        globalData.saleId = salesmanId;
        // console.log("全局数据",globalData.saleId)
        wx.navigateTo({
            url: '../otherpage/otherpage'
        })
    }

})