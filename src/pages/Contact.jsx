import { useMemo, useState } from "react"

export default function Contact() {
  // Email guardado (si existe) para facturación
  const storedUser = useMemo(() => localStorage.getItem("user") || "", [])

  const [billingEnabled, setBillingEnabled] = useState(false)
  const [sent, setSent] = useState(false)

  // Consulta / Presupuesto (siempre disponible)
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // Datos de facturación (opcional)
  const [billing, setBilling] = useState({
    email: storedUser,
    fullName: "",
    dniCuit: "",
    address: "",
    city: "",
  })

  const onChangeContact = (e) => {
    const { name, value } = e.target
    setContact((prev) => ({ ...prev, [name]: value }))
    setSent(false)
  }

  const onChangeBilling = (e) => {
    const { name, value } = e.target
    setBilling((prev) => ({ ...prev, [name]: value }))
    setSent(false)
  }

  const handleSaveBillingSession = () => {
    if (billing.email) {
      localStorage.setItem("user", billing.email)
    }
  }

  const handleClearBillingSession = () => {
    localStorage.removeItem("user")
  }

  
  const handleSubmit = (e) => {
    e.preventDefault()

    setSent(true)

    // Limpiar consulta
    setContact({
      name: "",
      email: "",
      phone: "",
      message: "",
    })

    // Limpiar facturación SOLO al enviar
    if (billingEnabled) {
      setBilling({
        email: localStorage.getItem("user") || "",
        fullName: "",
        dniCuit: "",
        address: "",
        city: "",
      })
      setBillingEnabled(false)
    }
  }

  return (
    <section style={{ padding: 40, maxWidth: 920, margin: "0 auto" }}>
      <h2 className="sectionTitle">Contacto </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: 18,
          display: "grid",
          gap: 16,
          background: "#fff",
          padding: 20,
          borderRadius: 16,
          boxShadow: "0 10px 22px rgba(0,0,0,.08)",
        }}
      >
        {/* CONSULTA */}
        <h3 style={{ margin: 0 }}>Consulta</h3>

        <div style={row2}>
          <label>
            Nombre
            <input
              name="name"
              value={contact.name}
              onChange={onChangeContact}
              required
              style={input}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={onChangeContact}
              required
              style={input}
            />
          </label>
        </div>

        <div style={row2}>
          <label>
            Teléfono (opcional)
            <input
              name="phone"
              value={contact.phone}
              onChange={onChangeContact}
              style={input}
            />
          </label>
          <div />
        </div>

        <label>
          Mensaje
          <textarea
            name="message"
            rows={5}
            value={contact.message}
            onChange={onChangeContact}
            required
            style={{ ...input, resize: "vertical" }}
          />
        </label>

        <div style={divider} />

        {/* FACTURACIÓN */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            id="billingEnabled"
            type="checkbox"
            checked={billingEnabled}
            onChange={(e) => setBillingEnabled(e.target.checked)}
          />
          <label htmlFor="billingEnabled">
            Quiero cargar datos de facturación
          </label>
        </div>

        {billingEnabled && (
          <div style={{ display: "grid", gap: 14 }}>
            <h3 style={{ margin: 0 }}>Datos para Presupuestos y/o facturación</h3>

            <div style={row2}>
              <label>
                Email (facturación)
                <input
                  type="email"
                  name="email"
                  value={billing.email}
                  onChange={onChangeBilling}
                  style={input}
                />
              </label>

              <label>
                Nombre / Razón social
                <input
                  name="fullName"
                  value={billing.fullName}
                  onChange={onChangeBilling}
                  style={input}
                />
              </label>
            </div>

            <div style={row2}>
              <label>
                DNI / CUIT
                <input
                  name="dniCuit"
                  value={billing.dniCuit}
                  onChange={onChangeBilling}
                  style={input}
                />
              </label>

              <label>
                Ciudad
                <input
                  name="city"
                  value={billing.city}
                  onChange={onChangeBilling}
                  style={input}
                />
              </label>
            </div>

            <label>
              Dirección
              <input
                name="address"
                value={billing.address}
                onChange={onChangeBilling}
                style={input}
              />
            </label>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="button" style={btnOutline} onClick={handleSaveBillingSession}>
                Guardar email
              </button>

              <button type="button" style={btnOutline} onClick={handleClearBillingSession}>
                Borrar email guardado
              </button>
            </div>
          </div>
        )}

        <button type="submit" style={btnPrimary}>
          Enviar consulta
        </button>

        {sent && (
          <div style={successBox}>
            Gracias por tu mensaje. Te responderemos a la brevedad.
          </div>
        )}
      </form>
    </section>
  )
}

const row2 = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 14,
}

const input = {
  width: "100%",
  marginTop: 6,
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ccc",
  outline: "none",
}

const divider = {
  height: 1,
  background: "#eee",
  margin: "6px 0",
}

const btnPrimary = {
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  borderRadius: 999,
  padding: "10px 14px",
  cursor: "pointer",
}

const btnOutline = {
  border: "1px solid #111",
  background: "#fff",
  color: "#111",
  borderRadius: 999,
  padding: "10px 14px",
  cursor: "pointer",
}

const successBox = {
  background: "#f2fbf5",
  border: "1px solid #cfe9d6",
  padding: 12,
  borderRadius: 12,
}
