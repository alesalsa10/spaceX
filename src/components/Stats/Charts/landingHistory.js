export const formatLandingHistoryData = (data) => {
  //["Failure", "Ocean", "ASDS", "RTLS"]
  let dataWithoutUpcoming = data.filter((launch) => !launch.upcoming);
  let years = [];
  dataWithoutUpcoming.forEach((launch) => {
    if (
      !years.includes(new Date(launch.date_local).getFullYear()) &&
      new Date(launch.date_local).getFullYear() >= 2013
      //2013 was the first launch
    ) {
      years.push(new Date(launch.date_local).getFullYear());
    }
  });


  const landingHistoryData = {
    labels: years,
    datasets: [
      {
        label: 'Failure',
        backgroundColor: '#444e86',
        data: years.map(
          (year) =>
            dataWithoutUpcoming.filter(
              (launch) =>
                new Date(launch.date_local).getFullYear() === year &&
                launch.cores[0].landing_attempt &&
                !launch.cores[0].landing_success
            ).length
        ),
      },
      {
        label: 'Ocean',
        backgroundColor: '#003f5c',
        data: years.map(
          (year) =>
            dataWithoutUpcoming.filter(
              (launch) =>
                new Date(launch.date_local).getFullYear() === year &&
                launch.cores[0].landing_attempt &&
                launch.cores[0].landing_success &&
                launch.cores[0].landing_type === 'Ocean'
            ).length
        ),
      },

      {
        label: 'ASDS',
        backgroundColor: '#955196',
        data: years.map(
          (year) =>
            dataWithoutUpcoming.filter(
              (launch) =>
                new Date(launch.date_local).getFullYear() === year &&
                launch.cores[0].landing_attempt &&
                launch.cores[0].landing_success &&
                launch.cores[0].landing_type === 'ASDS'
            ).length
        ),
      },
      {
        label: 'RTLS',
        backgroundColor: '#dd5182',
        data: years.map(
          (year) =>
            data.filter(
              (launch) =>
                new Date(launch.date_local).getFullYear() === year &&
                launch.cores[0].landing_attempt &&
                launch.cores[0].landing_success &&
                launch.cores[0].landing_type === 'RTLS'
            ).length
        ),
      },
    ],
  };
  
  return landingHistoryData;

};
