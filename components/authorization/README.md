# 微信个人信息授权并且调起地理定位授权

## 描述

因为某个页面可能被分享，个人信息授权可能在多个页面被使用，所以将其独立封装成组件。

## 实现原理

由于个人信息授权需要通过按钮来触发，所以我们有一个授权引导弹窗，某个页面需不需要授权也就是看这个页面需不需要弹起这个引导授权的弹窗。因为这个组件会在多个页面被使用，所以在全局有一个变量 `isAuthorize` （见app.js）来标志引导授权弹窗是不是弹起过。<br>

页面加载时，只有在当前用户没有授权，并且 `isAuthorize` 为 `false` 的时候才会弹起弹窗，这个时候会触发 ` firstAuth` 方法，因为在授权前后的渲染数据可能会不一样，所以如果在授权之后才加载数据用户体验不够友好，所以这个时候可以先发送一下请求，授权如果允许，触发 `authResult` ，这是可以再次发送请求，调整渲染数据。即使用户拒绝授权圈

## 使用

#### wxml

```html
<authorization bindauthResult="authResult" bindfirstAuth="firstAuth"></authorization>
```

#### json

```josn
{
  "usingComponents": {
    "authorization": "/components/authorization/authorization"
  }
}
```

#### js

```javascript
Page({
  firstAuth () {
    // 这里是第一次授权触发的动作
  },
  authResult (data) {
    // 这里是授权处理完毕后触发的动作
    // data是授权成功后后台返回的 authorizeUserId
  }
})
```