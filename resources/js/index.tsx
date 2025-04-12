import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import theme from './flowbite-theme'
import { Flowbite } from 'flowbite-react'
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import DashboardPage from './pages'
import SignInPage from './pages/authentication/sign-in'
import SignUpPage from './pages/authentication/sign-up'
import UserListPage from './pages/users/list'
import SocioListPage from './pages/socios/list'
import UploadPage from './pages/liquidacion/upload'
import ListLiquidacionPage from './pages/liquidacion/list'
import queryClient from './lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import Login from './pages/authentication/Login'

const container = document.getElementById('root')

if (!container) {
  throw new Error("React root element doesn't exist!")
}

const root = createRoot(container)

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <Flowbite theme={{ theme, dark: true }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} index />
            <Route path="/authentication/sign-in" element={<SignInPage />} />
            <Route path="/authentication/sign-up" element={<SignUpPage />} />

            <Route path="/users/list" element={<UserListPage />} />
            <Route path="/socios/list" element={<SocioListPage />} />
            <Route path="/liquidacion/upload" element={<UploadPage />} />
            <Route path="/liquidacion/list" element={<ListLiquidacionPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </QueryClientProvider>
  </StrictMode>
)
