const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    posts: [],
    hasmore: true,
    items: ['全部', '视频', '悬赏贴', '交流贴'], //segment组件信息
    currentIndex: 0 //sement选项默认值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getweibo();
    this.getvideo();

      const windowwidth = wx.getSystemInfoSync().windowWidth;
      const weibowidth = windowwidth - 40;
      const twoImageSize = (weibowidth - 2.5) / 2;
      const threeImageSize = (weibowidth - 2.5 * 2) / 3;
      this.setData({
        twoImageSize: twoImageSize,
        threeImageSize: threeImageSize
      });
    
  },
  getvideo:function(){
    const that = this;
    db.collection("videoFirstPost").orderBy("time","desc").limit(5).get().then(res => {
      that.setData({
        video: res.data
      })
    });
  },
 
  onImageTap: function (event) {
    const postIndex = event.currentTarget.dataset.post;
    const imageIndex = event.currentTarget.dataset.index;
    const images = this.data.posts[postIndex].images;
    const current = images[imageIndex];
    wx.previewImage({
      urls: images,
      current: current
    })
  },

  getweibo: function(start = 0) {
    const that = this;
    wx.cloud.callFunction({
      name: "posts",
      data: {
        start: start
      }
    }).then(res => {
      const posts = res.result.posts;
      let hasmore = true;
      if (posts.length == 0) {
        hasmore = false
      }
      let newposts = [];
      if (start > 0) {
        newposts = that.data.posts.concat(posts);
      } else {
        newposts = posts;
      }
      that.setData({
        posts: newposts,
        hasmore: hasmore
      })
    });
  },

  loadPosts: function() {
    const that = this;
    db.collection("ordinaryFirstPost").limit(10).orderBy("time", "desc").get().then(res => {
      const posts = res.data;
      posts.forEach((post,index) => {
        post.time = post.time.getTime()
      })
      that.setData({
        posts: posts
      })
    })
  },

  onPraiseTap: function (event) {
    const that = this;
    const postIndex = event.currentTarget.dataset.posts;
    const post = that.data.posts[postIndex];
    const openId = app.globalData.userInfo.openId;
    const posts = that.data.posts;
    const _id = posts[postIndex]._id;
    
    if (!post.isPraised) {
      wx.cloud.callFunction({
        name: "praise",
        data: {
          postId: _id,
          praise: true
        },
        success: res => {
          if (!post.praises) {
            post.praises = [openId];
          } else {
            post.praises.push(openId);
          }
          post.isPraised = true;
          posts[postIndex] = post;
          that.setData({
            posts: posts
          })
        }
      })
    } else {
      wx.cloud.callFunction({
        name: "praise",
        data: {
          postId: _id,
          praise: false
        }
      }).then(res => {
        //1. 将自己的openid从weibo.praises数组中删掉
        const newPraises = [];
        post.praises.forEach((praise, index) => {
          if (praise != openId) {
            newPraises.push(praise);
          }
        })
        post.praises = newPraises;
        //2. 将weibo.isPraised=false
        post.isPraised = false;
        //3. 将修改后的weibo设置到原来的weibos中
        posts[postIndex] = post;
        //4. 将修改后的weibos重新设置到data中
        that.setData({
          posts: posts
        })
      })
    }
  },


  onWriteWeiboTap: function(event) { //点击加号选择发布类型
    var that = this;
    if (app.is_login()) {
      wx.showActionSheet({
        itemList: ['文字帖', '照片帖', '视频帖', '悬赏帖'],
        success: res => {
          const tapIndex = res.tapIndex;
          if (tapIndex == 0) {
            wx.navigateTo({
              url: "../upload_page/upload_page?type=" + tapIndex
            })
          } else if (tapIndex == 1) {
            wx.chooseImage({
              success: function(res) {
                const tempImages = res.tempFilePaths;
                that.setData({
                  tempImages: tempImages
                })
                wx.navigateTo({
                  url: "../upload_page/upload_page?type=" + tapIndex
                })
              },
            })
          } else if (tapIndex == 2) {
            // wx.chooseVideo({
            //   success: res => {
            //     const tempVideo = res.tempFilePath;
            //     that.setData({
            //       tempVideo: tempVideo
            //     })
            //     wx.navigateTo({
            //       url: '../upload_page/upload_page?type=' + tapIndex,
            //     })
            //   }
            // })
            wx.navigateTo({
                  url: '../video_page/video_page' ,
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if(app.globalData.isLoad == true){
      this.loadPosts();
      this.getvideo();
    }
    
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
    this.getweibo(0);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getweibo(this.data.posts.length);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})