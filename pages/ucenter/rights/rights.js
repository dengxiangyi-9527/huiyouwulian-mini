// pages/myequi/myequiAdd/myequiAdd.js
var util = require('../../../utils/util.js');
var check = require('../../../utils/check.js');
var api = require('../../../config/api.js');

const key = 'JANBZ-XQM6U-IPUVD-2DXQT-7W6IH-WOBLY'; //使用在腾讯位置服务申请的key
const referer = '慧优物联'; //调用插件的app的名称
const location = JSON.stringify({
  latitude: '',
  longitude: ''
});
const category = '生活服务,娱乐休闲';
const chooseLocation = requirePlugin('chooseLocation');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDefault: false,
    switchChecked: false,
    locationArea: [],
    info: {
      num: '',
      equiName: '',
      name: '',
      phoneNum: '',
      address: '',
      areaDetail: '',
      areaCode:'',
      elevator: 0
    }
  },
  switchChange(e) {
    console.log(e)
    if (e.detail.value == true) {
      this.setData({
        [`info.elevator`]: 1
      })
    } else if (e.detail.value == false) {
      this.setData({
        [`info.elevator`]: 0
      })
    }
  },
  // 获取编号
  getNum(e) {
    // console.log(e.detail.value)
    this.setData({
      [`info.num`]: e.detail.value
    })
  },
  // 获取设备名称
  getEquiName(e) {
    // console.log(e.detail.value)
    this.setData({
      [`info.equiName`]: e.detail.value
    })
  },
  // 获取姓名
  getName(e) {
    // console.log(e.detail.value)
    this.setData({
      [`info.name`]: e.detail.value
    })
  },
  // 获取电话
  getPhoneNum(e) {
    // console.log(e.detail.value)
    this.setData({
      [`info.phoneNum`]: e.detail.value
    })
  },
  // 获取装机地区
  // getLocation(e) {
  //   // console.log(e.detail.value)
  //   this.setData({
  //     [`info.address`]: e.detail.value
  //   })
  // },
  // 获取详细地址
  getAreaDetail(e) {
    // console.log(e.detail.value)
    this.setData({
      [`info.areaDetail`]: e.detail.value
    })
  },

  // 点击绑定
  goBind() {
    var locationArea = wx.getStorageSync('locationArea')
    console.log(locationArea)
    if ( !this.data.info.name && !this.data.info.phoneNum && !this.data.info.areaDetail &&  !locationArea.address) {
      wx.showModal({
        title: '警告',
        content: '请完善相关信息',
      })
    } else {
      console.log(this.data.info.phoneNum)
      util.request(api.Rights, {
        address: this.data.info.areaDetail,
        area: locationArea.address,
        latitude: locationArea.latitude,
        longitude: locationArea.longitude,
        phone: this.data.info.phoneNum,
        realName: this.data.info.name,
        rechargeNum:1
      }, 'POST').then((res) => {
        console.log(res)
        if (res.code == 0) {
          wx.showModal({
            title:'成功',
            content: res.msg,
            success: () => {
              wx.switchTab({
                url: '/pages/ucenter/index/index',
              })
            }
          })
        } else {
          wx.showModal({
            title: '警告',
            content: res.msg,
          })
        }
      })
    }
  },
  // 获取定位信息
  getLocation() {
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&category=' + category
    });
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
    const location = chooseLocation.getLocation();
    this.setData({
      locationArea: location
    })
    wx.setStorage({
      key: 'locationArea',
      data: location,
    })
    // console.log(this.data.info.num)
    // let phone = wx.getStorageSync('mobile')
    // console.log(phone)
    // this.setData({
    //   [`info.phoneNum`]: phone
    // })
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
