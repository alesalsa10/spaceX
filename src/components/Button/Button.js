import React from 'react';
import './Button.css';

export default function Button({text, onClick, className}) {
  return (
    <>
      <button className={`${'missionButton'} ${className} `} onClick={onClick}>
        {text}
      </button>
    </>
  );
}
