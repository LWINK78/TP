import { useState } from 'react'
import './App.css'
import Child from './components/Child'
import DateSelector from './components/DateSelector'
import UVInfo from './components/UVInfo'
import LocationSelector from './components/LocationSelector'
import AuthModal from './components/AuthModal'
import LoginButton from './components/LoginButton'
import { AuthProvider } from './context/AuthContext'
import Documentation from './components/Documentation'
import TestPage from './components/TestPage'

// Ajouté par auteur — commentaire de fonction (remplacez si besoin)
function App() {
  const [word, setWord] = useState('WORDs')
  const today = new Date().toISOString().slice(0, 10)
  const [selectedDate, setSelectedDate] = useState(today)
  const [location, setLocation] = useState({
    longitude: '6.132936441',
    latitude: '46.220473615',
  })
  const [showLocation, setShowLocation] = useState(false)
  const [showDocs, setShowDocs] = useState(false)
  const [showTest, setShowTest] = useState(false)

  return (
    <AuthProvider>
      <>
        <AuthModal />
        <div className="container">
          <h1>
            Titre : <span className="highlight">{word}</span>
          </h1>

          <div className="card">
          <LoginButton />
          <div style={{ margin: '0.5rem 0' }}>
            <button onClick={() => setShowDocs((s) => !s)}>
              {showDocs ? 'Masquer documentation' : 'Afficher documentation'}
            </button>
            <button style={{ marginLeft: '0.5rem' }} onClick={() => setShowTest((s) => !s)}>
              {showTest ? 'Masquer page de test' : 'Afficher page de test'}
            </button>
          </div>
        <Child value={word} onChange={setWord} />
        <DateSelector date={selectedDate} onChange={setSelectedDate} />
        <div style={{ margin: '0.5rem 0' }}>
          <button onClick={() => setShowLocation((s) => !s)}>
            {showLocation ? 'Masquer coordonnées' : 'Afficher coordonnées'}
          </button>
        </div>
        {showLocation && (
          <LocationSelector
            longitude={location.longitude}
            latitude={location.latitude}
            onChange={(loc) => setLocation(loc)}
          />
        )}
        <UVInfo date={selectedDate} longitude={location.longitude} latitude={location.latitude} />
      </div>
      {showDocs && <Documentation />}
      {showTest && <TestPage />}
      </div>
      </>
    </AuthProvider>
  )
}

export default App
