let globalData = getApp().globalData;
import {$get, $post} from '../utils/request.js';


//获取在售车型列表
let getOnSaleData = function (data) {
  return $get('/cart/auto/autoList', data)
}

// // 获取品牌列表
let getBrandList = function (data) {
  return $get('/cart/auto/brandList', data)
}

// // 获取车辆详情
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
    saleId: data.saleId,
    source: data.source
  })

  return $get('/cart/login/wxAuthorization', params)
}

// 获取省信息接口
let getprovinceInfo = function () {
  return $get('/cart/area/getAllProvince')
}

// 获取市信息接口
let getCityInfo = function (data) {
  return $get('/cart/area/getCityByProvinceId', data)
}


// //获取推车猫首页个人信息接口
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
  return $get("/cart/card/cardList",{
    userId: globalData.authorize_user_id
  })
}


//编辑个人信息接口
let editUserInfo = function (data) {
  return $post('/cart/user/editUserInfo', data)
}

//处理名片
let handleCardcase = function(data){
    let params = Object.assign(data,{
        userId: globalData.authorize_user_id
    })
    return $get("/cart/card/cardChange",params)
}


//获取验证码
let getCode = function(data){
    return $get("/cart/user/getValidateCode",data)
}

//绑定手机号
let bindPhone = function(data){
    let params = Object.assign(data, {
        userId: globalData.authorize_user_id
    })
    return $get("/cart/user/bindingPhone",params)
}

//关于推车猫
let getTuichemaoInfo = function(){
  return $get("/cart/about")
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

//发送至邮箱接口
let sendEmail = function (data) {
  return $post("/cart/card/cardSendEmail", data)
}


// 交换名片接口
let changeCard = function (data) {
  return $post("/cart/card/cardSwap", data)
}

// 是否覆盖车商猫数据接口
let coverOldData = function (data) {
  return $post("/cart/login/coverOldData", data)
}

// 首页获取手机号接口
let addPhone = function (data) {
  return $post("/cart/user/addPhone", data)
}
let deleteCircle=function(data){
  return $get("/cart/carCircle/myCarCircleDel",data)
}

export {
  wxAuthorization,
  getUserInfo,
  getOnSaleData,
  getCardList,
  getTuichemaoInfo,
  getprovinceInfo,
  getCityInfo,
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
  getUserWxPhone,
  handleCardcase,
  getCode,
  bindPhone,
  sendEmail,
  changeCard,
  coverOldData,
  addPhone,
  deleteCircle
};
