import React from 'react';

const getSelectableUsers = (Variables, fetchedUsers) => {
  return fetchedUsers?.filter(item => item?.id !== Variables.USER.id);
};

export default getSelectableUsers;
