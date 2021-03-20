import './Stats.css';
import React, { useState, useEffect } from 'react';
import { getAllLaunches } from '../../Data/fetchData';
import { Doughnut, Bar, defaults, Line } from 'react-chartjs-2';
import { chartDataFormatter } from './Charts/yearChart';
import { pieChartDataFormatter } from './Charts/rocketChart';
import { launchpadDataFormatter } from './Charts/launchpadChart';
import { successRateFormatter } from './Charts/successRate';
import Loader from 'react-loader-spinner';

defaults.global.maintainAspectRatio = false;

export default function Stats() {
  //need to get launch history(per year, rocket, launchpad, success rate)
  const [graphFilter, setGraphFilter] = useState('PER YEAR');
  const [yearData, setYearData] = useState();
  const [yearOptions, setYearOptions] = useState();
  const [rocketData, setRocketData] = useState();
  const [doughnutChartOptions, setDoughnutChartOptions] = useState();
  const [launchpadData, setLaunchpadData] = useState();
  const [successData,setSuccessData] = useState();
  const [lineOptions, setLineOptions] = useState();

  const handleChartFilterClick = (e) => {
    setGraphFilter(e.currentTarget.id);
  };

  useEffect(() => {
    const fetchAllLaunches = async () => {
      const allLaunches = await getAllLaunches('', '', '', 'all');
      console.log(allLaunches);

      const yearData = chartDataFormatter(allLaunches);
      const { formattedData, options } = yearData;
      setYearData(formattedData);
      setYearOptions(options);

      const rocketData = pieChartDataFormatter(allLaunches);
      const { formattedRocketData, doughnutChartOptions } = rocketData;
      setRocketData(formattedRocketData);
      setDoughnutChartOptions(doughnutChartOptions);

      const launchpadData = launchpadDataFormatter(allLaunches);
      setLaunchpadData(launchpadData);

      const successRate = successRateFormatter(allLaunches);
      const { formattedSuccessData, lineOptions } = successRate
      setSuccessData(formattedSuccessData)
      setLineOptions(lineOptions)
    };
    fetchAllLaunches();
  }, []);
  return (
    <>
      {yearData !== undefined && yearOptions !== undefined ? (
        <>
          <div className='chartHeader'>
            <h1>LAUNCH HISTORY - {graphFilter}</h1>
          </div>

          <div className='chartFilterDiv'>
            <div className='chartRow'>
              <h5
                className={`${
                  graphFilter === 'PER YEAR' ? 'selectedChartRow' : ''
                }`}
                id='PER YEAR'
                onClick={handleChartFilterClick}
              >
                PER YEAR
              </h5>
            </div>
            <div className='chartRow'>
              <h5
                className={`${
                  graphFilter === 'PER ROCKET' ? 'selectedChartRow' : ''
                }`}
                id='PER ROCKET'
                onClick={handleChartFilterClick}
              >
                PER ROCKET
              </h5>
            </div>
            <div className='chartRow'>
              <h5
                className={`${
                  graphFilter === 'PER LAUNCHPAD' ? 'selectedChartRow' : ''
                }`}
                id='PER LAUNCHPAD'
                onClick={handleChartFilterClick}
              >
                PER LAUNCHPAD
              </h5>
            </div>
            <div className='chartRow'>
              <h5
                className={`${
                  graphFilter === 'SUCCESS RATE' ? 'selectedChartRow' : ''
                }`}
                id='SUCCESS RATE'
                onClick={handleChartFilterClick}
              >
                SUCCESS RATE
              </h5>
            </div>
          </div>
          <div className='chartContainer'>
            {graphFilter === 'PER YEAR' ? (
              <Bar data={yearData} options={yearOptions} key={graphFilter} />
            ) : graphFilter === 'PER ROCKET' ? (
              <Doughnut
                data={rocketData}
                options={doughnutChartOptions}
                key={graphFilter}
              />
            ) : graphFilter === 'PER LAUNCHPAD' ? (
              <Doughnut
                data={launchpadData}
                options={doughnutChartOptions}
                key={graphFilter}
              />
            ) : (
              <Line  data={successData}  options={lineOptions} key={graphFilter} />
            )}
          </div>
        </>
      ) : (
        <div className='chartSpinner'>
          <Loader type='TailSpin' color='#005288' height={100} width={100} />
        </div>
      )}
    </>
  );
}
