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

// 获取省信息接口
let getprovinceInfo = function () {
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

//获取猫哥卫星列表接口
let getCatList = function (data) {
  return $get('/cart/catMoon', data)
}

//获取名片夹列表信息
let getCardList = function(){
  return $get("cart/card/cardList",{
    userId: globalData.authorize_user_id
  })
}


//编辑个人信息接口
let editUserInfo = function (data) {
  return $post('/cart/user/editUserInfo', data)
}

// let getCardList = function () {
//     return $get("cart/card/cardList", params)
// }
// // let getCardList = function () {
// //     return $get("cart/card/cardList", params)
// // }

//关于推车猫
let getTuichemaoInfo = function(){
  return $get("cart/about")
}
//车商圈列表
let getBusinessList=function(data){
  return $get("/cart/carCircle/dynamicMsgLists",data)
}
//生成海报
let creatPoster=function(data){
  return $post("/cart/carCircle/generateingPoster",data)
}
//发布消息
let postMessage=function(data){
  return $post("/cart/carCircle/publishCart",data)
}
//分享海报
let sharePoster=function(data){
  return $get("/cart/carCircle/shareInfo",data)
}
//生成名片照片
let cardMake=function(data){
  return $get("/cart/card/cardMake",data)
}
//按钮统计方法
let buttonStat=function(data){
  return $post("/cart/statistics/button",data)
}
//销售人气统计
let popStat=function(data){
return $post("/cart/statistics/sellMoods",data)
}
//猫哥卫星统计
let starStat=function(data){
  return $post("/cart/statistics/moonStat",data)
}

//获取手机号授权接口
let getUserWxPhone = function (data) {
  return $get("/cart/login/getUserWxPhone", data)
}
export {
  getIndexData,
  wxAuthorization,
  getUserInfo,
  getOnSaleData,
  getCardList,
  getTuichemaoInfo,
  getprovinceInfo,
  getBusinessList,
  creatPoster,
  postMessage,
  sharePoster,
  cardMake,
  buttonStat,
  popStat,
  starStat,
  getBrandList,
  autoDetails,
  getIndexUserInfo,
  editUserInfo,
  getCatList,
  getUserWxPhone
};