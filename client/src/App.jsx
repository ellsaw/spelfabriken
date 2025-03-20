import { BrowserRouter, Route, Routes } from 'react-router';

import Admin from './components/admin/Admin.jsx'
import Products from './components/admin/Products.jsx';
import NewProduct from './components/admin/NewProduct.jsx';
import Campaigns from './components/admin/campaigns/Campaigns.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx'

import Home from './components/store/home/Home.jsx';
import Categories from './components/store/categories/Categories.jsx';
import SearchResults from './components/store/search-results/SearchResults.jsx';
import PublicLayout from './components/layout/PublicLayout.jsx';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<PublicLayout/>}>
              <Route index element={<Home/>}/>
              <Route path='/kategori/:category' element={<Categories/>}/>
              <Route path='/hitta' element={<SearchResults/>}/>
            </Route>

            <Route element={<AdminLayout/>}>
              <Route path='/admin' element={<Admin/>}/>
              <Route path='/admin/products' element={<Products/>}/>
              <Route path='/admin/products/new' element={<NewProduct/>}/>
              <Route path='/admin/products/campaigns' element={<Campaigns/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
 );
}

