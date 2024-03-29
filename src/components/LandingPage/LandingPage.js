import React, { useEffect, useState } from 'react';
import {
  fetchUpcomingMission,
  getLaunchSiteInfo,
  getPayLoadInfo,
} from '../../Data/fetchData';
import './LandingPage.css';
import Button from '../Button/Button';
import DateFormatter from '../Date/DateFormatter';

export default function LandingPage() {
  const [nextMissionInfo, setNextMissionInfo] = useState();
  const [showMore, setShowMore] = useState(false);
  const [launchPadName, setLaunchPadName] = useState();
  const [payloadName, setPayloadName] = useState();
  const [payloadType, setPayloadtype] = useState();
  const [orbit, setOrbit] = useState();

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    async function fetchnextMissionInfo() {
      const upcomingMission = await fetchUpcomingMission();
      setNextMissionInfo(upcomingMission);
      let launchPadID = await upcomingMission.launchpad;
      const launchSite = await getLaunchSiteInfo(launchPadID);
      let name = await launchSite.name.toUpperCase();
      setLaunchPadName(name);

      let payloadsID = await upcomingMission.payloads;
      const payLoadInfo = await getPayLoadInfo(payloadsID);

      let loadName = payLoadInfo.name.toString().toUpperCase();
      setPayloadName(loadName);

      let type = payLoadInfo.type.toString().toUpperCase();
      setPayloadtype(type);

      let OrbitInfo = await payLoadInfo.regime.toUpperCase();
      setOrbit(OrbitInfo);
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
              <h1 className='missionName'>
                {nextMissionInfo.name.toUpperCase()}
              </h1>
              <Button
                text={showMore ? 'CLOSE' : 'SEE MORE'}
                onClick={handleShowMore}
                color={'blue'}
                id='home'
              />
            </div>
            <div className='timeToMission'>
              <DateFormatter end={nextMissionInfo.date_utc} />
            </div>
          </div>
          <div
            className={`${'missionInfoContainer'}  ${
              showMore ? 'activeInfoContainer ' : 'notActiveInfoContainer'
            }`}
          >
            <div className='leftColumn'>
              <h2 className='leftColumnMissionMame'>
                {nextMissionInfo.name.toUpperCase()}
              </h2>
              <p className='missionDetails'>
                {nextMissionInfo.details
                  ? nextMissionInfo.details
                  : 'Check back later for more details'}
              </p>
            </div>
            <div className='rightColumn'>
              <div className='infoRow first'>
                <div className='title'>
                  <h4>SCHEDULED LAUNCH</h4>
                </div>
                <div className='nextMissionInfo'>
                  <h4>
                    {new Date(nextMissionInfo.date_utc)
                      .toLocaleDateString('default', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                      .toUpperCase()}
                  </h4>
                </div>
              </div>
              <div className='infoRow'>
                <div className='title'>
                  <h4>LAUNCH SITE</h4>
                </div>
                <div className='nextMissionInfo'>
                  <h4> {launchPadName} </h4>
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
                  <h4>PAYLOAD NAME</h4>
                </div>
                <div className='nextMissionInfo'>
                  <h4>{payloadName}</h4>
                </div>
              </div>
              <div className='infoRow'>
                <div className='title'>
                  <h4>PAYLOAD TYPE</h4>{' '}
                </div>
                <div className='nextMissionInfo'>
                  <h4>{payloadType}</h4>
                </div>
              </div>
              <div className='infoRow'>
                <div className='title'>
                  <h4>PAYLOAD ORBIT</h4>{' '}
                </div>
                <div className='nextMissionInfo'>
                  <h4>{orbit}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
