import React from 'react';

const applyUserFilter = query => {
  setFilteredUsers(() =>
    users.filter(prev => {
      // console.log(prev.toLowerCase().includes(query.toLowerCase()))

      return !query || prev.id.toLowerCase().includes(query.toLowerCase());
    })
  );
};

export default applyUserFilter;
