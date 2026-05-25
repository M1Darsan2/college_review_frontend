"use client"
import Nav from './Nav'
import MobileNav from './MobileNav'
import { useState } from 'react';

const NavWrapper = () => {
      const [showNav, setShowNav] = useState(false);
  const closeNav = () => setShowNav(false);
  const openNav = () => setShowNav(true);
  return (
    <div>
        <Nav openNav={openNav}/>
        <MobileNav showNav={showNav} closeNav={closeNav}/>
    </div>
  )
}

export default NavWrapper