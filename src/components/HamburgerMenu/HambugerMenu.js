import React from 'react';
import './HamburgerMenu.css';
import { stack as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom'

export default function HambugerMenu() {
  return (
    <Menu right outerContainerId={'outer-container'}>
      <Link className='menu-item links' to='/'>
        MISSIONS
      </Link>
      <Link className='menu-item links' to='/'>
        FALCON 9
      </Link>
      <Link className='menu-item links' to='/'>
        FALCON HEAVY
      </Link>
      <Link className='menu-item links' to='/'>
        DRAGON
      </Link>
      <Link className='menu-item links' to='/'>
        STARSHIP
      </Link>
    </Menu>
  );
}
