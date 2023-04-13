import React from 'react';

const pendingOutcomeCompare = x => {
  return x === 'pending' || x == null;
};

export default pendingOutcomeCompare;
