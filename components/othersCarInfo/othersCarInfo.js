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
    list: [],
    chooseBrandIndex: 0,
    chooseBrandIndex_list: -1,
    s_move: false
  },

  created: function () {
    cosnole.log(123)
    this.setData({
      list: this.dataList
    });
    cosnole.log(this.data.list)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    chooseBrand: function (event) {
      var index = event.currentTarget.dataset.index;
      this.setData({
        chooseBrandIndex: index
      })
    },
    show_move: function () {
      this.setData({
        s_move: !this.data.s_move
      })
    },
    chooseBrand_list: function (event) {
      var index = event.currentTarget.dataset.index;
      this.setData({
        chooseBrandIndex_list: index
      })
    }
  }
})

var dataList = [
  {
    "brandId": "12",                                                                     //品牌id
    "brandName": "江淮 ",                                                                  //品牌名称
    "logo": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"                      //品牌logo图
  },
  {
    "brandId": "16",                                                                    //品牌id
    "brandName": "奥迪 ",                                                                 //品牌名称
    "logo": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"                     //品牌logo图
  },
  {
    "brandId": "16",                                                                    //品牌id
    "brandName": "奥迪 ",                                                                 //品牌名称
    "logo": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"                     //品牌logo图
  },
  {
    "brandId": "16",                                                                    //品牌id
    "brandName": "奥迪 ",                                                                 //品牌名称
    "logo": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"                     //品牌logo图
  },
  {
    "brandId": "16",                                                                    //品牌id
    "brandName": "奥迪 ",                                                                 //品牌名称
    "logo": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"                     //品牌logo图
  },
  {
    "brandId": "16",                                                                    //品牌id
    "brandName": "奥迪 ",                                                                 //品牌名称
    "logo": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"                     //品牌logo图
  }
]
