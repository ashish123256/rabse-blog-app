import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({children, adminOnly = false}) => {

    const { user } = useContext(AuthContext)

    if (!user) {
        return <Navigate to="/login"  />
    }


    if(adminOnly && user.role !== "admin") {
        return <Navigate to="/"  />
    }

  return children
}

export default PrivateRoute