import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Vehicle.css';
import {
  getAllRocketOrDragons,
  getRocketOrDragonByID,
} from '../../Data/fetchData';

export default function Vehicle() {
  const [data, setData] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  let { name } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (name === 'falcon9' || name === 'starship' || name === 'falconheavy') {
        const allRockets = await getAllRocketOrDragons('rockets');
        for await (let rocket of allRockets) {
          if (name === 'falcon9' && rocket.name === 'Falcon 9') {
            let id = await rocket.id;
            const response = await getRocketOrDragonByID('rockets', id);
            return response;
          } else if (name === 'starship' && rocket.name === 'Starship') {
            let id = await rocket.id;
            const response = await getRocketOrDragonByID('rockets', id);
            return response;
          } else if (name === 'falconheavy' && rocket.name === 'Falcon Heavy') {
            let id = await rocket.id;
            const response = await getRocketOrDragonByID('rockets', id);
            return response;
          }
        }
      } else if (name === 'dragon') {
        const allDragons = await getAllRocketOrDragons('dragons');
        for await (let dragon of allDragons) {
          if (name === 'dragon' && dragon.name === 'Dragon 2') {
            let id = await dragon.id;
            const response = await getRocketOrDragonByID('dragons', id);
            return response;
          }
        }
      }
    }
    async function updateData() {
      let info = await fetchData();
      console.log(info);
      if (name === 'dragon') {
        let dataObj = {
          name: info.name.toUpperCase(),
          description: info.description,
          metricHeight: info.height_w_trunk.meters,
          imperialHeight: info.height_w_trunk.feet,
          diameter: info.diameter,
          totalMetricMass: info.dry_mass_kg,
          totalImperialMass: info.dry_mass_lb,
          metricLaunchPayloadMass: info.launch_payload_mass.kg,
          imperialLaunchPayloadMass: info.launch_payload_mass.lb,
          metricLaunchPayloadVol: info.launch_payload_vol.cubic_meters,
          imperialLaunchPayloadVol: info.launch_payload_vol.cubic_feet,
          crewCapacity: info.crew_capacity,
          metricReturnPayloadMass: info.return_payload_mass.kg,
          imperialReturnPayloadMass: info.return_payload_mass.lb,
          metricReturnPayloadVol: info.return_payload_vol.cubic_meters,
          imperialReturnPayloadVol: info.return_payload_vol.cubic_feet,


          firstFlight: info.first_flight,
          thrustersNumbers: `${info.thrusters[0].amount} + ${info.thrusters[1].amount}`,
          engines: `${info.thrusters[0].type} + ${info.thrusters[1].type}`,
          costPerLaunch: `$${info.cost_per_launch / 1000000}m`,
        };
        setData(dataObj);
      } else {
        let dataObj = {
          name: info.name.toUpperCase(),
          description: info.description,
          metricHeight: info.height.meters,
          imperialHeight: info.height.feet,
          diameter: info.diameter,
          totalMetricMass: info.mass.kg,
          totalImperialMass: info.mass.lb,
          metricPayloadToLEO: info.payload_weights[0].kg,
          imperialPayloadToLEO: info.payload_weights[0].lb,
          metricPayloadToGTO: info.payload_weights[1].kg,
          imperialPayloadToGTO: info.payload_weights[1].lb,
          metricPayloadToMars: info.payload_weights[2].kg,
          imperialPayloadToMars: info.payload_weights[2].lb,

          firstFlight: info.first_flight,
          engineNumber: info.engines.number,
          engineType: info.engines.type.toUpperCase(),
          constPerLaunch: `$${info.cost_per_launch / 1000000}`,
        };
        setData(dataObj);
      }
    }

    updateData();
  }, [name]);

  return (
    <>
      {data !== undefined ? (
        <div className='vehicleContainer' key={name}>
          <div className='leftColumn'>
            <div className='vehicleName'>
              <h4 className='vehicleH4'>{data.name}</h4>
              <p className='vehicleDescription'>{data.description}</p>
            </div>
          </div>
          <div className='rightColumn'>
            <div className='vehicleRow'>
              <div className='left'>
                <h4>HEIGHT</h4>
              </div>
              <div className='right'>
                <p>
                  <span>{data.metricHeight}</span> m
                  <span className='imperial'> / {data.imperialHeight} ft</span>
                </p>
              </div>
            </div>
            <div className='vehicleRow'>
              <div className='left'>
                <h4>DIAMETER</h4>
              </div>
              <div className='right'>
                <p>
                  <span>{data.diameter.meters}</span> m
                  <span className='imperial'> / {data.diameter.feet} ft</span>
                </p>
              </div>
            </div>
            <div className='vehicleRow'>
              <div className='left'>
                <h4>{name === 'dragon' ? 'LAUNCH PAYLOAD MASS' : 'MASS'}</h4>
              </div>
              <div className='right'>
                <p>
                  <span>
                    {' '}
                    {name === 'dragon'
                      ? data.metricLaunchPayloadMass
                      : data.totalImperialMass}{' '}
                    kg
                  </span>

                  <span className='imperial'>
                    {' '}
                    /
                    {name === 'dragon'
                      ? data.totalMetricMass
                      : data.totalImperialMass}{' '}
                    lb
                  </span>
                </p>
              </div>
            </div>
            <div className='vehicleRow'>
              <div className='left'>
                <h4>
                  {name === 'dragon' ? 'RETURN PAYLOAD MASS' : 'PAYLOAD TO LEO'}
                </h4>
              </div>
              <div className='right'>
                <p>
                  <span>
                    {' '}
                    {name === 'dragon'
                      ? data.metricReturnPayloadMass
                      : data.metricPayloadToLEO}{' '}
                    kg
                  </span>
                  <span className='imperial'>
                    {' '}
                    /
                    {name === 'dragon'
                      ? data.imperialLaunchPayloadMass
                      : data.imperialPayloadToLEO}{' '}
                    lb
                  </span>
                </p>
              </div>
            </div>
            <div className='vehicleRow'>
              <div className='left'>
                <h4>
                  {name === 'dragon'
                    ? 'LAUNCH PAYLOAD VOLUME'
                    : 'PAYLOAD TO GTO'}
                </h4>
              </div>
              <div className='right'>
                <p>
                  <span>
                    {name === 'dragon'
                      ? data.metricLaunchPayloadVol + 'm3'
                      : data.metricPayloadToGTO + 'kg'}
                  </span>
                  <span className='imperial'>
                    {' '}
                    /
                    {name === 'dragon'
                      ? data.imperialLaunchPayloadVol + ' ft3'
                      : data.imperialPayloadToGTO + 'lb'}
                  </span>
                </p>
              </div>
            </div>
            <div className='vehicleRow'>
              <div className='left'>
                <h4>
                  {name === 'dragon'
                    ? 'RETURN PAYLOAD VOLUME'
                    : 'PAYLOAD TO MARS'}
                </h4>
              </div>
              <div className='right'>
                <p>
                  {name === 'dragon' ? (
                    <>
                      <span>{data.metricReturnPayloadVol} m3</span>
                      <span className="imperial">
                      {' '} / {data.imperialReturnPayloadVol} ft3
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{data.metricPayloadToMars} kg</span>
                      <span className='imperial'>
                        {' '}
                        / {data.imperialPayloadToMars} lb
                      </span>
                    </>
                  )}
                </p>
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
