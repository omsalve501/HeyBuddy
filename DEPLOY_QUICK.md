# 🌍 HeyBuddy - Deploy to GitHub Pages (Quick Guide)

## 📋 What You Need

1. **GitHub Pages** (Free) - Hosts React frontend
2. **Cloud Backend** (Free options below) - Hosts Node.js server
3. **gh-pages CLI** - Deploy tool

---

## ⚡ 3-Step Deployment

### Step 1: Deploy Backend (Choose ONE)

#### 🎯 Railway (Recommended - Easiest)
```bash
1. Go to railway.app
2. Sign up with GitHub
3. Create project → Connect your HeyBuddy repo
4. Railway auto-deploys!
5. Copy your URL (e.g., https://your-project.up.railway.app)
```

#### 🐙 Heroku
```bash
heroku login
cd server
heroku create your-app-name
git push heroku main
# Copy URL: https://your-app-name.herokuapp.com
```

#### 🍌 Replit
```bash
1. Go to replit.com
2. Create → Import from GitHub
3. Select HeyBuddy repo
4. Click "Run"
5. Replit shows public URL automatically
```

---

### Step 2: Update Frontend Config

```bash
# Edit the backend URL
cd client
nano .env.production

# Change this line to your backend URL:
REACT_APP_SERVER_URL=https://your-backend-url.com
```

---

### Step 3: Deploy Frontend

```bash
# Option A: Use the script
bash deploy.sh

# Option B: Manual
cd client
npm install gh-pages --save-dev
npm run deploy
```

---

## ✅ Done!

Your app is now live at:
```
https://omsalve501.github.io/HeyBuddy
```

---

## 🧪 Test It

1. Open `https://omsalve501.github.io/HeyBuddy` in **2 browser tabs**
2. Enter different usernames
3. Click **START** in both
4. Send messages → See them in real-time! 🎉

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect" | Backend URL wrong in .env.production |
| "Page not found" | Run `npm run deploy` again |
| "CORS error" | Backend may need CORS settings |
| "No messages" | Check browser console (F12) for errors |

---

## 📚 Full Guide

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions with all options.

---

**Your HeyBuddy app is live on the internet! 🚀**
