// pages/cart/my/my.js
let globalData = getApp().globalData;
import { getUserInfo, buttonStat } from '../../../servies/services.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {}, //用户基本信息
        flag: false,  //是否加载页面标致
        formId: '',   //表单Id
        network: true, //网络信息是否正常
        loadingFlag: false //加载动画是否显示
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        let _this = this;
        wx.getNetworkType({
            success(res) {
                if (res.networkType == "none") {
                    _this.setData({
                        network: false
                    })
                    wx.hideLoading()
                    return;
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        //获取用户信息
        this.userInfo();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //获取用户信息
        this.userInfo();
        let params = {
            buttonType: 10,
            pageType: 0,
            appType: 1,
            userId: globalData.authorize_user_id
        }
        //按钮统计
        buttonStat(params).then(res => {

        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },


    //获取用户信息
    userInfo: function () {
        let params = {
            userId: globalData.authorize_user_id
        }
        getUserInfo(params).then(res => {
            this.setData({
                userInfo: res,
                flag: true
            })
        });
    },

    //跳转到更换绑定手机页面
    changePhone: function () {
        wx.navigateTo({
            url: '../changePhone/changePhone'
        })
    },

    //跳转到关于推车猫页面
    goToAbout: function () {
        var _this = this;
        if (!_this.data.loadingFlag) {
            _this.setData({
                loadingFlag: true
            })
            setTimeout(function () {
                let params = {
                    buttonType: 29,
                    pageType: 9,
                    appType: 1,
                    userId: globalData.authorize_user_id,
                    formId: _this.data.formId
                }
                buttonStat(params).then(res => {
                    _this.setData({
                        formId: '',
                        loadingFlag: false
                    })
                    wx.navigateTo({
                        url: '../about/about'
                    })
                })
            }, 500)
        }


    },
    //跳转到名片夹
    goToCardcase: function () {
        var _this = this;
        if (!_this.data.loadingFlag) {
            _this.setData({
                loadingFlag: true
            })
            setTimeout(function () {
                let params = {
                    buttonType: 28,
                    pageType: 9,
                    appType: 1,
                    userId: globalData.authorize_user_id,
                    formId: _this.data.formId
                }
                buttonStat(params).then(res => {
                    _this.setData({
                        formId: '',
                        loadingFlag: false
                    })
                    wx.navigateTo({
                        url: '../cardcase/cardcase'
                    })
                })
            }, 500)
        }



    },

    // 跳转到我的车商圈
    toBusiness: function () {
      wx.navigateTo({
        url: '../mybusiness/mybusiness'
      })
    },

    //头像放大
    showPic: function (e) {
        var picSrc = this.data.userInfo.headPortrait;
        wx.previewImage({
            current: picSrc, // 当前显示图片的http链接
            urls: [picSrc] // 需要预览的图片http链接列表
        })

    },

    //去往设置页面
    goToSetup: function () {
        var _this = this;
        if (!_this.data.loadingFlag) {
            _this.setData({
                loadingFlag: true
            })
            setTimeout(function () {
                let params = {
                    buttonType: 27,
                    pageType: 9,
                    appType: 1,
                    userId: globalData.authorize_user_id,
                    formId: _this.data.formId
                }
                buttonStat(params).then(res => {
                    _this.setData({
                        formId: '',
                        loadingFlag: false
                    })
                    wx.navigateTo({
                        url: '../setup/setup'
                    })
                })
            }, 500)
        }




    },


    //formId获取
    formSubmit(e) {
        this.setData({
            formId: e.detail.formId
        })

    },

})

//网络报错，展示相应的文案
wx.onNetworkStatusChange((res) => {
    let pages = getCurrentPages();
    let page = pages[pages.length - 1];
    page.setData({
        network: res.isConnected
    })
    if (!res.isConnected) {
        wx.hideLoading()
    } else {
        wx.showLoading();
        page.onLoad()
        wx.hideLoading()
    }
})