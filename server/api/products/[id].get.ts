import { products } from '../../utils/mockData'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  
  const product = products.find(p => p.id === id)
  
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: '商品不存在'
    })
  }
  
  return {
    product
  }
}) 