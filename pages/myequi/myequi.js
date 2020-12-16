var util = require('../../utils/util.js');
var api = require('../../config/api.js');
import model from '../../utils/canvas.js'
const ctx = wx.createCanvasContext("bgCanvas");
const ctx2 = wx.createCanvasContext("runCanvas");

let mytime = "";
let n = 0;
var w = "";
var h = "";
var app = getApp();
Page({
  ...model.options,
  data: {
    score:0.0,
    RemainFlow:null,
    ...model.data,
    type: 0,
    myequiList: [],
    page: 1,
    disabled:false,
    limit: 10,
    src:0,
    allSrc:0,
    totalPages: 1,
    isGetMenu:false,
    hasInfo:false,
    mainList:[],
    equiList:[],
    isReal:'',
    show:false,
    hasLogin:false
  },


  // 获取菜单
  getMenu() {
    this.setData({
      isGetMenu: !this.data.isGetMenu
    })
  },
  // 首次查询没有设备 点击添加设备
  addEqui() {
    
      wx.navigateTo({
        url: '/pages/myequi/myequiAdd/myequiAdd',
      })
    
    
  },
  getMore(){
    let isShow=this.data.show
    this.setData({
      show:!isShow
    })
  },
  canvasTap() {
    let that = this;
    clearInterval(mytime);
    mytime = setInterval(that.run, 50)
  },

  // 查询设备信息
  getEquiListInfo() {
    let that = this;

    util.request(api.GetEquiList, {

    }, 'POST').then((res) => {
      console.log(res)
      var mainList = []
      if(res.code == 0) {
        let _mainList = res.data
        if (_mainList.length>0){
          that.setData({
            hasInfo: true,
            mainList: _mainList,
            equiList: _mainList[0]
          })
        }
        console.log(this.data.equiList)
        if (this.data.mainList.length > 0) {
          var use = this.data.mainList[0].flowRemain
          var flowUsed = this.data.mainList[0].flowUsed
          let RemainFlow=parseInt(this.data.mainList[0].flowRemain)
          var allFlow = use + flowUsed;
          let _score = use / allFlow;
          console.log('_score' + _score);
          let allSrc = 0.015 * _score*100; //应该绘制的弧度
          let src = allSrc / 100  

          that.setData({
            score: _score,
            src: src,
            RemainFlow:RemainFlow,
            allSrc: allSrc
          })
          this.getBgCanvas();
          this.canvasTap();
          
        }
      }
    })
  },
  // 点击设备
  getIndex(e) {
    console.log(e)
    this.setData({
      show:false
    })
    var index = e.currentTarget.dataset.index
    var use = this.data.mainList[index].flowRemain
    var flowUsed = this.data.mainList[index].flowUsed
    var allFlow = use + flowUsed;
    let _score = use / allFlow;
    console.log('_score' + _score);
    let allSrc = 0.015 * _score * 100; //应该绘制的弧度
    let src = allSrc / 100  
    this.setData({
      equiList: this.data.mainList[index],
      isGetMenu: !this.data.isGetMenu,
       score: _score,
      src: src,
      allSrc: allSrc
    })
    this.getBgCanvas();
    this.canvasTap();
  },
  sendWater(){
    this.setData({
      disabled:true
    })
    util.request(api.DeliveryWater,{},'POST').then(res=>{
      wx.showToast({
        icon:'none',
        title: res.msg,
      })
      this.setData({
        disabled:false
      })
})
  },

  // 激活设备
  getActivate() {
    wx.navigateTo({
      url: '/pages/myequi/myequiAdd/myequiAdd',
    })
    this.setData({
      isGetMenu:false
    })
  },
  goLogin() {
    wx.navigateTo({
      url: "/pages/auth/login/login"
    });
  },
  goCertification() {
    wx.navigateTo({
      url: '/pages/ucenter/certification/certification',
    })
  },
 
  getBgCanvas: function () {
    let query = wx.createSelectorQuery().in(this);
    query.select('#canvas-one').boundingClientRect(rect => {
      console.log(rect)
      console.log('ssss:'+rect);
      w = parseInt(rect.width / 2);
      console.log(w)
      h = parseInt(rect.height / 2);
      console.log('WWW:' + w);
      console.log('HHH:' + h);
      //获取宽高的一半是为了便于找到中心点
      ctx.arc(w, h, w - 8, 0.75 * Math.PI, 2.25 * Math.PI); //绘制圆形弧线
      ctx.setStrokeStyle("#fff"); //设置填充线条颜色
      ctx.setLineWidth("14");     //设置线条宽度
      ctx.setLineCap("round");        //设置线条端点样式
      ctx.stroke();     //对路径进行描边，也就是绘制线条。
      ctx.draw();       //开始绘制
    }).exec();

  },


  run(e) {
    let that = this;
    let src = that.data.src; //每个间隔所需绘制的弧度
    let allSrc = that.data.allSrc; //总共需要绘制的弧度
    n++;
    if (src * n > allSrc) {
      clearInterval(mytime); //如果绘制完成，停掉计时器，绘制结束
      n = 0;
      return;
    }
    let grade = Math.round(that.data.score  * 100); //百分数
    // console.log('grade:' + grade);
    ctx2.arc(w, h, w - 8, 0.75 * Math.PI, (0.75 + src * n) * Math.PI); //每个间隔绘制的弧度
    ctx2.setStrokeStyle("#1374BE");
    ctx2.setLineWidth("14");
    ctx2.setLineCap("round");
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.setFontSize(60); //注意不要加引号
    ctx2.setFillStyle("#fff");
    ctx2.setTextAlign("center");
    ctx2.setTextBaseline("middle");
    ctx2.fillText(grade + "%", w, h);
    ctx2.draw();
  },


  onLoad: function() {
    // 页面显示
    if (app.globalData.hasLogin) {
      // this.getCollectList();
       this.getEquiListInfo();
     }
       
  },
  onReady: function() {
    
    
  },
  onShow: function() {
    let isReal = wx.getStorageSync('IsReal')
    // let isReal = 1
    this.setData({
      isReal: isReal
    })
    console.log(isReal)
    this.getEquiListInfo()

   

    this.setData({
      hasLogin: app.globalData.hasLogin
    });
    
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭
  },
 

})
