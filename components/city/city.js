import { getprovinceInfo, getCityInfo } from '../../servies/services.js';
Component({
  created () {
    // console.log('城市组件')
    this.getprovinceInfo();
    this.getCityInfo(1)
  },
  /**
   * 组件的初始数据
   */
  data: {
    provinceData: [], // 获取省数据
    cityData: [],  // 获取市数据
    val: [0, 0]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取省数据
    getprovinceInfo: function () {
      getprovinceInfo().then(res => {
        this.setData({
          provinceData: res
        })
      })
    },

    // 滚动省数据获取省id
    bindChange: function (e) {
      // console.log(e.detail)
    },

    // 获取市数据
    getCityInfo: function (id) {
      getCityInfo({ provinceId: id}).then(res => {
        this.setData({
          cityData: res
        })
      })
    },
    // 切换省份和城市
    bindChange: function (e) {
      const val = e.detail.value
      this.setData({
        val: val
      })
      // 触发此方法，如果data里的provinceId与当前动作获取的provinceId一致，则为切换城市，不触发请求城市列表接口，否则为切换省份
      var provinceId = this.data.provinceData[val[0]].id
      if (e.detail.value[0] == provinceId) {
        return;
      }
      this.getCityInfo(provinceId)
    },
    // 点击完成获取到选择的省份和城市
    complete: function () {
      var val = this.data.val
      // console.log(this.data.provinceData[val[0]].name,this.data.provinceData[val[0]].id + '-' + this.data.cityData[val[1]].name)
    },
    cancel: function () {
      this.setData({
        cityShow: false
      })
    }
  }
})


