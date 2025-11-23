import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '../context/CartContext'
import { FavoritesProvider } from '../context/FavoritesContext'
import Analytics from '../components/Analytics'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <FavoritesProvider>
          <Analytics />
          <Component {...pageProps} />
        </FavoritesProvider>
      </CartProvider>
    </SessionProvider>
  )
}
