import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Button from '../Button/Button';
import HambugerMenu from '../HamburgerMenu/HambugerMenu';

export default function NavBar() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  


    React.useEffect(() => {
      function handleResize() {
        setWindowSize(window.innerWidth);
      }

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });


  return (
    <nav className='navBarContainer'>
      <div className='logo'>
        <Link to='/'>
          <svg
            enableBackground='new 0 0 331.644 40.825'
            height='40.825'
            viewBox='0 0 331.644 40.825'
            width='331.644'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g fill='#005288'>
              <path d='m77.292 15.094h-28.043l-1.039.777v24.947h7.763v-9.355l.741-.664h20.579c5.196 0 7.632-1.398 7.632-4.985v-5.728c-.001-3.593-2.436-4.992-7.633-4.992m0 9.223c0 1.69-1.118 2.041-3.554 2.041h-16.939l-.827-.804v-5.344l.741-.678h17.025c2.436 0 3.554.347 3.554 2.045z' />
              <path d='m99.081 19.813 6.68 9.787-.37.948h-14.773l-3.771 4.639h21.99l1.524.928 3.414 4.709h8.884l-19.473-26.049' />
              <path d='m187.418 35.757v-6.924l.799-.69h14.862v-4.409h-23.555v17.089h34.746v-4.388h-26.018' />
              <path d='m179.524 15.094h35.113v4.848h-35.113z' />
              <path d='m140.361 19.685h28.288c-.436-3.597-2.668-4.595-8.33-4.595h-20.259c-6.389 0-8.427 1.247-8.427 6.082v13.565c0 4.84 2.038 6.087 8.427 6.087h20.259c5.745 0 7.945-1.079 8.095-4.81h-28.053l-.832-.783v-15.022' />
              <path d='m29.333 25.118h-20.579l-.606-.667v-4.402l.603-.466h27.742l.379-.927c-.945-2.431-3.392-3.565-7.936-3.565h-19.271c-6.385 0-8.426 1.247-8.426 6.082v2.844c0 4.841 2.041 6.086 8.426 6.086h20.533l.645.566v4.602l-.526.718h-23.487v-.022h-6.152s-.704.353-.677.518c.525 3.382 2.829 4.34 8.345 4.34h20.987c6.384 0 8.486-1.247 8.486-6.087v-3.543c0-4.832-2.102-6.077-8.486-6.077' />
              <path d='m236.725 14.988h-11.551l-.627 1.193 12.828 9.351c2.43-1.407 5.074-2.833 7.95-4.24' />
              <path d='m247.075 32.603 11.275 8.222h11.692l.484-1.089-16.836-12.323c-2.236 1.641-4.445 3.374-6.615 5.19' />
            </g>
            <path
              d='m235.006 40.806h-10.451l-.883-1.383c7.106-6.861 38.888-36.272 107.972-39.423 0 0-57.986 1.956-96.638 40.806'
              fill='#a7a9ac'
            />
          </svg>
        </Link>
      </div>
      {windowSize < 1000 ? (
        <div className='sidebar'>
          <HambugerMenu />
        </div>
      ) : (
        <>
          <div className='falcon9'>
            <Link  to='/vehicles/falcon9' className='link'>
              FALCON 9
            </Link>
          </div>
          <div className='falconHeavy'>
            <Link  to='/vehicles/falconheavy' className='link'>
              FALCON HEAVY
            </Link>
          </div>
          <div className='dragon'>
            <Link  to='/vehicles/dragon' className='link'>
              DRAGON
            </Link>
          </div>
          <div className='starship'>
            <Link to='/vehicles/starship' className='link'>
              STARSHIP
            </Link>
          </div>
          <div className='missionsButtonDiv'>
            <Link  to='/'>
              <Button text={'MISSIONS'}/>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}