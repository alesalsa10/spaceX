import './Stats.css';
import React, { useState, useEffect } from 'react';
import { getAllLaunches } from '../../Data/fetchData';
import { Doughnut, Bar } from 'react-chartjs-2';
import { chartDataFormatter } from './Charts/yearChart';
import {pieChartDataFormatter} from './Charts/rocketChart';

export default function Stats() {
  //need to get launch history(per year, rocket, launchpad, success rate)
  const [graphFilter, setGraphFilter] = useState('PER ROCKET');
  const [graphData, setGraphData] = useState();
  const [options, setOptions] = useState();

  const handleChartFilterClick = (e) => {
    setGraphFilter(e.currentTarget.id);
  };

  useEffect(() => {
    const fetchAllLaunches = async () => {
      const allLaunches = await getAllLaunches('', '', '', 'all');
      console.log(allLaunches);

      if (graphFilter === 'PER YEAR') {
        let years = [];
        allLaunches.forEach((launch) => {
          if (!years.includes(new Date(launch.date_local).getFullYear())) {
            years.push(new Date(launch.date_local).getFullYear());
          }
        });

        const data = chartDataFormatter(allLaunches, years);
        const { formattedData, options } = data;
        setGraphData(formattedData);
        setOptions(options);

      } else if (graphFilter === 'PER ROCKET'){
        let allRockets = [];
        allLaunches.forEach(launch => {
          if(!allRockets.includes(launch.rocket.name)){
            allRockets.push(launch.rocket.name)
          }
        });

        console.log(allRockets)

        const data = pieChartDataFormatter(allLaunches, allRockets);

        const {formattedData, options} = data;
        console.log(formattedData)
        setGraphData(formattedData);
        setOptions(options)
      }
    };
    fetchAllLaunches();
  }, [graphFilter]);
  return (
    <>
      {graphData !== undefined ? (
        <>
          <div className='chartHeader'>
            <h1>LAUNCH HISTORY - {graphFilter}</h1>
          </div>
          <div className='chartContainer'>
            <div className='chartFilterDiv'>
              <div className='chartRow'>
                <h3
                  className={`${
                    graphFilter === 'PER YEAR' ? 'selectedChartRow' : ''
                  }`}
                  id='PER YEAR'
                  onClick={handleChartFilterClick}
                >
                  PER YEAR
                </h3>
              </div>
              <div className='chartRow'>
                <h3
                  className={`${
                    graphFilter === 'PER ROCKET' ? 'selectedChartRow' : ''
                  }`}
                  id='PER ROCKET'
                  onClick={handleChartFilterClick}
                >
                  PER ROCKET
                </h3>
              </div>
              <div className='chartRow'>
                <h3
                  className={`${
                    graphFilter === 'PER LAUNCHPAD' ? 'selectedChartRow' : ''
                  }`}
                  id='PER LAUNCHPAD'
                  onClick={handleChartFilterClick}
                >
                  PER LAUNCHPAD
                </h3>
              </div>
            </div>
            {graphFilter === 'PER YEAR' ? (
              <Bar data={graphData} options={options} />
            ) : graphFilter === 'PER ROCKET' ? (
              <Doughnut data={graphData} options={options} />
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}
