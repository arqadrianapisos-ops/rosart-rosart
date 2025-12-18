import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) setEmail(stored)
  }, [])

  const handleSave = () => {
    if (!email) return
    localStorage.setItem("user", email)
    setSaved(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setEmail("")
    setSaved(false)
  }

  return (
    <section style={{ padding: 40, maxWidth: 520, margin: "0 auto" }}>
      <h2 className="sectionTitle">Mi cuenta / Facturación</h2>

      <div
        style={{
          border: "1px solid #eee",
          borderRadius: 18,
          padding: 18,
          background: "#fff",
          boxShadow: "0 10px 22px rgba(0,0,0,.08)",
          display: "grid",
          gap: 12,
        }}
      >
        <label>
          Email para facturación
          <input
            type="email"
            placeholder="tuemail@..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setSaved(false)
            }}
            style={inp}
          />
        </label>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={btnPrimary} type="button" onClick={handleSave}>
            Guardar
          </button>

          <button style={btnOutline} type="button" onClick={handleLogout}>
            Borrar datos
          </button>
        </div>

        {saved && (
          <div
            style={{
              background: "#f2fbf5",
              border: "1px solid #cfe9d6",
              padding: 12,
              borderRadius: 12,
            }}
          >
            Datos guardados correctamente.
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate("/contact")}
          style={{ ...btnOutline, marginTop: 6 }}
        >
          Ir a Contacto / Presupuesto
        </button>
      </div>
    </section>
  )
}

const inp = {
  width: "100%",
  marginTop: 6,
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ccc",
  outline: "none",
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
