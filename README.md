# RuralCode - Educational Blogging Platform

An educational blogging website focused on teaching coding, technology, and robotics to junior and teenage students, especially those in rural areas.

## 🎯 Features

- **Home Page**: Hero section, popular blogs, and popular videos
- **Blog System**: Educational blog posts with categories (Tech, Coding, Robotics, Latest)
- **Video Learning**: YouTube embedded videos organized by topic
- **Category Pages**: Filter content by Tech, Coding, Robotics, or Latest
- **Admin Panel**: Easy interface to create blogs and add videos
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Technology Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Bootstrap 5.3.2
- Framer Motion (animations)
- GSAP (animations)
- React Router (routing)

### Backend
- Node.js with Express
- MongoDB Atlas (cloud database)
- Mongoose (MongoDB ODM)
- RESTful API

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```
   PORT=3001
   MONGODB_URI=
   ```
   
   **Note**: The MongoDB connection string is already configured in the code, but it's recommended to use environment variables for security.

   Create a `.env` file in the `frontend` directory (optional):
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

4. **Seed the database with sample data (optional)**
   ```bash
   cd backend
   npm run seed
   ```
   This will add sample blogs and videos to help you get started.

5. **Start the development servers**
   
   From the root directory:
   ```bash
   npm run dev
   ```
   
   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🚀 Usage

### Creating a Blog Post

1. Navigate to `/admin` in your browser
2. Click on "Create Blog" tab
3. Fill in the form:
   - **Title**: The blog post title
   - **Content**: HTML content (you can use HTML tags for formatting)
   - **Excerpt**: Short description (optional)
   - **Category**: Select from Tech, Coding, Robotics, or Latest
   - **Author**: Author name (defaults to "RuralCode Team")
   - **Featured Image URL**: Link to an image (optional)
4. Click "Create Blog"

### Adding a Video

1. Navigate to `/admin` in your browser
2. Click on "Add Video" tab
3. Fill in the form:
   - **Title**: Video title
   - **YouTube URL or Video ID**: Full YouTube URL or just the video ID
   - **Description**: Video description (optional)
   - **Category**: Select from Tech, Coding, Robotics, or Latest
   - **Custom Thumbnail URL**: Optional custom thumbnail
4. Click "Add Video"

## 📁 Project Structure

```
ruralcode/
├── backend/
│   ├── server.js          # Express server and API routes
│   ├── models/            # MongoDB models (Category, Blog, Video)
│   ├── config/            # Database configuration
│   ├── scripts/           # Database seeding script
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── types/         # TypeScript type definitions
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── package.json
│   └── vite.config.ts
├── package.json           # Root package.json
└── README.md
```

## 🌐 Free Hosting Options

### Frontend (Vercel/Netlify)
1. Push your code to GitHub
2. Connect your repository to Vercel or Netlify
3. Set build command: `cd frontend && npm install && npm run build`
4. Set output directory: `frontend/dist`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Backend (Render/Railway)
1. Push your code to GitHub
2. Create a new service on Render or Railway
3. Connect your repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variables:
   - `PORT=3001`
   - `MONGODB_URI=your_mongodb_connection_string`

**Note**: MongoDB Atlas is already configured and works great for free hosting!

## 📝 API Endpoints

### Blogs
- `GET /api/blogs` - Get all blogs (query params: `category`, `popular`, `limit`)
- `GET /api/blogs/:slug` - Get single blog by slug
- `POST /api/blogs` - Create a new blog
- `PUT /api/blogs/:id` - Update a blog
- `DELETE /api/blogs/:id` - Delete a blog

### Videos
- `GET /api/videos` - Get all videos (query params: `category`, `popular`, `limit`)
- `GET /api/videos/:id` - Get single video
- `POST /api/videos` - Create a new video
- `PUT /api/videos/:id` - Update a video
- `DELETE /api/videos/:id` - Delete a video

### Categories
- `GET /api/categories` - Get all categories

## 🎨 Design

The design is inspired by modern educational platforms with:
- Clean, simple interface
- Purple/blue color scheme
- Responsive layout
- Smooth animations
- Accessible for rural learners

## 📄 License

MIT License - feel free to use this project for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on the repository.

---

Made with ❤️ for rural students learning coding and technology.

