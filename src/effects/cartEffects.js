import {useStore} from 'vuex';
import { computed } from 'vue';
export const useCommonEffect=(shopId)=>{
    const store=useStore();
    const cartList=store.state.cartList;
    const changeCartItemToCart=(shopId,productId,productInfo,num)=>{
      store.commit('changeCartItemToCart',{shopId,productId,productInfo,num})
    }

    const productList = computed(() => {
      const productList = cartList[shopId]?.productList || {};
      const notEmptyProductList={}
      for(let i in productList){
        if(productList[i].count>0){
          notEmptyProductList[i]=productList[i]
        }
      }
      return notEmptyProductList;
    });
    //之所以要用计算属性，是因为如果遇到一次赋值为空字符串，就会失去响应式特性，再有店名也不会改变
    //我们希望它能一直跟着变
    const shopName = computed(() => {
        const shopName = cartList[shopId]?.shopName || '';
        return shopName;
      });
    //计算总金额，计算总数，计算是否全选
      const calculations = computed(() => {
        const productList = cartList[shopId]?.productList;
        const result={total :0,price:0,allChecked:true}
        if (productList) {
          for (let i in productList) {
            const product = productList[i];
            result.total += product.count;
             if (product.check) {
              //只有选中才会算钱，不影响它在购物车里
              result.price += product.count * product.price;
            }
             if (product.count>0 && !product.check) {
                result.allChecked=false
            }
          }
        }
        result.price=result.price.toFixed(2)
        return result
      });
    return {changeCartItemToCart,cartList,productList,shopName,calculations}
 }

 