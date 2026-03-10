
# 使用 GitHub Desktop (Mac) 上传代码指南

既然你已经安装了 GitHub Desktop Mac 版，上传代码非常简单。请按照以下步骤操作：

## 第一步：添加本地仓库

1. 打开 **GitHub Desktop** 应用。
2. 点击菜单栏的 **File** -> **Add Local Repository...** (或者快捷键 `Command + O`)。
3. 在弹出的窗口中，点击 **Choose...** 按钮。
4. 选择你的项目文件夹路径：
   `/Users/zemin/Desktop/trae项目/neon-music`
5. 点击 **Add Repository**。

## 第二步：提交更改 (Commit)

1. 添加成功后，你会看到左侧边栏列出了所有更改的文件（Changes）。
2. 在左下角的 **Summary (Required)** 输入框中，填写提交说明，例如："更新：修复播放问题并准备部署"。
3. 点击蓝色的 **Commit to master** 按钮。

## 第三步：推送到 GitHub (Push)

1. 提交完成后，点击顶部工具栏右侧的 **Push origin** 按钮。
   - **注意**：如果这是你第一次推送，或者是新仓库，按钮可能显示为 **Publish repository**。
   - 如果显示 **Publish repository**，点击它，确保取消勾选 "Keep this code private"（如果你希望代码公开），然后点击 **Publish Repository**。

## 第四步：部署上线 (连接 Vercel/Zeabur)

代码推送到 GitHub 后，你的项目就已经在线上了（代码层面）。接下来让它变成可访问的网站：

### 方式 A：使用 Zeabur (推荐，简单)
1. 访问 [Zeabur Dashboard](https://dash.zeabur.com)。
2. 点击 **New Project** -> **Deploy New Service** -> **GitHub**。
3. 在列表中选择你刚刚推送的 `neon-music` (或 `lingqingmusic`) 仓库。
4. 等待自动部署完成，获得免费域名。

### 方式 B：使用 Vercel (稳定)
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)。
2. 点击 **Add New...** -> **Project**。
3. 在 "Import Git Repository" 中找到你的仓库并点击 **Import**。
4. 点击 **Deploy**。

---

**常见问题：**
- **如果推送失败（Permission denied）**：说明你可能没有该仓库的权限。
  - 解决方法：在 GitHub Desktop 菜单栏点击 **Repository** -> **Repository Settings** -> **Remote**，修改为你自己的 GitHub 仓库地址（你需要先在 GitHub 网页上创建一个空仓库）。
