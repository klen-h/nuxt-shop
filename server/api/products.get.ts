import { products } from '../utils/mockData'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  let filteredProducts = [...products]
  
  // 搜索过滤
  if (query.search) {
    const searchTerm = query.search.toString().toLowerCase()
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    )
  }
  
  // 分类过滤
  if (query.category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === query.category
    )
  }
  
  // 价格过滤
  if (query.priceRange) {
    const range = query.priceRange.toString().split('-')
    const min = Number(range[0])
    const max = range[1] ? Number(range[1]) : undefined
    
    filteredProducts = filteredProducts.filter(product => {
      if (max !== undefined) {
        return product.price >= min && product.price <= max
      } else {
        return product.price >= min
      }
    })
  }
  
  // 排序
  if (query.sortBy) {
    switch (query.sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
    }
  }
  
  // 分页
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10
  const start = (page - 1) * limit
  const end = start + limit
  
  const paginatedProducts = filteredProducts.slice(start, end)
  
  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit,
    totalPages: Math.ceil(filteredProducts.length / limit)
  }
}) 