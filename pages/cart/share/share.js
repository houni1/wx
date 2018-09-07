// pages/cart/share/share.js
import {creatPoster,sharePoster} from "../../../servies/services.js" ;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:"小明",
    createdAt:"星期一 2018/01/01 12:00:00",
    information:"今天来了一批好车，快来看看吧",
    prices:["http://pic.58pic.com/58pic/14/13/42/61F58PICmRS_1024.jpg",
       "http://img.zcool.cn/community/012f6f59cf44aea80121ae0cbb1ad3.jpg@3000w_1l_2o_100sh.jpg","http://img.zcool.cn/community/017c4955ee776932f875a1320b4f4d.jpg@1280w_1l_2o_100sh.jpg",
  "http://img05.tooopen.com/images/20141020/sy_73154627197.jpg"
  ],//动态图片
  them:[{
    "themeId" :"1",           //专题图片Id
    "title" :"热门推荐",           //标题
    "url" :"http://pic.58pic.com/58pic/14/13/42/61F58PICmRS_1024.jpg"              //专题图片路径
},
{
  "themeId" :"2",           //专题图片Id
  "title" :"类型1",           //标题
  "url" :"http://img.zcool.cn/community/012f6f59cf44aea80121ae0cbb1ad3.jpg@3000w_1l_2o_100sh.jpg"              //
},
{
  "themeId" :"3",           //专题图片Id
  "title" :"类型2",           //标题
  "url" :"http://img.zcool.cn/community/017c4955ee776932f875a1320b4f4d.jpg@1280w_1l_2o_100sh.jpg"              //
}

  ],
    userQrCode:"../business/images/car2.jpg",//二维码图片
    bannerHeight:"350rpx",//轮播图高度
    swiperCurrent:0,//当前轮播图索引
    list:[],//海报图片容器
   
    choseimg:""//分享出去时的海报照片
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.pushimg();
      creatPoster({userId:11,circleId:1,themeId:1}).then(res=>{
        console.log(res)
      })
      // sharePoster({userId:11,circleId:1}).then((res)=>{
      //   console.log(res)
      // })
     this.isShare()
    

  },
  //判断是否是通过分享进入的页面
  // isShare(){
  //   var pages = getCurrentPages() //获取加载的页面
  //   var currentPage = pages[pages.length-1] //获取当前页面的对象
  //   var url = currentPage.route //当前页面url
  //   var options = currentPage.options //如果要获取url中所带的参数可以查看options
  //   if(options.share==1){
  //     this.setData({
  //       bannershow:false
  //     })
  //   }
  // },
  // 动态确定轮播图宽高
  imageLoad: function (e) {

    var res = wx.getSystemInfoSync();
    
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,    
      ratio = imgwidth / imgheight;
      // console.log(res.windowWidth / ratio)
        this.setData({
          bannerHeight: res.windowWidth / ratio
        })
      },
      //海报图片切换时触发
      swiperChange(e){
        // console.log(e.detail.current)
        this.setData({
          swiperCurrent: e.detail.current ,  //获取当前轮播图片的下标
          choseimg:this.data.them[ e.detail.current].url
        })
      } ,
      //点击类型切换时触发
      clickEvent(e){
        this.setData({
          swiperCurrent: e.currentTarget.id
        })
      },
      //预览照片
      previewImage(e){
        let img=e.currentTarget.dataset.url;
          wx.previewImage({
             current: img,
             urls: this.data.list
          }) 
       },
       //提取出海报路径列表
       pushimg(){
         this.data.them.forEach(item=>{
            this.data.list.push(item.url)
         })
        //  console.log(this.data.list)
         this.setData({
           list:this.data.list,
           choseimg:this.data.them[0].url
         })

       },
       //下载海报
       downPoster(){

       },
       //取消
       cancel(){
        wx.navigateBack({
          delta: 1
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})