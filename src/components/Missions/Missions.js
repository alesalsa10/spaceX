import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import './Missions.css';
import {
  getAllRockets,
  getAllLaunchpads,
  getAllLaunches,
  launchById,
} from '../../Data/fetchData';
import CountUp from 'react-countup';
import Modal from 'react-modal';
import Button from '../Button/Button';

export default function Missions() {
  const [rockets, setRockets] = useState();
  const [launchPads, setLaunchPads] = useState();
  const [launches, setLaunches] = useState('loading');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVehicleFilter, setIsVehicleFilter] = useState(false);
  const [isOutcome, setIsOutcome] = useState(false);
  const [isLaunchSite, setIsLaunchSite] = useState(false);
  const [filterValues, setFilterValues] = useState({
    rocketId: '',
    launchPadId: '',
    outcome: '',
    rocketName: '',
    launchPadName: '',
    outcomeName: '',
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [sliderClass, setSliderClass] = useState(0);
  const [totalLaunches, setTotalLaunches] = useState();
  const [successfulLandings, setSuccessFulLandings] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [launchId, setLaunchId] = useState();
  const [launchInfo, setLaunchInfo] = useState();
  const [modalPageNumber, setModalPageNumer] = useState(1);
  const [modalSlide, setModalSlide] = useState(0);

  const openModal = (e) => {
    setLaunchId(e.currentTarget.id);
    setIsOpen(true);
  };
  const closeModal = () => {
    setModalSlide(0);
    setModalPageNumer(1);
    setLaunchId(undefined);
    setLaunchInfo(undefined);
    setIsOpen(false);
  };

  const handleModalArrowClicks = (e) => {
    setModalSlide('fadeSlide');
    if (modalPageNumber === 1) {
      setModalPageNumer(2);
    } else {
      setModalPageNumer(1);
    }
  };

  const handleModalCircleClick = (e) => {
    setModalSlide('fadeSlide');
    setModalPageNumer(parseInt(e.currentTarget.id));
  };

  const handleOpenFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsVehicleFilter(false);
    setIsOutcome(false);
    setIsLaunchSite(false);
  };

  const handleFilterParameter = (e) => {
    if (e.target.id === 'vehicleFilter') {
      setIsVehicleFilter(!isVehicleFilter);
      setIsLaunchSite(false);
      setIsOutcome(false);
    } else if (e.target.id === 'launchSite') {
      setIsLaunchSite(!isLaunchSite);
      setIsVehicleFilter(false);
      setIsOutcome(false);
    } else if (e.target.id === 'outcome') {
      setIsOutcome(!isOutcome);
      setIsVehicleFilter(false);
      setIsLaunchSite(false);
    }
  };

  const handleFilterSelection = (e) => {
    let id = e.target.id;
    let filterType = e.target.className.split(' ');
    filterType = filterType[1];
    let name = e.currentTarget.innerHTML;

    if (filterType === 'rocket') {
      setFilterValues({
        ...filterValues,
        rocketId: id,
        rocketName: e.currentTarget.innerHTML,
      });
    } else if (filterType === 'launchpad') {
      setFilterValues({
        ...filterValues,
        launchPadId: id,
        launchPadName: name,
      });
    } else if (filterType === 'outcome') {
      let successBoolean = id === 'true' ? true : false;
      setFilterValues({
        ...filterValues,
        outcome: successBoolean,
        outcomeName: name,
      });
    } else {
      setFilterValues({
        rocketId: '',
        launchPadId: '',
        outcome: '',
        rocketName: '',
        launchPadName: '',
        outcomeName: '',
      });
    }
    setLaunches('loading');
    setIsLaunchSite(false);
    setIsVehicleFilter(false);
    setIsOutcome(false);
    setIsFilterOpen(false);
  };

  const splitArrray = (arr) => {
    let newArray = [];
    if (arr.length <= 8) {
      newArray[0] = arr.slice(0, arr.length);
    } else {
      for (let i = 0; i <= arr.length; i += 8) {
        newArray.push(arr.slice(i, i + 8));
      }
    }
    if (newArray[newArray.length - 1].length === 0) {
      newArray.pop();
    }
    return newArray;
  };

  const handleCirclePageClick = (e) => {
    setSliderClass('fadeSlide');
    setPageNumber(parseInt(e.target.id));
  };

  const clearAllfilters = () => {
    setLaunches('loading');
    setFilterValues({
      rocketId: '',
      launchPadId: '',
      outcome: '',
      rocketName: '',
      launchPadName: '',
      outcomeName: '',
    });
  };

  let options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  };

  useEffect(() => {
    async function fetchData() {
      if (launchId !== undefined) {
        const launch = await launchById(launchId);
        setLaunchInfo(launch);
        console.log(launch);
      }
    }
    fetchData();
  }, [launchId]);

  useEffect(() => {
    async function fetchData() {
      const rockets = await getAllRockets();
      setRockets(rockets);

      const launchPads = await getAllLaunchpads();
      setLaunchPads(launchPads);

      const allLaunches = await getAllLaunches(
        filterValues.rocketId,
        filterValues.launchPadId,
        filterValues.outcome
      );
      setTotalLaunches(allLaunches.length);

      let count = 0;
      allLaunches.forEach((item) => {
        item.cores.forEach((core) => {
          if (core.landing_success) {
            count++;
          }
        });
        return count;
      });
      setSuccessFulLandings(count);

      let launches = splitArrray(allLaunches);
      setLaunches(launches);
    }
    fetchData();
  }, [filterValues]);

  const handleNextAndBack = (e) => {
    setSliderClass('fadeSlide');
    let id = e.target.id;
    if (id === 'next') {
      if (pageNumber === launches.length - 1) {
        setPageNumber(0);
      } else {
        setPageNumber(pageNumber + 1);
      }
    } else {
      if (pageNumber === 0) {
        setPageNumber(launches.length - 1);
      } else {
        setPageNumber(pageNumber - 1);
      }
    }
  };

  const customStyles = {
    content: {
      top: '150px',
      left: '0',
      right: '0',
      bottom: '0',
      marginRight: 'auto',
      marginLeft: 'auto',
      width: '600px',
      maxHeight: '100vh',
      overflowY: 'auto',
    },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Video Modal'
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        closeTimeoutMS={500}
        className='missionsModal'
      >
        <>
          {launchInfo === undefined ? (
            <div className='spinner'>
              <Loader
                type='TailSpin'
                color='#005288'
                height={100}
                width={100}
              />
            </div>
          ) : (
            <div className='modalContainer'>
              <div className='headerRow'>
                <div className='leftHeader'>
                  <h3 className='launchName'>
                    {launchInfo[0].name.toUpperCase()}
                  </h3>
                  <h1 className='launchOverview'>OVERVIEW</h1>
                </div>
                <div className='rightHeader'>
                  <img
                    src={launchInfo[0].links.patch.small}
                    alt='patch logo'
                    className='patchLogo'
                  />
                </div>
              </div>
              {modalPageNumber === 1 ? (
                <div
                  className={`${'launchInfoContainer'} ${modalSlide}  `}
                  key={modalSlide}
                >
                  <div className='launchInfoRow'>
                    <div className='launchInfoLeft'>CORE</div>
                    <div className='launchInfoRight'>
                      {launchInfo[0].cores[0].core.block === null
                        ? 'N/A'
                        : 'BLOCK ' + launchInfo[0].cores[0].core.block}
                    </div>
                  </div>
                  <div className='launchInfoRow'>
                    <div className='launchInfoLeft'>CORE SERIAL</div>
                    <div className='launchInfoRight'>
                      {launchInfo[0].cores[0].core.serial.toUpperCase()}
                    </div>
                  </div>
                  <div className='launchInfoRow'>
                    <div className='launchInfoLeft'>REUSED</div>
                    <div className='launchInfoRight'>
                      {launchInfo[0].cores[0].reused.toString().toUpperCase()}
                    </div>
                  </div>
                  <div className='launchInfoRow'>
                    <div className='launchInfoLeft'>STATIC FIRE</div>
                    <div className='launchInfoRight'>
                      {launchInfo[0].static_fire_data_utc !== null ? (
                        <>
                          {new Date(launchInfo[0].static_fire_date_utc)
                            .toLocaleDateString('en-US', options)
                            .toUpperCase()}
                        </>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </div>
                  <div className='launchInfoRow'>
                    <div className='launchInfoLeft'>PAYLOAD ORBIT</div>
                    <div className='launchInfoRight'>
                      {launchInfo[0].payloads.length === 0
                        ? 'N/A'
                        : launchInfo[0].payloads[0].regime.toUpperCase()}
                    </div>
                  </div>
                  <div className='launchInfoRow'>
                    <div className='launchInfoLeft'>LANDING SITE</div>
                    <div className='launchInfoRight'>
                      {launchInfo[0].cores[0].landpad === null ? (
                        'N/A'
                      ) : (
                        <>{launchInfo[0].cores[0].landpad.name}</>
                      )}
                    </div>
                  </div>
                  <div className='launchInfoRow'>
                    <div className='launchInfoLeft'>LANDING SUCCESS</div>
                    <div className='launchInfoRight'>
                      {launchInfo[0].cores[0].landing_success === null ? (
                        'N/A'
                      ) : (
                        <>
                          {launchInfo[0].cores[0].landing_success
                            .toString()
                            .toUpperCase()}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`${'launchInfoContainer'} ${modalSlide} `}>
                  <div className='videoContainer'>
                    <iframe
                      title='Mission video'
                      className='missionVideo'
                      src={`https://www.youtube.com/embed/${launchInfo[0].links.youtube_id}?autoplay=1&mute=1`}
                    ></iframe>
                  </div>
                  <div className='missionButtonsDiv'>
                    <div className='wikipedia'>
                      {launchInfo[0].links.wikipedia !== null ? (
                        <a
                          href={launchInfo[0].links.wikipedia}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Button text='WIKIPEDIA' id='missionsButton' />
                        </a>
                      ) : (
                        <div className='errorDiv'>NO WIKIPEDIA LINK</div>
                      )}
                    </div>
                    <div className='newsArticle'>
                      {launchInfo[0].links.article !== null ? (
                        <a
                          href={launchInfo[0].links.article}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Button text='NEWS ARTICLE' id='missionsButton' />
                        </a>
                      ) : (
                        <div className='errorDiv'>NO NEWS ARTICLE</div>
                      )}
                    </div>
                    <div className='pressKit'>
                      {launchInfo[0].links.presskit !== null ? (
                        <a
                          href={launchInfo[0].links.presskit}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Button text='PRESS KIT' id='missionsButton' />
                        </a>
                      ) : (
                        <div className='errorDiv'>
                          <h3>NO PRESS KIT</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className='nextRow' id='modalNextRow'>
                <div className='item'>
                  <div
                    className='backArrow arrows'
                    onClick={handleModalArrowClicks}
                    id={1}
                  ></div>
                </div>

                <div className='item circlesContainer'>
                  <div
                    className={`${'circle circleLeft'} ${
                      modalPageNumber === 1 ? 'selectedPage' : ''
                    }`}
                    id={1}
                    onClick={handleModalCircleClick}
                  ></div>
                  <div
                    className={`${'circle'} ${
                      modalPageNumber === 2 ? 'selectedPage' : ''
                    } `}
                    id={2}
                    onClick={handleModalArrowClicks}
                  ></div>
                </div>

                <div className='item next'>
                  <div
                    className='nextArrow arrows'
                    onClick={handleModalArrowClicks}
                    id={2}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </>
      </Modal>

      {totalLaunches > 0 &&
      successfulLandings !== undefined &&
      launches !== 'loading' ? (
        <div className='infoHeader'>
          <div className='totalLaunches'>
            <h1 className='infoHeaderValues'>
              <CountUp
                end={totalLaunches}
                duration={2}
                className='numberSpan'
              />
            </h1>
            <h4 className='headerItem'>TOTAL LAUNCHES</h4>
          </div>
          <div className='totalLandings'>
            <h1 className='infoHeaderValues'>
              <CountUp end={successfulLandings} duration={2} />
            </h1>
            <h4 className='headerItem'>SUCCESSFUL LANDINGS</h4>
          </div>
        </div>
      ) : (
        ''
      )}
      <div
        className={`${
          launches === 'loading' ? 'loadingContainer' : 'allMissionsContainer'
        }`}
      >
        {launches === 'loading' ? (
          <div className='spinner'>
            <Loader type='TailSpin' color='#005288' height={100} width={100} />
          </div>
        ) : launches === undefined ||
          launches[0] === undefined ||
          launches[0].length === 0 ? (
          <div className='noResultsFound'>
            <div className='noResultsSubContainer'>
              <h1 className='noResultsHeader'>OH NO!</h1>
              <h4 className='noResultsH5'>
                NO RESULTS WERE FOUND FOR THIS SELECTION.
              </h4>
              <h4 onClick={clearAllfilters} className='clearAndTryAgain'>
                CLEAR FILTERS AND TRY AGAIN.
              </h4>
            </div>
          </div>
        ) : (
          <>
            <div className='filter'>
              <div className='filterButtonDiv'>
                <div className='filterItem'>
                  <Button
                    text={'FILTER'}
                    onClick={handleOpenFilter}
                    className={'button'}
                    color={'blue'}
                  />
                </div>
                {/* <div className='filterItem'> */}
                {filterValues.rocketName !== '' ? (
                  <div className='filterItem'>
                    <h4 className='filterValues'>{filterValues.rocketName}</h4>
                  </div>
                ) : (
                  ''
                )}
                {filterValues.launchPadName !== '' ? (
                  <div className='filterItem'>
                    <h4 className='filterValues'>
                      {filterValues.launchPadName}
                    </h4>
                  </div>
                ) : (
                  ''
                )}

                {filterValues.outcomeName !== '' ? (
                  <div className='filterItem'>
                    <h4 className='filterValues'>
                      {filterValues.outcomeName.toString().toUpperCase()}
                    </h4>
                  </div>
                ) : (
                  ''
                )}
                {/* </div> */}
              </div>
              <div
                style={{
                  height:
                    isFilterOpen && launchPads !== undefined
                      ? `calc(40px * ${launchPads.length + 1})`
                      : '0',
                }}
                className={`${'dropDownItems'} ${
                  isFilterOpen ? 'activeFilter' : 'noneActiveFilter'
                } `}
              >
                <div className='vehicles dropdownContent'>
                  <div className='dropdowLeft'>
                    <h4 id='vehicleFilter' onClick={handleFilterParameter}>
                      VEHICLE
                    </h4>
                  </div>
                  {rockets !== undefined ? (
                    <div
                      style={{
                        height: !isVehicleFilter
                          ? '0'
                          : `calc(40px * ${rockets.length})`,
                      }}
                      className={`${'dropdownRight'} ${
                        isVehicleFilter
                          ? 'activeSelection'
                          : 'nonActiveSelection'
                      } `}
                    >
                      {rockets.map((rocket) => (
                        <h4
                          className={`${'selectionItem'} ${'rocket'} `}
                          key={rocket.id}
                          id={rocket.id}
                          onClick={handleFilterSelection}
                        >
                          {rocket.name}
                        </h4>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='launchSiteDropDown dropdownContent'>
                  <div className='dropdowLeft'>
                    <h4 id='launchSite' onClick={handleFilterParameter}>
                      LAUNCH SITE
                    </h4>
                  </div>
                  {launchPads !== undefined ? (
                    <div
                      style={{
                        height: !isLaunchSite
                          ? '0'
                          : `calc(40px * ${launchPads.length})`,
                      }}
                      className={`${'dropdownRight'} ${
                        isLaunchSite ? 'activeSelection' : 'nonActiveSelection'
                      } `}
                    >
                      {launchPads.map((launchpad) => (
                        <h4
                          className='selectionItem launchpad'
                          key={launchpad.id}
                          id={launchpad.id}
                          onClick={handleFilterSelection}
                        >
                          {launchpad.name.toUpperCase()}
                        </h4>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='outcome dropdownContent'>
                  <div className='dropdowLeft'>
                    <h4 id='outcome' onClick={handleFilterParameter}>
                      OUTCOME
                    </h4>
                  </div>
                  <div
                    id='outcome'
                    className={`${'dropdownRight'} ${
                      isOutcome ? 'activeSelection' : 'nonActiveSelection'
                    } `}
                    style={{
                      height: !isOutcome ? '0' : `80px`,
                    }}
                  >
                    <h4
                      className='selectionItem outcome '
                      onClick={handleFilterSelection}
                      id='true'
                    >
                      SUCCESS
                    </h4>
                    <h4
                      className='selectionItem outcome '
                      onClick={handleFilterSelection}
                      id='false'
                    >
                      FAILURE
                    </h4>
                  </div>
                </div>
                <div className='clearFilter '>
                  <h4 id='clearFilter' onClick={handleFilterSelection}>
                    CLEAR FILTER
                  </h4>
                </div>
              </div>
            </div>
            <div className='mainInfo'>
              <div className='selectorCol'>
                <div className='upArrowContainer'>
                  {launches.length === 1 ? (
                    <div className='upArrow disabledUpArrow' id={'back'}></div>
                  ) : (
                    <div
                      className='upArrow enabledUpArrow'
                      id={'back'}
                      onClick={handleNextAndBack}
                    ></div>
                  )}
                </div>

                <div className='circlesCont'>
                  {launches.map((launch, index) => (
                    <div
                      className={`${'circle'} ${
                        index === pageNumber ? 'selectedPage' : ''
                      } `}
                      key={index}
                      id={index}
                      onClick={handleCirclePageClick}
                    ></div>
                  ))}
                </div>

                <div className='downArrowContainer'>
                  {launches.length === 1 ? (
                    <div
                      className='downArrow disabledDownArrow'
                      id={'next'}
                    ></div>
                  ) : (
                    <div
                      className='downArrow enabledDownArrow'
                      id={'next'}
                      onClick={handleNextAndBack}
                    ></div>
                  )}
                </div>
              </div>
              <div className='information'>
                <div className='missionRowHeader'>
                  <div className='topRowItem'>FLIGHT NO</div>
                  <div className='topRowItem'>VEHICLE</div>
                  <div className='topRowItem'>DATE</div>
                  <div className='topRowItem launchSite '>LAUNCH SITE</div>
                  <div className='topRowItem'>PAYLOAD</div>
                  <div className='topRowItem customer '>CUSTOMER</div>
                  <div className='topRowItem'>OUTCOME</div>
                </div>
                <div className={`${sliderClass}`} key={pageNumber}>
                  {launches[pageNumber] !== undefined ||
                  launches[pageNumber].length !== 0 ? (
                    <>
                      {launches[pageNumber].map((launch, index) => (
                        <div
                          className={` ${'informationRow'} ${
                            index % 2 === 0 ? 'darkItem' : ''
                          }  ${
                            index === launches[pageNumber].length - 1
                              ? 'lastItem'
                              : ''
                          } `}
                          key={index}
                          id={launch.id}
                          onClick={openModal}
                        >
                          <div className='infoItem'>{launch.flight_number}</div>
                          <div className='infoItem'>
                            {launch.rocket.name.toUpperCase()}
                          </div>

                          <div className='infoItem'>
                            {new Date(launch.date_local)
                              .toLocaleDateString('en-US', options)
                              .toUpperCase()}
                          </div>

                          <div className='infoItem launchSite'>
                            {launch.launchpad.name.toUpperCase()}
                          </div>
                          <div className='infoItem'>
                            {launch.name.toUpperCase()}
                          </div>
                          <div className='infoItem customer'>
                            {launch.payloads[0].customers.length !== 0
                              ? launch.payloads[0].customers[0].toUpperCase()
                              : 'NO CUSTOMER AVAILABLE'}
                          </div>
                          <div className='infoItem'>
                            {launch.success === true ? 'SUCCESS' : 'FAILURE'}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
