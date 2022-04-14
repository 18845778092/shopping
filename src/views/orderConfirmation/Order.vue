<template>
  <div class="order">
    <div class="order__price">
      实付金额<b>￥{{ calculations.price }}</b>
    </div>
    <div class="order__btn" @click="() => handleSubmitClick(true)">
      提交订单
    </div>
  </div>
  <div class="mask" v-if="showConfirm" @click="() => handleSubmitClick(false)">
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认离开收银台吗?</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="
            () => {
              handleConfirmOrder(false);
            }
          "
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="
            () => {
              handleConfirmOrder(true);
            }
          "
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useCommonEffect } from "../../effects/cartEffects";
import { post } from "../../utils/request";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
const useMakeOrderEffect = (shopId,shopName, productList,showConfirm) => {
  const router = useRouter();
  const store = useStore();
  //确认下单 取消订单
  const handleConfirmOrder = async (isCanceled) => {
    const products = [];
    for (let i in productList.value) {
      const product = productList.value[i];
      products.push({
        id: product._id,
        count: product.count,
      });
    }
    // const products=productList.value.map({
    //   id:item._id,
    //   nums:item.count
    // })
    try {
      const result = await post("/api/order", {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products,
      });
      if (result?.errno === 0) {
        if (isCanceled) {
          //下单后清空订单
          store.commit("orderConfirm", { shopId });
          router.push({ name: "OrderList" });
        } else {
          showConfirm.value = false;
        }
      } else {
        // showToastMessage("登录失败");
      }
    } catch (e) {
      //提示下单失败
      // showToastMessage("请求失败");
    }
  };
  return { handleConfirmOrder };
}
//提交订单蒙层展示
const useShowMaskEffect=(showConfirm)=>{
 const handleSubmitClick = (status) => {
      showConfirm.value = status;
    }
    return {handleSubmitClick}
}
export default {
  name: "Order",
  setup() {
    const route = useRoute();
    const shopId = parseInt(route.params.id, 10);
    const showConfirm = ref(false);
    const { calculations, shopName, productList } = useCommonEffect(shopId);
    const { handleConfirmOrder } = useMakeOrderEffect(shopId,shopName, productList,showConfirm);
    const {handleSubmitClick}=useShowMaskEffect(showConfirm)


    return { calculations, handleConfirmOrder, showConfirm, handleSubmitClick };
  },
};
</script>

<style lang="scss" scoped>
.order {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  width: 100%;
  background: #fff;
  &__price {
    flex: 1;

    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: #333;
  }
  &__btn {
    width: 0.98rem;
    color: #fff;
    background: #4fb0f9;
    font-size: 0.14rem;
    text-align: center;
  }
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    width: 3.01rem;
    height: 1.57rem;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      line-height: 0.25rem;
      margin: 0.24rem 0 0.08rem 0;
      font-size: 0.18rem;
    }
    &__desc {
      color: #666;
      font-size: 0.14rem;
      margin: 0;
    }
    &__btns {
      // margin: .24rem .58rem 0 .58rem;
      margin: 0.24rem auto 0;
      display: flex;
      width: 1.84rem;
    }
    &__btn {
      // flex: 1;
      width: 0.78rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      border: 0.01rem solid #4fb0f9;
      font-size: 0.14rem;
      &--first {
        margin-right: 0.12rem;
        color: #4fb0f9;
      }
      &--last {
        margin-left: 0.12rem;
        background: #4fb0f9;
        color: #fff;
      }
    }
  }
}
</style>