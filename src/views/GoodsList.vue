<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>goodsList</nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" >Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilter">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}" >
            <dl class="filter-price">
              <dt >Price:</dt>
              <dd ><a href="javascript:void(0)" @click="priceCheck ='all'" :class="{'cur': priceCheck === 'all'}">All</a></dd>
            <dd v-for="(item, index) in priceFilter" @click="closePop">
                <a href="javascript:void(0) " @click="priceCheck = index" :class="{'cur': priceCheck === index}">{{item.startPrice +'-' +item.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(goods, index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+goods.productImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{goods.productName}}</div>
                    <div class="price">{{goods.productPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
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
  components: {NavHeader, NavFooter, NavBread},
  data () {
    return {
      msg: '',
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
      filterBy: false
    }
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      axios.get('/api/result').then(
        (res) => {
          this.goodsList = res.data
        }).catch(
        (err) => {
          console.log('err init'+err)
        }
      )
    },
    showFilter () {
      this.filterBy = true
    },
    closePop () {
      this.filterBy = false
    }
  }
}
</script>
