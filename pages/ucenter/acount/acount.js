var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    orderList: [],
    showType: 1,
    page: 1,
    isReal:'',
    limit: 10,
    istx:false,
    statusValue:'',
    typeValue:'',
    isShow: false,
    typeStatus:false,
    status: '请选择状态',
    type:'请选择类型',
    totalPages: 1,
    currentId:'',
    id:0,
    selectedIds:[],
    totalMoney:[]
  },
  //选择状态
  choceStatus(e){
   console.log(e)
    let show = this.data.isShow
    this.setData({
      typeValue: e.currentTarget.dataset.value
    })
    util.request(api.AcountList, {
      page: this.data.page,
      limit: this.data.limit,
      profitsType: this.data.statusValue,
      status: this.data.typeValue ,
    }).then( (res)=> {
      if (res.code === 0) {
        console.log(res);
        this.setData({
          orderList: res.page.list,
          totalPages: res.page.totalPage,
          status: e.currentTarget.dataset.name,
          isShow: !show,
          typeStatus: false
        });
      }
      console.log(this.data.orderList);
    });
  },
  //选择类型
  chooseType(e){
    console.log(e)
    let show = this.data.typeStatus
    this.setData({
      statusValue: e.currentTarget.dataset.value
    })
    util.request(api.AcountList, {
      page: this.data.page,
      limit: this.data.limit,
      status: this.data.typeValue,
      profitsType: this.data.statusValue,
    }).then((res) => {
      if (res.code === 0) {
        this.setData({
          orderList: res.page.list,
          totalPages: res.page.totalPage,
          type: e.currentTarget.dataset.name,
          typeStatus: !show,
          isShow: false
        });
        console.log(this.data.orderList);
      }
    });
  },
  isCash(e){
    console.log(e)
    const _this=this
    const id = e.currentTarget.dataset.id
    const money = e.currentTarget.dataset.money
    const index = e.currentTarget.dataset.index
    const currentSelected = JSON.parse(JSON.stringify(_this.data.selectedIds))
    const list = JSON.parse(JSON.stringify(_this.data.orderList))
    const total = JSON.parse(JSON.stringify(_this.data.totalMoney))
    const status = e.currentTarget.dataset.status
   
    if(status==0){
      if (currentSelected.includes(id)) {
        currentSelected.splice(index, 1)
      } else {
        currentSelected.push(id)
        total.push(money)
        
      }
      list.forEach(item => {
        if (item.payProfitsRecordId == id) {
          console.log(item)
          item.checked = !item.checked
        }
      })
      // const totalPrice = money.reduce((previous, current) => {
      //   return previous += current.price * current.count;
      // }, 0)
      // console.log(totalPrice)
      _this.setData({
        selectedIds: list.filter(({ checked }) => checked).map(({ payProfitsRecordId }) => payProfitsRecordId),
        orderList: list,
        totalMoney: list.filter(({ checked }) => checked).map(({ amountProfits }) => amountProfits),
      })

    }    
  },
  //提现
  cashout(){
    let that=this
    let total = JSON.parse(JSON.stringify(this.data.totalMoney))
    let totalNum = total.reduce((previous, current) => {
      return previous += current;
    }, 0)
    console.log(totalNum)
    console.log(total)
    if (this.data.selectedIds.length<=0){
      wx.showToast({
        icon:'none',
        title: '您还没选择',
      })
    } else if (totalNum<100){
      wx.showToast({
        icon: 'none',
        title: '金额不能小于100',
      })
    }else if(totalNum>5000){
      wx.showToast({
        icon: 'none',
        title: '金额不能大于5000',
      })
    }else{
      wx.showModal({
        title: '总共' + totalNum + '元',
        content: '确定提现吗？',
        success: function (res) {
          if (res.confirm) {
            let idList = JSON.parse(JSON.stringify(that.data.selectedIds))
            // console.log(payProfitsRecordId)
            util.request(api.Withdrawal, idList, 'POST').then(res => {
              console.log(res)
              if (res.code == 0) {
                wx.showToast({
                  title: '提现成功',
                  duration: 2000
                })
                wx.reLaunch({
                  url: '/pages/ucenter/acount/acount',
                })
              } else {
                wx.showToast({
                  icon: 'none',
                  title: res.msg,
                  duration: 2000,
                })
              }
            })
          } else {
            return
          }

        }
      })
    }
  },
  goCertification() {
    wx.navigateTo({
      url: '/pages/ucenter/certification/certification',
    })
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // let that = this
    // try {
    //   var tab = wx.getStorageSync('tab');
    //   console.log('tab------>:' +tab);
    //   this.setData({
    //     showType: tab
    //   });
    // } catch (e) {}

  },
  getSelect() {
    let show = this.data.isShow
    this.setData({
      isShow: !show,
      typeStatus:false
    })
    },
    selectType(){
      let show = this.data.typeStatus
      this.setData({
        typeStatus: !show,
        isShow: false
        
      })
    },
  getOrderList() {
    let that = this;
    util.request(api.AcountList, {
      page: that.data.page,
      limit: that.data.limit,
      status: this.data.typeValue,
      profitsType: this.data.statusValue,
    }).then(function(res) {
      if (res.code === 0) {
        console.log(res.page);
        that.setData({
          orderList: that.data.orderList.concat(res.page.list),
          totalPages: res.page.totalPage
        });
        console.log(that.data.orderList)
      }
    });
  },
  onReachBottom() {
    if (this.data.totalPages > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
      this.getOrderList();
    } else {
      wx.showToast({
        title: '没有更多记录了',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
  },
  switchTab: function(event) {
    let showType = event.currentTarget.dataset.index;
    this.setData({
      orderList: [],
      showType: showType,
      page: 1,
      limit: 10,
      totalPages: 1
    });
    this.getOrderList();
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    let isReal = wx.getStorageSync('IsReal')
    this.setData({
      isReal: isReal
    })
    console.log(isReal)
    // 页面显示
    this.getOrderList();
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})
