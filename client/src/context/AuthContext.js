import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../baseUrl";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    // check if user is authenticated

    useEffect(()=>{
       if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        getUser();
       }
       else{
        delete axios.defaults.headers.common["Authorization"];
       }
    },[token])

    const getUser = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/auth/me`);
            setUser(res.data.data);
        } catch (error) {
            logout();
            
        }
    }

    const logout = () =>{
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        navigate("/login");
    }

    const register = async (formData) => {
        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/api/v1/auth/register`, formData);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            toast.success("Registration successful");
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const login = async (formData) => {
        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/api/v1/auth/login`, formData);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <AuthContext.Provider
         value={{
            user,
            token,
            loading,
            register,
            login,
            logout,
            getUser
         }}
        >
            {children}
        </AuthContext.Provider>
    )

}


export default AuthProvider;
