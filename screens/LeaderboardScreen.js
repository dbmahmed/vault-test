import React from 'react';
import * as CustomCode from '../CustomCode';
import * as SwaggerAPIApi from '../apis/SwaggerAPIApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
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
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Vibration,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const LeaderboardScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const orderBooks = balance => {
    balance.sort((a, b) => (a.balance < b.balance ? 1 : -1));
    return balance;
  };

  const bookStatus = latestRefreshResponse => {
    return latestRefreshResponse == 403 || latestRefreshResponse == 500;
  };

  const valueNegative = x => {
    return Number(x) < 0;
  };

  const valueNeutral = x => {
    return Number(x) == 0;
  };

  const firstCharacter = x => {
    return x == null ? '' : x.charAt(0);
  };

  const userSelectedSportsbook = accountId => {
    return Constants.selectedSportsbook == accountId;
  };

  const addOne = data => {
    let x = data + 1;
    console.log('x:' + x);
    return x;
  };

  const balanceSyntax = x => {
    //return "$" + ((balance/100).toFixed(2));

    return x < 0
      ? '-$' + Math.abs(x / 100).toFixed(2)
      : '$' + Math.abs(x / 100).toFixed(2);
  };

  const checkEarlyAccessCode = x => {
    return x !== 'V7XyG' ? true : false;
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

  const aggregateCompare = x => {
    return x == 'Aggregate';
  };

  const newBookSynced = book => {
    return book.length === 0;

    //Set variable
    //Need to make this so it's true if an additional book is added!
  };

  const promptResyncBook = x => {
    const t1 = new Date(x.betRefreshRequested).getTime();
    const t2 = new Date().getTime();
    const diffSec = (t2 - t1) / 1000;

    return diffSec / (3600 * 24) >= 2 ||
      x.latestRefreshResponse.status == 401 ||
      x.latestRefreshResponse.status == 403 ||
      x.latestRefreshResponse.status == 500
      ? true
      : false;
  };

  const scrollToTop = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.
    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    // find info here: https://spin.atomicobject.com/2021/04/20/react-native-building-scroll-top-button/
  };

  const valuePositive = x => {
    return Number(x) > 0;
  };

  const vibrateOnPress = () => {
    Vibration.vibrate(1200, false);
  };

  const bookRegionSyntax = abbr => {
    return abbr == null ? '' : ' (' + abbr.toUpperCase() + ')';
  };

  const goToTop = () => {
    /*goToTop = () => {
this.scroll.scrollTo({x: 0, y: 0, animated: true});
}*/

    const ref = React.useRef(null);
    useScrollToTop(ref);
  };

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const [dummy, setDummy] = React.useState(0);
  const [removeBookId, setRemoveBookId] = React.useState('');
  const [removeBookName, setRemoveBookName] = React.useState('');
  const [removeBookRegionAbbr, setRemoveBookRegionAbbr] = React.useState('');
  const [sportsbooksSynced, setSportsbooksSynced] = React.useState(false);
  const [testValue, setTestValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors.divider },
        dimensions.width
      )}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
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
            ></View>
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
              <Touchable>
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
                  {/* Add Friends */}
                  <Icon
                    size={28}
                    name={'Ionicons/ios-person-add'}
                    color={theme.colors.lightLowImportanceText}
                  />
                </View>
              </Touchable>
            </View>
          </View>
        </View>
      </Surface>

      <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
        {/* Top Three View */}
        <View>
          <Surface
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors.background,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                bottom: 90,
                paddingBottom: 16,
                paddingTop: 100,
              },
              dimensions.width
            )}
            elevation={3}
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
                },
                dimensions.width
              )}
            >
              {'Weekly Leaderboard'}
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  paddingBottom: 24,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 18,
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { marginRight: 20 },
                  dimensions.width
                )}
              >
                {/* Friends */}
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
                  {'Friends'}
                </Text>
              </View>

              <Touchable>
                {/* Everyone */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.divider,
                      fontFamily: 'System',
                      fontSize: 20,
                      fontWeight: '700',
                    },
                    dimensions.width
                  )}
                >
                  {'Everyone'}
                </Text>
              </Touchable>
            </View>

            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 16,
                  paddingRight: 16,
                },
                dimensions.width
              )}
            >
              {/* Second Place */}
              <View>
                <Touchable>
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    {/* Place */}
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {'2'}
                    </Text>
                    <Icon
                      name={'FontAwesome/caret-up'}
                      size={16}
                      color={theme.colors.good}
                    />
                    <View
                      style={StyleSheet.applyWidth(
                        { marginBottom: 12, marginTop: 6 },
                        dimensions.width
                      )}
                    >
                      {/* Profile Picture */}
                      <CircleImage
                        source={{
                          uri: 'https://static.draftbit.com/images/placeholder-image.png',
                        }}
                        size={85}
                      />
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center' },
                        dimensions.width
                      )}
                    >
                      {/* First Name */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.backgroundInverseMainFont,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '300',
                          },
                          dimensions.width
                        )}
                      >
                        {'Caleb'}
                      </Text>
                      {/* Last Name */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.backgroundInverseMainFont,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '300',
                          },
                          dimensions.width
                        )}
                      >
                        {'Dykema'}
                      </Text>
                      {/* Units */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.good,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '700',
                          },
                          dimensions.width
                        )}
                      >
                        {'+5.6U'}
                      </Text>
                      {/* ROI */}
                      <Text
                        style={StyleSheet.applyWidth(
                          { color: theme.colors.good, fontSize: 12 },
                          dimensions.width
                        )}
                      >
                        {'12.2% ROI'}
                      </Text>
                    </View>
                  </View>
                </Touchable>
              </View>
              {/* First Place */}
              <View>
                <Touchable>
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <Icon
                      name={'MaterialCommunityIcons/crown'}
                      color={theme.colors.primary}
                      size={20}
                    />
                    <View
                      style={StyleSheet.applyWidth(
                        { marginBottom: 12, marginTop: 6 },
                        dimensions.width
                      )}
                    >
                      {/* Profile Picture */}
                      <CircleImage
                        source={{
                          uri: 'https://static.draftbit.com/images/placeholder-image.png',
                        }}
                        size={110}
                      />
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center' },
                        dimensions.width
                      )}
                    >
                      {/* First Name */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.backgroundInverseMainFont,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '300',
                          },
                          dimensions.width
                        )}
                      >
                        {'Caleb'}
                      </Text>
                      {/* Last Name */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.backgroundInverseMainFont,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '300',
                          },
                          dimensions.width
                        )}
                      >
                        {'Dykema'}
                      </Text>
                      {/* Units */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.good,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '700',
                          },
                          dimensions.width
                        )}
                      >
                        {'+5.6U'}
                      </Text>
                      {/* ROI */}
                      <Text
                        style={StyleSheet.applyWidth(
                          { color: theme.colors.good, fontSize: 12 },
                          dimensions.width
                        )}
                      >
                        {'12.2% ROI'}
                      </Text>
                    </View>
                  </View>
                </Touchable>
              </View>
              {/* Third Place */}
              <View>
                <Touchable>
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    {/* Place */}
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {'3'}
                    </Text>
                    <Icon
                      size={16}
                      name={'FontAwesome/caret-down'}
                      color={theme.colors.badErrorCancel}
                    />
                    <View
                      style={StyleSheet.applyWidth(
                        { marginBottom: 12, marginTop: 6 },
                        dimensions.width
                      )}
                    >
                      {/* Profile Picture */}
                      <CircleImage
                        source={{
                          uri: 'https://static.draftbit.com/images/placeholder-image.png',
                        }}
                        size={85}
                      />
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center' },
                        dimensions.width
                      )}
                    >
                      {/* First Name */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.backgroundInverseMainFont,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '300',
                          },
                          dimensions.width
                        )}
                      >
                        {'Caleb'}
                      </Text>
                      {/* Last Name */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.backgroundInverseMainFont,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '300',
                          },
                          dimensions.width
                        )}
                      >
                        {'Dykema'}
                      </Text>
                      {/* Units */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.good,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '700',
                          },
                          dimensions.width
                        )}
                      >
                        {'+5.6U'}
                      </Text>
                      {/* ROI */}
                      <Text
                        style={StyleSheet.applyWidth(
                          { color: theme.colors.good, fontSize: 12 },
                          dimensions.width
                        )}
                      >
                        {'12.2% ROI'}
                      </Text>
                    </View>
                  </View>
                </Touchable>
              </View>
            </View>
          </Surface>
        </View>
        {/* Friends View */}
        <View
          style={StyleSheet.applyWidth(
            { bottom: 90, paddingTop: 28 },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 16, paddingRight: 16 },
              dimensions.width
            )}
          >
            {/* Friends Touchable */}
            <Touchable
              style={StyleSheet.applyWidth(
                { marginBottom: 6 },
                dimensions.width
              )}
            >
              <Surface
                style={StyleSheet.applyWidth(
                  { backgroundColor: theme.colors.background, borderRadius: 8 },
                  dimensions.width
                )}
                elevation={1}
              >
                {/* Friends Block */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 6,
                      paddingLeft: 12,
                      paddingRight: 12,
                      paddingTop: 6,
                    },
                    dimensions.width
                  )}
                >
                  {/* Left Align View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: '70%',
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', marginRight: 10 },
                        dimensions.width
                      )}
                    >
                      {/* Place */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.backgroundInverseMainFont,
                            fontFamily: 'System',
                            fontSize: 14,
                            fontWeight: '700',
                          },
                          dimensions.width
                        )}
                      >
                        {'4'}
                      </Text>
                      <Icon
                        name={'FontAwesome/caret-up'}
                        size={16}
                        color={theme.colors.good}
                      />
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        { marginRight: 10 },
                        dimensions.width
                      )}
                    >
                      {/* Profile Picture */}
                      <CircleImage
                        source={{
                          uri: 'https://static.draftbit.com/images/placeholder-image.png',
                        }}
                        size={55}
                      />
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1 },
                        dimensions.width
                      )}
                    >
                      {/* Full Name */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.backgroundInverseMainFont,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '300',
                          },
                          dimensions.width
                        )}
                        ellipsizeMode={'tail'}
                        numberOfLines={2}
                      >
                        {'Caleb Dykema'}
                      </Text>
                    </View>
                  </View>
                  {/* Right Align View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        width: '30%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Units */}
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.good,
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '700',
                          textAlign: 'right',
                        },
                        dimensions.width
                      )}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                    >
                      {'+5.8U'}
                    </Text>
                    {/* ROI */}
                    <Text
                      style={StyleSheet.applyWidth(
                        { color: theme.colors.good, fontSize: 12 },
                        dimensions.width
                      )}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                    >
                      {'13.1% ROI'}
                    </Text>
                  </View>
                </View>
              </Surface>
            </Touchable>
            {/* Your Current Rank Touchable */}
            <Touchable
              style={StyleSheet.applyWidth(
                { marginBottom: 6 },
                dimensions.width
              )}
            >
              <Surface
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.background,
                    borderBottomWidth: 1,
                    borderColor: theme.colors.primary,
                    borderLeftWidth: 1,
                    borderRadius: 8,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                  },
                  dimensions.width
                )}
                elevation={1}
              >
                {/* Friends Block */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 6,
                      paddingLeft: 12,
                      paddingRight: 12,
                      paddingTop: 6,
                    },
                    dimensions.width
                  )}
                >
                  {/* Left Align View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: '70%',
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', marginRight: 10 },
                        dimensions.width
                      )}
                    >
                      {/* Place */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.backgroundInverseMainFont,
                            fontFamily: 'System',
                            fontSize: 14,
                            fontWeight: '700',
                          },
                          dimensions.width
                        )}
                      >
                        {'4'}
                      </Text>
                      <Icon
                        name={'FontAwesome/caret-up'}
                        size={16}
                        color={theme.colors.good}
                      />
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1, height: 55, justifyContent: 'center' },
                        dimensions.width
                      )}
                    >
                      {/* Full Name */}
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.backgroundInverseMainFont,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '300',
                          },
                          dimensions.width
                        )}
                        ellipsizeMode={'tail'}
                        numberOfLines={2}
                      >
                        {'Your current rank'}
                      </Text>
                    </View>
                  </View>
                  {/* Right Align View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        width: '30%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Units */}
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.good,
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '700',
                          textAlign: 'right',
                        },
                        dimensions.width
                      )}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                    >
                      {'+5.8U'}
                    </Text>
                    {/* ROI */}
                    <Text
                      style={StyleSheet.applyWidth(
                        { color: theme.colors.good, fontSize: 12 },
                        dimensions.width
                      )}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                    >
                      {'13.1% ROI'}
                    </Text>
                  </View>
                </View>
              </Surface>
            </Touchable>
          </View>
        </View>
      </ScrollView>
      {/* Sign Out Modal */}
      <Modal
        visible={Constants['toggleSignOutModal']}
        animationType={'slide'}
        transparent={true}
        presentationStyle={'pageSheet'}
      >
        <Touchable
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'toggleSignOutModal',
                value: false,
              });
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ height: '80%' }, dimensions.width)}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background,
              borderRadius: 0,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '20%',
              justifyContent: 'space-between',
            },
            dimensions.width
          )}
        >
          <View>
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
              >
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'toggleSignOutModal',
                        value: false,
                      });
                      setGlobalVariableValue({
                        key: 'toggleMenuModal',
                        value: true,
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
                      },
                      dimensions.width
                    )}
                  >
                    <Icon
                      name={'Ionicons/ios-chevron-back'}
                      size={32}
                      color={theme.colors.backgroundInverseMainFont}
                    />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontSize: 18,
                          fontWeight: '400',
                        },
                        dimensions.width
                      )}
                    >
                      {'Cancel'}
                    </Text>
                  </View>
                </Touchable>
              </View>
              {/* Text View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 50,
                    justifyContent: 'center',
                    width: '50%',
                  },
                  dimensions.width
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.backgroundInverseMainFont,
                      fontFamily: 'System',
                      fontSize: 18,
                      fontWeight: '700',
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                >
                  {'Are you sure?'}
                </Text>
              </View>
              {/* Right View */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '25%' },
                  dimensions.width
                )}
              />
            </View>

            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', justifyContent: 'flex-end' },
                dimensions.width
              )}
            >
              {/* Sign Out */}
              <Button
                onPress={() => {
                  try {
                    setGlobalVariableValue({
                      key: 'toggleSignOutModal',
                      value: false,
                    });
                    setGlobalVariableValue({
                      key: 'authToken',
                      value: '',
                    });
                    navigation.navigate('Welcome_Stack', {
                      screen: 'Welcome1Screen',
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.background,
                    borderRadius: 8,
                    color: theme.colors.lightLowImportanceText,
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
        </View>
      </Modal>
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
                            {/* Default Profile Picture */}
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
                                        theme.colors.backgroundInverseMainFont,
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
                  icon={'MaterialCommunityIcons/plus-minus-variant'}
                />
                {/* Join the Discord */}
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await WebBrowser.openBrowserAsync(
                          'https://discord.gg/6bGRD7BpUD'
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
                    key: 'toggleSignOutModal',
                    value: true,
                  });
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
    </ScreenContainer>
  );
};

export default withTheme(LeaderboardScreen);
