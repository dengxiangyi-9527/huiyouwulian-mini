
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curPage: 1,
    limit: 5,
    userInfo:{},
    list:[],
    tab:1,
    totalPage:0,
    totalCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo:userInfo,
      totalCount:options.count
    })
    let prepaidUserId=''
    let topObjectId=this.data.userInfo.userId
    this.getCountDetailInfo(this.data.curPage,this.data.limit,prepaidUserId,topObjectId)
  },
  goIn(e){
    console.log(e)
    this.setData({
      tab:e.currentTarget.dataset.id
    })
    console.log(this.data.tab)
    if(this.data.tab==1){
      let prepaidUserId=''
      let topObjectId=this.data.userInfo.userId
      this.getCountDetailInfo(this.data.curPage,this.data.limit,prepaidUserId,topObjectId)
    }else if(this.data.tab==2){
      let prepaidUserId=this.data.userInfo.userId
      let topObjectId=""
      this.getCountDetailInfo(this.data.curPage,this.data.limit,prepaidUserId,topObjectId)
    }else{
      let prepaidUserId=""
      let topObjectId=this.data.userInfo.userId
      this.getCountDetailInfo(this.data.curPage,this.data.limit,prepaidUserId,topObjectId)
    }
  },
getCountDetailInfo(a,b,c,d){ 
  console.log(a,b,c,d)
  wx.showLoading({
    title: '加载中...',
  })
  util.request(api.GetCountDetail,{
    page:a,
    limit:b,
    prepaidUserId: c,
    topObjectId:d
  }).then(res=>{
    console.log(res)
    if(res.code==0){
      wx.hideLoading()
      this.setData({
        list:res.page.list,
        totalPage:res.page.totalPage,
        curPage:res.page.currPage
      })
      console.log('当前页',this.data.curPage)
    }else{
      wx.showToast({
        title: res.msg,
        icon:none
      })
    }
  })
},
nextPage(){
  if(this.data.list.length<=0){
    wx.showToast({
      title: '还没转送记录哦',
    })
    return
  }
  console.log(this.data.curPage)
  if(this.data.curPage==this.data.totalPage){
    wx.showToast({
      title: '已经是最后一页了',
    })
    return
  }
  let curPage=this.data.curPage+1
         console.log(curPage)
  if(this.data.tab==2){
    let prepaidUserId=this.data.userInfo.userId
    let topObjectId=""
    console.log(prepaidUserId,topObjectId)
    this.getCountDetailInfo(curPage,this.data.limit,prepaidUserId,topObjectId)
}else if(this.data.tab==1){
  let prepaidUserId=''
  let topObjectId=this.data.userInfo.userId
  this.getCountDetailInfo(curPage,this.data.limit,prepaidUserId,topObjectId)
}
},
lastPage(){
  if(this.data.list.length<=0){
    wx.showToast({
      title: '还没转送记录哦',
    })
    return
  }
  if(this.data.curPage==1){
    wx.showToast({
      title: '已经是第一页了',
    })
    return
  }
  let curPage=this.data.curPage-1
  if(this.data.tab==2){
    let prepaidUserId=this.data.userInfo.userId
    let topObjectId=""
    console.log(prepaidUserId,topObjectId)
    this.getCountDetailInfo(curPage,this.data.limit,prepaidUserId,topObjectId)
}else if(this.data.tab==1){
  let prepaidUserId=''
  let topObjectId=this.data.userInfo.userId
  this.getCountDetailInfo(curPage,this.data.limit,prepaidUserId,topObjectId)
}
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