import axios from 'axios';

export const fetchUpcomingMission = async () => {
    try{
        const response = await axios.get(
          'https://api.spacexdata.com/v4/launches/next'
        );
        return (response.data)
    } catch (error){
        console.log(error)
    }
}