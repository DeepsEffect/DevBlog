# [DevBlog](https://dev-blog-chi.vercel.app/)

DevBlog is a portfolio project that features a blogging platform for developers. Users can browse, search, interact with, and create blogs across various categories related to development.

## ✨ Features

- **🔐 Authentication**: Secure login via Google OAuth and NextAuth.js credentials
- **📝 Full Blog Management**: Create, Read, Update, and Delete blog posts (CRUD)
- **🔖 Bookmarks**: Save interesting posts for later reading
- **🔍 Search & Sort**: Find content easily with search and sort functionality on every page
- **👏 Pog Reactions**: Show appreciation for posts with unlimited "Pogs"
- **💬 Add Comments**: Leave a comment to express your feedback
- **📱 Responsiveness**: Fully responsive across all devices

## 🛠️ Tech Stack

### Frontend

- **Next.js** - Framework for building modern web applications
- **React** - Building user interface components
- **Next UI** - Modern, responsive UI components
- **React Query** - Data fetching and caching
- **Lucide React & React Icons** - Icon libraries
- **TipTap Editor** - Rich text editor for blog writing 
- **React Toastify** - Notifications system
- **Prism.js** - Syntax highlighting for code blocks
- **Dompurify** - Security for content sanitization

### Backend

- **Next.js API Routes** - Handling server-side logic
- **MongoDB** (via MongoDB Atlas) - Database for user and blog data
- **NextAuth.js** - Authentication and session management
- **bcrypt** - Password hashing for secure user credential management

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/DeepsEffect/DevBlog.git
   ```

2. **Navigate to project directory**

   ```bash
   cd DevBlog
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   MONGODB_URI=your_mongodb_connection_string
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to see the app

## 🤝 Contributing

This project is part of my portfolio, demonstrating my skills in full-stack development. While primarily a showcase, I welcome contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
