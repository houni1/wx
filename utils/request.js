const app = getApp();
const requestHeader = {
	"Accept": "application/json; version=1.0.0",
	"X-Emao-TCM-WeChat": "1"
};

let requestBody = function (url, data, method) {
	wx.showLoading({
		title: '加载中',
	});

	return new Promise((reslove, reject) => {
		wx.request({
			method: method,
			url: app.globalData.apiUrl + url,
			data: data,
			header: requestHeader,
			fail (err) {
				console.log('请求失败');
			},
      complete (res) {
				let data = res.data;
				if (/^[3-5]\d{2}$/.test(data.code)){
          let msg = data.msg || "好像失败了哦！";
          wx.showToast({
						title: msg,
            icon: 'loading',
						duration: 3000
					})
          reject(msg)
				}else{
					reslove(data.data || data);
				}
        wx.hideLoading()
      }
		})
	})
}

let $get = function (url, data = {}) {
	return requestBody(url, data, "GET");
};

let $post = function (url, data = {}) {
	return requestBody(url, data, "POST");
};

export {$get, $post};