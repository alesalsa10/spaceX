import React, { useState, useEffect } from 'react';
import { calculateBoostersLanded } from './dataFormatters/boostersLanded';
import { formatLandingHistoryData } from './dataFormatters/landingHistory';
import { formatFairingRecovery } from './dataFormatters/fairingsRecovery';
import { getHeaviestLanded } from './dataFormatters/heaviestPayloadLanded';
import CountUp from 'react-countup';
import { Bar } from 'react-chartjs-2';

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
        <div className='chartsContainer'>
          <div className='chartHeader'>
            <h1>RECOVERY - {landingFilter}</h1>
          </div>
          <div className='chartFilterDiv'>
            <div className='chartRow'>
              <h5
                className={`${
                  landingFilter === 'BOOSTERS LANDED' ? 'selectedChartRow' : ''
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
                  landingFilter === 'LANDING HISTORY' ? 'selectedChartRow' : ''
                }`}
                id='LANDING HISTORY'
                onClick={landingHistoryChartClick}
              >
                LANDING HISTORY
              </h5>
            </div>
            <div className='chartRow'>
              <h5
                className={`${
                  landingFilter === 'HEAVIEST' ? 'selectedChartRow' : ''
                }`}
                id='HEAVIEST'
                onClick={landingHistoryChartClick}
              >
                HEAVIEST
              </h5>
            </div>
            <div className='chartRow'>
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
            </div>
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
              <div className='boostersContainer'>
                <h1 className='boostersLanded'>
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
        </div>
      ) : (
        ''
      )}
    </>
  );
}
