import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Layout from "./layout/Layout";
import Profile from "./pages/profile/Profile";
import Categoria from "./pages/home/categories/Categoria"; // 🔥 Nueva importación
import Products from "./pages/home/products/Products";
import useAuthStore from "./stores/use-auth-store";

useAuthStore.getState().initAuth();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} /> {/* NUEVA RUTA */}
        <Route path="/perfil" element={<Profile />} />
        <Route path="/categoria/:nombre" element={<Categoria />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

