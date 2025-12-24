# MongoDB Authentication Troubleshooting

## 🔐 Authentication Error Fix

If you're getting `bad auth : authentication failed`, follow these steps:

### Step 1: Verify MongoDB Atlas Credentials

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click on your cluster
3. Click "Database Access" in the left menu
4. Verify the username is `robin`
5. If you need to reset the password:
   - Click on the user
   - Click "Edit" or "Reset Password"
   - Create a new password
   - **Important**: If the password has special characters, you need to URL encode them

### Step 2: URL Encode Special Characters in Password

If your password contains special characters, they need to be URL encoded:

| Character | Encoded |
|-----------|---------|
| `@` | `%40` |
| `:` | `%3A` |
| `/` | `%2F` |
| `?` | `%3F` |
| `#` | `%23` |
| `[` | `%5B` |
| `]` | `%5D` |
| `%` | `%25` |
| `&` | `%26` |
| `=` | `%3D` |
| `+` | `%2B` |
| ` ` (space) | `%20` |

**Example**: If your password is `My@Pass#123`, the connection string should be:
```
mongodb+srv://robin:My%40Pass%23123@cluster0.gsuznzp.mongodb.net/Demo
```

### Step 3: Check Network Access

1. Go to MongoDB Atlas Dashboard
2. Click "Network Access" in the left menu
3. Click "Add IP Address"
4. For development, you can:
   - Add your current IP address
   - Or add `0.0.0.0/0` to allow all IPs (less secure, but easier for testing)

### Step 4: Verify Database Name

Make sure the database name in the connection string matches:
- Connection string: `...mongodb.net/Demo`
- Database name should be: `Demo`

### Step 5: Test Connection

Run the test script:
```bash
cd backend
npm run test-connection
```

This will test the connection and show you what's wrong.

### Step 6: Update Connection String

If you've changed the password or need to use a different connection string:

1. Create or edit `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://robin:YOUR_NEW_PASSWORD@cluster0.gsuznzp.mongodb.net/Demo
   ```

2. Make sure to URL encode any special characters in the password

3. Restart the backend server

## 🔧 Common Issues

### Issue: "authentication failed"
**Solution**: 
- Verify username and password in MongoDB Atlas
- URL encode special characters in password
- Check if user has proper permissions

### Issue: "connection timeout"
**Solution**:
- Check Network Access settings
- Add your IP address to allowed list
- Check your internet connection

### Issue: "database not found"
**Solution**:
- MongoDB Atlas creates databases automatically
- Make sure the database name in connection string is correct
- The database will be created on first write

## 📝 Getting Your Connection String from MongoDB Atlas

1. Go to MongoDB Atlas Dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password (URL encoded if needed)
6. Replace `<dbname>` with `Demo` (or your database name)

## ✅ Quick Test

After fixing the connection string, test it:

```bash
cd backend
npm run test-connection
```

If successful, you'll see:
```
✅ Connection successful!
📊 Available collections: [...]
```

Then try seeding:
```bash
npm run seed
```

## 🆘 Still Having Issues?

1. Double-check the username and password in MongoDB Atlas
2. Make sure Network Access allows your IP
3. Try creating a new database user with a simple password (no special characters)
4. Verify the cluster is running in MongoDB Atlas

---

**Note**: The connection string format is:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
```

Make sure all parts are correct!

