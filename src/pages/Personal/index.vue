<template>
  <div class="personContainer">
      <div class="person_header">
        <img :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/imgs/personal/personal.png'" alt="">
        <button @getuserinfo="getUser" open-type="getUserInfo">{{userInfo.nickName?userInfo.nickName:'登录'}}</button>
      </div>
      <div class="person_cards">
        <div class="card">
          <span>我的收藏</span>
          <span class="right">more></span>
        </div>
         <div class="card">
          <span>扫码看书</span>
          <span class="right">more></span>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo:{} // 用户信息
    }
  },
  mounted () {
    // 页面加载获取用户信息
    wx.getUserInfo({
      success: (res)=>{
        this.userInfo=res.userInfo
      }
    })
  },
  methods: {
    // 点击按钮获取用户信息
    getUser(res){
      // 判断
      if(res.mp){
        this.userInfo=res.mp.detail.userInfo
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.personContainer
  display flex
  flex-direction column
  .person_header
    width 100%
    padding 20rpx
    background-color #02a774
    display flex
    align-items center
    img
      width 100rpx
      height 100rpx
      vertical-align middel
      border-radius 50rpx
    button
      height 60rpx
      font-size 28rpx
      text-align center
      line-height 60rpx
      margin-left 20rpx
      vertical-align middel
      display inline-block
      background rgba(255,255,255,.3)
  .person_cards
    width 90%
    margin 0 auto
    .card
      margin 10rpx
      border 1px solid #eee
      span 
        font-size 30rpx
        height 80rpx
        line-height 80rpx
        padding 0 10rpx
        &.right
          float right
        


</style>