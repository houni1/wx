##无网络插件
###调用时再页面的json文件中引入n
"usingComponents": {
     "isnetwork":"/components/isnetwork/isnetwork"
  }
###wxml
<isnetwork class="isnetwork" wx:if="{{!network}}"></isnetwork>
###js
data:{
  network:true
}
onload(){
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
}
####在js底部加上网络监测方法
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
   }
})
###class=“isnetwork” 此样式在全局
<!-- 调用此组件当点击刷新时会重新载入页面 -->