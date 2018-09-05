import { getBrandList, getOnSaleData } from '../../servies/services.js';
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
    defaultList: [],
    brandList: [],
    chooseBrandIndex: 0,
    chooseBrandIndex_list: -1,
    s_move: false
  },

  ready: function () {
    // 获取品牌列表
    this.getBrandListData();
    // 获取别人车源信息列表
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getBrandListData: function() {
      var _this = this;
      // 请求品牌列表数据
      var params = {
        userId: '5'     // 被查看用户Id [必传]
      }
      getBrandList(params).then(function (res) {
        _this.setData({
          brandList: res,
          defaultList: res.slice(0, 4)
        });
        console.log(res)
      })

      this.setData({
        list: dataList.list
      });
      
    },
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
      console.log(event)
      var index = event.currentTarget.dataset.index;
      this.setData({
        chooseBrandIndex_list: index
      })
    }
  }
})

var dataBrandList = [
  {
    "brandId": "12",                                                           //品牌id
    "brandName": "江淮 ",                                                      //品牌名称
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"            //品牌logo图
  },
  {
    "brandId": "16",
    "brandName": "奥迪 ",
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
  },
  {
    "brandId": "16",
    "brandName": "宝马 ",
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
  },
  {
    "brandId": "16",
    "brandName": "大众 ",
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
  },
  {
    "brandId": "16",
    "brandName": "丰田 ",
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
  },
  {
    "brandId": "16",
    "brandName": "保时捷 ",
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
  },
  {
    "brandId": "16",
    "brandName": "大众 ",
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
  },
  {
    "brandId": "16",
    "brandName": "丰田 ",
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
  },
  {
    "brandId": "16",
    "brandName": "保时捷 ",
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
  },
  {
    "brandId": "16",
    "brandName": "大众 ",
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
  },
  {
    "brandId": "16",
    "brandName": "丰田 ",
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
  },
  {
    "brandId": "16",
    "brandName": "保时捷 ",
    "logoUrl": "http://img.emao.net/dealer/nd/bdb/gkno-990x660.jpg"
  }
]

var dataList = {
  page: {
    "perPage": "10",
    "currentPage": "1",
    "lastPage": "3",
    "count": "20"
  },
  list: [
    {
      "autoId": "12",                                 //车型id
      "autoName": "江淮 瑞风s2 2017款 1.5L手动豪华型",  //车型名称
      "price": "13.90",                              //现价
      "guidePrice": "42.30",                              //指导价
      "type": "1",                                 //类型: 1 自营 2 一猫
      "logoUrl": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //logo地址
      "cover": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //车型封面
      "state": "1", //1：现车 2：3天后到店 3：7天后到店 4：需预订
      "stockNum": "1", //库存数
      "isHot": "1", //是否热门车型：1-是，0-否
    },
    {
      "autoId": "12",                                 //车型id
      "autoName": "宝马X6 2017款 1.5L手动豪华型",  //车型名称
      "price": "13.90",                              //现价
      "guidePrice": "42.30",                              //指导价
      "type": "1",                                 //类型: 1 自营 2 一猫
      "logoUrl": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //logo地址
      "cover": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //车型封面
      "state": "1", //1：现车 2：3天后到店 3：7天后到店 4：需预订
      "stockNum": "1", //库存数
      "isHot": "0", //是否热门车型：1-是，0-否
    },
    {
      "autoId": "12",                                 //车型id
      "autoName": "奥迪a4L 2017款 1.5L手动豪华型",  //车型名称
      "price": "13.90",                              //现价
      "guidePrice": "42.30",                              //指导价
      "type": "1",                                 //类型: 1 自营 2 一猫
      "logoUrl": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //logo地址
      "cover": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //车型封面
      "state": "1", //1：现车 2：3天后到店 3：7天后到店 4：需预订
      "stockNum": "1", //库存数
      "isHot": "0", //是否热门车型：1-是，0-否
    },
    {
      "autoId": "12",                                 //车型id
      "autoName": "长安CS35新款 2017款 1.5L手动豪华型",  //车型名称
      "price": "13.90",                              //现价
      "guidePrice": "42.30",                              //指导价
      "type": "1",                                 //类型: 1 自营 2 一猫
      "logoUrl": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //logo地址
      "cover": "http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177", //车型封面
      "state": "1", //1：现车 2：3天后到店 3：7天后到店 4：需预订
      "stockNum": "1", //库存数
      "isHot": "0", //是否热门车型：1-是，0-否
    },
  ]
}
