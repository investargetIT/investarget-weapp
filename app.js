//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    if (this.globalData.devMode) this.globalData.baseURL = "http://10.0.0.8:3000"

    // 设置底部标签栏
    // if (!wx.getStorageSync('token')) wx.setTabBarBadge({
    //   index: 3,
    //   text: '2'
    // })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })

    wx.request({
      url: 'https://api.investarget.com/activity',
      data: { page_size: 100 },
      method: 'GET',
      success: res => {
        if (res.data.result.count > 0) {
          const events = res.data.result.data.filter(f => !f.isNews);
          if (events.length > 0) {
            this.globalData.eventUrl = events[0].detailUrl;
          }
        }
      }
    })

  },
  url (uri) {
    return this.globalData.baseURL + uri;
  },
  log (...logs) {
    if (this.globalData.devMode) {
      console.log((new Date()).toUTCString(), ...logs);
    }
  },
  globalData: {
    latestInfo: null,
    userInfo: null,
    devMode: false,
    baseURL: "https://m.investarget.com",
    eventUrl: 'https://mp.weixin.qq.com/s/iInCoTAPaEthnfIhoM_6Ew',
  }
})
