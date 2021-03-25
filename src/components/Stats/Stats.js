import './Stats.css';
import React, { useState, useEffect } from 'react';
import LaunchHistoryChart from '../LaunchHistoryChart/LaunchHistoryChart';
import LandingHistoryChart from '../LandingHistoryChart/LandingHistoryChart';
import ReusedChart from '../ReusedChart/ReusedChart';
import { getAllLaunches } from '../../Data/fetchData';
import { defaults } from 'react-chartjs-2';
import Loader from 'react-loader-spinner';

defaults.global.maintainAspectRatio = false;

export default function Stats() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchAllLaunches = async () => {
      const allLaunches = await getAllLaunches('', '', '', 'all');
      setData(allLaunches);
      console.log(allLaunches);

      /* const reused = reusedFlights(allLaunches);
      setReusedCount(reused);  */
    };
    fetchAllLaunches();
  }, []);
  return (
    <>
      {data !== undefined ? (
        <>
          <LaunchHistoryChart data={data} />
          <LandingHistoryChart data={data} />
        </>
      ) : (
        <div className='chartSpinner'>
          <Loader type='TailSpin' color='#005288' height={100} width={100} />
        </div>
      )}
    </>
  );
}
