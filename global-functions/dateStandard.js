import React from 'react';

const dateStandard = x => {
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(x);
  let str = month[date.getMonth()] + ' ' + date.getDate();
  if (date.getFullYear() === new Date().getFullYear()) {
    str = str;
  } else {
    str = str + ', ' + date.getFullYear();
  }
  return str;
};

export default dateStandard;
