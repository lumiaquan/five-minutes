App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.cloud.init({
      traceUser: true
    })
    this.globalData = {}
    this.loadUserInfo();
  },

  loadUserInfo: function () {
    const that = this;
    wx.getSetting({
      success: res => {
        const isUserInfo = res.authSetting['scope.userInfo'];
        if (isUserInfo) {
          wx.getUserInfo({
            success: res => {
              const userInfo = res.userInfo;
              that.globalData.userInfo = userInfo;
            }
          });
          wx.cloud.callFunction({
            name: "login",
            success: res => {
              const openId = res.result.openid;
              that.globalData.userInfo.openId = openId;
            }
          })
        }
      }
    })
  },

  is_login: function () {
    if (this.globalData.userInfo) {
      return true;
    } else {
      return false;
    }
  },

  setUserInfo: function (userInfo) {
    this.globalData.userInfo = userInfo;
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
