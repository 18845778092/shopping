<template>
  <!-- 最外层包裹 -->
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">{{
            item.isCanceled ? "已取消" : "已下单"
          }}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template
              v-for="(innerItem, innerIndex) in item.products"
              :key="innerIndex"
            >
              <img
                :src="innerItem.product.img"
                alt=""
                class="order__content__img"
                v-if="innerIndex <= 3"
              />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">￥{{ item.totalPrice }}</div>
            <div class="order__content__count">共{{ item.count }}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <docker :currentIndex="2"></docker>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import Docker from "../../components/Docker.vue";
import { get } from "../../utils/request";
//处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const getOrderList = async () => {
    const result = await get("/api/order");
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data;
      orderList.forEach((order) => {
        let totalPrice = 0;
        let count = 0;
        const products = order.products || [];
        products.forEach((productItem) => {
          count += productItem?.orderSales || 0;
          totalPrice += productItem?.product?.price * productItem?.orderSales || 0;
        });
        order.totalPrice = totalPrice;
        order.count = count;
      });
      data.list = result.data;
    }
  };
  getOrderList();
  const { list } = toRefs(data);
  return { list };
};
export default {
  components: { Docker },
  name: "OrderList",
  setup() {
    const { list } = useOrderListEffect();
    return { list };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0.5rem;
  right: 0;
  //   padding: 0 0.18rem 0.1rem 0.18rem;
  background: rgb(248, 248, 248);
}
.title {
  background: #fff;
  height: 0.44rem;
  line-height: 0.44rem;
  font-style: 0.16rem;
  color: #333;
  text-align: center;
}
.orders {
}
.order {
  padding: 0.16rem;
  margin: 0.16rem 0.18rem;
  background: #fff;
  border-radius: 0.04rem;
  &__title {
    font-size: 0.16rem;
    color: #333;
    margin-bottom: 0.16rem;
  }
  &__status {
    float: right;
    font-size: 0.14rem;
    color: #999;
    line-height: 0.22rem;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.12rem;
    }
    &__info {
      width: 0.7rem;
      text-align: right;
    }
    &__price {
      margin-bottom: 0.04rem;
      color: #e93b3b;
      font-size: 0.14rem;
    }
    &__count {
      font-size: 0.12rem;
      color: #333333;
    }
  }
}
</style>