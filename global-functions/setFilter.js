import React from 'react';

const setFilter = (Variables, newVal) => {
  if (newVal)
    setMemoizedFilters(prev => ({
      ...prev,
      name: { $autocomplete: newVal },
    }));
  else
    setMemoizedFilters({
      members: { $in: [Variables.USER.id] },
      type: 'messaging',
    });
};

export default setFilter;
