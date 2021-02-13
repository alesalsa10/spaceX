import React, { useEffect, useState } from 'react';
import { fetchUpcomingMission } from '../../Data/fetchData';
import './LandingPage.css';
import Button from '../Button/Button';
import DateFormatter from '../Date/DateFormatter';

export default function LandingPage() {
  const [data, setData] = useState();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUpcomingMission();
      console.log(response);
      setData(response);
    }
    fetchData();
  }, []);

  return (
    <>
      {data !== undefined ? (
        <div className='upcomingMissionContainer slide-up-fade-in'>
          <div className='name'>
            <h3>UPCOMING</h3>
            <h1 className='missionName'>{data.name.toUpperCase()} MISSION</h1>
            <Button text={'MORE'} />
          </div>
          <div className='timeToMission'>
            <DateFormatter end={data.date_utc} />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
