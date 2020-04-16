// pages/search_group/searchres_page/searchres_page.js
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasmore: true,
    all: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.startsearch(options);
    this.loadsearch(this.data.all.length);
  },

  /**
   * 把搜索的内容传参给tags
   */
  startsearch: function (options){
    var that = this;
    console.log(options);
    this.setData({
      tags: options.item
    });
  },

  /**
   * 加载更多搜索结果
   */ 
  loadsearch: function (start=0){
    const that = this;
    var tags = this.data.tags;
    let promise = db.collection("videoFirstPost");
    if (start > 0) {
      promise = promise.skip(start);
    }
    promise.where(_.or([
      {
        tags: db.RegExp({
        regexp: (tags),
        options: 'i',})
      },
      {
        title: db.RegExp({
          regexp: (tags),
          options: 'i',
        })
      }
    ])
    ).limit(3).get().then(res => {
      const all = res.data;
      let hasmore = true;
      if (all.length == 0) {
        hasmore = false
      }
      const newall = that.data.all.concat(all);
      console.log(res);
      that.setData({
        all: newall,
        hasmore: hasmore
      })
    });
  },
  myevent: function (e) {          
 
  console.log(e);

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
    this.loadsearch(this.data.all.length);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})