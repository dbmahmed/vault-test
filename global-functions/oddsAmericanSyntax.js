import React from 'react';

const oddsAmericanSyntax = x => {
  if (x == null) {
    return '';
  } else if (x < 0) {
    return '(' + x + ') ';
  } else {
    return '(+' + x + ') ';
  }
};

export default oddsAmericanSyntax;
