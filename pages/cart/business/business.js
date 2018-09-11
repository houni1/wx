// pages/cart/business/business.js
let globalData = getApp().globalData;
import {getBusinessList,buttonStat,popStat,starStat} from "../../../servies/services.js" 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alarm:false,  //加载数据后提示弹框
    datashow:true,
    newNum:"10",
    page:{
      perPage:  "10",//每页条数
      currentPage:  "1",//当前页
      lastPage: "",//总页数
    },
    list:[],//车商圈列表
    currentPage:1
  },
  //头像预览
   preview_head(e){
    this.btnStat(21)
    let head=e.currentTarget.dataset.head;
    console.log([head])
      wx.previewImage({
         current: head,
         urls: [head]
      }) 
   },
   //车商圈图片预览
   preview_friend(e){
      console.log(e);
      let img =e.currentTarget.dataset.img||"";
      let list=e.currentTarget.dataset.list||[];    
      wx.previewImage({
         current: img,
         urls: list   
      }) 
   },
   //快速联系
   quickcall(e){
    this.btnStat(11)
     let phone=e.currentTarget.dataset.phone;
      wx.showModal({
         title: '拨打电话',
         content: phone,
         success: function (res) {
            if (res.confirm) {
               console.log('用户点击确定')
               wx.makePhoneCall({
                phoneNumber:phone
               })
            } else if (res.cancel) {
               console.log('用户点击取消')
            }
         }
      })
   },
   //查看名片
   checkcard(e){
    this.btnStat(22)
    let shareId=e.currentTarget.dataset.userid;
    let userId=globalData.authorize_user_id;
    console.log(e.currentTarget)
    if(shareId==userId){
      wx.navigateTo({
        url: '../card/card',
     })
    }else{
      globalData.saleId=shareId;
      wx.navigateTo({
        url: '../otherpage/otherpage',
     })
    } 
  },
  //发布信息
  send() {
    this.btnStat(24)
     wx.navigateTo({
        url: '../sendinfo/sendinfo',
     })
  },
  //分享
  share(e){
    this.btnStat(23)
    let userId=e.currentTarget.dataset.userid;
    let circleId=e.currentTarget.dataset.circleid;
    console.log(e.currentTarget.dataset.userid)
     wx.navigateTo({
        url: '../share/share?userId='+userId+'&circleId='+circleId,
     })
  },
  //加载车商圈列表数据
  getData(data,callback){
    console.log("下拉",data)
    getBusinessList(data).then((res)=>{
      console.log(res)
      // console.log(res.page)
      if(res.list.length==0){
        this.setData({
          datashow:false
        })
      }else{
        this.setData({
          datashow:true
        })
      }
      this.setData({
        page:res.page,
        list:res.list,
        newNum:res.newNum,
      })
      wx.stopPullDownRefresh()
      if(callback&&callback instanceof Function){
        callback()
      }
    })

  },
  //上拉加载数据
  uploadData(){
    let curpage=this.data.currentPage-0+1
    console.log("c",this.data.currentPage)
    if(curpage>this.data.page.lastPage){
      wx.showToast({
        title: "已没有更多内容",
        icon: 'none',
        duration: 1500,
        mask: false,
      });
      return
    }
    this.setData({
      currentPage:curpage
    })
    let data={
      currentPage:this.data.currentPage,
      userId:globalData.authorize_user_id
    }
    getBusinessList(data).then((res)=>{
      console.log(res)
      this.setData({
        page:res.page,
        list:this.data.list.concat(res.list),  
      })
      
    })
  },
  //下拉刷新数据
  pulldownData(){
    let _this=this;
    this.setData({
      currentPage:1
    })
    let data={
      currentPage:this.data.currentPage,
      userId:globalData.authorize_user_id
    }  
   let remind= function(){
      if(!_this.data.alarm){
        _this.setData({
          alarm:true
        })
           setTimeout(()=>{
        if(_this.data.alarm){
          _this.setData({
            alarm:false
          })
        }
      },2000)
      }
    }
    this.getData(data,remind)
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()//隐藏右上角分享按钮
    let data={
      currentPage:this.data.currentPage,
      userId:globalData.authorize_user_id,
    }
    this.getData(data)
 
    //人气统计
    // popStat({
    //   userId:11,
    //   checkId:12,
    //   checkType:1
    // }).then((res)=>{
    //   console.log(res)   })
    //猫哥卫星统计
    // starStat({
    //   userId:12,
    //   checkId:13,
    //   checkType:2,
    //   sourceType:1
    // }).then((res)=>{
    //   console.log(res)
    // })
  },
     //按钮统计
     btnStat(type){
        console.log(type)
        buttonStat({appType:1,pageType:5,buttonType:type}).then((res)=>{
      console.log(res)
    })
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
    //停止下拉刷新
    // wx.stopPullDownRefresh() 
    this.pulldownData()
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