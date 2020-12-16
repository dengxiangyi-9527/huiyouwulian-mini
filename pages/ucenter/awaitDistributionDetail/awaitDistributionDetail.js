// pages/ucenter/awaitDistributionDetail/awaitDistributionDetail.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
// import Toast from 'path/to/@vant/weapp/dist/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    deliveryList:[],
    deliveryDesc:'',
    equiList:[],
    inputList:[{
      adjustValue: 0,
      deviceId: 0,
      rechargeFlow: 0,
    }],
    type:'',
    sourceType:0,
    index:'',
    status:1,
    createId:'',
    inputValue:0,
    inputbag:0,
    equiNum:0
  },
  // 输入数字
  bindManual(e) {
    console.log(typeof(+e.detail.value))
    const list = JSON.parse(JSON.stringify(this.data.equiList))
    const index = e.currentTarget.dataset.index
    list[index].rechargeFlow = +e.detail.value
    this.setData({
      equiList: list
    })
  },
  //输入设备编号1
  inputEqui(e){
    const list = JSON.parse(JSON.stringify(this.data.inputList))
    const index = e.currentTarget.dataset.index
    list[index].deviceId = e.detail.value
    this.setData({
      inputList: list
    })
    console.log(this.data.inputList)
  },
  // 输入数字
  rebindManual(e) {
    console.log(e)
    const list = JSON.parse(JSON.stringify(this.data.equiList))
    const index = e.currentTarget.dataset.index
    list[index].adjustValue = e.detail.value
    if (list[index].adjustValue <= -10) {
      list[index].adjustValue = -10
    } else if (list[index].adjustValue >= 10) {
      list[index].adjustValue = 10
    }
    this.setData({
      equiList: list
    })
  },
  //输入流量1
  remandValue(e){
    console.log(e)
    const list = JSON.parse(JSON.stringify(this.data.inputList))
    const index = e.currentTarget.dataset.index
    list[index].adjustValue = e.detail.value
    if (list[index].adjustValue <= -10) {
      list[index].adjustValue = -10
    } else if (list[index].adjustValue >= 10) {
      list[index].adjustValue = 10
    }
    this.setData({
      inputList: list,
    })
    console.log(this.data.inputList)
  },
  //数值输入1
  bindNumber(e){
    console.log(e)
    const list = JSON.parse(JSON.stringify(this.data.inputList))
    const index = e.currentTarget.dataset.index
    list[index].rechargeFlow = e.detail.value
    this.setData({
      inputList: list,
    })
    console.log(this.data.inputList)
  },
  //输入袋数
  bindBagManual(e){
    console.log(e)
    this.setData({
      num: e.detail.value
    })
  },
  /* 袋数加数 */
  addCount: function (e) {
    console.log(e);
    // var num = e.currentTarget.dataset.value
    const list=JSON.parse(JSON.stringify(this.data.equiList))
    const index = e.currentTarget.dataset.index
    list[index].rechargeFlow ++
    this.setData({
      equiList: list
    })
    
  },
  //米的袋数加
  addBag:function(e){
    let renum=this.data.num
    renum ++
    this.setData({
      num: renum
    })
    // console.log(list)
  },
  //袋数加1
  addinputCount:function(e){
    const list = JSON.parse(JSON.stringify(this.data.inputList))
    const index = e.currentTarget.dataset.index
    list[index].rechargeFlow ++
    this.setData({
      inputList: list,
    })
  },
  //流量加1
  readdinputValue:function(e){
    const list = JSON.parse(JSON.stringify(this.data.inputList))
    const index = e.currentTarget.dataset.index
    list[index].adjustValue++
    if (list[index].adjustValue <= -10) {
      list[index].adjustValue = -10
    } else if (list[index].adjustValue >= 10) {
      list[index].adjustValue = 10
    }
    this.setData({
      inputList: list,
    })
  },
  delMore(e){
console.log(e)
    const list = JSON.parse(JSON.stringify(this.data.inputList))
    const index = e.currentTarget.dataset.index
    list.splice(index, 1)
    this.setData({
      inputList:list
    })
    console.log(this.data.inputList)
  },
  //袋数减1
  delInpitCount:function(e){
    const list = JSON.parse(JSON.stringify(this.data.inputList))
    const index = e.currentTarget.dataset.index
    list[index].rechargeFlow--
    if (list[0].rechargeFlow<0){
      list[0].rechargeFlow=0
    }
    this.setData({
      inputList: list,
    })
  },
  //流量减1
  redelinputValue:function(e){
    
    const list = JSON.parse(JSON.stringify(this.data.inputList))
    const index = e.currentTarget.dataset.index
    list[index].adjustValue--
    if (list[index].adjustValue <= -10) {
      list[index].adjustValue = -10
    } else if (list[index].adjustValue >= 10) {
      list[index].adjustValue = 10
    }
    this.setData({
      inputList: list,
    })
  },
  /* 流量加数 */
  readdCount: function (e) {
    // console.log("刚刚您点击了加1");
    const list = JSON.parse(JSON.stringify(this.data.equiList))
    const index = e.currentTarget.dataset.index
      list[index].adjustValue++
    if (list[index].adjustValue<=-10){
      list[index].adjustValue=-10
    } else if (list[index].adjustValue>=10){
      list[index].adjustValue=10
    }
    this.setData({
      equiList: list
    })
  },
  addMore(){
    console.log(this)
    const list = JSON.parse(JSON.stringify(this.data.inputList))    
    list.push({
      'adjustValue': 0,
      'deviceId': 0,
      'rechargeFlow': 0,
    })
    this.setData({
      inputList:list
    })
  },
  /* 袋数减 */
  delCount: function (e) {
    console.log(e);
    const list = JSON.parse(JSON.stringify(this.data.equiList))
    console.log(list)
    const index = e.currentTarget.dataset.index
    list[index].rechargeFlow --
    if (list[index].rechargeFlow <= 0){
      list[index].rechargeFlow=0
    }
    this.setData({
      equiList: list
    })
  },
  getIptInfo(e){
    this.setData({
      deliveryDesc:e.detail.value
    })
  },
  // 水的袋数减
  redelBag:function(e){
    // console.log(e);
    // const list = JSON.parse(JSON.stringify(this.data.equiList))
    // const index = e.currentTarget.dataset.index
    console.log(111111111)
    let anum=this.data.num
    anum --
    this.setData({
      num:anum
    })
  },
  /* 流量减数 */
  redelCount: function (e) {
    console.log(e)
    // console.log("刚刚您点击了减1");
    const list = JSON.parse(JSON.stringify(this.data.equiList))
    const index = e.currentTarget.dataset.index

    list[index].adjustValue--
    if (list[index].adjustValue <= -10) {
      list[index].adjustValue = -10
    } else if (list[index].adjustValue >= 10) {
      list[index].adjustValue = 10
    }
    this.setData({
      equiList: list
    })
  },
  // 获取设备编号
  getEquiNum() {
    let createId = this.data.createId
    console.log(this.data.deliveryList)
    let deliveryType=this.data.deliveryList.deliveryType
    if (deliveryType==1){
      console.log(this.data.createId)
      util.request(api.GetDeviceRecharge, { "createId": createId }, 'post').then((res) =>{
        console.log(res)
        console.log(res.data.length)
        if (res.data.length == 0) {
          this.setData({
            status: 0
          })
        }
        this.setData({
          equiList: res.data
        })
      })
    }else{
      this.setData({
        status: 0,
        equiList:[]
      })
    }
    
  },
  //用户取消
  cacel(e){
console.log(this.data.deliveryDesc)
    let deliveryDesc=this.data.deliveryDesc
    let id = e.currentTarget.dataset.id
    wx.showModal({
      content: '确定取消？',
      success:function(res){
if(!res.confirm){
  return
        }
         util.request(api.UserCancel + id + '?deliveryDesc=' +deliveryDesc , {}, 'POST').then(res => {
          if (res.code == 0) {
            console.log(res)
            wx.navigateBack({
              data: 1
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.msg,
            })
          }

        })
      }
    })
    
  },
