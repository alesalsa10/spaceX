export const formatFairingRecovery = (data) => {
  let years = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].fairings && data[i].fairings.recovery_attempt) {
      if (!years.includes(new Date(data[i].date_local).getFullYear())) {
        years.push(new Date(data[i].date_local).getFullYear());
      }
    }
  }

  const formattedFairingsRecovery = {
    labels: years,
    datasets: [
      {
        label: 'Success',
        backgroundColor: '#444e86',
        data: years.map((year) =>
          data.filter(
            (launch) =>
              new Date(launch.date_local).getFullYear() === year &&
              launch.fairings &&
              launch.fairings.recovery_attempt &&
              launch.fairings.recovered
          ).length
        ),
      },
      {
        label: 'Failure',
        backgroundColor: '#003f5c',
        data: years.map((year) =>
          data.filter(
            (launch) =>
              new Date(launch.date_local).getFullYear() === year &&
              launch.fairings &&
              launch.fairings.recovery_attempt &&
              !launch.fairings.recovered
          ).length
        ),
      },
    ],
  };
  return formattedFairingsRecovery;
};
