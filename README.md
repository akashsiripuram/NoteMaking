# Notemaking Website

## 📝 Project Overview  
The **Notemaking Website** is a MERN stack application that allows users to create, read, update, and delete (CRUD) notes. Users can register, log in, and securely manage their notes, which are stored in a MongoDB database. The project provides an intuitive and responsive interface for tracking and organizing notes effectively.  

---

## 🚀 Features  
- ✅ User Authentication (Login, Registration, Logout)  
- ✅ Secure password handling using bcrypt and JWT  
- ✅ Create, Read, Update, and Delete (CRUD) operations for notes  
- ✅ User-specific note management  
- ✅ Real-time updates  
- ✅ Mobile-responsive design  

---

## 🏗️ Tech Stack  
| Technology  | Purpose  |
|------------|---------|
| **MongoDB**  | Database to store user and note data |
| **Express.js**  | Backend framework for handling server-side logic |
| **React.js**  | Frontend framework for building the user interface |
| **Node.js**  | Backend runtime environment |
| **JWT**  | Authentication using JSON Web Tokens |
| **bcrypt**  | Password encryption |
| **Tailwind CSS**  | Styling and responsive design |

---

## 🔑 Installation  
### 1. **Clone the repository**  
```bash  
git clone https://github.com/your-username/notemaking-website.git  
cd notemaking-website  
```

### 2. **Install dependencies**  
#### Backend  
```bash  
cd backend  
npm install  
```

#### Frontend  
```bash  
cd frontend  
npm install  
```

### 3. **Set up environment variables**  
Create a `.env` file in the backend directory with the following values:  
```env  
MONGO_URI="your_db_uri" 
JWT_SECRET=your_jwt_secret  
PORT=5000  
```

### 4. **Run the app**  
#### Backend  
```bash  
cd backend  
npm start  
```

#### Frontend  
```bash  
cd frontend  
npm run dev
```

---

## 📂 Folder Structure  
```
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   └── App.js
├── .env
├── package.json
└── README.md
```

---

## 🛡️ Security  
- Passwords are securely hashed using **bcrypt**  
- JWT is used to manage authentication tokens  
- Routes are protected using middleware  

---

## 🌟 Future Improvements  
- Add search and filter functionality  
- Implement dark mode  
- Add note-sharing feature  

---

## 🙌 Contributing  
Feel free to contribute by creating a pull request! Make sure to follow the coding guidelines and provide detailed commit messages.  

### Contributors
- **Akash Siripuram**
- **Suraj719**

---

## 📄 License  
This project is licensed under the **MIT License**.  

---

**👨‍💻 Developed by Akash Siripuram**
