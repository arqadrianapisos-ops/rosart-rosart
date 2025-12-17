
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__overlay">
          <h1 className="hero__brand">Rosart</h1>
          <h2 className="hero__title">
            Regalos que <em>florecen</em> para siempre
          </h2>
          <p className="hero__subtitle">
            Detalles artesanales y elegantes para celebrar momentos que perduran.
          </p>

          <Link className="hero__cta" to="/productos">
            Ver catálogo
          </Link>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="about">
        <h2 className="sectionTitle">Quiénes somos</h2>

        <p className="about__text">
          En <strong>Rosart</strong> diseñamos regalos artesanales exclusivos y de calidad premium:
          Rosas eternas, cuadros florales, acuarelas.
        </p>

        <p className="about__highlight">
          “Aniversarios, Cumpleaños, Eventos especiales”
        </p>

        <p className="about__text">
          Creemos en la belleza duradera y en el cuidado por cada detalle.
        </p>

        <p className="about__text">
          <strong>Enviá amor</strong>, pero no cualquier amor: un amor que dure para siempre.
          Nuestras cajas de rosas eternas duran años sin marchitarse y sin necesidad de mantenimiento.
        </p>

        <div className="badges">
          <div className="badge">💳 <span>Pagos seguros</span></div>
          <div className="badge">🏦 <span>Transferencia</span></div>
          <div className="badge">🛡️ <span>Garantía</span></div>
        </div>
      </section>
    </>
  )
}
