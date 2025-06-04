import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom';

const CustomerPrivateRoute = ({children}) => {
    const {user} = useAuth();
    return user ? children : <Navigate to="/login" />
}

export default CustomerPrivateRoute