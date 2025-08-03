import { cartUtils } from '../utils/mockData'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const { itemId, quantity } = body
  
  try {
    const updatedCart = cartUtils.updateCartItem(itemId, quantity)
    const stats = cartUtils.getCartStats()
    
    return {
      success: true,
      cartItems: updatedCart,
      ...stats
    }
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: error instanceof Error ? error.message : '更新失败'
    })
  }
}) 