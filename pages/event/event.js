//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    url: "https://mp.weixin.qq.com/s?__biz=MzIyMjIxODkzNQ==&mid=2652458533&idx=1&sn=7354f560a7a19ead4c045abe0d284a6f&chksm=f3dd31fdc4aab8eb8a30ce44555d2babffe12f0ae24eb2118ec1b0823ad1e9ff993b6a0bfd11#rd"
  },
  onTabItemTap () {
    this.setData({ url: app.globalData.eventUrl });
  }
})
