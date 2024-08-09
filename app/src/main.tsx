import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/root.tsx'
import HomePage from './pages/HomePage/index.tsx'
import SearchPage from './pages/SearchPage/index.tsx'
import './index.css'
import { ThemeProvider } from './components/Theme';
import { HistoryProvider } from './components/History'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/search',
        element: <SearchPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <HistoryProvider>
        <RouterProvider router={router} />
      </HistoryProvider>
    </ThemeProvider>
  </StrictMode>,
)
