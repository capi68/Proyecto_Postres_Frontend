import { BrowserRouter as router, Routes, Route, Router } from "react-router-dom";
import Landing from "../pages/landing";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Order from "../pages/Order";

export default function appRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/Order" element={<Order />} />
            </Routes>
        </Router>
    );
}