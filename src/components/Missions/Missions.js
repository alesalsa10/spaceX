import React, { useEffect, useState } from 'react';
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
  const [launches, setLaunches] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVehicleFilter, setIsVehicleFilter] = useState(false);
  const [isOutcome, setIsOutcome] = useState(false);
  const [isLaunchSite, setIsLaunchSite] = useState(false);
  const [filterValues, setFilterValues] = useState({
    rocketId: '',
    launchPadId: '',
    outcome: '',
  });

  const handleOpenFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsVehicleFilter(false);
    setIsOutcome(false);
    setIsLaunchSite(false)
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
    
    if (filterType === 'rocket'){
      setFilterValues({...filterValues, rocketId: id})
    }
    else if(filterType === 'launchpad'){
      setFilterValues({ ...filterValues, launchPadId: id });
    }
    else if(filterType === 'outcome'){
      setFilterValues({...filterValues, outcome: id})
    } else {
      setFilterValues({
        rocketId: '',
        launchPadId: '',
        outcome: ''
      })
    }

  };

  useEffect(() => {
    async function fetchData() {
      const rockets = await getAllRockets();
      setRockets(rockets);
      console.log(rockets);

      const launchPads = await getAllLaunchpads();
      setLaunchPads(launchPads);
      console.log(launchPads);

      const allLaunches = await getAllLaunches();
      setLaunches(allLaunches);
      console.log(allLaunches);
    }
    fetchData();
  }, []);

  return (
    <div className='allMissionsContainer'>
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

      <div className='filter'>
        <Buttton text={'FILTER'} onClick={handleOpenFilter} />
        <div
          style={{height: isFilterOpen && launchPads !== undefined ? `calc(40px * ${launchPads.length +1})`: '0' }}
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
                    {launchpad.name}
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
            <h4 id='clearFilter' onClick={handleFilterSelection}  >CLEAR FILTER</h4>
          </div>
        </div>
      </div>

      {/* <div className='mainInfo'>
        <div className='selectorCol'>something here</div>
        <div className='information'>something else</div>
      </div> */}
    </div>
  );
}
