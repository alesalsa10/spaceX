import React from 'react';
import './HamburgerMenu.css';
import { stack as Menu } from 'react-burger-menu';

export default function HambugerMenu() {
  return (
    <Menu right outerContainerId={'outer-container'}  >
      <a className='menu-item links' href='#'>
        MISSIONS
      </a>
      <a className='menu-item links' href='#'>
        FALCON 9
      </a>
      <a className='menu-item links' href='#'>
        FALCON HEAVY
      </a>
      <a className='menu-item links' href='#'>
        STARSHIP
      </a>
    </Menu>
  );
}
