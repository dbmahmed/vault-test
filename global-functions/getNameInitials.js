import React from 'react';

const getNameInitials = name => {
  return name.split(' ').map(part => part[0].toUpperCase());
};

export default getNameInitials;
