// pages/my_group/myIdentify_page/myIdentify_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identifyStatus:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onUploadImage: function(event){
    var that = this;
    wx.chooseImage({
      success: function(res) {
        var filePath = res.tempFilePaths[0];
        wx.cloud.uploadFile({
          cloudPath: "01.jpg",
          filePath: filePath,
          success: function(res){
            that.setData({
              identifyStatus: 2
            })
            wx.showToast({

              title: '成功',

              icon: 'success',

              duration: 2000//持续的时间

            })
          }
        })
      },
    })
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