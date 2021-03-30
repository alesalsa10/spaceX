import React, { useState, useEffect } from 'react';
import { calculateBoostersLanded } from './dataFormatters/boostersLanded';
import { formatLandingHistoryData } from './dataFormatters/landingHistory';
import { formatFairingRecovery } from './dataFormatters/fairingsRecovery';
import { getHeaviestLanded } from './dataFormatters/heaviestPayloadLanded';
import CountUp from 'react-countup';
import { Bar } from 'react-chartjs-2';
import Chartfilter from '../ChartFilter/ChartFilter';
import ChartArrows from '../CharArrows/ChartArrows';
import './LandingHistoryChart.css';

export default function LandingHistoryChart({ data }) {
  const [landingFilter, setLandingFilter] = useState('BOOSTERS LANDED');
  const [boostersLanded, setBoostersLanded] = useState();
  const [landingHistory, setLandingHistory] = useState();
  const [landingHistoryOptions, setLandingHistoryOptions] = useState();
  const [fairingsRecovery, setFairingsRecovery] = useState();
  const [fairingsRecoveryOptions, setFairingsRecoveryOptions] = useState();
  const [heaviestLanded, setHeaviestLanded] = useState();

  const landingHistoryChartClick = (e) => {
    setLandingFilter(e.currentTarget.id);
  };

  useEffect(() => {
    const getData = () => {
      const boostersLanded = calculateBoostersLanded(data);
      setBoostersLanded(boostersLanded);

      const landingHistory = formatLandingHistoryData(data);
      const { landingHistoryData, options } = landingHistory;
      setLandingHistory(landingHistoryData);
      setLandingHistoryOptions(options);

      const fairingsRecovery = formatFairingRecovery(data);
      setFairingsRecovery(fairingsRecovery);

      const fairingsOptions = JSON.parse(JSON.stringify(options));
      fairingsOptions.scales.yAxes[0].scaleLabel.labelString =
        'Number of Fairings Recovered';
      setFairingsRecoveryOptions(fairingsOptions);

      const heaviestLanded = getHeaviestLanded(data);
      setHeaviestLanded(heaviestLanded);
    };
    getData();
  }, []);

  return (
    <>
      {data !== undefined ? (
        <div className='chartsContainer' id='landingChart'>
          <div className='chartHeader'>
            <div className='headerText'>
              <h1>RECOVERY - {landingFilter}</h1>
            </div>
            <ChartArrows type='up' hrefId='#launchCharts' />
          </div>
          <Chartfilter
            filter={landingFilter}
            onClick={landingHistoryChartClick}
            values={[
              'BOOSTERS LANDED',
              'LANDING HISTORY',
              'HEAVIEST',
              'FAIRINGS RECOVERY',
            ]}
          />
          <div className='chartContainer'>
            {landingFilter === 'BOOSTERS LANDED' ? (
              <div className='countUpContainer'>
                <h1 className='innerCountUp'>
                  {boostersLanded !== undefined ? (
                    <CountUp end={boostersLanded} />
                  ) : (
                    ''
                  )}
                </h1>
                <h1>LANDED</h1>
                <p className='graphInfo'>
                  To date, a total of {boostersLanded} boosters have
                  successfully landed
                </p>
              </div>
            ) : landingFilter === 'LANDING HISTORY' ? (
              <Bar
                data={landingHistory}
                options={landingHistoryOptions}
                key={landingFilter}
              />
            ) : landingFilter === 'FAIRINGS RECOVERY' ? (
              <Bar
                data={fairingsRecovery}
                options={fairingsRecoveryOptions}
                key={landingFilter}
              />
            ) : (
              <div className='countUpContainer'>
                <h1 className='innerCountUp'>
                  {heaviestLanded !== undefined ? (
                    <CountUp end={heaviestLanded.heaviest} />
                  ) : (
                    ''
                  )}
                </h1>
                <h1>KILOGRAMS</h1>
                <p className='graphInfo'>
                  Heaviest launched mission to date that enabled a successfull
                  landing was the {heaviestLanded.missionName} mission
                </p>
              </div>
            )}
          </div>
          <ChartArrows type='down' hrefId='#reusedCharts' />
        </div>
      ) : (
        ''
      )}
    </>
  );
}
