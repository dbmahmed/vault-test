import React from 'react';

const selectMember = memId => {
  if (newGroupMembers.includes(memId))
    setNewGroupMembers(prev => prev.filter(item => item !== memId));
  else setNewGroupMembers(prev => [...prev, memId]);
};

export default selectMember;
