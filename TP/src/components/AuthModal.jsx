import { useState } from 'react'
import './AuthModal.css'

/**
 * composant AuthModal : Affiche une modal d'authentification avec un bouton pour envoyer un lien d'authentification par email.
 */
export default function AuthModal() {
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
  const handleSendLink = async () => {
    setIsLoading(true)
    setMessage('')
    
    try {
      // Simulation d'envoi de lien d'authentification
      // En production, cela ferait un appel API à votre backend
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSuccess(true)
      setMessage('✓ Un lien d\'authentification a été envoyé à allmmsaunier@gmail.com')
      
      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setShowModal(false)
        setIsSuccess(false)
        setMessage('')
      }, 3000)
    } catch (error) {
      setMessage('✗ Une erreur s\'est produite. Veuillez réessayer.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
  const handleCloseModal = () => {
    if (!isLoading) {
      setShowModal(false)
      setMessage('')
      setIsSuccess(false)
    }
  }

  return (
    <>
      {/* Bouton d'authentification */}
      <button onClick={() => setShowModal(true)} className="auth-btn">
        🔐 Se connecter
      </button>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Authentification</h2>
              <button 
                className="close-btn" 
                onClick={handleCloseModal}
                disabled={isLoading}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {!isSuccess ? (
                <>
                  <p className="modal-text">
                    Cliquez sur le bouton ci-dessous pour recevoir un lien d'authentification par email
                  </p>
                  
                  <div className="email-display">
                    <span className="email-icon">✉️</span>
                    <span className="email-text">allmmsaunier@gmail.com</span>
                  </div>

                  <button 
                    onClick={handleSendLink}
                    disabled={isLoading}
                    className="send-btn"
                  >
                    {isLoading ? (
                      <span className="spinner"></span>
                    ) : (
                      'Envoyer le lien d\'authentification'
                    )}
                  </button>

                  {message && (
                    <p className="error-message">{message}</p>
                  )}

                  <div className="auth-info">
                    <p className="info-text">
                      Provider: <strong>Google</strong>
                    </p>
                  </div>
                </>
              ) : (
                <div className="success-state">
                  <div className="success-icon">✓</div>
                  <p>{message}</p>
                  <p className="success-info">Vérifiez votre boîte de réception</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
