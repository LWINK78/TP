import React from 'react'
import './DateSelector.css'

// Ajouté par auteur — commentaire de fonction (remplacez si besoin)
export default function DateSelector({ date, onChange }) {
  return (
    <div className="date-selector">
      <label>
        Sélectionnez la date :
        <input
          type="date"
          value={date}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  )
}