//确认设备
  isDelivery(){
    let deliveryList = JSON.parse(JSON.stringify(this.data.deliveryList))   
    let deliveryId = deliveryList.deliveryId
    let deliveryDesc=this.data.deliveryDesc
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '确定用户已有茶吧机？',
      success: function (res) {
        console.log(res)
        if (!res.confirm) {
          return;
        }
        util.request(api.DevExist + '/' + deliveryId + '?deliveryDesc=' +deliveryDesc, {
        }, 'post').then(res=>{
          if(res.code==0){
            // wx.redirectTo({
            //   url: '/pages/ucenter/awaitDistribution/awaitDistribution?type=' + 2
            // });
            wx.navigateBack({
              delta: 1
            })
          }else{
            wx.showModal({
              title: '警告',
              content: '失败，请核实确认',
            })
          }
        })
      }
    })
   
  },
  //完成配送
  overDelivery(){
    let deliveryList = JSON.parse(JSON.stringify(this.data.deliveryList))
    let inputList = JSON.parse(JSON.stringify(this.data.inputList))
    let equiList=JSON.parse(JSON.stringify(this.data.equiList))
    let deliveryDesc=this.data.deliveryDesc
    let list =[]
    if (equiList.length==0){
      list = inputList
    }else{
      list = equiList
    }
    // 配送袋数
    let number =this.data.num
    let deliveryFlow = 0
  if (deliveryList.deliveryType == 1) { 
    deliveryFlow = list.reduce((pre,item)=>{
      console.log(item)
       return pre += item.rechargeFlow
      }, 0)
  } else if (deliveryList.deliveryType == 2){
    deliveryFlow = deliveryList.deliveryNum
  } else if (deliveryList.deliveryType == 3){
    deliveryFlow = number
  }
  if(this.data.stauts==0){
    console.log(111)
  }
    console.log(deliveryFlow)
    //解构赋值
    let { 
      deliveryId  //配送流量
     } = deliveryList
    console.log(list)
    console.log(deliveryId)
    if (deliveryFlow == 0 && deliveryList.deliveryType !=3) {
      wx.showModal({
        title: '警告',
        content: '添加袋数最少为1',
      })
    }else{
      console.log(deliveryFlow)
      console.log(list)
      console.log(deliveryId)
    util.request(api.CompleteDelicery,{
      deliveryFlow,
      deliveryDesc,
      deliveryId,
      rechargeDataList:list
    },'post').then((res)=>{
      console.log(res)
      console.log(deliveryFlow)
       if(res.code == 0){
        // wx.redirectTo({
        // url: '/pages/ucenter/awaitDistribution/awaitDistribution?type=' + 2
        // });
         wx.navigateBack({
           delta: 1
         })
       } else{
         console.log(res)
         wx.showToast({
           icon:'none',
           title: res.msg,
          
         })
       }
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var index = options.index
    var type = options.type
    this.setData({
      type:type
    })
    const qwer = wx.getStorageSync('deliveryList')
    console.log(qwer)
    let deliveryList = qwer[index]
    console.log(deliveryList)
  this.setData({
    deliveryList: deliveryList,
    deliveryDesc: deliveryList.deliveryDesc,
    createId: deliveryList.createId,
    sourceType: deliveryList.sourceType
    // equiId: deliveryList.deliveryDeviceId
  }, () => {this.getEquiNum()})
    wx.getStorage({
      key: 'deliveryList',
      success:(res) => {
        console.log(res)
        var deliveryList = res.data[index]
        console.log(deliveryList)
        this.setData({
          createId: deliveryList.createId
        })
        this.getEquiNum()
        this.setData({ deliveryList: deliveryList},()=>{
          console.log(this.data)
        })
        // if (deliveryList.deliveryDeviceId) {
        //   this.setData({
        //     equiId: deliveryList.deliveryDeviceId
        //   })
        // }else{
        //   this.setData({
        //     equiId: this.data.equiId
        //   })
        // }
      },
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