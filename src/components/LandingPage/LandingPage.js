import React, { useEffect, useState } from 'react';
import { fetchUpcomingMission, getLaunchSiteInfo } from '../../Data/fetchData';
import './LandingPage.css';
import Button from '../Button/Button';
import DateFormatter from '../Date/DateFormatter';

export default function LandingPage() {
  const [nextMissionInfo, setNextMissionInfo] = useState();
  const [showMore, setShowMore] = useState(false);
  const [launchPadName, setLaunchPadName] = useState();

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    async function fetchnextMissionInfo() {
      const upcomingMission = await fetchUpcomingMission();
      console.log(upcomingMission);
      setNextMissionInfo(upcomingMission);
      let launchPadID = await upcomingMission.launchpad;
      const launchSite = await getLaunchSiteInfo(launchPadID);
      let name = await launchSite.name;
      setLaunchPadName(name) ;
    }
    fetchnextMissionInfo();
  }, []);

  return (
    <>
      {nextMissionInfo !== undefined ? (
        <div className='mainMissionContainer'>
          <div
            className={`${'upcomingMissionContainer slide-up-fade-in'} ${
              showMore ? 'activeMore' : 'notActiveMore'
            }`}
          >
            <div className='name'>
              <h3>UPCOMING</h3>
              <h1 className='missionName'>{nextMissionInfo.name.toUpperCase()} MISSION</h1>
              <Button
                text={showMore ? 'CLOSE' : 'SEE MORE'}
                onClick={handleShowMore}
              />
            </div>
            <div className='timeToMission'>
              <DateFormatter end={nextMissionInfo.date_utc} />
            </div>
          </div>
          {/* {showMore ? ( */}
          <div
            className={`${'missionInfoContainer'}  ${
              showMore
                ? 'activeInfoContainer '
                : 'notActiveInfoContainer'
            }`}
          >
            <div className='leftColumn'>
              <h2>{nextMissionInfo.name.toUpperCase()}</h2>
            </div>
            <div className='rightColumn'>
              <div className='infoRow'>
                <div className='title'>
                  <h4>SCHEDULED LAUNCH</h4>
                </div>
                <div className='nextMissionInfo'>
                  <h4>
                    {new Date(nextMissionInfo.date_utc).toLocaleDateString('default', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </h4>
                </div>
              </div>
              <div className='infoRow'>
                <div className='title'>
                  <h4>LAUNCH SITE</h4>
                </div>
                <div className='nextMissionInfo'>
                  <h4> {launchPadName ? launchPadName : 0} </h4>
                </div>
              </div>
              <div className='infoRow'>
                <div className='title'>
                  <h4>FLIGHT NUMBER</h4>
                </div>
                <div className='nextMissionInfo'>
                  <h4>{nextMissionInfo.flight_number}</h4>
                </div>
              </div>
              <div className='infoRow'>
                <div className='title'>
                  <h4>REUSED</h4>
                </div>
                <div className='nextMissionInfo'>
                  <h4>2</h4>
                </div>
              </div>
              <div className='infoRow'>
                <div className='title'>
                  <h4>PAYLOAD ORBIT</h4>{' '}
                </div>
                <div className='nextMissionInfo'>
                  <h4>2</h4>
                </div>
              </div>
              <div className='infoRow'>
                <div className='title'>
                  <h4>LANDING SITE</h4>{' '}
                </div>
                <div className='nextMissionInfo'>
                  <h4>2</h4>
                </div>
              </div>
            </div>
          </div>
          {/* ) : ( */}
          ''
          {/* )} */}
        </div>
      ) : (
        ''
      )}
    </>
  );
}
