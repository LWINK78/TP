import React, { useState, useEffect } from 'react'
import './UVInfo.css'

// Ajouté par auteur — commentaire de fonction (remplacez si besoin)
export default function UVInfo({ date, longitude = '6.132936441', latitude = '46.220473615' }) {
  const [loading, setLoading] = useState(false)
  const [uv, setUv] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let canceled = false
    // Ajouté par auteur — commentaire de fonction (remplacez si besoin)
    async function fetchUv() {
      setLoading(true)
      setError(null)
      setUv(null)
      try {
        const params = new URLSearchParams({ longitude: String(longitude), latitude: String(latitude) })
        const url = `https://solaire-api-w20a.onrender.com/uv_week/?${params.toString()}`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()

        // Try to find an array of daily items in common keys
        let arr = null
        if (Array.isArray(data)) arr = data
        else if (Array.isArray(data.results)) arr = data.results
        else if (Array.isArray(data.data)) arr = data.data
        else if (Array.isArray(data.days)) arr = data.days
        else if (Array.isArray(data.uv_week)) arr = data.uv_week
        else if (Array.isArray(data.infos)) arr = data.infos

        const target = date // expected YYYY-MM-DD
        let found = null
        console.log('Looking for UV data for date', target, 'in', data)
        if (Array.isArray(arr)) {
          found = arr.find((item) => {
            const d = item.date || item.datetime || item.time || item.day
            if (!d) return false
            const ds = String(d).slice(0, 10)
            console.log('Comparing', ds, 'to', target)
            return ds === target
          })
          // fallback: try index by difference from today
          if (!found) {
            const today = new Date().toISOString().slice(0, 10)
            const diff = Math.round((new Date(target) - new Date(today)) / (1000 * 60 * 60 * 24))
            if (arr[diff]) found = arr[diff]
          }
        }

        if (found) {
          const uvIndex =
            found.uv_index ?? found.uvIndex ?? found.uv ?? found.max_uv ?? found.max ?? found.mean ?? found.value
          if (uvIndex !== undefined && uvIndex !== null) {
            setUv(uvIndex)
          } else {
            // If the day object contains hourly values, try to pick a representative uv_index
            if (Array.isArray(found.hourly)) {
              const first = found.hourly[0]
              const hv = first && (first.uv_index ?? first.uv ?? first.value)
              if (hv !== undefined) setUv(hv)
              else setError('Aucune valeur `uv_index` trouvée dans les données journalières.')
            } else {
              setError('Aucune valeur `uv_index` trouvée pour la date sélectionnée.')
            }
          }
        } else {
          // try top-level fields
          const topUv = data.uv_index ?? data.uv
          if (topUv !== undefined) setUv(topUv)
          else setError('Aucune donnée UV disponible pour la date sélectionnée.')
        }
      } catch (err) {
        if (!canceled) setError(err.message)
      } finally {
        if (!canceled) setLoading(false)
      }
    }

    fetchUv()
    return () => {
      canceled = true
    }
  }, [date])

  if (loading) return <div>Chargement des données UV…</div>
  if (error) return <div style={{ color: 'crimson' }}>Erreur : {error}</div>
  if (uv === null) return <div>Aucune donnée UV.</div>

  return (
    <div className="uv-info">
      <strong>Indice UV</strong>
      <div>{String(uv)}</div>
     
    </div>
  )
}
