import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Pages/Layout';
import Product from './Pages/product/Product';
import Products from './Pages/products/Products';
import Home from './Pages/home/Home';

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
