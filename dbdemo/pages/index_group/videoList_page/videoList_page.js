// pages/index_group/videoList_page/videoList_page.js
const db = wx.cloud.database();
var _ = db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasmore: true,
    all: []
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function(options) {
    var that = this;
    console.log(options);
    this.setData({
      tags: options.item
    });
    var _ = db.command;
    db.collection("videoFirstPost").where({
      tags: _.eq(options.item),
    }).limit(3).get().then(res => {
      that.setData({
        all: res.data
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getvideo(this.data.all.length);
  },


  getvideo: function(start = 0) {
    const that = this;
    let promise = db.collection("videoFirstPost");
    var tags = this.data.tags;
    if (start > 0) {
      promise = promise.skip(start);
    }
    promise.where({
      tags: db.RegExp({
        regexp: (tags),
        options: 'i',
      })
    }).limit(1).get().then(res => {
      const all = res.data;
      let hasmore = true;
      if (all.length == 0) {
        hasmore = false
      }
      const newall = that.data.all.concat(all);
      that.setData({
        all: newall,
        hasmore: hasmore
      })
    });
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})