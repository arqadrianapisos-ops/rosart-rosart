export default function Login() {
  return (
    <section style={{ padding: 40, maxWidth: 520, margin: "0 auto" }}>
      <h2 className="sectionTitle">Acceder</h2>

      <div style={{
        border: "1px solid #eee",
        borderRadius: 18,
        padding: 18,
        background: "#fff",
        boxShadow: "0 10px 22px rgba(0,0,0,.08)",
        display: "grid",
        gap: 12
      }}>
        <label>
          Email
          <input
            type="email"
            placeholder="tuemail@..."
            style={inp}
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            placeholder="••••••••"
            style={inp}
          />
        </label>

        <button style={btn} type="button">
          Ingresar
        </button>

        <small style={{ color: "#7a3c3c", opacity: 0.85 }}>
          * (TP) Login visual. Luego lo conectamos a una API si lo pedís.
        </small>
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

const btn = {
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  borderRadius: 999,
  padding: "10px 14px",
  cursor: "pointer",
}
