import './StarLink.css';
import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { getAllStarlink } from '../../Data/fetchData';

export default function StarLink() {
  const [starlinkCount, setStarlinkCount] = useState(0);
  const [allStarlink, setAllStarlink] = useState();
  const [starlinkIndex, setStarlinkIndex] = useState();
  const [isOpenStarLink, setIsOpenStarlink] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let response = await getAllStarlink();

      setStarlinkCount(response.length);
      setAllStarlink(response);
    }
    fetchData();
  }, []);

  const handlePointClick = (e) => {
    setStarlinkIndex(e.index);
    setIsOpenStarlink(true);
  };

  const closeMoreInfo = () =>{
    setIsOpenStarlink(false)
  }

  return (
    <div className='starlinkContainer'>
      <div className='starlinkHeader'>
        <h1>StarLink</h1>
        <p className='starlinkDesc'>
          <span className='starlinkSpam'>Starlink</span> is a satellite internet
          constellation being constructed by SpaceX providing satellite Internet
          access.
        </p>
        <p className='onOrbit'>
          Starlinks on orbit:{' '}
          <span className='starlinkNumber'>{starlinkCount}</span>
        </p>
      </div>
      <Globe
        animateIn={true}
        globeImageUrl='//unpkg.com/three-globe/example/img/earth-night.jpg'
        backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
        pointsData={allStarlink}
        pointLat='latitude'
        pointLng='longitude'
        pointColor='color'
        pointAltitude='pointAlt'
        pointRadius='pointRadius'
        pointLabel='label'
        onPointClick={handlePointClick}
      />
      {isOpenStarLink ? (
        <div className='starlinkInfoDiv'>
          <div className='startlinkRow'>
            <div className='item'>
              <h2 className='starlinkInfoHeader'>STARLINK</h2>
            </div>
            <div className='item '>
              <h2 className='starlinkInfoHeader' id='X' onClick={closeMoreInfo}>X</h2>
            </div>
          </div>

          <div className='startlinkRow'>
            <div className='item'>NAME</div>
            <div className='item starlinkName'>
              {allStarlink[starlinkIndex].label}
            </div>
          </div>
          <div className='startlinkRow'>
            <div className='item'>VERSION</div>
            <div className='item'>{allStarlink[starlinkIndex].version}</div>
          </div>
          <div className='startlinkRow'>
            <div className='item'>HEIGHT</div>
            <div className='item'>
              {Number(
                Math.round(allStarlink[starlinkIndex].height_km + 'e2') + 'e-2'
              )}{' '}
              km
            </div>
          </div>
          <div className='startlinkRow'>
            <div className='item'>VELOCITY</div>
            <div className='item'>
              {Number(
                Math.round(allStarlink[starlinkIndex].velocity_kms + 'e2') +
                  'e-2'
              )}{' '}
              kms
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
