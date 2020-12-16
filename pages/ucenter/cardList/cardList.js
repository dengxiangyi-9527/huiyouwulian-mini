var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    addressList: [],
    total: 0
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    this.getAddressList();
  },
  getAddressList() {
    let that = this;
    util.request(api.CardList).then(function(res) {
      if (res.code === 0) {
        that.setData({
          addressList: res.data,
          total: res.data.total
        });
      }
    });
  },
  addressAddOrUpdate() {
    wx.navigateTo({
      url: '/pages/ucenter/bankcard/bankcard'
    })
  },
  deleteAddress(event) {
    console.log(event.target)
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除银行卡？',
      success: function(res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId;
          util.request(api.CardDelete, {
            payWithdrawalBankId: addressId
          }, 'get').then(function(res) {
            if (res.code === 0) {
              that.getAddressList();
              wx.removeStorage({
                key: 'addressId',
                success: function(res) {},
              })
            }else{
              util.showErrorToast(res.msg);
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
