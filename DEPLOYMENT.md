# HeyBuddy - GitHub Pages & Cloud Deployment Guide

## 📱 Frontend Hosting (GitHub Pages)

GitHub Pages will host the React frontend for free at: `https://omsalve501.github.io/HeyBuddy`

### Prerequisites
```bash
npm install -g gh-pages
```

### Deploy to GitHub Pages

#### Option 1: Using NPM Script (Recommended)
```bash
cd client
npm run deploy
```

This will:
1. Build the React app
2. Push the build folder to `gh-pages` branch
3. GitHub automatically serves it at your GitHub Pages URL

#### Option 2: Manual Deployment
```bash
cd client
npm run build
npx gh-pages -d build
```

### Verify Deployment
- Visit: `https://omsalve501.github.io/HeyBuddy`
- You should see the HeyBuddy login screen

---

## 🚀 Backend Hosting (Choose One)

The React frontend is now hosted on GitHub Pages, but it needs a backend server. Choose one of these FREE options:

### Option A: Railway (Recommended - Easiest)

**Why Railway?**
- ✅ Free tier with 500 hours/month
- ✅ GitHub integration
- ✅ Auto-deploys on push
- ✅ Easy environment variables
- ✅ Custom domains available

**Steps:**

1. Go to [railway.app](https://railway.app) and sign up with GitHub
2. Click "Create a new project" → "Deploy from GitHub repo"
3. Select `HeyBuddy` repo
4. Connect your GitHub account
5. Railway auto-detects Node.js app
6. In Railway dashboard:
   - Go to Settings
   - Copy your public URL (e.g., `https://your-project.up.railway.app`)
7. Set environment variable `PORT=5000` (if needed)
8. Deploy! 🚀

**Update Frontend URL:**
```bash
cd client
# Edit .env.production
REACT_APP_SERVER_URL=https://your-project.up.railway.app
npm run deploy
```

---

### Option B: Heroku (Free tier limited)

**Steps:**

1. Install Heroku CLI:
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

2. Login to Heroku:
```bash
heroku login
```

3. Create app:
```bash
cd /workspaces/HeyBuddy/server
heroku create your-app-name
```

4. Deploy:
```bash
git push heroku main
```

5. View URL:
```bash
heroku open
```

**Update Frontend URL:**
```bash
cd client
# Edit .env.production
REACT_APP_SERVER_URL=https://your-app-name.herokuapp.com
npm run deploy
```

---

### Option C: Vercel (For backend - Complex)

Not recommended for Node.js backend. Better for frontend only.

---

### Option D: Replit (Free + Hosted)

**Steps:**

1. Go to [replit.com](https://replit.com)
2. Click "Create Repl" → "Import from GitHub"
3. Paste: `https://github.com/omsalve501/HeyBuddy`
4. Select Node.js
5. Run the server:
```bash
cd server
npm install
npm start
```

6. Replit gives you a public URL automatically
7. Copy the URL (e.g., `https://heybuddy.username.repl.co`)

**Update Frontend URL:**
```bash
cd client
# Edit .env.production
REACT_APP_SERVER_URL=https://heybuddy.username.repl.co
npm run deploy
```

---

## 🔧 Full Deployment Workflow

### Step 1: Deploy Backend

Choose one option above (Railway recommended):
1. Choose hosting service
2. Connect your GitHub repo
3. Deploy
4. Copy your backend URL

### Step 2: Update Frontend

```bash
cd client
nano .env.production
# Update REACT_APP_SERVER_URL with your backend URL
# Save and exit
```

### Step 3: Deploy Frontend to GitHub Pages

```bash
cd client
npm install gh-pages --save-dev
npm run deploy
```

### Step 4: Access Your App

- Frontend: `https://omsalve501.github.io/HeyBuddy`
- Open in 2 browser tabs
- Enter different usernames
- Click START and start chatting! 🎉

---

## 📊 Recommended Setup

```
GitHub Pages (Frontend)
    ↓ Socket.io WebSocket
Railway Backend Server
    ↓
Real-time Chat! 💬
```

---

## 🔐 CORS Setup for Production

The backend server is already configured for CORS. If you get CORS errors:

**In [server/server.js](../server/server.js):**
```javascript
const io = socketIo(server, {
  cors: {
    origin: "https://omsalve501.github.io",  // Add your GitHub Pages URL
    methods: ["GET", "POST"]
  }
});
```

---

## 🚨 Environment Variables

### Frontend (.env.production)
```
REACT_APP_SERVER_URL=https://your-backend-url.com
```

### Backend (Railway/Heroku)
```
PORT=5000
NODE_ENV=production
```

---

## ✅ Deployment Checklist

- [ ] Backend deployed and URL copied
- [ ] Updated `.env.production` with backend URL
- [ ] Ran `npm run deploy` in client folder
- [ ] Frontend accessible at GitHub Pages URL
- [ ] Both URLs are using HTTPS
- [ ] Tested with 2 browser windows
- [ ] Messages sending/receiving in real-time

---

## 🧪 Testing Deployed App

1. Open `https://omsalve501.github.io/HeyBuddy`
2. Open in 2 separate windows/incognito tabs
3. Enter different usernames
4. Click START
5. Send messages and verify real-time sync

---

## 📈 After Deployment

### Monitor Backend
- Railway: Dashboard shows logs and metrics
- Heroku: `heroku logs --tail`
- Replit: View logs in console

### Update Code
1. Make changes locally
2. Commit and push to GitHub
3. Backend auto-deploys (Railway/Replit)
4. Run `npm run deploy` in client folder
5. Frontend updates on GitHub Pages

---

## 💰 Cost Summary

| Service | Cost | Limits |
|---------|------|--------|
| GitHub Pages | Free | Frontend only |
| Railway | Free | 500 hrs/month |
| Heroku | Paid (was free) | $7+/month |
| Replit | Free | Always on |

**Best Option: Railway + GitHub Pages (FREE!)**

---

## 🆘 Troubleshooting

### "Cannot connect to server"
- Check backend URL in `.env.production`
- Ensure backend is running
- Check CORS settings

### "CORS error"
- Update CORS origin in server.js
- Ensure using HTTPS URLs

### "Page not found on GitHub Pages"
- Run `npm run deploy` again
- Check repository settings → Pages
- Ensure branch is set to `gh-pages`

### "Messages not appearing"
- Backend not deployed
- Wrong server URL in .env
- Check browser console (F12)

---

## 📚 Useful Resources

- [Railway Docs](https://docs.railway.app)
- [GitHub Pages Docs](https://pages.github.com)
- [React Build Docs](https://create-react-app.dev/docs/deployment)
- [gh-pages NPM Package](https://www.npmjs.com/package/gh-pages)

---

**Your HeyBuddy app is ready for the world! 🌍**
