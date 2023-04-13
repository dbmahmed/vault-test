import React from 'react';
import * as CustomCode from '../CustomCode';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SwaggerAPIApi from '../apis/SwaggerAPIApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as BetIndicators from '../custom-files/BetIndicators';
import segmentLogIdentify from '../global-functions/segmentLogIdentify';
import segmentLogTrack from '../global-functions/segmentLogTrack';
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
  TextField,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import { FlashList } from '@shopify/flash-list';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const TestScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const segmentIdentify = (userID, email, username) => {
    if (segment) {
      segment.idenitfy(userId, {
        username,
        email,
      });
    }
  };

  const segmentTrack = (name, productId, productName) => {
    if (segment) {
      segment.track(name, {
        productId,
        productName,
      });
    }
  };

  const segmentScreen = (info, screenName) => {
    if (segment) {
      segment.screen(screenName, {
        info,
      });
    }
  };

  const filterBetslips = betslips => {
    const primaryBetTypes = ['spread', 'total', 'moneyline', '3-way'];
    const primaryLeagues = [
      'NFL',
      'NCAAF',
      'NBA',
      'NCAAMB',
      'MLB',
      'NHL',
      'UFC',
      null,
    ];

    console.log('I ran');
    function isDisplayed(betslips) {
      function getYTD() {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
      }

      function loopDate() {
        let exist = false;
        for (let x = 0; x < betslips.bets.length; x++) {
          let d = new Date();
          if (
            betslips.bets[x].event === null ||
            betslips.bets[x].event.startTime === null
          ) {
            exist;
          } else if (Constants.filterDateApply.includes('today')) {
            let date1 = new Date(betslips.bets[x].event.startTime);
            let date2 = new Date(d.setDate(d.getDate()));

            date1.setHours(0, 0, 0, 0);
            date2.setHours(0, 0, 0, 0);

            exist = date1.getTime() === date2.getTime();
          } else if (Constants.filterDateApply.includes('yesterday')) {
            let date1 = new Date(betslips.bets[x].event.startTime);
            let date2 = new Date(d.setDate(d.getDate() - 1));

            date1.setHours(0, 0, 0, 0);
            date2.setHours(0, 0, 0, 0);

            exist = date1.getTime() === date2.getTime();
          } else if (Constants.filterDateApply.includes('sevenDays')) {
            exist =
              new Date(betslips.bets[x].event.startTime) >=
              d.setDate(d.getDate() - 7);
          } else if (Constants.filterDateApply.includes('twentyEightDays')) {
            exist =
              new Date(betslips.bets[x].event.startTime) >=
              d.setDate(d.getDate() - 28);
          } else if (Constants.filterDateApply.includes('threeMonths')) {
            exist =
              new Date(betslips.bets[x].event.startTime) >=
              d.setDate(d.getDate() - 90);
          } else if (Constants.filterDateApply.includes('sixMonths')) {
            exist =
              new Date(betslips.bets[x].event.startTime) >=
              d.setDate(d.getDate() - 180);
          } else if (Constants.filterDateApply.includes('yearToDate')) {
            exist =
              new Date(betslips.bets[x].event.startTime) >=
              d.setDate(d.getDate() - getYTD());
          } else if (Constants.filterDateApply.includes('twelveMonths')) {
            exist =
              new Date(betslips.bets[x].event.startTime) >=
              d.setDate(d.getDate() - 365);
          } else {
            exist;
          }
        }
        return exist;
      }

      function loopLeague() {
        let exist = false;
        for (let x = 0; x < betslips.bets.length; x++) {
          if (
            betslips.bets[x].event === null ||
            betslips.bets[x].event.league === null
          ) {
            exist;
          } else if (
            Constants.filterLeagueApply.includes(betslips.bets[x].event.league)
          ) {
            exist = true;
          } else if (Constants.filterLeagueApply.includes('otherLeagues')) {
            exist = primaryLeagues.includes(betslips.bets[x].event.league)
              ? exist
              : true;
          } else {
            exist;
          }
        }
        return exist;
      }

      function loopUnderdog() {
        let exist = false;
        for (let x = 0; x < betslips.bets.length; x++) {
          if (betslips.bets[x].proposition === null) {
            exist;
          } else if (
            Constants.filterUnderdogApply.includes('favorite') &&
            ((betslips.bets[x].proposition === 'moneyline' &&
              betslips.bets[x].oddsAmerican < 0) ||
              (betslips.bets[x].proposition === 'spread' &&
                betslips.bets[x].line < 0))
          ) {
            exist = true;
          } else if (
            Constants.filterUnderdogApply.includes('underdog') &&
            ((betslips.bets[x].proposition === 'moneyline' &&
              betslips.bets[x].oddsAmerican > 0) ||
              (betslips.bets[x].proposition === 'spread' &&
                betslips.bets[x].line > 0))
          ) {
            exist = true;
          } else {
            exist;
          }
        }
        return exist;
      }

      function loopLiveBet() {
        let exist = false;
        for (let x = 0; x < betslips.bets.length; x++) {
          if (
            Constants.filterLiveBetApply.includes('preGame') &&
            (betslips.bets[x].live === null ||
              betslips.bets[x].live === false) &&
            (betslips.bets[x].propDetails === null ||
              betslips.bets[x].propDetails.future === false)
          ) {
            exist = true;
          } else if (
            Constants.filterLiveBetApply.includes('live') &&
            betslips.bets[x].live !== null &&
            betslips.bets[x].live === true
          ) {
            exist = true;
          } else if (
            Constants.filterLiveBetApply.includes('future') &&
            betslips.bets[x].propDetails !== null &&
            betslips.bets[x].propDetails.future !== null &&
            betslips.bets[x].propDetails.future === true
          ) {
            exist = true;
          } else {
            exist;
          }
        }
        return exist;
      }

      function loopUnder() {
        let exist = false;
        for (let x = 0; x < betslips.bets.length; x++) {
          if (betslips.bets[x].position === null) {
            exist;
          } else if (
            Constants.filterUnderApply.includes(betslips.bets[x].position)
          ) {
            exist = true;
          } else {
            exist;
          }
        }
        return exist;
      }

      if (
        ((Constants.filterBetStatusApply.length == 0 &&
          betslips.outcome !== 'pending') ||
          Constants.filterBetStatusApply.includes(betslips.outcome)) &&
        (Constants.filterSportsbookApply.length == 0 ||
          Constants.filterSportsbookApply.includes(betslips.book.name)) &&
        (Constants.filterBetTypeApply.length == 0 ||
          Constants.filterBetTypeApply.includes(betslips.type) ||
          (betslips.bets.length == 1 &&
            Constants.filterBetTypeApply.includes(betslips.bets[0].type)) ||
          (betslips.bets.length == 1 &&
            betslips.bets[0].type != 'prop' &&
            Constants.filterBetTypeApply.includes(
              betslips.bets[0].proposition
            )) ||
          (betslips.bets.length == 1 &&
            betslips.bets[0].type != 'prop' &&
            Constants.filterLeagueApply.includes('otherBetTypes') &&
            !primaryBetTypes.includes(betslips.bets[0].proposition))) &&
        (Constants.filterLeagueApply.length == 0 || loopLeague()) &&
        (Constants.filterDateApply.length == 0 || loopDate()) &&
        (Constants.filterUnderdogApply.length == 0 || loopUnderdog()) &&
        (Constants.filterLiveBetApply.length == 0 || loopLiveBet()) &&
        (Constants.filterOutcomeApply.length == 0 ||
          Constants.filterOutcomeApply.includes(betslips.outcome)) &&
        (Constants.filterUnderApply.length == 0 || loopUnder())
      ) {
        return true;
      } else {
        return false;
      }
    }

    betslips = betslips.filter(isDisplayed);

    Constants.betsFound = betslips.length == 0 ? false : true;

    Constants.statsNetProfit = betslips.reduce((a, b) => a + b.netProfit, 0);

    Constants.statsAtRisk = betslips.reduce((a, b) => a + b.atRisk, 0);

    Constants.statsPendingAmount = betslips.reduce((a, b) => a + b.toWin, 0);

    Constants.statsWins = betslips.filter(obj => {
      if (obj.outcome === 'win') {
        return true;
      }
    }).length;

    Constants.statsLosses = betslips.filter(obj => {
      if (obj.outcome === 'loss') {
        return true;
      }
    }).length;

    Constants.statsPushes = betslips.filter(obj => {
      if (obj.outcome === 'push') {
        return true;
      }
    }).length;

    Constants.statsPendingCount = betslips.filter(obj => {
      if (obj.outcome === 'pending') {
        return true;
      }
    }).length;

    /*
setVarNetProfit(Constants.statsNetProfit);
setVarAtRisk(Constants.statsAtRisk);
setVarPendingAmount(Constants.statsPendingAmount);
setVarWins(Constants.statsWins);
setVarLosses(Constants.statsLosses);
setVarPushes(Constants.statsPushes);
setVarPendingCount(Constants.statsPendingCount);
setBetsFound(Constants.betsFound);
*/

    return betslips;
  };

  const myFunctionName = x => {
    return x + ' Hello! ';
  };

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
    >
      {/* Menu Bar */}
      <View
        style={StyleSheet.applyWidth(
          GlobalStyles.ViewStyles(theme)['Back button bar Jan 19 2024'],
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
                    flexDirection: 'column',
                    height: 50,
                    justifyContent: 'center',
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
                      fontSize: 18,
                    },
                    dimensions.width
                  )}
                >
                  {'Cancel'}
                </Text>
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
                maxWidth: '34%',
                minWidth: '33%',
              },
              dimensions.width
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Background Inverse (Main Font)'],
                  fontFamily: 'System',
                  fontSize: 18,
                  fontWeight: '600',
                  textAlign: 'center',
                }),
                dimensions.width
              )}
            >
              {'New Chat'}
            </Text>
          </View>
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
      {/* Choose Action */}
      <View>
        {/* Search Bar Top of Page */}
        <View
          style={StyleSheet.applyWidth(
            GlobalStyles.ViewStyles(theme)['Search Bar Top of Page'],
            dimensions.width
          )}
        >
          <TextInput
            onChangeText={newTextInputValue => {
              try {
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Divider'],
                borderRadius: 8,
                color: theme.colors['Background Inverse (Main Font)'],
                fontSize: 16,
                paddingBottom: 8,
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 8,
              },
              dimensions.width
            )}
            placeholder={'Search by name or number...'}
            clearButtonMode={'always'}
            placeholderTextColor={theme.colors['Light_low_importance_text']}
            autoCapitalize={'words'}
            contextMenuHidden={false}
          />
        </View>
        {/* Group Options */}
        <View
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ViewStyles(theme)['Group Options'],
              { marginLeft: 16, marginRight: 16, marginTop: 24 }
            ),
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('BlankTestingAreaScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            activeOpacity={0.8}
            disabledOpacity={0.8}
          >
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
                    color={theme.colors['Custom #007aff']}
                    name={'Ionicons/ios-people'}
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
                  color={theme.colors['Background Inverse (Main Font)']}
                />
              </View>
            </Surface>
          </Touchable>
          <Divider
            style={StyleSheet.applyWidth({ height: 0.5 }, dimensions.width)}
            height={1}
            color={theme.colors.nFTTIMEIcons}
          />
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
                    color={theme.colors['Custom #007aff']}
                    name={'Ionicons/ios-person'}
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
                    {'Find by Username'}
                  </Text>
                </View>
                <Icon
                  name={'Ionicons/ios-chevron-forward'}
                  size={24}
                  color={theme.colors['Background Inverse (Main Font)']}
                />
              </View>
            </Surface>
          </Touchable>
          <Divider
            style={StyleSheet.applyWidth({ height: 0.5 }, dimensions.width)}
            height={1}
            color={theme.colors.nFTTIMEIcons}
          />
          <Touchable activeOpacity={0.8} disabledOpacity={0.8}>
            {/* Surface Invite Friends */}
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
                    color={theme.colors['Custom #007aff']}
                    name={'Ionicons/ios-share'}
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
                    {'Invite Friends to Vault'}
                  </Text>
                </View>
                <Icon
                  name={'Ionicons/ios-chevron-forward'}
                  size={24}
                  color={theme.colors['Background Inverse (Main Font)']}
                />
              </View>
            </Surface>
          </Touchable>
        </View>
        {/* Scroll View Contacts */}
        <ScrollView
          style={StyleSheet.applyWidth(
            GlobalStyles.ScrollViewStyles(theme)['Scroll View Contacts'],
            dimensions.width
          )}
          contentContainerStyle={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ScrollViewStyles(theme)['Scroll View Contacts'],
              { paddingLeft: 16, paddingRight: 16 }
            ),
            dimensions.width
          )}
          showsVerticalScrollIndicator={true}
          bounces={true}
          showsHorizontalScrollIndicator={false}
        >
          {/* Alphabetical List */}
          <View
            style={StyleSheet.applyWidth({ paddingTop: 32 }, dimensions.width)}
          >
            {/* Letter */}
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
              {'A'}
            </Text>

            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 8, overflow: 'hidden' },
                dimensions.width
              )}
            >
              <Touchable activeOpacity={0.8} disabledOpacity={0.8}>
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
              </Touchable>

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

              <Touchable activeOpacity={0.8} disabledOpacity={0.8}>
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
              </Touchable>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* Add Phone Number Modal */}
      <Modal
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
      >
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth({ height: '50%' }, dimensions.width)}
        />
        {/* View 3 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['Background'],
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '50%',
              justifyContent: 'space-between',
              paddingBottom: 36,
            },
            dimensions.width
          )}
        >
          {/* Add Phone Number */}
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'never'}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={StyleSheet.applyWidth(
                { marginBottom: 25, minHeight: 50 },
                dimensions.width
              )}
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
                  ></View>
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        height: 50,
                        justifyContent: 'center',
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
                        justifyContent: 'center',
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
                  { minHeight: 50 },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { minHeight: 50, paddingLeft: 16, paddingRight: 16 },
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
                    {'Add your phone number 📱'}
                  </Text>
                  {/* Text 2 */}
                  <Text
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        {
                          color: theme.colors['Background Inverse (Main Font)'],
                          fontFamily: 'System',
                          fontSize: 20,
                          fontWeight: '700',
                          marginTop: 48,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Allow friends to easily find and connect with you.'}
                  </Text>

                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.lightLowImportanceText,
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '400',
                        marginTop: 48,
                        textAlign: 'left',
                      },
                      dimensions.width
                    )}
                  >
                    {'You will receive an SMS code for validation'}
                  </Text>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 25,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Styled Text Field - Country Code */}
                    <TextField
                      onChangeText={newStyledTextFieldCountryCodeValue => {
                        try {
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.divider,
                          borderColor: theme.colors.divider,
                          borderRadius: 8,
                          color: theme.colors.backgroundInverseMainFont,
                          fontSize: 16,
                          width: '20%',
                        },
                        dimensions.width
                      )}
                      placeholder={1}
                      type={'solid'}
                      underlineColor={theme.colors.light}
                      autoFocus={true}
                      placeholderTextColor={theme.colors.lightLowImportanceText}
                      returnKeyType={'next'}
                      autoCorrect={false}
                      keyboardAppearance={'default'}
                      keyboardType={'numeric'}
                      assistiveText={'Country'}
                    />
                    {/* Styled Text Field - Phone Number */}
                    <TextField
                      onChangeText={newStyledTextFieldPhoneNumberValue => {
                        try {
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.divider,
                          borderColor: theme.colors.divider,
                          borderRadius: 8,
                          color: theme.colors.backgroundInverseMainFont,
                          fontSize: 16,
                          width: '76%',
                        },
                        dimensions.width
                      )}
                      placeholder={'Phone number'}
                      type={'solid'}
                      underlineColor={theme.colors.light}
                      maxLength={10}
                      placeholderTextColor={theme.colors.lightLowImportanceText}
                      autoCorrect={false}
                      returnKeyType={'next'}
                      keyboardAppearance={'default'}
                      keyboardType={'numeric'}
                      autoFocus={false}
                      leftIconMode={'inset'}
                    />
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
          {/* Next button from onboarding */}
          <View
            style={StyleSheet.applyWidth(
              GlobalStyles.ViewStyles(theme)['Next button from onboarding'],
              dimensions.width
            )}
          >
            {/* Next_Enabled */}
            <Button
              onPress={() => {
                try {
                  if (false) {
                    return;
                  }
                  navigation.navigate('CreateProfileConfirmNumberScreen');
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
            >
              {'Log In'}
            </Button>
          </View>
          {/* Back/Next Buttons from tutorial */}
          <View
            style={StyleSheet.applyWidth(
              GlobalStyles.ViewStyles(theme)['Back/Next Buttons from tutorial'],
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth({ width: '45%' }, dimensions.width)}
            >
              {/* Back */}
              <Button
                onPress={() => {
                  try {
                    if (Constants['moneyTutorial']) {
                      return;
                    }
                    setGlobalVariableValue({
                      key: 'moneyTutorial',
                      value: Constants['moneyTutorial'] - 1,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'],
                    {
                      backgroundColor: theme.colors['Divider'],
                      color: theme.colors['Light_low_importance_text'],
                      fontSize: 16,
                      marginTop: 24,
                      paddingBottom: 15,
                      paddingTop: 15,
                    }
                  ),
                  dimensions.width
                )}
                title={'Back'}
              />
            </View>

            <View
              style={StyleSheet.applyWidth({ width: '45%' }, dimensions.width)}
            >
              {/* Next */}
              <>
                {!Constants['moneyTutorial'] ? null : (
                  <Button
                    onPress={() => {
                      try {
                        setGlobalVariableValue({
                          key: 'moneyTutorial',
                          value: Constants['moneyTutorial'] + 1,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'],
                        {
                          color: theme.colors['Strong_Text_on_gold_buttons'],
                          fontSize: 16,
                          marginTop: 24,
                          paddingBottom: 15,
                          paddingTop: 15,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Next'}
                  />
                )}
              </>
              {/* Close */}
              <>
                {!Constants['moneyTutorial'] ? null : (
                  <Button
                    onPress={() => {
                      try {
                        setGlobalVariableValue({
                          key: 'moneyScreenTutorial',
                          value: false,
                        });
                        setGlobalVariableValue({
                          key: 'moneyTutorial',
                          value: 1,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'],
                        {
                          color: theme.colors['Strong_Text_on_gold_buttons'],
                          fontSize: 16,
                          marginTop: 24,
                          paddingBottom: 15,
                          paddingTop: 15,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Close'}
                  />
                )}
              </>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(TestScreen);
