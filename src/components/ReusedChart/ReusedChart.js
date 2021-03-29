import React, { useState, useEffect } from 'react';
import { reusedFlights } from './dataFormatters/reusedFlights';
import { getMostLaunches } from './dataFormatters/mostLaunches';
import { calculateReusedFairings } from './dataFormatters/fairings';
import CountUp from 'react-countup';
import ChartFilter from '../ChartFilter/ChartFilter';
import ChartArrows from '../CharArrows/ChartArrows';
import { Bar } from 'react-chartjs-2';
import './ReusedChart.css';

export default function ReusedChart({ data }) {
  const [reusedCount, setReusedCount] = useState();
  const [reusedFilter, setReusedFilter] = useState('REUSED FLIGHTS');
  const [mostLaunchesByBooster, setMostLaunchesByBooster] = useState();
  const [mostLaunchesOptions, setMostLaunchesOptions] = useState();
  const [reusedFairings, setReusedFairings] = useState();
  const handleReusedChartFilterClick = (e) => {
    setReusedFilter(e.currentTarget.id);
  };

  useEffect(() => {
    const getData = () => {
      const reusedFlightsCount = reusedFlights(data);
      setReusedCount(reusedFlightsCount);

      const mostLaunhces = getMostLaunches(data);
      const { formattedData, options } = mostLaunhces;
      setMostLaunchesByBooster(formattedData);
      setMostLaunchesOptions(options);

      const fairings = calculateReusedFairings(data);
      setReusedFairings(fairings);
    };
    getData();
  }, []);

  return (
    <>
      {data !== undefined ? (
        <div className='chartsContainer' id='reusedCharts'>
          <div className='chartHeader'>
            <div className='headerText'>
              <h1>REUSE - {reusedFilter}</h1>
            </div>
            <ChartArrows hrefId='#landingChart' type='up' />
          </div>
          <ChartFilter
            filter={reusedFilter}
            onClick={handleReusedChartFilterClick}
            values={[
              'REUSED FLIGHTS',
              'MOST LAUNCHES',
              /* 'QUICKEST TURNAROUND', */
              'FAIRINGS',
            ]}
          />
          <div className='chartContainer'>
            {reusedFilter === 'REUSED FLIGHTS' ? (
              <div className='countUpContainer'>
                <h1 className='innerCountUp'>
                  {reusedCount !== undefined ? (
                    <CountUp end={reusedCount} />
                  ) : (
                    ''
                  )}
                </h1>
                <h1>REUSED FLIGHTS</h1>
              </div>
            ) : reusedFilter === 'MOST LAUNCHES' ? (
              <Bar
                options={mostLaunchesOptions}
                data={mostLaunchesByBooster}
                key={reusedFilter}
              />
            ) : (
              <div className='countUpContainer'>
                <h1 className='innerCountUp'>
                  {reusedFairings !== undefined ? (
                    <CountUp end={reusedFairings} />
                  ) : (
                    ''
                  )}
                </h1>
                <h1>REFLOWN</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
