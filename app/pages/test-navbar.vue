<template>
  <div class="test-page">
    <!-- 导航栏 -->
    <Navbar 
      :cart-item-count="cartItemCount" 
      @search="handleSearch"
      @toggle-cart="toggleCart"
    />
    
    <!-- 测试内容 -->
    <div class="content">
      <h1>移动端导航栏测试</h1>
      <p>请在不同屏幕尺寸下测试导航栏的显示效果：</p>
      
      <div class="test-info">
        <h3>测试要点：</h3>
        <ul>
          <li>✅ 购物车按钮应该可见</li>
          <li>✅ 个人中心按钮应该可见</li>
          <li>✅ 搜索框应该适配屏幕宽度</li>
          <li>✅ Logo应该正常显示</li>
          <li>✅ 购物车数量徽章应该显示</li>
        </ul>
      </div>
      
      <div class="screen-sizes">
        <h3>测试屏幕尺寸：</h3>
        <ul>
          <li>📱 手机：≤ 768px</li>
          <li>📱 小手机：≤ 480px</li>
          <li>💻 桌面：> 768px</li>
        </ul>
      </div>
      
      <div class="cart-info">
        <h3>当前购物车状态：</h3>
        <p>购物车商品数量：{{ cartItemCount }}</p>
        <button @click="addToCart" class="add-btn">添加商品到购物车</button>
        <button @click="clearCart" class="clear-btn">清空购物车</button>
      </div>
    </div>
    
    <!-- 购物车侧边栏 -->
    <div v-if="showCart" class="cart-overlay" @click="closeCart">
      <div class="cart-sidebar" @click.stop>
        <ShoppingCart 
          :cart-items="cartItems"
          @close="closeCart"
          @update-quantity="updateCartItemQuantity"
          @remove-item="removeFromCart"
          @clear-cart="clearCartHandler"
          @checkout="handleCheckout"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import ShoppingCart from '../components/ShoppingCart.vue'

// 响应式数据
const cartItemCount = ref(0)
const showCart = ref(false)
const cartItems = ref([])

// 模拟购物车数据
const addToCart = () => {
  cartItemCount.value++
  cartItems.value.push({
    id: Date.now(),
    name: '测试商品',
    price: 99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    quantity: 1
  })
}

const clearCart = () => {
  cartItemCount.value = 0
  cartItems.value = []
}

const handleSearch = (query) => {
  console.log('搜索:', query)
}

const toggleCart = () => {
  showCart.value = !showCart.value
}

const closeCart = () => {
  showCart.value = false
}

const updateCartItemQuantity = (itemId, quantity) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    item.quantity = quantity
    updateCartCount()
  }
}

const removeFromCart = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId)
  updateCartCount()
}

const clearCartHandler = () => {
  cartItems.value = []
  updateCartCount()
}

const handleCheckout = () => {
  alert('跳转到结算页面...')
}

const updateCartCount = () => {
  cartItemCount.value = cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
}
</script>

<style scoped>
.test-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.test-info, .screen-sizes, .cart-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  color: #ff6b35;
  margin-bottom: 10px;
}

ul {
  margin: 0;
  padding-left: 20px;
}

li {
  margin-bottom: 5px;
  color: #666;
}

.add-btn, .clear-btn {
  background: #ff6b35;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-btn:hover, .clear-btn:hover {
  background: #e55a2b;
}

.clear-btn {
  background: #6c757d;
}

.clear-btn:hover {
  background: #5a6268;
}

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
  .content {
    padding: 20px 16px;
  }
  
  .cart-sidebar {
    width: 100%;
    padding: 16px;
  }
}
</style> 