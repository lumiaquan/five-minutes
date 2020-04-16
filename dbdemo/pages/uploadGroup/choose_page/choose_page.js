const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.is_login()) {
      wx.showActionSheet({
        itemList: ['文字', '照片', '视频'],
        success: res => {
          const tapIndex = res.tapIndex;
          if (tapIndex == 0) {
            wx.navigateTo({
              url: "../upload_page/upload_page?type=" + tapIndex
            })
          }
          else if (tapIndex == 1) {
            wx.chooseImage({
              success: function (res) {
                const tempImages = res.tempFilePaths;
                that.setData({
                  tempImages: tempImages
                })
                wx.navigateTo({
                  url: "../upload_page/upload_page?type=" + tapIndex
                })
              },
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})