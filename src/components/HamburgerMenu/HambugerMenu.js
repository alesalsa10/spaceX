import React, {useState} from 'react';
import './HamburgerMenu.css';
import { stack as Menu } from 'react-burger-menu';
import { Link, NavLink } from 'react-router-dom';


const HambugerMenu = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleOnOpen = () => {
    setIsOpen(true)
  }

  const handleOnClose = () => {
    setIsOpen(false)
  }

  let isMenuOpen = function (state) {
    return state.isOpen;
  };

  return (
    <Menu
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onStateChange={isMenuOpen}
      isOpen={isOpen}
      right
      outerContainerId={'outer-container'}
    >
      <NavLink className='menu-item links' to='/missions' onClick={handleOnClose} activeClassName='activeLink'>
        MISSIONS
      </NavLink>
      <NavLink
        className='menu-item links'
        to='/vehicles/falcon9'
        onClick={handleOnClose} activeClassName='activeLink'
      >
        FALCON 9
      </NavLink>
      <NavLink
        className='menu-item links'
        to='/vehicles/falconheavy'
        onClick={handleOnClose} activeClassName='activeLink'
      >
        FALCON HEAVY
      </NavLink>

      <NavLink
        className='menu-item links'
        to='/vehicles/starship'
        onClick={handleOnClose} activeClassName='activeLink'
      >
        STARSHIP
      </NavLink>
      <NavLink
        className='menu-item links'
        to='/vehicles/dragon2'
        onClick={handleOnClose} activeClassName='activeLink'
      >
        DRAGON 2
      </NavLink>
      <NavLink className='menu-item links' to='/starlink' onClick={handleOnClose} activeClassName='activeLink'>
        STARLINK
      </NavLink>
      <NavLink className='menu-item links' to='/stats' onClick={handleOnClose} activeClassName='activeLink'>
        STATS
      </NavLink>
    </Menu>
  );
};

export default HambugerMenu;
