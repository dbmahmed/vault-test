import React, { useEffect, useState, Fragment } from 'react';
import {
  ButtonOutline,
  TextField,
  Touchable,
  Slider,
  Icon,
  Divider,
  ButtonSolid,
  WebView,
  Surface,
} from '@draftbit/ui';
import {
  KeyboardAvoidingView,
  View,
  Platform,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  ActivityIndicator,
  Share,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  VictoryPie,
  VictoryLabel,
  VictoryScatter,
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryBar,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryTooltip,
  VictoryZoomContainer,
  VictoryAnimation,
} from 'victory-native';
import { Svg, ViewBox, Circle, clipPath } from 'react-native-svg';
//import { Modal, Portal, withTheme, Button, Provider } from 'react-native-paper';
//import SelectBox from 'react-native-multi-selectbox';
//import { xorBy } from 'lodash';
//import SharpSportsMobileLink from '@sharpsports/sharpsports-mobile-link';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import { useNavigation } from '@react-navigation/native';
//import { WebView } from 'react-native-webview';
//USE THE BELOW SHARPSPORTS IMPORT FOR sharpSportsFormNew
//import SharpSports from '@sharpsports/sharpsports-mobile';
//import ButtonSpinner from 'react-native-button-spinner';
import * as GlobalVariableContext from './config/GlobalVariableContext';
export { useValues, useSetValue } from './config/GlobalVariableContext';
import { useScrollToTop } from '@react-navigation/native';
//import Purchases from 'react-native-purchases'; ****DON'T FORGET TO ADD THE PACKAGE BACK IN TOO!!
export { useEffect } from 'react';

/// TOTAL BET INDICATOR TEST
export function VictoryBarTotal() {
  return (
    <Fragment>
      <View>
        <Svg width={'100%'} height={100}>
          <VictoryChart domainPadding={0}>
            <VictoryBar
              horizontal
              style={{ data: { fill: '#242323' } }}
              labels={({ datum }) => `${datum.y}`}
              labelComponent={
                <VictoryLabel
                  style={[{ fill: 'red', fontSize: 12, fontWeight: 'bold' }]}
                  dx={0}
                  dy={10}
                  textAnchor="middle"
                  verticalAnchor="start"
                />
              }
              data={[{ x: 1, y: 55.5, y0: 1 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                bottomRight: 5,
                topLeft: 5,
                bottomLeft: 5,
              }}
            />
            <VictoryBar
              horizontal
              style={{ data: { fill: '#0bbb00' } }}
              labels={({ datum }) => `${datum.y}`}
              labelComponent={
                <VictoryLabel
                  style={[{ fill: 'red', fontSize: 12, fontWeight: 'bold' }]}
                  dx={0}
                  dy={-10}
                  textAnchor="middle"
                  verticalAnchor="end"
                />
              }
              data={[{ x: 1, y: 40, y0: 1 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                bottomRight: 5,
                topLeft: 5,
                bottomLeft: 5,
              }}
            />
          </VictoryChart>
        </Svg>
      </View>
    </Fragment>
  );
}

// Subscription Stuff
/*
const PackageItem = ({ purchasePackage, setIsPurchasing }) => {
  const {
    product: { title, description, price_string },
  } = purchasePackage;

  //const navigation = useNavigation();

  const onSelection = async () => {
    setIsPurchasing(true);

    try {
      //const { purchaserInfo } = await Purchases.purchasePackage(purchasePackage);

      //if (typeof purchaserInfo.entitlements.active['Pro'] !== 'undefined') {
        //navigation.goBack();
      //}
    } catch (e) {
      if (!e.userCancelled) {
        Alert.alert('Error purchasing package', e);
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Pressable onPress={onSelection}>
      <View>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </View>
      <Text>{price_string}</Text>
    </Pressable>
  );
};
*/

//////////////////////////////////
///////// Stream Chat /////////
//////////////////////////////////

/*

// chatConfig.js
export const chatApiKey = 'x65f7n98t9nq';
export const chatUserId = 'old-leaf-5';
export const chatUserToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoib2xkLWxlYWYtNSJ9.hyDohZyzXOjoLpAiBrdm9v_EsdChBACFqHpd7s0CuVI';
export const chatUserName = 'old-leaf-5';



// useChatClient.js
import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId, chatUserName, chatUserToken } from './chatConfig';

const user = {
  id: chatUserId,
  name: chatUserName
};

const chatClient = StreamChat.getInstance(chatApiKey);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      try {
        await chatClient.connectUser(user, chatUserToken);
        setClientIsReady(true);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error occurred while connecting the user: ${error.message}`)
        }
      }
    }
    
    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    if (!chatClient.userID) {
      setupClient();
    }
  }, []);

  return {
    clientIsReady,
  }
}


// ChannelList Screen
const ChannelListScreen = props => {
  return (
    <ChannelList
      onSelect={(channel) => {
        const { navigation } = props;
        navigation.navigate('ChannelScreen', { channel });
      }}
      filters={filters}
      sort={sort}
    />
  );
};


// Channel Screen
const ChannelScreen = props => {
  const { route, navigation } = props;
  const { params: { channel } } = route;

  return (
    <Channel channel={channel}>
      <MessageList
        onThreadSelect={(message) => {
          if (channel?.id) {
            navigation.navigate('ThreadScreen', { channel, message });
          }
        }}
      />
      <MessageInput />
    </Channel>
  );
};


// Thread Screen
const ThreadScreen = props => {
  const { route } = props;
  const { params: { channel, message } } = route;

  return null;
  return (
    <Channel channel={channel} thread={message} threadList>
      <Thread />
    </Channel>
  );
}

*/

/////////////////////////////////////////
///////// Subscription Packages /////////
/////////////////////////////////////////

/*
export function SubscriptionPackages() {
  const [packages, setPackages] = useState([]);

  // - State for displaying an overlay view
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    // Get current available packages
    Purchases.setDebugLogsEnabled(true);
    Purchases.setup('appl_gMOricmggAeoIqbBlqCSSJKGCAp', null, false);
    const getPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        Alert.alert(JSON.stringify(offerings));
        //if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
        //  setPackages(offerings.current.availablePackages);
        //}
      } catch (e) {
        Alert.alert('Error getting offers', e.message);
      }
    };

    getPackages();
  }, []);

  const header = () => <Text>Magic Weather Premium</Text>;

  const footer = () => {
    console.warn(
      "Modify this value to reflect your app's Privacy Policy and Terms & Conditions agreements. Required to make it through App Review.",
    );
    return (
      <Text>
        "Don't forget to add your subscription terms and conditions. Read more about this here: https://www.revenuecat.com/blog/schedule-2-section-3-8-b"
      </Text>
    );
  };

  //The paywall flat list displaying each package
  return (
    <View>
      <Text>
        ""
      </Text>
      /*<FlatList
        data={packages}
        renderItem={({ item }) => <PackageItem purchasePackage={item} setIsPurchasing={setIsPurchasing} />}
        keyExtractor={(item) => item.identifier}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
      />

      {isPurchasing}
    </View>
  );
};
*/

////////////////////////////////////////////////
///////// SharpSports Popup w/ FanDuel /////////
////////////////////////////////////////////////
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

// Share button (Dashboard)
export function ShareVault2() {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "I'm tracking my bets on the Vault app - check this out! https://apps.apple.com/us/app/vault-the-sports-bet-tracker/id1595719004",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View
      style={{ marginLeft: '4%', marginRight: '4%' }}
      pointerEvents={'auto'}
    >
      <Divider style={{ height: 1 }} color={'#3A3838'} height={1} />
      <ButtonOutline
        onPress={onShare}
        style={{
          backgroundColor: 'transparent',
          borderRadius: 6,
          fontFamily: 'System',
          fontWeight: '700',
          borderWidth: 1,
          textAlign: 'center',
          fontSize: 16,
          width: 250,
        }}
        title={'Share Vault'}
      ></ButtonOutline>
      <Divider style={{ height: 1 }} color={'#3A3838'} height={1} />
    </View>
  );
}

// Share button (Settings)
export function ShareVault() {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "I'm tracking my bets on the Vault app - check this out! https://apps.apple.com/us/app/vault-the-sports-bet-tracker/id1595719004",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Touchable onPress={onShare}>
      <Surface
        style={{ backgroundColor: '#3A3838', minHeight: 40 }}
        elevation={1}
      >
        <View
          style={{
            marginLeft: 8,
            marginRight: 8,
            minHeight: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          pointerEvents={'auto'}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              name={'Ionicons/ios-share'}
              color={'#FF4564'}
              size={24}
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: '#F2F2F2', fontWeight: 'bold' }}>
              {'Share Vault'}
            </Text>
          </View>
          <Icon
            name={'Ionicons/ios-chevron-forward'}
            color={'#F2F2F2'}
            size={24}
          />
        </View>
      </Surface>
    </Touchable>
  );
}

// Share button (Chat)
export function ShareVault3() {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Let's share our bets on the Vault app - check this out! https://apps.apple.com/us/app/vault-the-sports-bet-tracker/id1595719004",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Touchable onPress={onShare}>
      <Surface
        style={{ backgroundColor: '#3A3838', minHeight: 40 }}
        elevation={1}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 8,
            marginRight: 8,
            minHeight: 50,
          }}
        >
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Icon
              style={{ marginLeft: 12, marginRight: 12 }}
              size={24}
              color={'#007AFF'}
              name={'Ionicons/ios-share'}
            />
            <Text
              style={{
                color: '#F2F2F2',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              {'Invite Friends to Vault'}
            </Text>
          </View>
          <Icon
            name={'Ionicons/ios-chevron-forward'}
            size={24}
            color={'#F2F2F2'}
          />
        </View>
      </Surface>
      /* //// OLD VERSION
      <Surface
        style={{ backgroundColor: '#3A3838', minHeight: 40 }}
        elevation={1}
      >
        <View
          style={{
            marginLeft: 8,
            marginRight: 8,
            minHeight: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          pointerEvents={'auto'}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              name={'Ionicons/ios-share'}
              color={'#FF4564'}
              size={24}
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: '#F2F2F2', fontWeight: 'bold' }}>
              {'Share Vault'}
            </Text>
          </View>
          <Icon
            name={'Ionicons/ios-chevron-forward'}
            color={'#F2F2F2'}
            size={24}
          />
        </View>
      </Surface>
      */
    </Touchable>
  );
}

