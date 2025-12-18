import products from "../data/products.json"
import ProductCard from "../components/ProductCard"
import { useCart } from "../context/useCart.js"
import InfoCompra from "../components/InfoCompra.jsx"

export default function Products() {
  const { addToCart } = useCart()

  return (
    <section style={{ padding: 20 }}>
      <h2 className="sectionTitle">Nuestros productos</h2>

      <div style={grid}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={() => addToCart(p)}
          />
        ))}
      </div>

      {/* Información de Envíos / Pagos / Facturación */}
      <div style={{ maxWidth: 1180, margin: "40px auto 0" }}>
        <InfoCompra />
      </div>
    </section>
  )
}

const grid = {
  maxWidth: 1180,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
}
