// components/modleScreen/modleScreen.js
Component({
  //数据
  data: {
    checkboxIndexArr: [],
    // 是否显示阴影
    isShowShadow: false,
    // 点击的指数
    clickIndex: {
      // 当前展开的指数
      currentIndex: null,
      // 上一个展开的指数
      prevIndex: null
    },
    // 筛选是否是打开状态
    isScreenOpen: false,
    // 动画
    animationData: null,
    // 筛选模块
    screenData: [
      {
        name: '排序',
        items: [
          { index: '0', value: '默认排序' },
          { index: '1', value: '价格从低到高' },
          { index: '2', value: '价格从高到低' }
        ]
      },
      {
        name: '品牌',
        items: []
      },
      {
        name: "价格",
        items: [
          { index: '0', value: '价格不限' },
          { index: '1', value: '10万以下' },
          { index: '2', value: '10-15万' },
          { index: '3', value: '15-20万' },
          { index: '4', value: '20-25万' },
          { index: '5', value: '25-30万' },
          { index: '6', value: '30-40万' },
          { index: '7', value: '40万以上' },
        ]
      },
      {
        name: '更多',
        items: [
          {
            which: 'carriage',
            title: '类型',
            subItems: [
              { index: '2', value: '两厢' },
              { index: '4', value: '三厢' },
              { index: '8', value: 'SUV' },
              { index: '16', value: 'MPV' }
            ]
          },
          {
            which: 'gearBoxType',
            title: '变速箱',
            subItems: [
              { index: '2', value: '手动' },
              { index: '4', value: '自动' }
            ]
          },
          {
            title: '排量',
            which: 'displacement',
            subItems: [
              { index: '1', value: '1.0L以下' },
              { index: '2', value: '1.0-1.6L' },
              { index: '4', value: '1.7-2.0L' },
              { index: '8', value: '2.1-2.5L' },
              { index: '16', value: '2.6-3.0L' },
              { index: '32', value: '3.1-4.0L' },
              { index: '64', value: '4.0L以上' }
            ]
          }
        ]
      }
    ],
    // 选中效果
    focusColor: '#ffc900',
    focusAngle: '/images/icon-angle-focus.png',
    // 初始效果
    initColor: '#0f1110',
    initAngle: '/images/icon-angle.png',
    // 排序
    sort: 0,
    // 当前选项是否有操作，如果有，要高亮
    highLightArr: [false, false, false, false]
  },
  ready () {
    // 生成动画对象，在这里生成的原因是页面加载只需要生成一次，全剧使用
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    })

    this.animation = animation;
  },
  // 方法
  methods: {
    // 筛选按钮的点击
    itemClick (e) {
      let currentIndex = e.currentTarget.dataset.index;
      let prevIndex = this.data.clickIndex.currentIndex;
      this.setData({
        clickIndex: {
          currentIndex: currentIndex,
          prevIndex: prevIndex
        }
      })

      if (currentIndex == 1) {
        this.triggerEvent('showBrandList')
      }
      // 改变高度
      if (this.data.isScreenOpen && currentIndex == prevIndex) {
        this._getHeightToAnimate(null);
        this.setData({
          clickIndex: {
            currentIndex: null,
            prevIndex: null
          }
        })
        this._handleScreenOpen(false)
      } else {
        this._getHeightToAnimate('.content-wrapper .item' + currentIndex);
        this._handleScreenOpen(true)
      }
    },
    // 点击排序选项
    clickSortItem (e) {
      let index = e.currentTarget.dataset.index,
          bool = index == this.data.screenData[0].items[0].index ? false : true;

      this.setData({
        'highLightArr[0]': bool,
        sort: index
      })
      
      this._getHeightToAnimate(null);
      this._handleScreenOpen(false)
      this.triggerEvent('clickSortItem', index);
    },
    // 点击价格选项
    clickPriceItem (item) {
      let index = item.detail;
      this.setData({
        'highLightArr[2]': true
      })
      this._handleScreenOpen(false)
      this._getHeightToAnimate(null);
      this.triggerEvent('clickPriceItem', index);
    },
    // 更多条件里的多选框
    checkboxChange (e) {
      let which = e.currentTarget.dataset.which,
          value = e.detail; 
      this.setData({
        [which]: value
      })
      this.triggerEvent('checkboxChange', {which, value});
    },
    // 更多条件重置按钮
    resetMore () {
      let screenData = this.data.screenData;
      
      this.setData({
        // 清空数据重新绘制
        screenData: screenData,
        checkboxIndexArr: []
      })

      this.triggerEvent('resetMore');
    },
    // 更多条件筛选按钮
    screenMore () {
      this._handleScreenOpen(false)
      this._getHeightToAnimate(null);
      this._IsMoreScreenCondition();
      this.triggerEvent('screenMore');
    },
    // 点击阴影
    clickShadow (e) {
      if (e.currentTarget.dataset.which == 'shadow') {
        this._getHeightToAnimate(null);
        this._handleScreenOpen(false)
        this.setData({
          clickIndex: {
            currentIndex: null,
            prevIndex: null
          }
        })
      }
    },
    // 获取高度并执行, 当传入null时要关闭列表
    _getHeightToAnimate (name) {
      let height = 0;
      if (name == null) {
        this._toAnimate(height);
        this._isShowShadow(height);
        return
      }

      let query = wx.createSelectorQuery().in(this);

      query.select(name).boundingClientRect(rect => {
        height = rect.height;
        this._toAnimate(height);
        this._isShowShadow(height);
      }).exec()
    },
    // 执行动画
    _toAnimate (height) {
      this.animation.height(height).step();
      this.setData({
        animationData: this.animation.export()
      })
    },
    // 是否显示阴影
    _isShowShadow (height) {
      let isShowShadow = height != 0;
      this.setData({
        isShowShadow: isShowShadow
      })
    },
    // 筛选的显示和隐藏
    _handleScreenOpen(bool) {
      this.setData({
        isScreenOpen: bool
      })
      let myEventDetail = {
        isScreenOpen: this.data.isScreenOpen
      }
      this.triggerEvent('myevent', myEventDetail)
    },
    _IsMoreScreenCondition () {
      let moreScreenData = this.data.screenData[3].items;

      for (let i = 0; i < moreScreenData.length; i++) {
        let which = moreScreenData[i].which;
        if (!(this.data[which] == undefined || this.data[which].length == 0)) {
          this.setData({
            'highLightArr[3]': true
          })
          return;
        }
      }
      this.setData({
        'highLightArr[3]': false
      })
    }
  }
})
