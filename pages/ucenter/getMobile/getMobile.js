var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({
  data:{
    mobliePhone:'',
    code:'',
    inviteCode:'',
    isShow:false,
    isTime:false,
    timeout:false,
    isToast:false,
    isCode:'',
    time: 59  * 1000,
    // time: 30 * 60 * 60 * 1000,
    timeData: {},
  },
  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
    if(e.detail.seconds==0){
      this.setData({
        isTime:false,
        timeout:false
      })
    }
  },
  //监听手机输入
  getPhone(e){
    console.log(e)
if(e.detail.value !=''){
  this.setData({
    isToast:true
  })
}
this.setData({
  mobliePhone: e.detail.value
 
})
  },
  login1(){
wx.showToast({
  icon:'none',
  title: '请先输入手机号或验证码',
})
  },
  //获取邀请码
  getInviteCode(e){
this.setData({
  inviteCode:e.detail.value
})
console.log(this.data.inviteCode)
  },
  //获取验证码
  getCode(){
    let phone=this.data.mobliePhone
    if(phone==''||phone.length<11){
      wx.showToast({
        title: '手机号有误',
        icon:'none'
      })
    }else {
this.setData({
  isShow:true,
})
    util.request(api.GetCode,{
      phone:phone
    }).then(res=>{
      console.log(res)
      if(res.code===0){
        this.setData({
             isTime:true,
            timeout:true
        })
        wx.showToast({
          icon:'none',
          title: '短信发送成功，请注意查收',
        })
      }else{
        wx.showToast({
          icon:'none',
          title: res.msg,
        })
      }
    })
   
  }

  },
  //监听验证码输入
  confirmCode(e){
      this.setData({
          code:e.detail.value
})
if(this.data.code !==''){
  this.setData({
    show:true
  })
}
  },
  //banging手机号
  login(){
    let phone=this.data.mobliePhone
    let code=this.data.code
    let inviteCode=this.data.inviteCode
    if(phone==''){
      wx.showToast({
        // icon:'none',
        title: '请先输入手机号',
      })
    }
    if(code==''){
      wx.showToast({
        icon:'none',
        title: '您还没输验证码',
      })
    }
   util.request(api.BindMobile,{
   phone:phone,
   code:code,
   inviteCode:inviteCode
   },'POST').then(res=>{
     this.setData({
       show:false
     })
      console.log(res)
      if(res.code===0){
        this.setData({
          show:true
        })
        wx.showToast({
          title: '绑定成功',
          duration:2000
        })
       
        wx.navigateBack({
          delta:2
        });
      }else{
        this.setData({
          show:true
        })
        // app.globalData.hasLogin = false;
        util.showErrorToast(
          res.msg
        );
      }
})
  },
  onLoad: function(options) {
    console.log(options)
    this.setData({
      isCode:options.isCode
    })
    console.log(this.data.isCode)

    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成

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
    if (e.detail.userInfo == undefined) {
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
      return;
    }
    user.checkLogin().catch(() => {
      user.loginByWeixin(e.detail.userInfo).then(res => {
        app.globalData.hasLogin = true;
        wx.navigateBack();
      }).catch((err) => {
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