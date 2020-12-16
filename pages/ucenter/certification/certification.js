// pages/ucenter/certification/certification.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [{
      url:''
    }],
    pic1:'',
    pic2:''
  },
  upload(){
wx.navigateTo({
  url: '/pages/cinema/cinema',
})
  },
  finishedCerti(){
    console.log(this.data.pic1)
    wx.showLoading({
      title: '提交中...',
    })
    let filePath=this.data.pic1
    wx.getFileSystemManager().readFile({
      filePath: filePath ,
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        console.log(res.data)
        console.log('data:image/png;base64,' + res.data)
        let that = this;
        util.request(api.RelalNameAuth, { imgByte: res.data, flag:1 }, 'POST').then(function (res){
          wx.hideLoading()
          console.log(res)
          if (res.code === 0) {
            wx.setStorageSync('IsReal', res.data.isReal)
            console.log(wx.getStorageSync('IsReal'))
            wx.navigateBack({
              delta: 1
            });
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
          }
        });

      }
    })
  } ,
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// console.log(options)
// this.setData({
//   pic1:options.url
// })
// this.pic1='http://'+options.url
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