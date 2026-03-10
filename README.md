
# Neon Music 🎵

一个基于 Next.js 的现代化在线音乐播放器，支持：
- **全平台响应式设计**：完美适配桌面端与移动端。
- **实时榜单**：同步主流音乐平台的最新热歌榜单。
- **智能搜索**：集成多源搜索（网易云/酷狗），自动过滤无效音源。
- **沉浸式播放**：支持歌词滚动、黑胶唱片旋转动画、背景模糊效果。
- **零本地存储**：所有数据实时获取，无需维护本地数据库。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI**: Tailwind CSS, Framer Motion, Lucide Icons
- **状态管理**: Zustand
- **数据获取**: Axios, Cheerio (服务端爬虫 & API 代理)

## 本地运行

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 访问 http://localhost:3000

## 部署

请查看 [DEPLOY.md](./DEPLOY.md) 获取详细部署指南。
如果你使用 GitHub Desktop，请查看 [GITHUB_DESKTOP_GUIDE.md](./GITHUB_DESKTOP_GUIDE.md)。
