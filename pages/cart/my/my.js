// pages/cart/my/my.js
let globalData = getApp().globalData;
import { getUserInfo, buttonStat } from '../../../servies/services.js';
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
    flag:false,
    formId:'',
    network:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let _this=this;
     wx.getNetworkType({
      success(res){
        console.log(res.networkType)
        if(res.networkType=="none") {
          _this.setData({
            network:false
          })
          wx.hideLoading()
          return ;
        }
        }
      })
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
       this.userInfo();
        let params = {
            buttonType: 10,
            pageType: 0,
            appType: 1,
            userId: globalData.authorize_user_id
        }
        buttonStat(params).then(res => {
          
        })
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
      let params = {
          userId: globalData.authorize_user_id
      }
      getUserInfo(params).then(res => {
          this.setData({
              userInfo:res,
              flag:true
          })
      });
  },

  //跳转到更换绑定手机页面
  changePhone:function(){
      wx.navigateTo({
          url:'../changePhone/changePhone'
      })
  },
 
   //跳转到关于推车猫页面
    goToAbout: function () {
        var _this = this;
        setTimeout(function(){
            let params = {
                buttonType: 29,
                pageType: 9,
                appType: 1,
                userId: globalData.authorize_user_id,
                formId: _this.data.formId
            }
            buttonStat(params).then(res => {
                _this.setData({
                    formId: ''
                })
                wx.navigateTo({
                    url: '../about/about'
                })
            })
        },500)
       
    },
     //跳转到名片夹
    goToCardcase: function() {
        var _this = this;
        setTimeout(function(){
            let params = {
                buttonType: 28,
                pageType: 9,
                appType: 1,
                userId: globalData.authorize_user_id,
                formId: _this.data.formId
            }
            buttonStat(params).then(res => {
                _this.setData({
                    formId: ''
                })
                wx.navigateTo({
                    url: '../cardcase/cardcase'
                })
            })
        },500)
      
       
    },

    //头像放大
    showPic:function(e){
        var picSrc = this.data.userInfo.headPortrait;
        wx.previewImage({
            current: picSrc, // 当前显示图片的http链接
            urls: [picSrc] // 需要预览的图片http链接列表
        })

    },

    //去往设置页面
    goToSetup:function(){
        var _this = this;
        setTimeout(function(){
            let params = {
                buttonType: 27,
                pageType: 9,
                appType: 1,
                userId: globalData.authorize_user_id,
                formId: _this.data.formId
            }
            console.log('全局' + _this.data.formId)
            console.log('赋值' + params.formId)
            buttonStat(params).then(res => {
                _this.setData({
                    formId: ''
                })
                wx.navigateTo({
                    url: '../setup/setup'
                })
            })
        },500)
      
        
    },


      //formId获取
    formSubmit(e) {
        console.log("formId", e.detail.formId)
        console.log(1);
        this.setData({
            formId: e.detail.formId
        })
        console.log('form触发' + this.data.formId)

    },

})
wx.onNetworkStatusChange((res)=>{
    let pages = getCurrentPages();
    let page=pages[pages.length-1];
    page.setData({
      network:res.isConnected
     }) 
     if(!res.isConnected){
      wx.hideLoading()
     }else{
       wx.showLoading();
       page.onLoad()
       wx.hideLoading()
     }
  })