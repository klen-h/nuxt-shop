// API 响应类型定义
interface ProductsResponse {
  products: Array<{
    id: number
    name: string
    description: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviews: number
    category: string
  }>
  total: number
  page: number
  limit: number
  totalPages: number
}

interface CartResponse {
  cartItems: Array<{
    id: number
    name: string
    price: number
    image: string
    quantity: number
  }>
  total: number
  subtotal: number
}

interface AddToCartResponse {
  success: boolean
  message: string
  cartItems: CartResponse['cartItems']
}

// API 服务层
export const useApi = () => {
  // 获取商品列表
  const getProducts = async (params?: {
    search?: string
    category?: string
    priceRange?: string
    sortBy?: string
    page?: number
    limit?: number
  }): Promise<ProductsResponse> => {
    const query = new URLSearchParams()
    
    if (params?.search) query.append('search', params.search)
    if (params?.category) query.append('category', params.category)
    if (params?.priceRange) query.append('priceRange', params.priceRange)
    if (params?.sortBy) query.append('sortBy', params.sortBy)
    if (params?.page) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())
    
    return await $fetch(`/api/products?${query.toString()}`)
  }
  
  // 添加商品到购物车
  const addToCart = async (productId: number, quantity: number = 1): Promise<AddToCartResponse> => {
    return await $fetch('/api/cart', {
      method: 'POST',
      body: { productId, quantity }
    })
  }
  
  // 获取购物车
  const getCart = async (): Promise<CartResponse> => {
    return await $fetch('/api/cart')
  }
  
  // 更新购物车商品数量
  const updateCartItem = async (itemId: number, quantity: number): Promise<CartResponse> => {
    return await $fetch('/api/cart', {
      method: 'PUT',
      body: { itemId, quantity }
    })
  }
  
  // 删除购物车商品
  const removeCartItem = async (itemId: number): Promise<CartResponse> => {
    return await $fetch(`/api/cart?itemId=${itemId}`, {
      method: 'DELETE'
    })
  }
  
  // 清空购物车
  const clearCart = async (): Promise<CartResponse> => {
    return await $fetch('/api/cart', {
      method: 'DELETE'
    })
  }
  
  return {
    getProducts,
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
  }
} 