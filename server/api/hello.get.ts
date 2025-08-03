// 这是一个简单的 API 示例
// 访问 /api/hello 会返回这个数据

export default defineEventHandler(async (event) => {
  // 获取查询参数
  const query = getQuery(event)
  
  // 获取请求头
  const headers = getHeaders(event)
  
  // 返回数据
  return {
    message: 'Hello from Nuxt Server!',
    timestamp: new Date().toISOString(),
    query,
    userAgent: headers['user-agent']
  }
}) 