// pages/cart/changePhone/changePhone.js
let globalData = getApp().globalData;
import { getCode, bindPhone } from '../../../servies/services.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneValue: "", //手机号
        flag:true,
        timeValue:10,
        loading:false,
        codeValue:"",
        clearTag:false,  //是否清空电话号
        typefaceTag:false, //字体是否高亮
        btnTag:false //立即验证按钮是否高亮
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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


    //获取手机号内容
    watchPhone: function (e) {
        let telPhoneValue = e.detail.value;
        this.setData({
            clearTag: telPhoneValue ? true : false,
            phoneValue: telPhoneValue
        }) 

        var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!phoneReg.test(this.data.phoneValue)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
            })
            this.setData({
                typefaceTag: false
            }) 
        }else{
            this.setData({
                typefaceTag:true
            }) 
        }

    },

    //获取验证码内容
    watchCode:function(e){
        let verificationCodeValue = e.detail.value;
        this.setData({
            codeValue: verificationCodeValue 
        })
        var codeReg = /^\d{4}$/;
        if (!codeReg.test(this.data.codeValue)){
            wx.showToast({
                title: '请输入正确的验证码',
                icon: 'none'
            })
            this.setData({
                btnTag: false
            }) 
        }else{
            this.setData({
                btnTag: true
            }) 
        }
    },

    //清楚电话号码
    clearPhone:function(){
        this.setData({
            phoneValue: '',
            clearTag:false
        })
    },

    //获取验证码
    getVerificationCode: function () {
        
        // this.setData({
        //     flag: false,
        // })

        // var count = 10;
        // var timer = null;
        // var that = this;
        // timer = setInterval(function () {
        //     if (count > 0) {
        //         count = count - 1;
        //         that.setData({
        //             timeValue: count
        //         })
        //     }
        //     else {
        //         that.setData({
        //             flag: true
        //         })
        //         clearInterval(timer);
        //     }
        // }, 1000);

      

        


        var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!phoneReg.test(this.data.phoneValue)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
            })
        }else{
            let params = {
                phone: this.data.phoneValue
            }
            if (!this.data.loading) {
                this.setData({
                    loading: true
                })
                getCode(params).then(res => {
                    // this.setData({
                    //     flag:false
                    // })

                    this.setData({
                        flag: false,
                        loading:false
                    })

                    var count = 10;
                    var timer = null;
                    var that = this;
                    timer = setInterval(function () {
                        if (count > 0) {
                            count = count - 1;
                            that.setData({
                                timeValue: count
                            })
                        }
                        else {
                            that.setData({
                                flag: true
                            })
                            clearInterval(timer);
                        }
                    }, 1000);


                })
            }else{
                return false 
            }
           
        }



    },

    //立即验证
    changePhone:function(){
       
        var codeReg = /^\d{4}$/;
        var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        console.log(this.data)
        if (!phoneReg.test(this.data.phoneValue)){
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
            })
        } else if (!codeReg.test(this.data.codeValue)){
            wx.showToast({
                title: '请输入正确的验证码',
                icon: 'none'
            })
        }else{
            let params = {
                phone: this.data.phoneValue,
                code: this.data.codeValue
            }
            bindPhone(params).then(res => {
                wx.showToast({
                    title: '验证成功',
                    icon: 'none'
                })
                console.log(1);
                setTimeout(function(){
                    wx.switchTab({
                        url: '../my/my'
                    })
                },2000)
                console.log(2);

            }) 
        }
       

    }



})

