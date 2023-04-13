import React from 'react';
import * as CustomCode from '../CustomCode';
import * as SwaggerAPIApi from '../apis/SwaggerAPIApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import segmentLogScreen from '../global-functions/segmentLogScreen';
import segmentLogTrack from '../global-functions/segmentLogTrack';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import {
  Image,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const AllowNotificationsScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const testVarChange = () => {
    console.log(Constants.testVar);

    Constants.testVar = false;

    console.log(Constants.testVar);
  };

  const clearTimer = () => {
    Constants.waitlistedTimer !== undefined
      ? clearTimeout(Constants.waitlistedTimer)
      : null;
  };

  const startTimerTwo = () => {
    Constants.waitlistedTimer !== undefined
      ? clearTimeout(Constants.waitlistedTimer)
      : null;

    Constants.waitlistedTimer = setTimeout(() => {
      return false;
      //console.log(Constants.waitlisted);
    }, 5000);

    return true;

    //console.log(Constants.waitlisted);

    //console.log(Constants.testVar);
  };

  const startTimer = () => {
    Constants.waitlistedTimer !== undefined
      ? clearTimeout(Constants.waitlistedTimer)
      : null;

    Constants.waitlistedTimer = setTimeout(() => {
      setVariable({ key: 'waitlisted', value: false });
      setVariable({ key: 'dummyVar', value: variables.dummyVar + 1 });

      fetch(
        'https://sportsbettingapi20201118035253.azurewebsites.net/Account/UpdateWaitlisted?internalId=' +
          variables.internalId +
          '&status=false',
        {
          headers: {
            Accept: 'application/json',
            Authorization: variables.authToken,
          },
        }
      );
    }, 20000);
  };
  // to use a global variable
  const variables = CustomCode.useValues();

  // to update or modify the value of a global variable
  const setVariable = CustomCode.useSetValue();
  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const swaggerAPIUpdatePushNotificationTokenGET =
    SwaggerAPIApi.useUpdatePushNotificationTokenGET();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      segmentLogScreen(segment, 'Allow Notifications');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [clickedPromo, setClickedPromo] = React.useState(false);
  const [seconds, setSeconds] = React.useState(true);

  return (
    <ScreenContainer
      scrollable={false}
      hasBottomSafeArea={false}
      hasSafeArea={true}
      hasTopSafeArea={true}
    >
      {/* Menu Bar */}
      <View
        style={StyleSheet.applyWidth(
          { borderRadius: 0, justifyContent: 'center' },
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
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.goBack();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 50,
                    paddingRight: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Back */}
                <Icon
                  name={'Ionicons/ios-chevron-back'}
                  size={32}
                  color={theme.colors.backgroundInverseMainFont}
                />
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.backgroundInverseMainFont,
                      fontSize: 18,
                    },
                    dimensions.width
                  )}
                >
                  {'Back'}
                </Text>
              </View>
            </Touchable>
          </View>
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
          ></View>
        </View>
      </View>

      <View
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'space-between' },
          dimensions.width
        )}
      >
        <View>
          <View
            style={StyleSheet.applyWidth({ minHeight: 50 }, dimensions.width)}
          >
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.backgroundInverseMainFont,
                  fontFamily: 'System',
                  fontSize: 28,
                  fontWeight: '700',
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 10,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'Wanna know how your bets are doing? 🤑'}
            </Text>
          </View>

          <View
            style={StyleSheet.applyWidth(
              { marginTop: 48, paddingLeft: 16, paddingRight: 16 },
              dimensions.width
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Background Inverse (Main Font)'],
                  fontFamily: 'System',
                  fontSize: 20,
                  fontWeight: '700',
                  marginBottom: 48,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {
                'Push notifications allow us to give you updates on your bets, weekly recaps & sportsbook offers.'
              }
            </Text>

            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Background Inverse (Main Font)'],
                  fontFamily: 'System',
                  fontSize: 16,
                  fontWeight: '700',
                  marginBottom: 20,
                  marginLeft: 6,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'Tap & Approve'}
            </Text>

            <View>
              {/* Allow Notifications Unselected Touchable */}
              <>
                {Constants['pushNotificationsAllowed'] ? null : (
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          setGlobalVariableValue({
                            key: 'showAllowNotificationsNextButton',
                            value: true,
                          });
                          const pushToken = await Utils.getPushToken({});
                          await swaggerAPIUpdatePushNotificationTokenGET.mutateAsync(
                            {
                              internalId: Constants['internalId'],
                              pushToken: pushToken,
                            }
                          );
                          setGlobalVariableValue({
                            key: 'pushNotificationsAllowed',
                            value: pushToken,
                          });
                          segmentLogTrack(
                            segment,
                            "Allowed/Didn't Allow push notifications onboarding",
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
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: theme.colors.divider,
                          borderRadius: 8,
                          flexDirection: 'row',
                          height: 65,
                          justifyContent: 'space-between',
                          paddingBottom: 12,
                          paddingLeft: 14,
                          paddingRight: 12,
                          paddingTop: 12,
                        },
                        dimensions.width
                      )}
                    >
                      <View>
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Light_low_importance_text'],
                              fontFamily: 'System',
                              fontSize: 16,
                              fontWeight: '700',
                            },
                            dimensions.width
                          )}
                        >
                          {'Allow push notifications'}
                        </Text>
                      </View>

                      <View
                        style={StyleSheet.applyWidth(
                          { paddingRight: 2 },
                          dimensions.width
                        )}
                      >
                        <Icon
                          size={28}
                          color={theme.colors['Light_low_importance_text']}
                          name={'FontAwesome/circle-thin'}
                        />
                      </View>
                    </View>
                  </Touchable>
                )}
              </>
              {/* Allow Notifications Selected Touchable */}
              <>
                {!Constants['pushNotificationsAllowed'] ? null : (
                  <Touchable
                    onPress={() => {
                      try {
                        setGlobalVariableValue({
                          key: 'pushNotificationsAllowed',
                          value: false,
                        });
                        segmentLogTrack(
                          segment,
                          'Push Notifications turned off',
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
                    }}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderBottomWidth: 2,
                          borderColor: theme.colors['Primary'],
                          borderLeftWidth: 2,
                          borderRadius: 8,
                          borderRightWidth: 2,
                          borderTopWidth: 2,
                          flexDirection: 'row',
                          height: 65,
                          justifyContent: 'space-between',
                          paddingBottom: 12,
                          paddingLeft: 12,
                          paddingRight: 12,
                          paddingTop: 12,
                        },
                        dimensions.width
                      )}
                    >
                      <View>
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Primary'],
                              fontFamily: 'System',
                              fontSize: 16,
                              fontWeight: '700',
                            },
                            dimensions.width
                          )}
                        >
                          {'Allow push notifications'}
                        </Text>
                      </View>

                      <View>
                        <Icon
                          name={'Ionicons/ios-checkmark-circle'}
                          size={28}
                          color={theme.colors['Primary']}
                        />
                      </View>
                    </View>
                  </Touchable>
                )}
              </>
            </View>
          </View>
        </View>

        <View
          style={StyleSheet.applyWidth(
            {
              borderColor: theme.colors.divider,
              borderTopWidth: 1,
              justifyContent: 'center',
              minHeight: 50,
              paddingBottom: 34,
              paddingLeft: 34,
              paddingRight: 34,
              paddingTop: 32,
            },
            dimensions.width
          )}
        >
          <>
            {Constants['showAllowNotificationsBackButton'] ? null : (
              <View>
                {/* Next_Enabled */}
                <>
                  {!Constants['showAllowNotificationsNextButton'] ? null : (
                    <Button
                      onPress={() => {
                        try {
                          setGlobalVariableValue({
                            key: 'userPushNotificationsPrompt',
                            value: true,
                          });
                          navigation.navigate('CreateProfileBetaStack', {
                            screen: 'ManageBooksScreen',
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.primary,
                          borderRadius: 8,
                          borderWidth: 1,
                          color: theme.colors.strongTextOnGoldButtons,
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '700',
                          minHeight: 54,
                          textAlign: 'center',
                        },
                        dimensions.width
                      )}
                      title={'Next'}
                      disabled={false}
                    >
                      {'Log In'}
                    </Button>
                  )}
                </>
                {/* Next_Disabled */}
                <>
                  {Constants['showAllowNotificationsNextButton'] ? null : (
                    <Button
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor:
                            theme.colors['Light_low_importance_text'],
                          borderRadius: 8,
                          borderWidth: 1,
                          color: theme.colors['Background Inverse (Main Font)'],
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '700',
                          minHeight: 54,
                          textAlign: 'center',
                        },
                        dimensions.width
                      )}
                      title={'Next'}
                      disabled={true}
                    >
                      {'Log In'}
                    </Button>
                  )}
                </>
              </View>
            )}
          </>
          {/* Done */}
          <>
            {!Constants['showAllowNotificationsBackButton'] ? null : (
              <Button
                onPress={() => {
                  try {
                    navigation.goBack();
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.primary,
                    borderRadius: 8,
                    borderWidth: 1,
                    color: theme.colors.strongTextOnGoldButtons,
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '700',
                    minHeight: 54,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                disabled={false}
                title={'Done'}
              >
                {'Log In'}
              </Button>
            )}
          </>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(AllowNotificationsScreen);
