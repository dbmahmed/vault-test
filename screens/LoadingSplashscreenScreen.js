import React from 'react';
import * as CustomCode from '../CustomCode';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import segmentLogIdentify from '../global-functions/segmentLogIdentify';
import segmentLogScreen from '../global-functions/segmentLogScreen';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, ScreenContainer, Touchable, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import * as Notifications from 'expo-notifications';
import {
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const LoadingSplashscreenScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const segment = useAnalytics();

  const variables = CustomCode.useValues();
  const setVariables = CustomCode.useSetValue();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setCount(count + 1);

    if (
      lastNotificationResponse &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
      //lastNotificationResponse.notification.request.content.data.deeplink
    ) {
      const { date } = lastNotificationResponse?.notification;
      const timeStamp = new Date(date.toString().split('.')[0] * 1000);
      const { image, mainText, minorText, sportsbookURL, buttonText, id } =
        lastNotificationResponse.notification.request.content.data;

      if (lastNotificationResponse.notification.request.content.data.deeplink) {
        //track when notifcation has a deeplink

        segment.track('Notification with a deeplink', {
          title: lastNotificationResponse.notification.request.content.title,
          timeStamp: timeStamp,
          id: id,
          data: JSON.stringify(
            lastNotificationResponse.notification.request.content.data
          ),
          internalId: variables.internalId,
        });

        try {
          props.navigation.navigate('NotificationPopUpScreen', {
            image,
            mainText,
            minorText,
            sportsbookURL,
            buttonText,
            id,
          });
        } catch (err) {
          console.error(err);
        }

        return;
      }
      // Track when notification doesnt have a deep link

      segment.track('Notification without a deeplink', {
        title: lastNotificationResponse.notification.request.content.title,
        timeStamp: timeStamp,
        id: id,
        data: JSON.stringify(
          lastNotificationResponse.notification.request.content.data
        ),
        internalId: variables.internalId,
      });
    } else {
      if (count > 0) {
        fetch(
          'https://sportsbettingapi20201118035253.azurewebsites.net/Account/ValidateToken?authorization=' +
            variables.authToken,
          {
            headers: {
              Accept: 'application/json',
              Authorization: variables.authToken,
            },
          }
        )
          .then(response => response.json())
          .then(json => {
            if (
              variables.internalId == null ||
              variables.internalId == '' ||
              variables.internalId == 'undefined'
            ) {
              setVariables({
                key: 'internalId',
                value: json,
              });

              fetch(
                'https://sportsbettingapi20201118035253.azurewebsites.net/CachedSharpsports/CanUserRefresh?internalId=' +
                  json,
                {
                  headers: {
                    Accept: 'application/json',
                    Authorization: variables.authToken,
                  },
                }
              )
                .then(response => response.json())
                .then(canRefresh => {
                  if (canRefresh) {
                    const SSpublicKey =
                      'ded051886fb76987f7d80664cdb73b99fad637c0';
                    const SSprivateKey =
                      '31891124503a015f1f9421f768341c364a8e6a53';
                    const sharpsports = new SharpSports(
                      json,
                      SSpublicKey,
                      SSprivateKey
                    );

                    sharpsports.Refresh();
                  }
                });

              navigation.navigate('MainTabNavigator');
            } else {
              fetch(
                'https://sportsbettingapi20201118035253.azurewebsites.net/CachedSharpsports/CanUserRefresh?internalId=' +
                  variables.internalId,
                {
                  headers: {
                    Accept: 'application/json',
                    Authorization: variables.authToken,
                  },
                }
              )
                .then(response => response.json())
                .then(canRefresh => {
                  if (canRefresh) {
                    const SSpublicKey =
                      'ded051886fb76987f7d80664cdb73b99fad637c0';
                    const SSprivateKey =
                      '31891124503a015f1f9421f768341c364a8e6a53';
                    const sharpsports = new SharpSports(
                      json,
                      SSpublicKey,
                      SSprivateKey
                    );

                    sharpsports.Refresh();
                  }
                });

              navigation.navigate('MainTabNavigator');
            }
          })
          .catch(error => {
            if (variables.initLoginCheck === 0) {
              setVariables({
                key: 'initLoginCheck',
                value: 1,
              });
            }
            navigation.navigate('Welcome1Screen');
          });
      }
    }
  }, [lastNotificationResponse]);
  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      segmentLogScreen(segment, 'Splashscreen');
      segmentLogIdentify(
        segment,
        Constants['internalId'],
        undefined,
        undefined,
        undefined,
        undefined,
        Constants['internalId'],
        undefined,
        undefined,
        undefined
      );
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [token, setToken] = React.useState('');

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { alignItems: 'center', justifyContent: 'space-between' },
        dimensions.width
      )}
      scrollable={false}
      hasSafeArea={false}
    >
      <View
        style={StyleSheet.applyWidth(
          { height: '100%', width: '100%' },
          dimensions.width
        )}
      >
        <ImageBackground
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: '100%',
              justifyContent: 'center',
              width: '100%',
            },
            dimensions.width
          )}
          source={Images.VaultSplashscreen1}
          resizeMode={'cover'}
        >
          <ActivityIndicator
            style={StyleSheet.applyWidth(
              { height: 36, width: 36 },
              dimensions.width
            )}
            animating={true}
            hidesWhenStopped={true}
            size={'large'}
          />
        </ImageBackground>
        <Button
          onPress={() => {
            const handler = async () => {
              try {
                const test = await Utils.getPushToken({});
                console.log(test);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={StyleSheet.applyWidth(
            GlobalStyles.ButtonStyles(theme)['Button'],
            dimensions.width
          )}
          title={'Get push token'}
        />
      </View>
      <Button
        onPress={() => {
          try {
            navigation.navigate('NotificationPopUpScreen');
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          GlobalStyles.ButtonStyles(theme)['Button'],
          dimensions.width
        )}
        title={'Get Started'}
      />
      <Text
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['Text'],
          dimensions.width
        )}
      >
        {token}
      </Text>
    </ScreenContainer>
  );
};

export default withTheme(LoadingSplashscreenScreen);
