import React, { useState, useEffect } from 'react';
import { reusedFlights } from './dataFormatters/reusedFlights';
import CountUp from 'react-countup';
import ChartFilter from '../ChartFilter/ChartFilter';
import ChartArrows from '../CharArrows/ChartArrows';

export default function ReusedChart({ data }) {
  const [reusedCount, setReusedCount] = useState();
  const [reusedFilter, setReusedFilter] = useState('REUSED FLIGHTS');
  const handleReusedChartFilterClick = (e) => {
    setReusedFilter(e.currentTarget.id);
  };

  useEffect(() => {
    const getData = () => {
      const reusedFlightsCount = reusedFlights(data);
      setReusedCount(reusedFlightsCount);
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
