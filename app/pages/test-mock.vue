<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">模拟数据系统测试</h1>
    
    <!-- 购物车测试 -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">购物车组件测试</h2>
      <div class="flex gap-4 mb-4">
        <button 
          @click="showCart = !showCart"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {{ showCart ? '隐藏购物车' : '显示购物车' }}
        </button>
        <button 
          @click="addTestItem"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          添加测试商品
        </button>
        <button 
          @click="clearCart"
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          清空购物车
        </button>
      </div>
      
      <!-- 购物车侧边栏 -->
      <div v-if="showCart" class="cart-overlay" @click="showCart = false">
        <div class="cart-sidebar" @click.stop>
          <ShoppingCart 
            :cart-items="cart"
            @close="showCart = false"
            @update-quantity="updateQuantity"
            @remove-item="removeFromCart"
            @clear-cart="clearCart"
            @checkout="checkout"
          />
        </div>
      </div>
    </div>
    
    <!-- 商品列表 -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">商品列表</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="border rounded-lg p-4 shadow-sm"
        >
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded mb-3">
          <h3 class="font-semibold text-lg">{{ product.name }}</h3>
          <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold text-red-600">¥{{ product.price }}</span>
            <button 
              @click="addToCart(product.id)"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              :disabled="loading"
            >
              {{ loading ? '添加中...' : '加入购物车' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 购物车 -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">购物车</h2>
      <div v-if="cart.length === 0" class="text-gray-500 text-center py-8">
        购物车为空
      </div>
      <div v-else>
        <div class="space-y-4">
          <div 
            v-for="item in cart" 
            :key="item.id"
            class="flex items-center justify-between border rounded-lg p-4"
          >
            <div class="flex items-center space-x-4">
              <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded">
              <div>
                <h3 class="font-semibold">{{ item.name }}</h3>
                <p class="text-gray-600">¥{{ item.price }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="updateQuantity(item.id, item.quantity - 1)"
                class="bg-gray-200 px-3 py-1 rounded"
                :disabled="loading"
              >
                -
              </button>
              <span class="px-4">{{ item.quantity }}</span>
              <button 
                @click="updateQuantity(item.id, item.quantity + 1)"
                class="bg-gray-200 px-3 py-1 rounded"
                :disabled="loading"
              >
                +
              </button>
              <button 
                @click="removeFromCart(item.id)"
                class="bg-red-500 text-white px-3 py-1 rounded ml-2"
                :disabled="loading"
              >
                删除
              </button>
            </div>
          </div>
        </div>
        
        <div class="mt-4 p-4 bg-gray-50 rounded-lg">
          <div class="flex justify-between items-center">
            <div>
              <p>商品总数: {{ total }}</p>
              <p class="text-xl font-bold">总计: ¥{{ subtotal }}</p>
            </div>
            <div class="space-x-2">
              <button 
                @click="clearCart"
                class="bg-gray-500 text-white px-4 py-2 rounded"
                :disabled="loading"
              >
                清空购物车
              </button>
              <button 
                @click="checkout"
                class="bg-green-500 text-white px-4 py-2 rounded"
                :disabled="loading"
              >
                结算
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API测试 -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">API测试</h2>
      <div class="space-y-4">
        <div>
          <h3 class="font-semibold mb-2">获取商品列表</h3>
          <button 
            @click="fetchProducts"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            :disabled="loading"
          >
            {{ loading ? '加载中...' : '获取商品' }}
          </button>
          <pre v-if="productsData" class="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">{{ JSON.stringify(productsData, null, 2) }}</pre>
        </div>
        
        <div>
          <h3 class="font-semibold mb-2">获取购物车</h3>
          <button 
            @click="fetchCart"
            class="bg-green-500 text-white px-4 py-2 rounded"
            :disabled="loading"
          >
            {{ loading ? '加载中...' : '获取购物车' }}
          </button>
          <pre v-if="cartData" class="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">{{ JSON.stringify(cartData, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入购物车组件
import ShoppingCart from '../components/ShoppingCart.vue'

// 响应式数据
const products = ref([])
const cart = ref([])
const loading = ref(false)
const total = ref(0)
const subtotal = ref(0)
const productsData = ref(null)
const cartData = ref(null)
const showCart = ref(false)

// 获取商品列表
const fetchProducts = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/products')
    products.value = data.products
    productsData.value = data
  } catch (error) {
    console.error('获取商品失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取购物车
const fetchCart = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/cart')
    cart.value = data.cartItems || []
    total.value = data.total || 0
    subtotal.value = data.subtotal || 0
    cartData.value = data
  } catch (error) {
    console.error('获取购物车失败:', error)
  } finally {
    loading.value = false
  }
}

// 添加到购物车
const addToCart = async (productId) => {
  loading.value = true
  try {
    const data = await $fetch('/api/cart', {
      method: 'POST',
      body: { productId, quantity: 1 }
    })
    cart.value = data.cartItems || []
    total.value = data.total || 0
    subtotal.value = data.subtotal || 0
    alert('添加成功！')
  } catch (error) {
    console.error('添加到购物车失败:', error)
    alert('添加失败！')
  } finally {
    loading.value = false
  }
}

// 添加测试商品
const addTestItem = () => {
  const testItem = {
    id: Date.now(),
    name: '测试商品',
    price: 99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    quantity: 1
  }
  cart.value.push(testItem)
  updateCartStats()
}

// 更新商品数量
const updateQuantity = async (itemId, quantity) => {
  if (quantity < 0) return
  loading.value = true
  try {
    const data = await $fetch('/api/cart', {
      method: 'PUT',
      body: { itemId, quantity }
    })
    cart.value = data.cartItems || []
    total.value = data.total || 0
    subtotal.value = data.subtotal || 0
  } catch (error) {
    console.error('更新数量失败:', error)
    alert('更新失败！')
  } finally {
    loading.value = false
  }
}

// 删除商品
const removeFromCart = async (itemId) => {
  loading.value = true
  try {
    const data = await $fetch(`/api/cart?itemId=${itemId}`, {
      method: 'DELETE'
    })
    cart.value = data.cartItems || []
    total.value = data.total || 0
    subtotal.value = data.subtotal || 0
    alert('删除成功！')
  } catch (error) {
    console.error('删除失败:', error)
    alert('删除失败！')
  } finally {
    loading.value = false
  }
}

// 清空购物车
const clearCart = async () => {
  if (!confirm('确定要清空购物车吗？')) return
  loading.value = true
  try {
    const data = await $fetch('/api/cart/clear', {
      method: 'POST'
    })
    cart.value = data.cartItems || []
    total.value = data.total || 0
    subtotal.value = data.subtotal || 0
    alert('清空成功！')
  } catch (error) {
    console.error('清空失败:', error)
    alert('清空失败！')
  } finally {
    loading.value = false
  }
}

// 更新购物车统计
const updateCartStats = () => {
  total.value = cart.value.reduce((sum, item) => sum + item.quantity, 0)
  subtotal.value = cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

// 结算
const checkout = () => {
  alert('模拟结算功能！总金额：¥' + subtotal.value)
}

// 页面加载时获取数据
onMounted(() => {
  fetchProducts()
  fetchCart()
})
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  justify-content: flex-end;
}

.cart-sidebar {
  max-height: 100vh;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  padding-top: 80px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .cart-sidebar {
    width: 100%;
    padding: 16px;
  }
}
</style> 