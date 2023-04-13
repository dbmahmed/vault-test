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

export const savedPropertiesGETStatusAndText = (Constants, { limit }) =>
  fetch(
    `https://example-data.draftbit.com/properties_saved/?_expand=properties&_limit=${
      limit ?? ''
    }&userId=1`,
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

export const savedPropertiesGET = (Constants, { limit }) =>
  savedPropertiesGETStatusAndText(Constants, { limit }).then(
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

export const useSavedPropertiesGET = ({ limit }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://example-data.draftbit.com/properties_saved/?_expand=properties&_limit=${
      limit ?? ''
    }&userId=1`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchSavedPropertiesGET = ({
  children,
  onData = () => {},
  refetchInterval,
  limit,
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
    `https://example-data.draftbit.com/properties_saved/?_expand=properties&_limit=${
      limit ?? ''
    }&userId=1`,
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

  return children({ loading, data, error, refetchSavedProperties: refetch });
};
