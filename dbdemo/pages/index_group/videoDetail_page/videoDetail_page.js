// pages/videomore/videomore.js
const db= wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: ['简介', '评论'],
    currentIndex: 0,
    post_second: [{
      neirong: "三角函数讲得很透彻，为多多点赞！",
      name: "一颗柠檬",
      pic_src: "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/index_group/videoDetail_page/avatar.png",
      time: "1天前",
      upNum: 160,
      commentNum: 0,
      collectNum: 100,

    },
    {
      neirong: "感谢！",
      name: "阿权",
      pic_src: "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/index_group/videoDetail_page/avatar2.png",
      time: "1天前",
      upNum: 160,
      commentNum: 0,
      collectNum: 100,
    },
      {
        neirong: "多多的视频风格很赞！很喜欢！期待下一期！！！",
        name: "铃兰校草青",
        pic_src: "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/index_group/videoDetail_page/avatar3.png",
        time: "1天前",
        upNum: 160,
        commentNum: 0,
        collectNum: 100,

      }],
    third_post: [{
      name: "多多大可爱：",
      neirong: "不客气！！！"
    },
    {
      name: "梦想的彼方：",
      neirong: "是的！这样讲课的方式很能让人接受！"
    }],
    third_post1: [{
      name: "多多大可爱：",
      neirong: "不客气！！！"
    }],
    third_post2: [{
      name: "多多大可爱：",
      neirong: "不客气！！！"
    },
    {
      name: "海澄涛：",
      neirong: "是呀！"
    }],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id =options.id;
    var that = this;
    db.collection("videoFirstPost").doc(id).get().then(res =>{
      var fileID = res.data.fileID;
      that.setData({
        fileID:fileID
      })
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