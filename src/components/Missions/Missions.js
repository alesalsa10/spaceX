import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import './Missions.css';
import {
  getAllRockets,
  getAllLaunchpads,
  getAllLaunches,
} from '../../Data/fetchData';
import Buttton from '../Button/Button';

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
  const [pageNumber, setPageNumber] = useState(0);

  const handleNextAndBack = (e) => {
    let id = e.target.id;
    if (id === 'next') {
      if (pageNumber === launches.length - 1) {
        setPageNumber(0);
      } else {
        setPageNumber(pageNumber + 1);
      }
    } else {
      if (pageNumber === 0) {
        setPageNumber(launches.length - 1);
      } else {
        setPageNumber(pageNumber - 1);
      }
    }
  };

  const handleOpenFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsVehicleFilter(false);
    setIsOutcome(false);
    setIsLaunchSite(false);
  };

  const handleFilterParameter = (e) => {
    if (e.target.id === 'vehicle') {
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
    setIsLaunchSite(false);
    setIsVehicleFilter(false);
    setIsOutcome(false);
    setIsFilterOpen(false);
  };

  const splitArrray = (arr) => {
    let newArray = [];
    if (arr.length <= 8) {
      newArray[0] = arr.slice(0, arr.length);
    } else {
      for (let i = 0; i <= arr.length; i += 8) {
        newArray.push(arr.slice(i, i + 8));
      }
    }
    return newArray;
  };

  const handleCirclePageClick = (e) => {
    setPageNumber(parseInt(e.target.id));
  };

  const clearAllfilters = () => {
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
      const rockets = await getAllRockets();
      setRockets(rockets);

      const launchPads = await getAllLaunchpads();
      setLaunchPads(launchPads);

      const allLaunches = await getAllLaunches(
        filterValues.rocketId,
        filterValues.launchPadId,
        filterValues.outcome
      );
      console.log(allLaunches);

      let launches = splitArrray(allLaunches);
      setLaunches(launches);
      console.log(launches);
    }
    fetchData();
  }, [filterValues]);

  return (
    <div
      className={`${
        launches === 'loading' ? 'loadingContainer' : 'allMissionsContainer'
      }`}
    >
      {/* <div className="infoHeader">
                <div className="totalLaunches">
                    <h2>5</h2>
                </div>
                <div className="totalLandings">
                    <h2>6</h2>
                </div>
                <div className="reflownRockets">
                    <h2>4</h2>
                </div>
            </div> */}

      {launches === 'loading' ? (
        <div className='spinner'>
          <Loader type='TailSpin' color='#005288' height={100} width={100} />
        </div>
      ) : launches[0].length === 0 ? (
        <div className='noResultsFound'>
          <h1 className='noResultsHeader'>OH NO!</h1>
          <h4 className='noResultsH5'>
            NO RESULTS WERE FOUND FOR THIS SELECTION.
          </h4>
          <h4 onClick={clearAllfilters} className='clearAndTryAgain'>
            CLEAR FILTERS AND TRY AGAIN.
          </h4>
        </div>
      ) : (
        <>
          <div className='filter'>
            <div className='filterButtonDiv'>
              <div className='filterItem'>
                <Buttton
                  text={'FILTER'}
                  onClick={handleOpenFilter}
                  className={'button'}
                />
              </div>
              <div className='filterItem'>
                {filterValues.rocketName !== '' ? (
                  <h4 className='filterValues firstFilterValue'>
                    {filterValues.rocketName}
                  </h4>
                ) : (
                  ''
                )}
                {filterValues.launchPadName !== '' ? (
                  <h4 className='filterValues'>{filterValues.launchPadName}</h4>
                ) : (
                  ''
                )}

                {filterValues.outcomeName !== '' ? (
                  <h4 className='filterValues'>
                    {filterValues.outcomeName.toString().toUpperCase()}
                  </h4>
                ) : (
                  ''
                )}
              </div>
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
                  <h4 id='vehicle' onClick={handleFilterParameter}>
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
                      isVehicleFilter ? 'activeSelection' : 'nonActiveSelection'
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
              <div className='launchSite dropdownContent'>
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
                <div
                  className='upArrow'
                  id={'back'}
                  onClick={handleNextAndBack}
                ></div>
              </div>

              <div className='circlesCont'>
                {launches.map((launch, index) => (
                  <div
                    className={`${'circle'} ${
                      index === pageNumber ? 'selectedPage' : ''
                    } `}
                    key={index}
                    id={index}
                    onClick={handleCirclePageClick}
                  ></div>
                ))}
              </div>

              <div className='downArrowContainer'>
                <div
                  className='downArrow'
                  id={'next'}
                  onClick={handleNextAndBack}
                ></div>
              </div>
            </div>
            <div className='information'>
              <div className='missionRowHeader'>
                <div className='topRowItem'>FLIGHT NO</div>
                <div className='topRowItem'>VEHICLE</div>
                <div className='topRowItem'>DATE</div>
                <div className='topRowItem'>LAUNCH SITE</div>
                <div className='topRowItem'>PAYLOAD</div>
                <div className='topRowItem'>CUSTOMER</div>
                <div className='topRowItem'>OUTCOME</div>
              </div>
              {launches[pageNumber].map((launch, index) => (
                <div
                  className={` ${'informationRow'} ${
                    index % 2 === 0 ? 'darkItem' : ''
                  }`}
                  key={index}
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
                  <div className='infoItem'>
                    {launch.payloads.length === 0 ? (
                      'NO PAYLOAD'
                    ) : (
                      <> {launch.payloads[0].name.toUpperCase()} </>
                    )}
                  </div>
                  <div className='infoItem'>
                    {launch.payloads[0].customers.length !== 0
                      ? launch.payloads[0].customers[0].toUpperCase()
                      : 'NO CUSTOMER AVAILABLE'}
                  </div>
                  <div className='infoItem'>
                    {launch.success === true ? 'SUCCESS' : 'FAILURE'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
