export default function ProductCard({ product, onAdd }) {
  return (
    <article className="homeCard">
      <img
        className="homeCard__img"
        src={product.image}
        alt={product.name}
      />

      <div className="homeCard__body">
        <h3 className="homeCard__title">{product.name}</h3>

        <p className="homeCard__text">{product.description}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <strong className="pPrice">$ {product.price}</strong>

          <button className="pAddBtn" type="button" onClick={onAdd}>
            Agregar 🛒
          </button>
        </div>
      </div>
    </article>
  )
}
