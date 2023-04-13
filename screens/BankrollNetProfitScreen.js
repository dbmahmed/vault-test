import React from 'react';
import * as CustomCode from '../CustomCode';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SwaggerAPIApi from '../apis/SwaggerAPIApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import segmentLogScreen from '../global-functions/segmentLogScreen';
import segmentLogTrack from '../global-functions/segmentLogTrack';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  ActionSheet,
  ActionSheetCancel,
  ActionSheetItem,
  Button,
  Circle,
  CircleImage,
  Icon,
  IconButton,
  LinearGradient,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused, useScrollToTop } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Vibration,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const BankrollNetProfitScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const valueNeutral = x => {
    return Number(x) == 0;
  };

  const goToTop = () => {
    /*goToTop = () => {
this.scroll.scrollTo({x: 0, y: 0, animated: true});
}*/

    const ref = React.useRef(null);
    useScrollToTop(ref);
  };

  const newBookSynced = book => {
    return book.length === 0;

    //Set variable
    //Need to make this so it's true if an additional book is added!
  };

  const firstCharacter = x => {
    return x == null ? '' : x.charAt(0);
  };

  const checkEarlyAccessCode = x => {
    return x !== 'V7XyG' ? true : false;
  };

  const userSelectedSportsbook = accountId => {
    return Constants.selectedSportsbook == accountId;
  };

  const dateRefreshed = betRefreshRequested => {
    const t1 = new Date(betRefreshRequested).getTime();
    const t2 = new Date().getTime();
    const diffSec = (t2 - t1) / 1000;
    if (diffSec > 0) {
      const d = diffSec / (3600 * 24);
      const h = diffSec / 3600;
      const m = diffSec / 60;
      const s = diffSec;
      if (d >= 1) {
        return parseInt(d) + 'd';
      }
      if (h >= 1) {
        return parseInt(h) + 'h';
      }
      if (m >= 1) {
        return parseInt(m) + 'm';
      }
      if (s > 0) {
        return parseInt(s) + 's';
      }
    } else {
      return 0 + 's';
    }
  };

  const bookRegionSyntax = abbr => {
    return abbr == null ? '' : ' (' + abbr.toUpperCase() + ')';
  };

  const tutorialScreenCounter2 = x => {
    return x == 2 ? true : false;
  };

  const addOne = data => {
    let x = data + 1;
    console.log('x:' + x);
    return x;
  };

  const scrollToTop = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.
    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    // find info here: https://spin.atomicobject.com/2021/04/20/react-native-building-scroll-top-button/
  };

  const valueNegative = x => {
    return Number(x) < 0;
  };

  const promptResyncBook = x => {
    const t1 = new Date(x.betRefreshRequested).getTime();
    const t2 = new Date().getTime();
    const diffSec = (t2 - t1) / 1000;

    //return ((diffSec / (60 * 60 * 24)) >= 2)

    return diffSec >= 60 * 60 * 10 ||
      x.latestRefreshResponse.status == 401 ||
      x.latestRefreshResponse.status == 403 ||
      x.latestRefreshResponse.status == 500
      ? true
      : false;
  };

  const valuePositive = x => {
    return Number(x) > 0;
  };

  const bookStatus = latestRefreshResponse => {
    return latestRefreshResponse == 403 || latestRefreshResponse == 500;
  };

  const tutorialScreenCounter1 = x => {
    return x == 1 ? true : false;
  };

  const aggregateCompare = x => {
    return x == 'Aggregate';
  };

  const checkSportsbooksSynced = sportsbooks => {
    if (sportsbooks.length !== 0) {
      Constants.sportsbooksSynced = true;
      Constants.waitlisted = false;
    }

    //Constants.sportsbooksSynced = sportsbooks.length == 0 ? false : true;
    //Constants.waitlisted = sportsbooks.length == 0 ? true : false;

    setSportsbooksSynced(Constants.sportsbooksSynced);
    //setWaitlisted(Constants.waitlisted);

    return sportsbooks;
  };

  const orderBooks = balance => {
    balance.sort((a, b) => (a.balance < b.balance ? 1 : -1));
    return balance;
  };

  const balanceSyntax = x => {
    //return "$" + ((balance/100).toFixed(2));

    //Old w/o up/down arrows
    //return x < 0 ? "-$" + (Math.abs((x/100)).toFixed(2)) : "$" + (Math.abs((x/100)).toFixed(2));

    //New w/ up/down arrows
    return '$' + Math.abs(x / 100).toFixed(2);
  };

  const checkSportsbooksConnected = sportsbooks => {
    /*
if (sportsbooks.length !== 0){
Constants.sportsbooksSynced = true;
Constants.waitlisted = false;
};

//Constants.sportsbooksSynced = sportsbooks.length == 0 ? false : true;
//Constants.waitlisted = sportsbooks.length == 0 ? true : false;

setSportsbooksSynced(Constants.sportsbooksSynced);
//setWaitlisted(Constants.waitlisted);

return sportsbooks;
*/

    //function loopBookConnected() {

    //    return connected;
    //};

    let connected = false;
    for (let x = 0; x < sportsbooks.length; x++) {
      if (sportsbooks[x].account.latestRefreshResponse == null) {
        connected = true;
      } else if (
        (new Date().getTime() -
          new Date(sportsbooks[x].account.betRefreshRequested).getTime()) /
          1000 >=
          60 * 60 * 10 ||
        sportsbooks[x].account.latestRefreshResponse.status == 401 ||
        sportsbooks[x].account.latestRefreshResponse.status == 403 ||
        sportsbooks[x].account.latestRefreshResponse.status == 500
      ) {
        connected = false;
        break;
      } else {
        connected = true;
      }
    }

    Constants.sportsbooksConnected = connected;

    setSportsbooksConnected(Constants.sportsbooksConnected);

    return sportsbooks;

    /*
/////////////// The above function was derived from this simliar function ///////////////

const t1 = new Date(sportsbooks[x].account.betRefreshRequested).getTime()
const t2 = new Date().getTime()
const diffSec = (t2 - t1) / 1000

((((new Date().getTime()) - (new Date(sportsbooks[x].account.betRefreshRequested).getTime())) / 1000) >= (60 * 60 * 10))

let connected = false;
for (let x = 0; x < sportsbooks.length; x++){
if (
    (diffSec >= (60 * 60 * 10))
    || sportsbooks[x].account.latestRefreshResponse.status == 401
    || sportsbooks[x].account.latestRefreshResponse.status == 403
    || sportsbooks[x].account.latestRefreshResponse.status == 500
) {
    connected = false;
    break;
} else {
    connected = true;
};
};






if (sportsbooks.length !== 0){
Constants.sportsbooksSynced = true;
Constants.waitlisted = false;
};

setSportsbooksConnected(Constants.sportsbooksConnected);

return sportsbooks;


/////////////////////////////////


const t1 = new Date(x.betRefreshRequested).getTime()
const t2 = new Date().getTime()
const diffSec = (t2 - t1) / 1000

//return ((diffSec / (60 * 60 * 24)) >= 2)

return (diffSec >= (60 * 60 * 10))
|| x.latestRefreshResponse.status == 401
|| x.latestRefreshResponse.status == 403
|| x.latestRefreshResponse.status == 500 ? true : false;


//////////////////////////////////


function loopLiveBet() {
let exist = false;
for (let x = 0; x < betslips.bets.length; x++){
    if (
        (diffSec >= (60 * 60 * 10))
        || sportsbooks[x].account.latestRefreshResponse.status == 401
        || sportsbooks[x].account.latestRefreshResponse.status == 403
        || sportsbooks[x].account.latestRefreshResponse.status == 500
    ) {
    exist = true;
    } else {
    exist;
    };
};
return exist;
};

*/
  };

  const vibrateOnPress = () => {
    Vibration.vibrate(1200, false);
  };

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const swaggerAPIDeleteBookByIdGET = SwaggerAPIApi.useDeleteBookByIdGET();
  const swaggerAPIUpdateBetslipsByBettorIdGET =
    SwaggerAPIApi.useUpdateBetslipsByBettorIdGET();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      segmentLogScreen(segment, 'Money');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [dummy, setDummy] = React.useState(0);
  const [refreshinguVQdQDz2, setRefreshinguVQdQDz2] = React.useState(false);
  const [removeBookId, setRemoveBookId] = React.useState('');
  const [removeBookName, setRemoveBookName] = React.useState('');
  const [removeBookRegionAbbr, setRemoveBookRegionAbbr] = React.useState('');
  const [sportsbooksConnected, setSportsbooksConnected] = React.useState(false);
  const [sportsbooksSynced, setSportsbooksSynced] = React.useState(false);
  const [starRatingValue, setStarRatingValue] = React.useState(0);
  const [testValue, setTestValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors.background },
        dimensions.width
      )}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      {/* Menu Surface */}
      <Surface
        style={StyleSheet.applyWidth(
          { backgroundColor: theme.colors.background, borderRadius: 0 },
          dimensions.width
        )}
        elevation={3}
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
                  justifyContent: 'center',
                  width: '33%',
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    setGlobalVariableValue({
                      key: 'toggleMenuModal',
                      value: true,
                    });
                    setGlobalVariableValue({
                      key: 'profileCardSettings',
                      value: false,
                    });
                    segmentLogTrack(
                      segment,
                      'Menu Opened',
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
                      flexDirection: 'row',
                      height: 50,
                      paddingLeft: 16,
                      paddingRight: 16,
                    },
                    dimensions.width
                  )}
                >
                  {/* Menu */}
                  <Icon
                    name={'Ionicons/ios-menu'}
                    size={28}
                    color={theme.colors.lightLowImportanceText}
                  />
                </View>
              </Touchable>
            </View>

            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  justifyContent: 'center',
                },
                dimensions.width
              )}
            >
              {/* Vault Logo */}
              <>
                {!Constants['showVaultLogo'] ? null : (
                  <Image
                    style={StyleSheet.applyWidth(
                      { height: 50, width: 115 },
                      dimensions.width
                    )}
                    source={Images.VaultLogoLightFontClearBackground}
                    resizeMode={'contain'}
                  />
                )}
              </>
            </View>
            {/* Right Button */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-end',
                  borderRadius: 0,
                  height: 50,
                  justifyContent: 'center',
                  width: '33%',
                },
                dimensions.width
              )}
            >
              <>
                {Constants['waitlisted'] ? null : (
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate('SharpSportsFormScreen');
                        setDummy(addOne(dummy));
                        segmentLogTrack(
                          segment,
                          'Sync a sportsbook',
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
                          alignItems: 'flex-end',
                          height: 50,
                          justifyContent: 'center',
                          paddingLeft: 16,
                          paddingRight: 16,
                        },
                        dimensions.width
                      )}
                    >
                      {/* Sync */}
                      <Icon
                        name={'Ionicons/ios-add-circle'}
                        size={28}
                        color={theme.colors.lightLowImportanceText}
                      />
                    </View>
                  </Touchable>
                )}
              </>
            </View>
          </View>
        </View>
      </Surface>
      {/* Waitlist View */}
      <>
        {!Constants['waitlisted'] ? null : (
          <View
            style={StyleSheet.applyWidth(
              { paddingBottom: 150 },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors.primary,
                  flexDirection: 'row',
                  paddingBottom: 12,
                  paddingLeft: '4%',
                  paddingRight: '4%',
                  paddingTop: 12,
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.strongTextOnGoldButtons,
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '700',
                        marginRight: 3,
                      },
                      dimensions.width
                    )}
                  >
                    {"You're On the Waitlist!"}
                  </Text>
                </View>

                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strongTextOnGoldButtons,
                      fontSize: 12,
                      marginTop: 10,
                    },
                    dimensions.width
                  )}
                >
                  {
                    "We're currently at capacity but we'll let you know as soon as space is available."
                  }
                </Text>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Skip the line */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate('CreateProfileBetaStack', {
                          screen: 'CreateProfile5ChooseYourPromoScreen',
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
                          borderBottomWidth: 1,
                          borderColor: theme.colors.strongTextOnGoldButtons,
                          borderLeftWidth: 1,
                          borderRadius: 8,
                          borderRightWidth: 1,
                          borderTopWidth: 1,
                          justifyContent: 'center',
                          paddingBottom: 8,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {/* Skip the line */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.strongTextOnGoldButtons,
                            fontFamily: 'System',
                            fontWeight: '700',
                          },
                          dimensions.width
                        )}
                      >
                        {'Skip the line'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            </View>

            <ScrollView
              contentContainerStyle={StyleSheet.applyWidth(
                { alignItems: 'center' },
                dimensions.width
              )}
              showsVerticalScrollIndicator={true}
              bounces={true}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', height: 1000, width: 375 },
                  dimensions.width
                )}
              >
                <Image
                  style={StyleSheet.applyWidth(
                    { height: '100%', width: '100%' },
                    dimensions.width
                  )}
                  source={Images.MoneyDemo}
                  resizeMode={'contain'}
                />
              </View>
            </ScrollView>
          </View>
        )}
      </>
      {/* Waitlisted */}
      <>
        {Constants['waitlisted'] ? null : (
          <View>
            {/* Demo Mode View */}
            <>
              {sportsbooksSynced ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    { paddingBottom: 200 },
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate('SharpSportsFormScreen');
                        segmentLogTrack(
                          segment,
                          'Sync a sportsbook',
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
                          backgroundColor: theme.colors.primary,
                          flexDirection: 'row',
                          paddingBottom: 6,
                          paddingLeft: '4%',
                          paddingRight: '4%',
                          paddingTop: 6,
                        },
                        dimensions.width
                      )}
                    >
                      <Icon
                        style={StyleSheet.applyWidth(
                          { marginRight: 6 },
                          dimensions.width
                        )}
                        name={'Ionicons/ios-add-circle'}
                        size={28}
                      />
                      <View
                        style={StyleSheet.applyWidth(
                          { flex: 1 },
                          dimensions.width
                        )}
                      >
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.strongTextOnGoldButtons,
                              fontFamily: 'System',
                              fontSize: 14,
                              fontWeight: '700',
                            },
                            dimensions.width
                          )}
                        >
                          {'Sync A Sportsbook'}
                        </Text>

                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.strongTextOnGoldButtons,
                              fontSize: 12,
                            },
                            dimensions.width
                          )}
                        >
                          {
                            "You're in Demo Mode. Sync at least one sportsbook to view your net profit and bankroll graph!"
                          }
                        </Text>
                      </View>
                    </View>
                  </Touchable>
                  {/* Demo Mode Scroll View */}
                  <ScrollView
                    contentContainerStyle={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                    showsVerticalScrollIndicator={true}
                    bounces={true}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', height: 1000, width: 375 },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          { height: '100%', width: '100%' },
                          dimensions.width
                        )}
                        resizeMode={'contain'}
                        source={Images.MoneyDemo}
                      />
                    </View>
                  </ScrollView>
                </View>
              )}
            </>
            {/* Hide Prompt */}
            <>
              {!Constants['showSportsbooksDisconnectedPrompt'] ? null : (
                <View>
                  {/* Resync Sportsbook Prompt Touchable */}
                  <>
                    {sportsbooksConnected ? null : (
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.navigate('CreateProfileBetaStack');
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor: theme.colors['Error'],
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingBottom: 6,
                              paddingLeft: 16,
                              paddingTop: 6,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                marginRight: 16,
                              },
                              dimensions.width
                            )}
                          >
                            <Icon
                              style={StyleSheet.applyWidth(
                                { marginRight: 6 },
                                dimensions.width
                              )}
                              name={'Foundation/unlink'}
                              color={
                                theme.colors['Background Inverse (Main Font)']
                              }
                              size={28}
                            />
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1, marginRight: 6 },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors[
                                        'Background Inverse (Main Font)'
                                      ],
                                    fontFamily: 'System',
                                    fontSize: 14,
                                    fontWeight: '700',
                                  },
                                  dimensions.width
                                )}
                              >
                                {'Sportsbook disconnected!'}
                              </Text>

                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors[
                                        'Background Inverse (Main Font)'
                                      ],
                                    fontSize: 12,
                                  },
                                  dimensions.width
                                )}
                              >
                                {
                                  'You may not be seeing all your bets. Click to resync the disconnected book(s).'
                                }
                              </Text>
                            </View>
                          </View>
                          {/* Hide Notice Touchable */}
                          <Touchable
                            onPress={() => {
                              try {
                                setGlobalVariableValue({
                                  key: 'showSportsbooksDisconnectedPrompt',
                                  value: false,
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
                                  justifyContent: 'center',
                                  marginBottom: 10,
                                  marginLeft: 10,
                                  marginRight: 16,
                                  marginTop: 10,
                                },
                                dimensions.width
                              )}
                            >
                              <Icon
                                name={'Ionicons/ios-close'}
                                size={20}
                                color={
                                  theme.colors['Background Inverse (Main Font)']
                                }
                              />
                            </View>
                          </Touchable>
                        </View>
                      </Touchable>
                    )}
                  </>
                </View>
              )}
            </>
          </View>
        )}
      </>
      <SwaggerAPIApi.FetchGetBankrollPageByIdGET
        dummy={Constants['updatedSportsBook']}
        internalId={Constants['internalId']}
        onData={fetchData => {
          try {
            console.log(dummy);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ loading, error, data, refetchGetBankrollPageById }) => {
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
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshinguVQdQDz2}
                  onRefresh={() => {
                    const handler = async () => {
                      try {
                        setRefreshinguVQdQDz2(true);
                        await refetchGetBankrollPageById();
                        setGlobalVariableValue({
                          key: 'updatedSportsBook',
                          value: Constants['updatedSportsBook'] + 1,
                        });
                        setRefreshinguVQdQDz2(false);
                      } catch (err) {
                        console.error(err);
                        setRefreshinguVQdQDz2(false);
                      }
                    };
                    handler();
                  }}
                  colors={[theme.colors['Background Inverse (Main Font)']]}
                  tintColor={theme.colors['Background Inverse (Main Font)']}
                />
              }
              bounces={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {/* Title-Graph-Date Range Selectors */}
              <View>
                <View
                  style={StyleSheet.applyWidth(
                    { minHeight: 50 },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { backgroundColor: theme.colors.background, height: 10 },
                      dimensions.width
                    )}
                  />
                  <FlatList
                    data={checkSportsbooksConnected(
                      checkSportsbooksSynced(fetchData)
                    )}
                    listKey={'0OiRiCPn'}
                    keyExtractor={listData =>
                      listData?.id || listData?.uuid || JSON.stringify(listData)
                    }
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {/* Title */}
                          <>
                            {!userSelectedSportsbook(
                              listData?.account?.id
                            ) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'flex-start',
                                    marginLeft: 16,
                                    marginRight: 16,
                                    opacity: 1,
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Total Bankroll Label */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color:
                                        theme.colors.lightLowImportanceText,
                                      fontSize: 14,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {listData?.account?.book?.name}
                                  {' Bankroll'}
                                </Text>
                                {/* Bankroll */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color:
                                        theme.colors.backgroundInverseMainFont,
                                      fontFamily: 'System',
                                      fontSize: 32,
                                      fontWeight: '700',
                                      marginRight: 6,
                                      marginTop: 1,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {balanceSyntax(listData?.account?.balance)}
                                </Text>
                                {/* Net Profit */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      marginTop: 3,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Down Arrow */}
                                  <>
                                    {!valueNegative(
                                      listData?.netProfit
                                    ) ? null : (
                                      <Icon
                                        color={theme.colors['Bad/Error/Cancel']}
                                        size={14}
                                        name={'Feather/arrow-down-right'}
                                      />
                                    )}
                                  </>
                                  {/* Up Arrow */}
                                  <>
                                    {!valuePositive(
                                      listData?.netProfit
                                    ) ? null : (
                                      <Icon
                                        size={14}
                                        color={theme.colors['Good']}
                                        name={'Feather/arrow-up-right'}
                                      />
                                    )}
                                  </>
                                  {/* Neut Net Profit */}
                                  <>
                                    {!valueNeutral(
                                      listData?.netProfit
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors
                                                .backgroundInverseMainFont,
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '600',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {balanceSyntax(listData?.netProfit)}
                                      </Text>
                                    )}
                                  </>
                                  {/* Neg Net Profit */}
                                  <>
                                    {!valueNegative(
                                      listData?.netProfit
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.badErrorCancel,
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '600',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {balanceSyntax(listData?.netProfit)}
                                      </Text>
                                    )}
                                  </>
                                  {/* Pos Net Profit */}
                                  <>
                                    {!valuePositive(
                                      listData?.netProfit
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.good,
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '600',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {balanceSyntax(listData?.netProfit)}
                                      </Text>
                                    )}
                                  </>
                                  {/* Net Profit Label */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          theme.colors.lightLowImportanceText,
                                        fontSize: 14,
                                        marginLeft: 7,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {listData?.account?.book?.name}
                                    {' Net'}
                                  </Text>
                                </View>
                                {/* Pending */}
                                <>
                                  {!listData?.pending ? null : (
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Pending */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors
                                                .backgroundInverseMainFont,
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '600',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {balanceSyntax(listData?.pending)}
                                      </Text>
                                      {/* Pending Label */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors[
                                                'Light_low_importance_text'
                                              ],
                                            marginLeft: 7,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Pending'}
                                      </Text>
                                    </View>
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
                  <View
                    style={StyleSheet.applyWidth(
                      { marginLeft: '4%', marginRight: '4%', marginTop: 18 },
                      dimensions.width
                    )}
                  >
                    {/* Bankroll Chart */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          height: 400,
                          justifyContent: 'center',
                          marginBottom: 28,
                          marginTop: 14,
                        },
                        dimensions.width
                      )}
                    >
                      <Utils.CustomCodeErrorBoundary>
                        <CustomCode.VictoryLineNetProfit
                          chartData={fetchData}
                        />
                      </Utils.CustomCodeErrorBoundary>
                    </View>
                  </View>
                </View>
              </View>
              {/* Sportsbooks */}
              <View
                style={StyleSheet.applyWidth(
                  { paddingLeft: '4%', paddingRight: '4%', paddingTop: 22 },
                  dimensions.width
                )}
              >
                <FlatList
                  data={fetchData}
                  listKey={'5braZFZH'}
                  keyExtractor={listData =>
                    listData?.id || listData?.uuid || JSON.stringify(listData)
                  }
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <View
                        style={StyleSheet.applyWidth(
                          { marginTop: 6, minHeight: 50 },
                          dimensions.width
                        )}
                      >
                        <Touchable
                          onPress={() => {
                            try {
                              setGlobalVariableValue({
                                key: 'selectedSportsbook',
                                value: listData?.account?.id,
                              });
                              setGlobalVariableValue({
                                key: 'selectedSportsbookChart',
                                value: listData?.timeSeries,
                              });
                              segmentLogTrack(
                                segment,
                                'Alternate sportsbook viewed',
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
                                listData?.account?.book?.id,
                                undefined
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <Surface
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors.background,
                                borderRadius: 8,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                            elevation={1}
                          >
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
                                  paddingBottom: 12,
                                  paddingLeft: 12,
                                  paddingRight: 12,
                                  paddingTop: 12,
                                },
                                dimensions.width
                              )}
                              collapsable={false}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { justifyContent: 'center', width: '60%' },
                                  dimensions.width
                                )}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'flex-start',
                                      justifyContent: 'center',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Logo */}
                                    <>
                                      {!listData?.account?.book
                                        ?.bookLogo ? null : (
                                        <Image
                                          style={StyleSheet.applyWidth(
                                            {
                                              height: 18,
                                              marginRight: 6,
                                              width: 18,
                                            },
                                            dimensions.width
                                          )}
                                          resizeMode={'contain'}
                                          source={{
                                            uri: `${listData?.account?.book?.bookLogo}`,
                                          }}
                                        />
                                      )}
                                    </>
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
                                      {listData?.account?.book?.name}
                                    </Text>
                                    <>
                                      {!userSelectedSportsbook(
                                        listData?.account?.id
                                      ) ? null : (
                                        <Icon
                                          style={StyleSheet.applyWidth(
                                            { marginLeft: 6 },
                                            dimensions.width
                                          )}
                                          color={theme.colors.primary}
                                          size={10}
                                          name={'MaterialIcons/stop-circle'}
                                        />
                                      )}
                                    </>
                                  </View>
                                  <>
                                    {!listData?.account
                                      ?.betRefreshRequested ? null : (
                                      <View>
                                        <>
                                          {promptResyncBook(
                                            listData?.account
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
                                              {'Refreshed '}
                                              {dateRefreshed(
                                                listData?.account
                                                  ?.betRefreshRequested
                                              )}
                                              {' ago'}
                                            </Text>
                                          )}
                                        </>
                                        <>
                                          {!promptResyncBook(
                                            listData?.account
                                          ) ? null : (
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'center',
                                                  flexDirection: 'row',
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors['Error'],
                                                    fontSize: 10,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {'Connection error. Press'}
                                              </Text>
                                              <Icon
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    marginLeft: 2,
                                                    marginRight: 2,
                                                  },
                                                  dimensions.width
                                                )}
                                                name={'Ionicons/ios-add-circle'}
                                                size={10}
                                                color={
                                                  theme.colors
                                                    .lightLowImportanceText
                                                }
                                              />
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors['Error'],
                                                    fontSize: 10,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {'to resync book'}
                                              </Text>
                                            </View>
                                          )}
                                        </>
                                      </View>
                                    )}
                                  </>
                                </View>
                              </View>

                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    width: '40%',
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Bankroll View */}
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
                                  <>
                                    {!aggregateCompare(
                                      listData?.account?.id
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors
                                                .backgroundInverseMainFont,
                                            fontSize: 8,
                                            marginRight: 6,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Bankroll'}
                                      </Text>
                                    )}
                                  </>
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          theme.colors
                                            .backgroundInverseMainFont,
                                        fontFamily: 'System',
                                        fontSize: 18,
                                        fontWeight: '700',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {balanceSyntax(listData?.account?.balance)}
                                  </Text>
                                </View>
                                {/* Winnings View */}
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
                                  {/* Winnings Label */}
                                  <>
                                    {!aggregateCompare(
                                      listData?.account?.id
                                    ) ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { marginRight: 6 },
                                          dimensions.width
                                        )}
                                      >
                                        <>
                                          {!valuePositive(
                                            listData?.winnings
                                          ) ? null : (
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors[
                                                      'Background Inverse (Main Font)'
                                                    ],
                                                  fontSize: 8,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {'Winnings'}
                                            </Text>
                                          )}
                                        </>
                                        <>
                                          {!valueNeutral(
                                            listData?.winnings
                                          ) ? null : (
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors
                                                      .backgroundInverseMainFont,
                                                  fontSize: 8,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {'Winnings'}
                                            </Text>
                                          )}
                                        </>
                                      </View>
                                    )}
                                  </>
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        backgroundColor:
                                          theme.colors['Light Good'],
                                        borderRadius: 20,
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <>
                                      {!valuePositive(
                                        listData?.winnings
                                      ) ? null : (
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.good,
                                              fontSize: 16,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {balanceSyntax(listData?.winnings)}
                                        </Text>
                                      )}
                                    </>
                                  </View>
                                  <>
                                    {!valueNeutral(
                                      listData?.winnings
                                    ) ? null : (
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors
                                                .backgroundInverseMainFont,
                                            fontSize: 16,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {balanceSyntax(listData?.winnings)}
                                      </Text>
                                    )}
                                  </>
                                </View>
                                {/* Pending View */}
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
                                  {/* Pending Label */}
                                  <>
                                    {!aggregateCompare(
                                      listData?.account?.id
                                    ) ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { marginRight: 6 },
                                          dimensions.width
                                        )}
                                      >
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color:
                                                theme.colors[
                                                  'Background Inverse (Main Font)'
                                                ],
                                              fontSize: 8,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {'Pending'}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                  {/* Pending */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          theme.colors[
                                            'Background Inverse (Main Font)'
                                          ],
                                        fontSize: 16,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {balanceSyntax(listData?.pending)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </Surface>
                        </Touchable>
                      </View>
                    );
                  }}
                  contentContainerStyle={StyleSheet.applyWidth(
                    { flex: 1 },
                    dimensions.width
                  )}
                  numColumns={1}
                />
              </View>
              {/* Buttons */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', marginBottom: 28, marginTop: 32 },
                  dimensions.width
                )}
              >
                {/* Sync A Sportsbook */}
                <Button
                  onPress={() => {
                    try {
                      navigation.navigate('SharpSportsFormScreen');
                      segmentLogTrack(
                        segment,
                        'Sync a sportsbook',
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
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['Primary'],
                      borderColor: theme.colors['Primary'],
                      borderRadius: 8,
                      borderWidth: 1,
                      color: theme.colors['Strong_Text_on_gold_buttons'],
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 10,
                      minWidth: 250,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  loading={false}
                  title={'Sync A Sportsbook'}
                  icon={'Ionicons/ios-add-circle'}
                >
                  {'Log In'}
                </Button>
                {/* Manage Sportsbooks */}
                <Button
                  onPress={() => {
                    try {
                      navigation.navigate('CreateProfileBetaStack', {
                        screen: 'ManageBooksScreen',
                      });
                      segmentLogTrack(
                        segment,
                        'Navigate to Manage Sportsbooks',
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
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: 'transparent',
                      borderColor: theme.colors['Primary'],
                      borderRadius: 8,
                      borderWidth: 1,
                      color: theme.colors['Primary'],
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      minWidth: 250,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  loading={false}
                  icon={'Ionicons/ios-list-circle'}
                  title={'Manage Sportsbooks'}
                >
                  {'Log In'}
                </Button>
              </View>
            </ScrollView>
          );
        }}
      </SwaggerAPIApi.FetchGetBankrollPageByIdGET>
      {/* Menu Modal */}
      <Modal
        visible={Constants['toggleMenuModal']}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
      >
        <Touchable
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'toggleMenuModal',
                value: false,
              });
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ height: '30%' }, dimensions.width)}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background,
              borderRadius: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '70%',
              justifyContent: 'space-between',
              paddingBottom: 36,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { justifyContent: 'space-between' },
              dimensions.width
            )}
          >
            {/* Menu Bar */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'space-between' },
                dimensions.width
              )}
            >
              {/* Left Button */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '25%' },
                  dimensions.width
                )}
              />
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                  },
                  dimensions.width
                )}
              />
              <View
                style={StyleSheet.applyWidth({ width: 25 }, dimensions.width)}
              >
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'toggleMenuModal',
                        value: false,
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

            <View
              style={StyleSheet.applyWidth(
                { paddingLeft: '4%', paddingRight: '4%' },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                {/* Profile Information Fetch */}
                <SwaggerAPIApi.FetchGetUserInfoGET
                  interanlId={Constants['internalId']}
                >
                  {({ loading, error, data, refetchGetUserInfo }) => {
                    const profileInformationFetchData = data;
                    if (!profileInformationFetchData || loading) {
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
                      <View
                        style={StyleSheet.applyWidth(
                          { alignItems: 'center', flexDirection: 'row' },
                          dimensions.width
                        )}
                      >
                        <Surface
                          style={StyleSheet.applyWidth(
                            { borderRadius: 31 },
                            dimensions.width
                          )}
                          elevation={2}
                        >
                          <Circle
                            size={62}
                            bgColor={theme.colors.backgroundInverseMainFont}
                          >
                            {/* Profile Picture */}
                            <>
                              {!Constants['profilePictureUrl'] ? null : (
                                <CircleImage
                                  source={{
                                    uri: `${Constants['profilePictureUrl']}`,
                                  }}
                                  size={60}
                                />
                              )}
                            </>
                            {/* Default Profile Picture */}
                            <>
                              {Constants['profilePictureUrl'] ? null : (
                                <Circle
                                  size={60}
                                  bgColor={theme.colors.lightLowImportanceText}
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
                                          color:
                                            theme.colors
                                              .backgroundInverseMainFont,
                                          fontFamily: 'System',
                                          fontSize: 30,
                                          fontWeight: '400',
                                          textAlign: 'center',
                                          textTransform: 'uppercase',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {firstCharacter(
                                        profileInformationFetchData?.firstName
                                      )}
                                      {firstCharacter(
                                        profileInformationFetchData?.lastName
                                      )}
                                    </Text>
                                  </LinearGradient>
                                </Circle>
                              )}
                            </>
                          </Circle>
                        </Surface>

                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-start',
                              flex: 1,
                              justifyContent: 'center',
                              marginLeft: 16,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Name */}
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
                            {profileInformationFetchData?.firstName}{' '}
                            {profileInformationFetchData?.lastName}
                          </Text>
                          {/* Username */}
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.lightLowImportanceText,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '700',
                              },
                              dimensions.width
                            )}
                          >
                            {'@'}
                            {profileInformationFetchData?.userName}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                </SwaggerAPIApi.FetchGetUserInfoGET>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-start', marginTop: 22 },
                  dimensions.width
                )}
              >
                {/* Profile & Settings */}
                <Button
                  onPress={() => {
                    try {
                      navigation.navigate('SettingsBetaScreen');
                      setGlobalVariableValue({
                        key: 'toggleMenuModal',
                        value: false,
                      });
                      segmentLogTrack(
                        segment,
                        'Navigated to Settings',
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
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.background,
                      borderRadius: 8,
                      color: theme.colors.backgroundInverseMainFont,
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 10,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Profile & Settings'}
                  icon={'Ionicons/ios-settings-sharp'}
                />
                {/* Sync A Sportsbook */}
                <>
                  {Constants['waitlisted'] ? null : (
                    <Button
                      onPress={() => {
                        try {
                          setGlobalVariableValue({
                            key: 'toggleMenuModal',
                            value: false,
                          });
                          navigation.navigate('SharpSportsFormScreen');
                          segmentLogTrack(
                            segment,
                            'Sync a sportsbook',
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
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.background,
                          borderRadius: 8,
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '700',
                          marginBottom: 10,
                          textAlign: 'center',
                        },
                        dimensions.width
                      )}
                      title={'Sync a Sportsbook'}
                      icon={'Ionicons/ios-add-circle'}
                    />
                  )}
                </>
                {/* Adjust Unit Size */}
                <Button
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'toggleMenuModal',
                        value: false,
                      });
                      navigation.navigate('AdjustUnitSizeScreen');
                      segmentLogTrack(
                        segment,
                        'Navigated to Adjust Unit Size',
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
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.background,
                      borderRadius: 8,
                      color: theme.colors.backgroundInverseMainFont,
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 10,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={`Adjust Unit Size ($${Constants['userDefaultUnitSize']})`}
                  icon={'MaterialCommunityIcons/plus-minus-box'}
                />
                {/* Join the Discord */}
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await WebBrowser.openBrowserAsync(
                          'https://discord.gg/6bGRD7BpUD'
                        );
                        segmentLogTrack(
                          segment,
                          'Join the Discord clicked',
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
                    {
                      backgroundColor: theme.colors.background,
                      borderRadius: 8,
                      color: theme.colors.backgroundInverseMainFont,
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 10,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Join the Discord'}
                  icon={'MaterialCommunityIcons/discord'}
                />
              </View>
            </View>
          </View>

          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            {/* Sign Out */}
            <Button
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: 'toggleMenuModal',
                    value: false,
                  });
                  setGlobalVariableValue({
                    key: 'toggleSignOutActionSheet',
                    value: true,
                  });
                  segmentLogTrack(
                    segment,
                    'Opened Sign Out action sheet',
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
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors.divider,
                  borderRadius: 8,
                  color: theme.colors.backgroundInverseMainFont,
                  fontFamily: 'System',
                  fontSize: 16,
                  fontWeight: '700',
                  textAlign: 'center',
                },
                dimensions.width
              )}
              title={'Sign Out'}
            />
          </View>
        </View>
      </Modal>
      {/* Action Sheet - Sign Out */}
      <ActionSheet visible={Constants['toggleSignOutActionSheet']}>
        {/* Action Sheet Item - Sign Out */}
        <ActionSheetItem
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'toggleSignOutActionSheet',
                value: false,
              });
              setGlobalVariableValue({
                key: 'authToken',
                value: '',
              });
              navigation.navigate('Welcome_Stack', {
                screen: 'Welcome1Screen',
              });
              segmentLogTrack(
                segment,
                'User signed out',
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
          style={StyleSheet.applyWidth(
            {
              fontFamily: 'System',
              fontSize: 18,
              fontWeight: '400',
              opacity: 1,
              textAlign: 'center',
            },
            dimensions.width
          )}
          label={'Sign Out'}
          color={theme.colors.strong}
        />
        <ActionSheetCancel
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'toggleSignOutActionSheet',
                value: false,
              });
              setGlobalVariableValue({
                key: 'toggleMenuModal',
                value: true,
              });
              segmentLogTrack(
                segment,
                'Sign Out action sheet canceled',
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
          style={StyleSheet.applyWidth(
            {
              fontFamily: 'System',
              fontSize: 18,
              fontWeight: '700',
              opacity: 1,
            },
            dimensions.width
          )}
          label={'Cancel'}
        />
      </ActionSheet>
      {/* Money Tutorial Modal */}
      <Modal
        visible={Constants['moneyScreenTutorial']}
        animationType={'slide'}
        transparent={true}
        presentationStyle={'pageSheet'}
      >
        <View
          style={StyleSheet.applyWidth({ height: '50%' }, dimensions.width)}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: '50%',
              justifyContent: 'space-between',
              paddingBottom: 50,
              paddingLeft: 28,
              paddingRight: 28,
              paddingTop: 16,
            },
            dimensions.width
          )}
        >
          <View>
            {/* Money Tutorial 1 */}
            <>
              {!tutorialScreenCounter1(Constants['moneyTutorial']) ? null : (
                <View>
                  {/* Image */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <Image
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'],
                          { height: 100, width: 325 }
                        ),
                        dimensions.width
                      )}
                      resizeMode={'cover'}
                      source={Images.TutorialPicturesSync}
                    />
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { marginTop: 28 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontFamily: 'System',
                            fontSize: 20,
                            fontWeight: '700',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Sync your sportsbooks'}
                    </Text>
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { marginTop: 18 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontSize: 18,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {
                        'Click the + button to sync your sportsbooks for your bets to appear in Vault.'
                      }
                    </Text>
                  </View>
                </View>
              )}
            </>
            {/* Money Tutorial 2 */}
            <>
              {!tutorialScreenCounter2(Constants['moneyTutorial']) ? null : (
                <View>
                  {/* Image */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <Image
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'],
                          { height: 100, width: 325 }
                        ),
                        dimensions.width
                      )}
                      resizeMode={'cover'}
                      source={Images.TutorialPicturesBankrolls}
                    />
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { marginTop: 28 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontFamily: 'System',
                            fontSize: 20,
                            fontWeight: '700',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'View your bankrolls'}
                    </Text>
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { marginTop: 18 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontSize: 18,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'See all your sportsbook bankrolls in one place.'}
                    </Text>
                  </View>
                </View>
              )}
            </>
          </View>

          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 35, paddingRight: 35 },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
                dimensions.width
              )}
            >
              {/* Icon_Gold */}
              <>
                {!tutorialScreenCounter1(Constants['moneyTutorial']) ? null : (
                  <Icon
                    style={StyleSheet.applyWidth(
                      { marginLeft: 2, marginRight: 2 },
                      dimensions.width
                    )}
                    name={'MaterialIcons/circle'}
                    color={theme.colors['Primary']}
                    size={10}
                  />
                )}
              </>
              {/* Icon_Gray */}
              <Icon
                style={StyleSheet.applyWidth(
                  { marginLeft: 2, marginRight: 2 },
                  dimensions.width
                )}
                name={'MaterialIcons/circle'}
                size={10}
                color={theme.colors['Light_low_importance_text']}
              />
              {/* Icon_Gold */}
              <>
                {!tutorialScreenCounter2(Constants['moneyTutorial']) ? null : (
                  <Icon
                    style={StyleSheet.applyWidth(
                      { marginLeft: 2, marginRight: 2 },
                      dimensions.width
                    )}
                    name={'MaterialIcons/circle'}
                    color={theme.colors['Primary']}
                    size={10}
                  />
                )}
              </>
            </View>

            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'space-between' },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { width: '45%' },
                  dimensions.width
                )}
              >
                {/* Back */}
                <Button
                  onPress={() => {
                    try {
                      if (tutorialScreenCounter1(Constants['moneyTutorial'])) {
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
                style={StyleSheet.applyWidth(
                  { width: '45%' },
                  dimensions.width
                )}
              >
                {/* Next */}
                <>
                  {!tutorialScreenCounter1(
                    Constants['moneyTutorial']
                  ) ? null : (
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
                  {!tutorialScreenCounter2(
                    Constants['moneyTutorial']
                  ) ? null : (
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
                          segmentLogTrack(
                            segment,
                            'Money Screen Tutorial Completed',
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
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(BankrollNetProfitScreen);
