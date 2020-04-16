// components/segment.js
Component({
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    items:{
      type:Array,
      value: []
    },
    defaultIndex:{
      type: Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },
  // 用currentIndex（组件里的变量）代替defaultIndex
  // 在这个组建里面只用更改currentIndex，语意跟完整
  lifetimes:{
    attached:function(){
      var that = this;
      this.setData({
        currentIndex: that.properties.defaultIndex
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onvideoEvent: function(event){
      var index = event.target.dataset.index;
      this.setData({
        currentIndex: index
      })
      //当点击切换页面时的事件
      var detail = {"index":index};
      var options = {};
      this.triggerEvent("itemchanged",detail,options);
    }
  }
})
