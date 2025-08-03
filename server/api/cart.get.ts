import { cartItems, cartUtils } from '../utils/mockData'

export default defineEventHandler(async (event) => {
  const stats = cartUtils.getCartStats()
  
  return {
    cartItems,
    ...stats
  }
}) 