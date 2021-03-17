import './Stats.css';
import React, { useState, useEffect } from 'react';
import { getAllLaunches } from '../../Data/fetchData';
import { Line, Bar } from 'react-chartjs-2';
import { chartDataFormatter } from './Charts/yearChart';

export default function Stats() {
  //need to get launch history(per year, rocket, launchpad, success rate)
  const [graphFilter, setGraphFilter] = useState('year');
  const [graphData, setGraphData] = useState();
  const [options, setOptions] = useState();


  useEffect(() => {
    const fetchAllLaunches = async () => {
      const allLaunches = await getAllLaunches('', '', '', 'all');
      console.log(allLaunches);

      let years = [];
      allLaunches.forEach((launch) => {
        if (!years.includes(new Date(launch.date_local).getFullYear())) {
          years.push(new Date(launch.date_local).getFullYear());
        }
      });
      
      const data = chartDataFormatter(allLaunches, years);
      const {formattedData, options} = data;
      setGraphData(formattedData);
      setOptions(options)
      
    };
    fetchAllLaunches();
  }, []);
  return (
    <>
      {graphData !== undefined ? (
        <div className='chartContainer'>
          <Bar data={graphData} options={options} />
        </div>
      ) : (
        ''
      )}
    </>
  );
}
