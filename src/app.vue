<script>
// 引入request
import request from './utils/request'
export default {
  mounted() {
    // 用户已经登录了
    wx.login({
      success: async res => {
        // 用户的凭证
        let code=res.code
         console.log(code)
        let result= await request('/getOpenId',{
          code:code
        })
        console.log(result)
        wx.setStorage({
          key: 'openid',
          data: result,
        })
        // console.log(result)
        // 缓存
       
      }
    });
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
page
  width 100%
  height 100%
</style>