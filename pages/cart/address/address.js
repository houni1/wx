Page({
  data: {
    latitude: '',
    longitude: '',
    markers: []
    // covers: [{
    //   latitude: 23.099994,
    //   longitude: 113.344520,
    //   iconPath: 'images/location.png'
    // }, {
    //   latitude: 23.099994,
    //   longitude: 113.304520,
    //   iconPath: 'images/location.png'
    // }]
  },
  onLoad: function(options) {
    console.log(options)
    var lon = options.lon;
    var lat = options.lat;
    this.setData({
      latitude: lat,
      longitude: lon,
      markers: [{
        id: 1,
        latitude: lat,
        longitude: lon,
        name: '一猫汽车'
      }]
    });
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  // getCenterLocation: function () {
  //   this.mapCtx.getCenterLocation({
  //     success: function (res) {
  //       console.log(res.longitude)
  //       console.log(res.latitude)
  //     }
  //   })
  // },
  // moveToLocation: function () {
  //   this.mapCtx.moveToLocation()
  // },
  // translateMarker: function () {
  //   this.mapCtx.translateMarker({
  //     markerId: 1,
  //     autoRotate: true,
  //     duration: 1000,
  //     destination: {
  //       latitude: 23.10229,
  //       longitude: 113.3345211,
  //     },
  //     animationEnd() {
  //       console.log('animation end')
  //     }
  //   })
  // },
  // includePoints: function () {
  //   this.mapCtx.includePoints({
  //     padding: [10],
  //     points: [{
  //       latitude: 23.10229,
  //       longitude: 113.3345211,
  //     }, {
  //       latitude: 23.00229,
  //       longitude: 113.3345211,
  //     }]
  //   })
  // }
})
