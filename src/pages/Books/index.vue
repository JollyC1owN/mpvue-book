<template>
  <div class="BooksContainer">
    <div class="books_header">
      <swiper indicator-dots>
        <swiper-item>
          <img src="/static/imgs/firstView/1.jpg" alt="">
        </swiper-item>
         <swiper-item>
          <img src="/static/imgs/firstView/2.jpg" alt="">
        </swiper-item>
         <swiper-item>
          <img src="/static/imgs/firstView/3.jpg" alt="">
        </swiper-item>
         <swiper-item>
          <img src="/static/imgs/firstView/nvsheng.jpg" alt="">
        </swiper-item>
      </swiper>
    </div>
    <div class="books_containers_list">
      <div class="books_content">
        <span>全部商品</span>
        <span class="right" @click="toBookList(books)">></span>
      </div>
      <ul class="books_list">
        <li v-for="(book,index) in books" :key="index">
          <img :src="book.image" alt="">
          <p>《{{book.title}}》</p>
          <p>{{book.author}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import datas from './datas/data.json'
export default {
  data () {
    return {
      books:[] // 默认是一个空数组
    }
  },
  mounted () {
    this.books=datas
  },
  methods: {
    // 去图书列表
    toBookList(books){
      wx.navigateTo({
        url: '/pages/BookList/main?books='+JSON.stringify(this.books)
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.BooksContainer
  .books_header
    swiper 
      width 100%
      height 400rpx
      img 
        width 100%
  .books_containers_list
    width 100%
    height 100%
    .books_content
      padding 10rpx
      span
        font-size 40rpx
      .right
        float right
        color #02a774
    .books_list
      display flex
      flex-wrap wrap
      li
        width 50%
        border-bottom 1rpx solid #ccc
        box-sizing border-box
        text-align center
        &:nth-child(2n+1)
          border-right 1rpx solid #ccc
        img
          width 170rpx
          height 170rpx
          margin 10rpx auto
        p
          font-size 28rpx
          margin 10rpx auto



 
</style>