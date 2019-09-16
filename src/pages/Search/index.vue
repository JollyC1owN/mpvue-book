<template>
  <div class="searchContainer">
    <div class="search_header">
      <input class="search_input" type="text" placeholder="书中自有颜如玉" placeholder-class="placeholder" v-model="searchText" @confirm="searchHandle" />
      <span class="clear" v-show="isShow" @click="searchText=''">X</span>
    </div>
    <div class="booke_list" v-if="books.length>0">
      <p>一共搜索到了{{books.length}}本书籍</p>
      <BookList :books="books" />
    </div>
  </div>
</template>
<script>
// 引入request
import request from '../../utils/request.js'
// 引入booklist
import BookList from '../BookList/index'
export default {
  // 注册组件
  components: {
      BookList
  },
  data () {
    return {
      searchText:'' , //清空文本框
      isShow:false, // 是否显示X
      books:[] // 存储书籍数据的数组
    }
  },
  methods: {
    // 搜索操作
    async searchHandle(){
      // 获取搜索内容
      let searchText=this.searchText
      if(searchText.length>0){
        // 发送请求,更新books数据
        // const books= await reqBooks()
        // this.books=books
      
       
        const result=await request('/searchBooks',{req:searchText})
        // console.log(result)
        // 更新数据
        this.books=result
      

        // wx.request({
        //   url: '/searchbooks',
        //   data: {req:searchText},
        //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //   // header: {}, // 设置请求的 header
        //   success: function(res){
        //     // success
        //     console.log(res.data)
        //   }
       
        // })
      }
    }
  },
  watch: {
    searchText(){
      this.isShow=this.searchText?true:false
      this.books=[] // 清空数据
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.searchContainer
  .search_header
    width 80%
    height 80rpx
    margin 10rpx auto
    border-bottom 1rpx solid #02a774
    position relative
    .search_input
      height 100%
      .placeholder
        color #02a774
        font-size 32rpx
        text-align center
    .clear
      position absolute
      right 20rpx
      top 20rpx
      z-index 99
</style>