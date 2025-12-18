export default function InfoCompra() {
  const box = {
    border: "1px solid #eee",
    borderRadius: 16,
    padding: 16,
    background: "#fff",
    boxShadow: "0 10px 22px rgba(0,0,0,.06)",
  }

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 12,
    marginTop: 10,
  }

  const item = {
    border: "1px solid #f0f0f0",
    borderRadius: 14,
    padding: 12,
    display: "grid",
    gap: 6,
  }

  const title = { fontWeight: 700 }

  return (
    <section style={box} aria-label="Información de compra">
      <h3 style={{ margin: 0 }}>Información de compra</h3>

      <div style={grid}>
        <div style={item}>
          <div style={title}>🚚 Envíos</div>
          <div>
            Entregas coordinadas según zona y disponibilidad.
          </div>
        </div>

        <div style={item}>
          <div style={title}>💳 Formas de pago</div>
          <div>
            Transferencia bancaria, efectivo y otros medios a coordinar.
          </div>
        </div>

        <div style={item}>
          <div style={title}>🧾 Facturación</div>
          <div>
            Emisión de comprobante /factura.Si necesitas factura A, indica nombre /empresa,cuit y dirección.
          </div>
        </div>
      </div>
    </section>
  )
}
