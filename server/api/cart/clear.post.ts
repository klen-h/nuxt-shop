import { cartUtils } from '../../utils/mockData'

export default defineEventHandler(async (event) => {
  try {
    const updatedCart = cartUtils.clearCart()
    const stats = cartUtils.getCartStats()
    
    return {
      success: true,
      message: '购物车已清空',
      cartItems: updatedCart,
      ...stats
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : '清空失败'
    })
  }
}) 