import React from 'react'

// Ajouté par auteur — commentaire de fonction (remplacez si besoin)
export default function LocationSelector({ longitude, latitude, onChange }) {
  return (
    <div className="location-selector">
      <label>
        Longitude:
        <input
          type="number"
          step="0.000001"
          value={longitude}
          onChange={(e) => onChange({ longitude: e.target.value, latitude })}
        />
      </label>
      <label>
        Latitude:
        <input
          type="number"
          step="0.000001"
          value={latitude}
          onChange={(e) => onChange({ longitude, latitude: e.target.value })}
        />
      </label>
    </div>
  )
}
