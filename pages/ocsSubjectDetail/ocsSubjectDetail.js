var util = require('../../utils/util.js');
var api = require('../../config/api.js');


var app = getApp();

Page({
  data: {
    id: 0,
    brand: {},
    goodsList: [],
    page: 1,
    limit: 10
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      id: parseInt(options.id)
    });
    this.getBrand();
  },
  getBrand: function () {
    let that = this;
    util.request(api.OcsSubjectDetail, {
      id: that.data.id
    }).then(function (res) {
      if (res.code === 0) {
        that.setData({
          brand: res.data
        });

        that.getGoodsList();
      }
    });
  },
  getGoodsList() {
    var that = this;

    util.request(api.GoodsList, {
      categoryId: 1036010,
      page: that.data.page,
      limit: that.data.limit
    })
      .then(function (res) {
        if (res.code === 0) {
          that.setData({
            goodsList: res.data.list
          });
        }
      });
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})
