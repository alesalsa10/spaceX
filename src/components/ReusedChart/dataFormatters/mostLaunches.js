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

  console.log(uniqueBoosters);

  const options = {
    scales: {
      xAxes: [
        {
          stacked: false,
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: 'white',
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
          stacked: false,
          gridLines: {
            display: true,
            color: 'white',
          },
          ticks: {
            fontColor: 'white',
          },
          scaleLabel: {
            display: false,
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
        data: uniqueBoosters[0].reuse_count,
      },
      {
        label: labels[1],
        backgroundColor: '#2f4b7c',
        data: uniqueBoosters[1].reuse_count,
      },
      {
        label: labels[2],
        backgroundColor: '#665191',
        data: uniqueBoosters[2].reuse_count,
      },
      {
        label: labels[3],
        backgroundColor: '#a05195',
        data: uniqueBoosters[3].reuse_count,
      },
      {
        label: labels[4],
        backgroundColor: '#d45087',
        data: uniqueBoosters[4].reuse_count,
      },
      {
        label: labels[5],
        backgroundColor: '#d45087',
        data: uniqueBoosters[5].reuse_count,
      },
      {
        label: labels[6],
        backgroundColor: '#ff7c43',
        data: uniqueBoosters[6].reuse_count,
      },
      {
        label: labels[7],
        backgroundColor: '#ffa600',
        data: uniqueBoosters[7].reuse_count,
      },
    ],
  };
  return {formattedData, options}
};
