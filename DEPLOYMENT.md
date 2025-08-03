# 部署指南

本项目支持部署到多个免费平台，以下是详细的部署步骤。

## 🚀 推荐平台：Vercel（最推荐）

### 优点
- 完全免费
- 自动 HTTPS
- 全球 CDN
- 自动部署
- 完美支持 Nuxt.js

### 部署步骤

1. **准备项目**
   ```bash
   # 确保代码已提交到 GitHub
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
   - 部署完成后会获得一个域名

## 🌐 备选平台：Netlify

### 部署步骤

1. **准备项目**
   ```bash
   git add .
   git commit -m "准备部署到 Netlify"
   git push origin main
   ```

2. **连接 Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 使用 GitHub 账号登录
   - 点击 "New site from Git"
   - 选择你的仓库
   - 构建命令：`npm run build`
   - 发布目录：`.output/public`

## 🔧 本地测试部署

在部署前，建议先在本地测试构建：

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 📝 环境变量配置

如果项目需要环境变量，可以在部署平台设置：

### Vercel
- 项目设置 → Environment Variables
- 添加 `NODE_ENV=production`

### Netlify
- Site settings → Environment variables
- 添加 `NODE_ENV=production`

## 🐛 常见问题

### 1. 构建失败
- 检查 Node.js 版本（需要 18+）
- 确保所有依赖已安装
- 查看构建日志

### 2. API 路由不工作
- 确保 `server/api/` 目录存在
- 检查路由配置
- 验证 API 端点

### 3. 静态资源加载失败
- 检查 `public/` 目录
- 确保资源路径正确
- 验证构建输出

## 📊 性能优化建议

1. **图片优化**
   - 使用 WebP 格式
   - 压缩图片大小
   - 使用懒加载

2. **代码分割**
   - Nuxt.js 自动处理
   - 避免大型依赖

3. **缓存策略**
   - 利用 CDN 缓存
   - 设置合适的缓存头

## 🔒 安全注意事项

1. **API 安全**
   - 避免暴露敏感信息
   - 使用环境变量存储密钥
   - 实施适当的访问控制

2. **内容安全**
   - 验证用户输入
   - 防止 XSS 攻击
   - 使用 HTTPS

## 📞 技术支持

如果遇到部署问题：
1. 查看平台文档
2. 检查构建日志
3. 联系平台支持
4. 查看 GitHub Issues 