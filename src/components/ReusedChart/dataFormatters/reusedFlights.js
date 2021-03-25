export const reusedFlights = (data) => {
  let dataWithoutUpcoming = data.filter((launch) => !launch.upcoming);

  let reusedCount = 0;
  dataWithoutUpcoming.forEach((item) => {
    item.cores.forEach((core) => {
      if (core.flight > 1) {
        reusedCount++;
      }
    });
  });
  return reusedCount;
};
