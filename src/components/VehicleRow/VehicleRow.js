import React from 'react';
import './VehicleRow.css';

export default function VehicleRow({
  rowType,
  leftCol,
  metric,
  imperial,
  metricUnit,
  imperialUnit,
  right,
  engineType,
  engineNumber
}) {
  return (
    <>
      {rowType === 'basic' ? (
        <div className='vehicleRow'>
          <div className='left'>
            <h4>{leftCol}</h4>
          </div>
          <div className='right'>
            {engineType ? (
              <p>
                <span>{engineNumber}</span>
                <span className='imperial'> / {engineType}</span>
              </p>
            ) : (
              <p>{right}</p>
            )}
          </div>
        </div>
      ) : (
        <div className='vehicleRow '>
          <div className='left'>
            <h4>{leftCol}</h4>
          </div>
          <div className='right'>
            <p>
              <span>{metric}</span> {metricUnit}
              <span className='imperial'>
                {' '}
                / {imperial} {imperialUnit}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
