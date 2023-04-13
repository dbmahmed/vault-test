import React from 'react';

const segmentLogIdentify = (
  segment,
  x,
  firstName,
  lastName,
  email,
  phone,
  id,
  username,
  profilePicture,
  unitSize
) => {
  segment.identify(x, {
    id,
    email,
    firstName,
    lastName,
    phone,
    username,
    profilePicture,
    unitSize,
  });
};

export default segmentLogIdentify;
