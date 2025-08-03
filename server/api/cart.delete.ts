import { cartUtils } from '../utils/mockData'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  const { itemId } = query
  
  try {
    const updatedCart = cartUtils.removeFromCart(itemId ? Number(itemId) : undefined)
    const stats = cartUtils.getCartStats()
    
    return {
      success: true,
      cartItems: updatedCart,
      ...stats
    }
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: error instanceof Error ? error.message : '删除失败'
    })
  }
}) 