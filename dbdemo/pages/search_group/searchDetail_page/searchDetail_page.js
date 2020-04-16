// dbdemo/pages/search_group/searchDetail_page/searchDetail_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchwhat: ['聚类算法', '高数', '理学', '冒泡排序',  '哲学', '三角函数万能公式', 'c语言教程','虚拟机的创建'],
    isshow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var isshow = that.data.isshow;
    if (that.data.searchwhat.length == 0){
      this.setData({
        isshow: false
      })
    }
  },

  clearhistory: function(event){
    var that=this
    var searchwhat = that.data.searchwhat;
    var isshow = that.data.isshow;
    this.setData({
      searchwhat: [],
      isshow: false 
    });
  },

  finishsearch: function (event){
    console.log(event);
    var that = this;
    var value = event.detail.value;
    var searchwhat = that.data.searchwhat;
    searchwhat.splice(0,0,value);
    console.log(searchwhat);
    console.log(value);
    this.setData({
      searchwhat: searchwhat
    });
      wx.navigateTo({
        url: '/pages/search_group/searchres_page/searchres_page?item='+value,
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