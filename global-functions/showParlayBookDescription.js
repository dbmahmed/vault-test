import React from 'react';

const showParlayBookDescription = x => {
  if (
    (x.propDetails == null ||
      (x.propDetails.player == null &&
        x.propDetails.team == null &&
        x.propDetails.future == null &&
        x.propDetails.metricSpecial == null)) &&
    (x.proposition == null ||
      x.proposition == 'spread' ||
      x.proposition == 'total' ||
      x.proposition == 'moneyline' ||
      x.proposition == 'method of result') &&
    x.position == null &&
    x.line == null &&
    x.segment == null
  ) {
    if (x.bookDescription.slice(-2) == '; ') {
      desc = x.bookDescription.slice(0, -2) + ' ';
    } else if (
      x.bookDescription.slice(-1) == ';' ||
      x.bookDescription.slice(-1) == ' '
    ) {
      desc = x.bookDescription.slice(0, -1) + ' ';
    } else {
      desc = x.bookDescription + ' ';
    }

    str = desc.indexOf(' - ');
    return str > 0 ? desc.substring(str + 3) : desc;
  } else {
    return '';
  }
};

export default showParlayBookDescription;
