<template>
  <div class="header">
    <span class="header__icon iconfont" @click="handleBackClick">&#xe600;</span>
    新建收货地址
    <span class="header__save" @click="handleSubmit">保存</span>
  </div>
  <div class="content">
    <div class="content__address">
      <div class="content__address__item">
        <span class="content__address__title">所在城市：</span>
        <input
          class="content__address__input"
          type="text"
          placeholder="如北京市"
          v-model="inforList.city"
        />
      </div>
      <div class="content__address__item">
        <span class="content__address__title">小区/大厦/学校：</span>
        <input
          class="content__address__input"
          type="text"
          placeholder="如理工大学国防科技园"
          v-model="inforList.department"
        />
      </div>
      <div class="content__address__item">
        <span class="content__address__title">楼号-门牌号：</span>
        <input
          class="content__address__input"
          type="text"
          placeholder="A号楼B层"
          v-model="inforList.houseNumber"
        />
      </div>
      <div class="content__address__item">
        <span class="content__address__title">收货人：</span>
        <input
          class="content__address__input"
          type="text"
          placeholder="请填写收货人的姓名"
          v-model="inforList.name"
        />
      </div>
      <div class="content__address__item">
        <span class="content__address__title">联系电话：</span>
        <input
          class="content__address__input"
          type="text"
          placeholder="请填写收货手机号"
          v-model="inforList.phone"
        />
      </div>
    </div>
  </div>
  <Toast  v-if="showToast" :message="toastMessage"/>
</template>

<script>
import { useStore } from "vuex";
import {useRouter} from 'vue-router'
import { reactive, toRefs } from "@vue/reactivity";
import Toast, { toastEffect } from "../../components/Toast.vue";
export default {
  components: { Toast },
  name: "NewAddress",
  setup() {
    const router=useRouter()
    const store = useStore();
    const { showToastMessage, showToast, toastMessage } = toastEffect();
    try{
      var id=String(JSON.parse(localStorage?.addressLists).length+1||'');
    }catch(e){
      return ''
    } 
    const data = reactive({
      inforList: {_id:id,city:'',department:'',houseNumber:'',name:'',phone:''},
    });
    const handleBackClick=()=>{
      router.push({name:'EditAddress'})
    }
    const handleSubmit=()=>{
      showToastMessage('保存成功')
      store.commit('addNewAddress',{data})
      setTimeout(()=>{
          handleBackClick()
      },2000)

    }
    const { inforList } = toRefs(data);
    return { inforList,handleBackClick,handleSubmit ,showToast, toastMessage};
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
  &__address {
    margin-top: 0.12rem;
    width: 100%;
    background: #fff;
    color: #666;
    &__item {
      display: flex;
      margin: 0 0.18rem;
      height: 0.44rem;
      line-height: 0.44rem;
      font-size: 0.14rem;
      border-bottom: 0.01rem solid #f1f1f1;
    }
    &__item:last-child {
      border-bottom: none;
    }
    &__title {
    }
    &__input {
      flex: 1;
      border: none;
      outline: none;
    }
  }
}
</style>