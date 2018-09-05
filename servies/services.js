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
  return $get('/emall/wxAuthorization', params)
}

export {
  getIndexData, 
  wxAuthorization
};