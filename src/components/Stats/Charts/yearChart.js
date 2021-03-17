export const chartDataFormatter = (data, years) => {
  const options = {
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: 'white', // this here
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: true,
            color: 'white',
          },
          ticks: {
            fontColor: 'white',
          },
        },
      ],
      maintainAspectRatio: false,
    },
    legend: {
      display: true,
      position: 'bottom',
    },
    
  };

  const formattedData = {
    labels: years,
    datasets: [
      {
        label: 'Falcon 1',
        backgroundColor: '#003f5c',
        data: years.map(
          (year) =>
            data.filter(
              (launch) =>
                new Date(launch.date_local).getFullYear() === year &&
                launch.rocket.name === 'Falcon 1' &&
                launch.upcoming === false &&
                launch.success
            ).length
        ),
      },
      {
        label: 'New Falcon 9',
        backgroundColor: '#444e86',
        data: years.map(
          (year) =>
            data.filter(
              (launch) =>
                new Date(launch.date_local).getFullYear() === year &&
                launch.rocket.name === 'Falcon 9' &&
                launch.upcoming === false &&
                !launch.cores[0].reused &&
                launch.success
            ).length
        ),
      },
      {
        label: 'Reused Falcon 9',
        backgroundColor: '#955196',
        data: years.map(
          (year) =>
            data.filter(
              (launch) =>
                new Date(launch.date_local).getFullYear() === year &&
                launch.rocket.name === 'Falcon 9' &&
                launch.upcoming === false &&
                launch.cores[0].reused &&
                launch.success
            ).length
        ),
      },
      {
        label: 'Falcon Heavy',
        backgroundColor: '#dd5182',
        data: years.map(
          (year) =>
            data.filter(
              (launch) =>
                new Date(launch.date_local).getFullYear() === year &&
                launch.rocket.name === 'Falcon Heavy' &&
                launch.upcoming === false &&
                launch.success
            ).length
        ),
      },
      {
        label: 'Upcoming',
        backgroundColor: '#ff6e54',
        data: years.map(
          (year) =>
            data.filter(
              (launch) =>
                new Date(launch.date_local).getFullYear() === year &&
                launch.upcoming === true
            ).length
        ),
      },
      {
        label: 'Failure',
        backgroundColor: '#ffa600',
        data: years.map(
          (year) =>
            data.filter(
              (launch) =>
                new Date(launch.date_local).getFullYear() === year &&
                !launch.success &&
                !launch.upcoming
            ).length
        ),
      },
    ],
  };
  return { formattedData, options };
};
