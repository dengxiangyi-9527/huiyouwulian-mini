var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    navList: [],
    goodsList: [],
    id: 0,
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    limit: 10
  },
  onLoad: function(options) {
    console.log(options.id)
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    if (options.id) {
      that.setData({
        id: parseInt(options.id)
      });
    }

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });


    this.getCategoryInfo();

  },
  getCategoryInfo: function() {
    wx.showLoading({
      icon:'loading',
      title: '加载中...',
    })
    let areaCode=wx.getStorageSync('deptId')
    let that = this;
    util.request(api.GoodsCategory, {
      areaCode: areaCode,
        id: this.data.id,
      })
      .then(function(res) {
        console.log(res)
        if (res.code === 0) {
          that.setData({
            navList: res.data.brotherCategory,
            currentCategory: res.data.currentCategory
          });
         wx.hideLoading()
          wx.setNavigationBarTitle({
            title: res.data.parentCategory.name
          })

          // 当id是L1分类id时，这里需要重新设置成L1分类的一个子分类的id
          if (res.data.parentCategory.id == that.data.id) {
            that.setData({
              id: res.data.currentCategory.id
            });
          }

          //nav位置
          let currentIndex = 0;
          let navListCount = that.data.navList.length;
          console.log(navListCount)
          for (let i = 0; i < navListCount; i++) {
            currentIndex += 1;
            if (that.data.navList[i].id == that.data.id) {
              break;
            }
          }
          if (currentIndex > navListCount / 2 && navListCount > 5) {
            that.setData({
              scrollLeft: currentIndex * 60
            });
          }
          that.getGoodsList();

        } else {
          //显示错误信息
        }

      });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  getGoodsList: function() {
    this.loading=true
    let areaCode = wx.getStorageSync('deptId')
    var that = this;
    console.log(that.data.page)
    util.request(api.GoodsList, {
      areaCode: areaCode,
        categoryId: that.data.id,
        page: that.data.page,
        limit: that.data.limit
      })
      .then(function(res) {
        console.log(res)
        that.setData({
          goodsList: res.data.list,
          pages:res.data.pages
        });
      });
  },
  onUnload: function() {
    // 页面关闭
  },
  switchCate: function(event) {
    if (this.data.id == event.currentTarget.dataset.id) {
      return false;
    }
    var that = this;
    var clientX = event.detail.x;
    var currentTarget = event.currentTarget;
    if (clientX < 60) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      });
    } else if (clientX > 330) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft
      });
    }
    this.setData({
      id: event.currentTarget.dataset.id
    });

    this.getCategoryInfo();
  },
//上拉加载更多
  onReachBottom: function () {
    console.log('111')
    let areaCode = wx.getStorageSync('deptId')
    console.log('areaCode')
    var that=this
    //下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if(this.data.page<this.data.pages){
      wx.showLoading({
        title: '玩命加载中',
      })
      this.data.page++
      util.request(api.GoodsList, {
        areaCode: areaCode,
        categoryId: this.data.id,
        page: this.data.page,
        limit: this.data.limit
      }).then(function (res) {
          console.log(res)
          that.setData({
            //把最新的加在原来的数据后面
            goodsList: that.data.goodsList.concat(res.data.list),
            // pages: res.data.pages
          })
        })
    }
    // 隐藏导航栏加载框
    wx.hideLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  }
})
