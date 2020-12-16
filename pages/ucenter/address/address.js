var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    addressList: [],
    total: 0,
    memtion:'',
    goodsAreaCode:0,
    code:''
  },
  onLoad: function(options) {
    
    this.setData({
      goodsAreaCode:options.code
    })
    console.log(this.data.goodsAreaCode)
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    let areaCode = wx.getStorageSync('deptId')
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (prevPage.route == "pages/checkout/checkout") {
      if(areaCode==510100){
        this.setData({
          memtion:'⚠️收货地址仅限成都地区使用'
        })
      }else if(areaCode==511100){
        this.setData({
          memtion:'⚠️收货地址仅限乐山地区使用'
        })
      }
    }
    let code1=wx.getStorageSync('deptId');   
    this.setData({
      code:code1
    });
    // 页面显示
    this.getAddressList();
  },
  getAddressList() {
    let that = this;
    let code=this.data.goodsAreaCode
    util.request(api.AddressList, {
      code:code    
    }, 'GET').then(function(res) {
      if (res.code === 0) {
        that.setData({
          addressList: res.data.list,
          total: res.data.total
        });
      }
    });
  },
  addressAddOrUpdate1(){
    wx.showToast({
      title: '超出配送范围',
       icon:'none'
})
  },
  addressAddOrUpdate(event) {
    console.log(event)
    //返回之前，先取出上一页对象，并设置addressId
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];

    if (prevPage.route == "pages/checkout/checkout") {

      try {
        wx.setStorageSync('addressId', event.currentTarget.dataset.addressId);
      } catch (e) {

      }

      let addressId = event.currentTarget.dataset.addressId;
      if (addressId && addressId != 0) {
        wx.navigateBack();
      } else {
        wx.navigateTo({
          url: '/pages/ucenter/addressAdd/addressAdd?id=' + addressId
        })
      }

    } else {
      wx.navigateTo({
        url: '/pages/ucenter/addressAdd/addressAdd?id=' + event.currentTarget.dataset.addressId
      })
    }
  },
  deleteAddress(event) {
    console.log(event.target)
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function(res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId;
          console.log(addressId)
          util.request(api.AddressDelete, {
            id:addressId
          }, 'POST').then(function(res) {
            if (res.code === 0) {
              that.getAddressList();
              wx.removeStorage({
                key: 'addressId',
                success: function(res) {},
              })
            }
          });
          console.log('用户点击确定')
        }
      }
    })
    return false;

  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})
