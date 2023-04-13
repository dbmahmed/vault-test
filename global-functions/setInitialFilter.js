import React from 'react';

const setInitialFilter = Variables => {
  setMemoizedFilters({
    members: { $in: [Variables.USER.id] },
    type: 'messaging',
  });
};

export default setInitialFilter;
