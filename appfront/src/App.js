import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Pages/Layout';
import Product from './Pages/product/Product';
import Products from './Pages/products/Products';
import Home from './Pages/home/Home';
import NotFound from './Pages/NotFound/NotFound';
import SubCategory from './Pages/SubCategory/SubCategory';
import Login from './Pages/auth/Login';
import Signup from './Pages/auth/Signup';
import Profile from './Pages/Profile/Profile';
import Dashboard from './Pages/Dashboard/Dashboard';
import Contact from './Pages/Contact/Contact';
import FAQ from './Pages/FAQ/FAQ';

const router = createBrowserRouter(
  [{
path:'/',
element:<Layout/>,
children:[
  {
    path:'/',
    element:<Home/>
    },
  {
path:'product/:id',
element:<Product/>
}
,  {
  path:'products/:id',
  element:<Products/>
  },
  {
    path:'subcategory/:id',
    element:<SubCategory/>
  },
  {
    path:'login',
    element:<Login/>
  },
  {
    path:'signup',
    element:<Signup/>
  },
  {
    path:'profile',
    element:<Profile/>
  },
  {
    path:'dashboard',
    element:<Dashboard/>
  },
  {
    path:'contact',
    element:<Contact/>
  },
  {
    path:'faq',
    element:<FAQ/>
  },
  {
    path:'*',
    element:<NotFound/>
  }
]
},]
)
function App() {
  return (
    <div className="app">
            <RouterProvider router={router} />
    </div>
  );
}

export default App;
