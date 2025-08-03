// const config = useAppConfig()
export default defineAppConfig({
  // SEO 配置
  seo: {
    // 应用名称
    title: '在线商城',
    
    // 应用描述
    description: '发现优质商品，享受优惠价格。电子产品、服装、图书、家居用品，一站式购物体验。',
    
    // 默认 meta 标签
    meta: {
      viewport: 'width=device-width, initial-scale=1',
      robots: 'index, follow'
    },
    
    // 默认 Open Graph 标签
    og: {
      type: 'website',
      siteName: '在线商城'
    }
  },
  
  // 主题配置
  theme: {
    // 深色模式
    dark: true,
    // 主题颜色
    colors: {
      primary: '#ff6b35', // 使用你的主题色
      secondary: '#e55a2b',
      accent: '#F59E0B'
    }
  },
}) 