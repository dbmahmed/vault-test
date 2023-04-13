import React from 'react';

const segmentLogTrack = (
  segment,
  x,
  gamesOdds,
  betId,
  gamesId,
  gamesAwayTeam,
  gamesSelectedSportsbook,
  gamesLine,
  gamesStartTime,
  gamesBetType,
  gamesLeague,
  gamesHomeTeam,
  gamesTeamBetOn,
  sportsbookId,
  notificationId
) => {
  segment.track(x, {
    gamesOdds,
    gamesId,
    gamesAwayTeam,
    gamesSelectedSportsbook,
    gamesLine,
    gamesStartTime,
    gamesBetType,
    gamesLeague,
    gamesHomeTeam,
    gamesTeamBetOn,
    sportsbookId,
    betId,
    notificationId,
  });
};

export default segmentLogTrack;
