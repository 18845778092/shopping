<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入手机号"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleClick">登录</div>
    <div class="wrapper__login-link" @click="handleClickToRegister">
      立即注册
    </div>
    <Toast v-if="showToast" :message="toastMessage"></Toast>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request.js";
import Toast, { toastEffect } from "../../components/Toast.vue";
const useLoginEffect = (showToastMessage) => {
   const router = useRouter();
  const data = reactive({
    username: "",
    password: "",
  });
  const handleClick = async () => {
    try {
      const result = await post("/api/user/login", {
        username: data.username,
        password: data.password,
      });
      if (result?.errno === 0) {
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      } else {
        showToastMessage("登录失败");
      }
    } catch (e) {
      showToastMessage("请求失败");
    }
  };
  const { username, password } = toRefs(data);
  return { username, password, handleClick };
};
const useRouterEffect = () => {
  const router = useRouter();
  const handleClickToRegister = () => {
    router.push({ name: "Register" });
  };
  return { handleClickToRegister };
};
export default {
  name: "Login",
  components: {
    Toast,
  },
  setup() {
    const { showToastMessage, showToast, toastMessage } = toastEffect();
    const { username, password, handleClick } =useLoginEffect(showToastMessage);
    const { handleClickToRegister } = useRouterEffect();
    return {
      handleClick,
      handleClickToRegister,
      username,
      password,
      showToast,
      toastMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    height: 0.66rem;
    width: 0.66rem;
  }
  &__input {
    padding: 0 0.16rem;
    box-sizing: border-box;
    background: #f9f9f9;
    border: .01rem solid rgba(0, 0, 0, 0.1);
    height: 0.48rem;
    width: 2.95rem;
    border-radius: 0.06rem;
    margin: 0 auto 0.16rem auto;
    &__content {
      line-height: .22rem;
      margin-top:.1rem ;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: 0.16rem;
      color: rgba(0, 0, 0, 0.5);
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  &__login-button {
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: #fff;
    margin: 0.32rem auto 0 auto;
    width: 2.95rem;
    font-size: 0.16rem;
    line-height: 0.48rem;
    text-align: center;
  }
  &__login-link {
    font-size: 0.14rem;
    margin: 0.16rem auto 0;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
  }
}
</style>