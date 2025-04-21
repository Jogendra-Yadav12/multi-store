import { Routes, Route, Navigate } from 'react-router-dom'
import Admin from './pages/admin/Admin'
import Dashboard from './pages/admin/Dashboard'
import AddProducts from './pages/admin/AddProducts'
import Profile from './pages/admin/Profile'
import AddCategory from './pages/admin/AddCategory'

function App() {
  return (
    <Routes>
      {/* Redirect root to /admin */}
      <Route path="/" element={<Navigate to="/admin" />} />

      {/* Admin layout with nested routes */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} /> 
        <Route path='add-category' element={<AddCategory />} />
        <Route path="add-products" element={<AddProducts />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
