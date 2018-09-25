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
        tcmData: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this.tcmInfo();
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