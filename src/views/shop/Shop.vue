<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe600;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe741;</span>
        <input
          class="search__content__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <shop-info :item="item" :borderHide="true" v-show="item.imgUrl"></shop-info>
    <content :shopName="item.name"></content>
    <cart></cart>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo.vue";
import Content from './Content.vue'
import Cart from './Cart.vue'
const useShopDataEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });
  const getShopData = async () => {
    console.log(route.params.id);
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };
  const { item } = toRefs(data);
  return {
    item,
    getShopData,
  };
};
const useRouterBackEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return { handleBackClick };
};
export default {
  name: "Shop",
  components: { ShopInfo,Content,Cart},
  setup() {
    const { item, getShopData } = useShopDataEffect();
    const { handleBackClick } = useRouterBackEffect();
    getShopData();
    return { item, handleBackClick };
  },
};
</script>
 
 <style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  padding: 0 0.18rem;
}
.search {
  margin: 0.14rem 0 0.04rem 0;
  display: flex;
  line-height: 0.32rem;
  &__back {
    width: 0.3rem;
    height: 0.32rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    flex: 1;
    border-radius: 0.16rem;
    background-color: $search-bgColor;
    display: flex;
    &__icon {
      width: 0.44rem;
      text-align: center;
      font-size: 0.18rem;
      color: $search-fontColor;
    }
    &__input {
      display: block;
      flex: 1;
      height: 0.32rem;
      border: none;
      outline: none;
      background: none;
      padding-right: 0.2rem;
      color: $content-fontcolor;
      font-size: 0.14rem;
    }
  }
}
</style>