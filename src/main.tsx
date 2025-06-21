import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UIProvider } from '@contexts/UIProvider.tsx'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@contexts/AuthProvider.tsx'
import QueryProvider from '@contexts/QueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename='/todo'>
            <QueryProvider>
                <AuthProvider>
                    <UIProvider>
                        <App />
                        <Toaster position="top-center" reverseOrder={false} />
                    </UIProvider>
                </AuthProvider>
            </QueryProvider>
        </BrowserRouter>
    </StrictMode>,
)
