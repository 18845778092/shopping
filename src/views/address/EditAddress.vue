<template>
  <div class="header">
    <span class="header__icon iconfont" @click="handleBackClick">&#xe600;</span>
    管理收货地址
    <span class="header__save" @click="handleNewAddressClick">新建</span>
  </div>
  <div class="content">
    <div class="content__desc">
      我的收货地址
  </div>
  <div class="content__item" v-for="item in list" :key="item._id">
      <span class="content__item__name">{{item.name}}</span>
      <span class="content__item__tel">{{item.phone}}</span>
      <div class="content__item__address">{{item.city}}市{{item.department}}{{item.houseNumber}}</div>
      <span class="content__item__icon iconfont">&#xe600;</span>
  </div>
  </div>
</template>

<script>
import { get } from "../../utils/request";
import {useRouter} from 'vue-router'
import { useStore } from "vuex";
import { reactive, toRefs } from "@vue/reactivity";
export default {
  name: "EditAddress",
  setup() {
    const router=useRouter()
    const store = useStore();
    const data = reactive({
      list: [],
    });
    const getAddress = async () => {
      if (!store.state.addressLists.length>0) {
        const result = await get("/api/user/address");
        if (result?.data?.length) {
          store.commit("saveAddress", { result });
          data.list = store.state.addressLists;
        }
      }else{
        data.list = store.state.addressLists;
      }

    };
    getAddress();
    const { list } = toRefs(data);
    console.log(list)
    const handleBackClick=()=>{
        router.push({name:'My'})
    }
    const handleNewAddressClick=()=>{
        router.push({name:'NewAddress'})
    }
    return { list,handleBackClick,handleNewAddressClick };
  },
};
</script>

<style scoped lang="scss">
.header {
  position: relative;
  text-align: center;
  height: 0.64rem;
  background: #fff;
  font-size: 0.16rem;
  color: #333333;
  line-height: 0.64rem;
  &__icon {
    font-size: 0.2rem;
    position: absolute;
    left: 0.184rem;
    color: #b6b6b6;
  }
  &__save {
    font-size: 0.14rem;
    position: absolute;
    right: 0.2rem;
  }
}
.content {
  background-color: #f8f8f8;
  position: absolute;
  top: 0.64rem;
  right: 0;
  left: 0;
  bottom: 0;
  &__desc{
    font-size: .14rem;
    color: #333333;
    margin-top:.16rem;
    margin-left: .18rem;
}
&__item{
    position: relative;
    width: 3.03rem;
    height: .72rem;
    border-radius: .04rem;
    background-color: #fff;
    padding: .18rem .16rem;
    margin: .12rem auto 0 auto;
    &__name{
        font-size: .14rem;
        color: #999999;
        margin-right: .66rem;
    }
    &__tel{
        font-size: .14rem;
        color: #999999;
    }
    &__address{
        margin-top:.08rem;
        font-size: .14rem;
        line-height: .2rem;
        color: #333333;
        padding-right: .39rem;
    }
    &__icon{
        position: absolute;
        transform: rotate(180deg);
        font-size: .25rem;
        color: #999999;
        right: 0;
        top: 32.5%;
    }
}
  
}

</style>