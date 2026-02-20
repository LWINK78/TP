import React from 'react'
import './Child.css'

export default function Child({ value, onChange }) {
  return (
    <div className="child">
      <label>
        Mot enfant :
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Écris un mot ici"
        />
      </label>
    </div>
  )
}
