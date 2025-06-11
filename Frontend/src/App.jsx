import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/admin/dashboard/Dashboard';
import AddCategory from './components/admin/category/AddCategory';
import AddProducts from './components/admin/product/AddProducts';
import Profile from './components/admin/profile/Profile';
import Admin from './components/admin/layout/Admin';
import CategoryList from './components/admin/category/CategoryList';
import EditCategory from './components/admin/category/EditCategory';
import ProductList from './components/admin/product/ProductList';
import EditProduct from './components/admin/product/EditProduct';
import PrivateRoute from './components/admin/PrivateRoute/PrivateRoute';
import AdminLogin from './components/admin/login-register/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCustomer from './components/admin/customer/AddCustomer';
import CustomerList from './components/admin/customer/CustomerList';
import EditCustomer from './components/admin/customer/EditCustomer';
import Homepage from './components/website/pages/Homepage';
import WebsiteLogin from './components/website/pages/Login';
import SignUp from './components/website/pages/SignUp';
import ProductListByCategory from './components/website/pages/ProductListByCategory';
import ProductDetail from './components/website/pages/ProductDetail';
import UserProfile from './components/website/pages/UserProfile';
import BrandList from './components/admin/brands/BrandList';
import AddBrands from './components/admin/brands/AddBrands';
import EditBrand from './components/admin/brands/EditBrand';

function App() {
  return (
    <>
      <Routes>
        {/* website routes */}
        <Route path='/' element={<Homepage/>} />
        <Route path='/login' element={<WebsiteLogin />} />
        <Route path='/sign-up' element={<SignUp/>} />

        {/* productlistbyCategory */}

        <Route path='/category-list/:id' element={<ProductListByCategory />} />
        <Route path='/product-detail/:id' element={<ProductDetail />} />
        <Route path='/my-profile' element={<UserProfile/>} />

        {/* Public login route */}
        <Route path="/admin-login" element={<AdminLogin />} />

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
          <Route path='view-brands' element={<BrandList/>} />
          <Route path='add-brands' element={<AddBrands/>} />
          <Route path='edit-brand/:id' element={<EditBrand/>} />
        </Route>
      </Routes>

      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
    </>
  );
}

export default App;
