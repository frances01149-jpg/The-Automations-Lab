import { Routes, Route } from 'react-router-dom'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import Home from '@/pages/Home'
import Brand from '@/pages/Brand'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brand" element={<Brand />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
