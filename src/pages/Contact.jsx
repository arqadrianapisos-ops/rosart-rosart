import { useMemo, useState } from "react"

function Badge({ icon, text }) {
  return (
    <span style={styles.badge}>
      <span aria-hidden="true">{icon}</span>
      {text}
    </span>
  )
}

function InfoCard({ title, children }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.h3}>{title}</h3>
      <div style={styles.cardBody}>{children}</div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    subject: "Consulta general",
    message: "",
    invoice: "No",
    shipping: "Envío internacional",
    payment: "Tarjeta",
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const waText = useMemo(() => {
    const lines = [
      "Hola Rosart, quiero hacer una consulta:",
      "",
      `Nombre: ${form.name || "-"}`,
      `Email: ${form.email || "-"}`,
      `País/Ciudad: ${form.country || "-"}`,
      `Asunto: ${form.subject || "-"}`,
      "",
      `Mensaje: ${form.message || "-"}`,
      "",
      "Preferencias:",
      `• Forma de pago: ${form.payment}`,
      `• Envío: ${form.shipping}`,
      `• Necesito factura: ${form.invoice}`,
    ]
    return encodeURIComponent(lines.join("\n"))
  }, [form])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Guardar contacto en LocalStorage
    const payload = { id: Date.now(), createdAt: new Date().toISOString(), ...form }
    const key = "rosart_contacts"
    const prev = JSON.parse(localStorage.getItem(key) || "[]")
    prev.push(payload)
    localStorage.setItem(key, JSON.stringify(prev))

    // Limpiar formulario ✅
    setForm({
      name: "",
      email: "",
      country: "",
      subject: "Consulta general",
      message: "",
      invoice: "No",
      shipping: "Envío internacional",
      payment: "Tarjeta",
    })

    // Abrir WhatsApp
    window.open(`https://wa.me/5491150518502?text=${waText}`, "_blank")
  }

  return (
    <section style={styles.wrap}>
      <h2 className="sectionTitle">Contacto</h2>

      {/* Seguridad / confianza */}
      <div style={styles.badgesRow}>
        <Badge icon="🔒" text="Pago seguro" />
        <Badge icon="🧾" text="Facturación" />
        <Badge icon="🚚" text="Envíos internacionales" />
        <Badge icon="🛡️" text="Garantía" />
        <Badge icon="💬" text="Soporte" />
      </div>

      <div style={styles.grid}>
        {/* FORMULARIO */}
        <div style={styles.card}>
          <h3 style={styles.h3}>Formulario de contacto</h3>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row2}>
              <label style={styles.label}>
                Nombre
                <input name="name" value={form.name} onChange={onChange} style={styles.input} required />
              </label>

              <label style={styles.label}>
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  style={styles.input}
                  required
                />
              </label>
            </div>

            <div style={styles.row2}>
              <label style={styles.label}>
                País / Ciudad
                <input
                  name="country"
                  value={form.country}
                  onChange={onChange}
                  style={styles.input}
                  placeholder="Barcelona, España"
                />
              </label>

              <label style={styles.label}>
                Asunto
                <select name="subject" value={form.subject} onChange={onChange} style={styles.input}>
                  <option>Consulta general</option>
                  <option>Pedido / Stock</option>
                  <option>Envíos</option>
                  <option>Facturación</option>
                  <option>Personalización</option>
                </select>
              </label>
            </div>

            <div style={styles.row3}>
              <label style={styles.label}>
                Forma de pago
                <select name="payment" value={form.payment} onChange={onChange} style={styles.input}>
                  <option>Tarjeta</option>
                  <option>Transferencia</option>
                  <option>PayPal</option>
                  <option>Mercado Pago</option>
                </select>
              </label>

              <label style={styles.label}>
                Envío
                <select name="shipping" value={form.shipping} onChange={onChange} style={styles.input}>
                  <option>Envío internacional</option>
                  <option>Envío nacional</option>
                  <option>Retiro en tienda</option>
                  <option>A coordinar</option>
                </select>
              </label>

              <label style={styles.label}>
                ¿Necesito factura?
                <select name="invoice" value={form.invoice} onChange={onChange} style={styles.input}>
                  <option>Sí</option>
                  <option>No</option>
                </select>
              </label>
            </div>

            <label style={styles.label}>
              Mensaje
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                style={{ ...styles.input, minHeight: 120 }}
                required
              />
            </label>

            <div style={styles.actions}>
              <button type="submit" style={styles.primaryBtn}>
                Enviar consulta
              </button>

              <a
                href={`https://wa.me/5491150518502?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                style={styles.secondaryBtn}
              >
                Abrir WhatsApp
              </a>
            </div>
          </form>
        </div>

        {/* INFO: pagos / envíos / facturación */}
        <div style={{ display: "grid", gap: 18 }}>
          <InfoCard title="Formas de pago">
            <ul style={styles.ul}>
              <li>Tarjeta (crédito / débito)</li>
              <li>Transferencia bancaria</li>
              <li>PayPal</li>
              <li>Mercado Pago (según país)</li>
            </ul>
          </InfoCard>

          <InfoCard title="Envíos">
            <ul style={styles.ul}>
              <li>Envíos nacionales e internacionales</li>
              <li>Costos y tiempos según destino</li>
              <li>Seguimiento cuando esté disponible</li>
            </ul>
          </InfoCard>

          <InfoCard title="Facturación">
            <p style={{ margin: 0, lineHeight: 1.7 }}>
              Emitimos comprobante/factura. Si necesitás factura con datos fiscales,
              indicá nombre/empresa, documento y dirección.
            </p>
          </InfoCard>
        </div>
      </div>
    </section>
  )
}

const styles = {
  wrap: { padding: 40, maxWidth: 1150, margin: "0 auto" },

  badgesRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    margin: "10px 0 22px",
    justifyContent: "center",
  },
  badge: {
    display: "inline-flex",
    gap: 8,
    alignItems: "center",
    border: "1px solid #eee",
    background: "#fff",
    color: "#7a3c3c",
    borderRadius: 999,
    padding: "8px 12px",
    boxShadow: "0 10px 18px rgba(0,0,0,.06)",
    fontSize: 14,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr",
    gap: 18,
  },

  card: {
    border: "1px solid #eee",
    background: "#fff",
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 10px 22px rgba(0,0,0,.08)",
    color: "#7a3c3c",
  },

  h3: {
    margin: "0 0 10px",
    fontFamily: 'Georgia, "Times New Roman", serif',
  },

  cardBody: {},

  form: { display: "grid", gap: 12 },

  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  row3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 },

  label: { display: "grid", gap: 6, fontSize: 14 },

  input: {
    border: "1px solid #eee",
    borderRadius: 12,
    padding: "10px 12px",
    outline: "none",
    fontFamily: "inherit",
  },

  actions: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 },

  primaryBtn: {
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    borderRadius: 999,
    padding: "10px 14px",
    cursor: "pointer",
  },

  secondaryBtn: {
    textDecoration: "none",
    border: "1px solid #111",
    background: "#fff",
    color: "#111",
    borderRadius: 999,
    padding: "10px 14px",
    display: "inline-block",
  },

  ul: { margin: 0, paddingLeft: 18, lineHeight: 1.7 },
}
