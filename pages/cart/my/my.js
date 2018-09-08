// pages/cart/my/my.js
let globalData = getApp().globalData;
import { getUserInfo } from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      //   "headPortrait":"http://img.emao.net/user/avatar/nc/xz/cbyl-190x190.png/180",
      //   "nickName":"大禹治水",
      //   "position":"经理",
      //   "company":"大宝汽车贸易有限公司"
    },
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.userInfo();
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


  //获取用户信息
  userInfo: function(){
    console.log(globalData.authorize_user_id)
    var params = {
      userId: Number(globalData.authorize_user_id)
    }
    getUserInfo(params).then(res => {
      this.setData({
          userInfo: res,
          flag:true
      })
    });
  },

  //跳转到更换绑定手机页面
  changePhone:function(){
    wx.navigateTo({
        url:'../changePhone/changePhone'
    })
  }
})