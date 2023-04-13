import React from 'react';

const atRiskSyntax = x => {
  let res = (Math.abs(x) / 100).toFixed(2);
  let lastIndex = res[res.length - 1];
  let secondLastIndex = res[res.length - 2];
  const comp = lastIndex == 0 && secondLastIndex == 0;
  if (comp) {
    res = parseInt(res);
  }

  if (x < 0) {
    return '-$' + res;
  } else {
    return '$' + res;
  }
};

export default atRiskSyntax;
