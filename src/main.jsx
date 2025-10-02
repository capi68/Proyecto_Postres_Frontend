import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routes/appRouter'
import { CartProvider } from './context/CartContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
    <AppRouter />
    </CartProvider>
  </StrictMode>,
)
