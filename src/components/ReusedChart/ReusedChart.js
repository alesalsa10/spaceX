import React, { useState, useEffect } from 'react';
import { reusedFlights } from './dataFormatters/reusedFlights';
import { getMostLaunches } from './dataFormatters/mostLaunches';
import CountUp from 'react-countup';
import ChartFilter from '../ChartFilter/ChartFilter';
import ChartArrows from '../CharArrows/ChartArrows';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import './ReusedChart.css';

export default function ReusedChart({ data }) {
  const [reusedCount, setReusedCount] = useState();
  const [reusedFilter, setReusedFilter] = useState('REUSED FLIGHTS');
  const [mostLaunches, setMostLaunches] = useState();
  const [mostLaunchesOptions, setMostLaunchesOptions] = useState;
  const handleReusedChartFilterClick = (e) => {
    setReusedFilter(e.currentTarget.id);
  };

  useEffect(() => {
    const getData = () => {
      const reusedFlightsCount = reusedFlights(data);
      setReusedCount(reusedFlightsCount);

      const mostLaunhces = getMostLaunches(data);
      const { formattedData, options } = mostLaunches;
      setMostLaunches(formattedData);
      setMostLaunchesOptions(options);
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
              'QUICKEST TURNAROUND',
              'FAIRINGS',
            ]}
          />
          <div className='chartContainer'>
            {reusedFilter === 'REUSED FLIGHTS' ? (
              <div className='boostersContainer'>
                <h1 className='boostersLanded'>
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
                data={mostLaunches}
                key={reusedFilter}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
