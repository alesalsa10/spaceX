export const pieChartDataFormatter = (data, allRockets) => {
  const options = {
    scales: {
      maintainAspectRatio: false,
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: 'white',
      },
    },
  };

  let dataSetData = [];
  dataSetData.push(
    data.filter(
      (launch) => launch.rocket.name === 'Falcon 1' && !launch.upcoming
    ).length
  );
  dataSetData.push(
    data.filter(
      (launch) => launch.rocket.name === 'Falcon 9' && !launch.upcoming
    ).length
  );
  dataSetData.push(
    data.filter(
      (launch) => launch.rocket.name === 'Falcon Heavy' && !launch.upcoming
    ).length
  );

  console.log(dataSetData)

  const formattedData = {
    labels: allRockets,
    datasets: [
      {
        
        backgroundColor: ['#003f5c', '#444e86', '#955196'],
        data: dataSetData
      },
    ],
  };
  return { formattedData, options };
};
