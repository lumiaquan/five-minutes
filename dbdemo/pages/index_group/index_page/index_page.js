// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ad_pic_src: ["cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/index_group/index_page/ad_caikuai.png", "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/index_group/index_page/ad_jishu.png", "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/index_group/index_page/ad_duoduo1.png","cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/index_group/index_page/ad_jishu.png"]

  },
  /**cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/index_group/index_page/middlebackground.pngcloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/index_group/index_page/middlebackground.p
   * 
   * 
   * 
   * 
   * 
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var systemInfo = wx.getSystemInfoSync();
    var width = systemInfo.windowWidth;
    var height = width / 4;
    this.setData({
      width: width,
      height: height
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

  },
  onsegmentItemchanged: function (event) {
    var index = event.detail.index;
    this.setData({
      currentIndex: index
    })
  }
})