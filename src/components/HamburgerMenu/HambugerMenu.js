import React, { useState } from 'react';
import './HamburgerMenu.css';
import { stack as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';

const HambugerMenu = ({ allRockets, dragon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnOpen = () => {
    setIsOpen(true);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  let isMenuOpen = function (state) {
    return state.isOpen;
  };

  return (
    <>
      {allRockets !== undefined && dragon !== undefined ? (
        <Menu
          onOpen={handleOnOpen}
          onClose={handleOnClose}
          onStateChange={isMenuOpen}
          isOpen={isOpen}
          right
          outerContainerId={'outer-container'}
        >
          <NavLink
            className='menu-item links'
            to='/missions'
            onClick={handleOnClose}
            activeClassName='activeLink'
          >
            MISSIONS
          </NavLink>
          {allRockets.map((rocket) => (
            <NavLink
              className='menu-item links'
              to={`/vehicles/${rocket.name.split(' ').join('')}/${rocket.id}`}
              onClick={handleOnClose}
              activeClassName='activeLink'
              key={rocket.id}
            >
              {rocket.name.toUpperCase()}
            </NavLink>
          ))}
          {dragon.map((dragon) => (
            <NavLink
              className='menu-item links'
              to={`/vehicles/${dragon.name.split(' ').join('')}/${dragon.id}`}
              onClick={handleOnClose}
              activeClassName='activeLink'
              key={dragon.id}
            >
              {dragon.name.toUpperCase()}
            </NavLink>
          ))}
          <NavLink
            className='menu-item links'
            to='/starlink'
            onClick={handleOnClose}
            activeClassName='activeLink'
          >
            STARLINK
          </NavLink>
          <NavLink
            className='menu-item links'
            to='/stats'
            onClick={handleOnClose}
            activeClassName='activeLink'
          >
            STATS
          </NavLink>
        </Menu>
      ) : (
        ''
      )}
    </>
  );
};

export default HambugerMenu;
