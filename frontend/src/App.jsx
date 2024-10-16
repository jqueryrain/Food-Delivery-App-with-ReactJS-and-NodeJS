import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import AppLayout from './AppLayout'
import Contact from './pages/Contact'

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
          path: '/menu',
          element: <Menu />
        },
        {
          path: '/contact',
          element: <Contact />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
