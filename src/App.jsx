import { useState } from 'react'
import './App.css'
import Generator from './components/generator'
function App() {
  const [owner,setOwner] = useState('_MinarulHoque')
  return (
    <div id="app" className="flex items-center">
      <Generator/>
      <div className="copywrite">React Project 01 <span className="name">{owner}</span></div>
    </div>
  )
}

export default App
