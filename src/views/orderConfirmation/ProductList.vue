<template>
  <div class="products">
    <!-- 沃尔玛标题 -->
    <div class="products__title">{{ shopName }}</div>
    <!-- 全部item的list -->
    <div class="products__list">
        <div class="products__item" v-for="item in productList" :key="item._id">
          <img :src="item.imgUrl" alt="" class="products__item__img" />
          <div class="products__item__detail">
            <h4 class="products__item__title">{{ item.name }}</h4>
            <p class="products__item__price">
              <span class="products__item__single">
                <span class="products__item__yen">&yen;</span
                >{{ item.price }}*{{ item.count }}
              </span>
              <span class="products__item__total">
                <span class="products__item__yen">&yen;</span
                >{{ (item.price * item.count).toFixed(2) }}
              </span>
            </p>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { useCommonEffect } from "../../effects/cartEffects";
import { useRoute } from "vue-router";
export default {
  name: "ProductList",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { productList, shopName } = useCommonEffect(shopId);
    return {
      productList,
      shopName,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.products {
  margin: 0.16rem 0.18rem 0.1rem 0.18rem;
  background: #fff;
  &__title {
    line-height: 0.22rem;
    padding: 0.16rem 0 0 0.16rem;
    font-size: 0.16rem;
    color: #333;
    font-weight: bold;
  }
  &__list {
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.16rem;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail {
      flex: 1;
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
      display: flex;
    }
    &__single {
    }
    &__total {
      flex: 1;
      text-align: right;
      color: #000;
    }
    &__yen {
      font-size: 0.12rem;
    }
  }
}
</style>