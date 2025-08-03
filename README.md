# 🛒 在线商城 - Nuxt.js 项目

一个基于 Nuxt4.js 构建的现代化在线商城，具有完整的商品展示、购物车管理和响应式设计功能。

## ✨ 功能特性

### 🛍️ 商品管理
- **商品展示**：美观的商品卡片布局，支持图片、价格、评分显示
- **商品搜索**：实时搜索功能，支持关键词匹配
- **分类筛选**：按商品分类（电子产品、服装、图书、家居）筛选
- **价格筛选**：按价格区间筛选商品
- **排序功能**：支持按价格、评分等多种方式排序
- **分页加载**：支持分页显示，提升性能

### 🛒 购物车功能
- **添加商品**：一键添加商品到购物车
- **数量管理**：动态调整商品数量
- **删除商品**：移除购物车中的商品
- **清空购物车**：一键清空所有商品
- **实时统计**：显示商品总数和总价
- **侧边栏设计**：美观的购物车侧边栏界面

### 📱 响应式设计
- **移动端优化**：完美适配手机、平板设备
- **导航栏适配**：移动端友好的导航栏设计
- **购物车优化**：移动端购物车高度和交互优化
- **触摸友好**：针对触摸设备优化的交互体验

### 🔧 技术特性
- **模拟数据系统**：完整的模拟数据，无需数据库
- **API 接口**：RESTful API 设计
- **状态管理**：Vue 3 Composition API
- **类型安全**：TypeScript 支持
- **SEO 优化**：搜索引擎友好的页面结构

## 🛠️ 技术栈

- **前端框架**：Nuxt.js
- **UI 框架**：Vue 3 + Composition API
- **开发语言**：TypeScript
- **样式处理**：SCSS
- **构建工具**：Vite
- **代码规范**：ESLint + Prettier
- **包管理器**：pnpm

## 📁 项目结构

```
nuxt-project/
├── app/                    # 应用主目录
│   ├── components/         # Vue 组件
│   │   ├── Navbar.vue     # 导航栏组件
│   │   ├── ShoppingCart.vue # 购物车组件
│   │   ├── ProductCard.vue # 商品卡片组件
│   │   └── Breadcrumb.vue # 面包屑导航
│   ├── pages/             # 页面文件
│   │   ├── index.vue      # 首页（商品列表）
│   │   ├── user-profile.vue # 用户中心
│   │   ├── test-mock.vue  # 模拟数据测试页
│   │   └── test-navbar.vue # 导航栏测试页
│   └── app.vue            # 主应用文件
├── server/                # 服务端 API
│   ├── api/               # API 路由
│   │   ├── products.get.ts # 商品列表 API
│   │   ├── products/[id].get.ts # 商品详情 API
│   │   ├── cart.get.ts    # 购物车查询 API
│   │   ├── cart.post.ts   # 添加购物车 API
│   │   ├── cart.put.ts    # 更新购物车 API
│   │   ├── cart.delete.ts # 删除购物车 API
│   │   └── cart/clear.post.ts # 清空购物车 API
│   └── utils/             # 工具函数
│       └── mockData.ts    # 模拟数据管理
├── composables/           # 组合式函数
│   ├── useApi.ts         # API 调用封装
│   └── useCart.ts        # 购物车状态管理
├── public/                # 静态资源
│   ├── favicon.ico       # 网站图标
│   └── robots.txt        # 搜索引擎配置
├── nuxt.config.ts        # Nuxt 配置文件
├── package.json          # 项目依赖配置
├── vercel.json          # Vercel 部署配置
├── netlify.toml         # Netlify 部署配置
└── README.md            # 项目说明文档
```

## 🚀 快速开始

### 环境要求
- Node.js 18.0.0 或更高版本
- pnpm 8.0.0 或更高版本

### 安装依赖
```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发环境
```bash
# 启动开发服务器
pnpm dev

# 或
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
# 构建应用
pnpm build

# 预览生产版本
pnpm preview
```

## 🌐 部署指南

### Vercel 部署（推荐）

1. **准备代码**
   ```bash
   git add .
   git commit -m "准备部署"
   git push origin main
   ```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 选择你的仓库
   - 点击 "Deploy"

3. **自动部署**
   - Vercel 会自动检测 Nuxt.js 项目
   - 使用项目中的 `vercel.json` 配置
   - 部署完成后获得免费域名

## 🎯 功能演示

### 测试页面
- **模拟数据测试**：`/test-mock` - 测试 API 接口和模拟数据
- **导航栏测试**：`/test-navbar` - 测试响应式导航栏
- **用户中心**：`/user-profile` - 用户个人中心页面

### 主要功能
1. **商品浏览**：首页展示商品列表，支持筛选和搜索
2. **购物车管理**：添加、删除、修改商品数量
3. **响应式设计**：完美适配各种设备尺寸
4. **实时交互**：流畅的用户交互体验

## 🔧 开发指南

### 代码规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 Vue 3 Composition API 最佳实践

### 添加新功能
1. 在 `app/components/` 中创建新组件
2. 在 `app/pages/` 中创建新页面
3. 在 `server/api/` 中添加新的 API 接口
4. 在 `composables/` 中添加可复用的逻辑

### 模拟数据管理
- 所有模拟数据在 `server/utils/mockData.ts` 中管理
- 支持商品、用户、订单等数据结构
- 可以轻松扩展和修改数据

## 🐛 常见问题

### 构建失败
- 确保 Node.js 版本 >= 18.0.0
- 检查依赖是否正确安装
- 查看构建日志获取详细错误信息

### API 接口不工作
- 确保 `server/api/` 目录存在
- 检查路由配置是否正确
- 验证请求参数格式

### 移动端显示问题
- 检查 CSS 媒体查询配置
- 确保响应式设计正确实现
- 测试不同设备尺寸

## 📄 许可证

本项目采用 MIT 许可证。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件至项目维护者