var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

let plugin = requirePlugin('routePlan');
const key = 'JANBZ-XQM6U-IPUVD-2DXQT-7W6IH-WOBLY'; //使用在腾讯位置服务申请的key
const referer = '慧优物联'; //调用插件的app的名称
let endPoint = JSON.stringify({  //终点
  'name': '吉野家(北京西站北口店)',
  'latitude': 39.89631551,
  'longitude': 116.323459711
});

Page({
  data: {
    addressList: [],
    total: 0,
    deliveryList:[],
    page: 1,
    limit: 10,
    currPage: 1,
    totalPage: 1,
  },
  // 获取配送详情
  getDetailInfo(e) {
    console.log(e)
    var index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/ucenter/awaitDistributionDetail/awaitDistributionDetail?index='+ index + '&type='+this.data.type,
    })
  },
  // 获取待配送列表信息
  getList() {
    if(this.data.type == 1) {
      util.request(api.GetDelivery, {
        deliveryStatus: 1
      }).then((res) => {
        console.log(res)
        this.setData({
          deliveryList: res.page.list
        })
        wx.setStorage({
          key: 'deliveryList',
          data: res.page.list,
        })
      })
    }else if(this.data.type == 3) {
      util.request(api.GetDelivery, {
        deliveryStatus: 3,
        page: this.data.page,
        limit: this.data.limit
      }).then((res) => {
        console.log(res)
        this.setData({
          deliveryList: res.page.list,
          currPage: res.page.currPage,
          totalPage: res.page.totalPage
        })
        wx.setStorage({
          key: 'deliveryList',
          data: res.page.list,
        })
      })
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var type = options.type
    console.log(type)
    this.setData({
      type:type
    })
    this.getList();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getAddressList();
    this.getList();
    this.setData({
      endPoint: endPoint
    })
  },
  getAddressList() {
    let that = this;
    util.request(api.AddressList).then(function (res) {
      if (res.code === 0) {
        that.setData({
          addressList: res.data.list,
          total: res.data.total
        });
      }
    });
  },
  // 获取地图信息
  getAddressMap(e) {
    console.log(e)
    var latitude = e.currentTarget.dataset.latitude
    var longitude = e.currentTarget.dataset.longitude
    var deliveryaddress = e.currentTarget.dataset.deliveryaddress
    var endPoint = JSON.stringify({  //终点
      'name': deliveryaddress,
      'latitude': latitude,
      'longitude': longitude
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=1'
    });
  },
  deleteAddress(event) {
    console.log(event.target)
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除配送订单？',
      success: function (res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId;
          util.request(api.AddressDelete, {
            id: addressId
          }, 'POST').then(function (res) {
            if (res.code === 0) {
              that.getAddressList();
              wx.removeStorage({
                key: 'addressId',
                success: function (res) { },
              })
            }
          });
          console.log('用户点击确定')
        }
      }
    })
    return false;

  },
  onHide: function () {
    // 页面隐藏
    this.setData({
      page: 1
    })
  },
  onReachBottom: function () {
    if (this.data.type == 3) {
      if (this.data.page < this.data.totalPage) {
        wx.showToast({
          icon:'loading',
          title: '玩命加载中',
        })
        this.data.page++
        util.request(api.GetDelivery, {
          deliveryStatus: 3,
          page: this.data.page,
          limit: this.data.limit
        }).then((res) => {
          console.log(res)
          this.setData({
            deliveryList: this.data.deliveryList.concat(res.page.list),
            currPage: res.page.currPage,
          })
          console.log(this.data.deliveryList)
          wx.setStorage({
            key: 'deliveryList',
            data: this.data.deliveryList,
          })
        })
      } else if (this.data.totalPage == this.data.currPage) {
        wx.showToast({
          title: '没有更多了',
        })
      }
    }
    wx.hideLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  onUnload: function () {
    // 页面关闭
  }
})
