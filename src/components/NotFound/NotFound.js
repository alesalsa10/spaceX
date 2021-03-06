import './NotFound.css'
import React from 'react'

export default function NotFound() {
    return (
      <div className='noResultsFound' id='noPage'>
        <h1 className='noResultsHeader'>SORRY...</h1>
        <h4 className='noResultsH5'>
          THE PAGE YOU ARE LOOKING FOR WAS NOT FOUND.
        </h4>
        <h4 className='backHome'>
          GO BACK TO{' '}
          <a href='/' className='errorHomeLink'>
            HOME
          </a>
        </h4>
      </div>
    );
}
