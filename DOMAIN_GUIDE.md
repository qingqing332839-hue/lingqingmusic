
# Vercel 国内访问解决方案：绑定自定义域名

由于 `*.vercel.app` 域名在国内大部分地区被 DNS 污染无法直接访问，最稳妥、成本最低的解决方案是**绑定一个您自己的域名**。

## 第一步：购买域名（如果您还没有）

如果您还没有域名，需要先购买一个。
*   **推荐注册商**：[NameSilo](https://www.namesilo.com/), [GoDaddy](https://www.godaddy.com/), [Namecheap](https://www.namecheap.com/)。
*   **价格**：普通 `.com` 域名约 60-80 元/年；冷门后缀（如 `.xyz`, `.top`）首年可能只需 10-20 元甚至更低。
*   **注意**：如果您使用的是 Vercel（服务器在海外），**不需要备案** (ICP备案)。只有使用国内服务器（阿里云/腾讯云国内机房）才强制要求备案。

## 第二步：在 Vercel 添加域名

1.  登录 [Vercel 控制台](https://vercel.com/dashboard)。
2.  点击您的项目 `neon-music` (或 `lingqingmusic`)。
3.  点击顶部的 **Settings** (设置) 选项卡。
4.  点击左侧菜单的 **Domains** (域名)。
5.  在输入框中输入您想使用的域名（例如 `music.yourname.com` 或 `www.yourname.com`）。
6.  点击 **Add**。

## 第三步：配置 DNS 解析 (在域名购买处)

Vercel 会提示您配置 DNS 记录。通常有两种情况：

### 情况 A：绑定子域名 (推荐，如 `music.baidu.com`)
1.  登录您的域名管理后台（哪里买的去哪里）。
2.  找到 **DNS 解析** 或 **DNS Management**。
3.  添加一条记录：
    *   **类型 (Type)**: `CNAME`
    *   **主机记录 (Name/Host)**: `music` (或者您想要的前缀)
    *   **记录值 (Value/Target)**: `cname.vercel-dns.com`
    *   **TTL**: 默认即可 (如 10分 或 3600)

### 情况 B：绑定主域名 (如 `baidu.com`)
1.  添加一条记录：
    *   **类型 (Type)**: `A`
    *   **主机记录 (Name/Host)**: `@`
    *   **记录值 (Value)**: `76.76.21.21` (这是 Vercel 的官方 IP)

## 第四步：等待生效

1.  回到 Vercel 的 Domains 页面。
2.  它会自动检测 DNS 记录。
3.  一旦两条勾选变绿（Valid Configuration），您的网站就可以通过新域名在国内流畅访问了！
    *   *提示：全球 DNS 生效可能需要几分钟到几小时不等，通常几分钟内即可。*

---

## 常见问题

**Q: 我不想花钱买域名，有免费的吗？**
A: 市面上有免费域名（如 `.tk`, `.ml`），但非常不稳定，随时可能被收回或被墙，不推荐长期使用。
如果您实在不想花钱，可以尝试迁移到 **Zeabur** (提供 `zeabur.app` 域名，国内目前可用)，但 Zeabur 的免费额度有限。

**Q: 绑定域名后还需要梯子吗？**
A: 不需要。绑定自定义域名后，Vercel 的内容会通过优选线路传输，国内可以直接打开。
