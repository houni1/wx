// components/business/business.js
let globalData = getApp().globalData;
import {getBusinessList,buttonStat,popStat,starStat} from "../../servies/services.js";
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
     datashow: true,
    alarm:false,  //加载数据后提示弹框
    newNum:"10" ,//加载数据条数
    list:[],
    page:{
      perPage:  "10",//每页条数
      currentPage:  "1",//当前页
      lastPage:  "3",//总页数
    },
      currentPage:1
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
      //查看名片
      checkcard(e){
          // this.btnStat(22)
          // let shareId=globalData.shareId;
          // let userId=globalData.authorize_user_id||0;
          console.log(e.currentTarget)
          //跳转到别人名片页
          this.triggerEvent('myevent')
      },
share(e){
  let userId=e.currentTarget.dataset.userid;
    let circleId=e.currentTarget.dataset.circleid;
    console.log(e.currentTarget.dataset.userid)
     wx.navigateTo({
        url: '../share/share?userId='+userId+'&circleId='+circleId,
     })
},
//获取列表数据
getData(data){
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
  console.log("curr",this.data.currentPage)
  let data={
    currentPage:this.data.currentPage,
    shareId:globalData.saleId,
    userId:globalData.authorize_user_id
  }
  getBusinessList(data).then((res)=>{
    console.log(res)
    // console.log(res.page)
    this.setData({
      page:res.page,
      list:this.data.list.concat(res.list),  
    })
    
  })
},
//下拉刷新数据
pulldownData(){
  this.setData({
    currentPage:1
  })
  let data={
    currentPage:this.data.currentPage,
    shareId:globalData.saleId,
    userId:globalData.authorize_user_id
  }
  this.getData(data)
  if(!this.data.alarm){
    this.setData({
      alarm:true
    })
       setTimeout(()=>{
    if(this.data.alarm){
      this.setData({
        alarm:false
      })
    }
  },2000)
  }

},
  },
  //组件实例化但节点树还未导入，因此这时不能用setData
  created(){
   //  list=[] datashow: true,
   console.log(99,globalData.saleId,globalData.authorize_user_id)
   let data={
    currentPage:this.data.currentPage,
    shareId:globalData.saleId,
    userId:globalData.authorize_user_id
  }
  this.getData(data)
  },
  //节点树完成可以用setData渲染节点，但无法操作节点
   attached (){

   },
   //组件布局完成，这时可以获取节点信息，也可以操作节点
   ready (){
      
   },
   //组建实例移除
   detached (){

   }


})
