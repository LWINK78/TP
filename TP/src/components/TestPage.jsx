import { useState } from 'react'

export function isPrime(n) {
  if (typeof n !== 'number' || !Number.isInteger(n) || n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false
  }
  return true
}

export default function TestPage() {
  const [value, setValue] = useState('')
  const [output, setOutput] = useState(null)

  const runTest = () => {
    const n = parseInt(value, 10)
    if (Number.isNaN(n)) {
      setOutput('Entrée invalide')
      return
    }
    setOutput(isPrime(n) ? `${n} est un nombre premier` : `${n} n'est pas premier`)
  }

  return (
    <div style={{ marginTop: '1rem', padding: '1rem', border: '1px dashed #888' }}>
      <h2>Page de test : fonction `isPrime`</h2>
      <p>Entrez un entier pour tester si c'est un nombre premier.</p>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ex: 7"
          style={{ padding: '0.25rem' }}
        />
        <button onClick={runTest}>Tester</button>
        <button onClick={() => { setValue(''); setOutput(null) }}>Réinitialiser</button>
      </div>
      {output && <div style={{ marginTop: '0.75rem' }}>{output}</div>}
    </div>
  )
}
