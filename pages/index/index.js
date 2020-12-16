const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../utils/user.js');
// var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
// var qqmapsdk;

//获取应用实例
const app = getApp();

Page({
  data: {
    list: [],
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    groupons: [],
    floorGoods: [],
    banner: [],
    ocsSubject: [],
    channel: [],
    coupon: [],
    isShow:false,
    city:'成都',
    cityid: '0',
    latitude:1,
    longitude:1,
    goodsCount: 0,
  },

  onShareAppMessage: function() {
    return {
      title: '慧优物联小程序商场',
      desc: '慧优物联',
      path: '/pages/index/index'
    }
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    const id=wx.getStorageSync('deptId')
    console.log(id)
    this.getIndexData(id);
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
    // console.log(this.data.value1)
  },
  //2获取城市编码
  // cityAre() {
  //   let latitude = wx.getStorageSync('latitude')
  //   let longitude = wx.getStorageSync('longitude')
  //   let list = wx.getStorageSync('list')
  //   util.request(api.GetCityCode + '?longitude=' + longitude + '&latitude=' + latitude + '&level=' + 2).then(res => {
  //     // console.log(res)
  //     const id=res.data
  //     this.getIndexData(id)
  //     let area = list.map(item => {
  //       // console.log(item)
  //       if (item.deptId == res.data) {
  //         // console.log('编号相同')
  //         this.setData({
  //           city: item.name,
  //           cityid: res.data
  //         })
  //         wx.setStorageSync('deptId', res.data)
  //       }
  //     })
      
  //   })
  // },

  getIndexData: function(id) {
    wx.showLoading({
      icon: 'loading',
      title: '加载中...',
    })
    // let areaCode = wx.getStorageSync('deptId')
    
    let that = this;
    util.request(api.IndexUrl,{
      areaCode: id
    }).then(function(res) {
      // console.log(res)
      if (res.code === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brands: res.data.brandList,
          floorGoods: res.data.floorGoodsList,
          banner: res.data.banner,
          groupons: res.data.grouponList,
          channel: res.data.channel,
          coupon: res.data.couponList,
          ocsSubject: res.data.ocsSubjectList
        });
        wx.setStorageSync('deptId', res.data.areaCode)
        wx.hideLoading()
      }
    });
    util.request(api.GoodsCount).then(function (res) {
      that.setData({
        // areaCode: areaCode,
        goodsCount: res.data
      });
    });
  },
  changeStatus(e){
    console.log(e)
  },
  //城市列表
//   getCiteList(){
// util.request(api.CityList,{},'POST').then(res=>{
//   console.log(res)
//   this.setData({
//     list : res.data
//   })
//   wx.setStorageSync('list',res.data)
// })
//   },
  //打开城市列表
//   getSelect(){
//     let show=this.data.isShow
// this.setData({
//   isShow: !show
// })
//   },
  //选中城市
// carchItem(e){
// console.log(e)
//   var name = e.currentTarget.dataset.name
//   var id = e.currentTarget.dataset.id
//   wx.setStorageSync('deptId', id)
// this.setData({
//   city:name,
//   isShow:false,
//   cityid:id
// })
//   console.log(this.data.cityid)
//   this.getIndexData(id);
//   console.log(wx.getStorageSync('deptId'))
// },
// //1获取城市定位
//   getLocaltion() {
//     const _this = this
//     wx.getLocation({
//       type: 'wgs84',
//       success(res) {
//         let latitude = res.latitude
//         let longitude = res.longitude
//         wx.setStorageSync('latitude', res.latitude)
//         wx.setStorageSync('longitude', res.longitude)
//         _this.setData({
//           longitude: longitude,
//           latitude: latitude
//         })
//       }
//     })
//   },
  
  onLoad: function(options) {
    console.log(options.scene)
    // 页面初始化 options为页面跳转所带来的参数
    if (options.scene) {
      //这个scene的值存在则证明首页的开启来源于朋友圈分享的图,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      // var scene = decodeURIComponent(options.scene);
      // let info_arr = [];
      // info_arr = scene.split(',');
      // let _type = info_arr[0];
      // let id = info_arr[1];
      // let _inviteCode = info_arr[2];
      // if (_inviteCode) {
        // console.log('存入缓存:' + _inviteCode);
        wx.setStorageSync('pInviteCode', options.scene)
      // }
      // if (_type == 'goods') {
      //   wx.navigateTo({
      //     url: '../goods/goods?id=' + id
      //   });
      // } else if (_type == 'groupon') {
      //   wx.navigateTo({
      //     url: '../goods/goods?grouponId=' + id
      //   });
      // } else {
      //   wx.navigateTo({
      //     url: '../index/index'
      //   });
      // }
      
    }
    
    // 页面初始化 options为页面跳转所带来的参数
    if (options.grouponId) {
      //这个pageId的值存在则证明首页的开启来源于用户点击来首页,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../goods/goods?grouponId=' + options.grouponId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.goodId) {
      //这个goodId的值存在则证明首页的开启来源于分享,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../goods/goods?id=' + options.goodId
      });
    }
    if (options.inviteCode) {
      console.log('存入缓存:' + options.inviteCode);
      wx.setStorageSync('pInviteCode', options.inviteCode)

    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.orderId) {
      //这个orderId的值存在则证明首页的开启来源于订单模版通知,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../ucenter/orderDetail/orderDetail?id=' + options.orderId
      });
    }

    this.getIndexData();
    
  },
  
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // this.getIndexData();
    // this.getCiteList()
//     qqmapsdk.search({
//       keyword: '酒店',
//       success: function (res) {
//           console.log(res);
//       },
//       fail: function (res) {
//           console.log(res);
//       },
//   complete: function (res) {
//       console.log(res);
//   }
// });
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // this.cityAre()
    wx.removeStorageSync('deptId')
    // 页面关闭
  },
  getCoupon(e) {
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }

    let couponId = e.currentTarget.dataset.index
    util.request(api.CouponReceive, {
      couponId: couponId
    }, 'POST').then(res => {
      if (res.code === 0) {
        wx.showToast({
          title: "领取成功"
        })
      }
      else{
        util.showErrorToast(res.msg);
      }
    })
  },
  // getLocation() {
  //   console.log('1111111')
  // }
})

