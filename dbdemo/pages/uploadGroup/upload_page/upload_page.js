// pages/wweibo/wweibo.js
import {getUUID,getExt} from "../../../utils/util.js";
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempImages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type;
    const pages = getCurrentPages();
    const indexPage = pages[0];
    const tempImages = indexPage.data.tempImages;
    const tempVideo = indexPage.data.tempVideo;
    this.setData({
      tempImages: tempImages,
      type: type,
      tempVideo: tempVideo
    })
    this.initImageSize();
  },
  initImageSize: function () {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const containerWidth = windowWidth - 60;
    const imageSize = (containerWidth - 2.5 * 3) / 3;
    this.setData({
      imageSize: imageSize
    })
  },

  onSubmitEvent: function (event) {  //提交按钮的事件
    const that = this;
    const content = event.detail.value.content;
    const author = app.globalData.userInfo;
    const post = {
      content: content,
      author: author
    }
    wx.showLoading({
      title: '正在发表中。。。',
    })
    //上传图片到云服务器
    const fileIdList = [];
    if(that.data.tempImages){
      that.data.tempImages.forEach((value,index) => {
        const cloudPath = that.getCloudPath(value);
        wx.cloud.uploadFile({
          filePath: value,
          cloudPath: cloudPath,
          success: res=>{
            console.log(res);
            fileIdList.push(res.fileID);
            if(fileIdList.length == that.data.tempImages.length){
              //接下来就是发布微博了
              post.images = fileIdList;
              that.publicPost(post);
            }
          }
        })
      })
    }else if(that.data.tempVideo){
      const cloudPath = that.getCloudPath(that.data.tempVideo);
      wx.cloud.uploadFile({
        filePath: that.data.tempVideo,
        cloudPath: cloudPath,
        success: res => {
          //上传视频
          const fileID = res.fileID;
          post.video = fileID;
          that.publicPost(post);
        }
      })
    }else{
      that.publicPost(post)
    }
   
  },

  publicPost: function(post){  //调用云函数wweibo
    wx.cloud.callFunction({
      name: "wweibo",
      data: post,
      success: res => {
        const _id = res.result._id;
        if (_id) {
          wx.hideLoading();
          wx.showToast({
            title: '恭喜！发送成功！',
          })
          app.globalData.isload = true;
          setTimeout(function () { wx.navigateBack({})},800)
        } else {
          wx.showToast({
            title: res.result.errmsg,
          })
        }
      }
    })
  },

  onAddImageTap: function (event) {
    const that = this;

    wx.chooseImage({
      success: function (res) {
        const tempImages = res.tempFilePaths;
        const oldImages = that.data.tempImages;
        const newImages = oldImages.concat(tempImages);
        that.setData({
          tempImages: newImages
        })
      },
    })
  },

  onRemoveBtnTap: function (event) {         //删除图片的事件
    const index = event.target.dataset.index;
    const tempImages = this.data.tempImages;
    tempImages.splice(index, 1);
    this.setData({
      tempImages: tempImages
    })
  },

  onImageTap: function(event){
    const that = this;
    const index = event.target.dataset.index;
    const current = that.data.tempImages[index];
    wx.previewImage({
      urls: that.data.tempImages,
      current: current
    })
  },

  getCloudPath: function (fileName) {    //获取clodpath
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const cloudPath = "weibos/" + year + "/" + month + "/" + day + "/" + getUUID() + "." + getExt(fileName);
    return cloudPath;
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