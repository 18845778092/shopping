<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          category__item: true,
          'category__item--active': currentTab === item.tab,
        }"
        v-for="(item, index) in categories"
        :key="index"
        @click="() => handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item of list" :key="item._id">
        <img :src="item.imgUrl" alt="" class="product__item__img" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售{{ item.sales }}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="() => {changeCartItem(shopId, item._id, item, -1, shopName)}">&#xe66d;</span>
            <span class="count">{{getProductCartCount(shopId,item._id)}}</span>
            <span
            class="product__number__add iconfont"
            @click="() => {changeCartItem(shopId, item._id, item, 1, shopName);}">&#xe781;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { get } from "../../utils/request";
import { reactive, toRefs, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useCommonEffect } from "../../effects/cartEffects";
const categories = [
  { name: "全部商品", tab: "all" },
  { name: "秒杀", tab: "seckill" },
  { name: "新鲜水果", tab: "fruit" },
];
//和tab切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);
  const handleTabClick = (tab) => {
    currentTab.value = tab;
  };
  return {
    currentTab,
    handleTabClick,
  };
};
//和当前列表有关的函数
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] });
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value,
    });
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data;
    }
  };
  watchEffect(() => {
    getContentData();
  });
  const { list } = toRefs(content);
  return { list };
};
const useCartEffect = () => {
  const store = useStore();
  const { changeCartItemToCart, cartList } = useCommonEffect();
  const changeShopName = (shopId, shopName) => {
    store.commit("changeShopName", { shopId, shopName });
  };
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemToCart(shopId, productId, item, num);
    changeShopName(shopId, shopName);
  };
  const getProductCartCount=(shopId,productId)=>{
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
          
  }
  return {
    cartList,
    changeCartItem,
    getProductCartCount
  };
};
export default {
  props: ["shopName"],
  name: "Content",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { currentTab, handleTabClick } = useTabEffect();
    const { list } = useCurrentListEffect(currentTab, shopId);
    const { cartList, changeCartItem,getProductCartCount } = useCartEffect();
    return {
      list,
      categories,
      currentTab,
      handleTabClick,
      shopId,
      cartList,
      changeCartItem,
      getProductCartCount
    };
  },
};
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  top: 1.5rem;
  right: 0;
  bottom: 0.5rem;
}
.category {
  width: 0.76rem;
  background: $search-bgColor;
  height: 100%;
  overflow-y: scroll;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &--active {
      background: #fff;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
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
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__title {
      line-height: 0.2rem;
      color: $content-fontcolor;
      font-size: 0.14rem;
      margin: 0;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0;
      color: $content-fontcolor;
      line-height: 0.16rem;
      font-size: 0.12rem;
    }
    &__price {
      line-height: 0.2rem;
      margin: 0;
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
  }
}
.count{
  position: relative;
  top: -10%;
}
</style>