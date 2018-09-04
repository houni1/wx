// pages/cart/cardcase/cardcase.js
let globalData = getApp().globalData;
import { getCardList } from '../../../servies/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:[
          {
              "id":"4",
              "headPortrait":"http://img.emao.net/user/avatar/nc/xz/cbyl-190x190.png/180",
              "nickName":"巴拉巴拉",
              "position": "经理",
              "popularity":"23",
              "provinceName":"北京",
              "phone":"13656787654",
              "email":"12306@emao.com",
              "deamerName":"大宝汽车贸易有限公司",
              "isAuthorization":"1"
          },
          {
              "id": "4",
              "headPortrait": "http://img.emao.net/user/avatar/nc/xz/cbyl-190x190.png/180",
              "nickName": "巴拉巴拉",
              "position": "经理",
              "popularity": "23",
              "provinceName": "北京",
              "phone": "13656787654",
              "email": "12306@emao.com",
              "deamerName": "大宝汽车贸易有限公司",
              "isAuthorization": "2"
          },
          {
              "id": "4",
              "headPortrait": "http://img.emao.net/user/avatar/nc/xz/cbyl-190x190.png/180",
              "nickName": "巴拉巴拉",
              "position": "经理",
              "popularity": "23",
              "provinceName": "北京",
              "phone": "13656787654",
              "email": "12306@emao.com",
              "deamerName": "大宝汽车贸易有限公司",
              "isAuthorization": "1"
          }
      ],
      apply:[
          {
              "id": "4",
              "headPortrait": "http://img.emao.net/user/avatar/nc/xz/cbyl-190x190.png/180",
              "nickName": "巴拉巴拉",
              "position": "经理",
              "popularity": "25",
              "provinceName": "北京",
              "phone": "13656787654",
              "email": "12306@emao.com"
          },
          {
              "id": "4",
              "headPortrait": "http://img.emao.net/user/avatar/nc/xz/cbyl-190x190.png/180",
              "nickName": "巴拉巴拉",
              "position": "经理",
              "popularity": "25",
              "provinceName": "北京",
              "phone": "13656787654",
              "email": "12306@emao.com"
          }, {
              "id": "4",
              "headPortrait": "http://img.emao.net/user/avatar/nc/xz/cbyl-190x190.png/180",
              "nickName": "巴拉巴拉",
              "position": "经理",
              "popularity": "25",
              "provinceName": "北京",
              "phone": "13656787654",
              "email": "12306@emao.com"
          },
          {
              "id": "4",
              "headPortrait": "http://img.emao.net/user/avatar/nc/xz/cbyl-190x190.png/180",
              "nickName": "巴拉巴拉",
              "position": "经理",
              "popularity": "25",
              "provinceName": "北京",
              "phone": "13656787654",
              "email": "12306@emao.com"
          }
      ]
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
              apply: res.apply
          })
      });
 }
})