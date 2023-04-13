import React from 'react';

const isChannelCreateable = () => {
  return newChannelName.length > 0 && newGroupMembers.length > 1;
};

export default isChannelCreateable;
