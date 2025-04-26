
# RBASE - Blog App

This is a MERN (MongoDB, Express.js, React, Node.js) stack implementation of a blog platform with Role-Based Access Control (RBAC). The application features different permission levels for admin and regular users, JWT authentication, and a responsive user interface.



## Features

   🔐 Authentication

    Registration with name, email, password, and role

    Login with email and password

    JWT-based authentication

    Protected routes for authenticated users

🛡️ Role-Based Access Control

    Admin: Can create, update, and delete blog posts; can view and manage users

    User: Can only view blog posts

✍️ Blog Management

    Admin only:

        Create blog posts

        Edit blog posts

        Delete blog posts

    All users:

        View all blog posts

👥 User Management (Admin Only)

    View all registered users

    Delete users (admin cannot delete their own account)

🧑‍💼 Admin Dashboard

    Accessible to users with the admin role

    Allows blog creation, update, and deletion

    Provides tools for managing users

#Demo Video
https://drive.google.com/file/d/1qMuxIBTkKskb2qoH-hcDupk_qPrnIabc/view?usp=sharing

# Tech Stack

**Client:** React.js, Context API,Axios for HTTP requests, React Toastify for notifications, Tailwind CSS for styling

**Server:** Node, Express, Mongoose, JWT, Bcrypt.js for password hashing

**Database:** MongoDB


## Run Locally

Clone the project

```bash
  git clone https://github.com/ashish123256/rabse-blog-app
```

**For Client**
```bash
  cd client
```
Start the server

```bash
  npm start
```
**For Server**
```bash
  cd server
```
Start the server

```bash
  npm run dev
```


# Install Dependencies

**For server** - `cd server npm i`

**For client** - `cd client` ` npm i`




## Env Variables

Make Sure to Create a .env file in server directory and add appropriate variables in order to use the app.

**Essential Variables**
MONGO_URI=
JWT_SECRET=
JWT_EXPIRE=
PORT=



## Authors

- [Ashish Babu Rao](https://github.com/ashish123256)


