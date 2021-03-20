export const successRateFormatter = (data) => {
  const lineOptions = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: 'white', // this here
          },
          scaleLabel: {
            display: true,
            labelString: 'Launch Number',
            fontColor: 'white',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: 'white',
          },
          ticks: {
            fontColor: 'white',
          },
          scaleLabel: {
            display: true,
            labelString: 'Success Percentage',
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
    spanGaps: true,
  };

  const pastLaunches = data.filter((item) => !item.upcoming);
  

  const yearLabels = pastLaunches.map((item) => item.flight_number);

  let percentagesArray = [];
  let successCount = 0;

  let falcon9SuccessArray = new Array(pastLaunches.length).fill(NaN);
  let falcon9SuccesssCount = 0;
  let falcon9FlightNumber = 0;

  let falconHeavySuccessArray = new Array(pastLaunches.length).fill(NaN);
  let falconHeavySuccessCount = 0;
  let falconHeavyFlightNumber = 0;

  pastLaunches.forEach((element, index) => {
    if (element.success) {
      successCount++;
      percentagesArray.push(
        Math.round((successCount / (index + 1)) * 100 * 10) / 10
      );
    } else {
      percentagesArray.push(
        Math.round((successCount / (index + 1)) * 100 * 10) / 10
      );
    }
    if(element.rocket.name === 'Falcon 9'){
        falcon9FlightNumber ++;
        if(element.success){
            falcon9SuccesssCount++;
            falcon9SuccessArray[index] =
              Math.round((falcon9SuccesssCount / (falcon9FlightNumber)) * 100 * 10) / 10;
        } else {
            falcon9SuccessArray[index] =
              Math.round((falcon9SuccesssCount / (falcon9FlightNumber)) * 100 * 10) / 10;
        }
    }
    if (element.rocket.name === 'Falcon Heavy') {
      falconHeavyFlightNumber++;
      if (element.success) {
        falconHeavySuccessCount++;
        falconHeavySuccessArray[index] =
          Math.round((falconHeavySuccessCount / falconHeavyFlightNumber) * 100 * 10) /
          10;
      } else {
        falconHeavySuccessArray[index] =
          Math.round((falconHeavySuccessCount / falconHeavyFlightNumber) * 100 * 10) /
          10;
      }
    }
  });


  const formattedSuccessData = {
    labels: yearLabels,
    datasets: [
      {
        label: 'All Launches',
        backgroundColor: '#0000FF',
        borderColor: '#0000FF',
        fill: false,
        showLine: true,
        data: percentagesArray,
      },
      {
        label: 'Falcon 9',
        backgroundColor: '#9D02D7',
        borderColor: '#9D02D7',
        fill: false,
        showLine: true,
        data: falcon9SuccessArray,
      },
      {
        label: 'Falcon Heavy',
        backgroundColor: '#EA5F94',
        borderColor: '#EA5F94',
        fill: false,
        showLine: true,
        data: falconHeavySuccessArray,
      },
    ],
  };
  return { formattedSuccessData, lineOptions };
};
