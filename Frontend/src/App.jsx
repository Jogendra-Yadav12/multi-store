import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/admin/dashboard/Dashboard'
import AddCategory from './components/admin/category/AddCategory'
import AddProducts from './components/admin/product/AddProducts'
import Profile from './components/admin/profile/Profile'
import Admin from './components/admin/Admin'
import CategoryList from './components/admin/category/CategoryList'
import EditCategory from './components/admin/category/EditCategory'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './components/admin/product/ProductList'
import EditProduct from './components/admin/product/EditProduct'
import { useState } from 'react'
import Login from './components/admin/login-register/Login'




function App() {

  const [isLoggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem('adminToken')
  })

  return (
    <>
      <Routes>
        {/* Redirect root to /admin */}

        <Route path='/' element={isLoggedIn ? <Navigate to="/admin" /> : <Login setLoggedIn={setLoggedIn}/>} />

        {/* Admin layout with nested routes */}
        <Route path="/admin/*" element={isLoggedIn ? <Admin/> : <Navigate to="/"/>}>
          <Route index element={<Dashboard />} />
          <Route path='view-category' element={<CategoryList />} />
          <Route path='edit-category/:id' element={<EditCategory />} />
          <Route path='add-category' element={<AddCategory />} />
          <Route path='add-products' element={<AddProducts />} />
          <Route path="view-products" element={<ProductList />} />
          <Route path="edit-product/:id" element={<EditProduct />} />

          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>

      <ToastContainer position="top-center" theme='dark'  autoClose={3000} />
    </>

  )
}

export default App
