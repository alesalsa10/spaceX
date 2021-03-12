import React, { useEffect, useState, useRef } from 'react';
import VehicleModalContainer from '../VehicleModalContainer/VehicleModalContainer';
import VehicleRow from '../VehicleRow/VehicleRow';
import { useParams } from 'react-router-dom';
import './Vehicle.css';
import {
  getAllRocketOrDragons,
  getRocketOrDragonByID,
  numberOfLaunchesByVehicle,
  getAllDragon2Launches,
  getLaunchByDate,
  launchById
} from '../../Data/fetchData';
import Button from '../Button/Button';
import Dragon from '../../images/dragon2.png';
import Falcon9 from '../../images/falcon9.png';
import Falconheavy from '../../images/falconHeavy.png';
import Starship from '../../images/starship.png';

export default function Vehicle() {
  const [data, setData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [rocketId, setRocketId] = useState();
  const [videoId, setVideoId] = useState();
  const [firstLaunchId, setFirstLaunchId] = useState();
  const [latestLaunchId, setLatestLaunch] = useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [sliderClass, setSliderClass] = useState('');

  let { name } = useParams();
  const preName = usePrevious(name);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    if (preName !== name) {
      setPageNumber(1);
    }
  }, [name]);

  const handleNextClick = (e) => {
    setSliderClass('fadeSlide');
    if (pageNumber === 1) {
      setPageNumber(2);
    } else {
      setPageNumber(1);
    }
  };

  const cirlcePageSelector = (e) => {
    setSliderClass('fadeSlight');
    setPageNumber(parseInt(e.target.id));
  };

  const handleFirstMission = async (id) => {
    setIsOpen(true);
    if (name === 'dragon2') {
      const dragonResponse = await launchById(firstLaunchId);
      let videoId = await dragonResponse[0].links.youtube_id;
      setVideoId(videoId);
    } else {
      const rocketResponse = await getLaunchByDate(id, 'asc');
      setVideoId(rocketResponse);
    }
  };

  const handleLatestMission = async (id) => {
    setIsOpen(true);
    if (name === 'dragon2') {
      const dragonResponse = await launchById(latestLaunchId);
      let videoId = await dragonResponse[0].links.youtube_id;
      setVideoId(videoId);
    } else {
      const rocketResponse = await getLaunchByDate(id, 'desc');
      setVideoId(rocketResponse);
    }
  };

  const closeModal = () => {
    setVideoId();
    setIsOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      if (name === 'falcon9' || name === 'starship' || name === 'falconheavy') {
        const allRockets = await getAllRocketOrDragons('rockets');
        for await (let rocket of allRockets) {
          if (name === 'falcon9' && rocket.name === 'Falcon 9') {
            let id = await rocket.id;
            setRocketId(id);
            const response = await getRocketOrDragonByID('rockets', id);
            const res2 = await numberOfLaunchesByVehicle(id);
            const responseObj = {
              rocketOrDragonInfo: response,
              numberOfLaunches: res2.totalDocs,
            };
            return responseObj;
          } else if (name === 'starship' && rocket.name === 'Starship') {
            let id = await rocket.id;
            setRocketId(id);
            const response = await getRocketOrDragonByID('rockets', id);
            const res2 = await numberOfLaunchesByVehicle(id);

            const responseObj = {
              rocketOrDragonInfo: response,
              numberOfLaunches: res2.totalDocs,
            };
            return responseObj;
          } else if (name === 'falconheavy' && rocket.name === 'Falcon Heavy') {
            let id = await rocket.id;
            setRocketId(id);
            const response = await getRocketOrDragonByID('rockets', id);
            const res2 = await numberOfLaunchesByVehicle(id);

            const responseObj = {
              rocketOrDragonInfo: response,
              numberOfLaunches: res2.totalDocs,
            };

            return responseObj;
          }
        }
      } else if (name === 'dragon2') {
        const allDragons = await getAllRocketOrDragons('dragons');
        for await (let dragon of allDragons) {
          if (name === 'dragon2' && dragon.name === 'Dragon 2') {
            let id = await dragon.id;
            setRocketId(id);
            const response = await getRocketOrDragonByID('dragons', id);
            const res2 = await getAllDragon2Launches();

            let initialCount = 0;
            res2.docs.forEach((item) => {
              initialCount += item.launches.length;
            });

            let firstLaunchArrayId;
            for (let i = 0; i < res2.docs.length; i++) {
              if (
                res2.docs[i].launches !== undefined ||
                res2.docs[i].length !== 0
              ) {
                firstLaunchArrayId = res2.docs[i].launches[0];
                break;
              }
            }
            setFirstLaunchId(firstLaunchArrayId);

            let lastLaunchArrayId;
            for (let i = res2.docs.length - 1; i >= 0; i--) {
              if (res2.docs[i].launches !== undefined || res2.docs[i] !== 0) {
                lastLaunchArrayId = res2.docs[i].launches[0];
                break;
              }
            }
            setLatestLaunch(lastLaunchArrayId);
            const responseObj = {
              rocketOrDragonInfo: response,
              numberOfLaunches: initialCount,
            };

            return responseObj;
          }
        }
      }
    }

    let options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    };

    async function updateData() {
      let info = await fetchData();
      const { rocketOrDragonInfo, numberOfLaunches } = info;
      if (name === 'dragon2') {
        let dataObj = {
          name: rocketOrDragonInfo.name.toUpperCase(),
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
            .toLocaleDateString('en-US', options)
            .toUpperCase(),
          engineNumber: `${rocketOrDragonInfo.thrusters[0].amount} + ${rocketOrDragonInfo.thrusters[1].amount}`,
          engineType: `${rocketOrDragonInfo.thrusters[0].type} + ${rocketOrDragonInfo.thrusters[1].type}`,
          numberOfLaunches: numberOfLaunches,
        };
        setData(dataObj);
      } else {
        let dataObj = {
          name: rocketOrDragonInfo.name.toUpperCase(),
          metricHeight: rocketOrDragonInfo.height.meters,
          imperialHeight: rocketOrDragonInfo.height.feet,
          diameter: rocketOrDragonInfo.diameter,
          totalMetricMass: rocketOrDragonInfo.mass.kg,
          totalImperialMass: rocketOrDragonInfo.mass.lb,
          payloadWeights: rocketOrDragonInfo.payload_weights,
          firstLaunch: new Date(rocketOrDragonInfo.first_flight)
            .toLocaleDateString('en-US', options)
            .toUpperCase(),
          engineNumber: rocketOrDragonInfo.engines.number,
          engineType: rocketOrDragonInfo.engines.type.toUpperCase(),
          costPerLaunch: `$${rocketOrDragonInfo.cost_per_launch / 1000000} m`,
          numberOfLaunches: numberOfLaunches,
        };
        setData(dataObj);
      }
    }

    updateData();
  }, [name]);

  return (
    <>
      <VehicleModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        videoId={videoId}
        rocketId={rocketId}
      />

      {data !== undefined ? (
        <div className='vehicleContainer' key={name}>
          <div className='leftCol '>
            <div className='nameSection'>
              <h2 className='vehicleName'>{data.name}</h2>
              <h1 className='overview'>OVERVIEW</h1>
            </div>
            <div
              className={`  ${sliderClass} ${'sliderContainer'}`}
              key={pageNumber}
            >
              {pageNumber === 1 ? (
                <>
                  <VehicleRow
                    leftCol={'HEIGHT'}
                    metric={data.metricHeight}
                    imperial={data.imperialHeight}
                    metricUnit={'m'}
                    imperialUnit={'ft'}
                  />

                  <VehicleRow
                    leftCol={'DIAMETER  '}
                    metric={data.diameter.meters}
                    imperial={data.diameter.feet}
                    metricUnit={'m'}
                    imperialUnit={'ft'}
                  />

                  <VehicleRow
                    leftCol={
                      name === 'dragon2' ? 'LAUNCH PAYLOAD MASS' : 'MASS'
                    }
                    metric={
                      name === 'dragon2'
                        ? data.metricLaunchPayloadMass
                        : data.totalMetricMass
                    }
                    imperial={
                      name === 'dragon2'
                        ? data.imperialLaunchPayloadMass
                        : data.totalImperialMass
                    }
                    metricUnit={'kg'}
                    imperialUnit={'lb'}
                  />

                  {name !== 'dragon2' && data.payloadWeights !== undefined ? (
                    data.payloadWeights.map((payload) => (
                      <VehicleRow
                        key={payload.id}
                        leftCol={`PAYLOAD TO ${payload.id.toUpperCase()}`}
                        metric={payload.kg}
                        imperial={payload.lb}
                        metricUnit={'kg'}
                        imperialUnit={'lb'}
                      />
                    ))
                  ) : (
                    <>
                      <VehicleRow
                        leftCol={'RETURN PAYLOAD MASS'}
                        metric={data.metricReturnPayloadMass}
                        imperial={data.imperialReturnPayloadMass}
                        metricUnit={'kg'}
                        imperialUnit={'lb'}
                      />

                      <VehicleRow
                        leftCol={'LAUNCH PAYLOAD VOL'}
                        metric={data.metricLaunchPayloadVol}
                        imperial={data.imperialLaunchPayloadVol}
                        metricUnit={'m3'}
                        imperialUnit={'ft3'}
                      />

                      <VehicleRow
                        leftCol={'RETURN PAYLOAD VOL'}
                        metric={data.metricReturnPayloadVol}
                        imperial={data.imperialReturnPayloadVol}
                        metricUnit={'m3'}
                        imperialUnit={'ft3'}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  <VehicleRow
                    rowType={'basic'}
                    leftCol={'FIRST LAUNCH'}
                    right={data.firstLaunch}
                  />

                  <VehicleRow
                    rowType='basic'
                    leftCol='ENGINES'
                    engineType={data.engineType}
                    engineNumber={data.engineNumber}
                  />

                  <VehicleRow
                    rowType='basic'
                    leftCol={
                      name === 'dragon2' ? 'CREW CAPACITY' : 'COST PER LAUNCH'
                    }
                    right={
                      name === 'dragon2'
                        ? data.crewCapacity
                        : data.costPerLaunch
                    }
                  />
                  <VehicleRow
                    rowType='basic'
                    leftCol='TOTAL LAUNCHES'
                    right={
                      data.numberOfLaunches === 0
                        ? 'NO LAUNCHES'
                        : data.numberOfLaunches
                    }
                  />

                  {data.numberOfLaunches !== 0 ? (
                    <div className='buttonsRow'>
                      <div className='button'>
                        <Button
                          text={'FIRST FLIGHT'}
                          onClick={() => handleFirstMission(rocketId)}
                          color={'blue'}
                          id='vehicle'
                        />
                      </div>
                      <div className='button2'>
                        <Button
                          text={'LATEST MISSION'}
                          onClick={() => handleLatestMission(rocketId)}
                          color={'blue'}
                          id='vehicle'
                        />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>
            <div className='nextRow'>
              <div className='item'>
                <div
                  className='backArrow arrows'
                  onClick={handleNextClick}
                  id={1}
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
                  id={2}
                ></div>
              </div>
            </div>
          </div>
          <div className='imageDiv'>
            <img
              className='vehicleImage'
              src={`${
                name === 'dragon2'
                  ? Dragon
                  : name === 'falcon9'
                  ? Falcon9
                  : name === 'starship'
                  ? Starship
                  : Falconheavy
              }`}
              alt={name + 'image'}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
