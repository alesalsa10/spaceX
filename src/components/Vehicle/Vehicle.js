import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import './Vehicle.css';
import {
  getAllRocketOrDragons,
  getRocketOrDragonByID,
  numberOfLaunchesByVehicle,
  getAllDragon2Launches,
  getLaunchByDate,
  getLaunchById,
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

  const customStyles = {
    content: {
      top: '170px',
      left: '0',
      right: '0',
      bottom: '0',
      marginRight: 'auto',
      marginLeft: 'auto',
      width: '900px',
      maxHeight: '100vh',
      overflowY: 'auto'
    },
  };

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
    if (name === 'dragon') {
      const dragonResponse = await getLaunchById(firstLaunchId);
      console.log(dragonResponse);
      let videoId = await dragonResponse.links.youtube_id;
      setVideoId(videoId);
      console.log(videoId);
    } else {
      console.log(id);
      const rocketResponse = await getLaunchByDate(id, 'asc');
      console.log(rocketResponse);
      setVideoId(rocketResponse);
    }
  };

  const handleLatestMission = async (id) => {
    setIsOpen(true);
    if (name === 'dragon') {
      const dragonResponse = await getLaunchById(latestLaunchId);
      let videoId = await dragonResponse.links.youtube_id;
      setVideoId(videoId);
      console.log(videoId);
    } else {
      console.log(id);
      const rocketResponse = await getLaunchByDate(id, 'desc');
      console.log(rocketResponse);
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
              numberOfLaunhes: res2.totalDocs,
            };
            return responseObj;
          } else if (name === 'starship' && rocket.name === 'Starship') {
            let id = await rocket.id;
            setRocketId(id);
            const response = await getRocketOrDragonByID('rockets', id);
            const res2 = await numberOfLaunchesByVehicle(id);

            const responseObj = {
              rocketOrDragonInfo: response,
              numberOfLaunhes: res2.totalDocs,
            };
            return responseObj;
          } else if (name === 'falconheavy' && rocket.name === 'Falcon Heavy') {
            let id = await rocket.id;
            setRocketId(id);
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

            console.log(res2);

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
                //console.log(firstLaunchArrayId);
                break;
              }
            }
            setFirstLaunchId(firstLaunchArrayId);

            let lastLaunchArrayId;
            for (let i = res2.docs.length - 1; i >= 0; i--) {
              if (res2.docs[i].launches !== undefined || res2.docs[i] !== 0) {
                lastLaunchArrayId = res2.docs[i].launches[0];
                //console.log(lastLaunchArrayId);
                break;
              }
            }
            setLatestLaunch(lastLaunchArrayId);
            const responseObj = {
              rocketOrDragonInfo: response,
              numberOfLaunhes: initialCount,
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
      const { rocketOrDragonInfo, numberOfLaunhes } = info;
      if (name === 'dragon') {
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
          numberOfLaunhes: numberOfLaunhes,
        };
        setData(dataObj);
        console.log(data);
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
          numberOfLaunhes: numberOfLaunhes,
        };
        setData(dataObj);
      }
    }

    updateData();
  }, [name]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Video Modal'
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        className='vehicleModal'
      >
        <>
          {videoId === undefined || rocketId === undefined ? (
            <div className='spinner'>
              <Loader
                type='TailSpin'
                color='#005288'
                height={100}
                width={100}
              />
            </div>
          ) : (
            <div className='iframeContainer'>
              <iframe
                title='Mission video'
                className='embebedVideo'
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
              ></iframe>
            </div>
          )}
        </>
      </Modal>

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
                  <div className='vehicleRow '>
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
                  <div className='vehicleRow '>
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
                  <div className='vehicleRow '>
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
                        <div className='left'>
                          <h4>{`PAYLOAD TO ${payload.id.toUpperCase()}`}</h4>
                        </div>
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
                        {name === 'dragon'
                          ? 'CREW CAPACITY'
                          : 'COST PER LAUNCH'}
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
                name === 'dragon'
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
