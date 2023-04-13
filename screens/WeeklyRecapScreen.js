import React from 'react';
import * as CustomCode from '../CustomCode';
import * as SwaggerAPIApi from '../apis/SwaggerAPIApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import abbrTeamName from '../global-functions/abbrTeamName';
import atRiskZero from '../global-functions/atRiskZero';
import cashoutOutcomeCompare from '../global-functions/cashoutOutcomeCompare';
import dateStandard from '../global-functions/dateStandard';
import eventNotExist from '../global-functions/eventNotExist';
import futureBetExists from '../global-functions/futureBetExists';
import lineSyntax from '../global-functions/lineSyntax';
import liveBetExists from '../global-functions/liveBetExists';
import lossOutcomeCompare from '../global-functions/lossOutcomeCompare';
import oddsAmericanSyntax from '../global-functions/oddsAmericanSyntax';
import parlayLegCount from '../global-functions/parlayLegCount';
import pendingOutcomeCompare from '../global-functions/pendingOutcomeCompare';
import propDetailsMetricSpecial from '../global-functions/propDetailsMetricSpecial';
import propositionTotal from '../global-functions/propositionTotal';
import propositionUncommonDisplay from '../global-functions/propositionUncommonDisplay';
import pushOutcomeCompare from '../global-functions/pushOutcomeCompare';
import segmentExists from '../global-functions/segmentExists';
import segmentLogScreen from '../global-functions/segmentLogScreen';
import showParlayBookDescription from '../global-functions/showParlayBookDescription';
import spacingSyntax from '../global-functions/spacingSyntax';
import typeMultilegCompare from '../global-functions/typeMultilegCompare';
import typeParlayCompare from '../global-functions/typeParlayCompare';
import typeSingleCompare from '../global-functions/typeSingleCompare';
import typeTeaserCompare from '../global-functions/typeTeaserCompare';
import voidOutcomeCompare from '../global-functions/voidOutcomeCompare';
import winOutcomeCompare from '../global-functions/winOutcomeCompare';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Icon,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const WeeklyRecapScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const checkNetProfitPositive = x => {
    return x > 0 ? true : false;
  };

  const firstArrayItem = x => {
    return [x[0]];
  };

  // Checks the bet ids in order to only show one of them if they are the same
  const checkNotSameBet = x => {
    return x.highestOddsBetWon.id != x.mostProfitableBetWon.id ? true : false;
  };

  const checkWeeklyRecapSlide1 = x => {
    //checkWeeklyRecapSlide1
    return x == 1;
  };

  const checkWeeklyRecapSlide3 = x => {
    //checkWeeklyRecapSlide3
    return x == 3;
  };

  const checkWeeklyRecapSlide2 = x => {
    //checkWeeklyRecapSlide2
    return x == 2;
  };

  const checkWeeklyRecapSlide4 = x => {
    //checkWeeklyRecapSlide4
    return x == 4;
  };

  const checkWeeklyRecapSlide5 = x => {
    //checkWeeklyRecapSlide5
    return x == 5;
  };

  const checkWeeklyRecapSlideNot6 = x => {
    //checkWeeklyRecapSlideNot6
    return x <= 5;

    // if true, then stop
  };

  const firstThreeArrayItems = x => {
    if (x === null) {
      return x;
    } else if (x.length < 4) {
      return x;
    } else {
      return x.slice(0, 3);
    }

    // to get first entry in an array: return [x[0]]
  };

  const roiSyntax = x => {
    return x > 0
      ? `+${Math.round(x * 10000) / 100}%`
      : `${Math.round(x * 10000) / 100}%`;
  };

  const userDefaultUnitSizeError = userDefaultUnitSize => {
    return userDefaultUnitSize >= 1 ? false : true;
  };

  const checkWeeklyRecapSlide6 = x => {
    //checkWeeklyRecapSlide6
    return x == 6;
  };

  const capitalizeFirstLetter = x => {
    if (x !== null) {
      const str = x.charAt(0).toUpperCase() + x.slice(1);
      return str;
    } else {
      return x;
    }
  };

  const winningsSyntax = x => {
    let res = (Math.abs(x) / 100).toFixed(2);
    let lastIndex = res[res.length - 1];
    let secondLastIndex = res[res.length - 2];
    const comp = lastIndex == 0 && secondLastIndex == 0;
    if (comp) {
      res = parseInt(res);
    }

    return '+$' + res;

    /*
if(netProfit < 0) {
return "-$" + res;
} else {
return "$" + res;
}
*/
  };

  const netProfitSyntax = x => {
    let res = (Math.abs(x) / 100).toFixed(2);
    let lastIndex = res[res.length - 1];
    let secondLastIndex = res[res.length - 2];
    const comp = lastIndex == 0 && secondLastIndex == 0;
    if (comp) {
      res = parseInt(res);
    }

    if (x < 0) {
      return '-$' + res;
    } else {
      return '$' + res;
    }
  };

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
      segmentLogScreen(segment, 'Weekly Recap');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
    >
      <SwaggerAPIApi.FetchWeeklyRecapGET internalId={Constants['internalId']}>
        {({ loading, error, data, refetchWeeklyRecap }) => {
          const fetchData = data;
          if (!fetchData || loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return (
              <Text style={{ textAlign: 'center' }}>
                There was a problem fetching this data
              </Text>
            );
          }

          return (
            <>
              {/* 1_Favorite Bets */}
              <>
                {!checkWeeklyRecapSlide1(
                  Constants['weeklyRecapSlide']
                ) ? null : (
                  <ImageBackground
                    style={StyleSheet.applyWidth(
                      { height: '100%', width: '100%' },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.FavoriteBetsRecap}
                  >
                    {/* Progress Bar Main */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: 6,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 6,
                        },
                        dimensions.width
                      )}
                    >
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                    {/* Menu Bar */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 0, justifyContent: 'center' },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flexDirection: 'row',
                            height: 50,
                            justifyContent: 'space-between',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Left Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              borderRadius: 0,
                              flexDirection: 'row',
                              paddingLeft: 16,
                              width: '67%',
                            },
                            dimensions.width
                          )}
                        >
                          <Image
                            style={StyleSheet.applyWidth(
                              { height: 28, marginRight: 8, width: 100 },
                              dimensions.width
                            )}
                            resizeMode={'contain'}
                            source={Images.VaultLogoRecap}
                          />
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color:
                                  theme.colors['Light_low_importance_text'],
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                              },
                              dimensions.width
                            )}
                          >
                            {'#VaultRecap'}
                          </Text>
                        </View>
                        {/* Right Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-end',
                              borderRadius: 0,
                              width: '33%',
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
                                  alignItems: 'flex-end',
                                  justifyContent: 'center',
                                  minHeight: 50,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Back */}
                              <Icon
                                color={theme.colors.lightInverse}
                                size={28}
                                name={'Ionicons/ios-close'}
                              />
                            </View>
                          </Touchable>
                        </View>
                      </View>
                    </View>
                    {/* Content */}
                    <View>
                      {/* Favorite Things */}
                      <View>
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              marginTop: 10,
                              paddingLeft: 16,
                              paddingRight: 16,
                            },
                            dimensions.width
                          )}
                        >
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.backgroundInverseMainFont,
                                fontFamily: 'System',
                                fontSize: 28,
                                fontWeight: '700',
                                paddingTop: 10,
                                textAlign: 'left',
                              },
                              dimensions.width
                            )}
                          >
                            {'Your favorite things to bet on this week'}
                          </Text>
                        </View>
                        {/* League */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 48,
                              paddingLeft: 16,
                              paddingRight: 16,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-end',
                                borderColor:
                                  theme.colors['Light_low_importance_text'],
                                borderRightWidth: 1,
                                justifyContent: 'center',
                                paddingBottom: 8,
                                paddingRight: 12,
                                paddingTop: 8,
                                width: '50%',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Label */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    theme.colors['Light_low_importance_text'],
                                  fontSize: 16,
                                  textAlign: 'right',
                                },
                                dimensions.width
                              )}
                            >
                              {'League'}
                            </Text>
                            {/* Item */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    theme.colors[
                                      'Background Inverse (Main Font)'
                                    ],
                                  fontFamily: 'System',
                                  fontSize: 28,
                                  fontWeight: '700',
                                  textAlign: 'right',
                                },
                                dimensions.width
                              )}
                            >
                              {fetchData?.favoriteLeague}
                            </Text>
                          </View>

                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingBottom: 8,
                                paddingLeft: 12,
                                paddingTop: 8,
                                width: '50%',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Bet Quantity */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    theme.colors[
                                      'Background Inverse (Main Font)'
                                    ],
                                  fontFamily: 'System',
                                  fontSize: 24,
                                  fontWeight: '400',
                                },
                                dimensions.width
                              )}
                            >
                              {fetchData?.favoriteLeagueCount}
                              {' bets'}
                            </Text>
                          </View>
                        </View>
                        {/* Team */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 48,
                              paddingLeft: 16,
                              paddingRight: 16,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-end',
                                borderColor:
                                  theme.colors['Light_low_importance_text'],
                                borderRightWidth: 1,
                                justifyContent: 'center',
                                paddingBottom: 8,
                                paddingRight: 12,
                                paddingTop: 8,
                                width: '50%',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Label */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    theme.colors['Light_low_importance_text'],
                                  fontSize: 16,
                                  textAlign: 'right',
                                },
                                dimensions.width
                              )}
                            >
                              {'Team'}
                            </Text>
                            {/* Item */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    theme.colors[
                                      'Background Inverse (Main Font)'
                                    ],
                                  fontFamily: 'System',
                                  fontSize: 28,
                                  fontWeight: '700',
                                  textAlign: 'right',
                                },
                                dimensions.width
                              )}
                            >
                              {fetchData?.favoriteTeam}
                            </Text>
                          </View>

                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingBottom: 8,
                                paddingLeft: 12,
                                paddingTop: 8,
                                width: '50%',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Bet Quantity */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    theme.colors[
                                      'Background Inverse (Main Font)'
                                    ],
                                  fontFamily: 'System',
                                  fontSize: 24,
                                  fontWeight: '400',
                                },
                                dimensions.width
                              )}
                            >
                              {fetchData?.favoriteTeamCount}
                              {' bets'}
                            </Text>
                          </View>
                        </View>
                        {/* Bet Type */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 48,
                              paddingLeft: 16,
                              paddingRight: 16,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-end',
                                borderColor:
                                  theme.colors['Light_low_importance_text'],
                                borderRightWidth: 1,
                                justifyContent: 'center',
                                paddingBottom: 8,
                                paddingRight: 12,
                                paddingTop: 8,
                                width: '50%',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Label */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    theme.colors['Light_low_importance_text'],
                                  fontSize: 16,
                                  textAlign: 'right',
                                },
                                dimensions.width
                              )}
                            >
                              {'Bet Type'}
                            </Text>
                            {/* Item */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    theme.colors[
                                      'Background Inverse (Main Font)'
                                    ],
                                  fontFamily: 'System',
                                  fontSize: 28,
                                  fontWeight: '700',
                                  textAlign: 'right',
                                },
                                dimensions.width
                              )}
                            >
                              {capitalizeFirstLetter(
                                fetchData?.favoriteBetType
                              )}
                            </Text>
                          </View>

                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingBottom: 8,
                                paddingLeft: 12,
                                paddingTop: 8,
                                width: '50%',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Bet Quantity */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    theme.colors[
                                      'Background Inverse (Main Font)'
                                    ],
                                  fontFamily: 'System',
                                  fontSize: 24,
                                  fontWeight: '400',
                                },
                                dimensions.width
                              )}
                            >
                              {fetchData?.favoriteBetTypeCount}
                              {' bets'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                )}
              </>
              {/* 2_Most Profitable Leauges */}
              <>
                {!checkWeeklyRecapSlide2(
                  Constants['weeklyRecapSlide']
                ) ? null : (
                  <ImageBackground
                    style={StyleSheet.applyWidth(
                      { height: '100%', width: '100%' },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.MostProfitableRecap}
                  >
                    {/* Progress Bar Main */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: 6,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 6,
                        },
                        dimensions.width
                      )}
                    >
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                    {/* Menu Bar */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 0, justifyContent: 'center' },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flexDirection: 'row',
                            height: 50,
                            justifyContent: 'space-between',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Left Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              borderRadius: 0,
                              flexDirection: 'row',
                              paddingLeft: 16,
                              width: '67%',
                            },
                            dimensions.width
                          )}
                        >
                          <Image
                            style={StyleSheet.applyWidth(
                              { height: 28, marginRight: 8, width: 100 },
                              dimensions.width
                            )}
                            resizeMode={'contain'}
                            source={Images.VaultLogoRecap}
                          />
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color:
                                  theme.colors['Light_low_importance_text'],
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                              },
                              dimensions.width
                            )}
                          >
                            {'#VaultRecap'}
                          </Text>
                        </View>
                        {/* Right Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-end',
                              borderRadius: 0,
                              width: '33%',
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
                                  alignItems: 'flex-end',
                                  justifyContent: 'center',
                                  minHeight: 50,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Back */}
                              <Icon
                                color={theme.colors.lightInverse}
                                size={28}
                                name={'Ionicons/ios-close'}
                              />
                            </View>
                          </Touchable>
                        </View>
                      </View>
                    </View>
                    {/* Content */}
                    <View>
                      {/* Most Profitable */}
                      <View>
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              marginTop: 10,
                              paddingLeft: 16,
                              paddingRight: 16,
                            },
                            dimensions.width
                          )}
                        >
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.backgroundInverseMainFont,
                                fontFamily: 'System',
                                fontSize: 28,
                                fontWeight: '700',
                                paddingTop: 10,
                                textAlign: 'left',
                              },
                              dimensions.width
                            )}
                          >
                            {'Your most profitable leagues were'}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            { height: '100%', marginTop: 36 },
                            dimensions.width
                          )}
                        >
                          <FlatList
                            data={firstThreeArrayItems(
                              fetchData?.mostProfitableLeagues
                            )}
                            listKey={'GUC6A7J8'}
                            keyExtractor={listData =>
                              listData?.id ||
                              listData?.uuid ||
                              JSON.stringify(listData)
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <>
                                  {/* League */}
                                  <Surface
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        backgroundColor:
                                          theme.colors['Divider'],
                                        borderRadius: 8,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 12,
                                        minHeight: 40,
                                        paddingBottom: 12,
                                        paddingLeft: 12,
                                        paddingRight: 12,
                                        paddingTop: 12,
                                      },
                                      dimensions.width
                                    )}
                                    elevation={1}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'flex-start',
                                          justifyContent: 'center',
                                          width: '60%',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Item */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors[
                                                'Background Inverse (Main Font)'
                                              ],
                                            fontFamily: 'System',
                                            fontSize: 28,
                                            fontWeight: '700',
                                            textAlign: 'left',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.name}
                                      </Text>
                                    </View>

                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'flex-end',
                                          justifyContent: 'center',
                                          width: '35%',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Net Profit */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Good'],
                                            fontFamily: 'System',
                                            fontSize: 24,
                                            fontWeight: '700',
                                            textAlign: 'right',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {netProfitSyntax(listData?.netProfit)}
                                      </Text>
                                      {/* ROI */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors[
                                                'Background Inverse (Main Font)'
                                              ],
                                            fontFamily: 'System',
                                            fontSize: 18,
                                            fontWeight: '400',
                                            textAlign: 'right',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {roiSyntax(listData?.roi)}
                                        {' ROI'}
                                      </Text>
                                    </View>
                                  </Surface>
                                </>
                              );
                            }}
                            contentContainerStyle={StyleSheet.applyWidth(
                              { flex: 1 },
                              dimensions.width
                            )}
                            numColumns={1}
                          />
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                )}
              </>
              {/* 3_Most Profitable Teams */}
              <>
                {!checkWeeklyRecapSlide3(
                  Constants['weeklyRecapSlide']
                ) ? null : (
                  <ImageBackground
                    style={StyleSheet.applyWidth(
                      { height: '100%', width: '100%' },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.MostProfitableRecap}
                  >
                    {/* Progress Bar Main */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: 6,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 6,
                        },
                        dimensions.width
                      )}
                    >
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                    {/* Menu Bar */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 0, justifyContent: 'center' },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flexDirection: 'row',
                            height: 50,
                            justifyContent: 'space-between',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Left Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              borderRadius: 0,
                              flexDirection: 'row',
                              paddingLeft: 16,
                              width: '67%',
                            },
                            dimensions.width
                          )}
                        >
                          <Image
                            style={StyleSheet.applyWidth(
                              { height: 28, marginRight: 8, width: 100 },
                              dimensions.width
                            )}
                            resizeMode={'contain'}
                            source={Images.VaultLogoRecap}
                          />
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color:
                                  theme.colors['Light_low_importance_text'],
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                              },
                              dimensions.width
                            )}
                          >
                            {'#VaultRecap'}
                          </Text>
                        </View>
                        {/* Right Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-end',
                              borderRadius: 0,
                              width: '33%',
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
                                  alignItems: 'flex-end',
                                  justifyContent: 'center',
                                  minHeight: 50,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Back */}
                              <Icon
                                color={theme.colors.lightInverse}
                                size={28}
                                name={'Ionicons/ios-close'}
                              />
                            </View>
                          </Touchable>
                        </View>
                      </View>
                    </View>
                    {/* Content */}
                    <View>
                      {/* Most Profitable */}
                      <View>
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              marginTop: 10,
                              paddingLeft: 16,
                              paddingRight: 16,
                            },
                            dimensions.width
                          )}
                        >
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.backgroundInverseMainFont,
                                fontFamily: 'System',
                                fontSize: 28,
                                fontWeight: '700',
                                paddingTop: 10,
                                textAlign: 'left',
                              },
                              dimensions.width
                            )}
                          >
                            {'Your most profitable teams were'}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            { height: '100%', marginTop: 36 },
                            dimensions.width
                          )}
                        >
                          <FlatList
                            data={firstThreeArrayItems(
                              fetchData?.mostProfitableTeams
                            )}
                            listKey={'Gu6wjsHT'}
                            keyExtractor={listData =>
                              listData?.id ||
                              listData?.uuid ||
                              JSON.stringify(listData)
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <>
                                  {/* Team */}
                                  <Surface
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        backgroundColor:
                                          theme.colors['Divider'],
                                        borderRadius: 8,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 12,
                                        minHeight: 40,
                                        paddingBottom: 12,
                                        paddingLeft: 12,
                                        paddingRight: 12,
                                        paddingTop: 12,
                                      },
                                      dimensions.width
                                    )}
                                    elevation={1}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'flex-start',
                                          justifyContent: 'center',
                                          width: '60%',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Item */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors[
                                                'Background Inverse (Main Font)'
                                              ],
                                            fontFamily: 'System',
                                            fontSize: 28,
                                            fontWeight: '700',
                                            textAlign: 'left',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.name}
                                      </Text>
                                    </View>

                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'flex-end',
                                          justifyContent: 'center',
                                          width: '35%',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Net Profit */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Good'],
                                            fontFamily: 'System',
                                            fontSize: 24,
                                            fontWeight: '700',
                                            textAlign: 'right',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {netProfitSyntax(listData?.netProfit)}
                                      </Text>
                                      {/* ROI */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors[
                                                'Background Inverse (Main Font)'
                                              ],
                                            fontFamily: 'System',
                                            fontSize: 18,
                                            fontWeight: '400',
                                            textAlign: 'right',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {roiSyntax(listData?.roi)}
                                        {' ROI'}
                                      </Text>
                                    </View>
                                  </Surface>
                                </>
                              );
                            }}
                            contentContainerStyle={StyleSheet.applyWidth(
                              { flex: 1 },
                              dimensions.width
                            )}
                            numColumns={1}
                          />
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                )}
              </>
              {/* 4_Most Profitable Bet Types */}
              <>
                {!checkWeeklyRecapSlide4(
                  Constants['weeklyRecapSlide']
                ) ? null : (
                  <ImageBackground
                    style={StyleSheet.applyWidth(
                      { height: '100%', width: '100%' },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.MostProfitableRecap}
                  >
                    {/* Progress Bar Main */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: 6,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 6,
                        },
                        dimensions.width
                      )}
                    >
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                    {/* Menu Bar */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 0, justifyContent: 'center' },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flexDirection: 'row',
                            height: 50,
                            justifyContent: 'space-between',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Left Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              borderRadius: 0,
                              flexDirection: 'row',
                              paddingLeft: 16,
                              width: '67%',
                            },
                            dimensions.width
                          )}
                        >
                          <Image
                            style={StyleSheet.applyWidth(
                              { height: 28, marginRight: 8, width: 100 },
                              dimensions.width
                            )}
                            resizeMode={'contain'}
                            source={Images.VaultLogoRecap}
                          />
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color:
                                  theme.colors['Light_low_importance_text'],
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                              },
                              dimensions.width
                            )}
                          >
                            {'#VaultRecap'}
                          </Text>
                        </View>
                        {/* Right Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-end',
                              borderRadius: 0,
                              width: '33%',
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
                                  alignItems: 'flex-end',
                                  justifyContent: 'center',
                                  minHeight: 50,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Back */}
                              <Icon
                                color={theme.colors.lightInverse}
                                size={28}
                                name={'Ionicons/ios-close'}
                              />
                            </View>
                          </Touchable>
                        </View>
                      </View>
                    </View>
                    {/* Content */}
                    <View>
                      {/* Most Profitable */}
                      <View>
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              marginTop: 10,
                              paddingLeft: 16,
                              paddingRight: 16,
                            },
                            dimensions.width
                          )}
                        >
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.backgroundInverseMainFont,
                                fontFamily: 'System',
                                fontSize: 28,
                                fontWeight: '700',
                                paddingTop: 10,
                                textAlign: 'left',
                              },
                              dimensions.width
                            )}
                          >
                            {'Your most profitable bet types were'}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            { height: '100%', marginTop: 36 },
                            dimensions.width
                          )}
                        >
                          <FlatList
                            data={firstThreeArrayItems(
                              fetchData?.mostProfitableBetTypes
                            )}
                            listKey={'9wfHmZOR'}
                            keyExtractor={listData =>
                              listData?.id ||
                              listData?.uuid ||
                              JSON.stringify(listData)
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <>
                                  {/* Bet Type */}
                                  <Surface
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        backgroundColor:
                                          theme.colors['Divider'],
                                        borderRadius: 8,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginLeft: 16,
                                        marginRight: 16,
                                        marginTop: 12,
                                        minHeight: 40,
                                        paddingBottom: 12,
                                        paddingLeft: 12,
                                        paddingRight: 12,
                                        paddingTop: 12,
                                      },
                                      dimensions.width
                                    )}
                                    elevation={1}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'flex-start',
                                          justifyContent: 'center',
                                          width: '60%',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Item */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors[
                                                'Background Inverse (Main Font)'
                                              ],
                                            fontFamily: 'System',
                                            fontSize: 28,
                                            fontWeight: '700',
                                            textAlign: 'left',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {capitalizeFirstLetter(listData?.name)}
                                      </Text>
                                    </View>

                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'flex-end',
                                          justifyContent: 'center',
                                          width: '35%',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Net Profit */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Good'],
                                            fontFamily: 'System',
                                            fontSize: 24,
                                            fontWeight: '700',
                                            textAlign: 'right',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {netProfitSyntax(listData?.netProfit)}
                                      </Text>
                                      {/* ROI */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors[
                                                'Background Inverse (Main Font)'
                                              ],
                                            fontFamily: 'System',
                                            fontSize: 18,
                                            fontWeight: '400',
                                            textAlign: 'right',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {roiSyntax(listData?.roi)}
                                        {' ROI'}
                                      </Text>
                                    </View>
                                  </Surface>
                                </>
                              );
                            }}
                            contentContainerStyle={StyleSheet.applyWidth(
                              { flex: 1 },
                              dimensions.width
                            )}
                            numColumns={1}
                          />
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                )}
              </>
              {/* 5_Winnings */}
              <>
                {!checkWeeklyRecapSlide5(
                  Constants['weeklyRecapSlide']
                ) ? null : (
                  <ImageBackground
                    style={StyleSheet.applyWidth(
                      { height: '100%', width: '100%' },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.WinningsRecap}
                  >
                    {/* Progress Bar Main */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: 6,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 6,
                        },
                        dimensions.width
                      )}
                    >
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Off */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.3,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                    {/* Menu Bar */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 0, justifyContent: 'center' },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flexDirection: 'row',
                            height: 50,
                            justifyContent: 'space-between',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Left Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              borderRadius: 0,
                              flexDirection: 'row',
                              paddingLeft: 16,
                              width: '67%',
                            },
                            dimensions.width
                          )}
                        >
                          <Image
                            style={StyleSheet.applyWidth(
                              { height: 28, marginRight: 8, width: 100 },
                              dimensions.width
                            )}
                            resizeMode={'contain'}
                            source={Images.VaultLogoRecap}
                          />
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color:
                                  theme.colors['Light_low_importance_text'],
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                              },
                              dimensions.width
                            )}
                          >
                            {'#VaultRecap'}
                          </Text>
                        </View>
                        {/* Right Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-end',
                              borderRadius: 0,
                              width: '33%',
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
                                  alignItems: 'flex-end',
                                  justifyContent: 'center',
                                  minHeight: 50,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Back */}
                              <Icon
                                color={theme.colors.lightInverse}
                                size={28}
                                name={'Ionicons/ios-close'}
                              />
                            </View>
                          </Touchable>
                        </View>
                      </View>
                    </View>
                    {/* Content */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1 },
                        dimensions.width
                      )}
                    >
                      {/* Winnings */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flex: 1,
                            justifyContent: 'space-around',
                            paddingBottom: 75,
                            paddingTop: 75,
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              paddingLeft: 16,
                              paddingRight: 16,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Label */}
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color:
                                  theme.colors['Light_low_importance_text'],
                                fontFamily: 'System',
                                fontSize: 28,
                                fontWeight: '700',
                                textAlign: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            {'Number of Bets'}
                          </Text>
                          {/* Bets */}
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color:
                                  theme.colors[
                                    'Background Inverse (Main Font)'
                                  ],
                                fontFamily: 'System',
                                fontSize: 50,
                                fontWeight: '600',
                                marginTop: 24,
                                textAlign: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.numberOfBets}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              paddingLeft: 16,
                              paddingRight: 16,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Label */}
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color:
                                  theme.colors['Light_low_importance_text'],
                                fontFamily: 'System',
                                fontSize: 28,
                                fontWeight: '700',
                                textAlign: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            {'Winnings'}
                          </Text>
                          {/* Winnings */}
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Good'],
                                fontFamily: 'System',
                                fontSize: 50,
                                fontWeight: '600',
                                marginTop: 24,
                                textAlign: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            {winningsSyntax(fetchData?.winnings)}
                          </Text>
                        </View>
                        <>
                          {!(fetchData?.netProfit > 0) ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Label */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors['Light_low_importance_text'],
                                    fontFamily: 'System',
                                    fontSize: 28,
                                    fontWeight: '700',
                                    textAlign: 'center',
                                  },
                                  dimensions.width
                                )}
                              >
                                {'Net profit'}
                              </Text>
                              {/* Net Profit */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors['Good'],
                                    fontFamily: 'System',
                                    fontSize: 50,
                                    fontWeight: '900',
                                    marginTop: 24,
                                    textAlign: 'center',
                                  },
                                  dimensions.width
                                )}
                              >
                                {netProfitSyntax(fetchData?.netProfit)}
                              </Text>
                            </View>
                          )}
                        </>
                      </View>
                    </View>
                  </ImageBackground>
                )}
              </>
              {/* 6_Best Bets */}
              <>
                {!checkWeeklyRecapSlide6(
                  Constants['weeklyRecapSlide']
                ) ? null : (
                  <ImageBackground
                    style={StyleSheet.applyWidth(
                      { height: '100%', width: '100%' },
                      dimensions.width
                    )}
                    resizeMode={'cover'}
                    source={Images.BestBetRecap}
                  >
                    {/* Progress Bar Main */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: 6,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 6,
                        },
                        dimensions.width
                      )}
                    >
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* On */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              theme.colors['Background Inverse (Main Font)'],
                            borderRadius: 1,
                            flex: 1,
                            height: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                    {/* Menu Bar */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 0, justifyContent: 'center' },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flexDirection: 'row',
                            height: 50,
                            justifyContent: 'space-between',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Left Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              borderRadius: 0,
                              flexDirection: 'row',
                              paddingLeft: 16,
                              width: '67%',
                            },
                            dimensions.width
                          )}
                        >
                          <Image
                            style={StyleSheet.applyWidth(
                              { height: 28, marginRight: 8, width: 100 },
                              dimensions.width
                            )}
                            resizeMode={'contain'}
                            source={Images.VaultLogoRecap}
                          />
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color:
                                  theme.colors['Light_low_importance_text'],
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                              },
                              dimensions.width
                            )}
                          >
                            {'#VaultRecap'}
                          </Text>
                        </View>
                        {/* Right Button */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-end',
                              borderRadius: 0,
                              width: '33%',
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
                                  alignItems: 'flex-end',
                                  justifyContent: 'center',
                                  minHeight: 50,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Back */}
                              <Icon
                                color={theme.colors.lightInverse}
                                size={28}
                                name={'Ionicons/ios-close'}
                              />
                            </View>
                          </Touchable>
                        </View>
                      </View>
                    </View>
                    {/* Content */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1 },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          { marginTop: 75, paddingLeft: 16, paddingRight: 16 },
                          dimensions.width
                        )}
                      >
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.backgroundInverseMainFont,
                              fontFamily: 'System',
                              fontSize: 28,
                              fontWeight: '700',
                              paddingTop: 10,
                              textAlign: 'left',
                            },
                            dimensions.width
                          )}
                        >
                          {'Finally, your best bets!'}
                        </Text>
                      </View>

                      <View
                        style={StyleSheet.applyWidth(
                          {
                            height: '100%',
                            marginTop: 16,
                            paddingLeft: 16,
                            paddingRight: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Most Profitable Bet Surface */}
                        <Surface
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: theme.colors.divider,
                              borderRadius: 8,
                              marginTop: 10,
                            },
                            dimensions.width
                          )}
                          elevation={1}
                        >
                          {/* Bet Block */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors.divider,
                                borderBottomWidth: 1,
                                borderColor: theme.colors.divider,
                                borderLeftWidth: 1,
                                borderRadius: 8,
                                borderRightWidth: 1,
                                borderTopWidth: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingBottom: 6,
                                paddingLeft: 6,
                                paddingRight: 6,
                                paddingTop: 6,
                              },
                              dimensions.width
                            )}
                            collapsable={false}
                          >
                            {/* Left Align */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row', width: '70%' },
                                dimensions.width
                              )}
                            >
                              {/* Icon */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 6,
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Loss */}
                                <>
                                  {!lossOutcomeCompare(
                                    fetchData?.mostProfitableBetWon?.outcome
                                  ) ? null : (
                                    <Icon
                                      name={'Ionicons/ios-close-circle'}
                                      size={32}
                                      color={theme.colors.badErrorCancel}
                                    />
                                  )}
                                </>
                                {/* Win */}
                                <>
                                  {!winOutcomeCompare(
                                    fetchData?.mostProfitableBetWon?.outcome
                                  ) ? null : (
                                    <Icon
                                      name={'Ionicons/ios-checkmark-circle'}
                                      size={32}
                                      color={theme.colors.good}
                                    />
                                  )}
                                </>
                                {/* Push */}
                                <>
                                  {!pushOutcomeCompare(
                                    fetchData?.mostProfitableBetWon?.outcome
                                  ) ? null : (
                                    <Icon
                                      name={'Ionicons/ios-remove-circle'}
                                      size={32}
                                      color={
                                        theme.colors[
                                          'Background Inverse (Main Font)'
                                        ]
                                      }
                                    />
                                  )}
                                </>
                                {/* Void */}
                                <>
                                  {!voidOutcomeCompare(
                                    fetchData?.mostProfitableBetWon?.outcome
                                  ) ? null : (
                                    <Icon
                                      name={'Ionicons/ios-remove-circle'}
                                      size={32}
                                      color={
                                        theme.colors.lightLowImportanceText
                                      }
                                    />
                                  )}
                                </>
                                {/* Cashout */}
                                <>
                                  {!cashoutOutcomeCompare(
                                    fetchData?.mostProfitableBetWon?.outcome
                                  ) ? null : (
                                    <Icon
                                      name={'Ionicons/ios-arrow-undo-circle'}
                                      size={32}
                                      color={theme.colors.fair}
                                    />
                                  )}
                                </>
                              </View>
                              {/* Bet/Odds/Teams */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flex: 1,
                                    justifyContent: 'center',
                                    marginRight: 6,
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Graded Single Bet Lower Level */}
                                <>
                                  {!typeSingleCompare(
                                    fetchData?.mostProfitableBetWon?.type
                                  ) ? null : (
                                    <FlatList
                                      data={
                                        fetchData?.mostProfitableBetWon?.bets
                                      }
                                      listKey={'c2AakPbi'}
                                      keyExtractor={gradedSingleBetLowerLevelData =>
                                        gradedSingleBetLowerLevelData?.id ||
                                        gradedSingleBetLowerLevelData?.uuid ||
                                        JSON.stringify(
                                          gradedSingleBetLowerLevelData
                                        )
                                      }
                                      renderItem={({ item }) => {
                                        const gradedSingleBetLowerLevelData =
                                          item;
                                        return (
                                          <>
                                            {/* Single Bet */}
                                            <>
                                              {propositionTotal(
                                                gradedSingleBetLowerLevelData?.proposition
                                              ) ? null : (
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors
                                                          .backgroundInverseMainFont,
                                                      fontFamily: 'System',
                                                      fontWeight: '700',
                                                    },
                                                    dimensions.width
                                                  )}
                                                  ellipsizeMode={'tail'}
                                                  numberOfLines={2}
                                                >
                                                  {spacingSyntax(
                                                    gradedSingleBetLowerLevelData
                                                      ?.propDetails?.player
                                                  )}
                                                  {spacingSyntax(
                                                    gradedSingleBetLowerLevelData
                                                      ?.propDetails?.team
                                                  )}
                                                  {propositionUncommonDisplay(
                                                    gradedSingleBetLowerLevelData?.proposition
                                                  )}
                                                  {spacingSyntax(
                                                    gradedSingleBetLowerLevelData?.position
                                                  )}
                                                  {lineSyntax(
                                                    gradedSingleBetLowerLevelData?.line
                                                  )}
                                                  {propDetailsMetricSpecial(
                                                    gradedSingleBetLowerLevelData
                                                      ?.propDetails
                                                      ?.metricSpecial
                                                  )}
                                                  {oddsAmericanSyntax(
                                                    fetchData
                                                      ?.mostProfitableBetWon
                                                      ?.oddsAmerican
                                                  )}
                                                  {segmentExists(
                                                    gradedSingleBetLowerLevelData?.segment
                                                  )}
                                                  {futureBetExists(
                                                    gradedSingleBetLowerLevelData
                                                      ?.propDetails?.future
                                                  )}
                                                  {liveBetExists(
                                                    gradedSingleBetLowerLevelData?.live
                                                  )}
                                                </Text>
                                              )}
                                            </>
                                            {/* propositionTotal */}
                                            <>
                                              {!propositionTotal(
                                                gradedSingleBetLowerLevelData?.proposition
                                              ) ? null : (
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors
                                                          .backgroundInverseMainFont,
                                                      fontFamily: 'System',
                                                      fontSize: 14,
                                                      fontWeight: '700',
                                                    },
                                                    dimensions.width
                                                  )}
                                                  numberOfLines={2}
                                                  ellipsizeMode={'tail'}
                                                >
                                                  {spacingSyntax(
                                                    gradedSingleBetLowerLevelData
                                                      ?.propDetails?.player
                                                  )}
                                                  {spacingSyntax(
                                                    gradedSingleBetLowerLevelData
                                                      ?.propDetails?.team
                                                  )}
                                                  {spacingSyntax(
                                                    gradedSingleBetLowerLevelData?.position
                                                  )}
                                                  {spacingSyntax(
                                                    gradedSingleBetLowerLevelData?.line
                                                  )}
                                                  {propDetailsMetricSpecial(
                                                    gradedSingleBetLowerLevelData
                                                      ?.propDetails
                                                      ?.metricSpecial
                                                  )}
                                                  {oddsAmericanSyntax(
                                                    fetchData
                                                      ?.mostProfitableBetWon
                                                      ?.oddsAmerican
                                                  )}
                                                  {segmentExists(
                                                    gradedSingleBetLowerLevelData?.segment
                                                  )}
                                                  {futureBetExists(
                                                    gradedSingleBetLowerLevelData
                                                      ?.propDetails?.future
                                                  )}
                                                  {liveBetExists(
                                                    gradedSingleBetLowerLevelData?.live
                                                  )}
                                                </Text>
                                              )}
                                            </>
                                            <>
                                              {eventNotExist(
                                                gradedSingleBetLowerLevelData?.event
                                              ) ? null : (
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      flexDirection: 'row',
                                                      flexWrap: 'wrap',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* League */}
                                                  <>
                                                    {!gradedSingleBetLowerLevelData
                                                      ?.event
                                                      ?.awayTeam ? null : (
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors[
                                                                'Light_low_importance_text'
                                                              ],
                                                            fontSize: 12,
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {
                                                          gradedSingleBetLowerLevelData
                                                            ?.event?.league
                                                        }
                                                        {' | '}
                                                      </Text>
                                                    )}
                                                  </>
                                                  {/* Away Team */}
                                                  <>
                                                    {!gradedSingleBetLowerLevelData
                                                      ?.event
                                                      ?.awayTeam ? null : (
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors[
                                                                'Light_low_importance_text'
                                                              ],
                                                            fontSize: 12,
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {abbrTeamName(
                                                          gradedSingleBetLowerLevelData
                                                            ?.event?.awayTeam
                                                        )}{' '}
                                                      </Text>
                                                    )}
                                                  </>
                                                  {/* Away Score */}
                                                  <>
                                                    {!gradedSingleBetLowerLevelData
                                                      ?.event
                                                      ?.awayScore ? null : (
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors[
                                                                'Light_low_importance_text'
                                                              ],
                                                            fontFamily:
                                                              'System',
                                                            fontSize: 12,
                                                            fontWeight: '600',
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {
                                                          gradedSingleBetLowerLevelData
                                                            ?.event?.awayScore
                                                        }{' '}
                                                      </Text>
                                                    )}
                                                  </>
                                                  {/* Dash */}
                                                  <>
                                                    {!gradedSingleBetLowerLevelData
                                                      ?.event
                                                      ?.awayTeam ? null : (
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors[
                                                                'Light_low_importance_text'
                                                              ],
                                                            fontSize: 12,
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {'- '}
                                                      </Text>
                                                    )}
                                                  </>
                                                  {/* Home Score */}
                                                  <>
                                                    {!gradedSingleBetLowerLevelData
                                                      ?.event
                                                      ?.homeScore ? null : (
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors[
                                                                'Light_low_importance_text'
                                                              ],
                                                            fontFamily:
                                                              'System',
                                                            fontSize: 12,
                                                            fontWeight: '600',
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {
                                                          gradedSingleBetLowerLevelData
                                                            ?.event?.homeScore
                                                        }{' '}
                                                      </Text>
                                                    )}
                                                  </>
                                                  {/* Home Team */}
                                                  <>
                                                    {!gradedSingleBetLowerLevelData
                                                      ?.event
                                                      ?.awayTeam ? null : (
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors[
                                                                'Light_low_importance_text'
                                                              ],
                                                            fontSize: 12,
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {abbrTeamName(
                                                          gradedSingleBetLowerLevelData
                                                            ?.event?.homeTeam
                                                        )}
                                                      </Text>
                                                    )}
                                                  </>
                                                  {/* League and Name */}
                                                  <>
                                                    {gradedSingleBetLowerLevelData
                                                      ?.event
                                                      ?.awayTeam ? null : (
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors[
                                                                'Light_low_importance_text'
                                                              ],
                                                            fontSize: 12,
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {
                                                          gradedSingleBetLowerLevelData
                                                            ?.event?.league
                                                        }
                                                        {' | '}
                                                        {
                                                          gradedSingleBetLowerLevelData
                                                            ?.event?.name
                                                        }
                                                      </Text>
                                                    )}
                                                  </>
                                                </View>
                                              )}
                                            </>
                                            {/* Start Time */}
                                            <>
                                              {eventNotExist(
                                                gradedSingleBetLowerLevelData?.event
                                              ) ? null : (
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors
                                                          .lightLowImportanceText,
                                                      fontSize: 10,
                                                    },
                                                    dimensions.width
                                                  )}
                                                  numberOfLines={1}
                                                  ellipsizeMode={'tail'}
                                                >
                                                  {dateStandard(
                                                    gradedSingleBetLowerLevelData
                                                      ?.event?.startTime
                                                  )}
                                                </Text>
                                              )}
                                            </>
                                          </>
                                        );
                                      }}
                                      numColumns={1}
                                    />
                                  )}
                                </>
                                <>
                                  {!typeMultilegCompare(
                                    fetchData?.mostProfitableBetWon?.type
                                  ) ? null : (
                                    <FlatList
                                      data={firstArrayItem(
                                        fetchData?.mostProfitableBetWon?.bets
                                      )}
                                      listKey={'XVXV9cn5'}
                                      keyExtractor={listData =>
                                        listData?.id ||
                                        listData?.uuid ||
                                        JSON.stringify(listData)
                                      }
                                      renderItem={({ item }) => {
                                        const listData = item;
                                        return (
                                          <>
                                            {/* Parlay */}
                                            <>
                                              {!typeParlayCompare(
                                                fetchData?.mostProfitableBetWon
                                                  ?.type
                                              ) ? null : (
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors
                                                          .backgroundInverseMainFont,
                                                      fontFamily: 'System',
                                                      fontWeight: '700',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {parlayLegCount(
                                                    fetchData
                                                      ?.mostProfitableBetWon
                                                      ?.bets
                                                  )}
                                                  {'X Parlay '}
                                                  {oddsAmericanSyntax(
                                                    fetchData
                                                      ?.mostProfitableBetWon
                                                      ?.oddsAmerican
                                                  )}
                                                </Text>
                                              )}
                                            </>
                                            {/* Teaser */}
                                            <>
                                              {!typeTeaserCompare(
                                                fetchData?.mostProfitableBetWon
                                                  ?.type
                                              ) ? null : (
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors
                                                          .backgroundInverseMainFont,
                                                      fontFamily: 'System',
                                                      fontWeight: '700',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {'Teaser '}
                                                  {oddsAmericanSyntax(
                                                    fetchData
                                                      ?.mostProfitableBetWon
                                                      ?.oddsAmerican
                                                  )}
                                                </Text>
                                              )}
                                            </>
                                          </>
                                        );
                                      }}
                                      numColumns={1}
                                    />
                                  )}
                                </>
                                {/* Graded Multileg Bet */}
                                <>
                                  {!typeMultilegCompare(
                                    fetchData?.mostProfitableBetWon?.type
                                  ) ? null : (
                                    <FlatList
                                      data={
                                        fetchData?.mostProfitableBetWon?.bets
                                      }
                                      listKey={'Wpg2NDMA'}
                                      keyExtractor={gradedMultilegBetData =>
                                        gradedMultilegBetData?.id ||
                                        gradedMultilegBetData?.uuid ||
                                        JSON.stringify(gradedMultilegBetData)
                                      }
                                      renderItem={({ item }) => {
                                        const gradedMultilegBetData = item;
                                        return (
                                          <>
                                            {/* Is Multileg */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'center',
                                                  flexDirection: 'row',
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {/* Icon */}
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignContent: 'center',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: 1,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {/* Pending/Null */}
                                                <>
                                                  {!pendingOutcomeCompare(
                                                    fetchData
                                                      ?.mostProfitableBetWon
                                                      ?.outcome
                                                  ) ? null : (
                                                    <Icon
                                                      size={20}
                                                      color={
                                                        theme.colors
                                                          .lightLowImportanceText
                                                      }
                                                      name={
                                                        'Ionicons/ios-radio-button-off'
                                                      }
                                                    />
                                                  )}
                                                </>
                                                {/* Loss */}
                                                <>
                                                  {!lossOutcomeCompare(
                                                    fetchData
                                                      ?.mostProfitableBetWon
                                                      ?.outcome
                                                  ) ? null : (
                                                    <Icon
                                                      name={
                                                        'Ionicons/ios-close-circle'
                                                      }
                                                      size={20}
                                                      color={
                                                        theme.colors
                                                          .badErrorCancel
                                                      }
                                                    />
                                                  )}
                                                </>
                                                {/* Win */}
                                                <>
                                                  {!winOutcomeCompare(
                                                    fetchData
                                                      ?.mostProfitableBetWon
                                                      ?.outcome
                                                  ) ? null : (
                                                    <Icon
                                                      name={
                                                        'Ionicons/ios-checkmark-circle'
                                                      }
                                                      size={20}
                                                      color={theme.colors.good}
                                                    />
                                                  )}
                                                </>
                                                {/* Push */}
                                                <>
                                                  {!pushOutcomeCompare(
                                                    fetchData
                                                      ?.mostProfitableBetWon
                                                      ?.outcome
                                                  ) ? null : (
                                                    <Icon
                                                      name={
                                                        'Ionicons/ios-remove-circle'
                                                      }
                                                      size={20}
                                                      color={
                                                        theme.colors[
                                                          'Background Inverse (Main Font)'
                                                        ]
                                                      }
                                                    />
                                                  )}
                                                </>
                                                {/* Void */}
                                                <>
                                                  {!voidOutcomeCompare(
                                                    fetchData
                                                      ?.mostProfitableBetWon
                                                      ?.outcome
                                                  ) ? null : (
                                                    <Icon
                                                      name={
                                                        'Ionicons/ios-remove-circle'
                                                      }
                                                      size={20}
                                                      color={
                                                        theme.colors
                                                          .lightLowImportanceText
                                                      }
                                                    />
                                                  )}
                                                </>
                                                {/* Cashout */}
                                                <>
                                                  {!cashoutOutcomeCompare(
                                                    fetchData
                                                      ?.mostProfitableBetWon
                                                      ?.outcome
                                                  ) ? null : (
                                                    <Icon
                                                      name={
                                                        'Ionicons/ios-arrow-undo-circle'
                                                      }
                                                      size={20}
                                                      color={theme.colors.fair}
                                                    />
                                                  )}
                                                </>
                                              </View>

                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <>
                                                  {propositionTotal(
                                                    gradedMultilegBetData?.proposition
                                                  ) ? null : (
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          color:
                                                            theme.colors
                                                              .lightLowImportanceText,
                                                          fontSize: 12,
                                                        },
                                                        dimensions.width
                                                      )}
                                                      ellipsizeMode={'tail'}
                                                      numberOfLines={2}
                                                    >
                                                      {showParlayBookDescription(
                                                        gradedMultilegBetData
                                                      )}
                                                      {spacingSyntax(
                                                        gradedMultilegBetData
                                                          ?.propDetails?.player
                                                      )}
                                                      {spacingSyntax(
                                                        gradedMultilegBetData
                                                          ?.propDetails?.team
                                                      )}
                                                      {propositionUncommonDisplay(
                                                        gradedMultilegBetData?.proposition
                                                      )}
                                                      {spacingSyntax(
                                                        gradedMultilegBetData?.position
                                                      )}
                                                      {lineSyntax(
                                                        gradedMultilegBetData?.line
                                                      )}
                                                      {propDetailsMetricSpecial(
                                                        gradedMultilegBetData
                                                          ?.propDetails
                                                          ?.metricSpecial
                                                      )}
                                                      {oddsAmericanSyntax(
                                                        gradedMultilegBetData?.oddsAmerican
                                                      )}
                                                      {segmentExists(
                                                        gradedMultilegBetData?.segment
                                                      )}
                                                      {futureBetExists(
                                                        gradedMultilegBetData
                                                          ?.propDetails?.future
                                                      )}
                                                      {liveBetExists(
                                                        gradedMultilegBetData?.live
                                                      )}
                                                    </Text>
                                                  )}
                                                </>
                                                {/* propositionTotal */}
                                                <>
                                                  {!propositionTotal(
                                                    gradedMultilegBetData?.proposition
                                                  ) ? null : (
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          color:
                                                            theme.colors
                                                              .lightLowImportanceText,
                                                          fontSize: 12,
                                                        },
                                                        dimensions.width
                                                      )}
                                                      ellipsizeMode={'tail'}
                                                      numberOfLines={2}
                                                    >
                                                      {showParlayBookDescription(
                                                        gradedMultilegBetData
                                                      )}
                                                      {spacingSyntax(
                                                        gradedMultilegBetData
                                                          ?.propDetails?.player
                                                      )}
                                                      {spacingSyntax(
                                                        gradedMultilegBetData
                                                          ?.propDetails?.team
                                                      )}
                                                      {spacingSyntax(
                                                        gradedMultilegBetData?.position
                                                      )}
                                                      {spacingSyntax(
                                                        gradedMultilegBetData?.line
                                                      )}
                                                      {propDetailsMetricSpecial(
                                                        gradedMultilegBetData
                                                          ?.propDetails
                                                          ?.metricSpecial
                                                      )}
                                                      {oddsAmericanSyntax(
                                                        gradedMultilegBetData?.oddsAmerican
                                                      )}
                                                      {segmentExists(
                                                        gradedMultilegBetData?.segment
                                                      )}
                                                      {futureBetExists(
                                                        gradedMultilegBetData
                                                          ?.propDetails?.future
                                                      )}
                                                      {liveBetExists(
                                                        gradedMultilegBetData?.live
                                                      )}
                                                    </Text>
                                                  )}
                                                </>
                                              </View>
                                            </View>
                                          </>
                                        );
                                      }}
                                      numColumns={1}
                                    />
                                  )}
                                </>
                              </View>
                            </View>
                            {/* Right Align */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                  width: '30%',
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'flex-end',
                                    justifyContent: 'space-between',
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors.divider,
                                      fontSize: 12,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'-'}
                                </Text>

                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'flex-end',
                                      flex: 1,
                                      justifyContent: 'center',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <>
                                    {!lossOutcomeCompare(
                                      fetchData?.mostProfitableBetWon?.outcome
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.badErrorCancel,
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '700',
                                          },
                                          dimensions.width
                                        )}
                                        ellipsizeMode={'tail'}
                                        numberOfLines={1}
                                      >
                                        {netProfitSyntax(
                                          fetchData?.mostProfitableBetWon
                                            ?.netProfit
                                        )}
                                      </Text>
                                    )}
                                  </>
                                  <>
                                    {!winOutcomeCompare(
                                      fetchData?.mostProfitableBetWon?.outcome
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.good,
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '700',
                                          },
                                          dimensions.width
                                        )}
                                        ellipsizeMode={'tail'}
                                        numberOfLines={1}
                                      >
                                        {netProfitSyntax(
                                          fetchData?.mostProfitableBetWon
                                            ?.netProfit
                                        )}
                                      </Text>
                                    )}
                                  </>
                                  <>
                                    {!pushOutcomeCompare(
                                      fetchData?.mostProfitableBetWon?.outcome
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors
                                                .backgroundInverseMainFont,
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '700',
                                          },
                                          dimensions.width
                                        )}
                                        ellipsizeMode={'tail'}
                                        numberOfLines={1}
                                      >
                                        {netProfitSyntax(
                                          fetchData?.mostProfitableBetWon
                                            ?.netProfit
                                        )}
                                      </Text>
                                    )}
                                  </>
                                  <>
                                    {!voidOutcomeCompare(
                                      fetchData?.mostProfitableBetWon?.outcome
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors
                                                .backgroundInverseMainFont,
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '700',
                                          },
                                          dimensions.width
                                        )}
                                        ellipsizeMode={'tail'}
                                        numberOfLines={1}
                                      >
                                        {netProfitSyntax(
                                          fetchData?.mostProfitableBetWon
                                            ?.netProfit
                                        )}
                                      </Text>
                                    )}
                                  </>
                                  <>
                                    {!cashoutOutcomeCompare(
                                      fetchData?.mostProfitableBetWon?.outcome
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.fair,
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '700',
                                          },
                                          dimensions.width
                                        )}
                                        ellipsizeMode={'tail'}
                                        numberOfLines={1}
                                      >
                                        {netProfitSyntax(
                                          fetchData?.mostProfitableBetWon
                                            ?.netProfit
                                        )}
                                      </Text>
                                    )}
                                  </>
                                </View>

                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Free Bet */}
                                  <>
                                    {!atRiskZero(
                                      fetchData?.mostProfitableBetWon?.atRisk
                                    ) ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'center',
                                            backgroundColor:
                                              theme.colors[
                                                'Light_low_importance_text'
                                              ],
                                            borderRadius: 2,
                                            height: 10,
                                            justifyContent: 'center',
                                            marginRight: 4,
                                            width: 10,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors['Divider'],
                                              fontFamily: 'System',
                                              fontSize: 8,
                                              fontWeight: '700',
                                              textAlign: 'center',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {'F'}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                  <View>
                                    {/* Sportsbook Logo */}
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 12, width: 12 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={{
                                        uri: `${fetchData?.mostProfitableBetWon?.book?.bookLogo}`,
                                      }}
                                    />
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </Surface>
                        {/* Highest Odds Bet Surface */}
                        <>
                          {!checkNotSameBet(fetchData) ? null : (
                            <Surface
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors.divider,
                                  borderRadius: 8,
                                  marginTop: 10,
                                },
                                dimensions.width
                              )}
                              elevation={1}
                            >
                              {/* Bet Block */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor: theme.colors.divider,
                                    borderBottomWidth: 1,
                                    borderColor: theme.colors.divider,
                                    borderLeftWidth: 1,
                                    borderRadius: 8,
                                    borderRightWidth: 1,
                                    borderTopWidth: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingBottom: 6,
                                    paddingLeft: 6,
                                    paddingRight: 6,
                                    paddingTop: 6,
                                  },
                                  dimensions.width
                                )}
                                collapsable={false}
                              >
                                {/* Left Align */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { flexDirection: 'row', width: '70%' },
                                    dimensions.width
                                  )}
                                >
                                  {/* Icon */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 6,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Loss */}
                                    <>
                                      {!lossOutcomeCompare(
                                        fetchData?.highestOddsBetWon?.outcome
                                      ) ? null : (
                                        <Icon
                                          name={'Ionicons/ios-close-circle'}
                                          size={32}
                                          color={theme.colors.badErrorCancel}
                                        />
                                      )}
                                    </>
                                    {/* Win */}
                                    <>
                                      {!winOutcomeCompare(
                                        fetchData?.highestOddsBetWon?.outcome
                                      ) ? null : (
                                        <Icon
                                          name={'Ionicons/ios-checkmark-circle'}
                                          size={32}
                                          color={theme.colors.good}
                                        />
                                      )}
                                    </>
                                    {/* Push */}
                                    <>
                                      {!pushOutcomeCompare(
                                        fetchData?.highestOddsBetWon?.outcome
                                      ) ? null : (
                                        <Icon
                                          name={'Ionicons/ios-remove-circle'}
                                          size={32}
                                          color={
                                            theme.colors[
                                              'Background Inverse (Main Font)'
                                            ]
                                          }
                                        />
                                      )}
                                    </>
                                    {/* Void */}
                                    <>
                                      {!voidOutcomeCompare(
                                        fetchData?.highestOddsBetWon?.outcome
                                      ) ? null : (
                                        <Icon
                                          name={'Ionicons/ios-remove-circle'}
                                          size={32}
                                          color={
                                            theme.colors.lightLowImportanceText
                                          }
                                        />
                                      )}
                                    </>
                                    {/* Cashout */}
                                    <>
                                      {!cashoutOutcomeCompare(
                                        fetchData?.highestOddsBetWon?.outcome
                                      ) ? null : (
                                        <Icon
                                          name={
                                            'Ionicons/ios-arrow-undo-circle'
                                          }
                                          size={32}
                                          color={theme.colors.fair}
                                        />
                                      )}
                                    </>
                                  </View>
                                  {/* Bet/Odds/Teams */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        flex: 1,
                                        justifyContent: 'center',
                                        marginRight: 6,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Graded Single Bet Lower Level */}
                                    <>
                                      {!typeSingleCompare(
                                        fetchData?.highestOddsBetWon?.type
                                      ) ? null : (
                                        <FlatList
                                          data={
                                            fetchData?.highestOddsBetWon?.bets
                                          }
                                          listKey={'sYQxV2UX'}
                                          keyExtractor={gradedSingleBetLowerLevelData =>
                                            gradedSingleBetLowerLevelData?.id ||
                                            gradedSingleBetLowerLevelData?.uuid ||
                                            JSON.stringify(
                                              gradedSingleBetLowerLevelData
                                            )
                                          }
                                          renderItem={({ item }) => {
                                            const gradedSingleBetLowerLevelData =
                                              item;
                                            return (
                                              <>
                                                {/* Single Bet */}
                                                <>
                                                  {propositionTotal(
                                                    gradedSingleBetLowerLevelData?.proposition
                                                  ) ? null : (
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          color:
                                                            theme.colors
                                                              .backgroundInverseMainFont,
                                                          fontFamily: 'System',
                                                          fontWeight: '700',
                                                        },
                                                        dimensions.width
                                                      )}
                                                      ellipsizeMode={'tail'}
                                                      numberOfLines={2}
                                                    >
                                                      {spacingSyntax(
                                                        gradedSingleBetLowerLevelData
                                                          ?.propDetails?.player
                                                      )}
                                                      {spacingSyntax(
                                                        gradedSingleBetLowerLevelData
                                                          ?.propDetails?.team
                                                      )}
                                                      {propositionUncommonDisplay(
                                                        gradedSingleBetLowerLevelData?.proposition
                                                      )}
                                                      {spacingSyntax(
                                                        gradedSingleBetLowerLevelData?.position
                                                      )}
                                                      {lineSyntax(
                                                        gradedSingleBetLowerLevelData?.line
                                                      )}
                                                      {propDetailsMetricSpecial(
                                                        gradedSingleBetLowerLevelData
                                                          ?.propDetails
                                                          ?.metricSpecial
                                                      )}
                                                      {oddsAmericanSyntax(
                                                        fetchData
                                                          ?.highestOddsBetWon
                                                          ?.oddsAmerican
                                                      )}
                                                      {segmentExists(
                                                        gradedSingleBetLowerLevelData?.segment
                                                      )}
                                                      {futureBetExists(
                                                        gradedSingleBetLowerLevelData
                                                          ?.propDetails?.future
                                                      )}
                                                      {liveBetExists(
                                                        gradedSingleBetLowerLevelData?.live
                                                      )}
                                                    </Text>
                                                  )}
                                                </>
                                                {/* propositionTotal */}
                                                <>
                                                  {!propositionTotal(
                                                    gradedSingleBetLowerLevelData?.proposition
                                                  ) ? null : (
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          color:
                                                            theme.colors
                                                              .backgroundInverseMainFont,
                                                          fontFamily: 'System',
                                                          fontSize: 14,
                                                          fontWeight: '700',
                                                        },
                                                        dimensions.width
                                                      )}
                                                      numberOfLines={2}
                                                      ellipsizeMode={'tail'}
                                                    >
                                                      {spacingSyntax(
                                                        gradedSingleBetLowerLevelData
                                                          ?.propDetails?.player
                                                      )}
                                                      {spacingSyntax(
                                                        gradedSingleBetLowerLevelData
                                                          ?.propDetails?.team
                                                      )}
                                                      {spacingSyntax(
                                                        gradedSingleBetLowerLevelData?.position
                                                      )}
                                                      {spacingSyntax(
                                                        gradedSingleBetLowerLevelData?.line
                                                      )}
                                                      {propDetailsMetricSpecial(
                                                        gradedSingleBetLowerLevelData
                                                          ?.propDetails
                                                          ?.metricSpecial
                                                      )}
                                                      {oddsAmericanSyntax(
                                                        fetchData
                                                          ?.highestOddsBetWon
                                                          ?.oddsAmerican
                                                      )}
                                                      {segmentExists(
                                                        gradedSingleBetLowerLevelData?.segment
                                                      )}
                                                      {futureBetExists(
                                                        gradedSingleBetLowerLevelData
                                                          ?.propDetails?.future
                                                      )}
                                                      {liveBetExists(
                                                        gradedSingleBetLowerLevelData?.live
                                                      )}
                                                    </Text>
                                                  )}
                                                </>
                                                <>
                                                  {eventNotExist(
                                                    gradedSingleBetLowerLevelData?.event
                                                  ) ? null : (
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          flexDirection: 'row',
                                                          flexWrap: 'wrap',
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {/* League */}
                                                      <>
                                                        {!gradedSingleBetLowerLevelData
                                                          ?.event
                                                          ?.awayTeam ? null : (
                                                          <Text
                                                            style={StyleSheet.applyWidth(
                                                              {
                                                                color:
                                                                  theme.colors[
                                                                    'Light_low_importance_text'
                                                                  ],
                                                                fontSize: 12,
                                                              },
                                                              dimensions.width
                                                            )}
                                                          >
                                                            {
                                                              gradedSingleBetLowerLevelData
                                                                ?.event?.league
                                                            }
                                                            {' | '}
                                                          </Text>
                                                        )}
                                                      </>
                                                      {/* Away Team */}
                                                      <>
                                                        {!gradedSingleBetLowerLevelData
                                                          ?.event
                                                          ?.awayTeam ? null : (
                                                          <Text
                                                            style={StyleSheet.applyWidth(
                                                              {
                                                                color:
                                                                  theme.colors[
                                                                    'Light_low_importance_text'
                                                                  ],
                                                                fontSize: 12,
                                                              },
                                                              dimensions.width
                                                            )}
                                                          >
                                                            {abbrTeamName(
                                                              gradedSingleBetLowerLevelData
                                                                ?.event
                                                                ?.awayTeam
                                                            )}{' '}
                                                          </Text>
                                                        )}
                                                      </>
                                                      {/* Away Score */}
                                                      <>
                                                        {!gradedSingleBetLowerLevelData
                                                          ?.event
                                                          ?.awayScore ? null : (
                                                          <Text
                                                            style={StyleSheet.applyWidth(
                                                              {
                                                                color:
                                                                  theme.colors[
                                                                    'Light_low_importance_text'
                                                                  ],
                                                                fontFamily:
                                                                  'System',
                                                                fontSize: 12,
                                                                fontWeight:
                                                                  '600',
                                                              },
                                                              dimensions.width
                                                            )}
                                                          >
                                                            {
                                                              gradedSingleBetLowerLevelData
                                                                ?.event
                                                                ?.awayScore
                                                            }{' '}
                                                          </Text>
                                                        )}
                                                      </>
                                                      {/* Dash */}
                                                      <>
                                                        {!gradedSingleBetLowerLevelData
                                                          ?.event
                                                          ?.awayTeam ? null : (
                                                          <Text
                                                            style={StyleSheet.applyWidth(
                                                              {
                                                                color:
                                                                  theme.colors[
                                                                    'Light_low_importance_text'
                                                                  ],
                                                                fontSize: 12,
                                                              },
                                                              dimensions.width
                                                            )}
                                                          >
                                                            {'- '}
                                                          </Text>
                                                        )}
                                                      </>
                                                      {/* Home Score */}
                                                      <>
                                                        {!gradedSingleBetLowerLevelData
                                                          ?.event
                                                          ?.homeScore ? null : (
                                                          <Text
                                                            style={StyleSheet.applyWidth(
                                                              {
                                                                color:
                                                                  theme.colors[
                                                                    'Light_low_importance_text'
                                                                  ],
                                                                fontFamily:
                                                                  'System',
                                                                fontSize: 12,
                                                                fontWeight:
                                                                  '600',
                                                              },
                                                              dimensions.width
                                                            )}
                                                          >
                                                            {
                                                              gradedSingleBetLowerLevelData
                                                                ?.event
                                                                ?.homeScore
                                                            }{' '}
                                                          </Text>
                                                        )}
                                                      </>
                                                      {/* Home Team */}
                                                      <>
                                                        {!gradedSingleBetLowerLevelData
                                                          ?.event
                                                          ?.awayTeam ? null : (
                                                          <Text
                                                            style={StyleSheet.applyWidth(
                                                              {
                                                                color:
                                                                  theme.colors[
                                                                    'Light_low_importance_text'
                                                                  ],
                                                                fontSize: 12,
                                                              },
                                                              dimensions.width
                                                            )}
                                                          >
                                                            {abbrTeamName(
                                                              gradedSingleBetLowerLevelData
                                                                ?.event
                                                                ?.homeTeam
                                                            )}
                                                          </Text>
                                                        )}
                                                      </>
                                                      {/* League and Name */}
                                                      <>
                                                        {gradedSingleBetLowerLevelData
                                                          ?.event
                                                          ?.awayTeam ? null : (
                                                          <Text
                                                            style={StyleSheet.applyWidth(
                                                              {
                                                                color:
                                                                  theme.colors[
                                                                    'Light_low_importance_text'
                                                                  ],
                                                                fontSize: 12,
                                                              },
                                                              dimensions.width
                                                            )}
                                                          >
                                                            {
                                                              gradedSingleBetLowerLevelData
                                                                ?.event?.league
                                                            }
                                                            {' | '}
                                                            {
                                                              gradedSingleBetLowerLevelData
                                                                ?.event?.name
                                                            }
                                                          </Text>
                                                        )}
                                                      </>
                                                    </View>
                                                  )}
                                                </>
                                                {/* Start Time */}
                                                <>
                                                  {eventNotExist(
                                                    gradedSingleBetLowerLevelData?.event
                                                  ) ? null : (
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          color:
                                                            theme.colors
                                                              .lightLowImportanceText,
                                                          fontSize: 10,
                                                        },
                                                        dimensions.width
                                                      )}
                                                      numberOfLines={1}
                                                      ellipsizeMode={'tail'}
                                                    >
                                                      {dateStandard(
                                                        gradedSingleBetLowerLevelData
                                                          ?.event?.startTime
                                                      )}
                                                    </Text>
                                                  )}
                                                </>
                                              </>
                                            );
                                          }}
                                          numColumns={1}
                                        />
                                      )}
                                    </>
                                    <>
                                      {!typeMultilegCompare(
                                        fetchData?.highestOddsBetWon?.type
                                      ) ? null : (
                                        <FlatList
                                          data={firstArrayItem(
                                            fetchData?.highestOddsBetWon?.bets
                                          )}
                                          listKey={'LFByldSv'}
                                          keyExtractor={listData =>
                                            listData?.id ||
                                            listData?.uuid ||
                                            JSON.stringify(listData)
                                          }
                                          renderItem={({ item }) => {
                                            const listData = item;
                                            return (
                                              <>
                                                {/* Parlay */}
                                                <>
                                                  {!typeParlayCompare(
                                                    fetchData?.highestOddsBetWon
                                                      ?.type
                                                  ) ? null : (
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          color:
                                                            theme.colors
                                                              .backgroundInverseMainFont,
                                                          fontFamily: 'System',
                                                          fontWeight: '700',
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {parlayLegCount(
                                                        fetchData
                                                          ?.highestOddsBetWon
                                                          ?.bets
                                                      )}
                                                      {'X Parlay '}
                                                      {oddsAmericanSyntax(
                                                        fetchData
                                                          ?.highestOddsBetWon
                                                          ?.oddsAmerican
                                                      )}
                                                    </Text>
                                                  )}
                                                </>
                                                {/* Teaser */}
                                                <>
                                                  {!typeTeaserCompare(
                                                    fetchData?.highestOddsBetWon
                                                      ?.type
                                                  ) ? null : (
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          color:
                                                            theme.colors
                                                              .backgroundInverseMainFont,
                                                          fontFamily: 'System',
                                                          fontWeight: '700',
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {'Teaser '}
                                                      {oddsAmericanSyntax(
                                                        fetchData
                                                          ?.highestOddsBetWon
                                                          ?.oddsAmerican
                                                      )}
                                                    </Text>
                                                  )}
                                                </>
                                              </>
                                            );
                                          }}
                                          numColumns={1}
                                        />
                                      )}
                                    </>
                                    {/* Graded Multileg Bet */}
                                    <>
                                      {!typeMultilegCompare(
                                        fetchData?.highestOddsBetWon?.type
                                      ) ? null : (
                                        <FlatList
                                          data={
                                            fetchData?.highestOddsBetWon?.bets
                                          }
                                          listKey={'4rm3FDlQ'}
                                          keyExtractor={gradedMultilegBetData =>
                                            gradedMultilegBetData?.id ||
                                            gradedMultilegBetData?.uuid ||
                                            JSON.stringify(
                                              gradedMultilegBetData
                                            )
                                          }
                                          renderItem={({ item }) => {
                                            const gradedMultilegBetData = item;
                                            return (
                                              <>
                                                {/* Is Multileg */}
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: 'center',
                                                      flexDirection: 'row',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* Icon */}
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        alignContent: 'center',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                          'center',
                                                        marginRight: 1,
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    {/* Pending/Null */}
                                                    <>
                                                      {!pendingOutcomeCompare(
                                                        fetchData
                                                          ?.highestOddsBetWon
                                                          ?.outcome
                                                      ) ? null : (
                                                        <Icon
                                                          size={20}
                                                          color={
                                                            theme.colors
                                                              .lightLowImportanceText
                                                          }
                                                          name={
                                                            'Ionicons/ios-radio-button-off'
                                                          }
                                                        />
                                                      )}
                                                    </>
                                                    {/* Loss */}
                                                    <>
                                                      {!lossOutcomeCompare(
                                                        fetchData
                                                          ?.highestOddsBetWon
                                                          ?.outcome
                                                      ) ? null : (
                                                        <Icon
                                                          name={
                                                            'Ionicons/ios-close-circle'
                                                          }
                                                          size={20}
                                                          color={
                                                            theme.colors
                                                              .badErrorCancel
                                                          }
                                                        />
                                                      )}
                                                    </>
                                                    {/* Win */}
                                                    <>
                                                      {!winOutcomeCompare(
                                                        fetchData
                                                          ?.highestOddsBetWon
                                                          ?.outcome
                                                      ) ? null : (
                                                        <Icon
                                                          name={
                                                            'Ionicons/ios-checkmark-circle'
                                                          }
                                                          size={20}
                                                          color={
                                                            theme.colors.good
                                                          }
                                                        />
                                                      )}
                                                    </>
                                                    {/* Push */}
                                                    <>
                                                      {!pushOutcomeCompare(
                                                        fetchData
                                                          ?.highestOddsBetWon
                                                          ?.outcome
                                                      ) ? null : (
                                                        <Icon
                                                          name={
                                                            'Ionicons/ios-remove-circle'
                                                          }
                                                          size={20}
                                                          color={
                                                            theme.colors[
                                                              'Background Inverse (Main Font)'
                                                            ]
                                                          }
                                                        />
                                                      )}
                                                    </>
                                                    {/* Void */}
                                                    <>
                                                      {!voidOutcomeCompare(
                                                        fetchData
                                                          ?.highestOddsBetWon
                                                          ?.outcome
                                                      ) ? null : (
                                                        <Icon
                                                          name={
                                                            'Ionicons/ios-remove-circle'
                                                          }
                                                          size={20}
                                                          color={
                                                            theme.colors
                                                              .lightLowImportanceText
                                                          }
                                                        />
                                                      )}
                                                    </>
                                                    {/* Cashout */}
                                                    <>
                                                      {!cashoutOutcomeCompare(
                                                        fetchData
                                                          ?.highestOddsBetWon
                                                          ?.outcome
                                                      ) ? null : (
                                                        <Icon
                                                          name={
                                                            'Ionicons/ios-arrow-undo-circle'
                                                          }
                                                          size={20}
                                                          color={
                                                            theme.colors.fair
                                                          }
                                                        />
                                                      )}
                                                    </>
                                                  </View>

                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        flex: 1,
                                                        justifyContent:
                                                          'center',
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    <>
                                                      {propositionTotal(
                                                        gradedMultilegBetData?.proposition
                                                      ) ? null : (
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            {
                                                              color:
                                                                theme.colors
                                                                  .lightLowImportanceText,
                                                              fontSize: 12,
                                                            },
                                                            dimensions.width
                                                          )}
                                                          ellipsizeMode={'tail'}
                                                          numberOfLines={2}
                                                        >
                                                          {showParlayBookDescription(
                                                            gradedMultilegBetData
                                                          )}
                                                          {spacingSyntax(
                                                            gradedMultilegBetData
                                                              ?.propDetails
                                                              ?.player
                                                          )}
                                                          {spacingSyntax(
                                                            gradedMultilegBetData
                                                              ?.propDetails
                                                              ?.team
                                                          )}
                                                          {propositionUncommonDisplay(
                                                            gradedMultilegBetData?.proposition
                                                          )}
                                                          {spacingSyntax(
                                                            gradedMultilegBetData?.position
                                                          )}
                                                          {lineSyntax(
                                                            gradedMultilegBetData?.line
                                                          )}
                                                          {propDetailsMetricSpecial(
                                                            gradedMultilegBetData
                                                              ?.propDetails
                                                              ?.metricSpecial
                                                          )}
                                                          {oddsAmericanSyntax(
                                                            gradedMultilegBetData?.oddsAmerican
                                                          )}
                                                          {segmentExists(
                                                            gradedMultilegBetData?.segment
                                                          )}
                                                          {futureBetExists(
                                                            gradedMultilegBetData
                                                              ?.propDetails
                                                              ?.future
                                                          )}
                                                          {liveBetExists(
                                                            gradedMultilegBetData?.live
                                                          )}
                                                        </Text>
                                                      )}
                                                    </>
                                                    {/* propositionTotal */}
                                                    <>
                                                      {!propositionTotal(
                                                        gradedMultilegBetData?.proposition
                                                      ) ? null : (
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            {
                                                              color:
                                                                theme.colors
                                                                  .lightLowImportanceText,
                                                              fontSize: 12,
                                                            },
                                                            dimensions.width
                                                          )}
                                                          ellipsizeMode={'tail'}
                                                          numberOfLines={2}
                                                        >
                                                          {showParlayBookDescription(
                                                            gradedMultilegBetData
                                                          )}
                                                          {spacingSyntax(
                                                            gradedMultilegBetData
                                                              ?.propDetails
                                                              ?.player
                                                          )}
                                                          {spacingSyntax(
                                                            gradedMultilegBetData
                                                              ?.propDetails
                                                              ?.team
                                                          )}
                                                          {spacingSyntax(
                                                            gradedMultilegBetData?.position
                                                          )}
                                                          {spacingSyntax(
                                                            gradedMultilegBetData?.line
                                                          )}
                                                          {propDetailsMetricSpecial(
                                                            gradedMultilegBetData
                                                              ?.propDetails
                                                              ?.metricSpecial
                                                          )}
                                                          {oddsAmericanSyntax(
                                                            gradedMultilegBetData?.oddsAmerican
                                                          )}
                                                          {segmentExists(
                                                            gradedMultilegBetData?.segment
                                                          )}
                                                          {futureBetExists(
                                                            gradedMultilegBetData
                                                              ?.propDetails
                                                              ?.future
                                                          )}
                                                          {liveBetExists(
                                                            gradedMultilegBetData?.live
                                                          )}
                                                        </Text>
                                                      )}
                                                    </>
                                                  </View>
                                                </View>
                                              </>
                                            );
                                          }}
                                          numColumns={1}
                                        />
                                      )}
                                    </>
                                  </View>
                                </View>
                                {/* Right Align */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                      width: '30%',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'flex-end',
                                        justifyContent: 'space-between',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: theme.colors.divider,
                                          fontSize: 12,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'-'}
                                    </Text>

                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'flex-end',
                                          flex: 1,
                                          justifyContent: 'center',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <>
                                        {!lossOutcomeCompare(
                                          fetchData?.highestOddsBetWon?.outcome
                                        ) ? null : (
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color:
                                                  theme.colors.badErrorCancel,
                                                fontFamily: 'System',
                                                fontSize: 14,
                                                fontWeight: '700',
                                              },
                                              dimensions.width
                                            )}
                                            ellipsizeMode={'tail'}
                                            numberOfLines={1}
                                          >
                                            {netProfitSyntax(
                                              fetchData?.highestOddsBetWon
                                                ?.netProfit
                                            )}
                                          </Text>
                                        )}
                                      </>
                                      <>
                                        {!winOutcomeCompare(
                                          fetchData?.highestOddsBetWon?.outcome
                                        ) ? null : (
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color: theme.colors.good,
                                                fontFamily: 'System',
                                                fontSize: 14,
                                                fontWeight: '700',
                                              },
                                              dimensions.width
                                            )}
                                            ellipsizeMode={'tail'}
                                            numberOfLines={1}
                                          >
                                            {netProfitSyntax(
                                              fetchData?.highestOddsBetWon
                                                ?.netProfit
                                            )}
                                          </Text>
                                        )}
                                      </>
                                      <>
                                        {!pushOutcomeCompare(
                                          fetchData?.highestOddsBetWon?.outcome
                                        ) ? null : (
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color:
                                                  theme.colors
                                                    .backgroundInverseMainFont,
                                                fontFamily: 'System',
                                                fontSize: 14,
                                                fontWeight: '700',
                                              },
                                              dimensions.width
                                            )}
                                            ellipsizeMode={'tail'}
                                            numberOfLines={1}
                                          >
                                            {netProfitSyntax(
                                              fetchData?.highestOddsBetWon
                                                ?.netProfit
                                            )}
                                          </Text>
                                        )}
                                      </>
                                      <>
                                        {!voidOutcomeCompare(
                                          fetchData?.highestOddsBetWon?.outcome
                                        ) ? null : (
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color:
                                                  theme.colors
                                                    .backgroundInverseMainFont,
                                                fontFamily: 'System',
                                                fontSize: 14,
                                                fontWeight: '700',
                                              },
                                              dimensions.width
                                            )}
                                            ellipsizeMode={'tail'}
                                            numberOfLines={1}
                                          >
                                            {netProfitSyntax(
                                              fetchData?.highestOddsBetWon
                                                ?.netProfit
                                            )}
                                          </Text>
                                        )}
                                      </>
                                      <>
                                        {!cashoutOutcomeCompare(
                                          fetchData?.highestOddsBetWon?.outcome
                                        ) ? null : (
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color: theme.colors.fair,
                                                fontFamily: 'System',
                                                fontSize: 14,
                                                fontWeight: '700',
                                              },
                                              dimensions.width
                                            )}
                                            ellipsizeMode={'tail'}
                                            numberOfLines={1}
                                          >
                                            {netProfitSyntax(
                                              fetchData?.highestOddsBetWon
                                                ?.netProfit
                                            )}
                                          </Text>
                                        )}
                                      </>
                                    </View>

                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'flex-end',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Free Bet */}
                                      <>
                                        {!atRiskZero(
                                          fetchData?.highestOddsBetWon?.atRisk
                                        ) ? null : (
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignItems: 'center',
                                                backgroundColor:
                                                  theme.colors[
                                                    'Light_low_importance_text'
                                                  ],
                                                borderRadius: 2,
                                                height: 10,
                                                justifyContent: 'center',
                                                marginRight: 4,
                                                width: 10,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors['Divider'],
                                                  fontFamily: 'System',
                                                  fontSize: 8,
                                                  fontWeight: '700',
                                                  textAlign: 'center',
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {'F'}
                                            </Text>
                                          </View>
                                        )}
                                      </>
                                      <View>
                                        {/* Sportsbook Logo */}
                                        <Image
                                          style={StyleSheet.applyWidth(
                                            { height: 12, width: 12 },
                                            dimensions.width
                                          )}
                                          resizeMode={'contain'}
                                          source={{
                                            uri: `${fetchData?.highestOddsBetWon?.book?.bookLogo}`,
                                          }}
                                        />
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </Surface>
                          )}
                        </>
                      </View>
                    </View>
                  </ImageBackground>
                )}
              </>
            </>
          );
        }}
      </SwaggerAPIApi.FetchWeeklyRecapGET>
      {/* Navigation */}
      <View
        style={StyleSheet.applyWidth(
          {
            flexDirection: 'row',
            height: '100%',
            justifyContent: 'space-between',
            left: 0,
            position: 'absolute',
            top: 64,
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Back */}
        <Touchable
          onPress={() => {
            try {
              if (checkWeeklyRecapSlide1(Constants['weeklyRecapSlide'])) {
                return;
              }
              setGlobalVariableValue({
                key: 'weeklyRecapSlide',
                value: Constants['weeklyRecapSlide'] - 1,
              });
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            { height: '100%', width: '25%' },
            dimensions.width
          )}
        />
        {/* Next */}
        <Touchable
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'weeklyRecapSlide',
                value: Constants['weeklyRecapSlide'] + 1,
              });
              if (checkWeeklyRecapSlideNot6(Constants['weeklyRecapSlide'])) {
                return;
              }
              navigation.goBack();
              setGlobalVariableValue({
                key: 'weeklyRecapSlide',
                value: 1,
              });
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            { height: '100%', width: '40%' },
            dimensions.width
          )}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(WeeklyRecapScreen);
