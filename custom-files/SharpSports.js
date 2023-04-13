/*
// This import is required if you are defining react components in this module.
import React, { useEffect, useState } from 'react';

// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.
import { View, Text, ActivityIndicator } from 'react-native';
import * as GlobalVariableContext from '../config/GlobalVariableContext';

import { WebView } from '@draftbit/ui';

import SharpSports from '@sharpsports/sharpsports-mobile';

export const SharpSportsFormNew = ({ navigation }) => {
  const variables = GlobalVariableContext.useValues();
  let body = 'internalId=' + variables.internalId;
  const [loading, setLoading] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const [hasChangedInner, setHasChangedInner] = useState(false);
  const setGlobalVariableValue = GlobalVariableContext.useSetValue();
  const [webviewUrl, setWebviewUrl] = useState('init');
  const SSpublicKey = 'ded051886fb76987f7d80664cdb73b99fad637c0';
  const SSprivateKey = '31891124503a015f1f9421f768341c364a8e6a53';
  const sharpsports = new SharpSports(
    variables.internalId,
    SSpublicKey,
    SSprivateKey
  );
  const [cid, setCid] = useState(null);

  _onMessage = data => {
    //Any other onMessage handling that you have in your app
    sharpsports.onMessage(data, cid);
  };

  _onNavigationStateChange = data => {
    setWebviewUrl(data.url); //This is required to make sure JS is injected on every new page
    if (data.url.includes('/done') && !hasChanged) {
      fetch(
        'https://sportsbettingapi20201118035253.azurewebsites.net/CachedSharpsports/CacheIndividualBetslipsByBettorId?id=' +
          variables.internalId,
        {
          headers: {
            Accept: 'application/json',
            Authorization: variables.authToken,
          },
        }
      ).then(x => {
        setHasChanged(true);
        setGlobalVariableValue({
          key: 'updatedSportsBook',
          value: variables.updatedSportsBook + 1,
        });
        navigation.navigate('ManageBooksScreen');

        //navigation.goBack();
      });
    }
    sharpsports.onNavigationStateChange(data);
  };

  useEffect(() => {
    if (webviewUrl == 'init') {
      const fetchData = async () => {
        const response = await sharpsports.Context();
        const data = await response.json();
        setWebviewUrl('https://ui.sharpsports.io/link/' + data.cid);
        setCid(data.cid);
      };
      fetchData();
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {loading && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 18,
            marginBottom: 6,
          }}
          pointerEvents={'auto'}
        >
          <ActivityIndicator size="small" />
          <Text
            style={{
              color: '#242323',
              fontSize: 16,
              fontFamily: 'System',
              fontWeight: '700',
              marginLeft: 3,
            }}
          >
            {'Loading'}
          </Text>
        </View>
      )}
      <WebView
        onLoad={() => setLoading(false)}
        source={{
          uri: webviewUrl,
        }}
        style={{ marginTop: 0 }}
        injectedJavaScript={sharpsports.getInjectedJavascript()}
        onNavigationStateChange={_onNavigationStateChange}
        onMessage={_onMessage}
        thirdPartyCookiesEnabled={true}
      />
    </View>
  );
};
*/
