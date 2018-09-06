// components/city2/city2.js
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
    years: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    year: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    month: 2,
    value: [11, 1],
  },

  created () {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindChange: function (e) {
      const val = e.detail.value
      this.setData({
        year: this.data.years[val[0]],
        month: this.data.months[val[1]]
      })
    }
  }
})
