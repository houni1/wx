// components/city2/city2.js

import { getCityInfo } from '../../servies/services.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  created () {
    console.log('城市组件')
    this.getCityInfo()
  },

  /**
   * 组件的初始数据
   */
  data: {
    cityData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getCityInfo: function () {
      console.log('城市组件获取城市数据')
      getCityInfo().then(res => {
        console.log(res)
        this.setData({
          cityData: res
        })
      })
    }
  }
})
