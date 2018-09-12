// components/isnetwork/isnetwork.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
     refresh(){
        let pages = getCurrentPages();
        let page=pages[pages.length-1]
        page.onLoad()
        page.setData({
          network:true
        })
     }
  }
})
