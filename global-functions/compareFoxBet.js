import React from 'react';

const compareFoxBet = x => {
  return (
    x === 'FoxBet' ||
    x === 'Fox Bet' ||
    x === 'Foxbet' ||
    x === 'Fox bet' ||
    x === 'FOXBet' ||
    x === 'FOX Bet' ||
    x === 'FOX bet'
  );
};

export default compareFoxBet;
