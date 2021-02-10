import React, {useState} from 'react'

export default function HambugerMenu() {
    const [open, setOpen] = useState(false);

    const handleMenuClick = () =>{
        setOpen(!open)
    }

    return (
      <>
        <i className='fas fa-bars fa-2x' onClick={handleMenuClick} ></i>
      </>
    );
}
