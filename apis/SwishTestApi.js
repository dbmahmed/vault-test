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

export const mLBPreMatchTest1GETStatusAndText = Constants =>
  fetch(
    `https://api.swishanalytics.com/mlb/matches/betstim/prematch?apikey=test-237ee6dd6ea4610134caf4751f653ff78380a460&date=2022-05-07`,
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

export const mLBPreMatchTest1GET = Constants =>
  mLBPreMatchTest1GETStatusAndText(Constants).then(
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

export const useMLBPreMatchTest1GET = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://api.swishanalytics.com/mlb/matches/betstim/prematch?apikey=test-237ee6dd6ea4610134caf4751f653ff78380a460&date=2022-05-07`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchMLBPreMatchTest1GET = ({
  children,
  onData = () => {},
  refetchInterval,
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
    `https://api.swishanalytics.com/mlb/matches/betstim/prematch?apikey=test-237ee6dd6ea4610134caf4751f653ff78380a460&date=2022-05-07`,
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

  return children({ loading, data, error, refetchMLBPreMatchTest1: refetch });
};

export const nBATest1GETStatusAndText = Constants =>
  fetch(
    `https://api.swishanalytics.com/nba/matches/betstim/prematch?apikey=test-237ee6dd6ea4610134caf4751f653ff78380a460&date=2022-05-07`,
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

export const nBATest1GET = Constants =>
  nBATest1GETStatusAndText(Constants).then(({ status, statusText, text }) => {
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
  });

export const useNBATest1GET = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://api.swishanalytics.com/nba/matches/betstim/prematch?apikey=test-237ee6dd6ea4610134caf4751f653ff78380a460&date=2022-05-07`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchNBATest1GET = ({
  children,
  onData = () => {},
  refetchInterval,
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
    `https://api.swishanalytics.com/nba/matches/betstim/prematch?apikey=test-237ee6dd6ea4610134caf4751f653ff78380a460&date=2022-05-07`,
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

  return children({ loading, data, error, refetchNBATest1: refetch });
};
