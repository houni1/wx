// components/city2/city2.js

import { getprovinceInfo } from '../../servies/services.js';

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
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 获取省数据
    getprovinceInfo: function () {
      console.log('城市组件获取省数据')
      getprovinceInfo().then(res => {
        // console.log(res)
        this.setData({
          provinceData: res
        })
      })
    },

    // 获取市数据
    getCityInfo: function () {
      console.log('城市组件获取省数据')
      getCityInfo().then(res => {
        console.log(res)
        this.setData({
          cityData: res
        })
      })
    },
    bindChange: function (e) {
      console.log(e)
      const val = e.detail.value
      console.log(this.data.provinceData[val[0]].name,this.data.cityData[val[1]])
      this.setData({
        cityData: this.data.provinceData[val[0]].city
      })
    }
  }
})


