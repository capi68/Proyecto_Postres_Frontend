import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from '../pages/Landing'
import Products from '../pages/Products'
import Cart from '../pages/Cart'
import Order from '../pages/Order'
import Home from '../pages/Home'
import Nosotros from '../pages/Nosotros'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path='/home' element={<Home />} />
        <Route path='/nosotros' element={<Nosotros />} />
      </Routes>
    </BrowserRouter>
  )
}
