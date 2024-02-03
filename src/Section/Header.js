import React from 'react'
import FontLicenseModal from '../Component/FontLicenseModal';
import AboutUsModal from '../Component/AboutUsModal';

export default function Header() {
  return (
    <header className='d-lg-flex mycontainer'>
        <h1 className=''>
          <a href='/'>
          <img className='logo' src="./img/logo-pc.png" alt=""/>
          {/* <img src="./img/logo-mobile.png" alt=""/> */}
          </a>
        </h1>
        <ul className='d-flex justify-content-around'>
          <li><FontLicenseModal/></li>
          <li><AboutUsModal/></li>
        </ul>
    </header>
  )
}
