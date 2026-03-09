# 部署指南（简单版）

别担心，那个 `<你的用户名>` 和 `<仓库地址>` 不需要你自己去猜，按照下面的步骤操作，你会直接得到它！

## 第一步：去 GitHub 创建仓库

1.  打开浏览器，访问这个链接：[https://github.com/new](https://github.com/new)
2.  **如果还没登录**：登录后，你看页面**左上角**或者**右上角头像旁边**，那个名字就是你的用户名。
3.  在 **Repository name**（仓库名称）这一栏里，输入 `neon-music`。
4.  其他的都不用动，直接滑到底部，点击绿色的 **Create repository** 按钮。

## 第二步：复制那个神秘的地址

创建成功后，页面会跳转。在这个新页面上，你会看到一个框框里写着类似 `https://github.com/xxxxxx/neon-music.git` 的链接。

**这个链接里 `github.com/` 后面的那个词（`xxxxxx`）就是你的用户名！**

**直接复制这个链接！** 它是最准的。

## 第三步：在 Trae 终端里粘贴

回到 Trae 编辑器，打开底部的终端（Terminal），依次输入下面的命令（每一行输完按回车）：

```bash
# 1. 初始化（如果之前没做过）
git init

# 2. 把所有文件装进“箱子”
git add .

# 3. 封箱（写个备注）
git commit -m "第一次提交"

# 4. 告诉 git 你的仓库在哪（关键一步！）
# 注意：把下面的 https://github.com/... 换成你刚才复制的那个链接
git remote add origin https://github.com/你的用户名/neon-music.git

# 5. 发射！
git branch -M main
git push -u origin main
```

**如果第 4 步报错说 "remote origin already exists"**，说明你之前可能设置过。输入这个命令删掉旧的，再重新执行第 4 步：
`git remote remove origin`

## 第四步：去 Vercel 上线

1.  打开 [Vercel](https://vercel.com/dashboard/new)。
2.  你应该能在列表中看到刚才上传的 `neon-music`。
3.  点击 **Import**，然后一路点 **Deploy**。
4.  等一两分钟，烟花绽放，你的网站就上线了！
