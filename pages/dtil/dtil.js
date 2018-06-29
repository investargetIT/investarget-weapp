//dtil.js
//获取应用实例
const app = getApp()

Page({
  data: {
    url: ""
  },
  onLoad: function (option) {

    app.log("Dtil.OnLoad", option);

    let redirectOption = `/?`;
    if (option.pid && option.token) {
      redirectOption = `/project/${option.pid}?token=${option.token}&`;
    }

    let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (auth) {
              if (auth.code) {
                that.setData({ url: app.url(`${redirectOption}wxid=${auth.code}`) })
              }
            }
          })
        } else {
          that.setData({ url: app.url(redirectOption) })
        }
      }
    })

  },
  bindmessage: function (option) {
    app.globalData.latestInfo = option.detail.data.pop();
  },
  onShareAppMessage: function (option) {

    let sharedInfo = app.globalData.latestInfo;
    app.log("Dtil.OnShareAppMessage", option, sharedInfo);

    let path = "";
    let title = "项目分享 - 多维海拓";
    let projectId = 0;
    let webViewUrl = option.webViewUrl || "";
    if (webViewUrl.includes("/project/")) {
      webViewUrl = webViewUrl.substr(webViewUrl.lastIndexOf("/") + 1);
      let questionMarkPos = webViewUrl.indexOf("?");
      projectId = parseInt(webViewUrl.substr(0, questionMarkPos), 10);
      let token = webViewUrl.substr(webViewUrl.indexOf("token=") + 6);
      path = `/pages/index/index?pid=${projectId}&token=${token}`;
    } else {
      path = "/pages/index/index";
    }

    if (sharedInfo.id === projectId) {
      title = `分享：${sharedInfo.titleC}`;
    }

    return {
      title,
      desc: `多维海拓项目分享`,
      path
    }

  }
})
