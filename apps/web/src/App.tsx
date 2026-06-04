import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages'

function SignupPlaceholder() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-auth-bg text-white">
      <p>Página de cadastro em breve.</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPlaceholder />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
