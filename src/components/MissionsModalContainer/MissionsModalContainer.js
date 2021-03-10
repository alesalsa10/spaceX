import './MissionsModalContainer.css';
import React from 'react';
import Modal from 'react-modal';
import Button from '../Button/Button';
import Loader from 'react-loader-spinner';

export default function MissionsModalContainer({
  modalIsOpen,
  closeModal,
  launchInfo,
  modalPageNumber,
  modalSlide,
  options,
  handleModalArrowClicks,
  handleModalCircleClick,
}) {
  const customStyles = {
    content: {
      top: '150px',
      left: '0',
      right: '0',
      bottom: '0',
      marginRight: 'auto',
      marginLeft: 'auto',
      width: '600px',
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
    </>
  );
}
