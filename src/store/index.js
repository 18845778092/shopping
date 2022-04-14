import { createStore } from 'vuex'
//把购物车信息放本地存储
const setLocalStorage=(state)=>{
  const {cartList}=state
  const cartListString=JSON.stringify(cartList)
  localStorage.cartList=cartListString
}
//将地址放入本次存储
const addressLocalStorage=(state)=>{
  const {addressLists}=state;
  const localAddressLists=JSON.stringify(addressLists)
  localStorage.addressLists=localAddressLists
}
//从本地存储拿地址信息
const getLocalAddress=()=>{
  try{
    //处理JSON.parse最好放到try catch里，因为很难保证里面是不是undefined等
    return JSON.parse(localStorage.addressLists) 
  }catch(e){
    return []
  }
}
//从本地存储拿购物车信息
const getLocalStorage=()=>{
  try{
    //处理JSON.parse最好放到try catch里，因为很难保证里面是不是undefined等
    return JSON.parse(localStorage.cartList) 
  }catch(e){
    return {}
  }
 
}
export default createStore({
  state: {
    cartList:getLocalStorage(),
    addressLists:getLocalAddress()
    // cartList:{}
    // cartList:{
    //   // //第一层级是商铺id
    //   // shopId:{
    //   //  shopName:'沃尔玛',
    //   //  productList:{
    //   //      productId:{
    //       //     imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
    //       //     name: "番茄 250g / 份",
    //       //     oldPrice: 39.6,
    //       //     price: 33.6,
    //       //     sales: 10,
    //       //     _id: "1",
    //       //     count:2
    //       //   },
    //   // }
    //   //   //第二层是商铺id 第二层内容是商铺内容及购物数量
    //   //   
    //   //   222:{
    //   //     imgUrl: "http://www.dell-lee.com/imgs/vue3/cherry.png",
    //   //     name: "车厘子 500g / 份",
    //   //     oldPrice: 119.6,
    //   //     price: 99.6,
    //   //     sales: 10,
    //   //     _id: "2",
    //   //     count:2
    //   //   }
    //  }
  },
  getters: {
  },
  mutations: {
    //cartList 多了一层 shopName,productList,然后里面是每一个货物的productId
    changeCartItemToCart(state,payload){
      //payload是传递过来的所有参数，有商店id shopId，货物id productId，以及货物的详细信息productInfo
      const {shopId,productId,productInfo} = payload;
      let shopInfo=state.cartList[shopId] || {
        shopName:'',
        productList:{}
      } //如果没有这个商店信息就创建一个空对象
      let product=shopInfo.productList[productId] 
      if(!product){
        productInfo.count=0 //初始化数量0个
        product=productInfo //如果没有这个货物的信息就创建一个，并且赋值为我们传入的详细信息
      }
      product.count+=payload.num;   //然后每次点击 + 都会增加一个
      // (payload.num > 0) && (product.check = true) 这个写法等同于下面，前面true才会走后面
      if(payload.num>0){
        product.check=true
      }
      if(product.count<0) product.count=0
      shopInfo.productList[productId]=product  //然后把这个商店的这个货物信息重新赋值，是为了刷新count
      state.cartList[shopId]=shopInfo  //同上，刷新商店货物信息
      setLocalStorage(state)
    },
    changeCheckMutations(state,payload){
      const {shopId,productId}=payload
      let shopInfo=state.cartList[shopId].productList
      shopInfo[productId].check=!shopInfo[productId].check
      setLocalStorage(state)
    },
    cleanCartProducts(state,payload){
      const { shopId } = payload
      state.cartList[shopId].productList={}
      setLocalStorage(state)
    },
    setCartItemsCheck(state,payload){
      const { shopId } = payload
      const products=state.cartList[shopId].productList
      if(products){
        for(let i in products){
          products[i].check=true
        }
      }
      setLocalStorage(state)
    },
    changeShopName(state,payload){
      const {shopId,shopName}=payload
      const shopInfo=state.cartList[shopId] || {
        shopName:'',
        productList:{}
      }
      shopInfo.shopName=shopName
      state.cartList[shopId]=shopInfo
      setLocalStorage(state)
    },
    orderConfirm(state,payload){
      const {shopId}=payload
      state.cartList[shopId]={shopName:'',
      productList:{}}
      setLocalStorage(state)
    },
    //将接口返回的地址存入store
    saveAddress(state,payload){
      const {result}=payload
      if(!state.addressLists){
        state.addressLists=[]
      }
        for(let i in result.data){
          // state.addressLists[i]=result.data[i]
          console.log(result.data[i])
          state.addressLists.push(result.data[i])
        }  
        addressLocalStorage(state)
    },
    //新建地址
    addNewAddress(state,payload){
      const {data}=payload
   
      if(!state.addressLists){
        state.addressLists={}
      }
      state.addressLists.push(data.inforList)
      addressLocalStorage(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
