var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({
  data: {
    brandList: [],
    page: 1,
    limit: 10,
    totalPages: 1
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getBrandList();
  },
  getBrandList: function() {
    const areaCode = wx.getStorageSync('deptId')
    console.log(areaCode)
    wx.showLoading({
      title: '加载中...',
    });
    let that = this;
    util.request(api.BrandList, {
      page: that.data.page,
      limit: that.data.limit,
      areaCode: areaCode
    }).then(function(res) {
      if (res.code === 0) {
        console.log(res)
        that.setData({
          brandList: that.data.brandList.concat(res.page.records),
          totalPages: res.page.pages
        });
      }
      wx.hideLoading();
    });
  },
  onReachBottom() {
    if (this.data.totalPages > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
    } else {
      return false;
    }

    this.getBrandList();
  },
  onReady: function() {

  },
  onShow: function() {
    // 页面显示

  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  }
})
