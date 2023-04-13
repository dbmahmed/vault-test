import React from 'react';

const propositionUncommonDisplay = x => {
  if (x == null) {
    return '';
  } else if (x === 'spread') {
    return '';
  } else if (x === 'total') {
    return '';
  } else if (x === 'moneyline') {
    return '';
  } else if (x === 'method of result') {
    return '';
  } else {
    return x.charAt(0).toUpperCase() + x.slice(1) + ' ';
  }
};

export default propositionUncommonDisplay;
