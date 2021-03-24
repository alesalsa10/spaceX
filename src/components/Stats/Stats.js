import './Stats.css';
import React, { useState, useEffect } from 'react';
import LaunchHistoryChart from '../LaunchHistoryChart/LaunchHistoryChart';
import LandingHistoryChart from '../LandingHistoryChart/LandingHistoryChart';
import { getAllLaunches } from '../../Data/fetchData';
import { defaults } from 'react-chartjs-2';
import { chartDataFormatter } from './Charts/yearChart';
import { pieChartDataFormatter } from './Charts/rocketChart';
import { launchpadDataFormatter } from './Charts/launchpadChart';
import { successRateFormatter } from './Charts/successRate';
import { calculateBoostersLanded } from './Charts/boostersLanded';
import { formatLandingHistoryData } from './Charts/landingHistory';
import { formatFairingRecovery } from './Charts/fairingsRecovery';
import { getHeaviestLanded } from './Charts/heaviestPayloadLanded';
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
  const [landingHistoryOptions, setLandingHistoryOptions] = useState();
  const [fairingsRecovery, setFairingsRecovery] = useState();
  const [fairingsRecoveryOptions, setFairingsRecoveryOptions] = useState();
  const [heaviestLanded, setHeaviestLanded] = useState();

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
      let landingHistoryOptions = options;
      landingHistoryOptions.scales.yAxes[0].scaleLabel.labelString =
        'Number of Landings';
      setLandingHistoryOptions(landingHistoryOptions);

      const fairingsRecovery = formatFairingRecovery(allLaunches);
      setFairingsRecovery(fairingsRecovery);
      let fairingsOptions = options;
      fairingsOptions.scales.yAxes[0].scaleLabel.labelString =
        'Number of Fairings Recovered';
      setFairingsRecoveryOptions(fairingsOptions);

      const heaviestLanded = getHeaviestLanded(allLaunches);
      setHeaviestLanded(heaviestLanded);
    };
    fetchAllLaunches();
  }, []);
  return (
    <>
      {yearData !== undefined && yearOptions !== undefined ? (
        <>
          <LaunchHistoryChart
            graphFilter={graphFilter}
            handleChartFilterClick={handleChartFilterClick}
            yearData={yearData}
            yearOptions={yearOptions}
            rocketData={rocketData}
            doughnutChartOptions={doughnutChartOptions}
            launchpadData={launchpadData}
            successData={successData}
            lineOptions={lineOptions}
          />
          <LandingHistoryChart
            landingFilter={landingFilter}
            landingHistoryChartClick={landingHistoryChartClick}
            boostersLanded={boostersLanded}
            landingHistory={landingHistory}
            landingHistoryOptions={landingHistoryOptions}
            fairingsRecovery={fairingsRecovery}
            fairingsRecoveryOptions={fairingsRecoveryOptions}
            heaviestLanded={heaviestLanded}
          />
        </>
      ) : (
        <div className='chartSpinner'>
          <Loader type='TailSpin' color='#005288' height={100} width={100} />
        </div>
      )}
    </>
  );
}
