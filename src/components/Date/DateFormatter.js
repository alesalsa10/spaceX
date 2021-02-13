import React, { useEffect, useState } from 'react';
import './Date.css';

export default function DateFormatter({ end }) {
  const [remainingTime, setRemainingtime] = useState();
  let future = new Date(end);

  const calculateTimeLeft = (futureTime) => {
    let timeNow = new Date(Date.now());
    let delta = Math.abs(futureTime - timeNow) / 1000;
    // calculate (and subtract) whole days
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;
    // calculate (and subtract) whole hours
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    // calculate (and subtract) whole minutes
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    // what's left is seconds
    let seconds = Math.round(delta % 60);
    return { days, hours, minutes, seconds };
  };

  const formatTime = (timeObject) => {
    let { days, hours, minutes, seconds } = timeObject;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    } else {
      seconds = `${seconds}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    } else {
      minutes = `${minutes}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    } else {
      hours = `${hours}`;
    }
    if (days < 10) {
      days = `0${days}`;
    } else {
      days = `${days}`;
    }
    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingtime(formatTime(calculateTimeLeft(future)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='dateContainer'>
        <div className='timeParts'>
          <div className='header'>
            <p>DAYS</p>
          </div>
          <div className='time'>
            <div className='part'>
              <h1 className='number'>
                {remainingTime !== undefined ? remainingTime.days.charAt(0) : 0}
              </h1>
            </div>
            <div className='part'>
              <h1 className='number'>
                {remainingTime !== undefined ? remainingTime.days.charAt(1) : 0}
              </h1>
            </div>
          </div>
        </div>
        <div className='timeParts'>
          <div className='header'>
            <p>HOURS</p>
          </div>
          <div className='time'>
            <div className='part'>
              <h1 className='number'>
                {remainingTime !== undefined
                  ? remainingTime.hours.charAt(0)
                  : 0}
              </h1>
            </div>
            <div className='part'>
              <h1 className='number'>
                {remainingTime !== undefined
                  ? remainingTime.hours.charAt(1)
                  : 0}
              </h1>
            </div>
          </div>
        </div>
        <div className='timeParts'>
          <div className='header'>
            <p>MINS</p>
          </div>
          <div className='time'>
            <div className='part'>
              <h1 className='number'>
                {remainingTime !== undefined
                  ? remainingTime.minutes.charAt(0)
                  : 0}
              </h1>
            </div>
            <div className='part'>
              <h1 className='number'>
                {remainingTime !== undefined
                  ? remainingTime.minutes.charAt(1)
                  : 0}
              </h1>
            </div>
          </div>
        </div>
        <div className='timeParts'>
          <div className='header'>
            <p>SECS</p>
          </div>
          <div className='time'>
            <div className='part'>
              <h1 className='number'>
                {remainingTime !== undefined
                  ? remainingTime.seconds.charAt(0)
                  : 0}
              </h1>
            </div>
            <div className='part'>
              <h1 className='number'>
                {remainingTime !== undefined
                  ? remainingTime.seconds.charAt(1)
                  : 0}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
