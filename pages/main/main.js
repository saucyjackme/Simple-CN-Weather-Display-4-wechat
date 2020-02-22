Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"",
    today:{},
    future:{}
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInfo(); 
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
    
  },

  //获取当前的IP位置
  loadInfo: function () {
    const page = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        // wx.openLocation({
        //   latitude,
        //   longitude,
        //   scale: 18
        // })
        console.log(latitude,longitude);
        page.loadCity(latitude,longitude);
        
      }
    })
  },
  //利用微信自带获取经纬度，获得城市名
  loadCity: function (latitude, longitude){
    const page = this;
    wx.request({
      url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=MndDMKo7my0o014kDhtqyLyhuEgjO0fB&output=json&coordtype=wgs84ll&location='+latitude+','+longitude,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);//获取城市
        let city = res.data.result.addressComponent.city;
        city = city.replace("市","");
        page.setData({ city: city });
        page.loadWeather(city);
      }
    })
  },
//同理，利用request,用城市名获得天气接口数据

  loadWeather: function (city) {
    const page = this;
    wx.request({
      url: 'https://www.tianqiapi.com/api?version=v1&appid=89485855&appsecret=WRxWp4N0&city='+city,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        let future = res.data.data;//获得七日天气并移除返回今日天气
        let today = res.data.data.shift();
        console.log(future);
        page.setData({today:today,future:future})
      }
    })
  },
})