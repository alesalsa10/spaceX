export const getMostLaunches = (data) => {
  let reusedCoresArray = [];
  let dataWithoutUpcoming = data.filter((launch) => !launch.upcoming);

  for (let i = 0; i < dataWithoutUpcoming.length; i++) {
    for (let j = 0; j < dataWithoutUpcoming[i].cores.length; j++) {
      if (
        dataWithoutUpcoming[i].cores[j].reused &&
        dataWithoutUpcoming[i].cores[j].core.serial !== null &&
        dataWithoutUpcoming[i].cores[j].core.reuse_count > 1
      ) {
        reusedCoresArray.push({
          serial: dataWithoutUpcoming[i].cores[j].core.serial,
          reuse_count: dataWithoutUpcoming[i].cores[j].core.reuse_count,
        });
      }
    }
  }

  const uniqueBoosters = Array.from(
    new Set(reusedCoresArray.map((a) => a.serial))
  ).map((serial) => {
    return reusedCoresArray.find((a) => a.serial === serial);
  });

  uniqueBoosters.sort((a, b) => b.reuse_count - a.reuse_count);

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
          scaleLabel: {
            display: true,
            labelString: 'Core Serial',
            fontColor: 'white',
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
          scaleLabel: {
            display: true,
            labelString: 'Number Of Launches',
            fontColor: 'white',
          },
        },
      ],
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: 'white',
      },
    },
  };

  let labels = uniqueBoosters.map(({ serial }) => serial);
  let firstEight = labels.slice(0, 8);


  const formattedData = {
    labels: firstEight,
    datasets: [
      {
        label: labels[0],
        backgroundColor: '#003f5c',
        data: [uniqueBoosters[0].reuse_count, 0, 0,0,0,0,0,0],
      },
      {
        label: labels[1],
        backgroundColor: '#2f4b7c',
        data: [0,uniqueBoosters[1].reuse_count, 0,0,0,0,0,0],
      },
      {
        label: labels[2],
        backgroundColor: '#665191',
        data: [0,0,uniqueBoosters[2].reuse_count,0,0,0,0,0],
      },
      {
        label: labels[3],
        backgroundColor: '#a05195',
        data: [0,0,0,uniqueBoosters[3].reuse_count,0,0,0,0],
      },
      {
        label: labels[4],
        backgroundColor: '#d45087',
        data: [0,0,0,0,uniqueBoosters[4].reuse_count,0,0,0],
      },
      {
        label: labels[5],
        backgroundColor: '#d45087',
        data: [0,0,0,0,0,uniqueBoosters[5].reuse_count,0,0],
      },
      {
        label: labels[6],
        backgroundColor: '#ff7c43',
        data: [0,0,0,0,0,0,uniqueBoosters[6].reuse_count,0],
      },
      {
        label: labels[7],
        backgroundColor: '#ffa600',
        data: [0,0,0,0,0,0,0,uniqueBoosters[7].reuse_count],
      },
    ],
  };
  return {formattedData, options}
};
