<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>goodsList</nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortBy" >Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilter">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}" >
            <dl class="filter-price">
              <dt >Price:</dt>
              <dd ><a href="javascript:void(0)" @click="priceCheck ='all'" :class="{'cur': priceCheck === 'all'}">All</a></dd>
            <dd v-for="(item, index) in priceFilter" @click="closePop">
                <a href="javascript:void(0) " @click="setPriceFilter(index)" :class="{'cur': priceCheck === index}">{{item.startPrice +'-' +item.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(good, index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+good.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{good.productName}}</div>
                    <div class="price">{{good.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(good.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
               加载中 ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>

  </div>
</template>
<script>
import "../assets/css/base.css"
import "../assets/css/product.css"
import NavHeader from '../components/header.vue'
import NavBread from '../components/bread.vue'
import NavFooter from '../components/footer.vue'
import axios from 'axios'
export default {
  name: 'GoodsList',
  components: {NavHeader, NavFooter, NavBread},
  data () {
    return {
      goodsList: [ ],
      priceCheck: 'all',
      priceFilter: [
        {
          startPrice: 0,
          endPrice: 100
        },
        {
          startPrice: 100,
          endPrice: 500
        },
        {
          startPrice: 500,
          endPrice: 1000
        },
        {
          startPrice: 1000,
          endPrice: 2000
        }
      ],
      filterBy: false,
      sortFlage: true,
      page: 1,
      pageSize: 8,
      busy: true
    }
  },
  methods: {
    getGoodsList (flag) {
      const param = { // 在点击排序时要重新请求数据，我们要向服务器反馈是第几页需要排序
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlage ? 1 : -1, // 当sortFlage为true时sort=1，位false时sort=-1
        priceLevel: this.priceCheck // 在筛选价格区间的时候把选中的一项传到服务器
      }
      axios.get('/api/goods', {
        params: param
      }).then(
        (response) => {
          /* console.log(res.data.result.list) */
          let res = response.data
          if (res.status === '0') {
            if (flag) { // flag表示要不要连接，如果开启插件的话要用concat把每一页连接起来,分页的时候是每一页累加的，用concat
              this.goodsList = this.goodsList.concat(res.result.list)
              if (res.result.count === 0) {
                this.busy = true // busy为true时表示禁用滚动插件
              } else {
                this.busy = false // 当conut不为0时开启
              }
            } else {
              this.goodsList = res.result.list
              this.busy = false // 在
            }
          } else {
            this.goodsList = []
          }
        }).catch(
        (err) => {
          console.log(err)
        }
      )
    },
    showFilter () {
      this.filterBy = true
    },
    closePop () {
      this.filterBy = false
    },
    // 点击排序
    sortBy () {
      this.sortFlage = !this.sortFlage
      this.page = 1
      this.getGoodsList() // 当点击一次排序就重新获取一下数据
    },
    setPriceFilter (index) {
      this.priceCheck = index
      this.page = 1 // 从第一页开始
      this.getGoodsList()
    },
    addCart (productId) {
      axios.post('/api/goods/addCart', {
        productId: productId
      }).then(
        (res) => {
          if (res.status === 200) {
            console.log('成功了')
          } else {
            console.log('请检查')
          }
        }
      ).catch(
        (err) => {
          console.log(err)
        }
      )
    },
    loadMore () {
      this.busy = true;
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      }, 1000);
    }
  },
  mounted () {
    // 设置全局拦截
    /* axios.interceptors.request.use(function (config) {
     console.log('request init') // 请求前的拦截，这步执行后才会发出请求
     return config
     })
     axios.interceptors.response.use(function (response) {
     console.log('response init') // 响应时的拦截,这一步执行之后才会接受到响应的数据
     return response
     }) */
    this.getGoodsList()
  }
}
</script>
