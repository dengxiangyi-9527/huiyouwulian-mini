// 以下是业务服务器API地址
// 本机开发时使用
//var WxApiRoot = 'http://localhost:9020/yry/app/';

// 云平台上线时使用
//  var WxApiRoot = 'https://web.cclppt.cn/yry/app/';
// var WxApiRoot = 'http://192.168.3.34:9999/yry/app/';
// var WxApiRoot = 'http://192.168.3.30:9999/yry/app/';
// var WxApiRoot = 'http://192.168.101.5:9999/yry/app/';
// var WxApiRoot = 'http://hywl-gateway:9999/yry/app/';
 var WxApiRoot = 'https://api.qcwlpt.com/yry/app/';

module.exports = {
  IndexUrl: WxApiRoot + 'home/index', //首页数据接口
  AboutUrl: WxApiRoot + 'home/about', //介绍信息

  CatalogList: WxApiRoot + 'catalog/index', //分类目录全部分类数据接口
  CatalogCurrent: WxApiRoot + 'catalog/current', //分类目录当前分类数据接口

  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
  AuthLoginByAccount: WxApiRoot + 'auth/login', //账号登录
  AuthLogout: WxApiRoot + 'auth/logout', //账号登出
  AuthRegister: WxApiRoot + 'auth/register', //账号注册
  AuthReset: WxApiRoot + 'auth/reset', //账号密码重置
  AuthRegisterCaptcha: WxApiRoot + 'auth/regCaptcha', //验证码
  AuthBindPhone: WxApiRoot + 'auth/parsPhone1', //设备添加绑定微信手机号
  BindPhone: WxApiRoot + 'auth/bindPhone',//首页绑定手机

  GoodsCount: WxApiRoot + 'goods/count', //统计商品总数
  GoodsList: WxApiRoot + 'goods/list', //获得商品列表
  GoodsCategory: WxApiRoot + 'goods/category', //获得分类数据
  GoodsDetail: WxApiRoot + 'goods/detail', //获得商品的详情
  GoodsRelated: WxApiRoot + 'goods/related', //商品详情页的关联商品（大家都在看）

  BrandList: WxApiRoot + 'brand/list', //品牌列表
  BrandDetail: WxApiRoot + 'brand/detail', //品牌详情

  OcsSubjectList: WxApiRoot + 'ocsdevice/queryUnBindMasterList', //未绑定设备列表
  OcsSubjectDetail: WxApiRoot + 'ocssubject/detail', //设备主题详情

  CartList: WxApiRoot + 'cart/index', //获取购物车的数据
  CartAdd: WxApiRoot + 'cart/add', // 添加商品到购物车
  CartFastAdd: WxApiRoot + 'cart/fastadd', // 立即购买商品
  CartUpdate: WxApiRoot + 'cart/update', // 更新购物车的商品
  CartDelete: WxApiRoot + 'cart/delete', // 删除购物车的商品
  CartChecked: WxApiRoot + 'cart/checked', // 选择或取消选择商品
  CartGoodsCount: WxApiRoot + 'cart/goodscount', // 获取购物车商品件数
  CartCheckout: WxApiRoot + 'cart/checkout', // 下单前信息确认

  CollectList: WxApiRoot + 'collect/list', //收藏列表
  CollectAddOrDelete: WxApiRoot + 'collect/addordelete', //添加或取消收藏

  CommentList: WxApiRoot + 'comment/list', //评论列表
  CommentCount: WxApiRoot + 'comment/count', //评论总数
  CommentPost: WxApiRoot + 'comment/post', //发表评论

  TopicList: WxApiRoot + 'topic/list', //专题列表
  TopicDetail: WxApiRoot + 'topic/detail', //专题详情
  TopicRelated: WxApiRoot + 'topic/related', //相关专题

  SearchIndex: WxApiRoot + 'search/index', //搜索关键字
  SearchResult: WxApiRoot + 'search/result', //搜索结果
  SearchHelper: WxApiRoot + 'search/helper', //搜索帮助
  SearchClearHistory: WxApiRoot + 'search/clearhistory', //搜索历史清楚

  AddressList: WxApiRoot + 'memberaddress/list', //收货地址列表
  AddressDetail: WxApiRoot + 'memberaddress/detail', //收货地址详情
  AddressSave: WxApiRoot + 'memberaddress/save', //保存收货地址
  AddressDelete: WxApiRoot + 'memberaddress/delete2', //删除收货地址

  CardList: WxApiRoot + 'pay/withdrawal/getBankCardList', //银行卡列表
  CardDetail: WxApiRoot + 'pay/withdrawal/detail', //银行卡详情
  CardSave: WxApiRoot + 'pay/withdrawal/realNameAuth', //保存银行卡
  CardDelete: WxApiRoot + 'pay/withdrawal/deleteCheckCard', //删除银行卡


  ExpressQuery: WxApiRoot + 'express/query', //物流查询

  RegionList: WxApiRoot + 'region/list', //获取区域列表

  OrderSubmit: WxApiRoot + 'order/submit', // 提交订单
  OrderPrepay: WxApiRoot + 'order/prepay', // 订单的预支付会话
  OrderList: WxApiRoot + 'order/list', //订单列表
  OrderDetail: WxApiRoot + 'order/detail', //订单详情
  OrderCancel: WxApiRoot + 'order/cancel', //取消订单
  OrderRefund: WxApiRoot + 'order/refund', //退款取消订单
  OrderDelete: WxApiRoot + 'order/delete', //删除订单
  OrderConfirm: WxApiRoot + 'order/confirm', //确认收货
  OrderGoods: WxApiRoot + 'order/goods', // 代评价商品信息
  OrderComment: WxApiRoot + 'order/comment', // 评价订单商品信息

  FeedbackAdd: WxApiRoot + 'feedback/submit', //添加反馈
  FootprintList: WxApiRoot + 'footprint/list', //足迹列表
  FootprintDelete: WxApiRoot + 'footprint/delete', //删除足迹

  UserFormIdCreate: WxApiRoot + 'formid/create', //用户FromId，用于发送模版消息

  GroupOnList: WxApiRoot + 'groupon/list', //团购列表
  GroupOnMy: WxApiRoot + 'groupon/my', //团购API-我的团购
  GroupOnDetail: WxApiRoot + 'groupon/detail', //团购API-详情
  GroupOnJoin: WxApiRoot + 'groupon/join', //团购API-详情

  CouponList: WxApiRoot + 'coupon/list', //优惠券列表
  CouponMyList: WxApiRoot + 'coupon/mylist', //我的优惠券列表
  CouponSelectList: WxApiRoot + 'coupon/selectlist', //当前订单可用优惠券列表
  CouponReceive: WxApiRoot + 'coupon/receive', //优惠券领取
  CouponExchange: WxApiRoot + 'coupon/exchange', //优惠券兑换

  StorageUpload: WxApiRoot + 'storage/upload', //图片上传,

  UserIndex: WxApiRoot + 'user/index', //个人页面用户相关信息
  IssueList: WxApiRoot + 'issue/list', //帮助信息

  AcountList: WxApiRoot + 'memberacount/list',//账户列表
  AcountInfo: WxApiRoot + 'memberacount/acount',//账户列表

  MyEquiList: WxApiRoot + 'ocsdevice/myDevice', //设备主题详情
  GetEquiList: WxApiRoot + 'ocsdevice/readMyWaterDispenser', //查询设备列表
  AddEqui: WxApiRoot + 'ocsdevice/bindWaterDispenser', //添加设备

  GetTask: WxApiRoot + 'delivery/deliveryRecord/claimTask', //认领列表
  GetDelivery: WxApiRoot + 'delivery/deliveryRecord/list', //配送列表
  CompleteDelicery: WxApiRoot + 'delivery/deliveryRecord/deliceryComplete1', //完成配送
  GetDeviceRecharge: WxApiRoot + 'ocsdevice/readMyDeviceRechargeData1', //设备编号
  GetInviteCode: WxApiRoot + 'auth/queryinviteCode', //获取分享码
  RelalNameAuth: WxApiRoot + 'auth/realNameAuth', //实名认证
  Rights: WxApiRoot + 'applymachine/apply', //茶吧机赠送
  RequestMessage: WxApiRoot + 'wxtemplate/alltemplate', //推送信息
  LayOut: WxApiRoot + 'auth/rmAccount', //注销信息
  DevExist: WxApiRoot + 'delivery/deliveryRecord/deliceryDevExist', //确认茶吧机设备

  CityList: WxApiRoot + 'home/selectSubDealersAll',//城市区域编码
  GetCityCode: WxApiRoot + 'home/getAreaCodeByItude',//获取城市区域编码

  Withdrawal: WxApiRoot + 'pay/withdrawal/createWithdrawal',//提现

  UserCancel: WxApiRoot + 'delivery/deliveryRecord/cancel/',//用户取消

  GetVerification: WxApiRoot + 'H5/loginCode/',//h5获取验证码

  GetCode: WxApiRoot + 'auth/updatePhoneCode/',//小程序获取验证码
  // Login: WxApiRoot + 'H5/login/',//登陆

  BindMobile: WxApiRoot + 'auth/updatePhone/',//绑定手机号
  DeliveryWater: WxApiRoot + 'ocsdevice/touchDeliveryWater/',//一键送水

  SearchMember: WxApiRoot + 'pay/integral/readMemberByPhoneAndTenantId/',//查询会员
	
	
  AddIntegral: WxApiRoot + 'pay/integral/addIntegral/',//积分互转
  GetCountDetail: WxApiRoot + 'pay/integral/list/', //积分详情   
  GoShare: WxApiRoot + 'H5/getSmallProgramCode/', //积分详情   

};
