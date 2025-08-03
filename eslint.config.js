// 导入 ESLint 的 FlatCompat 工具，用于兼容旧的配置格式
import { FlatCompat } from '@eslint/eslintrc'
// 导入 ESLint 推荐的 JavaScript 配置
import js from '@eslint/js'
// 导入 Node.js 的 path 模块
import path from 'path'
// 导入 Node.js 的 fileURLToPath 函数，用于处理 ES 模块的 __dirname
import { fileURLToPath } from 'node:url'

// 获取当前文件的路径（ES 模块中 __filename 的替代方案）
const __filename = fileURLToPath(import.meta.url)
// 获取当前文件所在的目录路径（ES 模块中 __dirname 的替代方案）
const __dirname = path.dirname(__filename)

// 创建 FlatCompat 实例，用于将旧的 ESLint 配置转换为新的扁平配置格式
const compat = new FlatCompat({
  baseDirectory: __dirname, // 设置基础目录为当前目录
  recommendedConfig: js.configs.recommended // 使用 ESLint 推荐的配置作为基础
})

// 导出 ESLint 配置数组
export default [
  // 扩展 Nuxt 的默认 ESLint 配置
  // 这包含了 Vue 3、TypeScript、Nuxt 特定的规则
  ...compat.extends('@nuxt/eslint-config'),
  
  // 添加 Prettier 配置，禁用与 Prettier 冲突的 ESLint 规则
  ...compat.extends('eslint-config-prettier'),
  
  // 自定义配置对象
  {
    // 指定应用规则的文件类型
    files: ['**/*.{js,ts,vue}'], // 匹配所有 .js、.ts、.vue 文件
    plugins: {
      // 添加 Prettier 插件
      prettier: (await import('eslint-plugin-prettier')).default
    },
    rules: {
      // 启用 Prettier 规则
      'prettier/prettier': 'error',
      // 可以在这里添加自定义规则
      // 例如：
      // 'no-console': 'warn', // 警告使用 console
      // 'prefer-const': 'error', // 强制使用 const
    }
  }
] 