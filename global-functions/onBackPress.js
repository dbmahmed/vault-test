import React from 'react';

const onBackPress = () => {
  if (thread) {
    setThread(undefined);
  } else if (channel) {
    setChannel(undefined);
  }
};

export default onBackPress;
