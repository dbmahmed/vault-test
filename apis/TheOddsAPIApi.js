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

export const oddsGETStatusAndText = (Constants, { markets, sport }) =>
  fetch(
    `https://api.the-odds-api.com/v4/sports/${
      sport ?? ''
    }/odds/?apiKey=bc7378be9253a4bfe619c3ae3aa45462&markets=${
      markets ?? ''
    }&oddsFormat=american&regions=us`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-requests-remaining': Constants['x_requests_remaining'],
        'x-requests-used': Constants['x_requests_used'],
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const oddsGET = (Constants, { markets, sport }) =>
  oddsGETStatusAndText(Constants, { markets, sport }).then(
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

export const useOddsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['ids', args], () => oddsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchOddsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  markets,
  sport,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useOddsGET(
    { markets, sport },
    { refetchInterval }
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

  return children({ loading, data, error, refetchOdds: refetch });
};
