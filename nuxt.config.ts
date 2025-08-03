// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 兼容性日期
  compatibilityDate: '2025-07-15',
  
  // 模块
  modules: [
    // 暂时移除图标模块
  ],
  
  // SEO配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '在线商城',
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#ff6b35' },
        { name: 'description', content: '现代化的在线商城，提供优质商品和便捷购物体验' },
        { name: 'keywords', content: '在线商城,购物,商品,电商' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // 环境覆盖 要在运行 Nuxt CLI 命令时选择环境，只需将名称传递给 --envName 标志，如下所示：nuxt build --envName staging
  // ISR 是 Nuxt 3 的一个强大功能，它结合了静态生成 (SSG) 和服务端渲染 (SSR) 的优点
  $production: {
    routeRules: {
      '/**': { isr: true }  // 生产环境：性能优先
    }
  },
  $development: {
    // 开发环境：实时调试
  },
  $env: {
    staging: {
      routeRules: {
        '/**': { isr: false }  // 测试环境：实时反馈
      },
      // 可以添加其他测试环境配置
      nitro: {
        debug: true
      }
    }
  },
  
  // 配置  const config = useRuntimeConfig()
  runtimeConfig: {
    // 服务端私有配置
    apiSecret: process.env.API_SECRET || '123',
    // 客户端可访问的公共配置
    public: {
      apiBase: process.env.API_BASE || '/api'
    }
  },
  
  // 构建优化
  nitro: {
    compressPublicAssets: true,
    minify: true
  },
  
  // 开发工具
  devtools: {
    enabled: process.env.NODE_ENV === 'development'
  }
})
