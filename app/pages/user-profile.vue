<template>
  <div class="user-profile-page">
    <!-- 简单导航栏 -->
    <nav class="simple-navbar">
      <div class="nav-container">
        <div class="nav-logo" @click="goBack">
          <span class="logo-icon">🛍️</span>
          <span class="logo-text">在线商城</span>
        </div>
        <button @click="goBack" class="back-btn">
          ← 返回商城
        </button>
      </div>
    </nav>
    
    <!-- 主要内容 -->
    <main class="main-content">
      <div class="container">
        <!-- 用户信息区域 -->
        <div class="user-section">
          <div v-if="userPending" class="user-loading">
            <div class="loading-spinner"></div>
            <p>加载用户信息中...</p>
          </div>
          <div v-else-if="userError" class="user-error">
            <p>加载用户信息失败</p>
            <button @click="handleRefreshUser" class="refresh-btn">重新加载</button>
          </div>
          <div v-else-if="user" class="user-profile-card">
            <div class="user-header">
              <div class="user-avatar">
                <img :src="user.picture.large" :alt="user.name.first" />
              </div>
              <div class="user-basic-info">
                <h1>{{ user.name.first }} {{ user.name.last }}</h1>
                <p class="user-email">{{ user.email }}</p>
                <p class="user-phone">{{ user.phone }}</p>
              </div>
            </div>
            
            <div class="user-details">
              <div class="detail-section">
                <h3>个人信息</h3>
                <div class="detail-grid">
                  <div class="detail-item">
                    <span class="label">年龄:</span>
                    <span class="value">{{ user.dob.age }} 岁</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">性别:</span>
                    <span class="value">{{ user.gender === 'male' ? '男' : '女' }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">生日:</span>
                    <span class="value">{{ formatDate(user.dob.date) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">注册时间:</span>
                    <span class="value">{{ formatDate(user.registered.date) }}</span>
                  </div>
                </div>
              </div>

              <div class="detail-section">
                <h3>地址信息</h3>
                <div class="address-info">
                  <p><strong>国家:</strong> {{ user.location.country }}</p>
                  <p><strong>城市:</strong> {{ user.location.city }}</p>
                  <p><strong>州/省:</strong> {{ user.location.state }}</p>
                  <p><strong>街道:</strong> {{ user.location.street.name }} {{ user.location.street.number }}</p>
                  <p><strong>邮编:</strong> {{ user.location.postcode }}</p>
                </div>
              </div>

              <div class="detail-section">
                <h3>账户信息</h3>
                <div class="account-info">
                  <p><strong>用户名:</strong> {{ user.login.username }}</p>
                  <p><strong>UUID:</strong> {{ user.login.uuid }}</p>
                </div>
              </div>
            </div>

            <div class="user-actions">
              <button @click="handleRefreshUser" class="refresh-user-btn">
                🔄 换一个用户
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// SEO配置
useHead({
  title: '个人中心 - 在线商城',
  meta: [
    { name: 'description', content: '在线商城个人中心，查看个人信息、订单记录和账户设置。' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// 用户数据接口
interface User {
  name: {
    first: string
    last: string
  }
  email: string
  phone: string
  picture: {
    large: string
  }
  location: {
    country: string
    city: string
    state: string
    street: {
      name: string
      number: number
    }
    postcode: string
  }
  dob: {
    age: number
    date: string
  }
  registered: {
    date: string
  }
  gender: string
  login: {
    username: string
    uuid: string
  }
}

// Random User API 响应接口
interface RandomUserResponse {
  results: User[]
}

// 用户相关状态
const { data: userData, pending: userPending, error: userError, refresh: refreshUser } = await useFetch<RandomUserResponse>('https://randomuser.me/api/')

// 从API响应中提取用户数据
const user = computed(() => userData.value?.results?.[0])

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 刷新用户数据的处理函数
const handleRefreshUser = () => {
  refreshUser()
}

// 返回上一页
const goBack = () => {
  navigateTo('/')
}
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

.user-profile-page {
  min-height: 100vh;
  background: $bg-light;
}

.simple-navbar {
  background: white;
  box-shadow: $shadow;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.simple-navbar .nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.back-btn {
  background: $primary-color;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: $secondary-color;
    transform: translateY(-1px);
  }
}

.main-content {
  padding: 24px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.back-section {
  margin-bottom: 24px;
}

.user-section {
  margin-bottom: 24px;
}

.user-loading {
  background: white;
  padding: 40px;
  border-radius: $border-radius;
  box-shadow: $shadow;
  text-align: center;
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

.user-error {
  background: white;
  padding: 40px;
  border-radius: $border-radius;
  box-shadow: $shadow;
  text-align: center;
  color: #d32f2f;

  p {
    margin: 0 0 16px 0;
    font-size: 16px;
  }

  .refresh-btn {
    background: $primary-color;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;

    &:hover {
      background: $secondary-color;
    }
  }
}

.user-profile-card {
  background: white;
  border-radius: $border-radius;
  box-shadow: $shadow;
  overflow: hidden;
}

.user-header {
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  color: white;
  padding: 40px;
  text-align: center;

  .user-avatar {
    margin-bottom: 20px;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid rgba(255, 255, 255, 0.3);
    }
  }

  .user-basic-info {
    h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
      font-weight: 600;
    }

    .user-email {
      margin: 0 0 4px 0;
      font-size: 16px;
      opacity: 0.9;
    }

    .user-phone {
      margin: 0;
      font-size: 14px;
      opacity: 0.8;
    }
  }
}

.user-details {
  padding: 40px;

  .detail-section {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }

    h3 {
      margin: 0 0 16px 0;
      font-size: 18px;
      color: $text-color;
      font-weight: 600;
      border-bottom: 2px solid $primary-color;
      padding-bottom: 8px;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: $bg-light;
      border-radius: 6px;

      .label {
        font-weight: 600;
        color: $text-color;
      }

      .value {
        color: $text-light;
      }
    }

    .address-info, .account-info {
      p {
        margin: 0 0 8px 0;
        padding: 8px 0;
        border-bottom: 1px solid $border-color;

        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        strong {
          color: $text-color;
          margin-right: 8px;
        }
      }
    }
  }
}

.user-actions {
  padding: 24px 40px;
  background: $bg-light;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;

  .refresh-user-btn, .back-to-shop-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .refresh-user-btn {
    background: $primary-color;
    color: white;

    &:hover {
      background: $secondary-color;
      transform: translateY(-1px);
    }
  }

  .back-to-shop-btn {
    background: white;
    color: $text-color;
    border: 1px solid $border-color;

    &:hover {
      background: $bg-light;
      border-color: $primary-color;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .simple-navbar .nav-container {
    padding: 0 16px;
  }
  
  .nav-logo .logo-text {
    display: none;
  }

  .container {
    padding: 0 16px;
  }

  .user-header {
    padding: 24px 20px;

    .user-avatar img {
      width: 80px;
      height: 80px;
    }

    .user-basic-info h1 {
      font-size: 24px;
    }
  }

  .user-details {
    padding: 24px 20px;

    .detail-grid {
      grid-template-columns: 1fr;
    }
  }

  .user-actions {
    padding: 20px;
    flex-direction: column;

    .refresh-user-btn, .back-to-shop-btn {
      width: 100%;
      justify-content: center;
    }
  }
}
</style> 