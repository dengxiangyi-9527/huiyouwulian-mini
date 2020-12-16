// pages/ucenter/countRotation/countRotation.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memName:'',
    name:'',
    allCount:0,
    choseNum:0,
    userId:0,
    sendValue:0,
    show:false,
    value:0,
    memberName:[]

  },
  iptMember(e){
    console.log(e)
    this.setData({
      name:e.detail.value
    })
  },
  searchName(){
    this.setData({
      choseNum:null
    })
    let name=this.data.name
    if(name==''){
     wx.showToast({
       title: '请先输入会员名称',
       icon:'none'
     })
    }else{
      wx.showLoading({
        title: '加载中...',
      })
      util.request(api.SearchMember,{
        param:name
      }).then(res=>{
        console.log(res)
        if(res.code==0){
          wx.hideLoading()
          this.setData({
            memberName:res.data,
            show:true
          })
          // this.memberName=res.data
          if(res.data.length<=0){
            wx.showToast({
              title:'该用户暂未实名认证',
              icon:'none'
            })
          }
        }else{
          wx.showToast({
            title:res.msg,
            icon:'none'
          })
        }
      })
    }
  },
  confirmCount(e){
    console.log(e)
    this.setData({
      value:e.detail.value
    })
    if(this.data.value<100){
      wx.showModal({
          title: '提示',
          content: '赠送积分必须大于100',
          success: function (res) {
              if (res.confirm) {
                  console.log('用户点击确定');
              } else if (res.cancel) {
                  console.log('用户点击取消');
              }
          }
      });
    }else{
     
    }
    
    // this.value=this.sendName
    // this.sendName=0
  },
  selName(e){
    console.log(e)
    this.setData({
      choseNum:e.currentTarget.dataset.index,
      userId:e.currentTarget.dataset.item.userId,
      name:e.currentTarget.dataset.item.realName
    })
  },
  confirm(){
    let userId = this.data.userId
    let memberName=this.data.name
    let value = this.data.value
    if(userId==''){
      wx.showToast({
        title:'请先选择赠送人',
        icon:'none'
      })
    }else if(value==''){
      wx.showToast({
        title:'请输入赠送值',
        icon:'none',
        })
    }else if(value<100){
      swx.showToast({
        title:'赠送积分不能小于100',
        icon:'none',
        })
    }else{
      wx.showModal({
          title: '提示',
          content: '赠送人'+memberName+'，赠送数量'+value,
          success: function (res) {
              if (res.confirm) {
                 util.request(api.AddIntegral+userId+'?value='+value,{}).then(res=>{
                  console.log(res)
                  if(res.code==0){
                    wx.showToast({
                      title:'赠送成功',
              duration:3000
                    })
                wx.reLaunch({
                  url: '/pages/ucenter/index/index',
                })
                  }else{
                    wx.showToast({
                      title:res.msg,
                      icon:'none'
                    })
                  }
                 })
              } else if (res.cancel) {
                  console.log('用户点击取消');
              }
          }
      });
      
    }
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let allCount=options.count
    // let allCount=undefined
    if(allCount==undefined){
      allCount=0
    }
    this.setData({
      allCount:allCount
    })
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