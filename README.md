## mpvue-小程序项目

### 下载mpvue 删除多余内容

```shell
1.下载安装mpvue
vue init mpvue/mpvue-quickstart my-project
2.切换路径
cd my-project
3.下载依赖
npm install
4.启动项目
npm run dev
5.通过小程序开发软件导入项目:直接导入当前的整个文件夹即可,小程序会自己加载自己需要的
6.使用vscode看下载后的源码,通过小程序软件,直接打开当前的mpvue项目(一定要先把项目跑起来--npm run dev,生成dist目录,这个目录是小程序需要的)
```

### mpvue源码说明

#### src目录说明

```javascript
main.js---相当于小程序的app.js
app.vue---相当于小程序的app.wxml和app.wxss
app.json--相当于小程序的app.json
通过命令: npm start 启动后,自动生成dist目录,小程序中需要的东西都在里面
```

#### main.js文件说明

```javascript
// main.js中
import Vue from 'vue'
import App from './app.vue'
Vue.config.productionTip=false // 干掉提示消息---可不写
App.mpType='app' // 小程序的类型是app---整个小程序的应用
const app = new Vue(App) //相当于 new Vue({})---渲染整个应用
app.$mount() // 挂载程序---相当于小程序中的App({})---小程序中app.js中的内容---挂载生效
```

#### pages目录中文件说明

```javascript
创建pages目录----相当于小程序中的pages目录,所有的界面都放在整个目录中
pages目录中每个界面都单独创建一个目录,如:
firstView目录:
index.vue-----就相当于小程序中的index.wxml和index.wxss
main.js-------就相当于小程序中的index.js---page({})
main.json-----就详单与小程序中的index.json---{"":""}
只要是main.js,里面的代码,如下:
import Vue from 'vue'
import index from './index.vue'
const app = new Vue(index)
app.$mount()
上面的代码就是生成当前的实例,然后调用挂载生效
```





### 搭建主界面-firstview

#### 主界面功能:显示轮播图及点击按钮跳转到books界面

1. 按钮的显示和隐藏完全取决于轮播图的索引值是不是3(也就是最后一个轮播图的索引)
2. :indicator-dots该属性用来展示小圆点,因为最后一个图显示的时候,按钮要展示出来,小圆点要隐藏,所以该属性是动态的值
3. @change="swiperHandle" 该事件是小程序中swiper的事件,由于在view中书写事件使用v-on方式,所以,需要把bind去掉,添加@符号
4. swiperHandle事件监听(方法)里面自带了event事件参数对象,里面可以获取mp对象,event.mp.detail.current可以获取轮播图的索引值
5. 按钮的显示和隐藏使用v-if指令,v-if="current===3"
6. 设置轮播图样式的时候一定要去app.vue中设置page样式

```html
<template>
  <div class="firstViewContainer">
    <swiper :indicator-dots="current!==3" @change="swiperHandle">
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
    <button v-if="current===3" class="goto_books" @click="tobooks">开始体验</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    // 点击按钮跳转到books界面
    tobooks() {
      wx.navigateTo({
        url: "/pages/books/main"
      });
    },
    // 小程序自带的方法,中的事件参数对象中可以获取轮播图的索引
    swiperHandle(event) {
      this.current = event.mp.detail.current;
      console.log(event);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.firstViewContainer
  width 100%
  height 100%
  swiper
    width 100%
    height 100%
    img
      width 100%
      height 100%
  .goto_books
    width 280rpx
    height 80rpx
    font-size 30rpx
    background rgba(255, 255, 255, 0.3)
    text-align center
    line-height 80rpx
    border-radius 20rpx
    position absolute
    bottom 20rpx
    left 50%
    margin-left -140rpx
</style>
```





### 搭建列表界面

#### 遍历数据显示列表

```html
<template>
  <div class="booksContainer">
    <swiper :indicator-dots="current!==3" @change="swiperHandle">
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
    <div class="books_list_container">
      <div class="books_header">
        <span>全部商品</span>
        <span @click="tobookList(bookList)" class="go_right">></span>
      </div>
      <ul class="books_list">
        <li v-for="(book,index) in bookList" :key="index">
          <img :src="book.image" alt />
          <p>《{{book.author}}》</p>
          <p>书名:{{book.title}}</p>
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
      bookList:[]
    }
  },
  mounted () {
   // 更新数据状态,从data.json文件中读取数据,返回的是数组 
    this.bookList=datas
  },
  methods: {
    // 点击 > 跳转到书籍列表页,需要传入参数:bookList--->所有的图书
    tobookList(bookList){
      wx.navigateTo({
        url: '/pages/bookList/main?books='+JSON.stringify(bookList)
      })
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.booksContainer
  swiper
    width 100%
    height 400rpx
    img
      width 100%
      height 100%
  .books_list_container
    .books_header
      span
        font-size 40rpx
        &.go_right
          float right
    .books_list
      display flex
      flex-wrap wrap
      li
        width 50%
        box-sizing border-box
        text-align center
        border-bottom 1rpx solid #eee
        &:nth-child(2n+1)
          border-right 1rpx solid #eee
        img
          width 200rpx
          height 200rpx
          margin 20rpx 0
        p
          font-size 28rpx
          line-height 46rpx
</style>
```



