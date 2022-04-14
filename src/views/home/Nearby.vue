<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link 
    v-for="item of NearbyList" 
    :key="item._id"
    :to="`/shop/${item._id}`" 
    >
    <shop-info  :item="item"></shop-info>
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { get } from "../../utils/request.js";
import ShopInfo from "../../components/ShopInfo.vue";
const useNearbyListEffect = () => {
  const NearbyList = ref([]);
  const getNearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    if (result?.errno === 0 && result?.data?.length) {
      NearbyList.value = result.data;
    }
  };
  return {
    getNearbyList,
    NearbyList,
  };
};
export default {
  components: { ShopInfo },
  name: "Nearby",
  setup() {
    const { getNearbyList, NearbyList } = useNearbyListEffect();
    getNearbyList();
    return {
      NearbyList,
      getNearbyList,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  a{
    text-decoration: none;
  }
}
</style>