let lastY = 0

// component/refresh/refres.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      backgroundColor: {
         type: String,
         value: "#000"
      },
      refreshHeight: {
         type: Number,
         value: 50
      },
   },

   /**
    * 组件的初始数据
    */
   data: {
      pullState: false,
      scrollTop: 0,
      refreshHeight: 50, //触发刷新的最小高度
   },

   /**
    * 组件的方法列表
    */
   methods: {
      //页面触摸开始事件，必须在触摸开始方法中调用此方法
      handletouchstart: function(event) {
         lastY = event.touches[0].clientY
      },
      //页面触摸移动事件，必须在触摸开始方法中调用此方法
      handletouchmove: function(event) {
         let clientY = event.touches[0].clientY
         let offsetY = clientY - lastY;
         if (this.data.scrollTop > 0 || offsetY < 0) return
         if (offsetY > this.data.refreshHeight) {
            this._pullStateChange(true)
         } else {
            this._pullStateChange(false)
         }
      },
      //页面触摸结束事件，必须在触摸开始方法中调用此方法
      handletouchend(event) {
         setTimeout(() => {
            this._pullStateChange(false)
         }, 1500)
      },
      //页面触摸取消事件，必须在触摸开始方法中调用此方法
      handletouchcancel: function(event) {
         this._pullStateChange(false)
      },
      //页面滚动
      onPageScroll: function(event) {
         this.setData({
            scrollTop: event.scrollTop
         })
      },
      _pullStateChange(state) {
         this.setData({
            pullState: state
         })
      }
   }
})