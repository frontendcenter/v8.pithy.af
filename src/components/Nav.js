import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.svg'

export default () => (
  <nav className="Nav mb3">
    <Link to="/" className="Logo">
      <img src={ logo } alt="pithy.af logo" />
    </Link>
    <a className="NavLink" href="#about">About</a>
    <a className="NavLink" href="#submit">Submit a quote</a>
  </nav>
)
