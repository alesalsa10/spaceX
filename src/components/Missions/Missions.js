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
  const [isFilerOpen, setIsFilterOpen] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterOpen(!isFilerOpen);
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
        {isFilerOpen ? (
          <div className='dropDownItems'>
            <h4>VEHICLE</h4>
            <h4>LAUNCH SITE</h4>
            <h4>OUTCOME</h4>
            <h4>CLEAR FILTER</h4>
          </div>
        ) : (
          ''
        )}
      </div>

      <div className='mainInfo'>
        <div className='selectorCol'>something here</div>
        <div className='information'>something else</div>
      </div>
    </div>
  );
}
