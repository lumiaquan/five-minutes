// components/post/post.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailurl: {
      type: String,
      value: ""
    },
    posts: {
      type: Object,
      value: {}
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

  },
  lifetimes: {
    attached: function() { //计算图片的尺寸（分三种情况）
      const windowwidth = wx.getSystemInfoSync().windowWidth;
      const weibowidth = windowwidth - 40;
      const twoImageSize = (weibowidth - 2.5) / 2;
      const threeImageSize = (weibowidth - 2.5 * 2) / 3;
      this.setData({
        twoImageSize: twoImageSize,
        threeImageSize: threeImageSize
      })
    }
  }
})