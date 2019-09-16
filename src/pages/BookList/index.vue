<template>
  <div class="booksListContainer">
    <ul>
      <li v-for="(book,index) in books" :key="index" @click="toDetail(book)">
        <img :src="book.image" alt="">
        <div class="book_content">
          <p>《{{book.title}}》</p>
          <p>{{book.author}}</p>
          <p>机械工厂</p>
        </div>
        <p class="price">{{book.price}}元</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:['books'],
  data () {
    return {
      books:[]  
    }
  },
  mounted () {
    if(this.$mp){
      
      this.books=JSON.parse(this.$mp.query.books)
    }
  },
  methods: {
    // 去详情页
    toDetail(book){
      wx.navigateTo({
        url: '/pages/Detail/main?book='+JSON.stringify(book)
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.booksListContainer
  li
    padding 10rpx
    display flex
    border-bottom 1rpx solid #ccc
    img
      width 140rpx
      height 140rpx
      margin-right 10rpx
    .book_content
      width 65%
      p
        font-size 30rpx
    .price
      font-size 32rpx
      color red
      font-weight 700
</style>