import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './LoginButton.css'

// Ajouté par auteur — commentaire de fonction (remplacez si besoin)
export default function LoginButton() {
  const { user, isAuthenticated, login, logout, isLoading, error } = useAuth()
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [email, setEmail] = useState('allmmsaunier@gmail.com')
  const [password, setPassword] = useState('password')

  // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
  const handleLogin = async () => {
    const result = await login(email, password)
    if (result.success) {
      setShowLoginForm(false)
      console.log('✓ Utilisateur connecté avec succès')
    } else {
      console.error('✗ Erreur de connexion:', result.error)
    }
  }

  // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
  const handleLogout = () => {
    logout()
    console.log('✓ Utilisateur déconnecté')
  }

  return (
    <div className="login-container">
      {!isAuthenticated ? (
        <div className="login-form-wrapper">
          <button onClick={() => setShowLoginForm(!showLoginForm)} className="login-btn">
            {isLoading ? 'Vérification...' : 'Login'}
          </button>

          {showLoginForm && (
            <div className="login-form">
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                />
              </div>
              <div className="form-group">
                <label>Mot de passe:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <button onClick={handleLogin} disabled={isLoading} className="submit-btn">
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
              {error && <p className="error-text">⚠️ {error}</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="logged-in">
          <span className="user-indicator">
            ✓ Connecté: <strong>{user?.name || user?.email}</strong>
          </span>
          <span className="token-badge">Token: {isLoading ? '...' : '✓'}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
