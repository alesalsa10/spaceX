import './Stats.css';
import React, { useState, useEffect } from 'react';
import { getAllLaunches } from '../../Data/fetchData';
import { Line, Bar } from 'react-chartjs-2';

export default function Stats() {
  //need to get launch history(per year, rocket, launchpad, success rate)
  const [graphFilter, setGraphFilter] = useState('year');
  const [graphData, setGraphData] = useState();

  const options = {
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: 'white', // this here
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: true,
            color: 'white',
          },
        },
      ],
      maintainAspectRatio: false,
    },
    legend: {
      display: true,
      position: 'bottom',
    },
  };

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
      const data = {
        labels: years,
        datasets: [
          {
            label: 'Falcon 1',
            backgroundColor: 'green',
            data: years.map(
              (year) =>
                allLaunches.filter(
                  (launch) =>
                    new Date(launch.date_local).getFullYear() === year &&
                    launch.rocket.name === 'Falcon 1' &&
                    launch.upcoming === false
                ).length
            ),
          },
          {
            label: 'Falcon 9',
            backgroundColor: 'blue',
            data: years.map(
              (year) =>
                allLaunches.filter(
                  (launch) =>
                    new Date(launch.date_local).getFullYear() === year &&
                    launch.rocket.name === 'Falcon 9' &&
                    launch.upcoming === false
                ).length
            ),
          },
          {
            label: 'Falcon Heavy',
            backgroundColor: 'black',
            data: years.map(
              (year) =>
                allLaunches.filter(
                  (launch) =>
                    new Date(launch.date_local).getFullYear() === year &&
                    launch.rocket.name === 'Falcon Heavy' &&
                    launch.upcoming === false
                ).length
            ),
          },
          {
            label: 'Upcoming',
            backgroundColor: 'white',
            data: years.map(
              (year) =>
                allLaunches.filter(
                  (launch) =>
                    new Date(launch.date_local).getFullYear() === year &&
                    launch.upcoming === true
                ).length
            ),
          },
        ],
      };
      setGraphData(data);
      console.log(data);
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
