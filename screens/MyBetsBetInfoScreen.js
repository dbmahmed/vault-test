import React from 'react';
import * as CustomCode from '../CustomCode';
import * as SwaggerAPIApi from '../apis/SwaggerAPIApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as BetIndicators from '../custom-files/BetIndicators';
import abbrTeamName from '../global-functions/abbrTeamName';
import atRiskZero from '../global-functions/atRiskZero';
import segmentLogScreen from '../global-functions/segmentLogScreen';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Divider,
  Icon,
  ScreenContainer,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const MyBetsBetInfoScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const segment = useAnalytics();
  const testFunctionBetId = id => {
    return 'SLIP_ea60c952a6fa43a5b4c9597ecb03836d';
  };

  const testFunctionUserId = id => {
    return '0ab65253-7104-4712-b2c5-bdac5be81862';
  };

  const dateStandard = startTime => {
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date(startTime);
    let str = month[date.getMonth()] + ' ' + date.getDate();
    if (date.getFullYear() === new Date().getFullYear()) {
      str = str;
    } else {
      str = str + ', ' + date.getFullYear();
    }
    return str;
  };

  const futureBetExists = future => {
    return future == true ? '(Future) ' : '';
  };

  const lossOutcomeCompare = outcome => {
    return outcome === 'loss' || outcome === 'halfloss' || outcome === 'losing';
  };

  const outcomeNullCompare = outcome => {
    return outcome == null ? true : null;
  };

  const positionSuffix = position => {
    return position == null ? '' : position + ' ';
  };

  const propositionUncommonDisplay = proposition => {
    if (proposition == null) {
      return '';
    } else if (proposition === 'spread') {
      return '';
    } else if (proposition === 'total') {
      return '';
    } else if (proposition === 'moneyline') {
      return '';
    } else if (proposition === 'method of result') {
      return '';
    } else {
      return proposition.charAt(0).toUpperCase() + proposition.slice(1) + ' ';
    }
  };

  const spacingSuffix = x => {
    return x == null ? '' : x + ' ';
  };

  const typeParlayCompare = type => {
    return type === 'parlay';
  };

  const typeStraightCompare = type => {
    return type === 'straight';
  };

  const winOutcomeCompare = outcome => {
    return outcome === 'win' || outcome === 'halfwin' || outcome === 'winning';
  };

  const atRiskSuffix = atRisk => {
    // Old Suffix
    // return "$" + (atRisk/100);

    let res = (Math.abs(atRisk) / 100).toFixed(2);
    let lastIndex = res[res.length - 1];
    let secondLastIndex = res[res.length - 2];
    const comp = lastIndex == 0 && secondLastIndex == 0;
    if (comp) {
      res = parseInt(res);
    }

    if (atRisk < 0) {
      return '-$' + res;
    } else {
      return '$' + res;
    }
  };

  const dateTimeStandard = startTime => {
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date(startTime);
    let str = month[date.getMonth()] + ' ' + date.getDate() + ', ';
    if (date.getFullYear() === new Date().getFullYear()) {
      str = str;
    } else {
      str = str + date.getFullYear() + ', ';
    }
    if (date.getHours() >= 12) {
      if (date.getHours() == 12) {
        str =
          str +
          date.getHours() +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) +
          'p';
      } else {
        str =
          str +
          (date.getHours() - 12) +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) +
          'p';
      }
    } else {
      if (date.getHours() == 0) {
        str =
          str +
          (date.getHours() + 12) +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) +
          'a';
      } else {
        str =
          str +
          date.getHours() +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) +
          'a';
      }
    }
    return str;

    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
  };

  const lineSuffix = line => {
    if (line == null) {
      return '';
    } else if (line <= 0) {
      return line + ' ';
    } else if (line > 0) {
      return '+' + line + ' ';
    }
  };

  const netProfitSuffix = netProfit => {
    // Old suffix
    // return netProfit < 0 ? "-$" + Math.abs(netProfit/100) : "$" + (netProfit/100);

    let res = (Math.abs(netProfit) / 100).toFixed(2);
    let lastIndex = res[res.length - 1];
    let secondLastIndex = res[res.length - 2];
    const comp = lastIndex == 0 && secondLastIndex == 0;
    if (comp) {
      res = parseInt(res);
    }

    if (netProfit < 0) {
      return '-$' + res;
    } else {
      return '$' + res;
    }
  };

  const parlayLegCount = bets => {
    return bets.length;
  };

  const propDetailsMetricSpecial = metricSpecial => {
    return metricSpecial == null
      ? ''
      : metricSpecial.charAt(0).toUpperCase() + metricSpecial.slice(1) + ' ';
  };

  const pushOutcomeCompare = outcome => {
    return outcome === 'push';
  };

  const toWinSuffix = toWin => {
    // Old Suffix
    // return "$" + (toWin/100);

    let res = (Math.abs(toWin) / 100).toFixed(2);
    let lastIndex = res[res.length - 1];
    let secondLastIndex = res[res.length - 2];
    const comp = lastIndex == 0 && secondLastIndex == 0;
    if (comp) {
      res = parseInt(res);
    }

    if (toWin < 0) {
      return '-$' + res;
    } else {
      return '$' + res;
    }
  };

  const typePropCompare = type => {
    return type === 'prop';
  };

  const typeTeaserCompare = type => {
    return type === 'teaser';
  };

  const cashoutOutcomeCompare = outcome => {
    return outcome === 'cashout';
  };

  const eventLeagueSuffix = league => {
    return league == null ? '' : league + ' | ';
  };

  const liveBetExists = live => {
    return live == true ? '(Live)' : '';
  };

  const oddsAmericanSyntax = oddsAmerican => {
    //return oddsAmerican < 0 ? "(" + oddsAmerican + ") " : "(+" + oddsAmerican + ") ";

    if (oddsAmerican == null) {
      return '';
    } else if (oddsAmerican < 0) {
      return '(' + oddsAmerican + ') ';
    } else {
      return '(+' + oddsAmerican + ') ';
    }
  };

  const pendingOutcomeCompare = outcome => {
    return outcome === 'pending' || outcome == null;
  };

  const propositionTotal = proposition => {
    return proposition === 'total';
  };

  const segmentExists = segment => {
    return segment == null ? '' : '(' + segment + ') ';
  };

  const typeMultilegCompare = type => {
    return type === 'parlay' || type === 'teaser';
  };

  const typeSingleCompare = type => {
    return type === 'single';
  };

  const voidOutcomeCompare = outcome => {
    return outcome === 'void';
  };

  const futureHideDate = future => {
    return future == true;
  };

  const eventNotExist = event => {
    return event == null;
  };

  const bookRegionSyntax = abbr => {
    return '(' + abbr.toUpperCase() + ')';
  };

  const timePlacedSyntax = timePlaced => {
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date(timePlaced);

    if (timePlaced == null) {
      return '';
    } else {
      let str = ' (' + month[date.getMonth()] + ' ' + date.getDate() + ', ';
      if (date.getFullYear() === new Date().getFullYear()) {
        str = str;
      } else {
        str = str + date.getFullYear() + ', ';
      }
      if (date.getHours() >= 12) {
        if (date.getHours() == 12) {
          str =
            str +
            date.getHours() +
            ':' +
            (date.getMinutes() < 10
              ? '0' + date.getMinutes()
              : date.getMinutes()) +
            'p';
        } else {
          str =
            str +
            (date.getHours() - 12) +
            ':' +
            (date.getMinutes() < 10
              ? '0' + date.getMinutes()
              : date.getMinutes()) +
            'p';
        }
      } else {
        if (date.getHours() == 0) {
          str =
            str +
            (date.getHours() + 12) +
            ':' +
            (date.getMinutes() < 10
              ? '0' + date.getMinutes()
              : date.getMinutes()) +
            'a';
        } else {
          str =
            str +
            date.getHours() +
            ':' +
            (date.getMinutes() < 10
              ? '0' + date.getMinutes()
              : date.getMinutes()) +
            'a';
        }
      }
      return str + ')';
    }
  };

  const halfwinOutcomeCompare = outcome => {
    return outcome === 'halfwin';
  };

  const halflossOutcomeCompare = outcome => {
    return outcome === 'halfloss';
  };

  const removeSemiColon = x => {
    //return (x.slice(-1) === ";") ? x.slice(0,-1) : x;

    if (x.slice(-2) == '; ') {
      return x.slice(0, -2);
    } else if (x.slice(-1) == ';' || x.slice(-1) == ' ') {
      return x.slice(0, -1);
    } else {
      return x;
    }

    // "abc".slice(-1); // "c";

    // const text = 'abcdef'
    // const editedText = text.slice(0, -1) //'abcde'
  };

  const scoreAvailable = x => {
    return x[0].awayScore !== null;
  };

  const spreadCompare = x => {
    return x === 'spread';
  };

  const totalCompare = x => {
    return x === 'total';
  };

  const moneylineCompare = x => {
    return x === 'moneyline';
  };

  const awayScoreAvailable = x => {
    return x !== null;
  };

  const showParlayDescription = x => {
    if (
      (x.propDetails == null ||
        (x.propDetails.player == null &&
          x.propDetails.team == null &&
          x.propDetails.future == null &&
          x.propDetails.metricSpecial == null)) &&
      (x.proposition == null ||
        x.proposition == 'spread' ||
        x.proposition == 'total' ||
        x.proposition == 'moneyline' ||
        x.proposition == 'method of result') &&
      x.oddsAmerican == null &&
      x.position == null &&
      x.line == null &&
      x.segment == null
    ) {
      return false;
    } else {
      return true;
    }
  };

  const { theme } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      segmentLogScreen(segment, 'Bet Info');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer scrollable={true} hasSafeArea={false}>
      <View
        style={StyleSheet.applyWidth(
          { flexGrow: 1, minHeight: 50 },
          dimensions.width
        )}
      >
        <SwaggerAPIApi.FetchGetBetslipsByBettorIdAndBetslipGET
          betslipId={props.route?.params?.Bet ?? ''}
          userId={Constants['internalId']}
        >
          {({
            loading,
            error,
            data,
            refetchGetBetslipsByBettorIdAndBetslip,
          }) => {
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
                {/* Bet Result */}
                <View>
                  {/* Title */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: 16,
                        marginRight: 16,
                        marginTop: 18,
                        opacity: 1,
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
                          marginRight: 3,
                        },
                        dimensions.width
                      )}
                    >
                      <>
                        {!lossOutcomeCompare(fetchData?.outcome) ? null : (
                          <Icon
                            name={'Ionicons/ios-close-circle-sharp'}
                            color={theme.colors.badErrorCancel}
                            size={32}
                          />
                        )}
                      </>
                      <>
                        {!winOutcomeCompare(fetchData?.outcome) ? null : (
                          <Icon
                            color={theme.colors.good}
                            name={'Ionicons/ios-checkmark-circle-sharp'}
                            size={32}
                          />
                        )}
                      </>
                      <>
                        {!voidOutcomeCompare(fetchData?.outcome) ? null : (
                          <Icon
                            name={'Ionicons/ios-remove-circle-sharp'}
                            color={theme.colors.lightLowImportanceText}
                            size={32}
                          />
                        )}
                      </>
                      <>
                        {!pushOutcomeCompare(fetchData?.outcome) ? null : (
                          <Icon
                            size={32}
                            name={'Ionicons/ios-remove-circle-sharp'}
                            color={theme.colors.lightLowImportanceText}
                          />
                        )}
                      </>
                      <>
                        {!cashoutOutcomeCompare(fetchData?.outcome) ? null : (
                          <Icon
                            name={'Ionicons/ios-arrow-undo-circle-sharp'}
                            color={theme.colors.fair}
                            size={32}
                          />
                        )}
                      </>
                    </View>
                    {/* Text View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1 },
                        dimensions.width
                      )}
                    >
                      {/* Single Bets */}
                      <>
                        {!typeSingleCompare(fetchData?.type) ? null : (
                          <FlatList
                            data={fetchData?.bets}
                            listKey={'3rfaazEU'}
                            keyExtractor={singleBetsData =>
                              singleBetsData?.id ||
                              singleBetsData?.uuid ||
                              JSON.stringify(singleBetsData)
                            }
                            renderItem={({ item }) => {
                              const singleBetsData = item;
                              return (
                                <>
                                  <>
                                    {propositionTotal(
                                      singleBetsData?.proposition
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors
                                                .backgroundInverseMainFont,
                                            fontFamily: 'System',
                                            fontSize: 20,
                                            fontWeight: '700',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {spacingSuffix(
                                          singleBetsData?.propDetails?.player
                                        )}
                                        {spacingSuffix(
                                          singleBetsData?.propDetails?.team
                                        )}
                                        {propositionUncommonDisplay(
                                          singleBetsData?.proposition
                                        )}
                                        {spacingSuffix(
                                          singleBetsData?.position
                                        )}
                                        {lineSuffix(singleBetsData?.line)}
                                        {propDetailsMetricSpecial(
                                          singleBetsData?.propDetails
                                            ?.metricSpecial
                                        )}
                                        {oddsAmericanSyntax(
                                          fetchData?.oddsAmerican
                                        )}
                                        {segmentExists(singleBetsData?.segment)}
                                        {futureBetExists(
                                          singleBetsData?.propDetails?.future
                                        )}
                                        {liveBetExists(singleBetsData?.live)}
                                      </Text>
                                    )}
                                  </>
                                  <>
                                    {!propositionTotal(
                                      singleBetsData?.proposition
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors
                                                .backgroundInverseMainFont,
                                            fontFamily: 'System',
                                            fontSize: 20,
                                            fontWeight: '700',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {spacingSuffix(
                                          singleBetsData?.propDetails?.player
                                        )}
                                        {spacingSuffix(
                                          singleBetsData?.propDetails?.team
                                        )}
                                        {spacingSuffix(
                                          singleBetsData?.position
                                        )}
                                        {spacingSuffix(singleBetsData?.line)}
                                        {propDetailsMetricSpecial(
                                          singleBetsData?.propDetails
                                            ?.metricSpecial
                                        )}
                                        {oddsAmericanSyntax(
                                          fetchData?.oddsAmerican
                                        )}
                                        {segmentExists(singleBetsData?.segment)}
                                        {futureBetExists(
                                          singleBetsData?.propDetails?.future
                                        )}
                                        {liveBetExists(singleBetsData?.live)}
                                      </Text>
                                    )}
                                  </>
                                  <>
                                    {eventNotExist(
                                      singleBetsData?.event
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors
                                                .lightLowImportanceText,
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '700',
                                            marginTop: 4,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {eventLeagueSuffix(
                                          singleBetsData?.event?.league
                                        )}
                                        {singleBetsData?.event?.name}
                                      </Text>
                                    )}
                                  </>
                                  {/* Live */}
                                  <>
                                    {singleBetsData?.active ? null : (
                                      <View>
                                        <>
                                          {eventNotExist(
                                            singleBetsData?.event
                                          ) ? null : (
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors
                                                      .lightLowImportanceText,
                                                  fontFamily: 'System',
                                                  fontSize: 12,
                                                  fontWeight: '400',
                                                  marginTop: 4,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {dateTimeStandard(
                                                singleBetsData?.event?.startTime
                                              )}
                                            </Text>
                                          )}
                                        </>
                                      </View>
                                    )}
                                  </>
                                </>
                              );
                            }}
                            contentContainerStyle={StyleSheet.applyWidth(
                              { flex: 1 },
                              dimensions.width
                            )}
                            numColumns={1}
                          />
                        )}
                      </>
                      <>
                        {!typeParlayCompare(fetchData?.type) ? null : (
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.backgroundInverseMainFont,
                                fontFamily: 'System',
                                fontSize: 20,
                                fontWeight: '700',
                              },
                              dimensions.width
                            )}
                          >
                            {parlayLegCount(fetchData?.bets)}
                            {'X Parlay '}
                            {oddsAmericanSyntax(fetchData?.oddsAmerican)}
                          </Text>
                        )}
                      </>
                      <>
                        {!typeTeaserCompare(fetchData?.type) ? null : (
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.backgroundInverseMainFont,
                                fontFamily: 'System',
                                fontSize: 20,
                                fontWeight: '700',
                              },
                              dimensions.width
                            )}
                          >
                            {'Teaser '}
                            {oddsAmericanSyntax(fetchData?.oddsAmerican)}
                          </Text>
                        )}
                      </>
                    </View>
                  </View>
                  {/* Tags View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        marginBottom: 12,
                        marginLeft: 16,
                        marginRight: 16,
                        marginTop: 6,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Icon Gap */}
                    <>
                      {pendingOutcomeCompare(fetchData?.outcome) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 35 },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', flexWrap: 'wrap' },
                        dimensions.width
                      )}
                    >
                      {/* Sportsbook Tag */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: theme.colors.divider,
                            borderRadius: 3,
                            flexDirection: 'row',
                            paddingBottom: 2,
                            paddingLeft: 6,
                            paddingRight: 6,
                            paddingTop: 2,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.light,
                              fontSize: 12,
                              marginRight: 3,
                            },
                            dimensions.width
                          )}
                        >
                          {'Bet on'}
                        </Text>
                        {/* Logo */}
                        <Image
                          style={StyleSheet.applyWidth(
                            { height: 12, width: 12 },
                            dimensions.width
                          )}
                          resizeMode={'contain'}
                          source={{ uri: `${fetchData?.book?.bookLogo}` }}
                        />
                      </View>
                      {/* Vault Tag */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: theme.colors.divider,
                            borderRadius: 3,
                            flexDirection: 'row',
                            marginLeft: 6,
                            paddingBottom: 2,
                            paddingLeft: 6,
                            paddingRight: 6,
                            paddingTop: 2,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.light,
                              fontSize: 12,
                              marginRight: 3,
                            },
                            dimensions.width
                          )}
                        >
                          {'Tracked on'}
                        </Text>
                        <Image
                          style={StyleSheet.applyWidth(
                            { height: 12, width: 50 },
                            dimensions.width
                          )}
                          resizeMode={'contain'}
                          source={Images.VaultLogoLightFontClearBackground}
                        />
                      </View>
                      {/* Free Bet Tag */}
                      <>
                        {!atRiskZero(fetchData?.atRisk) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor:
                                  theme.colors['Light_low_importance_text'],
                                borderRadius: 3,
                                flexDirection: 'row',
                                marginLeft: 6,
                                paddingBottom: 2,
                                paddingLeft: 6,
                                paddingRight: 6,
                                paddingTop: 2,
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Background'],
                                  fontSize: 12,
                                },
                                dimensions.width
                              )}
                            >
                              {'Free Bet'}
                            </Text>
                          </View>
                        )}
                      </>
                    </View>
                  </View>
                  {/* Bet List */}
                  <FlatList
                    data={fetchData?.bets}
                    listKey={'bDDz83UR'}
                    keyExtractor={betListData =>
                      betListData?.id ||
                      betListData?.uuid ||
                      JSON.stringify(betListData)
                    }
                    renderItem={({ item }) => {
                      const betListData = item;
                      return (
                        <>
                          {/* Scores View */}
                          <>
                            {!scoreAvailable(fetchData?.bets) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    marginLeft: 16,
                                    marginRight: 16,
                                    marginTop: 8,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Surface
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor: theme.colors['Divider'],
                                      borderRadius: 8,
                                      paddingBottom: 12,
                                      paddingTop: 12,
                                    },
                                    dimensions.width
                                  )}
                                  elevation={1}
                                >
                                  {/* Multileg Bet Info */}
                                  <>
                                    {!typeMultilegCompare(
                                      fetchData?.type
                                    ) ? null : (
                                      <View>
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              flexDirection: 'row',
                                              paddingLeft: 12,
                                              paddingRight: 12,
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
                                                marginRight: 6,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {/* Loss */}
                                            <>
                                              {!lossOutcomeCompare(
                                                betListData?.outcome
                                              ) ? null : (
                                                <Icon
                                                  name={
                                                    'Ionicons/ios-close-circle-sharp'
                                                  }
                                                  size={32}
                                                  color={
                                                    theme.colors.badErrorCancel
                                                  }
                                                />
                                              )}
                                            </>
                                            {/* Win */}
                                            <>
                                              {!winOutcomeCompare(
                                                betListData?.outcome
                                              ) ? null : (
                                                <Icon
                                                  name={
                                                    'Ionicons/ios-checkmark-circle-sharp'
                                                  }
                                                  color={theme.colors.good}
                                                  size={32}
                                                />
                                              )}
                                            </>
                                            {/* Push */}
                                            <>
                                              {!pushOutcomeCompare(
                                                betListData?.outcome
                                              ) ? null : (
                                                <Icon
                                                  name={
                                                    'Ionicons/ios-remove-circle-sharp'
                                                  }
                                                  size={32}
                                                  color={
                                                    theme.colors
                                                      .lightLowImportanceText
                                                  }
                                                />
                                              )}
                                            </>
                                            {/* Void */}
                                            <>
                                              {!voidOutcomeCompare(
                                                betListData?.outcome
                                              ) ? null : (
                                                <Icon
                                                  name={
                                                    'Ionicons/ios-remove-circle-sharp'
                                                  }
                                                  size={32}
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
                                                betListData?.outcome
                                              ) ? null : (
                                                <Icon
                                                  name={
                                                    'Ionicons/ios-arrow-undo-circle-sharp'
                                                  }
                                                  color={theme.colors.fair}
                                                  size={32}
                                                />
                                              )}
                                            </>
                                            {/* Pending/Null */}
                                            <>
                                              {!pendingOutcomeCompare(
                                                betListData?.outcome
                                              ) ? null : (
                                                <Icon
                                                  color={
                                                    theme.colors[
                                                      'Light_low_importance_text'
                                                    ]
                                                  }
                                                  size={32}
                                                  name={
                                                    'Ionicons/ios-radio-button-off'
                                                  }
                                                />
                                              )}
                                            </>
                                          </View>
                                          {/* Bet/Odds/Teams */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignItems: 'flex-start',
                                                flex: 1,
                                                justifyContent: 'center',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {/* Show/Hide Description View */}
                                            <>
                                              {!showParlayDescription(
                                                betListData
                                              ) ? null : (
                                                <View>
                                                  {/* Non Totals */}
                                                  <>
                                                    {propositionTotal(
                                                      betListData?.proposition
                                                    ) ? null : (
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors
                                                                .backgroundInverseMainFont,
                                                            fontFamily:
                                                              'System',
                                                            fontWeight: '700',
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {spacingSuffix(
                                                          betListData
                                                            ?.propDetails
                                                            ?.player
                                                        )}
                                                        {spacingSuffix(
                                                          betListData
                                                            ?.propDetails?.team
                                                        )}
                                                        {propositionUncommonDisplay(
                                                          betListData?.proposition
                                                        )}
                                                        {spacingSuffix(
                                                          betListData?.position
                                                        )}
                                                        {lineSuffix(
                                                          betListData?.line
                                                        )}
                                                        {propDetailsMetricSpecial(
                                                          betListData
                                                            ?.propDetails
                                                            ?.metricSpecial
                                                        )}
                                                        {oddsAmericanSyntax(
                                                          betListData?.oddsAmerican
                                                        )}
                                                        {segmentExists(
                                                          betListData?.segment
                                                        )}
                                                        {futureBetExists(
                                                          betListData
                                                            ?.propDetails
                                                            ?.future
                                                        )}
                                                        {liveBetExists(
                                                          betListData?.live
                                                        )}
                                                      </Text>
                                                    )}
                                                  </>
                                                  {/* Totals */}
                                                  <>
                                                    {!propositionTotal(
                                                      betListData?.proposition
                                                    ) ? null : (
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors
                                                                .backgroundInverseMainFont,
                                                            fontFamily:
                                                              'System',
                                                            fontWeight: '700',
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {spacingSuffix(
                                                          betListData
                                                            ?.propDetails
                                                            ?.player
                                                        )}
                                                        {spacingSuffix(
                                                          betListData
                                                            ?.propDetails?.team
                                                        )}
                                                        {spacingSuffix(
                                                          betListData?.position
                                                        )}
                                                        {spacingSuffix(
                                                          betListData?.line
                                                        )}
                                                        {propDetailsMetricSpecial(
                                                          betListData
                                                            ?.propDetails
                                                            ?.metricSpecial
                                                        )}
                                                        {oddsAmericanSyntax(
                                                          betListData?.oddsAmerican
                                                        )}
                                                        {segmentExists(
                                                          betListData?.segment
                                                        )}
                                                        {futureBetExists(
                                                          betListData
                                                            ?.propDetails
                                                            ?.future
                                                        )}
                                                        {liveBetExists(
                                                          betListData?.live
                                                        )}
                                                      </Text>
                                                    )}
                                                  </>
                                                </View>
                                              )}
                                            </>
                                            <>
                                              {!betListData?.bookDescription ? null : (
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
                                                >
                                                  {eventLeagueSuffix(
                                                    betListData?.event?.league
                                                  )}
                                                  {removeSemiColon(
                                                    betListData?.bookDescription
                                                  )}
                                                </Text>
                                              )}
                                            </>
                                            <>
                                              {eventNotExist(
                                                betListData?.event
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
                                                >
                                                  {dateTimeStandard(
                                                    betListData?.event
                                                      ?.startTime
                                                  )}
                                                </Text>
                                              )}
                                            </>
                                          </View>
                                        </View>
                                        <>
                                          {!betListData?.event
                                            ?.awayScore ? null : (
                                            <Divider
                                              style={StyleSheet.applyWidth(
                                                {
                                                  height: 1,
                                                  marginBottom: 4,
                                                  marginTop: 12,
                                                },
                                                dimensions.width
                                              )}
                                              color={theme.colors['Background']}
                                            />
                                          )}
                                        </>
                                      </View>
                                    )}
                                  </>
                                  {/* Game Score */}
                                  <>
                                    {!awayScoreAvailable(
                                      betListData?.event?.awayScore
                                    ) ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 8,
                                            paddingLeft: 12,
                                            paddingRight: 12,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {/* Away Team */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              flexDirection: 'row',
                                              width: '42%',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                marginRight: 6,
                                                maxWidth: '55%',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {/* Team Abbr */}
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors[
                                                      'Light_low_importance_text'
                                                    ],
                                                  fontFamily: 'System',
                                                  fontSize: 28,
                                                  fontWeight: '300',
                                                },
                                                dimensions.width
                                              )}
                                              ellipsizeMode={'tail'}
                                              numberOfLines={1}
                                            >
                                              {abbrTeamName(
                                                betListData?.event?.awayTeam
                                              )}
                                            </Text>
                                          </View>
                                          {/* Away Score */}
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
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {betListData?.event?.awayScore}
                                          </Text>
                                        </View>
                                        {/* Game Time */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              width: '15%',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {/* Live */}
                                          <>
                                            {!betListData?.active ? null : (
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: 'center',
                                                    backgroundColor:
                                                      theme.colors['Error'],
                                                    borderRadius: 2,
                                                    justifyContent: 'center',
                                                    paddingLeft: 2,
                                                    paddingRight: 2,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {/* Live */}
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors[
                                                          'Background Inverse (Main Font)'
                                                        ],
                                                      fontFamily: 'System',
                                                      fontSize: 12,
                                                      fontWeight: '400',
                                                      textAlign: 'center',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {'LIVE'}
                                                </Text>
                                              </View>
                                            )}
                                          </>
                                        </View>
                                        {/* Home Team */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              flexDirection: 'row',
                                              justifyContent: 'flex-end',
                                              width: '42%',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {/* Home Score */}
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
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {betListData?.event?.homeScore}
                                          </Text>

                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                marginLeft: 6,
                                                maxWidth: '55%',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {/* Team Abbr */}
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors[
                                                      'Light_low_importance_text'
                                                    ],
                                                  fontFamily: 'System',
                                                  fontSize: 28,
                                                  fontWeight: '300',
                                                },
                                                dimensions.width
                                              )}
                                              ellipsizeMode={'tail'}
                                              numberOfLines={1}
                                            >
                                              {abbrTeamName(
                                                betListData?.event?.homeTeam
                                              )}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    )}
                                  </>
                                  {/* Bet Indicator */}
                                  <>
                                    {!betListData?.activeBetStatus ? null : (
                                      <View>
                                        {/* Remove Non Active View */}
                                        <>
                                          {!betListData?.active ? null : (
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  marginBottom: 14,
                                                  marginTop: 12,
                                                  paddingLeft: 12,
                                                  paddingRight: 12,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    justifyContent:
                                                      'space-between',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: 'flex-start',
                                                      width: '10%',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* Away Team Abbr */}
                                                  <Text
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          theme.colors[
                                                            'Background Inverse (Main Font)'
                                                          ],
                                                        fontFamily: 'System',
                                                        fontSize: 12,
                                                        fontWeight: '300',
                                                      },
                                                      dimensions.width
                                                    )}
                                                    ellipsizeMode={'tail'}
                                                    numberOfLines={1}
                                                  >
                                                    {abbrTeamName(
                                                      betListData?.event
                                                        ?.awayTeam
                                                    )}
                                                  </Text>
                                                </View>
                                                {/* Bet Indicator */}
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: 'center',
                                                      height: 60,
                                                      justifyContent: 'center',
                                                      width: '77%',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* Custom Code Total */}
                                                  <>
                                                    {!totalCompare(
                                                      betListData?.proposition
                                                    ) ? null : (
                                                      <Utils.CustomCodeErrorBoundary>
                                                        <BetIndicators.VictoryBarTotal
                                                          bet={betListData}
                                                        />
                                                      </Utils.CustomCodeErrorBoundary>
                                                    )}
                                                  </>
                                                  {/* Custom Code Moneyline */}
                                                  <>
                                                    {!moneylineCompare(
                                                      betListData?.proposition
                                                    ) ? null : (
                                                      <Utils.CustomCodeErrorBoundary>
                                                        <BetIndicators.VictoryBarMoneyline
                                                          bet={betListData}
                                                        />
                                                      </Utils.CustomCodeErrorBoundary>
                                                    )}
                                                  </>
                                                  {/* Custom Code Spread */}
                                                  <>
                                                    {!spreadCompare(
                                                      betListData?.proposition
                                                    ) ? null : (
                                                      <Utils.CustomCodeErrorBoundary>
                                                        <BetIndicators.VictoryBarSpread
                                                          bet={betListData}
                                                        />
                                                      </Utils.CustomCodeErrorBoundary>
                                                    )}
                                                  </>
                                                </View>

                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: 'flex-end',
                                                      width: '10%',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* Home Team Abbr */}
                                                  <Text
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          theme.colors[
                                                            'Background Inverse (Main Font)'
                                                          ],
                                                        fontFamily: 'System',
                                                        fontSize: 12,
                                                        fontWeight: '300',
                                                      },
                                                      dimensions.width
                                                    )}
                                                    ellipsizeMode={'tail'}
                                                    numberOfLines={1}
                                                  >
                                                    {abbrTeamName(
                                                      betListData?.event
                                                        ?.homeTeam
                                                    )}
                                                  </Text>
                                                </View>
                                              </View>
                                              {/* Winning Losing */}
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  { alignItems: 'center' },
                                                  dimensions.width
                                                )}
                                              >
                                                {/* Winning */}
                                                <>
                                                  {!winOutcomeCompare(
                                                    betListData?.activeBetStatus
                                                  ) ? null : (
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignItems: 'center',
                                                          backgroundColor:
                                                            theme.colors[
                                                              'Good'
                                                            ],
                                                          borderRadius: 3,
                                                          justifyContent:
                                                            'center',
                                                          paddingBottom: 2,
                                                          paddingLeft: 6,
                                                          paddingRight: 6,
                                                          paddingTop: 2,
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {/* Winning */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors[
                                                                'Divider'
                                                              ],
                                                            fontFamily:
                                                              'System',
                                                            fontWeight: '600',
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {'Winning'}
                                                      </Text>
                                                    </View>
                                                  )}
                                                </>
                                                {/* Losing */}
                                                <>
                                                  {!lossOutcomeCompare(
                                                    betListData?.activeBetStatus
                                                  ) ? null : (
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignItems: 'center',
                                                          backgroundColor:
                                                            theme.colors[
                                                              'Fair'
                                                            ],
                                                          borderRadius: 3,
                                                          justifyContent:
                                                            'center',
                                                          paddingBottom: 2,
                                                          paddingLeft: 6,
                                                          paddingRight: 6,
                                                          paddingTop: 2,
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {/* Losing */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors[
                                                                'Divider'
                                                              ],
                                                            fontFamily:
                                                              'System',
                                                            fontWeight: '600',
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {'Losing'}
                                                      </Text>
                                                    </View>
                                                  )}
                                                </>
                                                {/* Push */}
                                                <>
                                                  {!pushOutcomeCompare(
                                                    betListData?.activeBetStatus
                                                  ) ? null : (
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignItems: 'center',
                                                          backgroundColor:
                                                            theme.colors[
                                                              'Background Inverse (Main Font)'
                                                            ],
                                                          borderRadius: 3,
                                                          justifyContent:
                                                            'center',
                                                          paddingBottom: 2,
                                                          paddingLeft: 6,
                                                          paddingRight: 6,
                                                          paddingTop: 2,
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {/* Push */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              theme.colors[
                                                                'Divider'
                                                              ],
                                                            fontFamily:
                                                              'System',
                                                            fontWeight: '600',
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {'Push'}
                                                      </Text>
                                                    </View>
                                                  )}
                                                </>
                                              </View>
                                            </View>
                                          )}
                                        </>
                                      </View>
                                    )}
                                  </>
                                  {/* Bet Description */}
                                  <>
                                    {!typeSingleCompare(
                                      fetchData?.type
                                    ) ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { paddingLeft: 12, paddingRight: 12 },
                                          dimensions.width
                                        )}
                                      >
                                        {/* Bet Description */}
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color:
                                                theme.colors
                                                  .lightLowImportanceText,
                                              fontSize: 10,
                                              textAlign: 'center',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {removeSemiColon(
                                            fetchData?.description
                                          )}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                </Surface>
                              </View>
                            )}
                          </>
                        </>
                      );
                    }}
                    contentContainerStyle={StyleSheet.applyWidth(
                      { flex: 1 },
                      dimensions.width
                    )}
                    numColumns={1}
                  />
                  {/* Bet Info */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        marginBottom: 28,
                        marginLeft: 16,
                        marginRight: 16,
                        marginTop: 20,
                      },
                      dimensions.width
                    )}
                  >
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.divider,
                          borderBottomWidth: 0.75,
                          borderColor: theme.colors.light,
                          borderLeftWidth: 0.75,
                          borderRadius: 8,
                          borderRightWidth: 0.75,
                          borderTopWidth: 0.75,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* Records Block */}
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
                            paddingBottom: 12,
                            paddingLeft: 12,
                            paddingRight: 12,
                            paddingTop: 12,
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { alignSelf: 'center', width: '30%' },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                { alignContent: 'center' },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors.backgroundInverseMainFont,
                                    fontFamily: 'System',
                                    fontSize: 20,
                                    fontWeight: '700',
                                    textAlign: 'center',
                                  },
                                  dimensions.width
                                )}
                              >
                                {atRiskSuffix(fetchData?.atRisk)}
                              </Text>
                            </View>
                            {/* Risk */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  alignSelf: 'center',
                                  color: theme.colors.lightLowImportanceText,
                                  fontSize: 14,
                                  marginTop: 4,
                                  textAlign: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              {'Risk'}
                            </Text>
                          </View>

                          <View
                            style={StyleSheet.applyWidth(
                              { alignSelf: 'center', width: '30%' },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                { alignContent: 'center' },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors.backgroundInverseMainFont,
                                    fontFamily: 'System',
                                    fontSize: 20,
                                    fontWeight: '700',
                                    textAlign: 'center',
                                  },
                                  dimensions.width
                                )}
                              >
                                {toWinSuffix(fetchData?.toWin)}
                              </Text>
                            </View>
                            {/* To Win */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  alignSelf: 'center',
                                  color: theme.colors.lightLowImportanceText,
                                  fontSize: 14,
                                  marginTop: 4,
                                  textAlign: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              {'To Win'}
                            </Text>
                          </View>

                          <View
                            style={StyleSheet.applyWidth(
                              { alignSelf: 'center', width: '30%' },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                { alignContent: 'center' },
                                dimensions.width
                              )}
                            >
                              <>
                                {!pendingOutcomeCompare(
                                  fetchData?.outcome
                                ) ? null : (
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          theme.colors
                                            .backgroundInverseMainFont,
                                        fontFamily: 'System',
                                        fontSize: 20,
                                        fontWeight: '700',
                                        textAlign: 'center',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'-'}
                                  </Text>
                                )}
                              </>
                              <>
                                {!lossOutcomeCompare(
                                  fetchData?.outcome
                                ) ? null : (
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors.badErrorCancel,
                                        fontFamily: 'System',
                                        fontSize: 20,
                                        fontWeight: '700',
                                        textAlign: 'center',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {netProfitSuffix(fetchData?.netProfit)}
                                  </Text>
                                )}
                              </>
                              <>
                                {!winOutcomeCompare(
                                  fetchData?.outcome
                                ) ? null : (
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors.good,
                                        fontFamily: 'System',
                                        fontSize: 20,
                                        fontWeight: '700',
                                        textAlign: 'center',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {netProfitSuffix(fetchData?.netProfit)}
                                  </Text>
                                )}
                              </>
                              <>
                                {!voidOutcomeCompare(
                                  fetchData?.outcome
                                ) ? null : (
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          theme.colors
                                            .backgroundInverseMainFont,
                                        fontFamily: 'System',
                                        fontSize: 20,
                                        fontWeight: '700',
                                        textAlign: 'center',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {netProfitSuffix(fetchData?.netProfit)}
                                  </Text>
                                )}
                              </>
                              <>
                                {!cashoutOutcomeCompare(
                                  fetchData?.outcome
                                ) ? null : (
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors.fair,
                                        fontFamily: 'System',
                                        fontSize: 20,
                                        fontWeight: '700',
                                        textAlign: 'center',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {netProfitSuffix(fetchData?.netProfit)}
                                  </Text>
                                )}
                              </>
                              <>
                                {!pushOutcomeCompare(
                                  fetchData?.outcome
                                ) ? null : (
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          theme.colors
                                            .backgroundInverseMainFont,
                                        fontFamily: 'System',
                                        fontSize: 20,
                                        fontWeight: '700',
                                        textAlign: 'center',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {netProfitSuffix(fetchData?.netProfit)}
                                  </Text>
                                )}
                              </>
                            </View>
                            {/* Cashout */}
                            <>
                              {!cashoutOutcomeCompare(
                                fetchData?.outcome
                              ) ? null : (
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignSelf: 'center',
                                      color: theme.colors.fair,
                                      fontSize: 8,
                                      textAlign: 'center',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Cashout'}
                                </Text>
                              )}
                            </>
                            {/* Halfwin */}
                            <>
                              {!halfwinOutcomeCompare(
                                fetchData?.outcome
                              ) ? null : (
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignSelf: 'center',
                                      color: theme.colors.good,
                                      fontSize: 8,
                                      textAlign: 'center',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Half Win'}
                                </Text>
                              )}
                            </>
                            {/* Halfloss */}
                            <>
                              {!halflossOutcomeCompare(
                                fetchData?.outcome
                              ) ? null : (
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignSelf: 'center',
                                      color: theme.colors.badErrorCancel,
                                      fontSize: 8,
                                      textAlign: 'center',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Half Loss'}
                                </Text>
                              )}
                            </>
                            {/* Void */}
                            <>
                              {!voidOutcomeCompare(
                                fetchData?.outcome
                              ) ? null : (
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignSelf: 'center',
                                      color:
                                        theme.colors.backgroundInverseMainFont,
                                      fontSize: 8,
                                      textAlign: 'center',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Void'}
                                </Text>
                              )}
                            </>
                            {/* Net Profit */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  alignSelf: 'center',
                                  color: theme.colors.lightLowImportanceText,
                                  fontSize: 14,
                                  marginTop: 4,
                                  textAlign: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              {'Net Profit'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Surface>
                  </View>
                </View>
              </>
            );
          }}
        </SwaggerAPIApi.FetchGetBetslipsByBettorIdAndBetslipGET>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(MyBetsBetInfoScreen);
