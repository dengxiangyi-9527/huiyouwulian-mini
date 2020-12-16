var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: '点击登录',
      avatarUrl: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    message: [],
    acount: {},
    member: {},
    isReal: 0,
    isDefault:false,
    isDelivery: '',
    mobile:'',
    memberPower: '',//4
    identity: {
      0: {
        image: '/static/images/00.png',
        text: '普通会员'
      },
      1: {
        image: '/static/images/00.png',
        text: '普通会员'
      },
      2: {
        image: '/static/images/00.png',
        text: '高级VIP'
      },
      3: {
        image: '/static/images/11.png',
        text: '高级会员'
      },
      4: {
        image: '/static/images/22.png',
        text: '线上运营商'
      },
    },
    identity1: {
      0: {
        image: '/static/images/00.png',
        text: '！未认证'
      },
      1: {
        image: '/static/images/00.png',
        text: '已认证'
      }
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let isReal = wx.getStorageSync('IsReal')
    this.setData({
      isReal: isReal
    })
    console.log(isReal)
    //获取用户的登录信息
    if (app.globalData.hasLogin) {
      let userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo)
      this.setData({
        userInfo: userInfo,
        hasLogin: true
      });

      let that = this;
      util.request(api.UserIndex).then(function (res) {
        if (res.code === 0) {
          that.setData({
            order: res.data.order
          });
        }
      });
      util.request(api.AcountInfo).then(function (res) {
        if (res.code === 0) {
          console.log(res.data.member)
          wx.setStorageSync('IsReal', res.data.member.isReal)
          console.log(wx.getStorageSync('IsReal'))
          let memberPower = res.data.member.memberPower
          console.log(memberPower)
          let handledMemberPower = Math.max.apply(null, memberPower.split(',').filter(item => item != -1 && item != 5))
          console.log(handledMemberPower)
          // let handledMemberPower = Math.max.apply(null,memberPower)
          let mobile = res.data.member.mobile
          wx.setStorageSync('mobile', mobile)
          if(mobile.length>=10){
            mobile = mobile
          }else{
            mobile = '！未绑定手机号'
          }
          that.setData({
            acount: res.data.memberAcount,
            member: res.data.member,
            memberPower: handledMemberPower,
            isDelivery: res.data.member.isDelivery,
            mobile: mobile
          });
          console.log(that.data.memberPower)
        }
      });
    }

  },
  //意见反馈
  goFeedback(e) {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/feedback/feedback"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },

  mobile() {
    this.setData({
      isDefault: true
    });
  },
  bindIsDefault(){
    this.setData({
      isDefault: true
    });
  },
  bindIsDefault1() {
    this.setData({
      isDefault: false
    });
  },
  goAgreement() {
    this.setData({
      isDefault:true
    })
    wx.navigateTo({
      url: '/pages/agreement/agreement/agreement'
    });
  },
  //注销
  goLayOut(){
    if(!this.data.isDefault){
      wx.showToast({
        icon:'none',
        title: '您还没同意注销协议'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '注销后将清除您的所有信息',
        success (res) {
        if (res.confirm) {
          util.request(api.LayOut, {
          }, 'POST').then(res => {
            console.log(res)
            if (res.code === 0) {
              wx.showToast({
                title: '注销成功',
                icon: 'success',
                duration: 4000
              });
              util.request(api.AuthLogout, {}, 'POST');
              app.globalData.hasLogin = false;
              wx.removeStorageSync('token');
              wx.removeStorageSync('userInfo');
              wx.reLaunch({
                url: '/pages/index/index'
              });
              wx.clearStorage()
              wx.clearStorageSync()
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'fail',
                duration: 2000
              });
            }
          })
        }
        }
      })
     
    }
  },
  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})