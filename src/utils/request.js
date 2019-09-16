
// 调用方法,返回Promise对象
// 引入config
import config from './config.js'
function request (url, data = {}, method = 'GET') {
  // http://localhost:4000/searchBooks
  console.log(url)
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      success: (res) => {
        resolve(res.data)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}
export default request
