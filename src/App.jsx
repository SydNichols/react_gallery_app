import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes, Navigate } from 'react-router-dom'
import Search from './components/Search'
import Nav from './components/Nav'
import PhotoList from './components/PhotoList'
import apiKey from './config'

function App() {

  return (
    <div className="container">
      <Search></Search>
      <Nav />

    </div>
  )
}

export default App
