import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import { Integrations } from './pages/Integrations'
import { Blog } from './pages/Blog'
import { KYC } from './pages/KYC'
import { Fingerprint } from './pages/Fingerprint'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Router>
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
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/kyc" element={<KYC />} />
              <Route path="/fingerprint" element={<Fingerprint />} />
            </Routes>
          </Layout>
        </Router>
      </ToastProvider>
    </QueryClientProvider>
  )
}

export default App
