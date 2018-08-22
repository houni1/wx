// components/searchInput/seatrchInpu.js
var WxParse = require("../../utils/wxParse/wxParse.js");
import { getHotSearch, getSearchList } from '../../servies/services.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: true
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isIconCloseShow: false,
    centent_Show: true,
    searchValue: '',
    hotData: [],
    replyTemArray: [],
    showClassName: 'search-wrapper show-transform',
    hideClassName: 'search-wrapper hide-transform',
    searchList: []
  },

  attached() {
    getHotSearch().then(res => {
      this.setData({
        hotData: res
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入框输入
    searchValueInput(e) {
      let keyword = e.detail.value;

      this.setData({
        replyTemArray: []
      })

      this.setData({
        isIconCloseShow: keyword == '' ? false : true,
        searchValue: keyword
      });
      
      if (keyword == '') {
        return
      }
      
      this.keywordAssociation(keyword)
    },
    // 清空搜索关键字
    clear_text(e) {
      this.setData({
        isIconCloseShow: false,
        replyTemArray: [],
        searchValue: ''
      })
    },
    // 取消搜索
    searchCancel() {
      this.setData({
        searchValue: '',
        replyTemArray: [],
        isIconCloseShow: false
      })
      this.triggerEvent('searchCancel');
    },
    // 点击热搜词
    clickHotItem(e) {
      let index = e.currentTarget.dataset.index,
        data = this.data.hotData[index];
      this._goModleList(data);
    },
    // 关键词高亮
    highLight(content, keyword) {
      let hlValue = new RegExp("(" + keyword + ")", "gi");
      return content.replace(hlValue, "<a style='color: red'>$1</a>");
    },
    // 搜索联想，关键词高亮
    keywordAssociation(keyword) {
      var _this = this;

      getSearchList(keyword).then(res => {
        _this.setData({
          searchList: res
        })
        let dataArr = res;
        for (let i = 0; i < dataArr.length; i++) {
          WxParse.wxParse('reply' + i, 'html', _this.highLight(dataArr[i].name, keyword), _this);
          if (i === dataArr.length - 1) {
            WxParse.wxParseTemArray("replyTemArray", 'reply', dataArr.length, _this)
          }
        }
      })
    },
    // 点击联想
    clickListItem(e) {
      let index = e.currentTarget.dataset.index,
        data = this.data.searchList[index];
      this._goModleList(data);
    },
    // 跳转车型列表页
    _goModleList(data) {
      let search = JSON.stringify({
        id: data.id,
        type: data.type
      });

      wx.navigateTo({
        url: '../modelList/modelList?search=' + search + '&keywords=' + JSON.stringify(data.name)
      })
    }
  }
})