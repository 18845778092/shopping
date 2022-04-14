<template>
    <div class="toast">
        {{message}}
    </div>
</template>


<script>
import { reactive,toRefs } from "vue";
export default {
    props:['message'],
}
export const toastEffect = () => {
  const toastData = reactive({ showToast: false, toastMessage: "" });
  const showToastMessage = (msg) => {
    toastData.showToast = true;
    toastData.toastMessage = msg;
    setTimeout(() => {
      toastData.showToast = false;
      toastData.toastMessage = "";
    }, 2000);
  };
  const {showToast,toastMessage}=toRefs(toastData)
  return { showToastMessage,showToast,toastMessage };
};
</script>

<style scoped lang="scss">
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding:.1rem;
    background: rgba(0,0,0,.35);
    border-radius: .05rem;
    color: #fff;
}
</style>
