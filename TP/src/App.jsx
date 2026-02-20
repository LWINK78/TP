import { useState } from 'react'
import './App.css'
import Child from './components/Child'

function App() {
  const [word, setWord] = useState('WORDs')

  return (
    <>

      <h1>
         <span className="highlight">{word}</span>
      </h1>

      <div className="card">
        <Child value={word} onChange={setWord} />
        
      </div>

      <p className="read-the-docs">
      </p>
    </>
  )
}

export default App
