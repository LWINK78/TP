import { createContext, useContext, useState, useEffect } from 'react'

// Création du contexte d'authentification
const AuthContext = createContext()

// Provider pour envelopper l'app
// Ajouté par auteur — commentaire de fonction (remplacez si besoin)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)

  // Vérifier le token au chargement de l'app
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('authUser')

    if (storedToken && storedUser) {
      // Vérifier si le token est valide
      verifyToken(storedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  // Fonction pour vérifier le token
  // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
  const verifyToken = async (tokenToVerify) => {
    try {
      setIsLoading(true)
      setError(null)

      // Simulation de la vérification du token
      // En production, vous ferez un appel API à votre backend
      const response = await fetch('http://localhost:3000/api/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenToVerify}`
        }
      }).catch(() => {
        // Si le backend n'existe pas, on simule une vérification locale
        return null
      })

      if (response && response.ok) {
        const userData = await response.json()
        setUser(userData.user)
        setToken(tokenToVerify)
        localStorage.setItem('authToken', tokenToVerify)
        localStorage.setItem('authUser', JSON.stringify(userData.user))
      } else {
        // Token invalide ou expiré
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUser')
        setUser(null)
        setToken(null)
        setError('Token expiré ou invalide')
      }
    } catch (err) {
      console.error('Erreur lors de la vérification du token:', err)
      setError('Erreur de vérification')
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction de connexion
  // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
  const login = async (email, password) => {
    try {
      setIsLoading(true)
      setError(null)

      // Appel API pour se connecter
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }).catch(() => {
        // Simulation si pas de backend
        return null
      })

      if (response && response.ok) {
        const data = await response.json()
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('authUser', JSON.stringify(data.user))
        return { success: true }
      } else {
        // Simulation locale
        const mockUser = { email, id: Date.now(), name: email.split('@')[0] }
        const mockToken = `token_${Date.now()}_${Math.random()}`
        setUser(mockUser)
        setToken(mockToken)
        localStorage.setItem('authToken', mockToken)
        localStorage.setItem('authUser', JSON.stringify(mockUser))
        return { success: true }
      }
    } catch (err) {
      setError('Erreur de connexion')
      console.error(err)
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction de déconnexion
  // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    setError(null)
  }

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    logout,
    verifyToken,
    isAuthenticated: !!user && !!token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook personnalisé pour utiliser le contexte
// Ajouté par auteur — commentaire de fonction (remplacez si besoin)
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}
