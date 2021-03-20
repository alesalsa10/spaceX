export const launchpadDataFormatter = (data) => {
  //["Kwajalein Atoll", "CCSFS SLC 40", "VAFB SLC 4E", "KSC LC 39A"]
  let allLaunchpads = [];
  data.forEach((launch) => {
    if (!allLaunchpads.includes(launch.launchpad.name)) {
      allLaunchpads.push(launch.launchpad.name);
    }
  });
  let dataSetData = [];
  dataSetData.push(
    data.filter(
      (launch) =>
        launch.launchpad.name === 'Kwajalein Atoll' && !launch.upcoming
    ).length
  );
  dataSetData.push(
    data.filter(
      (launch) => launch.launchpad.name === 'CCSFS SLC 40' && !launch.upcoming
    ).length
  );
  dataSetData.push(
    data.filter(
      (launch) => launch.launchpad.name === 'VAFB SLC 4E' && !launch.upcoming
    ).length
  );
  dataSetData.push(
    data.filter(
      (launch) => launch.launchpad.name === 'KSC LC 39A' && !launch.upcoming
    ).length
  );
  const formattedLaunchpadData = {
    labels: allLaunchpads,
    datasets: [
      {
        backgroundColor: ['#003f5c', '#7a5195', '#ef5675', '#ffa600'],
        data: dataSetData,
      },
    ],
  };
  return formattedLaunchpadData
}