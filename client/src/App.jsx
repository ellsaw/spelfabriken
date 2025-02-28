import { BrowserRouter, Route, Routes } from 'react-router';

import Admin from './components/admin/Admin.jsx'
import Products from './components/admin/Products.jsx';
import NewProduct from './components/admin/NewProduct.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx'

import Home from './components/store/Home.jsx';
import PublicLayout from './components/layout/PublicLayout.jsx';

export default function App() {
 return (
    <BrowserRouter>
        <Routes>
            <Route element={<PublicLayout/>}>
              <Route index element={<Home/>}/>
            </Route>

            <Route element={<AdminLayout/>}>
              <Route path='/admin' element={<Admin/>}/>
              <Route path='/admin/products' element={<Products/>}/>
              <Route path='/admin/products/new' element={<NewProduct/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
 );
}

