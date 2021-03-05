import React from 'react';
import './Button.css';

export default function Button({text, onClick, className, color, id}) {
  return (
    <>
      <button className={`${'missionButton'} ${className}  ${color === 'blue' ? 'blueFill': 'whiteFill'} `} onClick={onClick} id={id}>
        <h3>{text}</h3>
      </button>
    </>
  );
}
