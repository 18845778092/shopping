<template>
    <div class="top">
      <div class="top__header">
        <div class="iconfont top__header__back" @click="handleBackClick">&#xe600;</div>
        确认订单
      </div>
      <div class="top__recevier">
        <div class="top__recevier__title">收货地址</div>
        <div class="top__recevier__address">
          北京理工大学国防科技园2号楼10层
        </div>
        <div class="top__recevier__info">
          <span class="top__recevier__info__name">瑶妹（先生）</span>
          <span class="top__recevier__info__name">18911024266</span>
        </div>
        <div class="iconfont top__recevier__icon">&#xe600;</div>
      </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    name:'TopArea',
    setup(){
    const router=useRouter();

    const handleBackClick=()=>{
        router.back()
    }
    return { handleBackClick };
    }
}
</script>

<style lang="scss" scoped>
  .top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: 0.26rem;
    line-height: 0.24rem;
    color: #fff;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      font-size: 0.21rem;
      left: 0.18rem;
    }
  }
  &__recevier {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: #fff;
    border-radius: 0.04rem;
    &__title {
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: #333;
      line-height: 0.22rem;
    }
    &__address {
      padding: 0 0.4rem 0 0.16rem;
      color: #333;
      font-size: 0.14rem;
      line-height: 0.2rem;
    }
    &__info {
      padding: 0.06rem 0 0 0.16rem;
      &__name {
        color: #666;
        font-size: 0.12rem;
        line-height: 0.18rem;
        margin-right: 0.06rem;
      }
    }
    &__icon {
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      color: #666;
      font-size: 0.16rem;
      transform: rotate(180deg);
    }
  }
}
</style>