// pages/cart/business/business.js
import {getBusinessList,buttonStat,popStat,starStat} from "../../../servies/services.js" 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alarm:false,  //加载数据后提示弹框
    loadNum:10 ,//加载数据条数
    datashow:true,
    page:{
      perPage:  "10",//每页条数
      currentPage:  "1",//当前页
      lastPage:  "3",//总页数
    },
    list:[
      {
        "circleId": "1",//信息ID( 车商圈动态Id )
        "nickname": "小明",//名称
        "userId"  :  "1" ,//销售人员Id
        "phone"   :  "123445",//联系电话
        "headPortrait" :  "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg" ,//用户头像
        "popularity" :  "20",//销售人气
        "information":  "清仓大甩卖",//发布信息
        "prices" :  ["http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg","http://img.zcool.cn/community/01c60259ac0f91a801211d25904e1f.jpg@1280w_1l_2o_100sh.jpg","http://www.qqma.com/imgpic2/cpimagenew/2018/4/5/6e1de60ce43d4bf4b9671d7661024e7a.jpg","http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg","http://img.zcool.cn/community/01c60259ac0f91a801211d25904e1f.jpg@1280w_1l_2o_100sh.jpg","http://www.qqma.com/imgpic2/cpimagenew/2018/4/5/6e1de60ce43d4bf4b9671d7661024e7a.jpg"] ,//展示图片
        "createdAt" :  "2018/01/01 12:00:00"//发布时间
    },{
      "circleId": "3",//信息ID( 车商圈动态Id )
      "nickname": "小张",//名称
      "userId"  :  "3" ,//销售人员Id
      "phone"   :  "1235435",//联系电话
      "headPortrait" :  "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg" ,//用户头像
      "popularity" :  "20",//销售人气
      "information":  "今天又来了几款新车",//发布信息
      "prices" :  ["http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg","http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg","http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg","http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg"] ,//展示图片
      "createdAt" :  "2018/01/01 12:00:00"//发布时间
  },
    {
      "circleId": "2",//信息ID( 车商圈动态Id )
      "nickname": "小张",//名称
      "userId"  :  "2" ,//销售人员Id
      "phone"   :  "1235435",//联系电话
      "headPortrait" :  "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg" ,//用户头像
      "popularity" :  "20",//销售人气
      "information":  "今天又来了几款新车",//发布信息
      "prices" :  ["http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg"] ,//展示图片
      "createdAt" :  "2018/01/01 12:00:00"//发布时间
  }
    ],// 车商圈动态列表
    
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
   //查看名片照片
   checkcard(e){
    this.btnStat(22)
    let userId=e.currentTarget.dataset.userId;
     wx.navigateTo({
        url: '../otherpage/otherpage',
     })
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
    let userId=e.currentTarget.dataset.userid
    console.log(e.currentTarget.dataset.userid)
     wx.navigateTo({
        url: '../share/share?userId='+userId,
     })
  },
  //加载车商圈列表数据
  getData(data){
    getBusinessList(data).then((res)=>{
      console.log(res)
      //list==[]  datashow==false
      // console.log(res.page)
      // this.setData({
      //   page:res.page,
      //   list:res.list
      // })
    })
  },
  //上拉加载数据
  uploadData(){
    getBusinessList().then(res=>{

    })
  },
  //下拉刷新数据
  pulldownData(){
    getBusinessList().then(res=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()//隐藏右上角分享按钮
    let data={
      currentPage:1,
      shareId:11,
      userId:11
    }
    this.getData(data)
 
    //人气统计
    popStat({
      userId:11,
      checkId:12,
      checkType:1
    }).then((res)=>{
      console.log(res)   })
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
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
   
   onPullDownRefresh: function () {
   }
   
  
})