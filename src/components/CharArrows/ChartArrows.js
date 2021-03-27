import './ChartArrows.css';
import React from 'react';

export default function ChartArrows({ type, hrefId }) {
  return (
    <>
      {type === 'up' ? (
        <div className='anchorUpArrowContainer'>
          <a href={hrefId}>
            <i className='arrow up'></i>
          </a>
        </div>
      ) : (
        <div className='anchorDownArrowContainer'>
          <a href={hrefId}>
            <i className='arrow down'></i>
          </a>
        </div>
      )}
    </>
  );
}
