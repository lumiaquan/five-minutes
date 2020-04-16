// dbdemo/pages/uploadGroup/post_detail_post/post_detail_post.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mask:false,   //输入框遮布
    ismy:false , //判断是否有删除权限
    skipnum:0,    //评论跳过变量
    limitnum:5,   //刷新评论变量
    comments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    this.setData({
      id:id
    });
    //提取首帖信息
   db.collection("ordinaryFirstPost").doc(id).get().then(res=>{
     res.data.time = res.data.time.getTime();
     that.setData({
       posts:res.data
     });
   // 提取首帖评论数
   db.collection("ordinarySecondPost").where({
       postID: id
     }).count().then(res => {
       var commentCount=res.total;
       commentCount.forEach((comment,index) => {
         comment.time = comment.time.getTime()
       })
       that.setData({
         commentCount:commentCount
       });
     });
 
   });
  
  this.getComment();
  },



  //获取用户评论
  getComment:function(){
    const that = this;   
    // db.collection("ordinarySecondPost").where({
    //   postID: that.data.id
    // }).count().then(res => {
    //   var commentCount = res.total;
    //   var skipnum = this.data.skipnum;
    //   var limitnum = this.data.limitnum;
    //   if (skipnum+5 <= commentCount){
    //      db.collection("ordinarySecondPost").where({
    //             postID:that.data.id
    //      }).orderBy("time","desc").limit(limitnum).skip(skipnum).get().then(res=>{
    //     var skipnum = this.data.skipnum + 5;
    //     const commentNew = res.data;
    //     const comments = that.data.comments;
    //     var i = 0;
    //     for(i=0;i<=4;i++){
    //       comments.splice(skipnum+i, 0, commentNew[i]);  //下拉刷新合并数组
    //     }

    //     that.setData({
    //       comments:comments,
    //       skipnum:skipnum
    //     });
    //   });

    // }
    // });

         
        db.collection("ordinarySecondPost").where({
          postID: that.data.id
        }).orderBy("time", "desc").limit(5).get().then(res => {
          const comments = res.data;
          comments.forEach((comment,index) => {
            comment.time = comment.time.getTime()
          })
          console.log(res);
          that.setData({
            comments: comments
           
          });
        });

     
  


  },

  //输入框聚焦
  onFocusEvent:function(event){
    this.setData({
      mask:true
    });
  },
  //输入框散焦
  onBlurEvent:function(event){
    this.setData({
      mask:false
    });
  },
  //获取输入框中的文字，并且提交评论
  onConfirmEvent:function(event){
   var that = this;
   const content = event.detail;
   console.log(content);
   if(content.value === "" )
   {
    wx.showModal({        //显示提示窗口
      title: '输入框不能为空',
      content: '请重新填写'
    });
   }
   else
   {
      db.collection("ordinarySecondPost").add({
        data:{
          content:content,
          author:app.globalData.userInfo,
          time:db.serverDate(),
          postID:this.data.id
        }
      }).then(res=>{
        const comment ={
          "_id":res._id,
          "content":content,
          "author":app.globalData.userInfo,
          "time":(new Date()).getTime()
        }
        const comments = that.data.comments;
        comments.splice(0,0,comment);
        var commentCount = that.data.commentCount+1;
        that.setData({
          comments:comments,
          commentCount: commentCount
        });
      });
   }
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
        //      db.collection("ordinarySecondPost").where({
    //             postID:that.data.id
    //      }).orderBy("time","desc").limit(limitnum).skip(skipnum).get().then(res=>{
    //     var skipnum = this.data.skipnum + 5;
    //     const commentNew = res.data;
    //     const comments = that.data.comments;
    //     var i = 0;
    //     for(i=0;i<=4;i++){
    //       comments.splice(skipnum+i, 0, commentNew[i]);  //下拉刷新合并数组
    //     }

    //     that.setData({
    //       comments:comments,
    //       skipnum:skipnum
    //     });
    //   });
    this.getComment();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})