<template>
  <div class="docker">
    <span :class="{
    'docker__item':true,
    'docker__item--active':index===currentIndex}" 
    v-for="(item,index) of dockerList" 
    :key="item.icon">
    <router-link :to="item.to">
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker__title">{{item.text}}</div>
       </router-link>
    </span>
  </div>
</template>

<script>
export default {
  props:['currentIndex'],
  name: "Docker",
  setup() {
    const dockerList = [
      { icon: "&#xe68d;", text: "首页" ,to:{name:'Home'}},
      { icon: "&#xe638;", text: "购物车" ,to:{name:'CartList'}},
      { icon: "&#xe7bd;", text: "订单" ,to:{name:'OrderList'}},
      { icon: "&#xe78b;", text: "我的" ,to:{name:'My'}},
    ]
    return {dockerList}
  },
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
@import "../style/mixins.scss";
.docker {
  padding: 0 0.18rem;
  box-sizing: border-box;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  color: $content-fontcolor;
  &__item {
    a{
      text-decoration: none;
      color: $content-fontcolor;
    }
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 0.18rem;
      margin-top: 0.07rem;
      margin-bottom: 0.02rem;
    }
    &--active {
      a{
         color: #1fa4fc;
      }
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>