import React from 'react'

export default function Header() {
  return (
    <header className='d-lg-flex'>
        <h1 className=''>
          <a href='/'>
          <img className='logo' src="./img/logo-pc.png" alt=""/>
          {/* <img src="./img/logo-mobile.png" alt=""/> */}
          </a>
        </h1>
        <ul className='d-flex justify-content-around'>
          <li><h3><a href="">Abous Us</a></h3></li>
          <li><h3><a href="">Request Us</a></h3></li>
        </ul>
    </header>
  )
}
