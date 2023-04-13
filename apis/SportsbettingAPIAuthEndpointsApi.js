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

export const createChannelPOSTStatusAndText = (
  Constants,
  { channelName, creatorId, members }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/StreamChannel`,
    {
      body: JSON.stringify({
        name: channelName,
        type: 'messaging',
        creatorId: creatorId,
        members: members,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const createChannelPOST = (
  Constants,
  { channelName, creatorId, members }
) =>
  createChannelPOSTStatusAndText(Constants, {
    channelName,
    creatorId,
    members,
  }).then(({ status, statusText, text }) => {
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

export const useCreateChannelPOST = ({ channelName, creatorId, members }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/StreamChannel`,
    {
      body: JSON.stringify({
        name: channelName,
        type: 'messaging',
        creatorId: creatorId,
        members: members,
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchCreateChannelPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  channelName,
  creatorId,
  members,
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/StreamChannel`,
    {
      body: JSON.stringify({
        name: channelName,
        type: 'messaging',
        creatorId: creatorId,
        members: members,
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
        'Content-Type': 'application/json',
      },
      method: 'POST',
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

  return children({ loading, data, error, refetchCreateChannel: refetch });
};

export const getGetstreamTokenGETStatusAndText = (Constants, { internalId }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/GetStreamToken?internalId=${
      internalId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getGetstreamTokenGET = (Constants, { internalId }) =>
  getGetstreamTokenGETStatusAndText(Constants, { internalId }).then(
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

export const useGetGetstreamTokenGET = ({ internalId }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/GetStreamToken?internalId=${
      internalId ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchGetGetstreamTokenGET = ({
  children,
  onData = () => {},
  refetchInterval,
  internalId,
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/GetStreamToken?internalId=${
      internalId ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
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

  return children({ loading, data, error, refetchGetGetstreamToken: refetch });
};

export const getStreamUsersGETStatusAndText = Constants =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/StreamUsers`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getStreamUsersGET = Constants =>
  getStreamUsersGETStatusAndText(Constants).then(
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

export const useGetStreamUsersGET = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/StreamUsers`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchGetStreamUsersGET = ({
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/StreamUsers`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
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

  return children({ loading, data, error, refetchGetStreamUsers: refetch });
};

export const loginPOSTStatusAndText = (Constants, { loginIdentity, passwrd }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/Login`,
    {
      body: JSON.stringify({ loginIdentity: loginIdentity, password: passwrd }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const loginPOST = (Constants, { loginIdentity, passwrd }) =>
  loginPOSTStatusAndText(Constants, { loginIdentity, passwrd }).then(
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

export const useLoginPOST = ({ loginIdentity, passwrd }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/Login`,
    {
      body: JSON.stringify({ loginIdentity: loginIdentity, password: passwrd }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchLoginPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  loginIdentity,
  passwrd,
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/Login`,
    {
      body: JSON.stringify({ loginIdentity: loginIdentity, password: passwrd }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTH_HEADER'],
        'Content-Type': 'application/json',
      },
      method: 'POST',
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

  return children({ loading, data, error, refetchLogin: refetch });
};
