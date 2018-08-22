var lineHeight = 0
var endWords = ''
var isNum
Component({
  properties: {
    dataList: {
      type: Array,
      vaule: [],
      observer: function(newVal, oldVal, changedPath) {
        if (newVal.length > 0) {
          this._calculateHeight(newVal)
        } 
     }
    }
  },
  data: {
    "hidden": true,
    "scrollTopId": "",
    "showwords": '',
    endWords: '',
    lineHeight: 0,
    listHeight: []
  },
  methods: {
    //触发全部开始选择
    chStart: function () {
      this.setData({
        hidden: false
      })
    },
    //触发结束选择
    chEnd: function () {
      this.setData({
        hidden: true,
        scrollTopId: this.endWords
      })
    },
    //获取文字信息
    getWords: function (e) {
      var id = e.target.id;
      this.endWords = id;
      isNum = id;
      this.setData({
        showwords: this.endWords
      })
    },
    //设置文字信息
    setWords: function (e) {
      var id = e.target.id;
      this.setData({
        scrollTopId: id
      })
    },
    // 滑动选择城市
    chMove: function (e) {
      var y = e.touches[0].clientY;
      var offsettop = e.currentTarget.offsetTop;
      var height = 0;
      var that = this;
      ;
      var cityarr = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
      // 获取y轴最大值
      wx.getSystemInfo({
        success: function (res) {
          height = res.windowHeight - 10;
        }
      });

      //判断选择区域,只有在选择区才会生效
      if (y > offsettop && y < height) {
        var num = parseInt((y - offsettop) / that.data.lineHeight);
        endWords = cityarr[num];
        // 这里 把endWords 绑定到this 上，是为了手指离开事件获取值
        that.endWords = endWords;
      };


      //去除重复，为了防止每次移动都赋值 ,这里限制值有变化后才会有赋值操作，
      //DOTO 这里暂时还有问题，还是比较卡，待优化
      if (isNum != num) {
        isNum = num;
        that.setData({
          showwords: that.endWords
        })
      }
    },
    //选择列表item值
    bindData: function (e) {
      if (e.currentTarget.dataset.city) {
        var city = e.currentTarget.dataset.city;
        var myEventDetail = {
          val: city
        }
      } else if (e.currentTarget.dataset.brand) {
        var brand = e.currentTarget.dataset.brand
        var myEventDetail = {
          val: brand
        }
      }
      this.triggerEvent('myevent', myEventDetail)
    },
    _calculateHeight (list) { 
      // 这里导致listHeight多添加了一个
      let _this = this, 
          height = 0;
      this.setData({
        listHeight: [height]
      })
      for (let i = 0; i < list.length; i++) {
        let item   = list[i].list,
        itemWidth = _this.data.itemWidth;
          height += parseInt(80 * itemWidth) + parseInt(item.length * 98.5 * itemWidth);
        let listHeight = _this.data.listHeight;    

          
        _this.setData({
          listHeight: listHeight.concat(height)
        })
      }
    },
    // 获取高度并执行, 当传入null时要关闭列表
    scrollChange (e) {
      let lastHeight = e.detail.scrollTop;
      let _this = this;
      setTimeout(() => {
        let currentHeight = e.detail.scrollTop,
        listHeight = this.data.listHeight;
        if (lastHeight == currentHeight) {
          for (let i = 0; i < listHeight.length - 1; i++) {
            let height1 = listHeight[i];
            let height2 = listHeight[i + 1];
            if (currentHeight >= height1 && currentHeight < height2) {
              _this.setData({
                showwords: _this.data.dataList[i].name
              })
              return;
            }
          }
        }
      }, 100)
    },
  },
  created () {
  },
  ready: function () {
    // 生命周期函数--监听页面初次渲染完成
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var lineHeight = (res.windowHeight - 100) / 22;
        that.setData({
          winHeight: res.windowHeight - 40,
          lineHeight: lineHeight,
          itemWidth: res.screenWidth / 750
        })
      }
    })
  }
})
