
# 免费部署指南：使用 Vercel

如果您希望完全免费且永久使用，**Vercel** 是最佳选择（Next.js 的官方平台）。
Vercel 的 Hobby 套餐是**永久免费**的，不需要信用卡。

## 部署步骤

### 1. 注册 Vercel 账号
1. 访问 [Vercel 官网](https://vercel.com/signup)。
2. 点击 **Hobby** 这一列下的 **Continue with GitHub**。
3. 授权您的 GitHub 账号登录。

### 2. 导入项目
1. 登录后，点击 **Add New...** -> **Project**。
2. 在左侧的 **Import Git Repository** 列表中，找到您的仓库 `neon-music` (或者 `lingqingmusic`)。
3. 点击 **Import** 按钮。

### 3. 配置并部署
1. **Framework Preset**: 保持默认 (Next.js)。
2. **Root Directory**: 保持默认 (./)。
3. **Environment Variables**: 暂时不需要添加。
4. 点击蓝色的 **Deploy** 按钮。

### 4. 等待完成
* Vercel 会自动开始构建，大概需要 1-2 分钟。
* 构建完成后，屏幕上会撒花，并显示您的网站截图。
* 点击截图或 **Visit** 按钮即可访问。

---

## 关于国内访问的重要提示

Vercel 默认提供的域名（`*.vercel.app`）在国内大部分地区是被 DNS 污染无法直接访问的（需要挂梯子）。

**解决方法（完全免费）：**
如果您想让国内朋友直接访问，建议绑定一个您自己的域名。
1. 在 Vercel 项目页面点击 **Settings** -> **Domains**。
2. 输入您的域名（例如 `music.yourname.com`）。
3. 按照提示去您的域名服务商添加一条 CNAME 记录指向 `cname.vercel-dns.com`。
4. 添加后，国内即可流畅访问。

**如果没有域名怎么办？**
您可以尝试 **Netlify**，虽然也可能不稳定，但有时比 Vercel 好一点点。操作流程与 Vercel 几乎一样：
1. 访问 [Netlify](https://www.netlify.com/)。
2. Log in with GitHub。
3. Add new site -> Import from existing project -> GitHub。
4. 选择仓库 -> Deploy。
