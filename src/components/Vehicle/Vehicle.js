import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Vehicle.css';
import {
  getAllRocketOrDragons,
  getRocketOrDragonByID,
} from '../../Data/fetchData';

export default function Vehicle() {
  const [data, setData] = useState();
  let { name } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (name === 'falcon9' || name === 'starship' || name === 'falconheavy') {
        const allRockets = await getAllRocketOrDragons('rockets');
        for await (let rocket of allRockets) {
          if (name === 'falcon9' && rocket.name === 'Falcon 9') {
            let id = await rocket.id;
            const falcon9Data = await getRocketOrDragonByID('rockets', id);
            setData(falcon9Data);
          } else if (name === 'starship' && rocket.name === 'Starship') {
            let id = await rocket.id;
            const starshipData = await getRocketOrDragonByID('rockets', id);
            setData(starshipData);
          } else if (name === 'falconheavy' && rocket.name === 'Falcon Heavy') {
            let id = await rocket.id;
            const falconHeavyData = await getRocketOrDragonByID('rockets', id);
            setData(falconHeavyData);
          }
        }
      } else if (name === 'dragon') {
        const allDragons = await getAllRocketOrDragons('dragons');
        for await (let dragon of allDragons) {
          if (name === 'dragon' && dragon.name === 'Dragon 2') {
            let id = await dragon.id;
            const dragonData = await getRocketOrDragonByID('dragons', id);
            setData(dragonData);
          }
        }
      }
    }
    fetchData();
  }, [name]);

  return (
    <>
      {data !== undefined ? (
        <div className='vehicleContainer'>
          <div className='leftColumn'>
            <div className='vehicleName'>
              <h4 className='vehicleH4'>{data.name.toUpperCase()}</h4>
              <p className='vehicleDescription'>{data.description}</p>
            </div>
          </div>
          <div className='rightColumn'>
            <div className='vehicleRow'>
              <div className='left'>
                <h4>HEIGHT</h4>
              </div>
              <div className='right'>
                {/* <p>
                  <span>{data.height.meters}</span>m/{' '}
                  <span className='imperial'>{data.height.feet}ft</span>
                </p> */}
                {}
              </div>
            </div>
            <div className='vehicleRow'>
              <div className='left'>
                <h4>DIAMETER</h4>
              </div>
              <div className='right'>
                <p>
                  <span>{data.diameter.meters}</span>m/{' '}
                  <span className='imperial'>{data.diameter.feet}ft</span>
                </p>
              </div>
            </div>
            <div className='vehicleRow'>
              <div className='left'>MASS</div>
              <div className='right'>
                {/* <p>
                  <span>{data.mass.kg}</span>kg/{' '}
                  <span className='imperial'>{data.mass.lb}lb</span>
                </p> */}
              </div>
            </div>
            <div className='vehicleRow'>
              <div className='left'>
                {name === 'dragon' ? 'LAUNCH PAYLOAD MASS' : 'PAYLOAD TO LEO'}
              </div>
              <div className='right'>
                <p>
                  {/* <span>{data.payload_weights[0].kg}</span>kg/
                  <span className='imperial'>
                    {data.payload_weights[0].lb}lb
                  </span> */}
                  {}
                </p>
              </div>
            </div>
            <div className='vehicleRow'>
              <div className='left'>
                {name === 'dragon' ? 'LAUNCH PAYLOAD VOLUME' : 'PAYLOAD TO GTO'}
              </div>
              <div className='right'>
                {/* <p>
                  <span>{data.payload_weights[1].kg}</span>kg/
                  <span className='imperial'>
                    {data.payload_weights[1].lb}lb
                  </span>
                </p> */}
              </div>
            </div>
            <div className='vehicleRow'>
              <div className='left'>
                {name === 'dragon' ? 'CREW CAPACITY' : 'PAYLOAD TO MARS'}
              </div>
              <div className='right'>
                {/* <p>
                  <span>{data.payload_weights[2].kg}</span>kg/
                  <span className='imperial'>
                    {data.payload_weights[2].lb}lb
                  </span>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
