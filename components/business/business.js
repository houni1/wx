// components/business/business.js
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
    alarm:false,  //加载数据后提示弹框
    loadNum:10 ,//加载数据条数
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

  /**
   * 组件的方法列表
   */
  methods: {
//头像预览
preview_head(e){
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
    let index=e.currentTarget.dataset.index;
        
    wx.previewImage({
       current: img,
       urls: list
      
    }) 
 },
 quickcall(e){
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
 checkcard(e){
  let userId=e.currentTarget.dataset.userId;
   wx.navigateTo({
      url: '../cardpic/cardpic',
   })
},
send() {
   wx.navigateTo({
      url: '../sendinfo/sendinfo',
   })
},
share(e){
   wx.navigateTo({
      url: '../share/share',
   })
},
  }
})
