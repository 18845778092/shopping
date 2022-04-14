<template>
  <div class="wrapper">
    <top-area></top-area>
    <product-list></product-list>
    <order></order>
  </div>
</template>
<script>
import TopArea from "./TopArea.vue";
import ProductList from "./ProductList.vue";
import Order from "./Order.vue";
export default {
  name: "orderConfirmation",
  components: { TopArea, ProductList, Order },
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background: #eee;
  overflow-y: scroll;
}
</style>