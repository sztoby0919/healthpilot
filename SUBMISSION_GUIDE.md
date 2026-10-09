# UnivaBio 2026 提交指南

## ⏰ 截止时间：10月13日 23:45 EDT（北京时间 10月14日 11:45）

---

## 第一步：注册 Devpost 账号

1. 打开 https://univabio.devpost.com/
2. 点击右上角 "Register" 或 "Sign up"
3. 填写以下信息：
   - 邮箱: 3280515416@qq.com
   - 用户名: ZhouZiyue
   - 密码: 设置一个安全密码
4. 验证邮箱（去 QQ 邮箱收验证码）

---

## 第二步：创建 GitHub 仓库

1. 打开 https://github.com/ 并登录（没有账号先注册）
2. 点击 "New repository"
3. 仓库名：healthpilot
4. 设置为 Public（公开）
5. 不要勾选 "Add a README"

---

## 第三步：上传代码到 GitHub

在项目文件夹中打开终端，执行：

```bash
cd D:/computer_science/nju/比赛/univabio-healthpilot
git init
git add .
git commit -m "HealthPilot - AI Symptom Checker for UnivaBio 2026"
git branch -M main
git remote add origin https://github.com/你的用户名/healthpilot.git
git push -u origin main
```

---

## 第四步：录制 Demo 视频（3-5分钟）

用手机录屏或电脑录屏，展示：
1. 打开 http://localhost:3000
2. 在"症状自查"输入"发烧头痛咳嗽" → 点击分析 → 展示结果
3. 切换到"BMI计算" → 输入体重身高 → 展示结果
4. 切换到"健康小贴士" → 展示健康建议

上传到 YouTube（设为 Unlisted）或 Bilibili

---

## 第五步：在 Devpost 上提交

1. 打开 https://submit.devpost.com/submit-to/30781-univabio-40-000-in-prizes/manage/submissions
2. 点击 "Create new submission"
3. 填写：
   - Project Name: HealthPilot
   - Description: AI-powered health management web app with symptom checker, BMI calculator, and health tips
   - Demo URL: YouTube/Bilibili 视频链接
   - GitHub URL: https://github.com/你的用户名/healthpilot
   - Built With: Node.js, Express, HTML, CSS, JavaScript
4. 点击 Submit

---

## 提交检查清单

- [ ] Devpost 账号已注册
- [ ] GitHub 仓库已创建（Public）
- [ ] 代码已推送到 GitHub
- [ ] Demo 视频已录制并上传
- [ ] Devpost 提交表单已填写
- [ ] 提交成功页面已保存截图
