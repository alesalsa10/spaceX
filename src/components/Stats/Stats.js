import './Stats.css';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { getAllLaunches } from '../../Data/fetchData';
import { Doughnut, Bar, defaults, Line } from 'react-chartjs-2';
import { chartDataFormatter } from './Charts/yearChart';
import { pieChartDataFormatter } from './Charts/rocketChart';
import { launchpadDataFormatter } from './Charts/launchpadChart';
import { successRateFormatter } from './Charts/successRate';
import { calculateBoostersLanded } from './Charts/boostersLanded';
import { formatLandingHistoryData } from './Charts/landingHistory';
import Loader from 'react-loader-spinner';

defaults.global.maintainAspectRatio = false;

export default function Stats() {
  //need to get launch history(per year, rocket, launchpad, success rate)
  const [graphFilter, setGraphFilter] = useState('PER YEAR');
  const [landingFilter, setLandingFilter] = useState('BOOSTERS LANDED');
  const [yearData, setYearData] = useState();
  const [yearOptions, setYearOptions] = useState();
  const [rocketData, setRocketData] = useState();
  const [doughnutChartOptions, setDoughnutChartOptions] = useState();
  const [launchpadData, setLaunchpadData] = useState();
  const [successData, setSuccessData] = useState();
  const [lineOptions, setLineOptions] = useState();
  const [boostersLanded, setBoostersLanded] = useState();
  const [landingHistory, setLandingHistory] = useState();
  const[landingHistoryOptions, setLandingHistoryOptions] = useState()

  const handleChartFilterClick = (e) => {
    setGraphFilter(e.currentTarget.id);
  };

  const landingHistoryChartClick = (e) => {
    setLandingFilter(e.currentTarget.id);
  };

  useEffect(() => {
    const fetchAllLaunches = async () => {
      const allLaunches = await getAllLaunches('', '', '', 'all');
      console.log(allLaunches);
      const yearData = chartDataFormatter(allLaunches);
      const { formattedData, options } = yearData;
      setYearData(formattedData);
      setYearOptions(options);

      console.log(options);
      let landingHistoryOptions = options;
      landingHistoryOptions.scales.yAxes[0].scaleLabel.labelString = 'Number of Landings';
      setLandingHistoryOptions(landingHistoryOptions)

      const rocketData = pieChartDataFormatter(allLaunches);
      const { formattedRocketData, doughnutChartOptions } = rocketData;
      setRocketData(formattedRocketData);
      setDoughnutChartOptions(doughnutChartOptions);

      const launchpadData = launchpadDataFormatter(allLaunches);
      setLaunchpadData(launchpadData);

      const successRate = successRateFormatter(allLaunches);
      const { formattedSuccessData, lineOptions } = successRate;
      setSuccessData(formattedSuccessData);
      setLineOptions(lineOptions);

      const boostersLanded = calculateBoostersLanded(allLaunches);
      setBoostersLanded(boostersLanded);

      const landingHistory = formatLandingHistoryData(allLaunches);
      setLandingHistory(landingHistory);
    };
    fetchAllLaunches();
  }, []);
  return (
    <>
      {yearData !== undefined && yearOptions !== undefined ? (
        <>
          <div className='chartsContainer'>
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
                <Line
                  data={successData}
                  options={lineOptions}
                  key={graphFilter}
                />
              )}
            </div>
          </div>
          <div className='chartsContainer'>
            <div className='chartHeader'>
              <h1>RECOVERY - {landingFilter}</h1>
            </div>
            <div className='chartFilterDiv'>
              <div className='chartRow'>
                <h5
                  className={`${
                    landingFilter === 'BOOSTERS LANDED'
                      ? 'selectedChartRow'
                      : ''
                  }`}
                  id='BOOSTERS LANDED'
                  onClick={landingHistoryChartClick}
                >
                  BOOSTERS LANDED
                </h5>
              </div>
              <div className='chartRow'>
                <h5
                  className={`${
                    landingFilter === 'LANDING HISTORY'
                      ? 'selectedChartRow'
                      : ''
                  }`}
                  id='LANDING HISTORY'
                  onClick={landingHistoryChartClick}
                >
                  LANDING HISTORY
                </h5>
              </div>
              {/* <div className='chartRow'>
                <h5
                  className={`${
                    landingFilter === 'HEAVIEST' ? 'selectedChartRow' : ''
                  }`}
                  id='HEAVIEST'
                  onClick={landingHistoryChartClick}
                >
                  HEAVIEST
                </h5>
              </div> */}
              {/* <div className='chartRow'>
                <h5
                  className={`${
                    landingFilter === 'FAIRINGS RECOVERY'
                      ? 'selectedChartRow'
                      : ''
                  }`}
                  id='FAIRINGS RECOVERY'
                  onClick={landingHistoryChartClick}
                >
                  FAIRINGS RECOVERY
                </h5>
              </div> */}
            </div>
            <div className='chartContainer'>
              {landingFilter === 'BOOSTERS LANDED' ? (
                <div className='boostersContainer'>
                  <h1 className='boostersLanded'>
                    {boostersLanded !== undefined ? (
                      <CountUp end={boostersLanded} />
                    ) : (
                      ''
                    )}
                  </h1>
                  <h1>LANDED</h1>
                </div>
              ) : landingFilter === 'LANDING HISTORY' ? (
                <Bar
                  data={landingHistory}
                  options={landingHistoryOptions}
                  key={landingFilter}
                />
              ) : (
                ''
              )}
            </div>
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
