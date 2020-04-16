// pages/tiezi/tiezi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_title: [{
      neirong: "今天多多给大家介绍的是等价无穷小替换原理，大家要时刻注意不可替换的情况哦",
      neirong_src1: "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/other_group/commentDetail_page/IMG_3706.jpg", 
      neirong_src2:"cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/other_group/commentDetail_page/IMG_3707.jpg",
      neirong_src3:"cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/other_group/commentDetail_page/IMG_3708.jpg",
      name: "多多大可爱",
      pic_src: "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/other_group/commentDetail_page/avata1.png",
      time: "1天前",
      upNum: 160,
      commentNum: 2,
      collectNum: 100,
      index: 0
    },
    {
      neirong: "大一新生，学习高数和大物的时候发现有关于三角函数特别是反三角函数的知识漏洞，有没有一本可以让我自学反三角函数的教材(最好有反三角函数的积分)，求大佬们推荐一下。",
      neirpng_src: "",
      name: "阿哲",
      pic_src: "oud://f-min-dev-d12ct.662d-f-min-dev-d12ct-1259251713/shen/avatar.png",
      time: "2天前",
      upNum: 100,
      commentNum: 100,
      collectNum: 100,
      index: 1
    }],
    buf:[],
    post_second: [{
      neirong: "感谢多多！感谢多多！感谢多多！感谢多多！感谢多多！感谢多多！感谢多多！感谢多多！感谢多多！",
      name: "阿哲",
      pic_src: "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/other_group/commentDetail_page/avatar.png",
      time: "1天前",
      upNum: 160,
      commentNum: 0,
      collectNum: 100,
      
    },
    {
      neirong: "感谢！",
      name: "阿涛",
      pic_src: "cloud://f-min-dev-d12ct.662d-f-min-dev-d12ct/etc/pagesSrc/pages/other_group/commentDetail_page/avatar.png",
      time: "1天前",
      upNum: 160,
      commentNum: 0,
      collectNum: 100,
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var index = options.index;
    var i =this.data.post_title[index];
    console.log(i);
  
    this.setData({
      buf:i
    });
    
 

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