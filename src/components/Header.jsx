import { NavLink } from "react-router-dom"
import { useCart } from "../context/useCart.js"

export default function Header({ onOpenCart }) {
  const { items } = useCart()

  const count = items.reduce(
    (acc, item) => acc + Number((item && item.qty) || 0),
    0
  )

  return (
    <header style={styles.header}>
      <NavLink to="/" style={styles.logo}>
        Rosart.store
      </NavLink>

      <nav style={styles.nav}>
        <NavLink to="/" style={linkStyle}>
          Nosotros
        </NavLink>
        <NavLink to="/productos" style={linkStyle}>
          Productos
        </NavLink>
        <NavLink to="/contacto" style={linkStyle}>
          Contacto 
        </NavLink>
      </nav>

      <button type="button" onClick={onOpenCart} style={styles.cartBtn}>
        🛒 <span style={styles.badge}>{count}</span>
      </button>
    </header>
  )
}

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  color: isActive ? "#111" : "#555",
  fontWeight: isActive ? 700 : 500,
})

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    borderBottom: "1px solid #eee",
    background: "#fff",
  },
  logo: {
    fontSize: 20,
    textDecoration: "none",
    color: "#111",
    fontWeight: 800,
  },
  nav: { display: "flex", gap: 16, alignItems: "center" },
  cartBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    borderRadius: 999,
    padding: "8px 12px",
    cursor: "pointer",
    fontWeight: 700,
  },
  badge: {
    display: "inline-flex",
    minWidth: 22,
    height: 22,
    padding: "0 6px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    background: "#fff",
    color: "#111",
    fontSize: 12,
    fontWeight: 800,
    lineHeight: "22px",
  },
}
