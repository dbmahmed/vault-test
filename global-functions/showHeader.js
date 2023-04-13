import React from 'react';

const showHeader = () => {
  return !(Variables?.CHANNEL || Variables?.THREAD);
};

export default showHeader;