////////////////////////////////// Games Screen custom Flatlist which disables scrolling
//////////////////////////////////  To update: data={listData}, scrollEnabled={false} 2X,
export const GamesScrollList = ({
  data,
  selectedTeam,
  setSelectedTeam,
  selectedTeamLine,
  setSelectedTeamLine,
  selectedTeamOddsAmerican,
  setSelectedTeamOddsAmerican,
  selectedSportsbook,
  setSelectedSportsbook,
  selectedSportsbookUrl,
  setSelectedSportsbookUrl,
}) => {
  const GamesScreen = props => {};
  const Constants = GlobalVariableContext.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariableContext.useSetValue();

  const getBetType = x => {
    return x[1];
  };

  const homeTeamOutcome = outcomes => {
    return outcomes[1];
  };

  const compareFanDuel = x => {
    return x === 'FanDuel';
  };

  const compareBarstool = x => {
    return x === 'Barstool';
  };

  const compareUnibet = x => {
    return x === 'Unibet';
  };

  const dateTimeShort = commence_time => {
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
    const date = new Date(commence_time);

    let str = month[date.getMonth()] + ' ' + date.getDate() + ', ';
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
  };

  const teamNameShorten = x => {
    if (x.length > 5) {
      return x.substring(0, 5) + '...';
    } else {
      return x;
    }
  };

  const oddsChangeLeague = x => {
    Constants.oddsDisplayed[0] = x;
    return [x, Constants.oddsDisplayed[1]];
  };

  const typeTotalCompare = x => {
    return x === 'totals';
  };

  const oddsFutures = x => {
    return x[1] === 'outrights';
  };

  const compareBetRivers = x => {
    return x === 'BetRivers';
  };

  const oddsAmericanSyntax = oddsAmerican => {
    if (!oddsAmerican) {
      return '-';
    } else if (oddsAmerican < 0) {
      return '(' + oddsAmerican + ')';
    } else {
      return '(+' + oddsAmerican + ')';
    }
  };

  const getLeague = x => {
    return x[0];
  };

  const oddsMMA = x => {
    return x[0] === 'mma_mixed_martial_arts';
  };

  const compareCaesars = x => {
    return x === 'Caesars';
  };

  const oddsMoneyline = x => {
    return x[1] === 'h2h';
  };

  const oddsAmericanMoneylineSyntax = oddsAmerican => {
    if (!oddsAmerican) {
      return '-';
    } else if (oddsAmerican < 0) {
      return oddsAmerican;
    } else {
      return '+' + oddsAmerican;
    }
  };

  const oddsNBA = x => {
    return x[0] === 'basketball_nba';
  };

  const typeFuturesCompare = x => {
    return x === 'outrights';
  };

  const compareFoxBet = x => {
    return x === 'FOX Bet';
  };

  const oddsNHL = x => {
    return x[0] === 'icehockey_nhl';
  };

  const comparePointsBet = x => {
    return x === 'PointsBet';
  };

  const compareDraftKings = x => {
    return x === 'DraftKings';
  };

  const isLive = commence_time => {
    const date = new Date(commence_time);
    const now = new Date();

    return now.getTime() > date.getTime() ? true : false;
  };

  const compareBetMGM = x => {
    return x === 'BetMGM';
  };

  const oddsChangeBetType = x => {
    Constants.oddsDisplayed[1] = x;
    return [Constants.oddsDisplayed[0], x];
  };

  const lineSyntax = point => {
    if (!point) {
      return '';
    } else if (point <= 0) {
      return point + ' ';
    } else {
      return '+' + point + ' ';
    }
  };

  const totalUnderSyntax = x => {
    return 'u' + x + ' ';
  };

  const typeSpreadCompare = x => {
    return x === 'spreads';
  };

  const oddsNCAAB = x => {
    return x[0] === 'basketball_ncaab';
  };

  const oddsTotal = x => {
    return x[1] === 'totals';
  };

  const oddsNFL = x => {
    return x[0] === 'americanfootball_nfl';
  };

  const oddsNCAAF = x => {
    return x[0] === 'americanfootball_ncaaf';
  };

  const totalOverSyntax = x => {
    return 'o' + x + ' ';
  };

  const oddsMLB = x => {
    return x[0] === 'baseball_mlb';
  };

  const awayTeamFilter = outcomes => {
    const away_team = Constants.awayTeam;
    const awayTeamDisplayed = outcomes.filter(
      outcome => outcome.name == away_team
    );

    return awayTeamDisplayed;
  };

  const oddsSpread = x => {
    return x[1] === 'spreads';
  };

  const typeMoneylineCompare = x => {
    return x === 'h2h';
  };

  /*const filterList = list => {
    console.log(list, textInputValue);

    newList = list.filter(
      item =>
        item.awayTeam.includes(textInputValue) ||
        item.homeTeam.includes(textInputValue) ||
        item.awayTeam.toLowerCase().includes(textInputValue) ||
        item.homeTeam.toLowerCase().includes(textInputValue)
    );

    return newList;
  };

  ///////data={filterList(data)}

  const [textInputValue, setTextInputValue] = React.useState('');*/

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  /*const [awayTeam, setAwayTeam] = React.useState('');
  const [homeTeam, setHomeTeam] = React.useState('');
  const [selectedSportsbook, setSelectedSportsbook] = React.useState('');
  const [selectedSportsbookAffiliateUrl, setSelectedSportsbookAffiliateUrl] =
    React.useState('');
  const [selectedSportsbookOffer, setSelectedSportsbookOffer] =
    React.useState('');
  const [selectedSportsbookUrl, setSelectedSportsbookUrl] = React.useState('');
  const [selectedTeam, setSelectedTeam] = React.useState('');
  const [selectedTeamLine, setSelectedTeamLine] = React.useState(0);
  const [selectedTeamOddsAmerican, setSelectedTeamOddsAmerican] =
    React.useState(0);*/

  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      renderItem={({ item }) => {
        const listData = item;
        return (
          <>
            <View style={styles.ViewDg} pointerEvents={'auto'}>
              <>
                {!typeSpreadCompare(listData?.betType) ? null : (
                  <FlatList
                    data={listData?.bookmakers}
                    scrollEnabled={false}
                    renderItem={({ item }) => {
                      const listSpreadData = item;
                      return (
                        <View style={styles.Viewmt} pointerEvents={'auto'}>
                          <Text
                            style={[styles.TextV8, { color: '#A5ADB7' }]}
                            ellipsizeMode={'clip'}
                            numberOfLines={1}
                          >
                            {listSpreadData?.cleansedTitle}
                          </Text>

                          <Touchable
                            onPress={() => {
                              try {
                                setSelectedTeam(listData?.awayTeam);
                                setSelectedTeamLine(
                                  lineSyntax(listSpreadData?.awayTeamLine)
                                );
                                setSelectedTeamOddsAmerican(
                                  oddsAmericanSyntax(
                                    listSpreadData?.awayTeamOddsAmerican
                                  )
                                );
                                setSelectedSportsbook(
                                  listSpreadData?.cleansedTitle
                                );
                                setSelectedSportsbookUrl(
                                  listSpreadData?.appUrl
                                );
                                setGlobalVariableValue({
                                  key: 'toggleSportsbookModal',
                                  value: true,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View style={styles.ViewvO} pointerEvents={'auto'}>
                              <Text
                                style={[
                                  styles.Text_9N,
                                  {
                                    color: '#F2F2F2',
                                  },
                                ]}
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                              >
                                {lineSyntax(listSpreadData?.awayTeamLine)}
                                {oddsAmericanSyntax(
                                  listSpreadData?.awayTeamOddsAmerican
                                )}
                              </Text>
                            </View>
                          </Touchable>

                          <Text
                            style={[
                              styles.TextOh,
                              {
                                color: '#242323',
                              },
                            ]}
                          >
                            {'-'}
                          </Text>

                          <Touchable
                            onPress={() => {
                              try {
                                setSelectedTeam(listData?.homeTeam);
                                setSelectedTeamLine(
                                  lineSyntax(listSpreadData?.homeTeamLine)
                                );
                                setSelectedTeamOddsAmerican(
                                  oddsAmericanSyntax(
                                    listSpreadData?.homeTeamOddsAmerican
                                  )
                                );
                                setSelectedSportsbook(
                                  listSpreadData?.cleansedTitle
                                );
                                setSelectedSportsbookUrl(
                                  listSpreadData?.appUrl
                                );
                                setGlobalVariableValue({
                                  key: 'toggleSportsbookModal',
                                  value: true,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View style={styles.View_3D} pointerEvents={'auto'}>
                              <Text
                                style={[
                                  styles.TextDa,
                                  {
                                    color: '#F2F2F2',
                                  },
                                ]}
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                              >
                                {lineSyntax(listSpreadData?.homeTeamLine)}
                                {oddsAmericanSyntax(
                                  listSpreadData?.homeTeamOddsAmerican
                                )}
                              </Text>
                            </View>
                          </Touchable>
                        </View>
                      );
                    }}
                    contentContainerStyle={styles.FlatListmmContent}
                    numColumns={1}
                    horizontal={true}
                  />
                )}
              </>
              <>
                {!typeTotalCompare(listData?.betType) ? null : (
                  <FlatList
                    data={listData?.bookmakers}
                    scrollEnabled={false}
                    renderItem={({ item }) => {
                      const listTotalData = item;
                      return (
                        <View style={styles.View_2o} pointerEvents={'auto'}>
                          <Text
                            style={[styles.TextyC, { color: '#A5ADB7' }]}
                            ellipsizeMode={'clip'}
                            numberOfLines={1}
                          >
                            {listTotalData?.cleansedTitle}
                          </Text>

                          <Touchable
                            onPress={() => {
                              try {
                                setSelectedTeam('Over');
                                setSelectedTeamLine(
                                  totalOverSyntax(listTotalData?.totalLine)
                                );
                                setSelectedTeamOddsAmerican(
                                  oddsAmericanSyntax(
                                    listTotalData?.overOddsAmerican
                                  )
                                );
                                setSelectedSportsbook(
                                  listTotalData?.cleansedTitle
                                );
                                setSelectedSportsbookUrl(listTotalData?.appUrl);
                                setGlobalVariableValue({
                                  key: 'toggleSportsbookModal',
                                  value: true,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View style={styles.View_3J} pointerEvents={'auto'}>
                              <Text
                                style={{
                                  color: '#F2F2F2',
                                }}
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                              >
                                {'o'}
                                {listTotalData?.totalLine}{' '}
                                {oddsAmericanSyntax(
                                  listTotalData?.overOddsAmerican
                                )}
                              </Text>
                            </View>
                          </Touchable>

                          <Text
                            style={[
                              styles.TextOl,
                              {
                                color: '#242323',
                              },
                            ]}
                          >
                            {'-'}
                          </Text>

                          <Touchable
                            onPress={() => {
                              try {
                                setSelectedTeam('Under');
                                setSelectedTeamLine(
                                  totalUnderSyntax(listTotalData?.totalLine)
                                );
                                setSelectedTeamOddsAmerican(
                                  oddsAmericanSyntax(
                                    listTotalData?.underOddsAmerican
                                  )
                                );
                                setSelectedSportsbook(
                                  listTotalData?.cleansedTitle
                                );
                                setSelectedSportsbookUrl(listTotalData?.appUrl);
                                setGlobalVariableValue({
                                  key: 'toggleSportsbookModal',
                                  value: true,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View style={styles.ViewR2} pointerEvents={'auto'}>
                              <Text
                                style={{
                                  color: '#F2F2F2',
                                }}
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                              >
                                {'u'}
                                {listTotalData?.totalLine}{' '}
                                {oddsAmericanSyntax(
                                  listTotalData?.underOddsAmerican
                                )}
                              </Text>
                            </View>
                          </Touchable>
                        </View>
                      );
                    }}
                    contentContainerStyle={styles.FlatListVDContent}
                    numColumns={1}
                    horizontal={true}
                  />
                )}
              </>
              <>
                {!typeMoneylineCompare(listData?.betType) ? null : (
                  <FlatList
                    data={listData?.bookmakers}
                    scrollEnabled={false}
                    renderItem={({ item }) => {
                      const listMoneylineData = item;
                      return (
                        <View style={styles.Viewae} pointerEvents={'auto'}>
                          <Text
                            style={[styles.Textfy, { color: '#A5ADB7' }]}
                            ellipsizeMode={'clip'}
                            numberOfLines={1}
                          >
                            {listMoneylineData?.cleansedTitle}
                          </Text>

                          <Touchable
                            onPress={() => {
                              try {
                                setSelectedTeam(listData?.awayTeam);
                                setSelectedTeamOddsAmerican(
                                  oddsAmericanMoneylineSyntax(
                                    listMoneylineData?.awayTeamOddsAmerican
                                  )
                                );
                                setSelectedSportsbook(
                                  listMoneylineData?.cleansedTitle
                                );
                                setSelectedSportsbookUrl(
                                  listMoneylineData?.appUrl
                                );
                                setGlobalVariableValue({
                                  key: 'toggleSportsbookModal',
                                  value: true,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View style={styles.Viewi4} pointerEvents={'auto'}>
                              <Text
                                style={{
                                  color: '#F2F2F2',
                                }}
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                              >
                                {oddsAmericanMoneylineSyntax(
                                  listMoneylineData?.awayTeamOddsAmerican
                                )}
                              </Text>
                            </View>
                          </Touchable>

                          <Text
                            style={[
                              styles.Textpr,
                              {
                                color: '#242323',
                              },
                            ]}
                          >
                            {'-'}
                          </Text>

                          <Touchable
                            onPress={() => {
                              try {
                                setSelectedTeam(listData?.homeTeam);
                                setSelectedTeamOddsAmerican(
                                  oddsAmericanMoneylineSyntax(
                                    listMoneylineData?.homeTeamOddsAmerican
                                  )
                                );
                                setSelectedSportsbook(
                                  listMoneylineData?.cleansedTitle
                                );
                                setSelectedSportsbookUrl(
                                  listMoneylineData?.appUrl
                                );
                                setGlobalVariableValue({
                                  key: 'toggleSportsbookModal',
                                  value: true,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View style={styles.View_4J} pointerEvents={'auto'}>
                              <Text
                                style={{
                                  color: '#F2F2F2',
                                }}
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                              >
                                {oddsAmericanMoneylineSyntax(
                                  listMoneylineData?.homeTeamOddsAmerican
                                )}
                              </Text>
                            </View>
                          </Touchable>
                        </View>
                      );
                    }}
                    contentContainerStyle={styles.FlatList_82Content}
                    numColumns={1}
                    horizontal={true}
                  />
                )}
              </>
            </View>
            <Divider style={styles.DividerTk} color={'#3a3838'} />
          </>
        );
      }}
      numColumns={1}
    />
  );
};

/// TEST TEST TEST Games Screen custom Flatlists which disable scrolling.
/*export const GamesScrollList2 = ({ data }) => {
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      renderItem={({ item }) => {
        const listData = item;
        return (
          <>
            {!typeSpreadCompare(listData?.betType) ? null : (
              <FlatList
                data={listData?.bookmakers}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      pointerEvents={'auto'}
                    >
                      <Text style={{ color: '#FE2900' }}>
                        {listData?.title}
                      </Text>
                    </View>
                  );
                }}
                contentContainerStyle={{ flex: 1 }}
                numColumns={1}
                horizontal={true}
              />
            )}
          </>
        );
      }}
      contentContainerStyle={{ flex: 1 }}
      numColumns={1}
    />
  );
};*/

///// SharpSports NPM integration. /////
// See documentaiton here:  https://www.npmjs.com/package/@sharpsports/sharpsports-mobile-link

/*
<Touchable
  onPress={() => {
    try {
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  }}
>
  <View style={styles.View_0D} pointerEvents={'auto'}>
    <Text style={[styles.Textgt, { color: theme.colors.background }]}>
      {'Sign Out'}
    </Text>
  </View>
</Touchable>*/

/*const handleWebViewNavigationStateChange = (props: Props, newNavState: WebViewNavigation) => {
    const { url } = newNavState;
    if (url.includes('/done')) {
        props.dismissWebView();
    }
}*/

/** put your comdition here based here and close webview.
                     if (navState.url.includes('/done')) {
        props.navigation.goBack();
                     Like if(e.url.indexOf("end_url") > -1)
                     Then close webview
                     onPress={() => props.navigation.goBack())}

                    onLoadEnd={() => {
          try {
            navigation.goBack();
          } catch (err) {
            console.error(err);
          }
        }}

        export const SharpSportsForm = ({back}) => {
        export function SharpSportsForm() {
        */

// The popup Form. //
export const SharpSportsForm = ({ navigation }) => {
  const variables = GlobalVariableContext.useValues();
  let body = 'internalId=' + variables.internalId;
  const [uri, setUri] = useState('init');
  const [loading, setLoading] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const [hasChangedInner, setHasChangedInner] = useState(false);
  const setGlobalVariableValue = GlobalVariableContext.useSetValue();

  useEffect(() => {
    if (uri == 'init') {
      fetch('https://api.sharpsports.io/v1/context', {
        headers: {
          Authorization: 'Token ded051886fb76987f7d80664cdb73b99fad637c0',
        },
        body: body, //JSON.stringify({internalId:internalId}),
        method: 'POST',
      })
        .then(response => response.json())
        .then(json => {
          setUri('https://ui.sharpsports.io/link/' + json.cid);
        })
        .catch(error => {
          console.error(error);
        });
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
          uri: uri,
        }}
        style={{ marginTop: 0 }}
        onNavigationStateChange={navState => {
          if (navState.url.includes('/done') && !hasChanged) {
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
              navigation.navigate('CreateProfile6ViewSyncedBooksScreen');

              //navigation.goBack();
            });
          }
        }}
      />
    </View>
  );
};
/*
// The NEW popup Form. //
export const SharpSportsForm2 = ({ navigation }) => {
  const variables = GlobalVariableContext.useValues();
  let body = 'internalId=' + variables.internalId;
  const [uri, setUri] = useState('init');
  const [loading, setLoading] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const setGlobalVariableValue = GlobalVariableContext.useSetValue();

  useEffect(() => {
    if (uri == 'init') {
      fetch('https://api.sharpsports.io/v1/context', {
        headers: {
          Authorization: 'Token ded051886fb76987f7d80664cdb73b99fad637c0',
        },
        body: body, //JSON.stringify({internalId:internalId}),
        method: 'POST',
      })
        .then(response => response.json())
        .then(json => {
          setUri('https://ui.sharpsports.io/link/' + json.cid);
        })
        .catch(error => {
          console.error(error);
        });
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
          uri: uri,
        }}
        style={{ marginTop: 0 }}
        onNavigationStateChange={navState => {
          if (navState.url.includes('/done') && !hasChanged) {
            setHasChanged(true);
            setGlobalVariableValue({
              key: 'updatedSportsBook',
              value: variables.updatedSportsBook + 1,
            });
            navigation.goBack();
          }
        }}
      />
    </View>
  );
};
*/

// Define the user's overall record, net, roi, and clv and creates the progress rings.
export function VictoryPieRecord() {
  const [isLoading, setLoading] = useState(true);
  const [getBettorStatsByBettorId, setgetBettorStatsByBettorId] = useState([]);
  const [wins, setWins] = useState([]);
  const [losses, setLosses] = useState([]);
  const [pushes, setPushes] = useState([]);
  const [userRecordOverall, setUserRecordOverall] = useState([]);
  const [recordRingColor, setRecordRingColor] = useState([]);
  const [userNetOverall, setUserNetOverall] = useState([]);
  const [userUnitsOverall, setUserUnitsOverall] = useState([]);
  const [userNetRingValue, setUserNetRingValue] = useState([]);
  const [netRingColor, setNetRingColor] = useState([]);
  const [userRoiOverall, setUserRoiOverall] = useState([]);
  const [userRoiRingValue, setUserRoiRingValue] = useState([]);
  const [roiRingColor, setRoiRingColor] = useState([]);
  const [userClvOverall, setUserClvOverall] = useState([]);
  const [userClvRingValue, setUserClvRingValue] = useState([]);
  const [clvRingColor, setClvRingColor] = useState([]);
  const variables = GlobalVariableContext.useValues();
  const [loading, setLoadingRings] = useState(true);
  const setGlobalVariableValue = GlobalVariableContext.useSetValue();
  useEffect(() => {
    fetch(
      'https://sportsbettingapi20201118035253.azurewebsites.net/Account/GetUnitSize?internalId=' +
        variables.internalId,
      {
        headers: {
          Accept: 'application/json',
          Authorization: variables.authToken,
        },
      }
    )
      .then(response => response.json())
      .then(json => {
        setGlobalVariableValue({ key: 'userDefaultUnitSize', value: json });
      });
    fetch(
      'https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorStatsByBettorId?id=' +
        variables.internalId,
      {
        headers: {
          Accept: 'application/json',
          Authorization: variables.authToken,
        },
      }
    )
      .then(response => response.json())
      .then(json => {
        //setgetBettorStatsByBettorId(json.record);
        const [w, l, p] = json.record.split(' - ');
        setWins(w);
        setLosses(l);
        setPushes(p);
        setUserRecordOverall((Number(w) / (Number(w) + Number(l))) * 100);
        let tempRecordRingColor = (Number(w) / (Number(w) + Number(l))) * 100;
        if (tempRecordRingColor > 51) {
          setRecordRingColor('#0BBB00');
        } else if (tempRecordRingColor > 47) {
          setRecordRingColor('#FF9A01');
        } else if (tempRecordRingColor > 40) {
          setRecordRingColor('#FF6100');
        } else {
          setRecordRingColor('#FE2900');
        }
        //setgetBettorStatsByBettorId(json.net);
        setUserUnitsOverall(json.net / 100 / variables.userDefaultUnitSize);
        setUserNetOverall(json.net / 100);
        let tempUserUnitsOverall =
          json.net / 100 / variables.userDefaultUnitSize;
        setUserNetRingValue(
          -100 / (1 + Math.exp(tempUserUnitsOverall / 15)) + 100
        );
        let tempNetRingColor =
          -100 / (1 + Math.exp(tempUserUnitsOverall / 15)) + 100;
        if (tempNetRingColor > 51) {
          setNetRingColor('#0BBB00');
        } else if (tempNetRingColor > 35) {
          setNetRingColor('#FF9A01');
        } else if (tempNetRingColor > 20) {
          setNetRingColor('#FF6100');
        } else {
          setNetRingColor('#FE2900');
        }
        //setgetBettorStatsByBettorId(json.roi);
        setUserRoiOverall(json.roi);
        setUserRoiRingValue(-100 / (1 + Math.exp(json.roi / 35)) + 100);
        let tempRoiRingColor = -100 / (1 + Math.exp(json.roi / 35)) + 100;
        if (tempRoiRingColor > 50) {
          setRoiRingColor('#0BBB00');
        } else if (tempRoiRingColor > 35) {
          setRoiRingColor('#FF9A01');
        } else if (tempRoiRingColor > 10) {
          setRoiRingColor('#FF6100');
        } else {
          setRoiRingColor('#FE2900');
        }
        //setgetBettorStatsByBettorId(json.clv);
        setUserClvOverall(1.8); //Set this value to test (1.8), but use json.clv.
        setUserClvRingValue(-100 / (1 + Math.exp(1.8 / 2)) + 100); //Set this value to test (1.8), but use json.clv
        let tempClvRingColor = -100 / (1 + Math.exp(1.8 / 2)) + 100; //Set this value to test (1.8), but use json.clv
        if (tempClvRingColor > 64.5) {
          setClvRingColor('#242323'); ////Change to #0BBB00 when available
        } else if (tempClvRingColor >= 50) {
          setClvRingColor('#FF9A01');
        } else if (tempClvRingColor > 25) {
          setClvRingColor('#FF6100');
        } else {
          setClvRingColor('#FE2900');
        }
      })
      .catch(error => console.error(error))
      .finally(() => setLoadingRings(false));
  }, [variables.authToken, variables.updatedSportsBook]);

  return (
    <Fragment>
      {loading ? (
        <View
          style={{
            //flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 27,
            //marginBottom: 6,
          }}
          pointerEvents={'auto'}
        >
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Svg viewBox="0 0 75 75">
              <Circle
                cx="37.5"
                cy="37.5"
                r="33.75"
                fill="none"
                stroke="#242323"
                strokeWidth={7.5}
              />
              <VictoryPie
                onLoad={() => setLoadingRings(false)}
                standalone={false}
                labels={() => null}
                width={75}
                height={75}
                innerRadius={30}
                radius={37.5}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[recordRingColor, 'transparent']}
                data={[
                  { x: 1, y: userRecordOverall },
                  { x: 2, y: 100 - userRecordOverall },
                ]}
              />
              <VictoryScatter
                width={75}
                height={75}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  `${Math.round(userRecordOverall * 10) / 10}%`,
                  wins + '-' + losses + '-' + pushes,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="start"
                    style={[
                      {
                        padding: 0,
                        fill: '#F2F2F2',
                        fontSize: 12,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                      {
                        padding: 0,
                        fill: '#F2F2F2',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
          <View>
            <Svg viewBox="0 0 75 75">
              <Circle
                cx="37.5"
                cy="37.5"
                r="33.75"
                fill="none"
                stroke="#242323"
                strokeWidth={7.5}
              />
              <VictoryPie
                standalone={false}
                labels={() => null}
                width={75}
                height={75}
                innerRadius={30}
                radius={37.5}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[netRingColor, 'transparent']}
                data={[
                  { x: 1, y: userNetRingValue },
                  { x: 2, y: 100 - userNetRingValue },
                ]}
              />
              <VictoryScatter
                width={75}
                height={75}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  userNetOverall < 0
                    ? '-$' + Math.abs(userNetOverall)
                    : '$' + Math.abs(userNetOverall),
                  userUnitsOverall > 0
                    ? `+${Math.round(userUnitsOverall * 100) / 100}U`
                    : `${Math.round(userUnitsOverall * 100) / 100}U`,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={9}
                    //verticalAnchor="start"
                    style={[
                      {
                        padding: 0,
                        fill: '#F2F2F2',
                        fontSize: 10,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                      {
                        padding: 0,
                        fill: '#F2F2F2',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
          <View>
            <Svg viewBox="0 0 75 75">
              <Circle
                cx="37.5"
                cy="37.5"
                r="33.75"
                fill="none"
                stroke="#242323"
                strokeWidth={7.5}
              />
              <VictoryPie
                standalone={false}
                labels={() => null}
                width={75}
                height={75}
                innerRadius={30}
                radius={37.5}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[roiRingColor, 'transparent']}
                data={[
                  { x: 1, y: userRoiRingValue },
                  { x: 2, y: 100 - userRoiRingValue },
                ]}
              />
              <VictoryScatter
                width={75}
                height={75}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  userRoiOverall > 0
                    ? `+${Math.round(userRoiOverall * 10) / 10}%`
                    : `${Math.round(userRoiOverall * 10) / 10}%`,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={6}
                    style={[
                      {
                        padding: 0,
                        fill: '#F2F2F2',
                        fontSize: 12,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
        </View>
      )}
    </Fragment>
  );
}

/// Single Victory Pie Ring For Record (Practice) ////
// Define the user's overall record, net, roi, and clv and creates the progress rings.
export function VictoryPieRecordTwo() {
  const [isLoading, setLoading] = useState(true);
  const [getBettorStatsByBettorId, setgetBettorStatsByBettorId] = useState([]);
  const [wins, setWins] = useState([]);
  const [losses, setLosses] = useState([]);
  const [pushes, setPushes] = useState([]);
  const [userRecordOverall, setUserRecordOverall] = useState([]);
  const [recordRingColor, setRecordRingColor] = useState([]);
  const [userNetOverall, setUserNetOverall] = useState([]);
  const [userUnitsOverall, setUserUnitsOverall] = useState([]);
  const [userNetRingValue, setUserNetRingValue] = useState([]);
  const [netRingColor, setNetRingColor] = useState([]);
  const [userRoiOverall, setUserRoiOverall] = useState([]);
  const [userRoiRingValue, setUserRoiRingValue] = useState([]);
  const [roiRingColor, setRoiRingColor] = useState([]);
  const [userClvOverall, setUserClvOverall] = useState([]);
  const [userClvRingValue, setUserClvRingValue] = useState([]);
  const [clvRingColor, setClvRingColor] = useState([]);
  const variables = GlobalVariableContext.useValues();
  const [loading, setLoadingRings] = useState(true);
  const setGlobalVariableValue = GlobalVariableContext.useSetValue();
  useEffect(() => {
    fetch(
      'https://sportsbettingapi20201118035253.azurewebsites.net/Account/GetUnitSize?internalId=' +
        variables.internalId,
      {
        headers: {
          Accept: 'application/json',
          Authorization: variables.authToken,
        },
      }
    )
      .then(response => response.json())
      .then(json => {
        setGlobalVariableValue({ key: 'userDefaultUnitSize', value: json });
      });
    fetch(
      'https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorStatsByBettorId?id=' +
        variables.internalId,
      {
        headers: {
          Accept: 'application/json',
          Authorization: variables.authToken,
        },
      }
    )
      .then(response => response.json())
      .then(json => {
        //setgetBettorStatsByBettorId(json.record);
        const [w, l, p] = json.record.split(' - ');
        setWins(w);
        setLosses(l);
        setPushes(p);
        setUserRecordOverall((Number(w) / (Number(w) + Number(l))) * 100);
        let tempRecordRingColor = (Number(w) / (Number(w) + Number(l))) * 100;
        if (tempRecordRingColor > 51) {
          setRecordRingColor('#0BBB00');
        } else if (tempRecordRingColor > 47) {
          setRecordRingColor('#FF9A01');
        } else if (tempRecordRingColor > 40) {
          setRecordRingColor('#FF6100');
        } else {
          setRecordRingColor('#FE2900');
        }
        //setgetBettorStatsByBettorId(json.net);
        setUserUnitsOverall(json.net / 100 / variables.userDefaultUnitSize);
        setUserNetOverall(json.net / 100);
        let tempUserUnitsOverall =
          json.net / 100 / variables.userDefaultUnitSize;
        setUserNetRingValue(
          -100 / (1 + Math.exp(tempUserUnitsOverall / 15)) + 100
        );
        let tempNetRingColor =
          -100 / (1 + Math.exp(tempUserUnitsOverall / 15)) + 100;
        if (tempNetRingColor > 51) {
          setNetRingColor('#0BBB00');
        } else if (tempNetRingColor > 35) {
          setNetRingColor('#FF9A01');
        } else if (tempNetRingColor > 20) {
          setNetRingColor('#FF6100');
        } else {
          setNetRingColor('#FE2900');
        }
        //setgetBettorStatsByBettorId(json.roi);
        setUserRoiOverall(json.roi);
        setUserRoiRingValue(-100 / (1 + Math.exp(json.roi / 35)) + 100);
        let tempRoiRingColor = -100 / (1 + Math.exp(json.roi / 35)) + 100;
        if (tempRoiRingColor > 50) {
          setRoiRingColor('#0BBB00');
        } else if (tempRoiRingColor > 35) {
          setRoiRingColor('#FF9A01');
        } else if (tempRoiRingColor > 10) {
          setRoiRingColor('#FF6100');
        } else {
          setRoiRingColor('#FE2900');
        }
        //setgetBettorStatsByBettorId(json.clv);
        setUserClvOverall(1.8); //Set this value to test (1.8), but use json.clv.
        setUserClvRingValue(-100 / (1 + Math.exp(1.8 / 2)) + 100); //Set this value to test (1.8), but use json.clv
        let tempClvRingColor = -100 / (1 + Math.exp(1.8 / 2)) + 100; //Set this value to test (1.8), but use json.clv
        if (tempClvRingColor > 64.5) {
          setClvRingColor('#242323'); ////Change to #0BBB00 when available
        } else if (tempClvRingColor >= 50) {
          setClvRingColor('#FF9A01');
        } else if (tempClvRingColor > 25) {
          setClvRingColor('#FF6100');
        } else {
          setClvRingColor('#FE2900');
        }
      })
      .catch(error => console.error(error))
      .finally(() => setLoadingRings(false));
  }, [variables.authToken, variables.updatedSportsBook]);

  return (
    <Fragment>
      {loading ? (
        <View
          style={{
            //flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 39,
            //marginBottom: 6,
          }}
          pointerEvents={'auto'}
        >
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                onLoad={() => setLoadingRings(false)}
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[recordRingColor, 'transparent']}
                data={[
                  { x: 1, y: userRecordOverall },
                  { x: 2, y: 100 - userRecordOverall },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'Record',
                  `${Math.round(userRecordOverall * 10) / 10}%`,
                  wins + '-' + losses + '-' + pushes,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={10}
                    backgroundPadding={[0, { top: 5 }, { top: 1 }]}
                    //verticalAnchor="start"
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 10,
                        fontFamily: 'System',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[netRingColor, 'transparent']}
                data={[
                  { x: 1, y: userNetRingValue },
                  { x: 2, y: 100 - userNetRingValue },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'Net',
                  userNetOverall < 0
                    ? '-$' + Math.abs(userNetOverall)
                    : '$' + Math.abs(userNetOverall),
                  userUnitsOverall > 0
                    ? `+${Math.round(userUnitsOverall * 100) / 100}U`
                    : `${Math.round(userUnitsOverall * 100) / 100}U`,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={10}
                    backgroundPadding={[0, { top: 5 }, { top: 1 }]}
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 10,
                        fontFamily: 'System',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[roiRingColor, 'transparent']}
                data={[
                  { x: 1, y: userRoiRingValue },
                  { x: 2, y: 100 - userRoiRingValue },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'ROI',
                  userRoiOverall > 0
                    ? `+${Math.round(userRoiOverall * 10) / 10}%`
                    : `${Math.round(userRoiOverall * 10) / 10}%`,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={0}
                    backgroundPadding={[0, { top: 5 }]}
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
        </View>
      )}
    </Fragment>
  );
}

/// Single Victory Pie Ring For Record (Practice) ////
// Define the user's overall record, net, roi, and clv and creates the progress rings.
export function VictoryPieRecordThree() {
  /*
  const [getBettorStatsByBettorId, setgetBettorStatsByBettorId] = useState([]);
  const [wins, setWins] = useState([]);
  const [losses, setLosses] = useState([]);
  const [pushes, setPushes] = useState([]);
  const [userRecordOverall, setUserRecordOverall] = useState([]);
  const [recordRingColor, setRecordRingColor] = useState([]);
  const [userNetOverall, setUserNetOverall] = useState([]);
  const [userUnitsOverall, setUserUnitsOverall] = useState([]);
  const [userNetRingValue, setUserNetRingValue] = useState([]);
  const [netRingColor, setNetRingColor] = useState([]);
  const [userRoiOverall, setUserRoiOverall] = useState([]);
  const [userRoiRingValue, setUserRoiRingValue] = useState([]);
  const [roiRingColor, setRoiRingColor] = useState([]);
  const [userClvOverall, setUserClvOverall] = useState([]);
  const [userClvRingValue, setUserClvRingValue] = useState([]);
  const [clvRingColor, setClvRingColor] = useState([]);
  */
  const variables = GlobalVariableContext.useValues();
  const [isLoading, setLoading] = useState(true);
  const [loading, setLoadingRings] = useState(true);
  const setGlobalVariableValue = GlobalVariableContext.useSetValue();

  /*
  useEffect(() => {
    fetch(
      'https://sportsbettingapi20201118035253.azurewebsites.net/Account/GetUnitSize?internalId=' +
        variables.internalId,
      {
        headers: {
          Accept: 'application/json',
          Authorization: variables.authToken,
        },
      }
    )
      .then(response => response.json())
      .then(json => {
        setGlobalVariableValue({ key: 'userDefaultUnitSize', value: json });
      });
    fetch(
      'https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorStatsByBettorId?id=' +
        variables.internalId,
      {
        headers: {
          Accept: 'application/json',
          Authorization: variables.authToken,
        },
      }
    )
      .then(response => response.json())
      .then(json => {
    */

  //setgetBettorStatsByBettorId(json.record);
  userRecordOverall =
    (variables.statsWins / (variables.statsWins + variables.statsLosses)) * 100;
  let tempRecordRingColor =
    (variables.statsWins / (variables.statsWins + variables.statsLosses)) * 100;
  if (tempRecordRingColor > 51) {
    recordRingColor = '#0BBB00';
  } else if (tempRecordRingColor > 47) {
    recordRingColor = '#FF9A01';
  } else if (tempRecordRingColor > 40) {
    recordRingColor = '#FF6100';
  } else {
    recordRingColor = '#FE2900';
  }
  //setgetBettorStatsByBettorId(json.net);
  userUnitsOverall =
    variables.statsNetProfit / 100 / variables.userDefaultUnitSize;
  userNetOverall = variables.statsNetProfit / 100;
  let tempUserUnitsOverall =
    variables.statsNetProfit / 100 / variables.userDefaultUnitSize;
  userNetRingValue = -100 / (1 + Math.exp(tempUserUnitsOverall / 15)) + 100;
  let tempNetRingColor = -100 / (1 + Math.exp(userUnitsOverall / 15)) + 100;
  if (tempNetRingColor > 51) {
    netRingColor = '#0BBB00';
  } else if (tempNetRingColor > 35) {
    netRingColor = '#FF9A01';
  } else if (tempNetRingColor > 20) {
    netRingColor = '#FF6100';
  } else {
    netRingColor = '#FE2900';
  }
  //setgetBettorStatsByBettorId(json.roi);
  roi = variables.statsNetProfit / variables.statsAtRisk;
  userRoiOverall = roi;
  userRoiRingValue = -100 / (1 + Math.exp(roi / 35)) + 100;
  let tempRoiRingColor = -100 / (1 + Math.exp(roi / 35)) + 100;
  if (tempRoiRingColor > 50) {
    roiRingColor = '#0BBB00';
  } else if (tempRoiRingColor > 35) {
    roiRingColor = '#FF9A01';
  } else if (tempRoiRingColor > 10) {
    roiRingColor = '#FF6100';
  } else {
    roiRingColor = '#FE2900';
  }

  //setgetBettorStatsByBettorId(json.clv);
  /*
  setUserClvOverall(1.8); //Set this value to test (1.8), but use json.clv.
  setUserClvRingValue(-100 / (1 + Math.exp(1.8 / 2)) + 100); //Set this value to test (1.8), but use json.clv
  let tempClvRingColor = -100 / (1 + Math.exp(1.8 / 2)) + 100; //Set this value to test (1.8), but use json.clv
  if (tempClvRingColor > 64.5) {
    setClvRingColor('#242323'); ////Change to #0BBB00 when available
  } else if (tempClvRingColor >= 50) {
    setClvRingColor('#FF9A01');
  } else if (tempClvRingColor > 25) {
    setClvRingColor('#FF6100');
  } else {
    setClvRingColor('#FE2900');
  }

      })
      .catch(error => console.error(error))
      .finally(() => setLoadingRings(false));
  }, [variables.authToken, variables.updatedSportsBook]);
  */

  return (
    <Fragment>
      {loading ? (
        <View
          style={{
            //flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 39,
            //marginBottom: 6,
          }}
          pointerEvents={'auto'}
        >
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                onLoad={() => setLoadingRings(false)}
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[recordRingColor, 'transparent']}
                data={[
                  { x: 1, y: userRecordOverall },
                  { x: 2, y: 100 - userRecordOverall },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'Record',
                  `${Math.round(userRecordOverall * 10) / 10}%`,
                  variables.statsWins +
                    '-' +
                    variables.statsLosses +
                    '-' +
                    variables.statsPushes,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={10}
                    backgroundPadding={[0, { top: 5 }, { top: 1 }]}
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 10,
                        fontFamily: 'System',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[netRingColor, 'transparent']}
                data={[
                  { x: 1, y: userNetRingValue },
                  { x: 2, y: 100 - userNetRingValue },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'Net',
                  userNetOverall < 0
                    ? '-$' + Math.abs(userNetOverall)
                    : '$' + Math.abs(userNetOverall),
                  userUnitsOverall > 0
                    ? `+${Math.round(userUnitsOverall * 100) / 100}U`
                    : `${Math.round(userUnitsOverall * 100) / 100}U`,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={10}
                    backgroundPadding={[0, { top: 5 }, { top: 1 }]}
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 10,
                        fontFamily: 'System',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[roiRingColor, 'transparent']}
                data={[
                  { x: 1, y: userRoiRingValue },
                  { x: 2, y: 100 - userRoiRingValue },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'ROI',
                  userRoiOverall > 0
                    ? `+${Math.round(userRoiOverall * 10) / 10}%`
                    : `${Math.round(userRoiOverall * 10) / 10}%`,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={0}
                    backgroundPadding={[0, { top: 5 }]}
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
        </View>
      )}
    </Fragment>
  );
}

// Define the user's overall record, net, roi, and clv and creates the progress rings.
export function VictoryPieRecordPending() {
  const [isLoading, setLoading] = useState(true);
  const [getBettorStatsByBettorId, setgetBettorStatsByBettorId] = useState([]);
  const [wins, setWins] = useState([]);
  const [losses, setLosses] = useState([]);
  const [pushes, setPushes] = useState([]);
  const [userAtRisk, setUserAtRisk] = useState([]);
  const [recordRingColor, setRecordRingColor] = useState([]);
  const [userPayoutOverall, setUserPayoutOverall] = useState([]);
  const [userUnitsPayoutPending, setUserUnitsPayoutPending] = useState([]);

  const [toWinWinningRingValue, setToWinWinningRingValue] = useState([]); // New
  const [toWinLosingRingValue, setToWinLosingRingValue] = useState([]); // New

  //const [userNetRingValue, setUserNetRingValue] = useState([]); // Can be deleted later
  //const [netRingColor, setNetRingColor] = useState([]); // Can be deleted later

  const [userPendingRoiOverall, setUserPendingRoiOverall] = useState([]);
  const [userRoiRingValue, setUserRoiRingValue] = useState([]);
  const [roiRingColor, setRoiRingColor] = useState([]);
  const [userClvOverall, setUserClvOverall] = useState([]);
  const [userClvRingValue, setUserClvRingValue] = useState([]);
  const [clvRingColor, setClvRingColor] = useState([]);
  const variables = GlobalVariableContext.useValues();
  const [loading, setLoadingRings] = useState(true);
  const setGlobalVariableValue = GlobalVariableContext.useSetValue();

  function moneySyntax(x) {
    let res = Math.abs(x).toFixed(2);
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
  }

  function moneySyntaxPending(x) {
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
  }

  useEffect(() => {
    // Set the user's pending (at risk) amount;
    setUserAtRisk((variables.statsAtRisk / variables.totalBankroll) * 100);
    setRecordRingColor('#A5ADB7');

    //  Set the user's Potential Payout label
    setUserPayoutOverall(variables.statsPendingAmount / 100);

    // Set the user's potential usnits payout label
    setUserUnitsPayoutPending(
      variables.statsPendingAmount / 100 / variables.userDefaultUnitSize
    );

    // Set the potential payout ring values for winning and losing bets
    setToWinWinningRingValue(
      (variables.toWinWinning / variables.statsPendingAmount) * 100
    );
    setToWinLosingRingValue(
      (variables.toWinLosing / variables.statsPendingAmount) * 100
    );

    // Set the user's Pending ROI;
    roi = (variables.statsPendingAmount / variables.statsAtRisk) * 100;
    setUserPendingRoiOverall(roi);
    setUserRoiRingValue(-200 / (1 + Math.exp(roi / 500)) + 100); //250 was originally 35
    setRoiRingColor('#A5ADB7');

    //setgetBettorStatsByBettorId(json.clv);
    /*
      setUserClvOverall(1.8); //Set this value to test (1.8), but use json.clv.
      setUserClvRingValue(-100 / (1 + Math.exp(1.8 / 2)) + 100); //Set this value to test (1.8), but use json.clv
      let tempClvRingColor = -100 / (1 + Math.exp(1.8 / 2)) + 100; //Set this value to test (1.8), but use json.clv
      if (tempClvRingColor > 64.5) {
        setClvRingColor('#242323'); ////Change to #0BBB00 when available
      } else if (tempClvRingColor >= 50) {
        setClvRingColor('#FF9A01');
      } else if (tempClvRingColor > 25) {
        setClvRingColor('#FF6100');
      } else {
        setClvRingColor('#FE2900');
      }
      */
    setLoadingRings(false);
  }, [
    variables.statsWins,
    variables.statsLosses,
    variables.statsPushes,
    variables.statsNetProfit,
    variables.userDefaultUnitSize,
    variables.statsAtRisk,
    variables.totalBankroll,
    variables.statsPendingCount,
    variables.statsPendingAmount,
    variables.toWinWinning,
    variables.toWinLosing,
  ]);

  return (
    <Fragment>
      {loading ? (
        <View
          style={{
            //flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 39,
            //marginBottom: 6,
          }}
          pointerEvents={'auto'}
        >
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                onLoad={() => setLoadingRings(false)}
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[recordRingColor, 'transparent']}
                //colorScale={['transparent', 'transparent']}
                data={[
                  { x: 1, y: userAtRisk },
                  { x: 2, y: 100 - userAtRisk },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'Pending',
                  moneySyntaxPending(variables.statsAtRisk),
                  /*
                  userAtRisk < 0
                    ? '-$' + Math.abs(userAtRisk)
                    : '$' + Math.abs(userAtRisk),
                  */
                  variables.statsPendingCount + ' Bets',
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={10}
                    backgroundPadding={[0, { top: 5 }, { top: 1 }]}
                    //verticalAnchor="start"
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 10,
                        fontFamily: 'System',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={['#0BBB00', '#FF9A01', '#F2F2F2']}
                data={[
                  { x: 1, y: toWinWinningRingValue },
                  { x: 2, y: toWinLosingRingValue },
                  {
                    x: 3,
                    y: 100 - toWinWinningRingValue - toWinLosingRingValue,
                  },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'Potential Payout',
                  moneySyntax(userPayoutOverall),
                  userUnitsPayoutPending > 0
                    ? `+${Math.round(userUnitsPayoutPending * 100) / 100}U`
                    : `${Math.round(userUnitsPayoutPending * 100) / 100}U`,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={10}
                    backgroundPadding={[0, { top: 5 }, { top: 1 }]}
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 10,
                        fontFamily: 'System',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[roiRingColor, 'transparent']}
                //colorScale={['transparent', 'transparent']}
                data={[
                  { x: 1, y: userRoiRingValue },
                  { x: 2, y: 100 - userRoiRingValue },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'Potential ROI',
                  userPendingRoiOverall > 0
                    ? `+${Math.round(userPendingRoiOverall * 10) / 10}%`
                    : `${Math.round(userPendingRoiOverall * 10) / 10}%`,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={0}
                    backgroundPadding={[0, { top: 5 }]}
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
        </View>
      )}
    </Fragment>
  );
}

// Define the user's overall record, net, roi, and clv and creates the progress rings.
export function VictoryPieRecordFour() {
  const [isLoading, setLoading] = useState(true);
  const [getBettorStatsByBettorId, setgetBettorStatsByBettorId] = useState([]);
  const [wins, setWins] = useState([]);
  const [losses, setLosses] = useState([]);
  const [pushes, setPushes] = useState([]);
  const [userRecordOverall, setUserRecordOverall] = useState([]);
  const [recordRingColor, setRecordRingColor] = useState([]);
  const [userNetOverall, setUserNetOverall] = useState([]);
  const [userUnitsOverall, setUserUnitsOverall] = useState([]);
  const [userNetRingValue, setUserNetRingValue] = useState([]);
  const [netRingColor, setNetRingColor] = useState([]);
  const [userRoiOverall, setUserRoiOverall] = useState([]);
  const [userRoiRingValue, setUserRoiRingValue] = useState([]);
  const [roiRingColor, setRoiRingColor] = useState([]);
  const [userClvOverall, setUserClvOverall] = useState([]);
  const [userClvRingValue, setUserClvRingValue] = useState([]);
  const [clvRingColor, setClvRingColor] = useState([]);
  const variables = GlobalVariableContext.useValues();
  const [loading, setLoadingRings] = useState(true);
  const setGlobalVariableValue = GlobalVariableContext.useSetValue();

  function moneySyntax(x) {
    let res = Math.abs(x).toFixed(2);
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
  }

  useEffect(() => {
    // Set the user's record;
    setUserRecordOverall(
      (variables.statsWins / (variables.statsWins + variables.statsLosses)) *
        100
    );
    let tempRecordRingColor =
      (variables.statsWins / (variables.statsWins + variables.statsLosses)) *
      100;
    if (tempRecordRingColor > 51) {
      setRecordRingColor('#0BBB00');
    } else if (tempRecordRingColor > 47) {
      setRecordRingColor('#FF9A01');
    } else if (tempRecordRingColor > 40) {
      setRecordRingColor('#FF6100');
    } else {
      setRecordRingColor('#FE2900');
    }
    //  Set the user's net profit;
    setUserUnitsOverall(
      variables.statsNetProfit / 100 / variables.userDefaultUnitSize
    );
    setUserNetOverall(variables.statsNetProfit / 100);
    let tempUserUnitsOverall =
      variables.statsNetProfit / 100 / variables.userDefaultUnitSize;
    setUserNetRingValue(-100 / (1 + Math.exp(tempUserUnitsOverall / 15)) + 100);
    let tempNetRingColor =
      -100 / (1 + Math.exp(tempUserUnitsOverall / 15)) + 100;
    if (tempNetRingColor > 51) {
      setNetRingColor('#0BBB00');
    } else if (tempNetRingColor > 35) {
      setNetRingColor('#FF9A01');
    } else if (tempNetRingColor > 20) {
      setNetRingColor('#FF6100');
    } else {
      setNetRingColor('#FE2900');
    }
    // Set the user's ROI;
    roi = (variables.statsNetProfit / variables.statsAtRisk) * 100;
    setUserRoiOverall(roi);
    setUserRoiRingValue(-100 / (1 + Math.exp(roi / 35)) + 100);
    let tempRoiRingColor = -100 / (1 + Math.exp(roi / 35)) + 100;
    if (tempRoiRingColor > 50) {
      setRoiRingColor('#0BBB00');
    } else if (tempRoiRingColor > 35) {
      setRoiRingColor('#FF9A01');
    } else if (tempRoiRingColor > 10) {
      setRoiRingColor('#FF6100');
    } else {
      setRoiRingColor('#FE2900');
    }
    //setgetBettorStatsByBettorId(json.clv);
    /*
      setUserClvOverall(1.8); //Set this value to test (1.8), but use json.clv.
      setUserClvRingValue(-100 / (1 + Math.exp(1.8 / 2)) + 100); //Set this value to test (1.8), but use json.clv
      let tempClvRingColor = -100 / (1 + Math.exp(1.8 / 2)) + 100; //Set this value to test (1.8), but use json.clv
      if (tempClvRingColor > 64.5) {
        setClvRingColor('#242323'); ////Change to #0BBB00 when available
      } else if (tempClvRingColor >= 50) {
        setClvRingColor('#FF9A01');
      } else if (tempClvRingColor > 25) {
        setClvRingColor('#FF6100');
      } else {
        setClvRingColor('#FE2900');
      }
      */
    setLoadingRings(false);
  }, [
    variables.statsWins,
    variables.statsLosses,
    variables.statsPushes,
    variables.statsNetProfit,
    variables.userDefaultUnitSize,
    variables.statsAtRisk,
  ]);

  return (
    <Fragment>
      {loading ? (
        <View
          style={{
            //flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 39,
            //marginBottom: 6,
          }}
          pointerEvents={'auto'}
        >
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                onLoad={() => setLoadingRings(false)}
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[recordRingColor, 'transparent']}
                data={[
                  { x: 1, y: userRecordOverall },
                  { x: 2, y: 100 - userRecordOverall },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'Record',
                  `${Math.round(userRecordOverall * 10) / 10}%`,
                  variables.statsWins +
                    '-' +
                    variables.statsLosses +
                    '-' +
                    variables.statsPushes,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={10}
                    backgroundPadding={[0, { top: 5 }, { top: 1 }]}
                    //verticalAnchor="start"
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 10,
                        fontFamily: 'System',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[netRingColor, 'transparent']}
                data={[
                  { x: 1, y: userNetRingValue },
                  { x: 2, y: 100 - userNetRingValue },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'Net',
                  moneySyntax(userNetOverall),

                  /*
                  userNetOverall < 0
                    ? '-$' + Math.abs(userNetOverall)
                    : '$' + Math.abs(userNetOverall),
                  */

                  userUnitsOverall > 0
                    ? `+${Math.round(userUnitsOverall * 100) / 100}U`
                    : `${Math.round(userUnitsOverall * 100) / 100}U`,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={10}
                    backgroundPadding={[0, { top: 5 }, { top: 1 }]}
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 10,
                        fontFamily: 'System',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
          <View>
            <Svg viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3a3838"
                strokeWidth={10}
              />
              <VictoryPie
                standalone={false}
                labels={() => null}
                width={100}
                height={100}
                innerRadius={40}
                radius={50}
                cornerRadius={({ datum }) => datum.y * 5}
                colorScale={[roiRingColor, 'transparent']}
                data={[
                  { x: 1, y: userRoiRingValue },
                  { x: 2, y: 100 - userRoiRingValue },
                ]}
              />
              <VictoryScatter
                width={100}
                height={100}
                data={[{ x: 'middle', y: 'middle' }]}
                labels={() => [
                  'ROI',
                  userRoiOverall > 0
                    ? `+${Math.round(userRoiOverall * 10) / 10}%`
                    : `${Math.round(userRoiOverall * 10) / 10}%`,
                ]}
                style={{
                  data: { fill: 'transparent' },
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    dy={0}
                    backgroundPadding={[0, { top: 5 }]}
                    style={[
                      {
                        fill: '#A5ADB7',
                        fontSize: 8,
                        fontFamily: 'System',
                      },
                      {
                        fill: '#F2F2F2',
                        fontSize: 16,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                      },
                    ]}
                  />
                }
              />
            </Svg>
          </View>
        </View>
      )}
    </Fragment>
  );
}

/* Create the progress rings for the user's grades. */

export function VictoryPieGrades1() {
  const [isLoading, setLoading] = useState(true);
  const [getBettorStatsByBettorId, setgetBettorStatsByBettorId] = useState([]);
  const [unitSizeConsistency, setUnitSizeConsistency] = useState([]);
  const [unitSizeConsistencyRingColor, setUnitSizeConsistencyRingColor] =
    useState([]);
  const [leagueConsistency, setLeagueConsistency] = useState([]);
  const [leagueConsistencyRingColor, setLeagueConsistencyRingColor] = useState(
    []
  );
  const [bestLine, setBestLine] = useState([]);
  const [bestLineRingColor, setBestLineRingColor] = useState([]);
  const [trapAvoidance, setTrapAvoidance] = useState([]);
  const [trapAvoidanceRingColor, setTrapAvoidanceRingColor] = useState([]);
  const variables = GlobalVariableContext.useValues();
  useEffect(() => {
    fetch(
      'https://sportsbettingapi20201118035253.azurewebsites.net/Sharpsports/GetBettorStatsByBettorId?id=' +
        variables.internalId,
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + variables.authToken,
        },
      }
    )
      .then(response => response.json())
      .then(json => {
        //setgetBettorGradesByBettorId(json.unitSizeConsistency);
        setUnitSizeConsistency(63.56); //Set this value to test (63.56), but use json.unitSizeConsistency.
        //setUserClvRingValue(-100 / (1 + Math.exp(63.56 / 35)) + 100); //Set this value to test (43), but use json.clv
        let tempUnitSizeConsistencyRingColor = 63.56; //Set this value to test (43), but use json.clv
        if (tempUnitSizeConsistencyRingColor > 60) {
          setUnitSizeConsistencyRingColor('#0BBB00');
        } else if (tempUnitSizeConsistencyRingColor > 40) {
          setUnitSizeConsistencyRingColor('#FF9A01');
        } else if (tempUnitSizeConsistencyRingColor > 20) {
          setUnitSizeConsistencyRingColor('#FF6100');
        } else {
          setUnitSizeConsistencyRingColor('#FE2900');
        }
        //setgetBettorGradesByBettorId(json.leagueConsistency);
        setLeagueConsistency(19.87); //Set this value to test (19.87), but use json.unitSizeConsistency.
        //setUserClvRingValue(-100 / (1 + Math.exp(24.38 / 35)) + 100); //Set this value to test (19.87), but use json.clv
        let tempLeagueConsistencyRingColor = 19.87; //Set this value to test (19.87), but use json.clv
        if (tempLeagueConsistencyRingColor > 60) {
          setLeagueConsistencyRingColor('#0BBB00');
        } else if (tempLeagueConsistencyRingColor > 40) {
          setLeagueConsistencyRingColor('#FF9A01');
        } else if (tempLeagueConsistencyRingColor > 20) {
          setLeagueConsistencyRingColor('#FF6100');
        } else {
          setLeagueConsistencyRingColor('#FE2900');
        }
        //setgetBettorGradesByBettorId(json.bestLine);
        setBestLine(38.03); //Set this value to test (38.03), but use json.unitSizeConsistency.
        //setUserClvRingValue(-100 / (1 + Math.exp(24.38 / 35)) + 100); //Set this value to test (38.03), but use json.clv
        let tempBestLineRingColor = 38.03; //Set this value to test (38.03), but use json.clv
        if (tempBestLineRingColor > 60) {
          setBestLineRingColor('#0BBB00');
        } else if (tempBestLineRingColor > 40) {
          setBestLineRingColor('#FF9A01');
        } else if (tempBestLineRingColor > 20) {
          setBestLineRingColor('#FF6100');
        } else {
          setBestLineRingColor('#FE2900');
        }
        //setgetBettorGradesByBettorId(json.trapAvoidance);
        setTrapAvoidance(15.98); //Set this value to test (15.98), but use json.unitSizeConsistency.
        let tempTrapAvoidanceRingColor = 15.98; //Set this value to test (43), but use json.clv
        if (tempTrapAvoidanceRingColor > 60) {
          setTrapAvoidanceRingColor('#0BBB00');
        } else if (tempTrapAvoidanceRingColor > 40) {
          setTrapAvoidanceRingColor('#FF9A01');
        } else if (tempTrapAvoidanceRingColor > 20) {
          setTrapAvoidanceRingColor('#FF6100');
        } else {
          setTrapAvoidanceRingColor('#FE2900');
        }
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Fragment>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Svg viewBox="0 0 75 75">
            <Circle
              cx="37.5"
              cy="37.5"
              r="33.75"
              fill="none"
              stroke="#242323"
              strokeWidth={7.5}
            />
            <VictoryPie
              standalone={false}
              labels={() => null}
              width={75}
              height={75}
              innerRadius={30}
              radius={37.5}
              cornerRadius={({ datum }) => datum.y * 5}
              colorScale={[unitSizeConsistencyRingColor, 'transparent']}
              data={[
                { x: 1, y: unitSizeConsistency },
                { x: 2, y: 100 - unitSizeConsistency },
              ]}
            />
            <VictoryScatter
              width={75}
              height={75}
              data={[{ x: 'middle', y: 'middle' }]}
              labels={() => [Math.round(unitSizeConsistency * 10) / 10]}
              style={{
                data: { fill: 'transparent' },
              }}
              labelComponent={
                <VictoryLabel
                  textAnchor="middle"
                  dy={6}
                  style={[
                    {
                      padding: 0,
                      fill: '#F2F2F2',
                      fontSize: 14,
                      fontFamily: 'System',
                      fontWeight: 'bold',
                    },
                  ]}
                />
              }
            />
          </Svg>
        </View>
        <View>
          <Svg viewBox="0 0 75 75">
            <Circle
              cx="37.5"
              cy="37.5"
              r="33.75"
              fill="none"
              stroke="#242323"
              strokeWidth={7.5}
            />
            <VictoryPie
              standalone={false}
              labels={() => null}
              width={75}
              height={75}
              innerRadius={30}
              radius={37.5}
              cornerRadius={({ datum }) => datum.y * 5}
              colorScale={[leagueConsistencyRingColor, 'transparent']}
              data={[
                { x: 1, y: leagueConsistency },
                { x: 2, y: 100 - leagueConsistency },
              ]}
            />
            <VictoryScatter
              width={75}
              height={75}
              data={[{ x: 'middle', y: 'middle' }]}
              labels={() => [Math.round(leagueConsistency * 10) / 10]}
              style={{
                data: { fill: 'transparent' },
              }}
              labelComponent={
                <VictoryLabel
                  textAnchor="middle"
                  dy={6}
                  style={[
                    {
                      padding: 0,
                      fill: '#F2F2F2',
                      fontSize: 14,
                      fontFamily: 'System',
                      fontWeight: 'bold',
                    },
                  ]}
                />
              }
            />
          </Svg>
        </View>
        <View>
          <Svg viewBox="0 0 75 75">
            <Circle
              cx="37.5"
              cy="37.5"
              r="33.75"
              fill="none"
              stroke="#242323"
              strokeWidth={7.5}
            />
            <VictoryPie
              standalone={false}
              labels={() => null}
              width={75}
              height={75}
              innerRadius={30}
              radius={37.5}
              cornerRadius={({ datum }) => datum.y * 5}
              colorScale={[bestLineRingColor, 'transparent']}
              data={[
                { x: 1, y: bestLine },
                { x: 2, y: 100 - bestLine },
              ]}
            />
            <VictoryScatter
              width={75}
              height={75}
              data={[{ x: 'middle', y: 'middle' }]}
              labels={() => [Math.round(bestLine * 10) / 10]}
              style={{
                data: { fill: 'transparent' },
              }}
              labelComponent={
                <VictoryLabel
                  textAnchor="middle"
                  dy={6}
                  style={[
                    {
                      padding: 0,
                      fill: '#F2F2F2',
                      fontSize: 14,
                      fontFamily: 'System',
                      fontWeight: 'bold',
                    },
                  ]}
                />
              }
            />
          </Svg>
        </View>
        <View>
          <Svg viewBox="0 0 75 75">
            <Circle
              cx="37.5"
              cy="37.5"
              r="33.75"
              fill="none"
              stroke="#242323"
              strokeWidth={7.5}
            />
            <VictoryPie
              standalone={false}
              labels={() => null}
              width={75}
              height={75}
              innerRadius={30}
              radius={37.5}
              cornerRadius={({ datum }) => datum.y * 5}
              colorScale={[trapAvoidanceRingColor, 'transparent']}
              data={[
                { x: 1, y: trapAvoidance },
                { x: 2, y: 100 - trapAvoidance },
              ]}
            />
            <VictoryScatter
              width={75}
              height={75}
              data={[{ x: 'middle', y: 'middle' }]}
              labels={() => [Math.round(trapAvoidance * 10) / 10]}
              style={{
                data: { fill: 'transparent' },
              }}
              labelComponent={
                <VictoryLabel
                  textAnchor="middle"
                  dy={6}
                  style={[
                    {
                      padding: 0,
                      fill: '#F2F2F2',
                      fontSize: 14,
                      fontFamily: 'System',
                      fontWeight: 'bold',
                    },
                  ]}
                />
              }
            />
          </Svg>
        </View>
      </View>
    </Fragment>
  );
}

/* Set up the suffix for the graph y-axis tick marks. */

function VictoryGraphSuffix(t) {
  if (t <= -1000000.0) {
    return '-$' + (Math.abs(t) / 1000000).toFixed(1) + 'M'; // convert to M for number less than or equal to -1000000.00, and tack on "-$"
  } else if (t <= -1000.0) {
    return '-$' + (Math.abs(t) / 1000).toFixed(1) + 'K'; // convert to K for number less than or equal to -1000.00, and tack on "-$"
  } else if (t < 0.0) {
    return '-$' + Math.abs(t).toFixed(0); // tack on "-$" for number less than 0.00
  } else if (t < 1000.0) {
    return '$' + t.toFixed(0); // tack on "$" for number less than 1000.00
  } else if (t < 1000000.0) {
    return '$' + (t / 1000).toFixed(1) + 'K'; // convert to K for number less than 1000000.00, and tack on "$"
  } else {
    return '$' + (t / 1000000).toFixed(1) + 'M'; // all else (numbers greater than or equal to 1000000.00) convert to M and tack on "$"
  }
}

//////////* Net Profit graph. *//////////

const isLarger = (element, index) => array1[index] > array1[index - 1];

export function GetDotColor(t, allData) {
  //let index = allData.findIndex(dat => dat.y === t.y);
  if (allData[t] && allData[t - 1] && allData[t].y >= allData[t - 1].y) {
    return '#0BBB00';
  }
  return '#FE2900';
}

const victoryLineDateRange = ['1W', '1M', '3M', 'YTD', '1Y', 'All'];
/*const testArray1 = [
  { "x": "2020-10-24T00:00:00Z", "y": 100 },
  { "x": "2020-10-31T00:00:00Z", "y": 98 },
  { "x": "2020-11-05T00:00:00Z", "y": 225 },
  { "x": "2020-11-06T00:00:00Z", "y": 240 },
  { "x": "2020-11-08T00:00:00Z", "y": 218 },
  { "x": "2020-11-15T00:00:00Z", "y": 285 },
  { "x": "2020-11-17T00:00:00Z", "y": 385 },
  { "x": "2020-11-28T00:00:00Z", "y": 305 },
  { "x": "2020-12-01T00:00:00Z", "y": 398 },
  { "x": "2020-12-06T00:00:00Z", "y": 468 },
  { "x": "2020-12-21T00:00:00Z", "y": 451 },
  { "x": "2020-12-30T00:00:00Z", "y": 529 },
  { "x": "2020-12-31T00:00:00Z", "y": 594 },
  { "x": "2021-01-01T00:00:00Z", "y": 518 },
  { "x": "2021-01-09T00:00:00Z", "y": 618 },
  { "x": "2021-01-10T00:00:00Z", "y": 662 },
  { "x": "2021-01-13T00:00:00Z", "y": 644 },
  { "x": "2021-01-25T00:00:00Z", "y": 607 },
  { "x": "2021-01-28T00:00:00Z", "y": 628 },
  { "x": "2021-02-03T00:00:00Z", "y": 528 },
  { "x": "2021-02-06T00:00:00Z", "y": 497 },
  { "x": "2021-02-13T00:00:00Z", "y": 525 },
  { "x": "2021-02-15T00:00:00Z", "y": 535 },
  { "x": "2021-02-20T00:00:00Z", "y": 450 },
  { "x": "2021-02-21T00:00:00Z", "y": 322 },
  { "x": "2021-02-27T00:00:00Z", "y": 303 },
  { "x": "2021-03-01T00:00:00Z", "y": 269 },
  { "x": "2021-03-04T00:00:00Z", "y": 316 },
  { "x": "2021-03-10T00:00:00Z", "y": 265 },
  { "x": "2021-03-17T00:00:00Z", "y": 200 },
  { "x": "2021-03-18T00:00:00Z", "y": 185 },
  { "x": "2021-03-19T00:00:00Z", "y": 170 },
  { "x": "2021-03-20T00:00:00Z", "y": 206 },
  { "x": "2021-03-22T00:00:00Z", "y": 119 },
  { "x": "2021-03-25T00:00:00Z", "y": 97 },
  { "x": "2021-03-30T00:00:00Z", "y": 68 },
  { "x": "2021-04-08T00:00:00Z", "y": 15 },
  { "x": "2021-04-13T00:00:00Z", "y": -100 },
  { "x": "2021-04-17T00:00:00Z", "y": -85 },
  { "x": "2021-04-22T00:00:00Z", "y": -75 },
  { "x": "2021-04-27T00:00:00Z", "y": -145 },
  { "x": "2021-04-28T00:00:00Z", "y": -210 },
  { "x": "2021-05-03T00:00:00Z", "y": -185 },
  { "x": "2021-05-09T00:00:00Z", "y": -285 },
  { "x": "2021-05-14T00:00:00Z", "y": -218 },
  { "x": "2021-05-19T00:00:00Z", "y": -205 },
  { "x": "2021-05-22T00:00:00Z", "y": -259 },
  { "x": "2021-05-25T00:00:00Z", "y": -291 },
  { "x": "2021-05-29T00:00:00Z", "y": -338 },
  { "x": "2021-05-30T00:00:00Z", "y": -401 },
  { "x": "2021-06-01T00:00:00Z", "y": -386 },
  { "x": "2021-06-05T00:00:00Z", "y": -311 },
  { "x": "2021-06-11T00:00:00Z", "y": -329 },
  { "x": "2021-06-15T00:00:00Z", "y": -229 },
  { "x": "2021-06-22T00:00:00Z", "y": -209 },
  { "x": "2021-07-03T00:00:00Z", "y": -222 },
  { "x": "2021-07-05T00:00:00Z", "y": -182 },
  { "x": "2021-07-10T00:00:00Z", "y": -109 },
  { "x": "2021-07-13T00:00:00Z", "y": -69 },
  { "x": "2021-07-17T00:00:00Z", "y": -107 },
  { "x": "2021-07-20T00:00:00Z", "y": -50 },
  { "x": "2021-07-21T00:00:00Z", "y": 7 },
  { "x": "2021-07-26T00:00:00Z", "y": 48 },
  { "x": "2021-08-03T00:00:00Z", "y": 27 },
  { "x": "2021-08-06T00:00:00Z", "y": 127 },
  { "x": "2021-08-10T00:00:00Z", "y": 267 },
  { "x": "2021-08-16T00:00:00Z", "y": 200 },
  { "x": "2021-08-22T00:00:00Z", "y": 300 },
  { "x": "2021-08-29T00:00:00Z", "y": 280 },
  { "x": "2021-09-01T00:00:00Z", "y": 380 },
  { "x": "2021-09-08T00:00:00Z", "y": 300 },
  { "x": "2021-09-09T00:00:00Z", "y": 560 },
  { "x": "2021-09-14T00:00:00Z", "y": 860 },
  { "x": "2021-09-19T00:00:00Z", "y": 622 },
  { "x": "2021-09-24T00:00:00Z", "y": 600 },
  { "x": "2021-09-29T00:00:00Z", "y": 541 },
  { "x": "2021-09-30T00:00:00Z", "y": 520 },
  { "x": "2021-10-05T00:00:00Z", "y": 420 },
  { "x": "2021-10-07T00:00:00Z", "y": 628 },
  { "x": "2021-10-13T00:00:00Z", "y": 810 },
  { "x": "2021-10-14T00:00:00Z", "y": 1044 },
  { "x": "2021-10-20T00:00:00Z", "y": 1156 },
  { "x": "2021-10-22T00:00:00Z", "y": 1321 },
  { "x": "2021-10-23T00:00:00Z", "y": 1369 },
  { "x": "2021-10-25T00:00:00Z", "y": 1549 },
  { "x": "2021-10-26T00:00:00Z", "y": 1762 },
  { "x": "2021-10-27T00:00:00Z", "y": 1662 },
  { "x": "2021-10-29T00:00:00Z", "y": 1590 },
  { "x": "2021-10-30T00:00:00Z", "y": 1690 },
  { "x": "2021-10-31T00:00:00Z", "y": 1758 },
  { "x": "2021-11-01T00:00:00Z", "y": 1872 },
];*/
function getYTD() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day;
}
function filterTimeseries(index, data) {
  let days = 0;
  switch (index) {
    case 0:
      days = 7;
      break;
    case 1:
      days = 28;
      break;
    case 2:
      days = 90;
      break;
    case 3:
      days = getYTD();
      break;
    case 4:
      days = 365;
      break;
    case 5:
      days = 0;
      break;
  }
  if (days === 0) {
    return data;
  }
  let d = new Date();
  d.setDate(d.getDate() - days);
  data = data.filter(item => new Date(item.x) - d > 0);
  return data;
}

export const VictoryLineNetProfit = ({ chartData }) => {
  const [victoryLineDateRangeIdx, setvictoryLineDateRangeIdx] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [getBettorNetProfitTimeseries, setGetBettorNetProfitTimeseries] =
    useState([]);
  const variables = GlobalVariableContext.useValues();
  const [sportsbook, setSportsbook] = useState(variables.selectedSportsbook);
  const [netProfitTimeseries, setNetProfitTimeseries] = useState([]);
  //const setGlobalVariableValue = GlobalVariableContext.useSetValue();

  useEffect(() => {
    var chartTs =
      variables.selectedSportsbookChart == 'init'
        ? chartData[0].timeSeries
        : variables.selectedSportsbookChart;
    setNetProfitTimeseries(
      filterTimeseries(
        victoryLineDateRangeIdx,
        chartTs.map(data => ({ x: new Date(data.x), y: data.y / 100 }))
      )
    );
  }, [victoryLineDateRangeIdx, variables.selectedSportsbookChart]);

  return (
    <Fragment>
      <View
        style={{
          justifyContent: 'space-between',
        }}
      >
        <Svg width={'100%'} height={375} key={netProfitTimeseries}>
          <VictoryChart
            key={netProfitTimeseries}
            domainPadding={{ x: [10, 75] }}
            standalone={false}
            fixLabelOverlap={true}
            scale={{ x: 'time' }}
            height={375}
            padding={{ top: 25, bottom: 25 }}
            containerComponent={<VictoryZoomContainer minimumZoom={{ y: 1 }} />}
          >
            <VictoryAxis
              key={netProfitTimeseries}
              style={{
                axis: {
                  stroke: '#A5ADB7',
                  strokeWidth: '0.5',
                },
                tickLabels: {
                  fill: '#A5ADB7',
                  fontSize: 10,
                  fontFamily: 'System',
                },
                grid: {
                  stroke: '#A5ADB7',
                  strokeDasharray: '3',
                  strokeWidth: '0.45',
                },
              }}
            />
            <VictoryAxis
              key={netProfitTimeseries}
              dependentAxis
              //https://formidable.com/open-source/victory/docs/common-props/#scale
              //orientation="right"
              offsetX={350}
              tickFormat={t => VictoryGraphSuffix(t)}
              style={{
                axis: {
                  stroke: 'transparent',
                  strokeWidth: '0.5',
                },
                tickLabels: {
                  fill: '#A5ADB7',
                  fontSize: 10,
                  fontFamily: 'System',
                },
                grid: {
                  stroke: '#A5ADB7',
                  strokeDasharray: '3',
                  strokeWidth: '0.45',
                },
              }}
            />
            <VictoryLine
              key={netProfitTimeseries}
              interpolation="monotoneX"
              style={{
                data: { strokeWidth: 1.5, stroke: '#BFAB80' },
              }}
              data={netProfitTimeseries} //set as testArray1 to get a good a good view of the functionality
            />
            <VictoryScatter
              key={netProfitTimeseries}
              data={netProfitTimeseries} //set as testArray1 to get a good a good view of the functionality
              size={2.5}
              style={{
                data: { fill: t => GetDotColor(t.index, netProfitTimeseries) }, //set 2nd value as testArray1 to get a good a good view of the functionality
              }}
            />
          </VictoryChart>
        </Svg>
        <View
          style={{
            marginTop: 8,
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          <CustomPickerC
            label={null}
            data={victoryLineDateRange}
            currentIndex={victoryLineDateRangeIdx}
            onSelected={setvictoryLineDateRangeIdx}
          />
        </View>
      </View>
    </Fragment>
  );
};

/// NEW LINE GRAPH TESTING
/*
export const VictoryLineNetProfitTest = ({ chartData }) => {

  return (
    <VictoryChart
      containerComponent={<VictoryVoronoiContainer />}
      domain={{ x: [0, 11], y: [-10, 10] }}
    >
      <VictoryBar
        labelComponent={<VictoryTooltip/>}
        data={[
          {x: 2, y: 5, label: "right-side-up"},
          {x: 4, y: -6, label: "upside-down"},
          {x: 6, y: 4, label: "tiny"},
          {x: 8, y: -5, label: "or a little \n BIGGER"},
          {x: 10, y: 7, label: "automatically"}
        ]}
        style={{
          data: {fill: "tomato", width: 20}
        }}
      />
    </VictoryChart>

    <VictoryChart
      //key={netProfitTimeseries}
      domainPadding={{ x: [10, 75] }}
      //standalone={false}
      //fixLabelOverlap={true}
      //scale={{ x: 'time' }}
      //height={375}
      //padding={{ top: 25, bottom: 25 }}
      //containerComponent={<VictoryZoomContainer minimumZoom={{ y: 1 }} />}
    >
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc"}
        }}
        data={netProfitTimeseries}
      />
    </VictoryChart>
  );
};
*/

/// NEW LINE GRAPH TESTING
export const VictoryLineNetProfitTwo = ({ chartData }) => {
  const [victoryLineDateRangeIdx, setvictoryLineDateRangeIdx] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [getBettorNetProfitTimeseries, setGetBettorNetProfitTimeseries] =
    useState([]);
  const variables = GlobalVariableContext.useValues();
  const [sportsbook, setSportsbook] = useState(variables.selectedSportsbook);
  const [netProfitTimeseries, setNetProfitTimeseries] = useState([]);
  //const setGlobalVariableValue = GlobalVariableContext.useSetValue();

  useEffect(() => {
    var chartTs =
      variables.selectedSportsbookChart == 'init'
        ? chartData[0].timeSeries
        : variables.selectedSportsbookChart;
    setNetProfitTimeseries(
      filterTimeseries(
        victoryLineDateRangeIdx,
        chartTs.map(data => ({ x: new Date(data.x), y: data.y / 100 }))
      )
    );
  }, [victoryLineDateRangeIdx, variables.selectedSportsbookChart]);

  // <Svg width={'100%'} height={375} key={netProfitTimeseries}>

  return (
    <Fragment>
      <View
        style={{
          justifyContent: 'space-between',
        }}
      >
        <View width={'100%'} height={375} key={netProfitTimeseries}>
          <VictoryChart
            key={netProfitTimeseries}
            domainPadding={{ x: [10, 75] }}
            standalone={false}
            fixLabelOverlap={true}
            scale={{ x: 'time' }}
            height={375}
            padding={{ top: 25, bottom: 25 }}
            containerComponent={<VictoryZoomContainer minimumZoom={{ y: 1 }} />}
          >
            <VictoryAxis
              key={netProfitTimeseries}
              style={{
                axis: {
                  stroke: '#A5ADB7',
                  strokeWidth: '0.5',
                },
                tickLabels: {
                  fill: '#A5ADB7',
                  fontSize: 10,
                  fontFamily: 'System',
                },
                grid: {
                  stroke: '#A5ADB7',
                  strokeDasharray: '3',
                  strokeWidth: '0.45',
                },
              }}
            />
            <VictoryAxis
              key={netProfitTimeseries}
              dependentAxis
              //https://formidable.com/open-source/victory/docs/common-props/#scale
              //orientation="right"
              offsetX={350}
              tickFormat={t => VictoryGraphSuffix(t)}
              style={{
                axis: {
                  stroke: 'transparent',
                  strokeWidth: '0.5',
                },
                tickLabels: {
                  fill: '#A5ADB7',
                  fontSize: 10,
                  fontFamily: 'System',
                },
                grid: {
                  stroke: '#A5ADB7',
                  strokeDasharray: '3',
                  strokeWidth: '0.45',
                },
              }}
            />
            <VictoryLine
              key={netProfitTimeseries}
              interpolation="monotoneX"
              style={{
                data: { strokeWidth: 1.5, stroke: '#BFAB80' },
              }}
              data={netProfitTimeseries} //set as testArray1 to get a good a good view of the functionality
            />
            <VictoryScatter
              key={netProfitTimeseries}
              data={netProfitTimeseries} //set as testArray1 to get a good a good view of the functionality
              size={2.5}
              style={{
                data: { fill: t => GetDotColor(t.index, netProfitTimeseries) }, //set 2nd value as testArray1 to get a good a good view of the functionality
              }}
            />
          </VictoryChart>
        </View>
        <View
          style={{
            marginTop: 8,
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          <CustomPickerC
            label={null}
            data={victoryLineDateRange}
            currentIndex={victoryLineDateRangeIdx}
            onSelected={setvictoryLineDateRangeIdx}
          />
        </View>
      </View>
    </Fragment>
  );
};

/////// Filter By Team MultiSelector (See docs here: https://openbase.com/js/react-native-multi-selectbox) //////////

/*
const K_OPTIONS = [
  { id: 'ARI2', item: 'Arizona Cardinals' },
  { id: 'ATL2', item: 'Atlanta Falcons' },
  { id: 'BAL2', item: 'Baltimore Ravens' },
  { id: 'BUF2', item: 'Buffalo Bills' },
  { id: 'CAR2', item: 'Carolina Panthers' },
  { id: 'CHI2', item: 'Chicago Bears' },
  { id: 'CIN2', item: 'Cincinnati Bengals' },
  { id: 'CLE2', item: 'Cleveland Browns' },
  { id: 'DAL2', item: 'Dallas Cowboys' },
  { id: 'DEN2', item: 'Denver Broncos' },
  { id: 'DET2', item: 'Detroit Lions' },
  { id: 'GB', item: 'Green Bay Packers' },
  { id: 'HOU2', item: 'Houston Texans' },
  { id: 'IND2', item: 'Indianapolis Colts' },
  { id: 'JAC2', item: 'Jacksonville Jaguars' },
  { id: 'KC2', item: 'Kansas City Chiefs' },
  { id: 'LV', item: 'Las Vegas Raiders' },
  { id: 'LAC2', item: 'Los Angeles Chargers' },
  { id: 'LAR', item: 'Los Angeles Rams' },
  { id: 'MIA2', item: 'Miami Dolphins' },
  { id: 'MIN2', item: 'Minnesota Vikings' },
  { id: 'NE', item: 'New England Patriots' },
  { id: 'NO', item: 'New Orleans Saints' },
  { id: 'NYG', item: 'New York Giants' },
  { id: 'NYJ', item: 'New York Jets' },
  { id: 'PHI2', item: 'Philadelphia Eagles' },
  { id: 'PIT2', item: 'Pittsburgh Steelers' },
  { id: 'SF2', item: 'San Francisco 49ers' },
  { id: 'SEA2', item: 'Seattle Seahawks' },
  { id: 'TB2', item: 'Tampa Bay Buccaneers' },
  { id: 'TEN', item: 'Tennessee Titans' },
  { id: 'WAS2', item: 'Washington Football Team' },
  { id: 'ATL3', item: 'Atlanta Hawks' },
  { id: 'BKN', item: 'Brooklyn Nets' },
  { id: 'BOS2', item: 'Boston Celtics' },
  { id: 'CHA', item: 'Charlotte Hornets' },
  { id: 'CHI3', item: 'Chicago Bulls' },
  { id: 'CLE3', item: 'Cleveland Cavaliers' },
  { id: 'DAL3', item: 'Dallas Mavericks' },
  { id: 'DEN', item: 'Denver Nuggets' },
  { id: 'DET3', item: 'Detroit Pistons' },
  { id: 'GSW', item: 'Golden State Warriors' },
  { id: 'HOU3', item: 'Houston Rockets' },
  { id: 'IND3', item: 'Indiana Pacers' },
  { id: 'LAC', item: 'Los Angeles Clippers' },
  { id: 'LAL', item: 'Los Angeles Lakers' },
  { id: 'MEM2', item: 'Memphis Grizzlies' },
  { id: 'MIA3', item: 'Miami Heat' },
  { id: 'MIL2', item: 'Milwaukee Bucks' },
  { id: 'MIN3', item: 'Minnesota Timberwolves' },
  { id: 'NOP', item: 'New Orleans Pelicans' },
  { id: 'NYK', item: 'New York Knicks' },
  { id: 'OKC', item: 'Oklahoma City Thunder' },
  { id: 'ORL', item: 'Orlando Magic' },
  { id: 'PHI3', item: 'Philadelphia 76ers' },
  { id: 'PHX', item: 'Phoenix Suns' },
  { id: 'POR', item: 'Portland Trail Blazers' },
  { id: 'SAC2', item: 'Sacramento Kings' },
  { id: 'SAS', item: 'San Antonio Spurs' },
  { id: 'TOR2', item: 'Toronto Raptors' },
  { id: 'UTA', item: 'Utah Jazz' },
  { id: 'WAS3', item: 'Washington Wizards' },
  { id: 'ARI3', item: 'Arizona Diamondbacks' },
  { id: 'ATL', item: 'Atlanta Braves' },
  { id: 'BAL', item: 'Baltimore Orioles' },
  { id: 'BOS3', item: 'Boston Red Sox' },
  { id: 'CWS', item: 'Chicago White Sox' },
  { id: 'CHC', item: 'Chicago Cubs' },
  { id: 'CIN', item: 'Cinncinnati Reds' },
  { id: 'CLE', item: 'Cleveland Indians' },
  { id: 'COL2', item: 'Colorado Rockies' },
  { id: 'DET4', item: 'Detroit Tigers' },
  { id: 'HOU', item: 'Houston Astros' },
  { id: 'KC', item: 'Kansas City Royals' },
  { id: 'ANA2', item: 'Los Angeles Angels' },
  { id: 'LA', item: 'Los Angeles Dodgers' },
  { id: 'MIA', item: 'Miami Marlins' },
  { id: 'MIL', item: 'Milwaukee Brewers' },
  { id: 'MIN4', item: 'Minnesota Twins' },
  { id: 'NYM', item: 'New York Mets' },
  { id: 'NYY', item: 'New York Yankees' },
  { id: 'OAK', item: 'Oakland Athletics' },
  { id: 'PHI', item: 'Philadelphia Phillies' },
  { id: 'PIT', item: 'Pittsburgh Pirates' },
  { id: 'SD', item: 'San Diego Padres' },
  { id: 'SF', item: 'San Francisco Giants' },
  { id: 'SEA', item: 'Seattle Mariners' },
  { id: 'STL', item: 'St Louis Cardinals' },
  { id: 'TB', item: 'Tampa Bay Rays' },
  { id: 'TEX', item: 'Texas Rangers' },
  { id: 'TOR', item: 'Toronto Blue Jays' },
  { id: 'WAS', item: 'Washington Nationals' },
  { id: 'ANA', item: 'Anaheim Ducks' },
  { id: 'BUF', item: 'Buffalo Sabres' },
  { id: 'BOS', item: 'Boston Bruins' },
  { id: 'ARI', item: 'Arizona Coyotes' },
  { id: 'COL', item: 'Colorado Avalanche' },
  { id: 'CHI', item: 'Chicago Blackhawks' },
  { id: 'DAL', item: 'Dallas Stars' },
  { id: 'CAR', item: 'Carolina Hurricanes' },
  { id: 'EDM', item: 'Edmonton Oilers' },
  { id: 'MIN', item: 'Minnesota Wild' },
  { id: 'DET', item: 'Detroit Red Wings' },
  { id: 'CBJ', item: 'Columbus Blue Jackets' },
  { id: 'LAK', item: 'Los Angeles Kings' },
  { id: 'NJD', item: 'New Jersey Devils' },
  { id: 'NYR', item: 'New York Rangers' },
  { id: 'NYI', item: 'New York Islanders' },
  { id: 'CGY', item: 'Calgary Flames' },
  { id: 'OTT', item: 'Ottawa Senators' },
  { id: 'MTL', item: 'Montréal Canadiens' },
  { id: 'PHI', item: 'Philadelphia Flyers' },
  { id: 'PIT', item: 'Pittsburgh Penguins' },
  { id: 'SJS', item: 'San Jose Sharks' },
  { id: 'FLA', item: 'Florida Panthers' },
  { id: 'NSH', item: 'Nashville Predators' },
  { id: 'TBL', item: 'Tampa Bay Lightning' },
  { id: 'TOR', item: 'Toronto Maple Leafs' },
  { id: 'STL', item: 'St Louis Blues' },
  { id: 'VAN', item: 'Vancouver Canucks' },
  { id: 'VGK', item: 'Vegas Golden Knights' },
  { id: 'WSH', item: 'Washington Capitals' },
  { id: 'WPG', item: 'Winnipeg Jets' },
  { id: 'SEA', item: 'Seattle Kraken' },
  { id: 'BC', item: 'Boston College Eagles' },
  { id: 'CLEM', item: 'Clemson Tigers' },
  { id: 'DUKE', item: 'Duke Blue Devils' },
  { id: 'FSU', item: 'Florida State Seminoles' },
  { id: 'GT', item: 'Georgia Tech Yellow Jackets' },
  { id: 'LOU', item: 'Louisville Cardinals' },
  { id: 'MIA', item: 'Miami (FL) Hurricanes' },
  { id: 'NCST', item: 'NC State Wolfpack' },
  { id: 'PITT', item: 'Pittsburgh Panthers' },
  { id: 'SYR', item: 'Syracuse Orange' },
  { id: 'UNC', item: 'North Carolina Tar Heels' },
  { id: 'UVA', item: 'Virginia Cavaliers' },
  { id: 'VT', item: 'Virginia Tech Hokies' },
  { id: 'WAKE', item: 'Wake Forest Demon Deacons' },
  { id: 'ILL', item: 'Illinois Fighting Illini' },
  { id: 'IND', item: 'Indiana Hoosiers' },
  { id: 'IOWA', item: 'Iowa Hawkeyes' },
  { id: 'MICH', item: 'Michigan Wolverines' },
  { id: 'MSU', item: 'Michigan State Spartans' },
  { id: 'MINN', item: 'Minnesota Golden Gophers' },
  { id: 'NEB', item: 'Nebraska Cornhuskers' },
  { id: 'NW', item: 'Northwestern Wildcats' },
  { id: 'OSU', item: 'Ohio State Buckeyes' },
  { id: 'PSU', item: 'Penn State Nittany Lions' },
  { id: 'PUR', item: 'Purdue Boilermakers' },
  { id: 'RUTG', item: 'Rutgers Scarlet Knights' },
  { id: 'UMD', item: 'Maryland Terrapins' },
  { id: 'WIS', item: 'Wisconsin Badgers' },
  { id: 'BAY', item: 'Baylor Bears' },
  { id: 'ISU', item: 'Iowa State Cyclones' },
  { id: 'KU', item: 'Kansas Jayhawks' },
  { id: 'KSU', item: 'Kansas State Wildcats' },
  { id: 'OKLA', item: 'Oklahoma Sooners' },
  { id: 'OKST', item: 'Oklahoma State Cowboys' },
  { id: 'TCU', item: 'TCU Horned Frogs' },
  { id: 'TEX', item: 'Texas Longhorns' },
  { id: 'TTU', item: 'Texas Tech Red Raiders' },
  { id: 'WVU', item: 'West Virginia Mountaineers' },
  { id: 'ARIZ', item: 'Arizona Wildcats' },
  { id: 'ASU', item: 'Arizona State Sun Devils' },
  { id: 'CAL', item: 'California Golden Bears' },
  { id: 'COLO', item: 'Colorado Buffaloes' },
  { id: 'ORE', item: 'Oregon Ducks' },
  { id: 'ORST', item: 'Oregon State Beavers' },
  { id: 'STAN', item: 'Stanford Cardinal' },
  { id: 'UCLA', item: 'UCLA Bruins' },
  { id: 'USC', item: 'USC Trojans' },
  { id: 'UTAH', item: 'Utah Utes' },
  { id: 'WASH', item: 'Washington Huskies' },
  { id: 'WSU', item: 'Washington State Cougars' },
  { id: 'BAMA', item: 'Alabama Crimson Tide' },
  { id: 'ARK', item: 'Arkansas Razorbacks' },
  { id: 'AUB', item: 'Auburn Tigers' },
  { id: 'FLA', item: 'Florida Gators' },
  { id: 'UGA', item: 'Georgia Bulldogs' },
  { id: 'UK', item: 'Kentucky Wildcats' },
  { id: 'LSU', item: 'LSU Tigers' },
  { id: 'MISS', item: 'Ole Miss Rebels' },
  { id: 'MSST', item: 'Mississippi State Bulldogs' },
  { id: 'MIZZ', item: 'Missouri Tigers' },
  { id: 'SCAR', item: 'South Carolina Gamecocks' },
  { id: 'TENN', item: 'Tennessee Volunteers' },
  { id: 'TAMU', item: 'Texas A&M Aggies' },
  { id: 'VAN', item: 'Vanderbilt Commodores' },
  { id: 'BYU', item: 'BYU Cougars' },
  { id: 'ARMY', item: 'Army Black Knights' },
  { id: 'UMASS', item: 'UMass Minutemen' },
  { id: 'ND', item: 'Notre Dame Fighting Irish' },
  { id: 'CIN', item: 'Cincinnati Bearcats' },
  { id: 'CONN', item: 'UConn Huskies' },
  { id: 'ECU', item: 'ECU Pirates' },
  { id: 'HOU', item: 'Houston Cougars' },
  { id: 'MEM', item: 'Memphis Tigers' },
  { id: 'NAVY', item: 'Navy Midshipmen' },
  { id: 'SMU', item: 'SMU Mustangs' },
  { id: 'USF', item: 'South Florida Bulls' },
  { id: 'TEM', item: 'Temple Owls' },
  { id: 'TULN', item: 'Tulane Green Wave' },
  { id: 'TLSA', item: 'Tulsa Golden Hurricane' },
  { id: 'UCF', item: 'UCF Knights' },
  { id: 'CHAR', item: 'Charlotte 49ers' },
  { id: 'FAU', item: 'FAU Owls' },
  { id: 'FIU', item: 'FIU Panthers' },
  { id: 'LT', item: 'Louisiana Tech Bulldogs' },
  { id: 'MRSH', item: 'Marshall Thundering Herd' },
  { id: 'MTSU', item: 'Middle Tennessee Blue Raiders' },
  { id: 'UNT', item: 'North Texas Mean Green' },
  { id: 'ODU', item: 'Old Dominion Monarchs' },
  { id: 'RICE', item: 'Rice Owls' },
  { id: 'USM', item: 'Southern Miss Golden Eagles' },
  { id: 'UTEP', item: 'UTEP Miners' },
  { id: 'UTSA', item: 'UTSA Roadrunners' },
  { id: 'WKU', item: 'WKU Hilltoppers' },
  { id: 'AKR', item: 'Akron Zips' },
  { id: 'BALL', item: 'Ball State Cardinals' },
  { id: 'BGSU', item: 'Bowling Green Falcons' },
  { id: 'BUFF', item: 'Buffalo Bulls' },
  { id: 'CMU', item: 'Central Michigan Chippewas' },
  { id: 'EMU', item: 'Eastern Michigan Eagles' },
  { id: 'KENT', item: 'Kent State Golden Flashes' },
  { id: 'M-OH', item: 'Miami (OH) Redhawks' },
  { id: 'NIU', item: 'Northern Illinois Huskies' },
  { id: 'OHIO', item: 'Ohio Bobcats' },
  { id: 'TOL', item: 'Toledo Rockets' },
  { id: 'WMU', item: 'Western Michigan Broncos' },
  { id: 'AFA', item: 'Air Force Falcons' },
  { id: 'BSU', item: 'Boise State Broncos' },
  { id: 'CSU', item: 'Colorado State Rams' },
  { id: 'FRES', item: 'Fresno State Bulldogs' },
  { id: 'HAW', item: 'Hawaii Rainbow Warriors' },
  { id: 'NEV', item: 'Nevada Wolf Pack' },
  { id: 'UNM', item: 'New Mexico Lobos' },
  { id: 'SDSU2', item: 'San Diego State Aztecs' },
  { id: 'SJSU', item: 'San José State Spartans' },
  { id: 'UNLV', item: 'UNLV Rebels' },
  { id: 'USU', item: 'Utah State Aggies' },
  { id: 'WYO', item: 'Wyoming Cowboys' },
  { id: 'APP', item: 'Appalachian State Mountaineers' },
  { id: 'ARST', item: 'Arkansas State Red Wolves' },
  { id: 'GASO', item: 'Georgia Southern Eagles' },
  { id: 'GSU', item: 'Georgia State Panthers' },
  { id: 'IDHO', item: 'Idaho Vandals' },
  { id: 'ULL', item: 'Louisiana Lafayette Ragin Cajuns' },
  { id: 'ULM', item: 'Louisiana Monroe Warhawks' },
  { id: 'NMSU', item: 'New Mexico State Aggies' },
  { id: 'USA', item: 'South Alabama Jaguars' },
  { id: 'TXST', item: 'Texas State Bobcats' },
  { id: 'TROY', item: 'Troy Trojans' },
  { id: 'CP', item: 'Cal Poly Mustangs' },
  { id: 'EWU', item: 'Eastern Washington Eagles' },
  { id: 'IDST', item: 'Idaho State Bengals' },
  { id: 'MONT', item: 'Montana Grizzlies' },
  { id: 'MTST', item: 'Montana State Bobcats' },
  { id: 'UND', item: 'North Dakota Fighting Hawks' },
  { id: 'NAU', item: 'Northern Arizona Lumberjacks' },
  { id: 'UNCO', item: 'Northern Colorado Bears' },
  { id: 'PRST', item: 'Portland State Vikings' },
  { id: 'SAC', item: 'Sacramento State Hornets' },
  { id: 'SUU', item: 'Southern Utah Thunderbirds' },
  { id: 'UCD', item: 'UC Davis Aggies' },
  { id: 'WEB', item: 'Weber State Wildcats' },
  { id: 'CHSO', item: 'Charleston Southern Buccaneers' },
  { id: 'CCAR', item: 'Coastal Carolina Chanticleers' },
  { id: 'WEBB', item: 'Gardner-Webb Runnin Bulldogs' },
  { id: 'KENN', item: 'Kennesaw State Owls' },
  { id: 'LIB', item: 'Liberty Flames' },
  { id: 'MONM', item: 'Monmouth Hawks' },
  { id: 'PRE', item: 'Presbyterian Blue Hose' },
  { id: 'ALBY', item: 'Albany Great Danes' },
  { id: 'DEL', item: 'Delaware Fightin Blue Hens' },
  { id: 'ELON', item: 'Elon Phoenix' },
  { id: 'JMU', item: 'James Madison Dukes' },
  { id: 'MNE', item: 'Maine Black Bears' },
  { id: 'UNH', item: 'New Hampshire Wildcats' },
  { id: 'URI', item: 'Rhode Island Rams' },
  { id: 'RICH', item: 'Richmond Spiders' },
  { id: 'STON', item: 'Stony Brook Seawolves' },
  { id: 'TOWS', item: 'Towson Tigers' },
  { id: 'NOVA', item: 'Villanova Wildcats' },
  { id: 'W&M', item: 'William & Mary Tribe' },
  { id: 'BRWN', item: 'Brown Bears' },
  { id: 'COR', item: 'Cornell Big Red' },
  { id: 'CLMB', item: 'Columbia Lions' },
  { id: 'DART', item: 'Dartmouth Big Green' },
  { id: 'HARV', item: 'Harvard Crimson' },
  { id: 'PENN', item: 'UPenn Quakers' },
  { id: 'PRIN', item: 'Princeton Tigers' },
  { id: 'YALE', item: 'Yale Bulldogs' },
  { id: 'COOK', item: 'Bethune-Cookman Wildcats' },
  { id: 'DSU', item: 'Delaware State Hornets' },
  { id: 'FAMU', item: 'Florida A&M Rattlers' },
  { id: 'HAMP', item: 'Hampton Pirates' },
  { id: 'HOW', item: 'Howard Bison' },
  { id: 'MORG', item: 'Morgan State Bears' },
  { id: 'NORF', item: 'Norfolk State Spartans' },
  { id: 'NCAT', item: 'North Carolina A&T Aggies' },
  { id: 'NCCU', item: 'NC Central Eagles' },
  { id: 'SAV', item: 'Savannah State Tigers' },
  { id: 'SCST', item: 'South Carolina State Bulldogs' },
  { id: 'ILST', item: 'Illinois State Redbirds' },
  { id: 'INST', item: 'Indiana State Sycamores' },
  { id: 'MOST', item: 'Missouri State Bears' },
  { id: 'NDSU', item: 'North Dakota State Bison' },
  { id: 'UNI', item: 'Northern Iowa Panthers' },
  { id: 'SDAK', item: 'South Dakota Coyotes' },
  { id: 'SDSU', item: 'South Dakota State Jackrabbits' },
  { id: 'SIU', item: 'Southern Illinois Salukis' },
  { id: 'WIU', item: 'Western Illinois Leathernecks' },
  { id: 'YSU', item: 'Youngstown State Penguins' },
  { id: 'BRY', item: 'Bryant Bulldogs' },
  { id: 'CCSU', item: 'Central Connecticut Blue Devils' },
  { id: 'DUQ', item: 'Duquesne Dukes' },
  { id: 'RMU', item: 'Robert Morris (PA) Colonials' },
  { id: 'SHU', item: 'Sacred Heart Pioneers' },
  { id: 'SFU', item: 'St. Francis (PA) Red Flash' },
  { id: 'WAG', item: 'Wagner Seahawks' },
  { id: 'PEAY', item: 'Austin Peay Governors' },
  { id: 'EIU', item: 'Eastern Illinois Panthers' },
  { id: 'EKY', item: 'Eastern Kentucky Colonels' },
  { id: 'JVST', item: 'Jacksonville State Gamecocks' },
  { id: 'MURR', item: 'Murray State Racers' },
  { id: 'SEMO', item: 'Southeast Missouri Redhawks' },
  { id: 'TNST', item: 'Tennessee State Tigers' },
  { id: 'TNTC', item: 'Tennessee Tech Golden Eagles' },
  { id: 'UTM', item: 'Tennessee-Martin Skyhawks' },
  { id: 'BUCK', item: 'Bucknell Bison' },
  { id: 'COLG', item: 'Colgate Raiders' },
  { id: 'FOR', item: 'Fordham Rams' },
  { id: 'GTWN', item: 'Georgetown Hoyas' },
  { id: 'HC', item: 'Holy Cross Crusaders' },
  { id: 'LAF', item: 'Lafayette Leopards' },
  { id: 'LEH', item: 'Lehigh Mountain Hawks' },
  { id: 'BUT', item: 'Butler Bulldogs' },
  { id: 'CAMP', item: 'Campbell Fighting Camels' },
  { id: 'DAV', item: 'Davidson Wildcats' },
  { id: 'DAY', item: 'Dayton Flyers' },
  { id: 'DRKE', item: 'Drake Bulldogs' },
  { id: 'JAC', item: 'Jacksonville Dolphins' },
  { id: 'MRST', item: 'Marist Red Foxes' },
  { id: 'MORE', item: 'Morehead State Eagles' },
  { id: 'USD', item: 'San Diego Toreros' },
  { id: 'STET', item: 'Stetson Hatters' },
  { id: 'VALP', item: 'Valparaiso Beacons' },
  { id: 'CHAT', item: 'Chattanooga Mocs' },
  { id: 'ETSU', item: 'ETSU Buccaneers' },
  { id: 'FUR', item: 'Furman Paladins' },
  { id: 'MER', item: 'Mercer Bears' },
  { id: 'SAM', item: 'Samford Bulldogs' },
  { id: 'CIT', item: 'The Citadel Bulldogs' },
  { id: 'VMI', item: 'VMI Keydets' },
  { id: 'WCU', item: 'Western Carolina Catamounts' },
  { id: 'WOF', item: 'Wofford Terriers' },
  { id: 'ACU', item: 'Abilene Christian Wildcats' },
  { id: 'UCA', item: 'Central Arkansas Bears' },
  { id: 'HBU', item: 'Houston Baptist Huskies' },
  { id: 'IW', item: 'Incarnate Word Cardinals' },
  { id: 'LAM', item: 'Lamar Cardinals' },
  { id: 'MCNS', item: 'McNeese State Cowboys' },
  { id: 'NICH', item: 'Nicholls State Colonels' },
  { id: 'NWST', item: 'Northwestern State Demons' },
  { id: 'SHSU', item: 'Sam Houston State Bearkats' },
  { id: 'SELA', item: 'Southeastern Louisiana Lions' },
  { id: 'SFA', item: 'Stephen F. Austin Lumberjacks' },
  { id: 'AAMU', item: 'Alabama A&M Bulldogs' },
  { id: 'ALST', item: 'Alabama State Hornets' },
  { id: 'ALCN', item: 'Alcorn State Braves' },
  { id: 'ARPB', item: 'Arkansas-Pine Bluff Golden Lions' },
  { id: 'GRAM', item: 'Grambling State Tigers' },
  { id: 'JKST', item: 'Jackson State Tigers' },
  { id: 'MVSU', item: 'Mississippi Valley State Delta Devils' },
  { id: 'PV', item: 'Prairie View A&M Panthers' },
  { id: 'SOU', item: 'Southern University Jaguars' },
  { id: 'TXSO', item: 'Texas Southern Tigers' },
];

export function MultiTeamSelect() {
  const [selectedTeams, setSelectedTeams] = useState([]);

  const variables = GlobalVariableContext.useValues();

  const addBetTypeFilter = async item => {
    await Constants.favTeam.push(item);
  };

  return (
    <View>
      <SelectBox
        label=""
        inputPlaceholder="Search Teams..."
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
        multiOptionsLabelStyle={{ color: '#F2F2F2' }}
        multiListEmptyLabelStyle={{
          color: '#F2F2F2',
          fontWeight: 'bold',
          fontSize: 14,
        }}
        listEmptyLabelStyle={{ color: '#F2F2F2' }}
        optionsLabelStyle={{ color: '#F2F2F2', fontSize: 14 }}
        multiOptionContainerStyle={{
          borderRadius: 6,
          backgroundColor: '#BFAB80',
        }}
        multiOptionsLabelStyle={{
          color: '#0f0f0f',
          fontWeight: 'bold',
          fontSize: 14,
        }}
        labelStyle={{ fontSize: 1 }}
        inputFilterStyle={{ color: '#F2F2F2', fontSize: 14 }}
        //containerStyle={{ borderTopColor: "#A5ADB7", borderTopColor: "#A5ADB7" }}
        //optionContainerStyle={{ borderTopColor: "#A5ADB7", borderTopColor: "#A5ADB7" }}
        //inputFilterContainerStyle={{ color: 'red', borderTopColor: "#A5ADB7", borderTopColor: "#A5ADB7" }}
        //inputFilterStyle={{}}
        //optionContainerStyle={{}}
        //selectedItemStyle={{}}
        arrowIconColor="#F2F2F2"
        searchIconColor="#BFAB80"
        toggleIconColor="#BFAB80"
        //placeholderTextColor="#A5ADB7"
      />
    </View>
  );

  function onMultiChange() {
    variables.filterTeam = item =>
      setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
    return item => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  }
};
*/

/////// Odds Table (See docs here: https://www.positronx.io/react-native-table-component-tutorial-with-example/)
/////// Note that container, head, text, dataWrapper, and row are already defined in the StyleSheet.
///   Call this function OddsBoard and plug in "<CustomCode.OddsBoard/>" for the custom component in order  to test on your phone if this works.

export function OddsBoard() {
  const state = {
    tableHead: [
      'Head',
      'Head2',
      'Head3',
      'Head4',
      'Head5',
      'Head6',
      'Head7',
      'Head8',
      'Head9',
    ],
    widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
  };
  const data = [];
  for (let i = 0; i < 30; i += 1) {
    const dataRow = [];
    for (let j = 0; j < 9; j += 1) {
      dataRow.push(`${i}${j}`);
    }
    data.push(dataRow);

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                {data.map((dataRow, index) => (
                  <Row
                    key={index}
                    data={dataRow}
                    widthArr={state.widthArr}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: '#ffffff' },
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

///////* Confidence Level Setter Slider */////////

export function ConfidenceLevelSetter() {
  const [confidenceLevelSetter, setconfidenceLevelSetter] = useState(3);
  return (
    <View>
      <Slider
        onValueChange={confidenceLevelSetter => {
          try {
            setConfidenceLevelSetter(confidenceLevelSetter);
          } catch (err) {
            console.error(err);
          }
        }}
        maximumValue={5}
        step={1}
        minimumValue={1}
        value={confidenceLevelSetter}
      />
    </View>
  );
}

{
  /* Leagues Toggle Buttons */
}

const leagues = [
  'Following',
  'Best Bets',
  'NFL',
  'NCAAF',
  'NBA',
  'NCAAB',
  'MLB',
  'NHL',
  'MMA',
];

export function Leagues() {
  const [leaguesIdx, setleaguesIdx] = useState(0);
  return (
    <View>
      <CustomPickerA
        label={null}
        data={leagues}
        currentIndex={leaguesIdx}
        onSelected={setleaguesIdx}
      />
    </View>
  );
}

{
  /* Live Bets Filter Toggle Buttons */
}

const liveBetsFilter = ['All', 'Exclude Live Bets', 'Only Live Bets'];

export function LiveBetsFilter() {
  const [liveBetsFilterIdx, setliveBetsFilterIdx] = useState(0);
  return (
    <View>
      <CustomPickerB
        label={null}
        data={liveBetsFilter}
        currentIndex={liveBetsFilterIdx}
        onSelected={setliveBetsFilterIdx}
      />
    </View>
  );
}

{
  /* Bonuses Filter Toggle Buttons */
}

const bonusesFilter = ['All', 'Bonuses Only', 'No Bonuses'];

export function BonusesFilter() {
  const [bonusesFilterIdx, setbonusesFilterIdx] = useState(0);
  return (
    <View>
      <CustomPickerB
        label={null}
        data={bonusesFilter}
        currentIndex={bonusesFilterIdx}
        onSelected={setbonusesFilterIdx}
      />
    </View>
  );
}

{
  /* Favorite/Underdog Filter Toggle Buttons */
}

const favoriteUnderdogFilter = ['All', 'Favorites Only', 'Underdogs Only'];

export function FavoriteUnderdogFilter() {
  const [favoriteUnderdogFilterIdx, setfavoriteUnderdogFilterIdx] = useState(0);
  return (
    <View>
      <CustomPickerB
        label={null}
        data={favoriteUnderdogFilter}
        currentIndex={favoriteUnderdogFilterIdx}
        onSelected={setfavoriteUnderdogFilterIdx}
      />
    </View>
  );
}

{
  /* Over/Under Filter Toggle Buttons */
}

const overUnderFilter = ['All', 'Overs Only', 'Unders Only'];

export function OverUnderFilter() {
  const [overUnderFilterIdx, setoverUnderFilterIdx] = useState(0);
  return (
    <View>
      <CustomPickerB
        label={null}
        data={overUnderFilter}
        currentIndex={overUnderFilterIdx}
        onSelected={setoverUnderFilterIdx}
      />
    </View>
  );
}

{
  /* Bet Status Filter Toggle Buttons */
}

const betStatusFilter = [
  'All',
  'All Pending',
  'All Graded',
  'Graded (W, L)',
  'Graded (W)',
  'Graded (L)',
  'Graded (Push)',
];

export function BetStatusFilter() {
  const [betStatusFilterIdx, setbetStatusFilterIdx] = useState(0);
  return (
    <View>
      <CustomPickerB
        label={null}
        data={betStatusFilter}
        currentIndex={betStatusFilterIdx}
        onSelected={setbetStatusFilterIdx}
      />
    </View>
  );
}

{
  /* Verification Status Filter Toggle Buttons */
}

const verificationStatusFilter = [
  'All',
  'All Verified',
  'Synced (Verified)',
  'Manually Tracked (Verified)',
  'Manually Tracked (Unverified)',
];

export function VerificationStatusFilter() {
  const [verificationStatusFilterIdx, setverificationStatusFilterIdx] =
    useState(0);
  return (
    <View>
      <CustomPickerB
        label={null}
        data={verificationStatusFilter}
        currentIndex={verificationStatusFilterIdx}
        onSelected={setverificationStatusFilterIdx}
      />
    </View>
  );
}

{
  /* Confidence Level Filter Toggle Buttons */
}

const confidenceLevelFilter = [
  'All Confidence Levels',
  'Select Confidence Level',
];

export function ConfidenceLevelFilter() {
  const [confidenceLevelFilterIdx, setconfidenceLevelFilterIdx] = useState(0);
  const [sliderBetConfidence, setSliderBetConfidence] = useState(3);
  return (
    <View>
      <CustomPickerB
        label={null}
        data={confidenceLevelFilter}
        currentIndex={confidenceLevelFilterIdx}
        onSelected={setconfidenceLevelFilterIdx}
      />
      <Slider
        onValueChange={sliderBetConfidence => {
          try {
            setSliderBetConfidence(sliderBetConfidence);
          } catch (err) {
            console.error(err);
          }
        }}
        marginTop={18}
        maximumValue={5}
        step={1}
        minimumValue={1}
        value={sliderBetConfidence}
      />
    </View>
  );
}

{
  /* Date Range Filter Toggle Buttons */
}

const dateRangeFilter = [
  'All Time',
  'Last 7 Days',
  'Last 28 Days',
  'Last 3 Months',
  'Year To Date',
  'Last 12 Months',
  'Custom Range',
];

export function DateRangeFilter() {
  const [dateRangeFilterIdx, setdateRangeFilterIdx] = useState(0);
  return (
    <View>
      <CustomPickerB
        label={null}
        data={dateRangeFilter}
        currentIndex={dateRangeFilterIdx}
        onSelected={setdateRangeFilterIdx}
      />
    </View>
  );
}

{
  /* Subcategorize Filter Toggle Buttons */
}

const subcategorizeFilter = [
  'Bet Type',
  'Sportsbook',
  'Tag',
  'League',
  'Favorite/Underdog',
  'Over/Under',
];

export function SubcategorizeFilter() {
  const [subcategorizeFilterIdx, setsubcategorizeFilterIdx] = useState(0);
  return (
    <View>
      <CustomPickerB
        label={null}
        data={subcategorizeFilter}
        currentIndex={subcategorizeFilterIdx}
        onSelected={setsubcategorizeFilterIdx}
      />
    </View>
  );
}

{
  /* Categorize Filter Toggle Buttons
  MAKE THIS SO IF the subcategory is equal to the category, simply don't show the subcategory. */
}

const categorizeFilter = [
  'Bet Type',
  'Sportsbook',
  'Tag',
  'League',
  'Favorite/Underdog',
  'Over/Under',
];

export function CategorizeFilter() {
  const [categorizeFilterIdx, setcategorizeFilterIdx] = useState(3);
  return (
    <View>
      <CustomPickerB
        label={null}
        data={categorizeFilter}
        currentIndex={categorizeFilterIdx}
        onSelected={setcategorizeFilterIdx}
      />
    </View>
  );
}

{
  /* Saved Filter Toggle Buttons */
}

const savedFilter = [
  'savedFilterName - savedFilterDescription',
  'All Time by League',
  'All Time by Bet Type',
  'Underdog Won Bets',
];

export function SavedFilter() {
  const [savedFilterIdx, setsavedFilterIdx] = useState(0);
  return (
    <View>
      <CustomPickerB
        label={null}
        data={savedFilter}
        currentIndex={savedFilterIdx}
        onSelected={setsavedFilterIdx}
      />
    </View>
  );
}

{
  /*Custom Picker A*/
}
const CustomPickerA = ({ label, data, currentIndex, onSelected }) => {
  return (
    <>
      {/*<Text style={styles.title}>{label}</Text>*/}
      <View style={styles.wrapperHorizontal}>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{
            alignItems: 'flex-start',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}
          data={data}
          keyExtractor={(item, idx) => String(item)}
          renderItem={({ item, index }) => {
            const selected = index === currentIndex;
            return (
              <Touchable onPress={() => onSelected(index)} activeOpacity={0.8}>
                <View
                  style={[
                    styles.itemStyleHorizontal,
                    selected && styles.itemSelectedStyleHorizontal,
                  ]}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: selected ? '#0f0f0f' : '#F2F2F2',
                      fontWeight: 'bold',
                    }}
                  >
                    {item + ''}
                  </Text>
                </View>
              </Touchable>
            );
          }}
        />
      </View>
    </>
  );
};

{
  /*Custom Picker B*/
}
const CustomPickerB = ({ label, data, currentIndex, onSelected }) => {
  return (
    <>
      {/*<Text style={styles.title}>{label}</Text>*/}
      <View style={styles.wrapperHorizontal}>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          data={data}
          keyExtractor={(item, idx) => String(item)}
          renderItem={({ item, index }) => {
            const selected = index === currentIndex;
            return (
              <Touchable onPress={() => onSelected(index)} activeOpacity={0.8}>
                <View
                  style={[
                    styles.itemStyleHorizontal,
                    selected && styles.itemSelectedStyleHorizontal,
                  ]}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: selected ? '#0f0f0f' : '#F2F2F2',
                      fontWeight: 'bold',
                    }}
                  >
                    {item + ''}
                  </Text>
                </View>
              </Touchable>
            );
          }}
        />
      </View>
    </>
  );
};

{
  /*Custom Picker C*/
}
const CustomPickerC = ({ label, data, currentIndex, onSelected }) => {
  return (
    <>
      {/*<Text style={styles.title}>{label}</Text>*/}
      <View style={styles.wrapperHorizontalLine}>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
          data={data}
          keyExtractor={(item, idx) => String(item)}
          renderItem={({ item, index }) => {
            const selected = index === currentIndex;
            return (
              <Touchable onPress={() => onSelected(index)} activeOpacity={0.8}>
                <View
                  style={[
                    styles.itemStyleHorizontalLine,
                    selected && styles.itemSelectedStyleHorizontalLine,
                  ]}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: selected ? '#0f0f0f' : '#F2F2F2',
                      fontWeight: 'bold',
                    }}
                  >
                    {item + ''}
                  </Text>
                </View>
              </Touchable>
            );
          }}
        />
      </View>
    </>
  );
};

{
  /* Style Sheet */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },
  head: {
    height: 50,
    backgroundColor: '#6F7BD9',
  },
  text: {
    textAlign: 'center',
    fontWeight: '200',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#F7F8FA',
  },
  wrapperHorizontal: {
    color: 'black',
  },

  wrapperHorizontalLine: {
    color: 'black',
  },

  itemStyleHorizontal: {
    marginTop: 8,
    marginRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#3a3838',
    borderRadius: 6,
    textAlign: 'center',
    justifyContent: 'center',
  },

  itemSelectedStyleHorizontal: {
    backgroundColor: '#bfab80',
  },

  itemStyleHorizontalLine: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: 'transparent',
    borderRadius: 8,
    textAlign: 'center',
  },
  itemSelectedStyleHorizontalLine: {
    backgroundColor: '#bfab80',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#F2F2F2',
  },
  Viewxz: {
    opacity: 1,
    marginTop: 18,
    marginLeft: '4%',
    marginRight: '4%',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  Text_8T: {
    fontSize: 16,
  },
  ViewG2: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  TextBL: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 20,
    marginRight: 6,
  },
  Textbn: {
    fontSize: 14,
  },
  Textry: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 20,
  },

  /////////////////// Games Sheet Test Styles - Probably don't need these anymore??
  Textx4: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  ViewLl: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
  },
  ViewwW: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlatListz7Content: {
    flex: 1,
  },
  ViewlY: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlatList_26Content: {
    flex: 1,
  },
  FlatListMEContent: {
    flex: 1,
  },
  View_7l: {
    flex: 1,
    flexDirection: 'row',
  },
  FetchNd: {
    minHeight: 40,
  },

  //////////////////////////// Styles for custom Games Screen

  TextV8: {
    marginTop: 12,
    fontSize: 8,
    marginBottom: 5,
    fontFamily: 'System',
    fontWeight: '600',
  },
  Text_9N: {
    fontSize: 14,
  },
  ViewvO: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextOh: {
    fontSize: 10,
  },
  TextDa: {
    fontSize: 14,
  },
  View_3D: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Viewmt: {
    alignItems: 'center',
    width: 115,
  },
  FlatListmmContent: {
    flex: 1,
  },
  TextyC: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 8,
    marginTop: 12,
    marginBottom: 5,
  },
  View_3J: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextOl: {
    fontSize: 10,
  },
  ViewR2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  View_2o: {
    alignItems: 'center',
    width: 115,
  },
  FlatListVDContent: {
    flex: 1,
  },
  Textfy: {
    marginTop: 12,
    marginBottom: 5,
    fontSize: 8,
    fontFamily: 'System',
    fontWeight: '600',
  },
  Viewi4: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Textpr: {
    fontSize: 10,
  },
  View_4J: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Viewae: {
    width: 100,
    alignItems: 'center',
  },
  FlatList_82Content: {
    flex: 1,
  },
  ViewDg: {
    paddingBottom: 12,
  },
  DividerTk: {
    height: 1,
  },
});
