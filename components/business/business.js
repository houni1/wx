// components/business/business.js
let globalData = getApp().globalData;
import { getBusinessList, buttonStat} from "../../servies/services.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    datashow: true,//车商圈列表是否有数据
    alarm: false,  //加载数据后提示弹框
    newNum: "",//加载数据条数
    list: [],//车商圈列表数据
    page: {
      perPage: "",//每页条数
      currentPage: "1",//当前页
      lastPage: "",//总页数
    },
    currentPage: 1,
    isAll: true   // 是否显示全文
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //头像预览
    preview_head(e) {
      // this.btnStat(21);
      // let head = e.currentTarget.dataset.head;
      // wx.previewImage({
      //   current: head,
      //   urls: [head]
      // })
      this.triggerEvent('myevent')
    },
    //车商圈图片预览
    preview_friend(e) {
      let img = e.currentTarget.dataset.img;
      img = img.slice(0, img.length - 6);
      let list = e.currentTarget.dataset.list;
      list.forEach((item, index) => {
        list[index] = item.slice(0, item.length - 6)
      })
      wx.previewImage({
        current: img,
        urls: list
      })
    },
    //快速联系
    quickcall(e) {
      this.btnStat(11);
      let phone = e.currentTarget.dataset.phone;
      if (phone == "") {
        wx.showToast({
          title: "该用户暂无电话",
          icon: 'none',
          duration: 1500,
          mask: false,
        });
      } else {
        wx.showModal({
          title: '拨打电话',
          content: phone,
          success: function (res) {
            if (res.confirm) {
              wx.makePhoneCall({
                phoneNumber: phone
              })
            } else if (res.cancel) {
            }
          }
        })
      }
    },
    //查看名片
    checkcard(e) {
      this.btnStat(22);
      //跳转到别人名片页
      this.triggerEvent('myevent')
    },
    //分享按钮点击
    share(e) {
      this.btnStat(23);
      let userId = e.currentTarget.dataset.userid;
      let circleId = e.currentTarget.dataset.circleid;
      wx.navigateTo({
        url: '../share/share?userId=' + userId + '&circleId=' + circleId,
      })
    },
    //加压缩比
    compress(list) {
      list.forEach((item, index) => {

        if (item.prices.length == 1) {
          item.prices[0] = item.prices[0] + "/252/2"
        }
        if (item.prices.length > 1) {
          item.prices.forEach((con, num) => {
            item.prices[num] = con + "/251/2"
          })
        }
      });
      return list
    },
    //获取列表数据
    getData(data) {
      getBusinessList(data).then((res) => {
        if (res.list.length == 0) {
          this.setData({
            datashow: false
          })
        } else {
          this.setData({
            datashow: true
          })
        }
        let list = this.compress(res.list)
        for(var i=0;i<list.length;i++){
          list[i].isAll = true
        }
        this.setData({
          page: res.page,
          list: list,
          newNum: res.newNum,
        })
        wx.stopPullDownRefresh()
      })

    },

    //上拉加载数据
    uploadData() {
      let curpage = this.data.currentPage - 0 + 1;
      if (curpage > this.data.page.lastPage) {
        wx.showToast({
          title: "已没有更多内容",
          icon: 'none',
          duration: 1500,
          mask: false,
        });
        return
      }
      this.setData({
        currentPage: curpage
      })
      let data = {
        currentPage: this.data.currentPage,
        shareId: globalData.saleId,
        userId: globalData.authorize_user_id
      }
      getBusinessList(data).then((res) => {
        let list = this.compress(res.list)
        for (var i = 0; i < list.length; i++) {
          list[i].isAll = true
        }
        this.setData({
          page: res.page,
          list: this.data.list.concat(list),
        })

      })
    },
    //下拉刷新数据
    pulldownData() {
      this.setData({
        currentPage: 1
      })
      let data = {
        currentPage: this.data.currentPage,
        shareId: globalData.saleId,
        userId: globalData.authorize_user_id
      }
      this.getData(data)
      if (!this.data.alarm) {
        this.setData({
          alarm: true
        })
        setTimeout(() => {
          if (this.data.alarm) {
            this.setData({
              alarm: false
            })
          }
        }, 2000)
      }

    },
    //按钮统计
    btnStat(type) {
      buttonStat({ appType: 1, pageType: 5, buttonType: type }).then((res) => {
      })
    },
    // 显示全文，收起
    showClose: function(event){
      var index = event.currentTarget.dataset.index;
      this.data.list[index].isAll = !this.data.list[index].isAll
      console.log(index)
      console.log(this.data.list)
      this.setData({
        list:  this.data.list
      });
    }
  },
  //组件实例化但节点树还未导入，因此这时不能用setData
  created() {
    //  list=[] datashow: true,
    buttonStat({ appType: 1, pageType: 0, buttonType: 41 }).then((res) => {
    })
  },

  //节点树完成可以用setData渲染节点，但无法操作节点
  attached() {

  },
  //组件布局完成，这时可以获取节点信息，也可以操作节点
  ready() {
    let data = {
      currentPage: this.data.currentPage,
      shareId: globalData.saleId,
      userId: globalData.authorize_user_id
    }
    this.getData(data)

  },
  //组建实例移除
  detached() {

  }


})
