import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'

import { queryClient } from './utils/query'
import './index.css'
import store from './store'

import DefaultLayout from '@layouts/DefaultLayouts'


import Error from './pages/Error'
import Landing from './pages/Landing/index.jsx'
import Signup from './pages/Signup/index.jsx'
import Signin from './pages/Signin/index.jsx'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import MyAccount from './pages/MyAccount'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'

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
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/my-account',
        element: <MyAccount />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:productId',
        element: <ProductDetail />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