### 搭建详情界面

#### 点击某个列表选项显示对应详情页

```html
<template>
  <div class="bookListContainer">
    <ul>
      <li v-for="(book,index) in books" :key="index" @click="toDetail(book,index)">
        <img :src="book.image" alt />
        <div class="book_content">
          <p>{{book.title}}</p>
          <p>{{book.author}}</p>
          <p>{{book.publisher}}</p>
        </div>
        <p class="book_price">{{book.price}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["books"],
  data() {
    return {
      books: []
    };
  },
  mounted() {
    //界面加载后,传入的参数,在$mp对象中
    if (this.$mp) {
      this.books = JSON.parse(this.$mp.query.books);
    }
  },
  methods: {
    // 点击列表,传入书籍
    toDetail(book,index){
      wx.navigateTo({
        url: `/pages/detail/main?book=${JSON.stringify(book)}&&index=${index}`
      })
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.bookListContainer
  li
    display flex
    padding 10rpx
    border-bottom 1rpx solid #eee
    img
      width 140rpx
      height 140rpx
      margin-right 20rpx
    .book_content
      width 65%
      p
        font-size 32rpx
    .book_price
      font-size 40rpx
      font-weight 700
      color red
</style>
```

#### 单本书籍详情页

```html
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
  data() {
    return {
      book: {},
      index: 0
    };
  },
  mounted() {
    // 获取传入的参数
    if (this.$mp) {
      this.book = JSON.parse(this.$mp.query.book);
      this.index = this.$mp.query.index;
    }
  },
  methods: {}
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
```



### 搭建搜索界面

#### 输入搜索内容显示对应数据

```html
<template>
  <div class="searchContainer">
    <div class="search_header">
      <input
        class="search_input"
        placeholder-class="placeholder"
        type="text"
        placeholder="书中自有颜如玉"
        v-model="searchText"
        @confirm="confirmHandle"
      />

      <span class="clear" @click="searchText=''" v-show="isShow">X</span>
    </div>
    <div class="bookList" v-if="books.length">
      <p>共搜索到图书:{{books.length}}本</p>
      <BookList :books="books" />
    </div>
  </div>
</template>
<script>
import request from "../../utils/request";
import BookList from "../bookList/index.vue";
export default {
  components: {
    BookList
  },
  data() {
    return {
      books: [],
      searchText: "",
      isShow: false
    };
  },
  methods: {
    async confirmHandle(event) {
      // 获取文本框输入的值:event.mp.detail.value
      // this.searchText 也可以
      let searchText = this.searchText;
      // 发送请求,获取数据,并显示
      let result = await request("/searchBooks", { req: searchText });
      this.books = result;
    }
  },
  watch: {
    searchText() {
      this.isShow = this.searchText ? true : false;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.searchContainer
  .search_header
    border-bottom 1rpx solid #02a774
    width 80%
    margin 0 auto
    height 80rpx
    position relative
    .search_input
      height 100%
      .placeholder
        color #02a774
        text-align center
        font-size 28rpx
    .clear
      position absolute
      font-size 28rpx
      color #02a774
      right 28rpx
      top 20rpx
      z-index 99
</style>
```



#### 搭建服务器-koa

```shell
下载 koa及koa路由
npm install koa koa-router
npm install nodemon 热加载nodejs项目 下载后,直接使用 nodemo server.js 启动服务器,只要保存就有效果
```

```javascript
let Koa = require('koa')
let KoaRouter = require('koa-router')
// 生成app
const app = new Koa()
// 生成路由器
const router = new KoaRouter()
router.get('/', (ctx, next) => {
  console.log('接收成功')
  ctx.body = '测试中111'
})
let datas = require('./datas/data.json')
// http://localhost:3000/searchBooks?books=123 -------------测试数据接口
// 搜索书籍接口
router.get('/searchBooks', (ctx, next) => {
  // 1.接收传递的参数数据
  // let searchName = ctx.query.req
  // 2.处理请求数据,访问数据,调出数据
  // 2.1 给豆瓣发送请求,接收豆瓣返回的数据,把数据返回给前端
  // 3.返回处理的数据
  ctx.body = datas
})
app
  .use(router.routes()) // 声明使用路由器
  .use(router.allowedMethods()) // 声明使用路由器方法
app
  .listen('3000', () => {
    console.log('服务器启动成功')
    console.log('服务器地址:http://localhost:3000')
  })

```

#### 封装request

```javascript
在utils目录中创建两个文件:config.js和request.js
config.js中:export default{host:"http://localhost:3000"}
request.js中:
import config from './config'
function request (url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        resolve(res)
      },
      fail: function (error) {
        // fail
        reject(error)
      }
    })
  })
}
// 向外暴露该方法
export default request

```







#### fly：下载 fly 

