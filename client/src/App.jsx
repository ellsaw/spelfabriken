import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './components/store/Home.jsx';
import PublicLayout from './components/layout/PublicLayout.jsx';

export default function App() {
 return (
    <BrowserRouter>
    <div className='bg-white font-kanit'>
        <Routes>
            <Route element={<PublicLayout/>}>
              <Route index element={<Home/>}/>
            </Route>
        </Routes>
    </div>
    </BrowserRouter>
 );
}

