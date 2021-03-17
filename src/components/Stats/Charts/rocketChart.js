export const pieChartDataFormatter = (data) => {

  let allRockets = [];
  data.forEach((launch) => {
    if (!allRockets.includes(launch.rocket.name)) {
      allRockets.push(launch.rocket.name);
    }
  });

  const doughnutChartOptions = {
    scales: {
      maintainAspectRatio: true,
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

  const formattedRocketData = {
    labels: allRockets,
    datasets: [
      {
        backgroundColor: ['#003f5c', '#bc5090', '#ffa600'],
        data: dataSetData,
      },
    ],
  };
  return { formattedRocketData, doughnutChartOptions };
};
