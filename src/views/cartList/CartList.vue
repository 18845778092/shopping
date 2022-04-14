<template>
  <!-- 最外层包裹 -->
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in List" :key="index">
        <div class="order__title">
          {{ item.shopName }}
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <img
              v-for="innerItem in item.productList"
              :key="innerItem._id"
              :src="innerItem.imgUrl"
              class="order__content__img"
            />
          </div>
          <div class="order__content__info">
            <div class="order__content__price">
              ￥{{ item.totalPrice.toFixed(2) }}
            </div>
            <div class="order__content__count">共{{ item.total }}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <docker :currentIndex="1"></docker>
</template>

<script>
import { computed } from "@vue/runtime-core";
import Docker from "../../components/Docker.vue";
import { useCommonEffect } from "../../effects/cartEffects";
export default {
  name: "CartList",
  components: { Docker },
  setup() {
    const { cartList } = useCommonEffect();
    let newList = {};
    //循环商店级
    // newList = cartList;
    // for (let shopId in newList) {
    //   let total = 0;
    //   let totalPrice = 0;
    //   const products = newList[shopId].productList; //一个商店里所有货物对象
    //   //循环商店里的货物级
    //   for (let i in products) {
    //     let everyproduct = products[i];
    //     total += everyproduct.count;
    //     totalPrice += everyproduct.count * everyproduct.price;
    //   }
    //   newList[shopId].total = total;
    //   newList[shopId].totalPrice = totalPrice;
    // }
    // console.log('newList--------',newList)
    

    //不能乱return对象，setup是要求
    const List = computed(() => {
      newList = cartList;
      for (let shopId in newList) {
        let total = 0;
        let totalPrice = 0;
        const products = newList[shopId].productList; //一个商店里所有货物对象
        //循环商店里的货物级
        for (let i in products) {
          let everyProduct = products[i];
          total += everyProduct.count;
          totalPrice += everyProduct.count * everyProduct.price;
        }
        newList[shopId].total = total;
        newList[shopId].totalPrice = totalPrice;
      }
      return newList;
    });
    return { List };
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