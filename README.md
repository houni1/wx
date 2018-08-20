## 项目标题
推车猫小程序

## 目录介绍
- components 公用组件
- images 公用图片
- pages 页面
  - index 首页
  - logs
  - store 商城
    - home 商城首页
    - detail 车型详情
- services 请求
  - getData.js 封装好的get请求
  - getFastData.js 获取快弹车数据
  - services.js 通过request.js提供的$get和$post方法，将接口封装在此文件中，方便统一管理、随处调用
- utils 方法
  - countdown 倒计时
  - wxParse 字符串文本解析成html文本
  - util.js 公共方法
  - request.js 请求方法


## 注意
- 因为小程序上线不分版本，为了保证每次上线的都是完整版
- 上灰度的时候合并develop 设置为开发板
