import './VehicleModalContainer.css';
import React from 'react';
import Modal from 'react-modal';
import Loader from 'react-loader-spinner';

export default function VehicleModalContainer({modalIsOpen, closeModal, videoId, rocketId}) {

    const customStyles = {
      content: {
        top: '170px',
        left: '0',
        right: '0',
        bottom: '0',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '900px',
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
          className='vehicleModal'
        >
          <>
            {videoId === undefined || rocketId === undefined ? (
              <div className='spinner'>
                <Loader
                  type='TailSpin'
                  color='#005288'
                  height={100}
                  width={100}
                />
              </div>
            ) : (
              <div className='iframeContainer'>
                <iframe
                  title='Mission video'
                  className='embebedVideo'
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                ></iframe>
              </div>
            )}
          </>
        </Modal>
      </>
    );
}
