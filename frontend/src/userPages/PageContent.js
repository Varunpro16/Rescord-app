// src/PageContent.js
import React from 'react';
import ShowMap from './ShowMap';
import Chat from './Chat';
import Description from './Description';

const PageContent = ({ selectedHeading, peopleLocation, userId}) => {
console.log("pagecontent: ",peopleLocation);
  return (
    <div className="page-content">
      {selectedHeading === 'Map' && 
        <ShowMap peopleLocation={peopleLocation}/>
      }
      {selectedHeading === 'Description' && (
        <Description/>
      )}
      {selectedHeading === 'Chat' && 
        <Chat user={userId}/>
      }
    </div>
  );
};

export default PageContent;
