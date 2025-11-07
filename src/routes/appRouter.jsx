import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Landing from '../pages/landing'
import Products from '../pages/Products'
import Cart from '../pages/Cart'
import Order from '../pages/Order'
import Home from '../pages/Home'
import Nosotros from '../pages/Nosotros'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route path="/" element={<Landing />} />

        {/* proteted routes */}
        <Route 
          path="/products" 
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/nosotros" 
          element={
            <ProtectedRoute>
              <Nosotros />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/order" 
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}
