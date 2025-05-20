import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/admin/dashboard/Dashboard';
import AddCategory from './components/admin/category/AddCategory';
import AddProducts from './components/admin/product/AddProducts';
import Profile from './components/admin/profile/Profile';
import Admin from './components/admin/Admin';
import CategoryList from './components/admin/category/CategoryList';
import EditCategory from './components/admin/category/EditCategory';
import ProductList from './components/admin/product/ProductList';
import EditProduct from './components/admin/product/EditProduct';
import PrivateRoute from './components/admin/PrivateRoute/PrivateRoute';
import Login from './components/admin/login-register/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCustomer from './components/admin/customer/AddCustomer';
import CustomerList from './components/admin/customer/CustomerList';
import EditCustomer from './components/admin/customer/EditCustomer';

function App() {
  return (
    <>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public login route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Layout with nested routes */}
        <Route path="/" element={<PrivateRoute><Admin /></PrivateRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="view-category" element={<CategoryList />} />
          <Route path="edit-category/:id" element={<EditCategory />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="add-products" element={<AddProducts />} />
          <Route path="view-products" element={<ProductList />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path='view-customer' element={<CustomerList/>} />
          <Route path='add-customer' element={<AddCustomer/>} />
          <Route path="edit-customer/:id" element={<EditCustomer />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>

      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
    </>
  );
}

export default App;
