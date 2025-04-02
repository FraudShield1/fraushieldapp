import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ToastProvider } from './contexts/ToastContext'
import { Dashboard } from './pages/Dashboard'
import { SOPs } from './pages/SOPs'
import { Patterns } from './pages/Patterns'
import { Insiders } from './pages/Insiders'
import { Chargebacks } from './pages/Chargebacks'
import { Warranty } from './pages/Warranty'
import { TrackingAnomalies } from './pages/TrackingAnomalies'
import { Cases } from './pages/Cases'
import { Analytics } from './pages/Analytics'
import { Users } from './pages/Users'
import { Settings } from './pages/Settings'
import { TCPFingerprint } from './pages/TCPFingerprint'

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/patterns" element={<Patterns />} />
            <Route path="/sops" element={<SOPs />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/chargebacks" element={<Chargebacks />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/tracking-anomalies" element={<TrackingAnomalies />} />
            <Route path="/tcp-fingerprint" element={<TCPFingerprint />} />
            <Route path="/insiders" element={<Insiders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