​	1.一个支持所有JavaScript运行环境的基于Promise的、支持请求转发、强大的http请求库。可以让您在多个端上尽可能大限度的实现代码复用。
​	2.Fly 的定位是成为 Javascript http请求的终极解决方案。也就是说，在任何能够执行 Javascript 的环境，只要具有访问网络的能力，Fly都能运行在其上，提供统一的API。

```javascript
下载安装 fly
npm install flyio

node 环境下使用方式:
var Fly=require("flyio/src/node")
var fly=new Fly;

发送get请求方式:
//通过用户id获取信息,参数直接写在url中
fly.get('/user?id=133')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
发送post请求方式:
fly.post('/user', {
    name: 'Doris',
    age: 24
    phone:"18513222525"
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

#### fly后台中使用(server.js中)

```javascript
let Koa = require('koa')
let KoaRouter = require('koa-router')
// 生成app
const app = new Koa()
// 生成路由器
const router = new KoaRouter()

var Fly = require('flyio/src/node/index')
// new-parens
var fly = new Fly

router.get('/', (ctx, next) => {
  console.log('接收成功')

  ctx.body = '测试中111'
})
let datas = require('./datas/data.json')
// 搜索书籍接口
router.get('/searchBooks', (ctx, next) => {
  // 1.接收传递的参数数据
  let req = ctx.query.req
  console.log(req)
  // 2.处理请求数据,访问数据,调出数据
  // 2.1 给豆瓣发送请求,接收豆瓣返回的数据,把数据返回给前端
  // 3.返回处理的数据
  ctx.body = datas
})
// 获取openid的接口
router.get('/getOpenId', async (ctx, next) => {
  let code = ctx.query.code
  console.log(code)
  let appid = 'wx8dc92766a09575de'
  let appSecret = '4c756f1bbcecd183f9d61d68bc6673b3'
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`

  let result = await fly.get(url)
  // 通过用户id获取信息,参数直接写在url中
  // fly.get(url)
  //   .then(function (response) {
  //     console.log(response)
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   })
  ctx.body = JSON.parse(result.data).openid
})

app
  .use(router.routes()) // 声明使用路由器
  .use(router.allowedMethods()) // 声明使用路由器方法
app
  .listen('3000', () => {
    console.log('服务器启动成功')
    console.log('服务器地址:http://localhost:3000')
  })

```

#### app.vue中(发送请求获取openid)

```javascript
<script>
import request from "./utils/request";
export default {
  mounted() {
    wx.login({
      success: async res => {
        let code = res.code;
        let openid = await request("/getOpenId", { code: code });
        // 存储到缓存中
        wx.setStorage({
          key: 'openid',
          data: openid,
        })
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
```

#### app.json文件中

```javascript
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/books/main",
        "text": "图书列表",
        "iconPath": "/static/imgs/book.png",
        "selectedIconPath": "/static/imgs/book-active.png"
      },
      {
        "pagePath": "pages/searchBook/main",
        "text": "搜索图书",
        "iconPath": "/static/imgs/todo.png",
        "selectedIconPath": "/static/imgs/todo-active.png"
      },
      {
        "pagePath": "pages/personal/main",
        "text": "个人中心",
        "iconPath": "/static/imgs/me.png",
        "selectedIconPath": "/static/imgs/me-active.png"
      }
    ]
```



### 搭建个人中心界面

#### 获取用户的openid封装进服务器中

```html
<template>
  <div class="personalContainer">
    <div class="personal_header">
      <img :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/imgs/personal/personal.png'" alt />
      <button @getuserinfo="getuserinfoHandle" open-type="getUserInfo">{{userInfo.nickName?userInfo.nickName:'登录'}}</button>
    </div>
    <div class="card_list">
      <div class="card">
        <span>我的收藏</span>
        <span class="more">more ></span>
      </div>
      <div class="card">
        <span>扫码看书</span>
        <span class="more">more ></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    // 界面显示后,就获取用户信息,如果能获取到就显示
    wx.getUserInfo({
      success: (res)=> {
        if (res.userInfo) {   
          this.userInfo = res.userInfo;
          console.log(this.userInfo)
        }
      }
    });
  },
  methods: {
    // getuserinfo 事件可以获取用户信息
    getuserinfoHandle(res) {
      if (res.mp.detail.userInfo) {
        this.userInfo = res.mp.detail.userInfo;
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.personalContainer
  display flex
  flex-direction column
  .personal_header
    width 100%
    background-color #02a774
    padding 40rpx
    img
      width 100rpx
      height 100rpx
      vertical-align middle
      border-radius 50rpx
      margin 0 40rpx
    button
      display inline-block
      height 60rpx
      line-height 60rpx
      background rgba(0, 0, 0, 0.2)
      font-size 28rpx
      vertical-align middle
      color #fff
  .card_list
    .card
      width 90%
      margin 20rpx auto
      font-size 30rpx
      border 1rpx solid #eee
      padding 20rpx
      border-radius 10rpx
      .more
        float right
</style>
```



#### 微信支付



### 总结小程序

mpvue和wepy一样的





