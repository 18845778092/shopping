<template>
    <div class="mask" v-if="showCart && calculations.total>0" @click="handleChangeMask"></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total>0">
      <div class="product__header">
        <div class="product__header__all">
            <span class="iconfont product__header__icon" v-html="calculations.allChecked?'&#xe63b;':'&#xe731;'"
            @click="()=>setCartItemsCheck(shopId)"
            ></span>全选</div>
        <div class="product__header__clear" ><span class="product__header__clear__btn" @click="()=>cleanCartProducts(shopId)">清空购物车</span></div>
      </div>
        <div  class="product__item" v-for="item of productList" :key="item._id">
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? '&#xe63b;' : '&#xe731;'"
            @click="() => changeCheck(shopId, item._id)"
          ></div>
          <img :src="item.imgUrl" alt="" class="product__item__img" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin"
                >&yen;{{ item.oldPrice }}</span
              >
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus iconfont"
              @click="() => {changeCartItemToCart(shopId, item._id, item, -1);}">&#xe66d;</span>
               <span class="count">{{ item.count || 0 }}</span><span class="product__number__add iconfont"
              @click="() => { changeCartItemToCart(shopId, item._id, item, 1) }" >&#xe781;</span
            >
          </div>
        </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
          class="check__icon__img"
          @click="handleChangeshowCart"
        />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <div class="check__btn" v-show="calculations.total>0">
          <router-link :to="{path:`/orderConfirmation/${shopId}`}">
          去结算
          </router-link>
          </div>
    </div>
  </div>
</template>


<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useCommonEffect } from "../../effects/cartEffects";
//购物车数据联动
const useCartEffect = (shopId) => {
  const { changeCartItemToCart,productList,calculations} = useCommonEffect(shopId);
  const store = useStore();
 
  const changeCheck = (shopId, productId) => {
    store.commit("changeCheckMutations", { shopId, productId });
  }
  const cleanCartProducts=(shopId)=>{
      store.commit("cleanCartProducts", { shopId });
  }
  const setCartItemsCheck=(shopId)=>{
      store.commit("setCartItemsCheck", { shopId });
  }
 
  return { calculations, productList, changeCartItemToCart, changeCheck,cleanCartProducts,setCartItemsCheck};
};
//展示隐藏购物车逻辑，蒙层
const toggleCartEffect=()=>{
    let showCart=ref(false);
    const handleChangeshowCart=()=>{
    showCart.value=!showCart.value
  }
    const handleChangeMask =()=>{
        showCart.value=!showCart.value
    }
    return{
        handleChangeshowCart,handleChangeMask,showCart
    }
}
export default {
  name: "Cart",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const {handleChangeshowCart,handleChangeMask ,showCart}=toggleCartEffect()
    const { calculations, productList, changeCartItemToCart, changeCheck ,cleanCartProducts,setCartItemsCheck} = useCartEffect(shopId);
    return {
      calculations,
      productList,
      shopId,
      changeCartItemToCart,
      changeCheck,
      cleanCartProducts,
      setCartItemsCheck,
      showCart,handleChangeshowCart,handleChangeMask
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.cart {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
}
.check {
  height: 0.5rem;
  box-sizing: border-box;
  border-top: 0.01rem solid $content-bgColor;
  display: flex;
  line-height: 0.5rem;
  &__icon {
    width: 0.84rem;
    position: relative;
    &__img {
      width: 0.28rem;
      height: 0.26rem;
      display: block;
      margin: 0.12rem auto;
    }
    &__tag {
      position: absolute;
      left: 0.46rem;
      top: 0.04rem;
      min-width: 0.2rem;
      padding: 0 0.04rem;
      line-height: 0.2rem;
      height: 0.2rem;
      background-color: #e93b3b;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: #fff;
      transform: scale(0.6);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: #333;
    font-size: 0.12rem;
    &__price {
      color: #e93b3b;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background: #4fb0f9;
    font-size: 0.14rem;
    text-align: center;
    a{
        text-decoration: none;
        color: #fff;
    }
  }
}
.product {
  background: #fff;
  flex: 1;
  overflow-y: scroll;
  &__header {
    display: flex;
    height: 0.52rem;
    line-height: 0.52rem;
    border-bottom: .01rem solid #f1f1f1;
    &__icon{
            vertical-align: top;
         color: #0091FF;
         font-size: .192rem;
         margin-right: .084rem;
    }
    &__all {
        font-size: .14rem;
        color: #333;
        width: .64rem;
        margin-left: .18rem;
    }
    &__clear {
      flex: 1;
      text-align: right;
      margin-right: .16rem;
      font-size: .14rem;
      color: #333;
      &__btn{
          display: inline-block;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      line-height: 0.2rem;
      color: $content-fontcolor;
      font-size: 0.14rem;
      margin: 0;
      @include ellipsis;
    }
    &__price {
      line-height: 0.2rem;
      margin: 0.06rem 0 0 0;
      font-size: 0.14rem;
      color: #e93b3b;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: #999;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      line-height: .2rem;
      font-size: .16rem;
      height: .2rem;
      &__minus {
        font-size: 0.2rem;
        color: #666;
        margin-right: 0.1rem;
      }
      &__add {
        font-size: 0.2rem;
        color: #0091ff;
        margin-left: 0.1rem;
      }
    }
    &__checked {
      color: #0091ff;
      font-size: 0.2rem;
      line-height: 0.5rem;
      margin-right: 0.2rem;
    }
  }
}
.mask{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1;
}
.count{
  position: relative;
  top: -10%;
}
</style>