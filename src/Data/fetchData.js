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
  try{
    const response = await  axios.get(`${baseURL}/${vehicle}`)
    return response.data
  }catch(error){
    console.log(error)
  }
}

export const getRocketOrDragonByID = async (vehicle, id) => {
  try{
    const response = await axios.get(`${baseURL}/${vehicle}/${id}`);
    return response.data;
  }catch(error){
    console.log(error)
  }
}