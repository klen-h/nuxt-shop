// 模拟数据存储
export interface Product {
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

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

// 商品数据
export const products: Product[] = [
  {
    id: 1,
    name: "无线蓝牙耳机",
    description: "高音质立体声，长续航，舒适佩戴",
    price: 199,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 128,
    category: "electronics"
  },
  {
    id: 2,
    name: "智能手表",
    description: "健康监测，运动追踪，来电提醒",
    price: 899,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 256,
    category: "electronics"
  },
  {
    id: 3,
    name: "休闲运动鞋",
    description: "轻便舒适，透气网面，适合日常运动",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 89,
    category: "clothing"
  },
  {
    id: 4,
    name: "经典小说集",
    description: "世界文学名著，精装典藏版",
    price: 68,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 156,
    category: "books"
  },
  {
    id: 5,
    name: "智能台灯",
    description: "护眼设计，可调光，触摸控制",
    price: 159,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 73,
    category: "home"
  },
  {
    id: 6,
    name: "智能手机",
    description: "高性能处理器，高清摄像头，长续航电池",
    price: 2999,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 342,
    category: "electronics"
  }
]

// 购物车数据（内存存储）
export let cartItems: CartItem[] = []

// 购物车操作方法
export const cartUtils = {
  // 添加商品到购物车
  addToCart(productId: number, quantity: number = 1): CartItem[] {
    const product = products.find(p => p.id === productId)
    if (!product) {
      throw new Error('商品不存在')
    }

    const existingItem = cartItems.find(item => item.id === productId)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      })
    }
    
    return cartItems
  },

  // 更新购物车商品数量
  updateCartItem(itemId: number, quantity: number): CartItem[] {
    const item = cartItems.find(item => item.id === itemId)
    if (!item) {
      throw new Error('购物车商品不存在')
    }

    if (quantity <= 0) {
      cartItems = cartItems.filter(item => item.id !== itemId)
    } else {
      item.quantity = quantity
    }
    
    return cartItems
  },

  // 删除购物车商品
  removeFromCart(itemId?: number): CartItem[] {
    if (itemId) {
      cartItems = cartItems.filter(item => item.id !== itemId)
    } else {
      cartItems = []
    }
    return cartItems
  },

  // 获取购物车统计信息
  getCartStats() {
    return {
      total: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }
  },

  // 清空购物车
  clearCart(): CartItem[] {
    cartItems = []
    return cartItems
  }
} 