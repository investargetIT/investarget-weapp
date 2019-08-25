//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    url: app.url("/")
  },
  bindmessage: function (option) {
    console.log(option.detail.data);
  },
  onLoad: function (option) {

    app.log("Index.OnLoad", option);
    if (option.pid && option.token) wx.navigateTo({ url: `/pages/dtil/dtil?pid=${option.pid}&token=${option.token}` });

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
        } else {
          that.setData({ url: app.url('/?clear=1') })
        }
      }
    })
  },
})
