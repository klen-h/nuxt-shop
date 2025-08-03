# 模拟数据系统说明

这个项目实现了一个完整的模拟数据系统，无需数据库即可进行开发和测试。

## 🎯 功能特性

### 商品管理
- ✅ 商品列表获取（支持分页、搜索、分类过滤、价格过滤、排序）
- ✅ 单个商品详情获取
- ✅ 模拟商品数据（6个示例商品）

### 购物车功能
- ✅ 添加商品到购物车
- ✅ 更新商品数量
- ✅ 删除购物车商品
- ✅ 清空购物车
- ✅ 购物车统计（总数、总价）
- ✅ 购物车侧边栏（已修复高度问题）

## 🔧 最近修复

### 购物车高度问题修复
- **问题**：购物车组件使用 `height: 100vh` 导致遮挡下方操作区域
- **解决方案**：
  - 将购物车组件高度改为 `max-height: 80vh`
  - 将购物车侧边栏高度改为 `max-height: 100vh`
  - 添加 `overflow: hidden` 和 `overflow-y: auto` 确保内容可滚动
  - 移动端使用 `max-height: 90vh` 提供更好的体验

### 移动端导航栏修复
- **问题**：在手机屏幕下，购物车按钮和个人中心按钮被隐藏
- **解决方案**：
  - 移除了 `.nav-menu { display: none; }` 样式
  - 优化了移动端的按钮大小和间距
  - 调整了搜索框在移动端的宽度
  - 添加了超小屏幕（≤480px）的专门样式
  - 优化了导航栏高度在不同屏幕尺寸下的显示

## 📁 文件结构

```
server/
├── utils/
│   └── mockData.ts          # 统一的数据存储和工具函数
├── api/
│   ├── products.get.ts      # 获取商品列表
│   ├── products/[id].get.ts # 获取单个商品
│   ├── cart.get.ts          # 获取购物车
│   ├── cart.post.ts         # 添加商品到购物车
│   ├── cart.put.ts          # 更新购物车商品
│   ├── cart.delete.ts       # 删除购物车商品
│   └── cart/
│       └── clear.post.ts    # 清空购物车
composables/
└── useCart.ts              # 购物车组合式函数
app/
├── components/
│   ├── Navbar.vue         # 导航栏组件（已修复移动端问题）
│   └── ShoppingCart.vue   # 购物车组件（已修复高度问题）
└── pages/
    ├── test-mock.vue      # 模拟数据测试页面
    └── test-navbar.vue    # 导航栏测试页面
```

## 🚀 使用方法

### 1. 启动项目
```bash
npm run dev
# 或
pnpm dev
```

### 2. 访问测试页面
打开浏览器访问：
- 模拟数据测试：`http://localhost:3000/test-mock`
- 导航栏测试：`http://localhost:3000/test-navbar`

### 3. API 接口

#### 商品相关
```typescript
// 获取商品列表
GET /api/products
GET /api/products?search=耳机&category=electronics&priceRange=100-500&sortBy=price-asc&page=1&limit=10

// 获取单个商品
GET /api/products/1
```

#### 购物车相关
```typescript
// 获取购物车
GET /api/cart

// 添加商品到购物车
POST /api/cart
{
  "productId": 1,
  "quantity": 2
}

// 更新购物车商品数量
PUT /api/cart
{
  "itemId": 1,
  "quantity": 3
}

// 删除购物车商品
DELETE /api/cart?itemId=1

// 清空购物车
POST /api/cart/clear
```

### 4. 在前端使用

#### 使用组合式函数
```vue
<script setup>
const { cart, loading, total, subtotal, addToCart, removeFromCart } = useCart()

// 页面加载时获取购物车数据
onMounted(() => {
  fetchCart()
})

// 添加商品到购物车
const handleAddToCart = async (productId) => {
  try {
    await addToCart(productId, 1)
    alert('添加成功！')
  } catch (error) {
    alert('添加失败！')
  }
}
</script>
```

#### 直接调用API
```vue
<script setup>
const cart = ref([])
const loading = ref(false)

const fetchCart = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/cart')
    cart.value = data.cartItems || []
  } catch (error) {
    console.error('获取购物车失败:', error)
  } finally {
    loading.value = false
  }
}
</script>
```

## 📊 数据结构

### 商品数据结构
```typescript
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
```

### 购物车商品数据结构
```typescript
interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}
```

## 🔧 自定义数据

### 添加新商品
在 `server/utils/mockData.ts` 中的 `products` 数组中添加新商品：

```typescript
{
  id: 7,
  name: "新商品名称",
  description: "商品描述",
  price: 299,
  originalPrice: 399,
  image: "https://example.com/image.jpg",
  rating: 4.5,
  reviews: 100,
  category: "electronics"
}
```

### 修改商品数据
直接编辑 `server/utils/mockData.ts` 中的商品数据即可。

## ⚠️ 注意事项

1. **数据持久化**：当前数据存储在内存中，服务器重启后数据会丢失
2. **并发安全**：这是一个简单的模拟系统，不支持多用户并发操作
3. **生产环境**：仅适用于开发和测试，生产环境请使用真实数据库

## 🎨 扩展功能

### 添加用户系统
```typescript
// 在 mockData.ts 中添加用户数据
export const users = [
  {
    id: 1,
    username: 'test',
    password: '123456',
    email: 'test@example.com'
  }
]
```

### 添加订单系统
```typescript
// 在 mockData.ts 中添加订单数据
export const orders = []
export const orderUtils = {
  createOrder(userId: number, cartItems: CartItem[]) {
    // 创建订单逻辑
  }
}
```

### 添加商品分类
```typescript
// 在 mockData.ts 中添加分类数据
export const categories = [
  { id: 'electronics', name: '电子产品' },
  { id: 'clothing', name: '服装' },
  { id: 'books', name: '图书' },
  { id: 'home', name: '家居' }
]
```

## 🐛 故障排除

### 常见问题

1. **API 返回 404**
   - 检查文件路径是否正确
   - 确保 Nuxt 服务器正在运行

2. **数据不同步**
   - 确保所有 API 都使用 `server/utils/mockData.ts` 中的数据
   - 检查是否有重复的数据定义

3. **TypeScript 错误**
   - 确保类型定义正确
   - 检查导入语句

### 调试技巧

1. 使用浏览器开发者工具查看网络请求
2. 在 `server/utils/mockData.ts` 中添加 `console.log` 进行调试
3. 使用测试页面 `/test-mock` 验证功能

## 📝 更新日志

- **v1.0.0**: 初始版本，实现基础的商品和购物车功能
- 支持商品列表、搜索、过滤、排序
- 支持购物车的增删改查操作
- 提供完整的测试页面 