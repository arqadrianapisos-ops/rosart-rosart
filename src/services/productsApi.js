export async function getProducts() {
  const res = await fetch("/api/products")
  if (!res.ok) throw new Error("Error cargando productos")
    return res.json()
}
