import React from 'react'
import CountUp from 'react-countup';
import {Bar} from 'react-chartjs-2'

export default function LandingHistoryChart({landingFilter, landingHistoryChartClick, boostersLanded, landingHistory, landingHistoryOptions, fairingsRecovery, fairingsRecoveryOptions, heaviestLanded}) {
    return (
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
                landingFilter === 'FAIRINGS RECOVERY' ? 'selectedChartRow' : ''
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
              <p className="graphInfo">To date, a total of {boostersLanded} have successfully landed</p>
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
                  <CountUp end={heaviestLanded} />
                ) : (
                  ''
                )}
              </h1>
              <h1>KILOGRAMS</h1>
              <p className='graphInfo'>
                Heaviest launched mission to date that enabled a successfull landing
              </p>
            </div>
          )}
        </div>
      </div>
    );
}
