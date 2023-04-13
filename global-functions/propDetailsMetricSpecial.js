import React from 'react';

const propDetailsMetricSpecial = x => {
  return x == null ? '' : x.charAt(0).toUpperCase() + x.slice(1) + ' ';
};

export default propDetailsMetricSpecial;
