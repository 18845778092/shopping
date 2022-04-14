<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe619;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe7e5;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe741;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt=""/>
  </div>
  <div class="icons">
    <div class="icons__item" v-for="(item,index) of iconsList" :key="index">
      <img :src="item.imgUrl" class="icons__item__img"/>
      <p class="icons__item__desc">{{item.title}}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: "StaticPart",
  setup() {
    const iconsList = [{
        imgUrl:'http://www.dell-lee.com/imgs/vue3/超市.png',
        title:'超市便利'
    }, {
        imgUrl:'http://www.dell-lee.com/imgs/vue3/菜市场.png',
        title:'菜市场'
    },{
        imgUrl:'http://www.dell-lee.com/imgs/vue3/水果店.png',
        title:'水果店'
    },{
        imgUrl:'http://www.dell-lee.com/imgs/vue3/鲜花.png',
        title:'鲜花绿植'
    },{
        imgUrl:'http://www.dell-lee.com/imgs/vue3/医药健康.png',
        title:'医药健康'
    },{
        imgUrl:'http://www.dell-lee.com/imgs/vue3/家居.png',
        title:'家局时尚'
    },{
        imgUrl:'http://www.dell-lee.com/imgs/vue3/蛋糕.png',
        title:'烘焙蛋糕'
    },{
        imgUrl:'http://www.dell-lee.com/imgs/vue3/签到.png',
        title:'超市便利'
    },{
        imgUrl:'http://www.dell-lee.com/imgs/vue3/大牌免运.png',
        title:'超市便利'
    },{
        imgUrl:'http://www.dell-lee.com/imgs/vue3/红包.png',
        title:'超市便利'
    }];
    return{
        iconsList
    }
  },
};
</script>


<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  .position__icon {
    position: relative;
    top: 0.015rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
  color: $content-fontcolor;
}
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background-color: $search-bgColor;
  color: $search-fontColor;
  border-radius: 0.16rem;
  .iconfont {
    position: relative;
    font-size: 0.2rem;
    display: inline-block;
    padding: 0 0.04rem 0 0.16rem;
    top: 0.02rem;
  }
  &__text {
    display: inline-block;
    font-size: 0.14rem;
  }
}
.banner {
  width: 100%;
  height: 0;
  padding-bottom: 25.4%;
  overflow: hidden;
  &__img {
    width: 100%;
  }
}
.icons {
  margin-top: 0.16rem;
  display: flex;
  flex-wrap: wrap;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      color: $content-fontcolor;
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: $content-bgColor;
}
</style>