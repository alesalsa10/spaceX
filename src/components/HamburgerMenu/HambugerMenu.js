import React from 'react';
import './HamburgerMenu.css';
import { stack as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

const HambugerMenu = () => {
  return (
    <Menu right outerContainerId={'outer-container'}>
      <Link className='menu-item links' to='/'>
        MISSIONS
      </Link>
      <Link className='menu-item links' to='/vehicles/falcon9'>
        FALCON 9
      </Link>
      <Link className='menu-item links' to='/vehicles/falconheavy'>
        FALCON HEAVY
      </Link>
      <Link className='menu-item links' to='/vehicles/dragon'>
        DRAGON
      </Link>
      <Link className='menu-item links' to='/vehicles/starship'>
        STARSHIP
      </Link>
    </Menu>
  );
};

export default HambugerMenu;
