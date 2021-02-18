import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Vehicle.css';
import {
  getAllRocketOrDragons,
  getRocketOrDragonByID,
  numberOfLaunchesByVehicle,
  getAllDragon2Launches,
} from '../../Data/fetchData';
import Button from '../Button/Button';

export default function Vehicle() {
  const [data, setData] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  let { name } = useParams();

  const handleNextClick = () => {
    if (pageNumber === 1) {
      setPageNumber(2);
    } else {
      setPageNumber(1);
    }
  };

  const cirlcePageSelector = (e) => {
    setPageNumber(parseInt(e.target.id));
  };

  useEffect(() => {
    async function fetchData() {
      if (name === 'falcon9' || name === 'starship' || name === 'falconheavy') {
        const allRockets = await getAllRocketOrDragons('rockets');
        for await (let rocket of allRockets) {
          if (name === 'falcon9' && rocket.name === 'Falcon 9') {
            let id = await rocket.id;
            const response = await getRocketOrDragonByID('rockets', id);
            const res2 = await numberOfLaunchesByVehicle(id);

            const responseObj = {
              rocketOrDragonInfo: response,
              numberOfLaunhes: res2.totalDocs,
            };

            return responseObj;
          } else if (name === 'starship' && rocket.name === 'Starship') {
            let id = await rocket.id;
            const response = await getRocketOrDragonByID('rockets', id);
            const res2 = await numberOfLaunchesByVehicle(id);

            const responseObj = {
              rocketOrDragonInfo: response,
              numberOfLaunhes: res2.totalDocs,
            };

            return responseObj;
          } else if (name === 'falconheavy' && rocket.name === 'Falcon Heavy') {
            let id = await rocket.id;
            const response = await getRocketOrDragonByID('rockets', id);
            const res2 = await numberOfLaunchesByVehicle(id);

            const responseObj = {
              rocketOrDragonInfo: response,
              numberOfLaunhes: res2.totalDocs,
            };

            return responseObj;
          }
        }
      } else if (name === 'dragon') {
        const allDragons = await getAllRocketOrDragons('dragons');
        for await (let dragon of allDragons) {
          if (name === 'dragon' && dragon.name === 'Dragon 2') {
            let id = await dragon.id;
            const response = await getRocketOrDragonByID('dragons', id);
            const res2 = await getAllDragon2Launches();

            let initialCount = 0;
            res2.docs.forEach((item) => {
              initialCount += item.launches.length;
            });
            const responseObj = {
              rocketOrDragonInfo: response,
              numberOfLaunhes: initialCount,
            };

            return responseObj;
          }
        }
      }
    }
    async function updateData() {
      let info = await fetchData();
      const { rocketOrDragonInfo, numberOfLaunhes } = info;
      if (name === 'dragon') {
        let dataObj = {
          name: rocketOrDragonInfo.name.toUpperCase(),
          description: rocketOrDragonInfo.description,
          metricHeight: rocketOrDragonInfo.height_w_trunk.meters,
          imperialHeight: rocketOrDragonInfo.height_w_trunk.feet,
          diameter: rocketOrDragonInfo.diameter,
          totalMetricMass: rocketOrDragonInfo.dry_mass_kg,
          totalImperialMass: rocketOrDragonInfo.dry_mass_lb,
          metricLaunchPayloadMass: rocketOrDragonInfo.launch_payload_mass.kg,

          imperialLaunchPayloadMass: rocketOrDragonInfo.launch_payload_mass.lb,
          metricLaunchPayloadVol:
            rocketOrDragonInfo.launch_payload_vol.cubic_meters,
          imperialLaunchPayloadVol:
            rocketOrDragonInfo.launch_payload_vol.cubic_feet,
          crewCapacity: rocketOrDragonInfo.crew_capacity,
          metricReturnPayloadMass: rocketOrDragonInfo.return_payload_mass.kg,
          imperialReturnPayloadMass: rocketOrDragonInfo.return_payload_mass.lb,
          metricReturnPayloadVol:
            rocketOrDragonInfo.return_payload_vol.cubic_meters,
          imperialReturnPayloadVol:
            rocketOrDragonInfo.return_payload_vol.cubic_feet,

          firstLaunch: new Date(rocketOrDragonInfo.first_flight)
            .toLocaleDateString('default', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
            .toUpperCase(),
          engineNumber: `${rocketOrDragonInfo.thrusters[0].amount} + ${rocketOrDragonInfo.thrusters[1].amount}`,
          engineType: `${rocketOrDragonInfo.thrusters[0].type} + ${rocketOrDragonInfo.thrusters[1].type}`,
          costPerLaunch: `$${rocketOrDragonInfo.cost_per_launch / 1000000}m`,
          numberOfLaunhes: numberOfLaunhes,
        };
        setData(dataObj);
      } else {
        let dataObj = {
          name: rocketOrDragonInfo.name.toUpperCase(),
          description: rocketOrDragonInfo.description,
          metricHeight: rocketOrDragonInfo.height.meters,
          imperialHeight: rocketOrDragonInfo.height.feet,
          diameter: rocketOrDragonInfo.diameter,
          totalMetricMass: rocketOrDragonInfo.mass.kg,
          totalImperialMass: rocketOrDragonInfo.mass.lb,

          payloadWeights: rocketOrDragonInfo.payload_weights,

          firstLaunch: new Date(rocketOrDragonInfo.first_flight)
            .toLocaleDateString('default', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
            .toUpperCase(),
          engineNumber: rocketOrDragonInfo.engines.number,
          engineType: rocketOrDragonInfo.engines.type.toUpperCase(),
          costPerLaunch: `$${rocketOrDragonInfo.cost_per_launch / 1000000} m`,
          numberOfLaunhes: numberOfLaunhes,
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
            {pageNumber === 1 ? (
              <>
                <div className='vehicleRow'>
                  <div className='left'>
                    <h4>HEIGHT</h4>
                  </div>
                  <div className='right'>
                    <p>
                      <span>{data.metricHeight}</span> m
                      <span className='imperial'>
                        {' '}
                        / {data.imperialHeight} ft
                      </span>
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
                      <span className='imperial'>
                        {' '}
                        / {data.diameter.feet} ft
                      </span>
                    </p>
                  </div>
                </div>
                <div className='vehicleRow'>
                  <div className='left'>
                    <h4>
                      {name === 'dragon' ? 'LAUNCH PAYLOAD MASS' : 'MASS'}
                    </h4>
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

                {name !== 'dragon' && data.payloadWeights !== undefined ? (
                  data.payloadWeights.map((payload) => (
                    <div className='vehicleRow ' key={payload.id}>
                      <h4>{`PAYLOAD TO ${payload.id.toUpperCase()}`}</h4>
                      <div className='right'>
                        <p>
                          <span>{`${payload.kg} kg`}</span>
                          <span className='imperial'>{` / ${payload.lb} lb`}</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className='vehicleRow'>
                      <div className='left'>
                        <h4>RETURN PAYLOAD MASS</h4>
                      </div>
                      <div className='right'>
                        <p>
                          <span>{`${data.metricReturnPayloadMass} kg`}</span>
                          <span className='imperial'>
                            {` / ${data.imperialReturnPayloadMass} kg`}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className='vehicleRow'>
                      <div className='left'>
                        <h4>LAUNCH PAYLOAD VOL</h4>
                      </div>
                      <div className='right'>
                        <p>
                          <span>{`${data.metricLaunchPayloadVol} m3`}</span>
                          <span className='imperial'>
                            {` / ${data.imperialLaunchPayloadVol} ft3`}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className='vehicleRow'>
                      <div className='left'>
                        <h4>RETURN PAYLOAD VOL</h4>
                      </div>
                      <div className='right'>
                        <p>
                          <span>{`${data.metricReturnPayloadVol} m3`}</span>
                          <span className='imperial'>
                            {` / ${data.imperialReturnPayloadVol} ft3`}
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className='vehicleRow'>
                  <div className='left'>
                    <h4>FIRST LAUNCH</h4>
                  </div>
                  <div className='right'>
                    <p>{data.firstLaunch}</p>
                  </div>
                </div>
                <div className='vehicleRow'>
                  <div className='left'>
                    <h4>ENGINES</h4>
                  </div>
                  <div className='right'>
                    <p>
                      <span>{data.engineNumber}</span>
                      <span className='imperial'> / {data.engineType}</span>
                    </p>
                  </div>
                </div>
                <div className='vehicleRow'>
                  <div className='left'>
                    <h4>
                      {name === 'dragon' ? 'CREW CAPACITY' : 'COST PER LAUNCH'}
                    </h4>
                  </div>
                  <div className='right'>
                    <p>
                      {name === 'dragon'
                        ? data.crewCapacity
                        : data.costPerLaunch}
                    </p>
                  </div>
                </div>
                <div className='vehicleRow'>
                  <div className='left'>
                    <h4>TOTAL LAUNCHES</h4>
                  </div>
                  <div className='right'>
                    <p>
                      {data.numberOfLaunhes === 0
                        ? 'NO LAUNCHES'
                        : data.numberOfLaunhes}
                    </p>
                  </div>
                </div>
                {data.numberOfLaunhes !== 0 ? (
                  <div className='buttonsRow'>
                    <div className='button'>
                      <Button text={'FIRST FLIGHT'} />
                    </div>
                    <div className='button'>
                      <Button text={'FIRST LANDING'} />
                    </div>
                    <div className='button'>
                      <Button text={'LATEST MISSION'} />
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </>
            )}

            <div className='nextRow'>
              <div className='item'>
                <div
                  className='backArrow arrows'
                  onClick={handleNextClick}
                ></div>
              </div>

              <div className='item circlesContainer'>
                <div
                  className={`${'circle circleLeft'} ${
                    pageNumber === 1 ? 'selectedPage' : ''
                  }`}
                  id={1}
                  onClick={cirlcePageSelector}
                ></div>
                <div
                  className={`${'circle'} ${
                    pageNumber === 2 ? 'selectedPage' : ''
                  } `}
                  id={2}
                  onClick={cirlcePageSelector}
                ></div>
              </div>

              <div className='item next'>
                <div
                  className='nextArrow arrows'
                  onClick={handleNextClick}
                ></div>
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
