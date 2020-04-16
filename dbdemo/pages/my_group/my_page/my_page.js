// pages/mine/mine.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Isidentifi: false,
    userSlogan: "越努力越幸运！"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // db.collection("post").add({  //主帖
    //   data:{
    //     avatar: "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/222.jpeg",
    //     userID: "s1mple",
    //     time: new Date("2018/1/1 12:00"),
    //     content: "湖北省武汉市洪山区南李路22号武昌首义学院",
    //     imageSrc: "",
    //     vedioSrc: "",
    //     upNum: 101,
    //     commentNum: 51,
    //     collectionNum: 36,
    //     isUp: true,
    //     isCollection: true,
    //     type: "first",
    //     postID: 1

    //   }
    // }),
    //   db.collection("post").add({  //副帖
    //     data: {
    //       avatar: "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/222.jpeg",
    //       userID: "Niko",
    //       time: new Date("2018/2/3 10:20"),
    //       upNum: 101,
    //       commentNum: 53,
    //       content: "我是副帖",
    //       imageSrc: "",
    //       isUp: true,
    //       type: "second",
    //       postID: 1,
    //       deputyID: 1

    //     }
    //   }),
    //   db.collection("post").add({  //楼层回复帖
    //     data: {
    //       avatar: "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/222.jpeg",
    //       userID: "Niko",
    //       time: new Date("2018/3/4 11:12"),
    //       content: "我是楼层回复帖",
    //       type: "third",
    //       deputyID: 1

    //     }
    //   })

  },
  
  onSignupTap: function(event){
    wx.showToast({
      title: '签到成功! +1讲堂币!',
      icon: 'none',
      duration: 2000//持续的时间
    })
    db.collection("wallet").doc("57896b495cebdf7b06a54d7a5db1a949").update({
      data:{
        coin: _.inc(1)
      }
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