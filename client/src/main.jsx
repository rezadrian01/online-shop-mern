import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing/index.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/query'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
