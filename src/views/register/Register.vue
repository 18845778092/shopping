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
        autocomplete="new-password"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="确认密码"
        autocomplete="new-password"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleClick">注册</div>
    <div class="wrapper__register-link" @click="handleClickToLogin">
      已有账号去登录
    </div>
    <Toast v-if="showToast" :message="toastMessage"></Toast>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request.js";
import Toast, { toastEffect } from "../../components/Toast.vue";
//注册逻辑
const useRegisterEffect = (showToastMessage) => {
  const router = useRouter();
  const data = reactive({
    username: "",
    password: "",
    ensurement: "",
  });
  const handleClick = async () => {
    try {
      const result = await post("/api/user/register", {
        username: data.username,
        password: data.password,
      });
      if (result?.errno === 0) {
        // localStorage.isLogin = true;
        showToastMessage("注册成功");
        setTimeout(() => {
           router.push({ name: "Login" });
        }, 2000);
      } else {
        showToastMessage("注册失败");
      }
    } catch (e) {
      showToastMessage("请求失败");
    }
  };
  const { username, password, ensurement } = toRefs(data);
  return { username, password, handleClick, ensurement };
};
//已有账号立即登录
const useRouterEffect = () => {
  const router = useRouter();
  const handleClickToLogin = () => {
      router.push({ name: "Login" });
    };
  return { handleClickToLogin };
};
export default {
  name: "Register",
  components: {
    Toast,
  },
  setup() {
    const { showToastMessage, showToast, toastMessage } = toastEffect();
    const { username, password, handleClick , ensurement } = useRegisterEffect(showToastMessage);
    const { handleClickToLogin } = useRouterEffect();
    
    return {
      handleClickToLogin,
      showToastMessage,
      showToast,
      toastMessage,
      username,
      password,
      ensurement,
      handleClick,
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
      border: none;
      outline: none;
      width: 100%;
      line-height: 0.48rem;
      background: none;
      font-size: 0.16rem;
      color: rgba(0, 0, 0, 0.5);
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  &__register-button {
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
  &__register-link {
    font-size: 0.14rem;
    margin: 0.16rem auto 0;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
  }
}
</style>