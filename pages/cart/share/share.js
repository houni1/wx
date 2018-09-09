// pages/cart/share/share.js
import {creatPoster,sharePoster,buttonStat} from "../../../servies/services.js" ;

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
    img:""
   
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()//隐藏右上角分享按钮
      sharePoster({userId:11,circleId:1}).then((res)=>{
        console.log(res)
        this.setData({
          nickname:res.nickname,
          createdAt:res.createdAt,
          information:res.information,
          prices:res.prices,
          them:res.theme,
          userQrCode:res.userQrCode,
        })
      })
      this.pushimg();
      creatPoster({userId:1,circleId:1,themeId:1}).then(res=>{
        console.log(res)
        this.setData({
          img:res
        })
      })
    

  },
   //按钮统计
   btnStat(type){
    console.log(type)
    buttonStat({appType:1,pageType:6,buttonType:type}).then((res)=>{
  console.log(res)
})
 },
      //海报图片切换时触发
      swiperChange(e){
        this.btnStat(25)
        // console.log(e.detail.current)
        this.setData({
          swiperCurrent: e.detail.current ,  //获取当前轮播图片的下标
        })
      } ,
      //点击类型切换时触发
      clickEvent(e){
        this.btnStat(25)
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
           
         })

       },
       //下载海报
       downPoster(){
    let _this = this;
    // 获取图片路径并保存
    function getImgInfoToSave (src) {
      console.log(src)
      wx.getImageInfo({
        src: src,
        success: function (sres) {
          console.log('获取图片信息')
          wx.saveImageToPhotosAlbum({
            filePath: sres.path,
            success: function (fres) {
              console.log('图片保存成功')
               wx.showToast({
                  title: "已保存至相册，快发给你的好友看看把",
                  icon: "success",
               })
            }
          })
        },
        fail(){
          // console.log("失败",src)
        }
      })
    } 
    // 判断是否已经授权writePhotosAlbum（保存图片）
      let imgUrl = this.data.img;
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            console.log('授权失败')
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                console.log("相册授权成功")
                getImgInfoToSave(imgUrl)
              }
            })
          } else {
            getImgInfoToSave(imgUrl)
          }
        }
    })
  
       },
       //取消
       cancel(){
        this.btnStat(14)
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