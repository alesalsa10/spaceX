import React, {useState, useEffect} from 'react';
import { reusedFlights } from './dataFormatters/reusedFlights';


export default function ReusedChart() {

    const [reusedCount, setReusedCount] = useState();
    
    return (
      {/* <div className='chartsContainer'>
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
            <Line data={successData} options={lineOptions} key={graphFilter} />
          )}
        </div>
      </div> */}
    );
}
