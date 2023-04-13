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

export const getProductGETStatusAndText = (Constants, { id }) =>
  fetch(`https://example-data.draftbit.com/sneakers/${id ?? ''}`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getProductGET = (Constants, { id }) =>
  getProductGETStatusAndText(Constants, { id }).then(
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

export const useGetProductGET = ({ id }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(`https://example-data.draftbit.com/sneakers/${id ?? ''}`, {
    depends: [isFocused],
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
};

export const FetchGetProductGET = ({
  children,
  onData = () => {},
  refetchInterval,
  id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(`https://example-data.draftbit.com/sneakers/${id ?? ''}`, {
    depends: [isFocused],
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });

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

  return children({ loading, data, error, refetchGetProduct: refetch });
};

export const getVideosGETStatusAndText = Constants =>
  fetch(`https://example-data.draftbit.com/videos`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getVideosGET = Constants =>
  getVideosGETStatusAndText(Constants).then(({ status, statusText, text }) => {
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

export const useGetVideosGET = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(`https://example-data.draftbit.com/videos`, {
    depends: [isFocused],
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
};

export const FetchGetVideosGET = ({
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
  } = useFetch(`https://example-data.draftbit.com/videos`, {
    depends: [isFocused],
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });

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

  return children({ loading, data, error, refetchGetVideos: refetch });
};

export const grabDataPointsGETStatusAndText = Constants =>
  fetch(`https://example-data.draftbit.com/users?_limit=10`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const grabDataPointsGET = Constants =>
  grabDataPointsGETStatusAndText(Constants).then(
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

export const useGrabDataPointsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['users', args], () => grabDataPointsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGrabDataPointsGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGrabDataPointsGET(
    {},
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

  return children({ loading, data, error, refetchGrabDataPoints: refetch });
};

export const listOfProductsGETStatusAndText = Constants =>
  fetch(`https://example-data.draftbit.com/sneakers?_limit=10`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const listOfProductsGET = Constants =>
  listOfProductsGETStatusAndText(Constants).then(
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

export const useListOfProductsGET = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(`https://example-data.draftbit.com/sneakers?_limit=10`, {
    depends: [isFocused],
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
};

export const FetchListOfProductsGET = ({
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
  } = useFetch(`https://example-data.draftbit.com/sneakers?_limit=10`, {
    depends: [isFocused],
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });

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

  return children({ loading, data, error, refetchListOfProducts: refetch });
};
