// components/city2/city2.js

import { getprovinceInfo, getCityInfo } from '../../servies/services.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  created () {
    console.log('城市组件')
    this.getprovinceInfo()
  },

  /**
   * 组件的初始数据
   */
  data: {
    provinceData: [], // 获取省数据
    cityData: [],  // 获取市数据
    value: ['上海', '上海']  // 选择城市的数据
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 获取省数据
    getprovinceInfo: function () {
      console.log('城市组件获取省数据')
      getprovinceInfo().then(res => {
        console.log(res)
        this.setData({
          provinceData: res
        })
      })
    },

    // 滚动省数据获取省id
    bindChange: function (e) {
      console.log(e.detail)
    },

    // 获取市数据
    getCityInfo: function (provinceId) {
      let params = {
        provinceId: provinceId
      }
      console.log('城市组件获取省数据')
      getCityInfo(params).then(res => {
        console.log(res)
        this.setData({
          cityData: res
        })
      })
    },
  }
})
