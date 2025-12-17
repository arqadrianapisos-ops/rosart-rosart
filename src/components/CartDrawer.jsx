import { useCart } from "../context/useCart.js"

export default function CartDrawer({ open, onClose }) {
  const { items, incrementQty, decrementQty, removeFromCart, clearCart, total } = useCart()

  if (!open) return null

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />

      <aside style={styles.drawer} role="dialog" aria-label="Carrito">
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Tu carrito</h3>
          <button onClick={onClose} style={styles.iconBtn} aria-label="Cerrar" type="button">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p style={{ marginTop: 12 }}>No hay productos en el carrito.</p>
        ) : (
          <>
            <ul style={styles.list}>
              {items.map((i) => (
                <li key={i.id} style={styles.item}>
                  <img src={i.image} alt={i.name} style={styles.thumb} />

                  <div style={{ flex: 1 }}>
                    <strong style={{ display: "block" }}>{i.name}</strong>

                    <small style={{ display: "block", marginTop: 2 }}>
                      ${i.price} · Subtotal: ${Number(i.price || 0) * Number(i.qty || 0)}
                    </small>

                    {/* Controles de cantidad */}
                    <div style={styles.qtyRow}>
                      <button
                        type="button"
                        onClick={() => decrementQty(i.id)}
                        style={styles.qtyBtn}
                        aria-label="Restar"
                      >
                        −
                      </button>

                      <span style={styles.qtyValue}>{i.qty}</span>

                      <button
                        type="button"
                        onClick={() => incrementQty(i.id)}
                        style={styles.qtyBtn}
                        aria-label="Sumar"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(i.id)}
                    style={styles.removeBtn}
                    type="button"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <div style={styles.footer}>
              <div style={styles.totalRow}>
                <strong>Total</strong>
                <strong>${total}</strong>
              </div>

              <p style={{ fontSize: 14, marginBottom: 12 }}>
                <strong>Formas de pago:</strong> Efectivo · Transferencia · Mercado Pago
                <br />
                <strong>Envíos:</strong> Rosario y alrededores · A coordinar
                <br />
                <strong>Facturación:</strong> Factura A o B
              </p>

              <div style={styles.actions}>
                <button onClick={clearCart} style={styles.secondary} type="button">
                  Vaciar
                </button>

                <a
                  style={styles.primary}
                  href={`https://wa.me/5491150518502?text=${encodeURIComponent(
                    "Hola Rosart, quiero realizar este pedido:\n\n" +
                      items
                        .map((x) => `• ${x.name} x${x.qty} = $${Number(x.price || 0) * Number(x.qty || 0)}`)
                        .join("\n") +
                      `\n\nTotal: $${total}\n\n` +
                      "Forma de pago: \n" +
                      "Envío: \n" +
                      "Necesito factura: Sí / No\n"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Finalizar por WhatsApp
                </a>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.35)",
    zIndex: 40,
  },
  drawer: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    width: "min(420px, 92vw)",
    background: "#fff",
    zIndex: 50,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    boxShadow: "-10px 0 30px rgba(0,0,0,.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottom: "1px solid #eee",
  },
  iconBtn: {
    border: "1px solid #ddd",
    background: "white",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: "12px 0",
    display: "grid",
    gap: 12,
    overflow: "auto",
    flex: 1,
  },
  item: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 10,
  },
  thumb: {
    width: 54,
    height: 54,
    objectFit: "cover",
    borderRadius: 10,
    border: "1px solid #eee",
  },
  qtyRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    border: "1px solid #eee",
    borderRadius: 999,
    padding: "4px 8px",
  },
  qtyBtn: {
    border: "1px solid #ddd",
    background: "white",
    borderRadius: 999,
    width: 30,
    height: 30,
    cursor: "pointer",
    fontWeight: 800,
  },
  qtyValue: {
    minWidth: 18,
    textAlign: "center",
    fontWeight: 700,
  },
  removeBtn: {
    border: "1px solid #ddd",
    background: "white",
    borderRadius: 10,
    padding: "8px 10px",
    cursor: "pointer",
  },
  footer: {
    borderTop: "1px solid #eee",
    paddingTop: 12,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: 10,
  },
  secondary: {
    border: "1px solid #111",
    background: "white",
    borderRadius: 10,
    padding: "10px 12px",
    cursor: "pointer",
  },
  primary: {
    textDecoration: "none",
    textAlign: "center",
    border: "1px solid #111",
    background: "#111",
    color: "white",
    borderRadius: 10,
    padding: "10px 12px",
    cursor: "pointer",
  },
}
