import React from 'react';

const segmentExists = x => {
  return x == null ? '' : '(' + x + ') ';
};

export default segmentExists;
