import './StarLink.css';
import React from 'react';
import ReactGlobe from 'react-globe';

export default function StarLink() {
  return (
    <>
      <ReactGlobe
        height='100vh'
        width='100vw'
        globeTexture='https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg'
        initialCameraDistanceRadiusScale={4}
        globeCloudsTexture={null}
        options={{
          
        }}
      />
    </>
  );
}
