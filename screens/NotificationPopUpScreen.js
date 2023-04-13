import React from 'react';
import * as CustomCode from '../CustomCode';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import segmentLogTrack from '../global-functions/segmentLogTrack';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useAnalytics } from '@segment/analytics-react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  Image,
  Modal,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const NotificationPopUpScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const segment = useAnalytics();
  const conditonalNavigation = async Variables => {
    try {
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
          setVariables({
            key: 'internalId',
            value: json,
          });
          props.navigation.navigate('MainTabNavigator', {
            screen: 'MyBetsStack',
            params: { screen: 'ProfileScreen' },
          });
        })
        .catch(error => {
          props.navigation.navigate('Welcome_Stack', {
            screen: 'Welcome1Screen',
          });
        });
    } catch (e) {
      props.navigation.navigate('Welcome_Stack', { screen: 'Welcome1Screen' });
    }
  };

  const { theme } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      {/* Menu Bar */}
      <View
        style={StyleSheet.applyWidth(
          GlobalStyles.ViewStyles(theme)['Back button bar Jan 19 2023'],
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', justifyContent: 'space-between' },
            dimensions.width
          )}
        >
          {/* Left Button */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-start',
                borderRadius: 0,
                maxWidth: '34%',
                minWidth: '33%',
              },
              dimensions.width
            )}
          />
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                justifyContent: 'center',
                maxHeight: 50,
                maxWidth: '34%',
                minWidth: '33%',
              },
              dimensions.width
            )}
          />
          {/* Right Button */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-end',
                borderRadius: 0,
                maxWidth: '34%',
                minWidth: '33%',
              },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    await conditonalNavigation(Variables);
                    segmentLogTrack(
                      segment,
                      'Closed Notification Deeplink',
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      props.route?.params?.id ?? ''
                    );
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 50,
                    justifyContent: 'flex-end',
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Close */}
                <Icon
                  name={'Ionicons/ios-close'}
                  size={32}
                  color={theme.colors.lightLowImportanceText}
                />
              </View>
            </Touchable>
          </View>
        </View>
      </View>

      <View
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'center' },
          dimensions.width
        )}
      >
        <View>
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            <Image
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                  height: 275,
                  width: 275,
                }),
                dimensions.width
              )}
              resizeMode={'cover'}
              source={{ uri: `${props.route?.params?.image ?? ''}` }}
            />
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                justifyContent: 'center',
                marginTop: 42,
                paddingLeft: 16,
                paddingRight: 16,
              },
              dimensions.width
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Background Inverse (Main Font)'],
                  fontFamily: 'System',
                  fontSize: 28,
                  fontWeight: '700',
                  textAlign: 'center',
                }),
                dimensions.width
              )}
            >
              {props.route?.params?.mainText ?? ''}
            </Text>
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                justifyContent: 'center',
                marginTop: 16,
                paddingLeft: 32,
                paddingRight: 32,
              },
              dimensions.width
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Background Inverse (Main Font)'],
                  fontSize: 14,
                  textAlign: 'center',
                }),
                dimensions.width
              )}
            >
              {props.route?.params?.minorText ?? ''}
            </Text>
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                marginBottom: 28,
                marginTop: 48,
                paddingLeft: 32,
                paddingRight: 32,
              },
              dimensions.width
            )}
          >
            <>
              {!(props.route?.params?.sportsbookURL ?? '') ? null : (
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await WebBrowser.openBrowserAsync(
                          `${props.route?.params?.sportsbookURL ?? ''}`
                        );
                        segmentLogTrack(
                          segment,
                          props.route?.params?.mainText ?? '',
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'],
                      {
                        color: theme.colors['Strong_Text_on_gold_buttons'],
                        fontSize: 16,
                        paddingBottom: 15,
                        paddingTop: 15,
                      }
                    ),
                    dimensions.width
                  )}
                  title={`${props.route?.params?.buttonText ?? 'OK'}`}
                />
              )}
            </>
            {/* No Link Button */}
            <>
              {props.route?.params?.sportsbookURL ?? '' ? null : (
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await conditonalNavigation(Variables);
                        segmentLogTrack(
                          segment,
                          'Viewed Notification Deeplink',
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          props.route?.params?.id ?? ''
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'],
                      {
                        color: theme.colors['Strong_Text_on_gold_buttons'],
                        fontSize: 16,
                        paddingBottom: 15,
                        paddingTop: 15,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'OK'}
                />
              )}
            </>
          </View>
        </View>
      </View>
      <Modal animationType={'none'} />
    </ScreenContainer>
  );
};

export default withTheme(NotificationPopUpScreen);
