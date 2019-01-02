//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    url: "https://mp.weixin.qq.com/s/iInCoTAPaEthnfIhoM_6Ew"
  },
  onTabItemTap () {
    this.setData({ url: app.globalData.eventUrl });
  }
})
