<template>
  <div class="detailContainer">
    <p class="book_name">{{book.title}}</p>
    <img :src="book.image" alt />
    <div class="book_info">
      <span>{{book.author}}</span>
      <span>{{book.publisher}}</span>
      <span>{{book.pubdate}}</span>
      <span>{{book.price}}</span>
    </div>
    <button>收藏</button>
    <article class="book_">
      <h1>作者简介</h1>
      <section>{{book.author_intro}}</section>
    </article>
    <article class="book_">
      <h1>书籍简介</h1>
      <section>{{book.summary}}</section>
    </article>
  </div>
</template>
<script>
export default {
 
 data () {
   return {
     book:{}
   }
 },
 mounted () {
   if(this.$mp){
     this.book=JSON.parse(this.$mp.query.book)
   }
 }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.detailContainer
  display flex
  flex-direction column
  .book_name
    font-size 40rpx
    font-weight 700
    text-align center
    line-height 80rpx
  img
    width 70%
    height 700rpx
    margin 20rpx auto
  .book_info
    display flex
    flex-direction column
    font-size 32rpx
    width 100%
    padding-left 15%
  button
    width 300rpx
    height 60rpx
    font-size 32rpx
    line-height 60rpx
    margin 20rpx auto
  article
    width 100%
    padding 10%
    box-sizing border-box
    h1
      text-align center
      color #02a774
      font-weight 700
    section
      font-size 34rpx
      text-indent 34rpx
</style>