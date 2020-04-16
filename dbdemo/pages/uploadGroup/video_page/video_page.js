// dbdemo/pages/upload_group/video_page/video_page.js
const db = wx.cloud.database();
Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    selectArray: [{
      "id": "1",
      "text": "理学"
    }, {
      "id": "2",
      "text": "哲学"
    },
    {
      "id": "3",
      "text": "工学"
    }, {
      "id": "4",
      "text": "农学"
    },
    {
      "id": "5",
      "text": "经济学"
    }, {
      "id": "6",
      "text": "法学"
    },{
      "id": "7",
      "text": "教育学"
    }, {
      "id": "8",
      "text": "文学"
    },
    {
      "id": "9",
      "text": "历史学"
    }, {
      "id": "10",
      "text": "医学"
    },
    {
      "id": "11",
      "text": "军事学"
    }, {
      "id": "12",
      "text": "管理学"
      }, {
        "id": "13",
        "text": "艺术学"
      }, {
        "id": "14",
        "text": "其他"
      }
    ],
    
   
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
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
  cloudVideo:function(){//选择视频
    var that = this;
    
    wx.chooseVideo({           
      compressed:true,
      success: res => {
        console.log(res);
        const tempFilePath = res.tempFilePath;      
        that.setData({
          tempFilePath: tempFilePath



        })
      }
    })
  },
  send:function(event){
    var that = this;
    var tempFilePath = this.data.tempFilePath;//抓取上传的视频路径
    console.log(tempFilePath);//抓取上传的视频路径
    var tags =this.data.tags;
    console.log(tags);
    var title =event.detail.value.title; //获取页面中的数据
    var price =event.detail.value.name3;
    var explain = event.detail.value.name4;
    console.log(event);
    
    this.setData({
      price:price,
      title:title,
      explain:explain
    })
    if(tempFilePath===''||tags===''||title===''||price===''||explain=='')
    {
      wx.showModal({        //显示提示窗口
        title: '输入框不能为空',
        content: '请重新填写'
    })}
    else{

   
       
    wx.showModal({        //显示提示窗口
      title: '提交视频',
      content: '视频上传需要时间请等待',
      success(res) {
        console.log(res);
        if (res.confirm) {     //确定上传变量1
         that.setData({
           confirm:res.confirm
         });
          wx.showToast({
            title: '视频上传中',
            icon: 'loading',
            duration: 200000
          });
       
          wx.cloud.uploadFile({   //上传文件
            cloudPath: title,                       //-----需要给不重复随机数---------------上传文件不能同名
            filePath: tempFilePath,
            success: function (res) {
              //获取上传成功的视频文件地址
              console.log(res);
              console.log(res.errMsg);  //获取图片上传成功
              that.setData({
                fileID: res.fileID,
                isuploadvideo: res.errMsg
              });

              var fileID = that.data.fileID;  //获取视频贴的所有信息
              var tags = that.data.tags;
              var title = that.data.title;
              var price = that.data.price;
              var explain = that.data.explain;
              console.log(fileID);
              console.log(tags);
              console.log(price);
              console.log(explain);
              db.collection("videoFirstPost").add({
                data: {
                  fileID: fileID,
                  tags: tags,
                  title: title,
                  price: price,
                  explain: explain,
                  time: new Date(),
                  upNum:0 ,
                  commentNum:0 ,
                  collectNum:0
                }
              }).then(res => {
                console.log(res);
                console.log(res.errMsg);
                that.setData({
                  isadd: res.errMsg
                });
               that.isupload();  //弹出等待，上传完成后跳到全部页面
 
              });
            }
          });

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    }


  },
  myevent:function(e){           //下拉列表组件时间
   // console.log(e.detail.nowText);  //抓取下拉列表中的数据
    var tags = e.detail.nowText;
    this.setData({
       tags:tags
    });
  },
  isupload:function(){
    var that = this;
    var confirm = that.data.confirm;     //获取 弹出框确定
    var isuploadvideo = that.data.isuploadvideo; //获取视频上传成功
    var isadd = that.data.isadd;  //获取数据上传成功
    var tags = that.data.tags;  //获取标签信息
    var title = that.data.title;  //获取视频标题
    var price = that.data.price;  //获取视频定价
    var explain = that.data.explain; //获取视频说明
    var tempFilePath = this.data.tempFilePath;//抓取上传的视频路径
    if (confirm && isuploadvideo === 'cloud.uploadFile:ok' && isadd === 'collection.add:ok') {
        wx.hideToast();
        wx.navigateBack({
          
        });
    }
  }
  
})