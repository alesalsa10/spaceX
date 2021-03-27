import './ChartFilter.css';
import React from 'react';

export default function ChartFilter({ filter, onClick, values }) {
  return (
    <div className='chartFilterDiv'>
      {values.map((value) => (
        <div className='chartRow' key={value}>
          <h5
            className={`${filter === value ? 'selectedChartRow' : ''}`}
            id={value}
            onClick={onClick}
          >
            {value}
          </h5>
        </div>
      ))}
    </div>
  );
}
