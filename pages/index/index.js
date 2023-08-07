//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    url: null,
    isLogined: true
  },
  login() {
    let that = this;
    wx.login({ success: function (auth1) {
      wx.login({ success: function (auth2) {
        if (auth1.code && auth2.code && auth1.code !== auth2.code) {
          that.setData({ url: app.url(`/login?wxid=${auth1.code},${auth2.code}&userInfo=${encodeURI(JSON.stringify(app.globalData.userInfo))}`), isLogined: true })
        }
      }})
    }})
  },
  wxAuth(data) {
    if (data.detail.userInfo) {

      // 用户同意授权
      app.globalData.userInfo = data.detail.userInfo;
      wx.reLaunch({
        url: '/pages/index/index',
      })
      this.login();

    } else {

      // 用户取消授权
      wx.showModal({
        title: '警告',
        content: '用户取消授权',
      })

    }
  },
  onLoad: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.login();
        } else {
          this.setData({ isLogined: false });
        }
      }
    })
  },
  onShow: function () {}
})
