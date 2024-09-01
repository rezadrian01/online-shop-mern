import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './utils/query'
import DefaultLayout from '@layouts/DefaultLayouts'

import Error from './pages/Error'
import Landing from './pages/Landing/index.jsx'
import Signup from './pages/Signup/index.jsx'
import Signin from './pages/Signin/index.jsx'

import './index.css'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import About from './pages/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/wishlist',
        element: <Wishlist />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
