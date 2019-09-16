<template>
  <div class="FirstViewCOntainer">
    <swiper :indicator-dots="current!==3" @change="changeIndex">
      <swiper-item>
        <img src="/static/imgs/firstView/1.jpg" alt />
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/2.jpg" alt />
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/3.jpg" alt />
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/nvsheng.jpg" alt />
      </swiper-item>
    </swiper>
    <button v-show="current===3" @click="toBooks">开启体验</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 0 // 索引默认是0
    };
  },
  methods: {
    // 索引改变
    changeIndex(event) {
      const current = event.mp.detail.current;
      this.current=current
    },
    // 区书籍列表
    toBooks(){
      wx.switchTab({
        url: '/pages/Books/main'
      })
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.FirstViewCOntainer
  width 100%
  height 100%
  swiper
    width 100%
    height 100%
    img
      width 100%
      height 100%
  button 
    width 280rpx
    height 80rpx
    border 1rpx solid #666
    background rgba(0,0,0,.5)
    color #eee
    font-size 40rpx
    line-height 80rpx
    text-align center
    position absolute
    left 50%
    margin-left -140rpx
    bottom 30rpx

</style>