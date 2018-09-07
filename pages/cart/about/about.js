// pages/cart/about/about.js
let globalData = getApp().globalData;
import {
    getTuichemaoInfo
} from '../../../servies/services.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tcmData: {
            // "img": "http://img.emao.net/user/avatar/nc/xz/cbyl-190x190.png/180",
            // "name": "推车猫",
            // "intro": "轻松拓展人脉资源",
            // "text": [
            //     {
            //         "title":"专属个人名片",
            //         "content":"名片、产品代言和个人动态，承载丰富信息"
            //     },
            //      {
            //          "title": "推车猫卫星实时掌控来访客户",
            //          "content": "自动采集访客互动，全面展现互动数据，智能分析用户行为、用户关注和兴趣点"
            //     },
            //      {
            //          "title": "以用户交互为中心，与客户持续连接",
            //          "content": "通过社区运营和互动跟进，让员工、企业与客户持续互动，实现与客户得持续连接"
            //     }
            // ]

        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.tcmInfo();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.tcmInfo();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    //获取推车猫信息
    tcmInfo: function() {
          getTuichemaoInfo().then(res => {
              this.setData({
                  tcmData:res
              })
          })
    }
})