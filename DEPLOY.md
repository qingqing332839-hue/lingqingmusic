
# 部署指南 (Deployment Guide)

本项目是一个基于 Next.js 的全栈应用，使用了 Serverless API (API Routes) 进行数据抓取和代理。因此，它**不能**部署为纯静态网站（如 GitHub Pages 或 Gitee Pages），必须部署在支持 Node.js 运行环境的 Serverless 平台上。

以下是两种推荐的免费部署方案，均支持国内访问（视网络情况而定）。

## 方案一：使用 Vercel (推荐，最稳定)

Vercel 是 Next.js 的官方部署平台，体验最佳。

### 步骤：

1.  **准备 GitHub 仓库**：
    *   在 GitHub 上创建一个新仓库（例如 `neon-music`）。
    *   将本地代码推送到该仓库：
        ```bash
        git init
        git add .
        git commit -m "Initial commit"
        git branch -M main
        git remote add origin https://github.com/你的用户名/neon-music.git
        git push -u origin main
        ```

2.  **在 Vercel 导入项目**：
    *   访问 [Vercel官网](https://vercel.com) 并使用 GitHub 账号登录。
    *   点击 "Add New..." -> "Project"。
    *   在列表中找到你的 `neon-music` 仓库，点击 "Import"。
    *   **配置**：
        *   Framework Preset: Next.js (默认)
        *   Root Directory: `./` (默认)
        *   点击 "Deploy"。

3.  **解决国内访问问题**：
    *   Vercel 分配的默认域名 `*.vercel.app` 在国内通常无法直接访问（被 DNS 污染）。
    *   **解决方法**：你需要绑定一个自己的域名（无需备案，只需在域名服务商处添加 CNAME 记录指向 `cname.vercel-dns.com`）。
    *   如果没有域名，可以尝试 **方案二**。

## 方案二：使用 Zeabur (国内访问较好)

Zeabur 是一个新兴的部署平台，对国内网络支持较好，且有免费额度。

### 步骤：

1.  **准备 GitHub 仓库**（同上）。

2.  **在 Zeabur 部署**：
    *   访问 [Zeabur官网](https://zeabur.com) 并登录。
    *   创建一个新项目。
    *   点击 "Deploy New Service" -> "GitHub"。
    *   选择你的 `neon-music` 仓库。
    *   Zeabur 会自动识别 Next.js 项目并开始构建。

3.  **绑定域名**：
    *   Zeabur 会提供一个 `*.zeabur.app` 的免费域名。
    *   该域名目前在国内大部分地区可以直接访问。
    *   你也可以在 Zeabur 设置中绑定自定义域名。

## 方案三：使用 Docker (进阶)

如果你有自己的服务器（如腾讯云/阿里云轻量应用服务器），可以使用 Docker 部署。

1.  **构建镜像**：
    在项目根目录创建 `Dockerfile`：

    ```dockerfile
    FROM node:18-alpine AS base

    # Install dependencies only when needed
    FROM base AS deps
    WORKDIR /app
    COPY package.json package-lock.json ./
    RUN npm ci

    # Rebuild the source code only when needed
    FROM base AS builder
    WORKDIR /app
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    RUN npm run build

    # Production image, copy all the files and run next
    FROM base AS runner
    WORKDIR /app
    ENV NODE_ENV production
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static

    EXPOSE 3000
    ENV PORT 3000
    CMD ["node", "server.js"]
    ```

2.  **修改 `next.config.mjs`**：
    添加 `output: 'standalone'`：
    ```javascript
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      output: 'standalone',
    };
    export default nextConfig;
    ```

3.  **运行**：
    ```bash
    docker build -t neon-music .
    docker run -p 3000:3000 neon-music
    ```

---

**注意**：
本项目依赖第三方音乐源接口（网易云/酷狗），部署在海外服务器（如 Vercel）时，可能会因为 IP 地区限制导致部分歌曲无法播放（虽然我们在代码中伪造了 Header，但 IP 是无法伪造的）。如果遇到版权限制，建议使用国内服务器部署（方案三）。
