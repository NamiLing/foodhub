import util from '../../utils/util.js'

Page({
	data: {
	},

	onLoad() {
	},

	onShow() {
    let cache_days = wx.getStorageSync('days')
    this.setData({
      days: cache_days.reverse(), //倒序显示
      hour: new Date().getHours(),
      day: cache_days ? cache_days[0] : {} //因为days是倒序的，所以0最近
    })

    this.data.day.comment = util.getDefaultComment()
	}

})