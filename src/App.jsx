import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'
import { StoreProvider } from '@/context/StoreContext'
import { CartProvider } from '@/context/CartContext'
import AppRoutes from '@/routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <CartProvider>
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-md)',
                },
                success: { iconTheme: { primary: 'var(--color-success)', secondary: '#fff' } },
                error:   { iconTheme: { primary: 'var(--color-error)',   secondary: '#fff' } },
              }}
            />
          </CartProvider>
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}