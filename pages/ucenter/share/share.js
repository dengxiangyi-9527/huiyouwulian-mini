// pages/ucenter/share/share.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
        url:'',
        // imgs:'/static/images/WechatIMG189.png',
        imgs:'https://scyry.oss-cn-chengdu.aliyuncs.com/xa4pc4qihrjzj0216j9a.png',
        canvasHeight:'',
        canvasWidth:'',
        tempFilePath:'',
        avan:''

  },
share(){
util.request(api.GoShare,{},'GET').then(res=>{
  console.log(res)
  this.setData({
    url:res
  })
})
},
 // 保存图片到相册
 makePhoto: function(index) {
  let that = this
  let imgs = that.data.url
    // 提示用户正在合成，否则用户可能有不当操作或者以为手机卡死
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
savePhoto(){
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      avan:options.avan
    })
    this.share()
    this.makePhoto()
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