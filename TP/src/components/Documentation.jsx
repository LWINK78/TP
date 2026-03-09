import React from 'react'
import readme from '../../README.md?raw'

// Ajouté par auteur — commentaire de fonction (remplacez si besoin)
export default function Documentation() {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      margin: '1rem 0',
      maxHeight: '50vh',
      overflow: 'auto',
      background: '#fafafa'
    }}>
      <h2>Documentation</h2>
      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{readme}</pre>
    </div>
  )
}
