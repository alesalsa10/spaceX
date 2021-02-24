import React, {useState} from 'react';
import './HamburgerMenu.css';
import { stack as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';


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
      <Link className='menu-item links' to='/missions' onClick={handleOnClose}>
        MISSIONS
      </Link>
      <Link
        className='menu-item links'
        to='/vehicles/falcon9'
        onClick={handleOnClose}
      >
        FALCON 9
      </Link>
      <Link
        className='menu-item links'
        to='/vehicles/falconheavy'
        onClick={handleOnClose}
      >
        FALCON HEAVY
      </Link>
      <Link
        className='menu-item links'
        to='/vehicles/dragon'
        onClick={handleOnClose}
      >
        DRAGON
      </Link>
      <Link
        className='menu-item links'
        to='/vehicles/starship'
        onClick={handleOnClose}
      >
        STARSHIP
      </Link>
    </Menu>
  );
};

export default HambugerMenu;
