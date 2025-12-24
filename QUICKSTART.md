# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm run install:all
```

### Step 2: Start Backend
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:3001

### Step 3: Start Frontend (in a new terminal)
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:3000

### Step 4: Seed Sample Data (Optional)
```bash
cd backend
npm run seed
```
This will add sample blogs and videos to get you started.

### Step 5: Access the Application
- Open http://localhost:3000 in your browser
- Navigate to `/admin` to create your first blog or add a video

## 📝 Creating Your First Blog

1. Go to http://localhost:3000/admin
2. Fill in the blog form:
   - **Title**: "My First Blog Post"
   - **Content**: You can use HTML tags like `<h2>`, `<p>`, `<ul>`, etc.
   - **Category**: Select Coding, Tech, Robotics, or Latest
3. Click "Create Blog"
4. View your blog on the homepage or in the blogs section!

## 🎥 Adding Your First Video

1. Go to http://localhost:3000/admin
2. Click on "Add Video" tab
3. Fill in the form:
   - **Title**: "My Educational Video"
   - **YouTube URL**: Paste the full YouTube URL or just the video ID
   - **Category**: Select a category
4. Click "Add Video"
5. The video will appear in the videos section!

## 🎨 Customization

### Changing Colors
Edit `frontend/src/index.css` to change the color scheme:
```css
:root {
  --primary-color: #6c5ce7;  /* Change this */
  --secondary-color: #a29bfe;
  /* ... */
}
```

### Adding More Categories
Categories are automatically created when the backend starts. To add more, you can:
1. Manually insert into the database, or
2. Modify `backend/server.js` to add more default categories

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variable: `MONGODB_URI=your_mongodb_connection_string`

**Note**: MongoDB Atlas is already configured and works great for free hosting!

## 🐛 Troubleshooting

### Backend won't start
- Make sure port 3001 is not in use
- Check that all dependencies are installed: `cd backend && npm install`

### Frontend won't start
- Make sure port 3000 is not in use
- Check that all dependencies are installed: `cd frontend && npm install`

### Database errors
- Check your MongoDB connection string in `backend/.env`
- Make sure MongoDB Atlas allows connections from your IP (check Network Access in MongoDB Atlas)
- Verify your MongoDB credentials are correct

### CORS errors
- Make sure the backend is running on port 3001
- Check that the frontend proxy is configured in `vite.config.ts`

## 📚 Next Steps

- Customize the design to match your brand
- Add more features like search, comments, or user authentication
- Create more educational content
- Deploy to production

Happy coding! 🎉

