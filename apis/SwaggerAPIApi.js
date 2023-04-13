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

export const cacheUserBetsGETStatusAndText = (Constants, { internalId }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/CachedSharpsports/CacheIndividualBetslipsByBettorId?id=${
      internalId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const cacheUserBetsGET = (Constants, { internalId }) =>
  cacheUserBetsGETStatusAndText(Constants, { internalId }).then(
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

export const useCacheUserBetsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['CachUserBetsResponse', args],
    () => cacheUserBetsGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['CachUserBetsResponses']),
    }
  );
};

export const FetchCacheUserBetsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  internalId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useCacheUserBetsGET(
    { internalId },
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

  return children({ loading, data, error, refetchCacheUserBets: refetch });
};

export const confirmPhoneNumberGETStatusAndText = (
  Constants,
  { confirmationCode, countryCode, internalId, phoneNumber, serviceSid }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/ConfirmPhoneNumber?code=${
      confirmationCode ?? ''
    }&countryCode=${countryCode ?? ''}&internalId=${
      internalId ?? ''
    }&phoneNumber=${phoneNumber ?? ''}&serviceSid=${serviceSid ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const confirmPhoneNumberGET = (
  Constants,
  { confirmationCode, countryCode, internalId, phoneNumber, serviceSid }
) =>
  confirmPhoneNumberGETStatusAndText(Constants, {
    confirmationCode,
    countryCode,
    internalId,
    phoneNumber,
    serviceSid,
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

export const useConfirmPhoneNumberGET = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => confirmPhoneNumberGET(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('UserInfo', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('UserInfo');
        queryClient.invalidateQueries('UserInfos');
      },
    }
  );
};

export const FetchConfirmPhoneNumberGET = ({
  children,
  onData = () => {},
  refetchInterval,
  confirmationCode,
  countryCode,
  internalId,
  phoneNumber,
  serviceSid,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useConfirmPhoneNumberGET(
    { confirmationCode, countryCode, internalId, phoneNumber, serviceSid },
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

  return children({ loading, data, error, refetchConfirmPhoneNumber: refetch });
};

export const createStreamChannelPOSTStatusAndText = (
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
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const createStreamChannelPOST = (
  Constants,
  { channelName, creatorId, members }
) =>
  createStreamChannelPOSTStatusAndText(Constants, {
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

export const useCreateStreamChannelPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => createStreamChannelPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('ChannelId', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('ChannelId');
        queryClient.invalidateQueries('ChannelIds');
      },
    }
  );
};

export const FetchCreateStreamChannelPOST = ({
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

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCreateStreamChannelPOST(
    { channelName, creatorId, members },
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

  return children({
    loading,
    data,
    error,
    refetchCreateStreamChannel: refetch,
  });
};

export const deleteAccountGETStatusAndText = (Constants, { internalid }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/DeleteAccount?internalId=${
      internalid ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const deleteAccountGET = (Constants, { internalid }) =>
  deleteAccountGETStatusAndText(Constants, { internalid }).then(
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

export const useDeleteAccountGET = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => deleteAccountGET(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('DeleteAccount', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('DeleteAccount');
        queryClient.invalidateQueries('DeleteAccounts');
      },
    }
  );
};

export const FetchDeleteAccountGET = ({
  children,
  onData = () => {},
  refetchInterval,
  internalid,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useDeleteAccountGET(
    { internalid },
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

  return children({ loading, data, error, refetchDeleteAccount: refetch });
};

export const deleteBookByIdGETStatusAndText = (Constants, { bookId }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/DeleteBookById?bookid=${
      bookId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const deleteBookByIdGET = (Constants, { bookId }) =>
  deleteBookByIdGETStatusAndText(Constants, { bookId }).then(
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

export const useDeleteBookByIdGET = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => deleteBookByIdGET(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('DeleteBook', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('DeleteBook');
        queryClient.invalidateQueries('DeleteBooks');
      },
    }
  );
};

export const FetchDeleteBookByIdGET = ({
  children,
  onData = () => {},
  refetchInterval,
  bookId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useDeleteBookByIdGET(
    { bookId },
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

  return children({ loading, data, error, refetchDeleteBookById: refetch });
};

export const forgotPasswordGETStatusAndText = (Constants, { email }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/ForgotPassword?email=${
      email ?? ''
    }`,
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

export const forgotPasswordGET = (Constants, { email }) =>
  forgotPasswordGETStatusAndText(Constants, { email }).then(
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

export const useForgotPasswordGET = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => forgotPasswordGET(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('forgotPassword', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('forgotPassword');
        queryClient.invalidateQueries('forgotPasswords');
      },
    }
  );
};

export const FetchForgotPasswordGET = ({
  children,
  onData = () => {},
  refetchInterval,
  email,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useForgotPasswordGET(
    { email },
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

  return children({ loading, data, error, refetchForgotPassword: refetch });
};

export const getAllUserInfoGETStatusAndText = Constants =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/AllUserInfo`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getAllUserInfoGET = Constants =>
  getAllUserInfoGETStatusAndText(Constants).then(
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

export const useGetAllUserInfoGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['UserInfos', args],
    () => getAllUserInfoGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAllUserInfoGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetAllUserInfoGET(
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

  return children({ loading, data, error, refetchGetAllUserInfo: refetch });
};

export const getDefaultUnitsGETStatusAndText = (Constants, { internalId }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/SaveUnitSize?internalId=${
      internalId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getDefaultUnitsGET = (Constants, { internalId }) =>
  getDefaultUnitsGETStatusAndText(Constants, { internalId }).then(
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

export const useGetDefaultUnitsGET = ({ internalId }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/SaveUnitSize?internalId=${
      internalId ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchGetDefaultUnitsGET = ({
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/SaveUnitSize?internalId=${
      internalId ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
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

  return children({ loading, data, error, refetchGetDefaultUnits: refetch });
};

export const getMostProfitableGETStatusAndText = (
  Constants,
  { daysBack, dummy, internalId }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetMostProfitable?daysBack=${
      daysBack ?? ''
    }&dummy=${dummy ?? ''}&id=${internalId ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getMostProfitableGET = (
  Constants,
  { daysBack, dummy, internalId }
) =>
  getMostProfitableGETStatusAndText(Constants, {
    daysBack,
    dummy,
    internalId,
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

export const useGetMostProfitableGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['MostProfitablePages', args],
    () => getMostProfitableGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGetMostProfitableGET = ({
  children,
  onData = () => {},
  refetchInterval,
  daysBack,
  dummy,
  internalId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetMostProfitableGET(
    { daysBack, dummy, internalId },
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

  return children({ loading, data, error, refetchGetMostProfitable: refetch });
};

export const getStreamTokenGETStatusAndText = (Constants, { internalId }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/GetStreamToken?internalId=${
      internalId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getStreamTokenGET = (Constants, { internalId }) =>
  getStreamTokenGETStatusAndText(Constants, { internalId }).then(
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

export const useGetStreamTokenGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['Token', args], () => getStreamTokenGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['Tokens']),
  });
};

export const FetchGetStreamTokenGET = ({
  children,
  onData = () => {},
  refetchInterval,
  internalId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetStreamTokenGET(
    { internalId },
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

  return children({ loading, data, error, refetchGetStreamToken: refetch });
};

export const getStreamUsersGETStatusAndText = Constants =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/StreamUsers`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
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

export const useGetStreamUsersGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['StreamUsers', args],
    () => getStreamUsersGET(Constants, args),
    {
      refetchInterval,
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

  const { loading, data, error, refetch } = useGetStreamUsersGET(
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

  return children({ loading, data, error, refetchGetStreamUsers: refetch });
};

export const getUserInfoGETStatusAndText = (Constants, { interanlId }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/UserInfo?internalId=${
      interanlId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getUserInfoGET = (Constants, { interanlId }) =>
  getUserInfoGETStatusAndText(Constants, { interanlId }).then(
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

export const useGetUserInfoGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['UserInfo', args], () => getUserInfoGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['UserInfos']),
  });
};

export const FetchGetUserInfoGET = ({
  children,
  onData = () => {},
  refetchInterval,
  interanlId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetUserInfoGET(
    { interanlId },
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

  return children({ loading, data, error, refetchGetUserInfo: refetch });
};

export const getAllBettorAccountsKate$sGETStatusAndText = (
  Constants,
  { internalId }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetAllBettorAccounts?id=${
      internalId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getAllBettorAccountsKate$sGET = (Constants, { internalId }) =>
  getAllBettorAccountsKate$sGETStatusAndText(Constants, { internalId }).then(
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

export const useGetAllBettorAccountsKate$sGET = ({ internalId }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetAllBettorAccounts?id=${
      internalId ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchGetAllBettorAccountsKate$sGET = ({
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetAllBettorAccounts?id=${
      internalId ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
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

  return children({
    loading,
    data,
    error,
    refetchGetAllBettorAccountsKate$s: refetch,
  });
};

export const getBankrollPageByIdGETStatusAndText = (
  Constants,
  { dummy, internalId }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBankrollPageById?dummy=${
      dummy ?? ''
    }&id=${internalId ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getBankrollPageByIdGET = (Constants, { dummy, internalId }) =>
  getBankrollPageByIdGETStatusAndText(Constants, { dummy, internalId }).then(
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

export const useGetBankrollPageByIdGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['bankrollPages', args],
    () => getBankrollPageByIdGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGetBankrollPageByIdGET = ({
  children,
  onData = () => {},
  refetchInterval,
  dummy,
  internalId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetBankrollPageByIdGET(
    { dummy, internalId },
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

  return children({
    loading,
    data,
    error,
    refetchGetBankrollPageById: refetch,
  });
};

export const getBetslipsByBettorIdNotKate$sGETStatusAndText = (
  Constants,
  { dummy, internalId }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBetslipsByBettorId?dummy=${
      dummy ?? ''
    }&id=${internalId ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getBetslipsByBettorIdNotKate$sGET = (
  Constants,
  { dummy, internalId }
) =>
  getBetslipsByBettorIdNotKate$sGETStatusAndText(Constants, {
    dummy,
    internalId,
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

export const useGetBetslipsByBettorIdNotKate$sGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['ids', args],
    () => getBetslipsByBettorIdNotKate$sGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGetBetslipsByBettorIdNotKate$sGET = ({
  children,
  onData = () => {},
  refetchInterval,
  dummy,
  internalId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    useGetBetslipsByBettorIdNotKate$sGET(
      { dummy, internalId },
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

  return children({
    loading,
    data,
    error,
    refetchGetBetslipsByBettorIdNotKate$s: refetch,
  });
};

export const getBetslipsByBettorIdAndBetslipGETStatusAndText = (
  Constants,
  { betslipId, userId }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBetslipByBettorIdAndBetslipId?betslipId=${
      betslipId ?? ''
    }&id=${userId ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getBetslipsByBettorIdAndBetslipGET = (
  Constants,
  { betslipId, userId }
) =>
  getBetslipsByBettorIdAndBetslipGETStatusAndText(Constants, {
    betslipId,
    userId,
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

export const useGetBetslipsByBettorIdAndBetslipGET = ({
  betslipId,
  userId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBetslipByBettorIdAndBetslipId?betslipId=${
      betslipId ?? ''
    }&id=${userId ?? ''}`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchGetBetslipsByBettorIdAndBetslipGET = ({
  children,
  onData = () => {},
  refetchInterval,
  betslipId,
  userId,
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBetslipByBettorIdAndBetslipId?betslipId=${
      betslipId ?? ''
    }&id=${userId ?? ''}`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
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

  return children({
    loading,
    data,
    error,
    refetchGetBetslipsByBettorIdAndBetslip: refetch,
  });
};

export const getBettorAccountByIdGETStatusAndText = Constants =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorAccountById`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getBettorAccountByIdGET = Constants =>
  getBettorAccountByIdGETStatusAndText(Constants).then(
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

export const useGetBettorAccountByIdGET = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorAccountById`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchGetBettorAccountByIdGET = ({
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorAccountById`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
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

  return children({
    loading,
    data,
    error,
    refetchGetBettorAccountById: refetch,
  });
};

export const getBettorBankrollTimeseriesKate$sGETStatusAndText = (
  Constants,
  { internalId }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorBankrollTimeseries?id=${
      internalId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getBettorBankrollTimeseriesKate$sGET = (
  Constants,
  { internalId }
) =>
  getBettorBankrollTimeseriesKate$sGETStatusAndText(Constants, {
    internalId,
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

export const useGetBettorBankrollTimeseriesKate$sGET = ({ internalId }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorBankrollTimeseries?id=${
      internalId ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchGetBettorBankrollTimeseriesKate$sGET = ({
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorBankrollTimeseries?id=${
      internalId ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
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

  return children({
    loading,
    data,
    error,
    refetchGetBettorBankrollTimeseriesKate$s: refetch,
  });
};

export const getBettorNetProfitTimeseriesKate$sGETStatusAndText = (
  Constants,
  { internalId }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorNetProfitTimeseries?id=${
      internalId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getBettorNetProfitTimeseriesKate$sGET = (
  Constants,
  { internalId }
) =>
  getBettorNetProfitTimeseriesKate$sGETStatusAndText(Constants, {
    internalId,
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

export const useGetBettorNetProfitTimeseriesKate$sGET = ({ internalId }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorNetProfitTimeseries?id=${
      internalId ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchGetBettorNetProfitTimeseriesKate$sGET = ({
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorNetProfitTimeseries?id=${
      internalId ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
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

  return children({
    loading,
    data,
    error,
    refetchGetBettorNetProfitTimeseriesKate$s: refetch,
  });
};

export const getBettorStatsByBettorIdKate$sGETStatusAndText = (
  Constants,
  { dummy, internalId }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorStatsByBettorId?dummy=${
      dummy ?? ''
    }&id=${internalId ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getBettorStatsByBettorIdKate$sGET = (
  Constants,
  { dummy, internalId }
) =>
  getBettorStatsByBettorIdKate$sGETStatusAndText(Constants, {
    dummy,
    internalId,
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

export const useGetBettorStatsByBettorIdKate$sGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['stat', args],
    () => getBettorStatsByBettorIdKate$sGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['stats']),
    }
  );
};

export const FetchGetBettorStatsByBettorIdKate$sGET = ({
  children,
  onData = () => {},
  refetchInterval,
  dummy,
  internalId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    useGetBettorStatsByBettorIdKate$sGET(
      { dummy, internalId },
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

  return children({
    loading,
    data,
    error,
    refetchGetBettorStatsByBettorIdKate$s: refetch,
  });
};

export const getSportbookStatsByBettorAndSportbooksIdGETStatusAndText = (
  Constants,
  { internalId, sportsbookId }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetSportbookStatsByBettorAndSportbooksId?id=${
      internalId ?? ''
    }&sportsbook=${sportsbookId ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
        Dummy: Constants['updatedSportsBook'],
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getSportbookStatsByBettorAndSportbooksIdGET = (
  Constants,
  { internalId, sportsbookId }
) =>
  getSportbookStatsByBettorAndSportbooksIdGETStatusAndText(Constants, {
    internalId,
    sportsbookId,
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

export const useGetSportbookStatsByBettorAndSportbooksIdGET = ({
  internalId,
  sportsbookId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetSportbookStatsByBettorAndSportbooksId?id=${
      internalId ?? ''
    }&sportsbook=${sportsbookId ?? ''}`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
        Dummy: Constants['updatedSportsBook'],
      },
    }
  );
};

export const FetchGetSportbookStatsByBettorAndSportbooksIdGET = ({
  children,
  onData = () => {},
  refetchInterval,
  internalId,
  sportsbookId,
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetSportbookStatsByBettorAndSportbooksId?id=${
      internalId ?? ''
    }&sportsbook=${sportsbookId ?? ''}`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
        Dummy: Constants['updatedSportsBook'],
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

  return children({
    loading,
    data,
    error,
    refetchGetSportbookStatsByBettorAndSportbooksId: refetch,
  });
};

export const gradesGETStatusAndText = (Constants, { dummy, id }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetGrades?dummy=${
      dummy ?? ''
    }&id=${id ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const gradesGET = (Constants, { dummy, id }) =>
  gradesGETStatusAndText(Constants, { dummy, id }).then(
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

export const useGradesGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['Grade', args], () => gradesGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['Grades']),
  });
};

export const FetchGradesGET = ({
  children,
  onData = () => {},
  refetchInterval,
  dummy,
  id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGradesGET(
    { dummy, id },
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

  return children({ loading, data, error, refetchGrades: refetch });
};

export const loginPOSTStatusAndText = (Constants, { loginIdentity, passwrd }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/Login`,
    {
      body: JSON.stringify({ loginIdentity: loginIdentity, password: passwrd }),
      headers: {
        Accept: 'application/json',
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

export const oddsDataGETStatusAndText = (Constants, { betType, sport }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Odds/GetOddsBySportAndType?sport=${
      sport ?? ''
    }&type=${betType ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const oddsDataGET = (Constants, { betType, sport }) =>
  oddsDataGETStatusAndText(Constants, { betType, sport }).then(
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

export const useOddsDataGET = ({ betType, sport }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Odds/GetOddsBySportAndType?sport=${
      sport ?? ''
    }&type=${betType ?? ''}`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchOddsDataGET = ({
  children,
  onData = () => {},
  refetchInterval,
  betType,
  sport,
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Odds/GetOddsBySportAndType?sport=${
      sport ?? ''
    }&type=${betType ?? ''}`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
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

  return children({ loading, data, error, refetchOddsData: refetch });
};

export const resetPasswordGETStatusAndText = (Constants, { code, password }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/SetNewPassword?code=${
      code ?? ''
    }&password=${password ?? ''}`,
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

export const resetPasswordGET = (Constants, { code, password }) =>
  resetPasswordGETStatusAndText(Constants, { code, password }).then(
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

export const useResetPasswordGET = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => resetPasswordGET(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('Reset Password', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('Reset Password');
        queryClient.invalidateQueries('Reset Passwords');
      },
    }
  );
};

export const FetchResetPasswordGET = ({
  children,
  onData = () => {},
  refetchInterval,
  code,
  password,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useResetPasswordGET(
    { code, password },
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

  return children({ loading, data, error, refetchResetPassword: refetch });
};

export const savePhoneNumberGETStatusAndText = (
  Constants,
  { countryCode, phoneNumber }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/SavePhoneNumber?countryCode=${
      countryCode ?? ''
    }&phoneNumber=${phoneNumber ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const savePhoneNumberGET = (Constants, { countryCode, phoneNumber }) =>
  savePhoneNumberGETStatusAndText(Constants, { countryCode, phoneNumber }).then(
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

export const useSavePhoneNumberGET = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => savePhoneNumberGET(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('UserInfo', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('UserInfo');
        queryClient.invalidateQueries('UserInfos');
      },
    }
  );
};

export const FetchSavePhoneNumberGET = ({
  children,
  onData = () => {},
  refetchInterval,
  countryCode,
  phoneNumber,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useSavePhoneNumberGET(
    { countryCode, phoneNumber },
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

  return children({ loading, data, error, refetchSavePhoneNumber: refetch });
};

export const saveUnitSizeGETStatusAndText = (
  Constants,
  { internalId, unitSize }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/SaveUnitSize?internalId=${
      internalId ?? ''
    }&unitSize=${unitSize ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const saveUnitSizeGET = (Constants, { internalId, unitSize }) =>
  saveUnitSizeGETStatusAndText(Constants, { internalId, unitSize }).then(
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

export const useSaveUnitSizeGET = ({ internalId, unitSize }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/SaveUnitSize?internalId=${
      internalId ?? ''
    }&unitSize=${unitSize ?? ''}`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchSaveUnitSizeGET = ({
  children,
  onData = () => {},
  refetchInterval,
  internalId,
  unitSize,
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/SaveUnitSize?internalId=${
      internalId ?? ''
    }&unitSize=${unitSize ?? ''}`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
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

  return children({ loading, data, error, refetchSaveUnitSize: refetch });
};

export const sharpsports$GetFavoriteTeamGETStatusAndText = (
  Constants,
  { dummy, internalId }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetFavoriteTeam?dummy=${
      dummy ?? ''
    }&id=${internalId ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const sharpsports$GetFavoriteTeamGET = (
  Constants,
  { dummy, internalId }
) =>
  sharpsports$GetFavoriteTeamGETStatusAndText(Constants, {
    dummy,
    internalId,
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

export const useSharpsports$GetFavoriteTeamGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['FavoriteTeam', args],
    () => sharpsports$GetFavoriteTeamGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['FavoriteTeams']),
    }
  );
};

export const FetchSharpsports$GetFavoriteTeamGET = ({
  children,
  onData = () => {},
  refetchInterval,
  dummy,
  internalId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useSharpsports$GetFavoriteTeamGET(
    { dummy, internalId },
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

  return children({
    loading,
    data,
    error,
    refetchSharpsports$GetFavoriteTeam: refetch,
  });
};

export const sharpsports$GetTrendsGETStatusAndText = (
  Constants,
  { dummy, internalId }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetTrends?dummy=${
      dummy ?? ''
    }&id=${internalId ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const sharpsports$GetTrendsGET = (Constants, { dummy, internalId }) =>
  sharpsports$GetTrendsGETStatusAndText(Constants, { dummy, internalId }).then(
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

export const useSharpsports$GetTrendsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Trends', args],
    () => sharpsports$GetTrendsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchSharpsports$GetTrendsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  dummy,
  internalId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useSharpsports$GetTrendsGET(
    { dummy, internalId },
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

  return children({
    loading,
    data,
    error,
    refetchSharpsports$GetTrends: refetch,
  });
};

export const signUpPOSTStatusAndText = (
  Constants,
  { email, firstName, lastName, password, referralCode, username }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/SignUp`,
    {
      body: JSON.stringify({
        firstName: firstName,
        username: username,
        email: email,
        password: password,
        lastName: lastName,
        referralCode: referralCode,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const signUpPOST = (
  Constants,
  { email, firstName, lastName, password, referralCode, username }
) =>
  signUpPOSTStatusAndText(Constants, {
    email,
    firstName,
    lastName,
    password,
    referralCode,
    username,
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

export const useSignUpPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => signUpPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('signup', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('signup');
        queryClient.invalidateQueries('signups');
      },
    }
  );
};

export const FetchSignUpPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  email,
  firstName,
  lastName,
  password,
  referralCode,
  username,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useSignUpPOST(
    { email, firstName, lastName, password, referralCode, username },
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

  return children({ loading, data, error, refetchSignUp: refetch });
};

export const streamInvitePOSTStatusAndText = (
  Constants,
  { creatorId, groupImage, groupName, phoneNumbers }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/StreamInvite`,
    {
      body: JSON.stringify({
        groupName: groupName,
        groupImage: groupImage,
        creatorId: creatorId,
        phoneNumbers: phoneNumbers,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const streamInvitePOST = (
  Constants,
  { creatorId, groupImage, groupName, phoneNumbers }
) =>
  streamInvitePOSTStatusAndText(Constants, {
    creatorId,
    groupImage,
    groupName,
    phoneNumbers,
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

export const useStreamInvitePOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => streamInvitePOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('StreamInvite', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('StreamInvite');
        queryClient.invalidateQueries('StreamInvites');
      },
    }
  );
};

export const FetchStreamInvitePOST = ({
  children,
  onData = () => {},
  refetchInterval,
  creatorId,
  groupImage,
  groupName,
  phoneNumbers,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useStreamInvitePOST(
    { creatorId, groupImage, groupName, phoneNumbers },
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

  return children({ loading, data, error, refetchStreamInvite: refetch });
};

export const updateBetslipsByBettorIdGETStatusAndText = (Constants, { id }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/UpdateBetslipsByBettorId?id=${
      id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const updateBetslipsByBettorIdGET = (Constants, { id }) =>
  updateBetslipsByBettorIdGETStatusAndText(Constants, { id }).then(
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

export const useUpdateBetslipsByBettorIdGET = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => updateBetslipsByBettorIdGET(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('updateBetslips', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('updateBetslip');
        queryClient.invalidateQueries('updateBetslips');
      },
    }
  );
};

export const FetchUpdateBetslipsByBettorIdGET = ({
  children,
  onData = () => {},
  refetchInterval,
  id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useUpdateBetslipsByBettorIdGET(
    { id },
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

  return children({
    loading,
    data,
    error,
    refetchUpdateBetslipsByBettorId: refetch,
  });
};

export const updateProfilePictureGETStatusAndText = (
  Constants,
  { internalId, link }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/UpdateProfilePicture?internalId=${
      internalId ?? ''
    }&link=${link ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const updateProfilePictureGET = (Constants, { internalId, link }) =>
  updateProfilePictureGETStatusAndText(Constants, { internalId, link }).then(
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

export const useUpdateProfilePictureGET = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => updateProfilePictureGET(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('profilePic', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('profilePic');
        queryClient.invalidateQueries('profilePics');
      },
    }
  );
};

export const FetchUpdateProfilePictureGET = ({
  children,
  onData = () => {},
  refetchInterval,
  internalId,
  link,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useUpdateProfilePictureGET(
    { internalId, link },
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

  return children({
    loading,
    data,
    error,
    refetchUpdateProfilePicture: refetch,
  });
};

export const updatePushNotificationTokenGETStatusAndText = (
  Constants,
  { internalId, pushToken }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/UpdatePushNotificationToken?internalId=${
      internalId ?? ''
    }&pushToken=${pushToken ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const updatePushNotificationTokenGET = (
  Constants,
  { internalId, pushToken }
) =>
  updatePushNotificationTokenGETStatusAndText(Constants, {
    internalId,
    pushToken,
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

export const useUpdatePushNotificationTokenGET = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      updatePushNotificationTokenGET(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('pushToken', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('pushToken');
        queryClient.invalidateQueries('pushTokens');
      },
    }
  );
};

export const FetchUpdatePushNotificationTokenGET = ({
  children,
  onData = () => {},
  refetchInterval,
  internalId,
  pushToken,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useUpdatePushNotificationTokenGET(
    { internalId, pushToken },
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

  return children({
    loading,
    data,
    error,
    refetchUpdatePushNotificationToken: refetch,
  });
};

export const updateWaitlistStatusGETStatusAndText = (
  Constants,
  { internalId, waitlisted }
) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/UpdateWaitlisted?internalId=${
      internalId ?? ''
    }&status=${waitlisted ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const updateWaitlistStatusGET = (
  Constants,
  { internalId, waitlisted }
) =>
  updateWaitlistStatusGETStatusAndText(Constants, {
    internalId,
    waitlisted,
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

export const useUpdateWaitlistStatusGET = ({ internalId, waitlisted }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/UpdateWaitlisted?internalId=${
      internalId ?? ''
    }&status=${waitlisted ?? ''}`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchUpdateWaitlistStatusGET = ({
  children,
  onData = () => {},
  refetchInterval,
  internalId,
  waitlisted,
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/UpdateWaitlisted?internalId=${
      internalId ?? ''
    }&status=${waitlisted ?? ''}`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
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

  return children({
    loading,
    data,
    error,
    refetchUpdateWaitlistStatus: refetch,
  });
};

export const validateTokenGETStatusAndText = Constants =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/ValidateToken`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const validateTokenGET = Constants =>
  validateTokenGETStatusAndText(Constants).then(
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

export const useValidateTokenGET = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/ValidateToken`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  );
};

export const FetchValidateTokenGET = ({
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
    `https://sportsbettingapi20201118035253.azurewebsites.net/Account/ValidateToken`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
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

  return children({ loading, data, error, refetchValidateToken: refetch });
};

export const weeklyRecapGETStatusAndText = (Constants, { internalId }) =>
  fetch(
    `https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetWeeklyRecap?id=${
      internalId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['authToken'],
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const weeklyRecapGET = (Constants, { internalId }) =>
  weeklyRecapGETStatusAndText(Constants, { internalId }).then(
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

export const useWeeklyRecapGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['WeeklyRecap', args],
    () => weeklyRecapGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['WeeklyRecaps']),
    }
  );
};

export const FetchWeeklyRecapGET = ({
  children,
  onData = () => {},
  refetchInterval,
  internalId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useWeeklyRecapGET(
    { internalId },
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

  return children({ loading, data, error, refetchWeeklyRecap: refetch });
};
