<template>
  <div class="shop-page">
    <!-- 导航栏 -->
    <Navbar 
      :cart-item-count="cartItemCount" 
      @search="handleSearch"
      @toggle-cart="toggleCart"
    />
    
    <!-- 主要内容 -->
    <main class="main-content">
      <div class="container">
        <!-- 筛选栏 -->
        <div class="filter-bar">
          <div class="filter-group">
            <label>分类:</label>
            <select v-model="selectedCategory" @change="filterProducts" class="filter-select">
              <option value="">全部</option>
              <option value="electronics">电子产品</option>
              <option value="clothing">服装</option>
              <option value="books">图书</option>
              <option value="home">家居</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>价格:</label>
            <select v-model="selectedPriceRange" @change="filterProducts" class="filter-select">
              <option value="">全部</option>
              <option value="0-50">¥0-50</option>
              <option value="50-100">¥50-100</option>
              <option value="100-200">¥100-200</option>
              <option value="200+">¥200+</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>排序:</label>
            <select v-model="sortBy" @change="sortProducts" class="filter-select">
              <option value="default">默认</option>
              <option value="price-asc">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
              <option value="rating">评分最高</option>
            </select>
          </div>
        </div>
        
        <!-- 商品网格 -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>正在加载商品...</p>
        </div>
        
        <div v-else class="products-grid">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id"
            :product="product"
            @add-to-cart="addToCartHandler"
          />
        </div>
        
        <!-- 空状态 -->
        <div v-if="filteredProducts.length === 0" class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>没有找到相关商品</h3>
          <p>请尝试调整筛选条件或搜索关键词</p>
        </div>
      </div>
    </main>
    
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
    
    <!-- 成功提示 -->
    <div v-if="showSuccessMessage" class="success-message">
      ✅ {{ successMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入 API 服务
import { useApi } from '../../composables/useApi'

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
}

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

// 使用 API 服务
const { getProducts, addToCart, getCart, updateCartItem, removeCartItem, clearCart } = useApi()

// 状态管理
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPriceRange = ref('')
const sortBy = ref('default')
const showCart = ref(false)
const cartItems = ref<CartItem[]>([])
const showSuccessMessage = ref(false)
const successMessage = ref('')

// 商品数据
const products = ref<Product[]>([])
const loading = ref(false)

// 获取商品列表
const fetchProducts = async () => {
  loading.value = true
  try {
    const params: any = {}
    if (searchQuery.value) params.search = searchQuery.value
    if (selectedCategory.value) params.category = selectedCategory.value
    if (selectedPriceRange.value) params.priceRange = selectedPriceRange.value
    if (sortBy.value !== 'default') params.sortBy = sortBy.value
    
    const response = await getProducts(params)
    products.value = response.products
  } catch (error) {
    console.error('获取商品列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取购物车数据
const fetchCart = async () => {
  try {
    const response = await getCart()
    cartItems.value = response.cartItems
  } catch (error) {
    console.error('获取购物车失败:', error)
  }
}

// 计算属性
const filteredProducts = computed(() => {
  return products.value
})

const cartItemCount = computed(() => {
  return cartItems?.value?.reduce((sum, item) => sum + item.quantity, 0)
})

// 方法
const handleSearch = async (query: string) => {
  searchQuery.value = query
  // 如果搜索词为空，显示所有商品
  if (!query.trim()) {
    await fetchProducts()
    return
  }
  
  // 有搜索词时才调用 API
  try {
    loading.value = true
    await fetchProducts()
  } catch (error) {
    console.error('搜索失败:', error)
  } finally {
    loading.value = false
  }
}

const filterProducts = async () => {
  await fetchProducts()
}

const sortProducts = async () => {
  await fetchProducts()
}

const addToCartHandler = async (product: Product) => {
  try {
    const response = await addToCart(product.id, 1)
    await fetchCart() // 重新获取购物车数据
    
    showSuccessMessage.value = true
    successMessage.value = response.message
    
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 2000)
  } catch (error) {
    console.error('添加到购物车失败:', error)
  }
}

const updateCartItemQuantity = async (itemId: number, quantity: number) => {
  try {
    await updateCartItem(itemId, quantity)
    await fetchCart()
  } catch (error) {
    console.error('更新购物车失败:', error)
  }
}

const removeFromCart = async (itemId: number) => {
  try {
    await removeCartItem(itemId)
    await fetchCart()
  } catch (error) {
    console.error('删除购物车商品失败:', error)
  }
}

const clearCartHandler = async () => {
  try {
    await clearCart()
    await fetchCart()
  } catch (error) {
    console.error('清空购物车失败:', error)
  }
}

const toggleCart = () => {
  showCart.value = !showCart.value
}

const closeCart = () => {
  showCart.value = false
}

const handleCheckout = () => {
  // 这里可以添加结算逻辑
  alert('跳转到结算页面...')
}

// 页面加载时获取数据
onMounted(async () => {
  await Promise.all([
    fetchProducts(),
    fetchCart()
  ])
})
</script>

<style lang="scss" scoped>
// 变量定义
$primary-color: #ff6b35;
$secondary-color: #e55a2b;
$text-color: #333;
$text-light: #666;
$border-color: #e0e0e0;
$bg-light: #f8f9fa;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$border-radius: 12px;
$transition: all 0.2s ease;

.shop-page {
  min-height: 100vh;
  background: $bg-light;
}

.main-content {
  padding: 24px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.filter-bar {
  background: white;
  padding: 20px;
  border-radius: $border-radius;
  box-shadow: $shadow;
  margin-bottom: 24px;
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;

  .filter-group {
    display: flex;
    align-items: center;
    gap: 8px;

    label {
      font-size: 14px;
      font-weight: 600;
      color: $text-color;
      white-space: nowrap;
    }

    .filter-select {
      padding: 8px 12px;
      border: 1px solid $border-color;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
      min-width: 120px;

      &:focus {
        border-color: $primary-color;
      }
    }
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: $text-light;

  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid $primary-color;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px auto;
  }

  p {
    margin: 0;
    font-size: 16px;
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: $text-light;

  .empty-icon {
    font-size: 64px;
    color: #ccc;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 20px;
    color: $text-color;
  }

  p {
    margin: 0;
    font-size: 16px;
  }
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

.success-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4caf50;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  z-index: 1002;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;

    .filter-group {
      justify-content: space-between;
    }
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
  
  .cart-sidebar {
    width: 100%;
    padding: 16px;
  }
}
</style> 