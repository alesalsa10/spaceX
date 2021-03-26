import React, { useState, useEffect } from 'react';
import { chartDataFormatter } from './dataFormatters/yearChart';
import { pieChartDataFormatter } from './dataFormatters/rocketChart';
import { launchpadDataFormatter } from './dataFormatters/launchpadChart';
import { successRateFormatter } from './dataFormatters/successRate';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import Chartfilter from '../ChartFilter/ChartFilter';


export default function LaunchHistoryChart({ data }) {
  const [graphFilter, setGraphFilter] = useState('PER YEAR');
  const [yearData, setYearData] = useState();
  const [yearOptions, setYearOptions] = useState();
  const [rocketData, setRocketData] = useState();
  const [doughnutChartOptions, setDoughnutChartOptions] = useState();
  const [launchpadData, setLaunchpadData] = useState();
  const [successData, setSuccessData] = useState();
  const [lineOptions, setLineOptions] = useState();

  const handleChartFilterClick = (e) => {
    setGraphFilter(e.currentTarget.id);
  };

  useEffect(() => {
    const fetchData = () => {
      const yearData = chartDataFormatter(data);
      const { formattedData, options } = yearData;
      setYearData(formattedData);
      setYearOptions(options);

      const rocketData = pieChartDataFormatter(data);
      const { formattedRocketData, doughnutChartOptions } = rocketData;
      setRocketData(formattedRocketData);
      setDoughnutChartOptions(doughnutChartOptions);

      const launchpadData = launchpadDataFormatter(data);
      setLaunchpadData(launchpadData);

      const successRate = successRateFormatter(data);
      const { formattedSuccessData, lineOptions } = successRate;
      setSuccessData(formattedSuccessData);
      setLineOptions(lineOptions);
    };
    fetchData();
  }, []);

  return (
    <>
      {yearData !== undefined && yearOptions !== undefined ? (
        <div className='chartsContainer'>
          <div className='chartHeader'>
            <h1>LAUNCH HISTORY - {graphFilter}</h1>
          </div>
          <Chartfilter
            filter={graphFilter}
            onClick={handleChartFilterClick}
            values={['PER YEAR', 'PER ROCKET', 'PER LAUNCHPAD', 'SUCCESS RATE']}
          />
          <div className='chartContainer' id='launchCharts'>
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
      ) : (
        ''
      )}
    </>
  );
}
