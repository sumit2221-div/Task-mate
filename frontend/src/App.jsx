import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/dashboard'
import CreateTask from './pages/createTask'

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-Task" element={<CreateTask/>} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App
