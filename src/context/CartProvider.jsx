import { useCallback, useEffect, useMemo, useState } from "react"
import { CartContext } from "./CartContext.jsx"

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("rosart_cart")
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const getId = useCallback((obj) => (obj && (obj.id || obj._id || obj.name)) || "", [])
  const getPrice = useCallback((obj) => Number((obj && (obj.price || obj.precio)) || 0), [])
  const getQty = useCallback((obj) => Number((obj && obj.qty) || 0), [])

  useEffect(() => {
    try {
      localStorage.setItem("rosart_cart", JSON.stringify(items))
    } catch {
      // sin acción
    }
  }, [items])

  const addToCart = useCallback(
    (product) => {
      setItems((prev) => {
        const id = getId(product)
        const idx = prev.findIndex((i) => getId(i) === id)

        if (idx !== -1) {
          return prev.map((i, index) =>
            index === idx ? { ...i, qty: getQty(i) + 1 } : i
          )
        }

        return prev.concat([{ ...product, id, price: getPrice(product), qty: 1 }])
      })
    },
    [getId, getPrice, getQty]
  )

  const incrementQty = useCallback(
    (id) => {
      setItems((prev) =>
        prev.map((i) => (getId(i) === id ? { ...i, qty: getQty(i) + 1 } : i))
      )
    },
    [getId, getQty]
  )

  const decrementQty = useCallback(
    (id) => {
      setItems((prev) => {
        const item = prev.find((i) => getId(i) === id)
        if (!item) return prev

        const nextQty = getQty(item) - 1

        if (nextQty <= 0) {
          return prev.filter((i) => getId(i) !== id)
        }

        return prev.map((i) => (getId(i) === id ? { ...i, qty: nextQty } : i))
      })
    },
    [getId, getQty]
  )

  const removeFromCart = useCallback(
    (id) => {
      setItems((prev) => prev.filter((i) => getId(i) !== id))
    },
    [getId]
  )

  const clearCart = useCallback(() => {
    setItems([])
    try {
      localStorage.removeItem("rosart_cart")
    } catch {
      // sin acción
    }
  }, [])

  const total = useMemo(() => {
    return items.reduce((acc, i) => acc + Number(i.price || 0) * getQty(i), 0)
  }, [items, getQty])

  const value = useMemo(
    () => ({
      items,
      addToCart,
      incrementQty,
      decrementQty,
      removeFromCart,
      clearCart,
      total,
    }),
    [items, addToCart, incrementQty, decrementQty, removeFromCart, clearCart, total]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
