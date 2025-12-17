import Header from "./Header"
import Footer from "./Footer"

export default function Layout({ children, onOpenCart }) {
  return (
    <>
      <Header onOpenCart={onOpenCart} />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
