import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import usePrevious from '../utils/usePrevious';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const cFBPreGameOddsGETStatusAndText = (Constants, { week, year }) =>
  fetch(
    `https://api.sportsdata.io/v3/cfb/odds/json/GameOddsByWeek/${year ?? ''}/${
      week ?? ''
    }?key=ae7cecf309454e318d82d98ca5e3e3c9`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const cFBPreGameOddsGET = (Constants, { week, year }) =>
  cFBPreGameOddsGETStatusAndText(Constants, { week, year }).then(
    ({ status, statusText, text }) => {
      if (status < 200 || status > 299) {
        console.error(`Fetch error: ${status} ${statusText}: ${text}`);
        return undefined;
      }

      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useCFBPreGameOddsGET = ({ week, year }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://api.sportsdata.io/v3/cfb/odds/json/GameOddsByWeek/${year ?? ''}/${
      week ?? ''
    }?key=ae7cecf309454e318d82d98ca5e3e3c9`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchCFBPreGameOddsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  week,
  year,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `https://api.sportsdata.io/v3/cfb/odds/json/GameOddsByWeek/${year ?? ''}/${
      week ?? ''
    }?key=ae7cecf309454e318d82d98ca5e3e3c9`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchCFBPreGameOdds: refetch });
};

export const nBAPreGameOddsGETStatusAndText = (Constants, { date }) =>
  fetch(
    `https://api.sportsdata.io/v3/nba/odds/json/GameOddsByDate/${
      date ?? ''
    }?key=cea45d1a2e594c0aae5d30fa8ea65c30`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const nBAPreGameOddsGET = (Constants, { date }) =>
  nBAPreGameOddsGETStatusAndText(Constants, { date }).then(
    ({ status, statusText, text }) => {
      if (status < 200 || status > 299) {
        console.error(`Fetch error: ${status} ${statusText}: ${text}`);
        return undefined;
      }

      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useNBAPreGameOddsGET = ({ date }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://api.sportsdata.io/v3/nba/odds/json/GameOddsByDate/${
      date ?? ''
    }?key=cea45d1a2e594c0aae5d30fa8ea65c30`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchNBAPreGameOddsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  date,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `https://api.sportsdata.io/v3/nba/odds/json/GameOddsByDate/${
      date ?? ''
    }?key=cea45d1a2e594c0aae5d30fa8ea65c30`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchNBAPreGameOdds: refetch });
};

export const nFLPreGameOddsGETStatusAndText = (Constants, { week, year }) =>
  fetch(
    `https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/${year ?? ''}/${
      week ?? ''
    }?key=5908a264258b489fb9a1108da36db549`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const nFLPreGameOddsGET = (Constants, { week, year }) =>
  nFLPreGameOddsGETStatusAndText(Constants, { week, year }).then(
    ({ status, statusText, text }) => {
      if (status < 200 || status > 299) {
        console.error(`Fetch error: ${status} ${statusText}: ${text}`);
        return undefined;
      }

      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useNFLPreGameOddsGET = ({ week, year }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/${year ?? ''}/${
      week ?? ''
    }?key=5908a264258b489fb9a1108da36db549`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchNFLPreGameOddsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  week,
  year,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/${year ?? ''}/${
      week ?? ''
    }?key=5908a264258b489fb9a1108da36db549`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchNFLPreGameOdds: refetch });
};
