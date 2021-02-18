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
