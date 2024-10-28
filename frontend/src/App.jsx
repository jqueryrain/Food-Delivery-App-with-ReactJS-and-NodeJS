import { createBrowserRouter, RouterProvider, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import AppLayout from './AppLayout'
import Contact from './pages/Contact'
import About from './pages/About'
import Admin from './pages/Admin'
import AdminLayout from './AdminLayout'
import Product_category from './components/Admin/Product_category'
import AddFood from './components/Admin/AddFood'
import ViewItems from './components/Admin/ViewItems'
import Product_Cart from './pages/Product_Cart'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import NotFound from './pages/NotFound'
import ViewOrders from './components/Admin/ViewOrders'
import AdminLogin from './pages/AdminLogin'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/about',
          element: < About />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/cart',
          element: <Product_Cart />
        },
        {
          path: '/success',
          element: <Success />
        },
        {
          path: '/cancel',
          element: <Cancel />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          path: '/admin/login',
          element: <AdminLogin />
        },
        {
          path: '/admin',
          element: <Admin />
        },
        {
          path: '/admin/product/category',
          element: <Product_category />
        },
        {
          path: '/admin/add/food',
          element: <AddFood />
        },
        {
          path: '/admin/view/items',
          element: <ViewItems />
        },
        {
          path: '/admin/food/orders',
          element: <ViewOrders />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
