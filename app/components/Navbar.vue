<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <div class="nav-logo">
        <span class="logo-icon">🛍️</span>
        <span class="logo-text">商城</span>
      </div>
      
      <!-- 搜索框 -->
      <div class="search-container">
        <div class="search-box">
          <div class="search-icon">🔍</div>
          <input 
            v-model="searchQuery"
            @input="handleSearch"
            type="text" 
            placeholder="搜索商品..." 
            class="search-input"
          />
          <!-- 搜索加载指示器 -->
          <div v-if="isSearching" class="search-loading">
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 导航菜单 -->
      <div class="nav-menu">
        <!-- 购物车按钮 -->
        <button @click="toggleCart" class="nav-btn cart-btn">
          🛒 购物车
          <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
        </button>
        
        <!-- 用户菜单 -->
        <div class="user-menu">
          <button @click="toggleUserMenu" class="nav-btn user-btn">
            👤 用户
          </button>
          
          <div v-if="showUserMenu" class="user-dropdown">
            <NuxtLink to="/user-profile" class="dropdown-item">个人中心</NuxtLink>
            <!-- <a href="#" class="dropdown-item">订单记录</a>
            <a href="#" class="dropdown-item">设置</a>
            <a href="#" class="dropdown-item">退出登录</a> -->
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { debounce } from '../../composables/useDebounce'

interface Props {
  cartItemCount: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  search: [query: string]
  toggleCart: []
}>()

const searchQuery = ref('')
const showUserMenu = ref(false)
const isSearching = ref(false)

// 创建防抖的搜索函数
const debouncedSearch = debounce((query: string) => {
  isSearching.value = true
  emit('search', query)
  // 搜索完成后重置状态
  setTimeout(() => {
    isSearching.value = false
  }, 1000)
}, 500) // 500ms 防抖延迟

const handleSearch = () => {
  // 立即更新本地状态，但延迟发送搜索请求
  debouncedSearch(searchQuery.value)
}

const toggleCart = () => {
  emit('toggleCart')
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

// 点击外部关闭用户菜单
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as Element
    if (!target.closest('.user-menu')) {
      showUserMenu.value = false
    }
  })
})
</script>

<style lang="scss" scoped>
// 变量定义
$primary-color: #ff6b35;
$secondary-color: #e55a2b;
$text-color: #333;
$text-light: #666;
$border-color: #e0e0e0;
$bg-light: #f5f5f5;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$border-radius: 25px;
$transition: all 0.2s ease;

.navbar {
  background: white;
  box-shadow: $shadow;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: $primary-color;
  cursor: pointer;

  .logo-text {
    font-size: 18px;
  }
}

.search-container {
  flex: 1;
  max-width: 400px;

  .search-box {
    position: relative;
    width: 100%;

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      color: $text-light;
      z-index: 1;
    }

    .search-input {
      width: 100%;
      padding: 12px 12px 12px 44px;
      border: 1px solid $border-color;
      border-radius: $border-radius;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: $primary-color;
      }
    }

    .search-loading {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;

      .loading-dots {
        display: flex;
        gap: 4px;

        span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: $primary-color;
          animation: loadingDots 1.4s infinite ease-in-out;

          &:nth-child(1) {
            animation-delay: -0.32s;
          }

          &:nth-child(2) {
            animation-delay: -0.16s;
          }
        }
      }
    }
  }
}

@keyframes loadingDots {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 16px;

  .nav-btn {
    background: none;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    color: $text-light;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: $transition;
    position: relative;

    &:hover {
      background: $bg-light;
      color: $primary-color;
    }

    &.cart-btn {
      .cart-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background: $primary-color;
        color: white;
        font-size: 12px;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 10px;
        min-width: 18px;
        text-align: center;
      }
    }
  }

  .user-menu {
    position: relative;

    .user-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      min-width: 120px;
      padding: 8px 0;
      margin-top: 8px;
      z-index: 1000;

      .dropdown-item {
        display: block;
        padding: 5px 8px 5px 16px;
        color: $text-color;
        text-decoration: none;
        font-size: 14px;
        transition: $transition;

        &:hover {
          background: $bg-light;
          color: $primary-color;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
    gap: 8px;
    height: 56px;
  }
  
  .nav-menu {
    gap: 6px;
    
    .nav-btn {
      padding: 6px 10px;
      font-size: 14px;
      gap: 4px;
      
      &.cart-btn {
        .cart-badge {
          font-size: 14px;
          padding: 1px 4px;
          min-width: 16px;
        }
      }
    }
  }
  
  .search-container {
    max-width: 120px;
    
    .search-box {
      .search-input {
        padding: 6px 6px 6px 32px;
        font-size: 14px;
      }
      
      .search-icon {
        left: 6px;
        font-size: 14px;
      }
    }
  }
  
  .logo-text {
    display: none;
  }
  
  .nav-logo {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 12px;
    gap: 6px;
    height: 52px;
  }
  
  .nav-menu {
    gap: 4px;
    
    .nav-btn {
      padding: 5px 8px;
      font-size: 13px;
      gap: 2px;
      
      &.cart-btn {
        .cart-badge {
          font-size: 13px;
          padding: 1px 3px;
          min-width: 13px;
        }
      }
    }
  }
  
  .search-container {
    max-width: 150px;
    
    .search-box {
      .search-input {
        padding: 5px 5px 5px 28px;
        font-size: 13px;
      }
      
      .search-icon {
        left: 5px;
        font-size: 13px;
      }
    }
  }
}
</style> 