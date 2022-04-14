<template>
  <div class="wrapper">
    <div class="info">
      <!-- 头像 -->
      <img class="info__headimg" src="../../img/headimg001.jpg" alt="" />
      <!-- 名字、id等 -->
      <div class="content">
        <span class="content__title">热心市民李大夫</span>
        <div class="content__icon iconfont">&#xe65d;&#xe65d;&#xe65d;</div>
        <p class="content__id">ID: 1069643013</p>
      </div>
      <!-- 横杠下面部分 -->
      <div class="info__count">
        <div
          class="info__count__item"
          v-for="(item, index) in information"
          :key="index"
        >
          <p class="info__count__title">{{ item.title }}</p>
          <p class="info__count__num">{{ item.num }}</p>
        </div>
      </div>
    </div>
    <div class="menu">
      <div class="menu__item" v-for="(item,index) in iconList" :key="index" @click="()=>handleClick(item.to)">
        <icon-svg
          :icon-class="item.icon"
          class="menu__item__icon iconfont"
        ></icon-svg>
        <span class="menu__item__title">{{item.title}}</span>
        <span class="menu__item__to iconfont">&#xe600;</span>
      </div>
    </div>
  </div>
  <Docker :currentIndex="3"></Docker>
</template>
<script>
import Docker from "../../components/Docker.vue";
import {useRouter} from 'vue-router'
export default {
  name: "My",
  components: { Docker },
  setup() {
      const router=useRouter()
    const information = [
      { title: "红包", num: "218" },
      { title: "优惠券", num: "12张" },
      { title: "鲜豆", num: "88" },
      { title: "白条", num: "9998" },
    ];
    const iconList=[{ icon: "qianbao",title:"我的钱包",to:{name:'EditAddress'}},
      { icon: "dizhi",title:"我的地址",to:{name:'EditAddress'}},
      { icon: "weibiaoti-_huabanfuben",title:"客服与帮助",to:{name:'EditAddress'}}]
    const handleClick=(to)=>{
        router.push(to)
    }


    return { information,iconList,handleClick };
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.49rem;
  background-image: linear-gradient(180deg, #3a6ff3 0%, #50c7fb 20%, #fff 40%);
}
.info {
  width: 3.39rem;
  height: 2.03rem;
  background: #ffffff;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  margin: 1.08rem auto 0;
  position: relative;
  &__headimg {
    position: absolute;
    width: 0.94rem;
    height: 0.94rem;
    border-radius: 50%;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
  }
  .content {
    position: absolute;
    top: 0.59rem;
    margin: 0 auto;
    width: 100%;
    text-align: center;
    border-bottom: 0.01rem solid #f1f1f1;
    &__title {
      margin: 0 auto;
      font-size: 0.24rem;
      color: #262628;
      line-height: 0.36rem;
    }
    &__id {
      margin: 0.02rem auto 0;
      font-size: 0.14rem;
      color: #c1c0c9;
      text-align: center;
      margin-bottom: 0.12rem;
    }
    &__icon {
      height: 0.15rem;
      line-height: 0.15rem;
      position: absolute;
      font-size: 0.12rem;
      margin-left: 0.2rem;
      right: 0.3rem;
      top: 0.14rem;
      color: gold;
      background: greenyellow;
      border-radius: 0.75rem;
    }
  }
  &__count {
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0.16rem;
    &__item {
      width: 25%;
      text-align: center;
    }
    &__title {
      font-size: 0.12rem;
      line-height: 0.17rem;
      color: #c1c0c9;
      margin: 0.12rem 0 0.02rem 0;
    }
    &__num {
      font-size: 0.2rem;
      color: #262628;
      line-height: 0.28rem;
      margin: 0;
    }
  }
}

.menu {
  width: 3.39rem;
  height: 1.46rem;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  margin: 0.16rem auto 0;
  padding: 0.16rem 0.12rem 0.16rem 0.16rem;

  &__item {
    width: 100%;
    display: flex;
    height: 0.3rem;
    line-height: 0.3rem;
    margin-bottom: .12rem;
    &__icon {
      width: 0.3rem;
      font-size: 0.3rem;
      margin-right: 0.12rem;
    }
    &__title {
      flex: 1;
      text-align: left;
      font-size: 0.14rem;
      color: #262626;
    }
    &__to {
      font-size: 0.12rem;
      width: 0.07rem;
      transform: rotate(180deg);
    }
    a{
        text-decoration: none;
        color: #262626;
    }
  }
}
</style>