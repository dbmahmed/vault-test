import React from 'react';
import * as CustomCode from '../CustomCode';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Circle,
  CircleImage,
  Divider,
  Icon,
  LinearGradient,
  ScreenContainer,
  Surface,
  Swiper,
  SwiperItem,
  Switch,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useAnalytics } from '@segment/analytics-react-native';
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Vibration,
  View,
  useWindowDimensions,
} from 'react-native';

const SubscriptionScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const subscriptionPriceAnnualPerMonth = x => {
    return (Math.round((x / 12) * 100) / 100).toFixed(2);
  };

  const getLeague = x => {
    return x[0];
  };

  const getBetType = x => {
    return x[1];
  };

  const typeMoneylineCompare = x => {
    return x === 'h2h';
  };

  const bestOddsMoneylineAway = x => {
    let arr = [4, 5, 6, 7, 8, 9, 10];
    temp = 0;

    arr.forEach(element => {
      if (temp < element) {
        temp = element;
      }
    });
  };

  const unitSizeCompare = x => {
    return Constants.userDefaultUnitSize > x
      ? 'for the entire year!'
      : 'every month!';
  };

  const vibrateOnPress = () => {
    Vibration.vibrate(1200, false);
  };

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const [dummy, setDummy] = React.useState(1);

  return (
    <ScreenContainer hasTopSafeArea={true} scrollable={false}>
      {/* Menu Bar */}
      <View
        style={StyleSheet.applyWidth(
          GlobalStyles.ViewStyles(theme)['Back button bar Jan 19 2025'],
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
              { alignItems: 'flex-start', borderRadius: 0, width: '25%' },
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
              </View>
            </Touchable>
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                maxHeight: 50,
                width: '50%',
              },
              dimensions.width
            )}
          >
            {/* Select Members */}
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Background Inverse (Main Font)'],
                  fontFamily: 'System',
                  fontSize: 18,
                  fontWeight: '600',
                }),
                dimensions.width
              )}
            >
              {'Name Group'}
            </Text>
          </View>
          {/* Right Button */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'flex-end', borderRadius: 0, width: '25%' },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('MainTabNavigator', {
                    screen: 'ChatsStack',
                    params: { screen: 'ChatsScreen' },
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 50,
                    justifyContent: 'center',
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Create */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Background Inverse (Main Font)'],
                      fontSize: 18,
                    },
                    dimensions.width
                  )}
                >
                  {'Create'}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
      </View>
      {/* Name Group */}
      <View>
        <ScrollView
          style={StyleSheet.applyWidth({ height: '100%' }, dimensions.width)}
          contentContainerStyle={StyleSheet.applyWidth(
            { paddingLeft: 16, paddingRight: 16 },
            dimensions.width
          )}
          showsVerticalScrollIndicator={true}
          bounces={true}
          showsHorizontalScrollIndicator={false}
        >
          {/* Name and Photo */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: theme.colors['Divider'],
                borderRadius: 8,
                flexDirection: 'row',
                marginTop: 22,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width
            )}
          >
            <Touchable
              style={StyleSheet.applyWidth(
                { marginRight: 16 },
                dimensions.width
              )}
              activeOpacity={0.8}
              disabledOpacity={0.8}
            >
              {/* Default Profile Picture */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderColor: theme.colors['NFT_TIME_Icons'],
                    borderRadius: 32,
                    borderWidth: 2,
                    height: 64,
                    justifyContent: 'center',
                    width: 64,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  name={'Ionicons/ios-camera-outline'}
                  size={35}
                  color={theme.colors['Background Inverse (Main Font)']}
                />
              </View>
            </Touchable>
            <TextInput
              onChangeText={newTextInputValue => {
                try {
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Background Inverse (Main Font)'],
                  fontSize: 18,
                },
                dimensions.width
              )}
              placeholder={'Group Name (Required)'}
              placeholderTextColor={theme.colors['Light_low_importance_text']}
              clearButtonMode={'never'}
              autoCapitalize={'words'}
            />
          </View>
          {/* Group Options */}
          <View
            style={StyleSheet.applyWidth(
              { borderRadius: 8, marginTop: 24, overflow: 'hidden' },
              dimensions.width
            )}
          >
            <Touchable activeOpacity={0.8} disabledOpacity={0.8}>
              <Surface
                style={StyleSheet.applyWidth(
                  { backgroundColor: theme.colors.divider, minHeight: 40 },
                  dimensions.width
                )}
                elevation={1}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginLeft: 8,
                      marginRight: 8,
                      minHeight: 50,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    <Icon
                      style={StyleSheet.applyWidth(
                        { marginLeft: 12, marginRight: 12 },
                        dimensions.width
                      )}
                      size={24}
                      name={'MaterialCommunityIcons/account-group'}
                      color={theme.colors['Background Inverse (Main Font)']}
                    />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {'New Group'}
                    </Text>
                  </View>
                  <Icon
                    name={'Ionicons/ios-chevron-forward'}
                    size={24}
                    color={theme.colors['Light_low_importance_text']}
                  />
                </View>
              </Surface>
            </Touchable>
            <Divider
              style={StyleSheet.applyWidth({ height: 0.5 }, dimensions.width)}
              height={1}
              color={theme.colors.nFTTIMEIcons}
            />
            <Surface
              style={StyleSheet.applyWidth(
                { backgroundColor: theme.colors.divider, minHeight: 40 },
                dimensions.width
              )}
              elevation={1}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    minHeight: 50,
                    paddingLeft: 8,
                    paddingRight: 12,
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  <Icon
                    style={StyleSheet.applyWidth(
                      { marginLeft: 12, marginRight: 12 },
                      dimensions.width
                    )}
                    size={24}
                    name={'MaterialCommunityIcons/account-group'}
                    color={theme.colors['Background Inverse (Main Font)']}
                  />
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.backgroundInverseMainFont,
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '700',
                      },
                      dimensions.width
                    )}
                  >
                    {'New Group'}
                  </Text>
                </View>
                <Switch
                  onValueChange={newSwitchValue => {
                    try {
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  activeTrackColor={theme.colors['Good']}
                />
              </View>
            </Surface>
          </View>
          {/* Members List */}
          <View
            style={StyleSheet.applyWidth({ marginTop: 32 }, dimensions.width)}
          >
            {/* Members */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Background Inverse (Main Font)'],
                  fontFamily: 'System',
                  fontSize: 18,
                  fontWeight: '600',
                  marginBottom: 10,
                  marginLeft: 6,
                },
                dimensions.width
              )}
            >
              {'Members'}
            </Text>

            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 8, overflow: 'hidden' },
                dimensions.width
              )}
            >
              <Surface
                style={StyleSheet.applyWidth(
                  { backgroundColor: theme.colors.divider },
                  dimensions.width
                )}
                elevation={1}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      minHeight: 50,
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    <Circle
                      size={38}
                      bgColor={theme.colors['Background Inverse (Main Font)']}
                    >
                      {/* Default Profile Picture */}
                      <Circle
                        bgColor={theme.colors.lightLowImportanceText}
                        size={38}
                      >
                        <LinearGradient
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              height: '100%',
                              justifyContent: 'center',
                              width: '100%',
                            },
                            dimensions.width
                          )}
                          endY={100}
                          endX={100}
                          color2={theme.colors.divider}
                          color1={theme.colors.lightLowImportanceText}
                        >
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.backgroundInverseMainFont,
                                fontFamily: 'System',
                                fontSize: 20,
                                fontWeight: '400',
                                textAlign: 'center',
                                textTransform: 'uppercase',
                              },
                              dimensions.width
                            )}
                          >
                            {'FL'}
                          </Text>
                        </LinearGradient>
                      </Circle>
                    </Circle>

                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontSize: 18,
                          fontWeight: '400',
                          marginLeft: 12,
                        },
                        dimensions.width
                      )}
                    >
                      {'First Last'}
                    </Text>
                  </View>
                </View>
              </Surface>

              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                <Divider
                  style={StyleSheet.applyWidth(
                    { height: 0.5, width: 70 },
                    dimensions.width
                  )}
                  color={theme.colors['Divider']}
                />
                <Divider
                  style={StyleSheet.applyWidth(
                    { height: 0.5, width: '100%' },
                    dimensions.width
                  )}
                  color={theme.colors['NFT_TIME_Icons']}
                />
              </View>

              <Surface
                style={StyleSheet.applyWidth(
                  { backgroundColor: theme.colors.divider },
                  dimensions.width
                )}
                elevation={1}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      minHeight: 50,
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    <Circle
                      size={38}
                      bgColor={theme.colors['Background Inverse (Main Font)']}
                    >
                      {/* Default Profile Picture */}
                      <Circle
                        bgColor={theme.colors.lightLowImportanceText}
                        size={38}
                      >
                        <LinearGradient
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              height: '100%',
                              justifyContent: 'center',
                              width: '100%',
                            },
                            dimensions.width
                          )}
                          endY={100}
                          endX={100}
                          color2={theme.colors.divider}
                          color1={theme.colors.lightLowImportanceText}
                        >
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.backgroundInverseMainFont,
                                fontFamily: 'System',
                                fontSize: 20,
                                fontWeight: '400',
                                textAlign: 'center',
                                textTransform: 'uppercase',
                              },
                              dimensions.width
                            )}
                          >
                            {'FL'}
                          </Text>
                        </LinearGradient>
                      </Circle>
                    </Circle>

                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontSize: 18,
                          fontWeight: '400',
                          marginLeft: 12,
                        },
                        dimensions.width
                      )}
                    >
                      {'First Last'}
                    </Text>
                  </View>
                </View>
              </Surface>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(SubscriptionScreen);
