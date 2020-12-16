var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp();

Page({
  data: {
    userInfo: {
      nickName: '点击登录',
      avatarUrl: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    order: {
      unpaid: 0,
      unship: 0,
      unrecv: 0,
      uncomment: 0
    },
    message:[],
    showTwo:false,
    acount:{},
    // url:'',
    url:'',
    // imgs:'/static/images/WechatIMG189.png',
    imgs:'https://scyry.oss-cn-chengdu.aliyuncs.com/egqqb7f47t4kuwilccyn.png',
    canvasHeight:'',
    canvasWidth:'',
    tempFilePath:'',
    member: {},
    isReal:0,
    isDelivery:'',
    memberPower:'',//4
    identity:{
      2: {
        image:'/static/images/00.png',
        text:'高级VIP'
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
    hasLogin: false,
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
  },
  onReady: function() {
  },
  onShow: function() {
    let isReal = wx.getStorageSync('IsReal')
    this.setData({
      isReal:isReal
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
      util.request(api.UserIndex).then(function(res) {
        console.log(res)
        if (res.code === 0) {
          that.setData({
            order: res.data.order
          });
        }
      });
      util.request(api.AcountInfo).then(function (res) {
        console.log(res)
        if (res.code === 0) {
          console.log(res.data.member)
          wx.setStorageSync('IsReal', res.data.member.isReal)
          console.log(wx.getStorageSync('IsReal'))
          let memberPower = res.data.member.memberPower
          console.log(memberPower)
          let handledMemberPower = Math.max.apply(null, memberPower.split(',').filter(item => item != 0 && item != 5))
          // let handledMemberPower = Math.max.apply(null,memberPower)
          let mobile = res.data.member.mobile
          wx.setStorageSync('mobile', mobile)
          that.setData({
            acount: res.data.memberAcount,
            member: res.data.member,
            memberPower: handledMemberPower,
            isDelivery: res.data.member.isDelivery
          });
          console.log(that.data.memberPower)
        }
      });
    }

  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭
  },
  goLogin() {
    console.log(!this.data.hasLogin)
    if (!this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  //分享到好友
  // onShareAppMessage: function() {
  //   let that = this;
  //   return {
  //     title: '分享',
  //     imageUrl:that.data.url,
  //     desc: '喝好水,找慧优物联!',
  //     path: '/pages/index/index'
      
  //   }
  // },
  //去分享
  goShare(){
    // wx.navigateTo({
    //   url: "/pages/ucenter/share/share?avan="+this.data.userInfo.avatarUrl
    // });
    this.setData({
      showTwo:true
    })
    util.request(api.GoShare,{},'GET').then(res=>{
      console.log(res)
      this.setData({
        url:res
      })
    })
    this.makePhoto()
  },
  closeImg(){
    this.setData({
      showTwo:false
    })
  },
  //保存图片到相册
  saveImage(){
    wx.showLoading({
      title: '保存中...'
    })
    let tempFilePath=this.data.tempFilePath
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      success(res) {
        wx.hideLoading()
        wx.showModal({
          title: '温馨提示',
          content: '图片保存成功，可在相册中查看',
          showCancel: false,
          success(res) {
            wx.clear
            
          }
        })
      },
  
      fail(res) {
        wx.hideLoading()
        wx.showModal({
          title: '温馨提示',
          content: '图片保存失败，请重试',
          showCancel: false
        })
      }
    })
  },
  goOrder() {
    if (this.data.hasLogin) {
      try {
        wx.setStorageSync('tab', 0);
      } catch (e) {

      }
      wx.navigateTo({
        url: "/pages/ucenter/order/order"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  //实名认证
  goCertification(){
    wx.navigateTo({
      url: '/pages/ucenter/certification/certification',
    })
  },
  //去注销
  goUserInfo(){
    console.log(this.data.hasLogin)
    if(this.data.hasLogin==true){
      wx.navigateTo({
        url: '/pages/ucenter/userInfo/userInfo',
    })
    } else if (this.data.hasLogin == false){
      wx.navigateTo({
        url: '/pages/auth/login/login',
      })
    }
    
  },
  //信息订阅
  goMessage(){
    util.request(api.RequestMessage, {
    }).then((res) => {
      console.log(res)
    })
    // let message = "H7pbPnH8hFZq_Ojezz6NvyG5Do1hnde9HAkLhawx0bo"
    wx.requestSubscribeMessage({
      tmplIds: ["NsILCSWgxKP5YCJSR3D1mBVdM8e3-q3vSqitRYoDmlM","0-VNOGZ1jua8sAyMAtdvwppSYYPMBrDJ5U35NStfWxg"],
      success(res) {
        console.log(res)
        if (res["NsILCSWgxKP5YCJSR3D1mBVdM8e3-q3vSqitRYoDmlM"] == 'accept' || res["0-VNOGZ1jua8sAyMAtdvwppSYYPMBrDJ5U35NStfWxg"] == 'accept') {
          //用户同意了订阅，允许订阅消息
          wx.showToast({
            title: '订阅成功'
          })
        } else {
          //用户拒绝了订阅，禁用订阅消息
          wx.showToast({
            title: '订阅失败'
          })
        }
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {
        console.log(res)
      }
    })
  },
  // },
  
  goRights(){
    wx.navigateTo({
      url: '/pages/ucenter/rights/rights',
    })
  },
  goOrderIndex(e) {
    console.log(e)
    if (this.data.hasLogin) {
      let tab = e.currentTarget.dataset.index
      let route = e.currentTarget.dataset.route
      try {
        wx.setStorageSync('tab', tab);
      } catch (e) {

      }
      wx.navigateTo({
        url: route,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goAcountIndex(e){
    console.log(e)
    let count=e.currentTarget.dataset.count
    wx.navigateTo({
      url:'/pages/ucenter/countRotation/countRotation?count='+count
    })
  },
  // goAcountIndex(e) {
  //   if (this.data.hasLogin) {
  //     let tab = e.currentTarget.dataset.index
  //     let route = e.currentTarget.dataset.route
  //     try {
  //       wx.setStorageSync('tab', tab);
  //       console.log('goAcountIndex:' + e.currentTarget.dataset.route);
  //     } catch (e) {

  //     }
  //     wx.navigateTo({
  //       url: route,
  //       success: function (res) { },
  //       fail: function (res) {
  //         console.log('fail:' + res.errMsg);
  //        },
  //       complete: function (res) { },
  //     })
  //   } else {
  //     wx.navigateTo({
  //       url: "/pages/auth/login/login"
  //     });
  //   };
  // },
  // 认领设备
  // goClaimEqui() {
  //   wx.navigateTo({
  //     url: '/pages/ucenter/claimEqui/claimEqui',
  //   })
  // },
  goCoupon() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/couponList/couponList"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goBankcard(){
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/cardList/cardList"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goGroupon() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/groupon/myGroupon/myGroupon"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goCollect() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/collect/collect"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
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
  goFootprint() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/footprint/footprint"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goAddress() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/address/address"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  bindPhoneNumber: function(e) {
    if (e.detail.errMsg !== "getPhoneNumber:ok") {
      // 拒绝授权
      console.log(e.detail.msg)
      return;
    }
  
    if (!this.data.hasLogin) {
      wx.showToast({
        title: '绑定失败：请先登录',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    util.request(api.BindPhone, {
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData
    }, 'POST').then(function(res) {
      console.log(res)
      if (res.code === 0) {
        console.log('444444444')
        wx.showToast({
          title: '绑定手机号码成功',
          icon: 'success',
          duration: 2000
        });
      }else {
        wx.showToast({
          title: res.msg,
          icon: 'fail',
          duration: 2000
        });
      }
    });
  },
  goAfterSale: function() {
    wx.showToast({
      title: '目前不支持',
      icon: 'none',
      duration: 2000
    });
  },
  aboutUs: function() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },
  goHelp: function () {
    wx.navigateTo({
      url: '/pages/help/help'
    });
  },
  // 任务认领
  goClaimTask() {
    wx.navigateTo({
      url: "/pages/ucenter/claimTask/claimTask?type="+1,
    })
    // wx.showToast({
    //   title: '目前不支持',
    //   icon: 'none',
    //   duration: 2000,
    // })
  },
  // 待配送
  goAwaitDistribution() {
    wx.navigateTo({
      url: "/pages/ucenter/awaitDistribution/awaitDistribution?type="+2,
    })
    // wx.showToast({
    //   title: '目前不支持',
    //   icon: 'none',
    //   duration: 2000,
    // })
  },
  // 已配送
  goDistribution() {
    wx.navigateTo({
      url: "/pages/ucenter/shippedDistribution/shippedDistribution?type=" + 3,
    })
    // wx.showToast({
    //   title: '目前不支持',
    //   icon: 'none',
    //   duration: 2000,
    // })
  },
  exitLogin: function() {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function(res) {
        if (!res.confirm) {
          return;
        }

        util.request(api.AuthLogout, {}, 'POST');
        app.globalData.hasLogin = false;
        wx.removeStorageSync('token');
        wx.removeStorageSync('userInfo');
        wx.reLaunch({
          url: '/pages/index/index'
        });
      }
    })

  },
  makePhoto: function(index) {
    let that = this
    let imgs = that.data.url
      // 提示用户正在合成，否则用户可能有不当操作或者以为手机卡死
      wx.showLoading({
        title: '合成中......',
        mask: true
      })
      // 创建画布对象
      const ctx = wx.createCanvasContext("myCanvas", that)
      // 获取图片信息，要按照原图来绘制，否则图片会变形 
      wx.getImageInfo({
        src: that.data.imgs,
        success: function(res) {
          // 根据 图片的大小 绘制底图 的大小
          console.log(" 绘制底图 的图片信息》》》", res)
          let imgW = res.width
          let imgH = res.height
          let imgPath = res.path
          // 绘制底图 用原图的宽高比绘制
          ctx.drawImage(imgPath, 0, 0, 255, 400)
  
          wx.getImageInfo({
            src: that.data.url, // 二维码图片的路径
            success: function(res) {
              console.log(" 绘制二维码》》》", res)
              // 绘制二维码
              ctx.drawImage(res.path, 64, 166, 126, 112)
              ctx.draw()
              wx.hideLoading()
              // wx.showLoading({
              //   title: '正在保存',
              //   mask: true
              // })
              setTimeout(() => {
                wx.canvasToTempFilePath({
                  canvasId: 'myCanvas',
                  success: function(res) {
                    console.log("合成的带有小程序码的图片success》》》", res)
                    let tempFilePath = res.tempFilePath
                    // 保存到相册
                    that.setData({
                      tempFilePath:tempFilePath
                    })
  
                    console.log("合成的带有小程序码的图片的信息》》》", res)
                  },
                  fail: function(res) {
                    console.log("生成的图拍呢 失败 fail fail fail ", res)
                    wx.hideLoading()
                    wx.showModal({
                      title: '温馨提示',
                      content: '小程序码图片合成失败，请重试',
                      showCancel: false
                    })
                  }
                }, that)
              },1500)
                
            },
            fail(res) {
              console.log(res)
              wx.hideLoading()
              wx.showModal({
                title: '温馨提示',
                content: '二维码获取失败，请重试',
                showCancel: false
              })
            }
          })
  
        },
        fail(res) {
          wx.hideLoading()
          wx.showModal({
            title: '温馨提示',
            content: '图片信息获取失败，请重试',
            showCancel: false
          })
        }
      })
    
  
  },
})
