
# RBASE - Blog App

This is a MERN (MongoDB, Express.js, React, Node.js) stack implementation of a blog platform with Role-Based Access Control (RBAC). The application features different permission levels for admin and regular users, JWT authentication, and a responsive user interface.



## Features
    User Authentication:

        Registration with name, email, password, and role

        Login with email and password

        JWT-based authentication

        Protected routes

    Role-Based Access Control:

        Admin role: Can create, edit, and delete blog posts; can manage users

        User role: Can view blog posts

    Blog Management:

        Create, read, update, and delete blog posts (admin only)

        View all blog posts (all users)

    User Management:

        View all users (admin only)

        Delete users (admin only, cannot delete self)



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

Make Sure to Create a config.env file in backend/config directory and add appropriate variables in order to use the app.

**Essential Variables**
MONGO_URI=
JWT_SECRET=
JWT_EXPIRE=
PORT=



## Authors

- [Ashish Babu Rao](https://github.com/ashish123256)


