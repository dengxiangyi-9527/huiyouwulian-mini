var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({
  data:{
    mobliePhone:'',
    code:'',
    isShow:false,
    isTime:false,
    timeout:false,
    isToast:false,
    disabled:false,
    time: 59  * 1000,
    // time: 30 * 60 * 60 * 1000,
    timeData: {},
    isCode:''
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
    console.log(options)

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

  },
  wxLogin: function(e) {
    console.log(e)
    if (e.detail.userInfo == undefined) {
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
      return;
    }
    this.setData({
      disabled:true
    })
    user.checkLogin().catch(() => {
      user.loginByWeixin(e.detail.userInfo).then(res => {
        console.log(res)
        if(res.data.code==0){
          this.setData({
            disabled:false
          })
        }
        this.setData({
          isCode:res.data.userInfo.isCode
        })
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('userInfo',{...res.data.userInfo,userId:res.data.user_id})
         wx.setStorageSync({
           data: res.data.userInfo.inviteCode,
           key: 'inviteCode',
         })
        if(res.data.is_channel==false){
          if(res.data.isEmpty_phone==false){
            wx.navigateTo({
              url: '/pages/ucenter/getMobile/getMobile?isCode=' + this.data.isCode,
          })
          }else{
            wx.navigateBack();
          }
        }else{
          wx.navigateBack();
        }
        app.globalData.hasLogin = true;
      }).catch((err) => {
        this.setData({
          disabled:false
        })
        console.log(err)
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登录失败');
      });
    });
  },
  accountLogin: function() {
    wx.navigateTo({
      url: "/pages/auth/accountLogin/accountLogin"
    });
  }
})