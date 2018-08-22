// pages/attribute-test/components/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectType: {
      type: String,
      value: 'checkbox'
    },
    radioData: {
      type: Array,
      value: []
    },
    checkboxData: {
      type: Array,
      value: []
    },
    isHidden: {
      type: Boolean,
      value: false
    },
    maxLength: {
      type: Number,
      value: 2
    },
    checkboxIndexArr: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    initRadioClass: 'radio flex-wrapper flex-direction-row',
    focusRadioClass: 'radio flex-wrapper flex-direction-row active',
    initCheckboxClass: 'checkbox flex-wrapper flex-direction-row',
    focusCheckboxClass: 'checkbox flex-wrapper flex-direction-row active',
    radioIndex: null,
    centerStyle: '0 29rpx 30rpx',
    sideStyle: '0 0 30rpx 0'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // radio选择改变触发的函数
    radioChange: function (e) {
      let value = e.detail.value;
      this.setData({
        radioIndex: value
      })

      this.triggerEvent('radioChange', value);
    },
    // checkbox选择改变触发的函数
    checkboxChange: function (e) {
      let value = e.detail.value;
      this.setData({
        checkboxIndexArr: value
      })

      this.triggerEvent('checkboxChange', value);
    }
  }
})
