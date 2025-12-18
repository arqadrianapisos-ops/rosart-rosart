import WhatsappButton from "./components/WhatsappButton"
import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import CartDrawer from "./components/CartDrawer"

import Home from "./pages/Home"
import Products from "./pages/Products"
import Contact from "./pages/Contact.jsx"
import Login from "./pages/Login"
export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Layout onOpenCart={() => setOpen(true)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/contacto" element={<Contact />} />
          
          {/*  RUTA 404 */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
      <WhatsappButton />
    </>
  )
}



