import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import AppLayout from './AppLayout'
import Contact from './pages/Contact'
import About from './pages/About'
import Admin from './pages/Admin'
import AdminLayout from './AdminLayout'
import Product_category from './components/Admin/Product_category'
import AddFood from './components/Admin/AddFood'
import ViewItems from './components/Admin/ViewItems'

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
        }
      ]
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
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
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
