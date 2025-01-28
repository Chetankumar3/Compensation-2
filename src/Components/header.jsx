import React from 'react'
import './header.css'

const header = () => {
  return (
    <header>
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        <h1>CHHATISGARH COMPENSATION</h1>
      </div>
      <a href="#" className='settings'>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
          <path d="M2 11H22V13H2zM2 5H22V7H2zM2 17H22V19H2z"></path>
        </svg>
      </a>
    </header>
  )
}

export default header