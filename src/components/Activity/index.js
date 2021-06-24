import React from 'react';
import Alphabetical from './Alphabetical';
import Logical from './Logical';
import Pictograms from './Pictograms';

export const ActivityType = {
  ALPHA: 0,
  LOGIC: 1,
  PICTO: 2
};

const Activity = ({ type }) => {
  return (
    <>
      {type === ActivityType.ALPHA && <Alphabetical />}
      {type === ActivityType.LOGIC && <Logical />}
      {type === ActivityType.PICTO && <Pictograms />}
    </>
  );
};

export default Activity;
