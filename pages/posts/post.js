var postsData = require('../../data/posts-data.js')
var app = getApp(); // 获取搜索传回来的参数

Page({
  data: {
  },

  onLoad: function(options) {
  },

  onShow() {
    if (app.searchIndex) {
      // 从搜索页面跳转过来
      this.setData({
        postList: [postsData.postList[app.searchIndex]]
      })
      console.log('app.searchIndex:' + app.searchIndex)
      delete app.searchIndex;
      delete app.searchValue;
    }else{
      // 默认显示全部
      this.setData({
        postList: postsData.postList
      });
    }
  },

  // 搜索入口  
  wxSearchTab: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log("on post id is" + postId);
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

})