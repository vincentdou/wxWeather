Page({
  data:{
    // text:"这是一个页面"
    city:'',
    realtime:{},
    weather:[],
    today:{},
    life:{},
    pm25:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadInfo();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  loadInfo:function(){
      var self = this;
      wx.getLocation({
          type:'gcj02',
          success:function(res){
              var latitude = res.latitude;
              var longitude = res.longitude;
              self.loadCity(latitude,longitude);
          }
      })
  },
  loadCity:function(latitude,longitude){
    var page = this;  
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=你的APIkey&location=' + latitude + ',' + longitude + '&output=json',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
          //console.log(res);
          var city = res.data.result.addressComponent.city;
          city = city.replace("市","");
          page.setData({city:city});
          page.loadWeather(city);
      }
    });
  },
  loadWeather:function(city){
    var page = this;
    wx.request({
        url: 'http://op.juhe.cn/onebox/weather/query?cityname=' + city + '&key=你的APIkey',
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            // console.log(res);
            var realtime = res.data.result.data.realtime;
            var weather = res.data.result.data.weather;
            var today = weather.shift();
            var life = res.data.result.data.life;
            var pm25 = res.data.result.data.pm25;
            console.log(weather);
            page.setData({
              realtime:realtime,
              weather:weather,
              today:today,
              life:life,
              pm25:pm25
            })
        }
    });
  }
})