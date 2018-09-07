let globalData = getApp().globalData;
import {$get, $post} from '../utils/request.js';

// 获取首页的信息
let getIndexData = function () {
  return $get('/emall/index', {
    cityId: globalData.currentCity.id,
    authorizeUserId: globalData.authorize_user_id,
    //authorizeUserId: '1',
    longitude: globalData.currentLonLat.longitude,
    latitude: globalData.currentLonLat.latitude
  })
}

// 获取在售车型列表
let getOnSaleData = function (data) {
  return $get('/cart/auto/autoList', data)
}

// 获取品牌列表
let getBrandList = function (data) {
  return $get('/cart/auto/brandList', data)
}

// 获取车辆详情
let autoDetails = function (data) {
  return $get('/cart/auto/autoDetails', data)
}



// 授权后触发的函数
let wxAuthorization = function (data) {
  let params = {}
  if (data.iv) {
    params = Object.assign(params, {
      iv: data.iv,
      encryptedData: data.encryptedData
    })
  }
  params = Object.assign(params, {
    code: data.code,
    wxType: data.wxType,
    saleId: globalData.saleId,
    source: globalData.source
  })
  // return $get('/emall/wxAuthorization', params)

  return $get('/cart/login/wxAuthorization', params)
}

// 获取城市信息接口
let getCityInfo = function () {
  return $get('/cart/area/city')
}

//获取推车猫首页个人信息接口
let getIndexUserInfo = function () {
  return $get('/cart/index', {
    userId: globalData.authorize_user_id
  })
}


//获取个人信息接口
let getUserInfo = function (data) {
  return $get('/cart/user/getUserInfo', data)
}

//获取名片夹列表信息
let getCardList = function(){
  return $get("cart/card/cardList",{
    userId: globalData.authorize_user_id
  })
}

// let getCardList = function () {
//     return $get("cart/card/cardList", params)
// }

//关于推车猫
let getTuichemaoInfo = function(){
  return $get("cart/about")
}

export {
  getIndexData, 
  wxAuthorization,
  getUserInfo,
  getOnSaleData,
  getCardList,
  getTuichemaoInfo,
  getBrandList,
  autoDetails,
  getCityInfo,
  getIndexUserInfo
};