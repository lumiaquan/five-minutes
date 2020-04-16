// components/ordinarypost/ordinarypost.js
const app = getApp();
Component({
      /**
       * 组件的属性列表
       */
      properties: {
        posts: {
          type: Object,
          value: {}
        },
        detailurl: {
          type: String,
          value: null
        }
      },

      /**
       * 组件的初始数据
       */
      data: {

      },

      /**
       * 组件的方法列表
       */
      methods: {
        onImageTap: function(event) {
          const dataset = event.target.dataset;

          const index = dataset.index;
          const images = this.data.posts.images;
          const current = images[index];
          wx.previewImage({
            urls: images,
            current: current
          })
        },

        onPraiseTap: function(event) {
          let value = {};
          const openId = app.globalData.userInfo.openId;
          const that = this;
          const post = that.properties.posts;
          const _id = post._id;
          if(post.isPraised){
            value = {
              praise: false,
              _id : _id
            }
          }else{
            value = {
              praise: true,
              _id: _id
            }
          }
            // post.praises.forEach((praise, index) => {
            //   if (praise == openId) {
            //     value = {
            //       _id: _id,
            //       praise: false
            //     }
            //   } else {
            //     value = {
            //       _id: _id,
            //       praise: true
            //     }
            //   }
            // })
          that.triggerEvent('onPraiseTap', value);
          console.log(value);
        }
      },  

        lifetimes: {
          attached: function() {
            const windowwidth = wx.getSystemInfoSync().windowWidth;
            const weibowidth = windowwidth - 40;
            const twoImageSize = (weibowidth - 2.5) / 2;
            const threeImageSize = (weibowidth - 2.5 * 2) / 3;
            this.setData({
              twoImageSize: twoImageSize,
              threeImageSize: threeImageSize
            });
          }
        }
})