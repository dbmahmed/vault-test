import React from 'react';

const lineSyntax = x => {
  if (x == null) {
    return '';
  } else if (x <= 0) {
    return x + ' ';
  } else if (x > 0) {
    return '+' + x + ' ';
  }
};

export default lineSyntax;
