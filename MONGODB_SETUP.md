# MongoDB Atlas Setup Guide

## ✅ Migration Complete

The backend has been successfully migrated from SQLite to MongoDB Atlas!

## 🔗 Connection String

Your MongoDB Atlas connection string is already configured:
```
mongodb+srv://new:vipXQ23yteml54lw@cluster0.gsuznzp.mongodb.net/Demo
```

This is set as the default in `backend/config/database.js`, but you can override it using the `MONGODB_URI` environment variable.

## 📦 What Changed

### Dependencies
- ❌ Removed: `sqlite3`
- ✅ Added: `mongoose` (MongoDB ODM)

### Database Structure
- **Categories Collection**: Stores blog/video categories
- **Blogs Collection**: Stores blog posts with references to categories
- **Videos Collection**: Stores video information with references to categories

### Models Created
- `backend/models/Category.js` - Category model
- `backend/models/Blog.js` - Blog model with indexes
- `backend/models/Video.js` - Video model with indexes

### Configuration
- `backend/config/database.js` - MongoDB connection and initialization

## 🚀 Getting Started

1. **Install dependencies** (if you haven't already):
   ```bash
   cd backend
   npm install
   ```

2. **Start the backend**:
   ```bash
   npm run dev
   ```
   
   The server will automatically connect to MongoDB Atlas and initialize default categories.

3. **Seed sample data** (optional):
   ```bash
   npm run seed
   ```

## 🔒 Security Note

**Important**: The MongoDB credentials are currently hardcoded in the configuration. For production:

1. Create a `.env` file in the `backend` directory:
   ```
   MONGODB_URI=mongodb+srv://new:vipXQ23yteml54lw@cluster0.gsuznzp.mongodb.net/Demo
   PORT=3001
   ```

2. Update `backend/config/database.js` to only use the environment variable:
   ```javascript
   const mongoURI = process.env.MONGODB_URI;
   if (!mongoURI) {
     throw new Error('MONGODB_URI environment variable is required');
   }
   ```

3. **Never commit** `.env` files to version control!

## 🌐 MongoDB Atlas Configuration

### Network Access
Make sure your MongoDB Atlas cluster allows connections from:
- Your local IP address (for development)
- `0.0.0.0/0` (for production hosting - use with caution)

To configure:
1. Go to MongoDB Atlas Dashboard
2. Click "Network Access"
3. Add your IP address or allow all IPs

### Database User
The connection uses:
- Username: `new`
- Password: `vipXQ23yteml54lw`
- Database: `Demo`

## 📊 Database Collections

### Categories
```javascript
{
  name: String (required, unique),
  slug: String (required, unique),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Blogs
```javascript
{
  title: String (required),
  slug: String (required, unique),
  content: String (required),
  excerpt: String,
  category: ObjectId (ref: Category),
  author: String (default: 'RuralCode Team'),
  featured_image: String,
  view_count: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Videos
```javascript
{
  title: String (required),
  description: String,
  youtube_id: String (required),
  category: ObjectId (ref: Category),
  thumbnail_url: String,
  view_count: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔍 Indexes

The following indexes are automatically created for performance:
- **Blogs**: `slug`, `category`, `view_count`, `createdAt`
- **Videos**: `category`, `view_count`, `createdAt`

## ✅ Benefits of MongoDB

1. **Cloud-based**: No local database files to manage
2. **Scalable**: Easy to scale as your data grows
3. **Free tier**: MongoDB Atlas offers a generous free tier
4. **Production-ready**: Perfect for deployment to Render, Railway, etc.
5. **Flexible schema**: Easy to add new fields without migrations

## 🐛 Troubleshooting

### Connection Errors
- Check your internet connection
- Verify MongoDB Atlas cluster is running
- Check Network Access settings in MongoDB Atlas
- Verify credentials are correct

### Authentication Errors
- Verify username and password
- Check database user permissions in MongoDB Atlas

### Timeout Errors
- Check if your IP is whitelisted in MongoDB Atlas
- Verify the connection string is correct

## 📚 Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB University](https://university.mongodb.com/)

---

**Your RuralCode backend is now powered by MongoDB Atlas! 🎉**

