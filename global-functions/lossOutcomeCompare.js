import React from 'react';

const lossOutcomeCompare = x => {
  return x === 'loss' || x === 'halfloss';
};

export default lossOutcomeCompare;
