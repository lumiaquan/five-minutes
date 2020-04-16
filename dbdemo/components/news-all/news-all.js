// components/news-all/news-all.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    post_title:{
      type: String,
      value: ""
    },
    post_src:{
      type: String,
      value: ""
    },
    howmany:{
      type: Array,
      value: ['1'] 
    },
    postnumber:{
      type: Number,
      value: 3
    },
    name: {
      type: String,
      value: "名称"
    },
    pic_src: {
      type: String,
      value: ""
    },
    time: {
      type: String,
      value: ""
    }, 
    upNum: {
      type: Number,
      value: 20
    },
    commentNum: {
      type: Number,
      value: 0
    },
    collectNum: {
      type: Number,
      value: 0
    },
    index:{
      type:Number,
      value:0
    },
    isreward: {
      type: Boolean,
      value: false
    },
    howlong: {
      type: String,
      value: "11:24"
    },
    url:{
      type:String,
      value:"/pages/other_group/commentDetail_page/commentDetail_page"
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
 /*点击收藏图标事件 */
  oncollectEvent:function(event){
    
  }
})
