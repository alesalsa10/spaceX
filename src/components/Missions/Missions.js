import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import './Missions.css';
import {
  getAllLaunchpads,
  getAllLaunches,
  launchById,
  getAllRocketOrDragons,
} from '../../Data/fetchData';
import CountUp from 'react-countup';
import MissionsModalContainer from '../MissionsModalContainer/MissionsModalContainer';
import Button from '../Button/Button';

export default function Missions() {
  const [rockets, setRockets] = useState();
  const [launchPads, setLaunchPads] = useState();
  const [launches, setLaunches] = useState('loading');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVehicleFilter, setIsVehicleFilter] = useState(false);
  const [isOutcome, setIsOutcome] = useState(false);
  const [isLaunchSite, setIsLaunchSite] = useState(false);
  const [filterValues, setFilterValues] = useState({
    rocketId: '',
    launchPadId: '',
    outcome: '',
    rocketName: '',
    launchPadName: '',
    outcomeName: '',
  });
  const [slideNumber, setslideNumber] = useState(0);
  const [sliderClass, setSliderClass] = useState(0);
  const [totalLaunches, setTotalLaunches] = useState();
  const [successfulLandings, setSuccessFulLandings] = useState();
  const [reusedFlights, setReusedFlights] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [launchId, setLaunchId] = useState();
  const [launchInfo, setLaunchInfo] = useState();
  const [modalslideNumber, setModalPageNumer] = useState(1);
  const [modalSlide, setModalSlide] = useState(0);
  const [chunckNumber, setChunckNumber] = useState(0);
  const [circleChunks, setCircleChunks] = useState();
  const [isFilterBlue, setIsFilterBlue] = useState(false);

  const openModal = (e) => {
    setLaunchId(e.currentTarget.id);
    setIsOpen(true);
  };
  const closeModal = () => {
    setModalSlide(0);
    setModalPageNumer(1);
    setLaunchId(undefined);
    setLaunchInfo(undefined);
    setIsOpen(false);
  };

  const handleModalArrowClicks = (e) => {
    setModalSlide('fadeSlide');
    if (modalslideNumber === 1) {
      setModalPageNumer(2);
    } else {
      setModalPageNumer(1);
    }
  };

  const handleModalCircleClick = (e) => {
    setModalSlide('fadeSlide');
    setModalPageNumer(parseInt(e.currentTarget.id));
  };

  const handleOpenFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsVehicleFilter(false);
    setIsOutcome(false);
    setIsLaunchSite(false);
    setIsFilterBlue(!isFilterBlue)
  };

  const handleFilterParameter = (e) => {
    if (e.target.id === 'vehicleFilter') {
      setIsVehicleFilter(!isVehicleFilter);
      setIsLaunchSite(false);
      setIsOutcome(false);
    } else if (e.target.id === 'launchSite') {
      setIsLaunchSite(!isLaunchSite);
      setIsVehicleFilter(false);
      setIsOutcome(false);
    } else if (e.target.id === 'outcome') {
      setIsOutcome(!isOutcome);
      setIsVehicleFilter(false);
      setIsLaunchSite(false);
    }
  };

  const handleFilterSelection = (e) => {
    let id = e.target.id;
    let filterType = e.target.className.split(' ');
    filterType = filterType[1];
    let name = e.currentTarget.innerHTML;

    if (filterType === 'rocket') {
      setFilterValues({
        ...filterValues,
        rocketId: id,
        rocketName: e.currentTarget.innerHTML,
      });
    } else if (filterType === 'launchpad') {
      setFilterValues({
        ...filterValues,
        launchPadId: id,
        launchPadName: name,
      });
    } else if (filterType === 'outcome') {
      let successBoolean = id === 'true' ? true : false;
      setFilterValues({
        ...filterValues,
        outcome: successBoolean,
        outcomeName: name,
      });
    } else {
      setFilterValues({
        rocketId: '',
        launchPadId: '',
        outcome: '',
        rocketName: '',
        launchPadName: '',
        outcomeName: '',
      });
    }
    setLaunches('loading');
    setCircleChunks();
    setChunckNumber(0)
    setslideNumber(0)
    setIsLaunchSite(false);
    setIsVehicleFilter(false);
    setIsOutcome(false);
    setIsFilterOpen(false);
  };

  const splitArrray = (arr, length) => {
    let newArray = [];
    if (arr.length <= length) {
      newArray[0] = arr.slice(0, arr.length);
    } else {
      for (let i = 0; i <= arr.length; i += length) {
        newArray.push(arr.slice(i, i + length));
      }
    }
    if (newArray[newArray.length - 1].length === 0) {
      newArray.pop();
    }
    return newArray;
  };

  const handleCirclePageClick = (e) => {
    setSliderClass('fadeSlide');
    setslideNumber(parseInt(e.target.id));
  };

  const clearAllfilters = () => {
    setLaunches('loading');
    setCircleChunks()
    setFilterValues({
      rocketId: '',
      launchPadId: '',
      outcome: '',
      rocketName: '',
      launchPadName: '',
      outcomeName: '',
    });
  };

  let options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  };

  useEffect(() => {
    async function fetchData() {
      if (launchId !== undefined) {
        const launch = await launchById(launchId);
        setLaunchInfo(launch);
      }
    }
    fetchData();
  }, [launchId]);

  useEffect(() => {
    async function fetchData() {
      const rockets = await getAllRocketOrDragons('rockets');
      setRockets(rockets);

      const launchPads = await getAllLaunchpads();
      setLaunchPads(launchPads);

      const allLaunches = await getAllLaunches(
        filterValues.rocketId,
        filterValues.launchPadId,
        filterValues.outcome
      );

      setTotalLaunches(allLaunches.length);

      let count = 0;
      let reusedCount = 0;
      allLaunches.forEach((item) => {
        item.cores.forEach((core) => {
          if (core.landing_success) {
            count++;
          }
          if (core.flight > 1) {
            reusedCount++;
          }
        });
        return count;
      });
      setReusedFlights(reusedCount);
      setSuccessFulLandings(count);

      let launches = splitArrray(allLaunches, 8);
      setLaunches(launches);

      let circlesArray = new Array(allLaunches.length);

      for (let i = 0; i < circlesArray.length; i++) {
        circlesArray[i] = i;
      }

      let formattedCirclesArray = splitArrray(circlesArray, 15);
      setCircleChunks(formattedCirclesArray);
    }
    fetchData();
  }, [filterValues]);

  const handleNextAndBack = (e) => {
    setSliderClass('fadeSlide');
    let id = e.target.id;
    if (id === 'next') {
      if (
        slideNumber ===
        parseInt(e.currentTarget.parentNode.parentNode.children[1].lastChild.id)
      ) {
        setChunckNumber(chunckNumber + 1);
        setslideNumber(slideNumber + 1);
      } else {
        setslideNumber(slideNumber + 1);
      }
    } else {
      if (
        slideNumber ===
        parseInt(
          e.currentTarget.parentNode.parentNode.children[1].firstChild.id
        )
      ) {
        setChunckNumber(chunckNumber - 1);
        setslideNumber(slideNumber - 1);
      } else {
        setslideNumber(slideNumber - 1);
      }
    }
  };

  return (
    <>
      <MissionsModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        launchInfo={launchInfo}
        modalPageNumber={modalslideNumber}
        modalSlide={modalSlide}
        options={options}
        handleModalArrowClicks={handleModalArrowClicks}
        handleModalCircleClick={handleModalCircleClick}
      />

      {totalLaunches !== undefined &&
      successfulLandings !== undefined &&
      reusedFlights !== undefined &&
      launches !== 'loading' ? (
        <>
          {totalLaunches !== 0 ? (
            <div className='infoHeader'>
              <div className='totalLaunches'>
                <h1 className='infoHeaderValues'>
                  <CountUp
                    end={totalLaunches}
                    duration={2}
                    className='numberSpan'
                  />
                </h1>
                <h4 className='headerItem'>TOTAL LAUNCHES</h4>
              </div>
              <div className='totalLandings'>
                <h1 className='infoHeaderValues'>
                  <CountUp end={successfulLandings} duration={2} />
                </h1>
                <h4 className='headerItem'>TOTAL LANDINGS</h4>
              </div>
              <div className='reusedFlights'>
                <h1 className='infoHeaderValues'>
                  <CountUp end={reusedFlights} duration={2} />
                </h1>
                <h4 className='headerItem'>REUSED FLIGHTS</h4>
              </div>
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}
      <div
        className={`${
          launches === 'loading' ? 'loadingContainer' : 'allMissionsContainer'
        }`}
      >
        {launches === 'loading' || circleChunks === undefined ? (
          <div className='spinner'>
            <Loader type='TailSpin' color='#005288' height={100} width={100} />
          </div>
        ) : launches === undefined ||
          launches[0] === undefined ||
          launches[0].length === 0 ? (
          <div className='noResultsFound'>
            <div className='noResultsSubContainer'>
              <h1 className='noResultsHeader'>OH NO!</h1>
              <h4 className='noResultsH5'>
                NO RESULTS WERE FOUND FOR THIS SELECTION.
              </h4>
              <h4 onClick={clearAllfilters} className='clearAndTryAgain'>
                CLEAR FILTERS AND TRY AGAIN.
              </h4>
            </div>
          </div>
        ) : (
          <>
            <div className='filter'>
              <div className='filterButtonDiv'>
                <div className='filterItem'>
                  <Button
                    text={'FILTER'}
                    onClick={handleOpenFilter}
                    className={'button'}
                    color={'blue'}
                    inlineColor={isFilterBlue? '#005288': 'transparent'}
                  />
                </div>
                {filterValues.rocketName !== '' ? (
                  <div className='filterItem'>
                    <h4 className='filterValues'>{filterValues.rocketName}</h4>
                  </div>
                ) : (
                  ''
                )}
                {filterValues.launchPadName !== '' ? (
                  <div className='filterItem'>
                    <h4 className='filterValues'>
                      {filterValues.launchPadName}
                    </h4>
                  </div>
                ) : (
                  ''
                )}

                {filterValues.outcomeName !== '' ? (
                  <div className='filterItem'>
                    <h4 className='filterValues'>
                      {filterValues.outcomeName.toString().toUpperCase()}
                    </h4>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div
                style={{
                  height:
                    isFilterOpen && launchPads !== undefined
                      ? `calc(40px * ${launchPads.length + 1})`
                      : '0',
                }}
                className={`${'dropDownItems'} ${
                  isFilterOpen ? 'activeFilter' : 'noneActiveFilter'
                } `}
              >
                <div className='vehicles dropdownContent'>
                  <div className='dropdowLeft'>
                    <h4 id='vehicleFilter' onClick={handleFilterParameter}>
                      VEHICLE
                    </h4>
                  </div>
                  {rockets !== undefined ? (
                    <div
                      style={{
                        height: !isVehicleFilter
                          ? '0'
                          : `calc(40px * ${rockets.length})`,
                      }}
                      className={`${'dropdownRight'} ${
                        isVehicleFilter
                          ? 'activeSelection'
                          : 'nonActiveSelection'
                      } `}
                    >
                      {rockets.map((rocket) => (
                        <h4
                          className={`${'selectionItem'} ${'rocket'} `}
                          key={rocket.id}
                          id={rocket.id}
                          onClick={handleFilterSelection}
                        >
                          {rocket.name}
                        </h4>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='launchSiteDropDown dropdownContent'>
                  <div className='dropdowLeft'>
                    <h4 id='launchSite' onClick={handleFilterParameter}>
                      LAUNCH SITE
                    </h4>
                  </div>
                  {launchPads !== undefined ? (
                    <div
                      style={{
                        height: !isLaunchSite
                          ? '0'
                          : `calc(40px * ${launchPads.length})`,
                      }}
                      className={`${'dropdownRight'} ${
                        isLaunchSite ? 'activeSelection' : 'nonActiveSelection'
                      } `}
                    >
                      {launchPads.map((launchpad) => (
                        <h4
                          className='selectionItem launchpad'
                          key={launchpad.id}
                          id={launchpad.id}
                          onClick={handleFilterSelection}
                        >
                          {launchpad.name.toUpperCase()}
                        </h4>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='outcome dropdownContent'>
                  <div className='dropdowLeft'>
                    <h4 id='outcome' onClick={handleFilterParameter}>
                      OUTCOME
                    </h4>
                  </div>
                  <div
                    id='outcome'
                    className={`${'dropdownRight'} ${
                      isOutcome ? 'activeSelection' : 'nonActiveSelection'
                    } `}
                    style={{
                      height: !isOutcome ? '0' : `80px`,
                    }}
                  >
                    <h4
                      className='selectionItem outcome '
                      onClick={handleFilterSelection}
                      id='true'
                    >
                      SUCCESS
                    </h4>
                    <h4
                      className='selectionItem outcome '
                      onClick={handleFilterSelection}
                      id='false'
                    >
                      FAILURE
                    </h4>
                  </div>
                </div>
                <div className='clearFilter '>
                  <h4 id='clearFilter' onClick={handleFilterSelection}>
                    CLEAR FILTER
                  </h4>
                </div>
              </div>
            </div>
            <div className='mainInfo'>
              <div className='selectorCol'>
                <div className='upArrowContainer'>
                  {launches.length === 1 || slideNumber === 0 ? (
                    <div className='upArrow disabledUpArrow' id={'back'}></div>
                  ) : (
                    <div
                      className='upArrow enabledUpArrow'
                      id={'back'}
                      onClick={handleNextAndBack}
                    ></div>
                  )}
                </div>

                <div className='circlesCont'>
                  {circleChunks[chunckNumber].map((circle, index) => (
                    <div
                      className={`${'circle'} ${
                        circle === slideNumber ? 'selectedPage' : ''
                      } ${circle > launches.length - 1 ? 'hiddenCircle' : ''}`}
                      key={index}
                      id={circle}
                      onClick={handleCirclePageClick}
                    ></div>
                  ))}
                </div>

                <div className='downArrowContainer'>
                  {launches.length === 1 ||
                  slideNumber === launches.length - 1 ? (
                    <div
                      className='downArrow disabledDownArrow'
                      id={'next'}
                    ></div>
                  ) : (
                    <div
                      className='downArrow enabledDownArrow'
                      id={'next'}
                      onClick={handleNextAndBack}
                    ></div>
                  )}
                </div>
              </div>
              <div className='information'>
                <div className='missionRowHeader'>
                  <div className='topRowItem'>FLIGHT NO</div>
                  <div className='topRowItem'>VEHICLE</div>
                  <div className='topRowItem'>DATE</div>
                  <div className='topRowItem '>LAUNCH SITE</div>
                  <div className='topRowItem payload'>PAYLOAD</div>
                  <div className='topRowItem customer '>CUSTOMER</div>
                  <div className='topRowItem'>OUTCOME</div>
                </div>
                <div className={`${sliderClass}`} key={slideNumber}>
                  { launches[slideNumber] !== undefined ||
                  launches[slideNumber].length !== 0 ? (
                    <>
                      {launches[slideNumber].map((launch, index) => (
                        <div
                          className={` ${'informationRow'} ${
                            index % 2 === 0 ? 'darkItem' : ''
                          }  ${
                            index === launches[slideNumber].length - 1
                              ? 'lastItem'
                              : ''
                          } `}
                          key={index}
                          id={launch.id}
                          onClick={openModal}
                        >
                          <div className='infoItem'>{launch.flight_number}</div>
                          <div className='infoItem'>
                            {launch.rocket.name.toUpperCase()}
                          </div>

                          <div className='infoItem'>
                            {new Date(launch.date_local)
                              .toLocaleDateString('en-US', options)
                              .toUpperCase()}
                          </div>

                          <div className='infoItem'>
                            {launch.launchpad.name.toUpperCase()}
                          </div>
                          <div className='infoItem payload'>
                            {launch.name.toUpperCase()}
                          </div>
                          <div className='infoItem customer'>
                            {launch.payloads[0].customers.length !== 0
                              ? launch.payloads[0].customers[0].toUpperCase()
                              : 'NO CUSTOMER AVAILABLE'}
                          </div>
                          <div className='infoItem'>
                            {launch.success === true ? 'SUCCESS' : 'FAILURE'}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
