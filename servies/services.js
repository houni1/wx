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
    wxType: data.wxType
  })
  return $get('/emall/wxAuthorization', params)
}

//获取我的信息接口
let getUserInfo = function(){
    return $get('cart/user/getUserInfo',{
        userId: globalData.authorize_user_id
    })
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
<<<<<<< HEAD
  getOnSaleData
=======
  getCardList,
  getTuichemaoInfo
>>>>>>> 392d40aeade18f74052f5f03443e1e3f807a257b
};