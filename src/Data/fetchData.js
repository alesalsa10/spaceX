import axios from 'axios';

const baseURL = 'https://api.spacexdata.com/v4';

export const fetchUpcomingMission = async () => {
  try {
    const response = await axios.get(`${baseURL}/launches/next`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLaunchSiteInfo = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/launchpads/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPayLoadInfo = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/payloads/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllRocketOrDragons = async (vehicle) => {
  try {
    const response = await axios.get(`${baseURL}/${vehicle}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRocketOrDragonByID = async (vehicle, id) => {
  try {
    const response = await axios.get(`${baseURL}/${vehicle}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDragon2Launches = async () => {
  try {
    const response = await axios.post(`${baseURL}/capsules/query`, {
      query: {
        type: 'Dragon 2.0',
      },
      options: {
        pagination: false,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const numberOfLaunchesByVehicle = async (id) => {
  try {
    const response = await axios.post(`${baseURL}/launches/query`, {
      query: {
        rocket: id,
        upcoming: false,
        success: true,
      },
      options: {},
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLaunchByDate = async (id, order) => {
  //asc, desc
  try {
    const response = await axios.post(`${baseURL}/launches/query`, {
      query: {
        rocket: id,
        success: true,
        upcoming: false,
      },
      options: { limit: 1, sort: { date_unix: order } },
    });
    return response.data.docs[0].links.youtube_id;
  } catch (error) {
    console.log(error);
  }
};

export const getLaunchById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/launches/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllRockets = async () => {
  try {
    let rocketNames = [];
    const response = await axios.get(`${baseURL}/rockets`);
    response.data.forEach((rocket) => {
      rocketNames.push({ name: rocket.name, id: rocket.id });
    });
    return rocketNames;
  } catch (error) {
    console.log(error);
  }
};

export const getAllLaunchpads = async () => {
  try {
    let launchPadArray = [];
    const response = await axios.get(`${baseURL}/launchpads`);
    response.data.forEach((launchpad) => {
      launchPadArray.push({ name: launchpad.name, id: launchpad.id });
    });
    return launchPadArray;
  } catch (error) {
    console.log(error);
  }
};

export const getAllLaunches = async () => {
  try {
    const response = await axios.post(`${baseURL}/launches/query`, {
      query: {
        upcoming: false,
      },
      options: { 
        pagination: false 
      },
    });
    return response.data.docs;
  } catch (error) {
    console.log(error);
  }
};
