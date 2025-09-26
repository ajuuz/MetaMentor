import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/tanstackConfig/tanstackConfig.ts'

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
)
