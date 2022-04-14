<template>
  <!-- 最外层包裹 -->
  <div class="wrapper">
    <static-part></static-part>
    <nearby></nearby>
  </div>
  <docker :currentIndex="0"></docker>
</template>
<script>
import StaticPart from "./StaticPart.vue";
import Nearby from "./Nearby.vue";
import Docker from "../../components/Docker.vue";
export default {
  name: "Home",
  components: {
    StaticPart,
    Nearby,
    Docker,
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem 0.1rem 0.18rem;
}
</style>
