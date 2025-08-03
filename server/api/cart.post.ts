import { cartUtils } from '../utils/mockData'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const { productId, quantity = 1 } = body
  
  try {
    const updatedCart = cartUtils.addToCart(productId, quantity)
    const stats = cartUtils.getCartStats()
    
    return {
      success: true,
      message: `商品已添加到购物车`,
      cartItems: updatedCart,
      ...stats
    }
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: error instanceof Error ? error.message : '添加失败'
    })
  }
}) 