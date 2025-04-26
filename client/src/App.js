import { BrowserRouter as Router,Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from './components/Header';
import AuthProvider from './context/AuthContext';
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import PrivateRoute from "./pages/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import BlogForm from "./pages/BlogForm";
import Footer from "./components/Footer";
import BlogDetail from "./pages/BlogDetail";


const App = () => {
  return (
    <Router>
   <AuthProvider>
    <div className="flex flex-col min-h-screen">
          <Header />
           <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
               
              <Route path="/" element={<BlogList />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/admin" element={
                <PrivateRoute adminOnly>
                   <AdminDashboard/>
                </PrivateRoute>
              }/>

             <Route
                path="/admin/blog/new"
                element={
                  <PrivateRoute adminOnly>
                    <BlogForm/>
                  </PrivateRoute>
                }
              />

<Route
                path="/admin/blog/:id/edit"
                element={
                  <PrivateRoute adminOnly>
                    <BlogForm />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
         <Footer/>
          </div> 
        <ToastContainer />
   </AuthProvider>
      </Router>
  )
}

export default App