//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    url: app.url("/")
  },
  onLoad: function (option) {
    let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (auth) {
              if (auth.code) {
                that.setData({ url: app.url(`/?wxid=${auth.code}`) })
              }
            }
          })
        }
      }
    })
  },
})
