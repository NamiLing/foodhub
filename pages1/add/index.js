import util from '../../utils/util.js'
var istoday = true;

Page({
	data: {
		isSelected: 'normal', // normal对应绿色鼓励
    // Object day
	},

	onLoad() {
		let time = util.getToday()
		let d = util.getDay()
		let week = util.getWeek()
		let month = util.getMonth()
		let comment = util.getDefaultComment()

    let _day = {}; // to be implemented
    let days = wx.getStorageSync('days')//这是一个数组
    if (days && days.length != 0) {
      // 最近一个记录不是今天
      if (days[days.length - 1].time != time){
        istoday = false;
        _day.time = time;
        _day.day = d;
        _day.week = week;
        _day.month = month;
        _day.comment = comment;
        _day.post = [];
      }else{
        _day = days[days.length - 1];
      }
    } else {
      // 之前没有任何记录
      days = [];
      _day.time = time;
      _day.day = d;
      _day.week = week;
      _day.month = month;
      _day.comment = comment;
      _day.post = [];
    }
    
    // 判断是不是今天 Todo
    

		this.setData({
			'day.time': _day.time,
      'day.day': _day.day,
      'day.week': _day.week,
      'day.month': _day.month,
      'day.comment': _day.comment,
			'day.post': _day.post || [],
			'week': wx.getStorageSync('week') ? JSON.parse(wx.getStorageSync('week')) : [],
      'days':days
		})
		
	},

	selectHandle(e) {
		let state = e.currentTarget.id 
		this.setData({
			isSelected: state
		})
	},

  // 保存按钮监听
	formSubmit(e) {
		let state = this.data.isSelected
		let content = e.detail.value.content

    //存到读出的data.days变量里。
    //同时也到了data.day变量。因为day也是一个引用，原身就在days里
    var days = this.data.days;
    if (days.length == 0) {
      days.push(this.data.day)
    }

    if(istoday == true){
    days[days.length - 1].post.push({
      state: state, // 达标状态
      content: content, // 这是内容
      complete: false
    });}
    else{
      this.data.day.post.push({
        state: state,
        content: content,
        complete: false
      })
      days.push(this.data.day)
    }

    //存到cache的days里面
    wx.setStorageSync('days', days);

		wx.showToast({
			icon: 'success',
			title: '添加成功',
			success(res){
				console.log(res)
			}
		})
	}

})