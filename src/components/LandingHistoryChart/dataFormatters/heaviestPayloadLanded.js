export const getHeaviestLanded = (data) => {
  let heaviest = 0;
  let missionName;
  for (let i = 0; i < data.length; i++) {
    if (data[i].cores[0].landing_success) {
      let currentWeight = 0;
      for (let j = 0; j < data[i].payloads.length; j++) {
        currentWeight += data[i].payloads[j].mass_kg;
        if (currentWeight > heaviest) {
          heaviest = currentWeight;
          missionName = data[i].name
        }
      }
    }
  }
  let heaviestObj = {heaviest, missionName}
  return heaviestObj;
};
