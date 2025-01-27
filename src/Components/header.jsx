import React from 'react'
import './header.css'

const header = () => {
  return (
    <header>
      <div className="logo">
        <img src="logo.png" alt="Logo"/>
        <h1>Chhattisgarh Compensation</h1>
      </div>
      <div className="settings">
        <a href="#">Setting</a>
      </div>
    </header>
  )
}

export default header