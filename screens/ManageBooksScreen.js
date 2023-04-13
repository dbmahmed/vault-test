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
  ActionSheet,
  ActionSheetCancel,
  ActionSheetItem,
  Button,
  Icon,
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const ManageBooksScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const booksSynced = book => {
    return book.length === 0;
  };

  const checkSportsbooksSynced = sportsbooks => {
    Constants.sportsbooksSynced = sportsbooks.length == 0 ? false : true;

    setSportsbooksSynced(Constants.sportsbooksSynced);

    return sportsbooks;
  };

  const bookStatus = x => {
    //return x == 403 || x ==  500;

    const t1 = new Date(x.betRefreshRequested).getTime();
    const t2 = new Date().getTime();
    const diffSec = (t2 - t1) / 1000;

    /*return ((diffSec / (3600 * 24)) >= 2)
|| x.latestRefreshResponse.status == 401
|| x.latestRefreshResponse.status == 403
|| x.latestRefreshResponse.status == 500 ? true : false;
*/

    if (
      x.latestRefreshResponse == null ||
      x.latestRefreshResponse.status == null
    ) {
      return false;
    } else if (
      diffSec / (3600 * 24) >= 2 ||
      x.latestRefreshResponse.status == 401 ||
      x.latestRefreshResponse.status == 403 ||
      x.latestRefreshResponse.status == 500
    ) {
      return true;
    } else {
      return false;
    }
  };

  const bookRegionSyntax = abbr => {
    return ' (' + abbr.toUpperCase() + ')';
  };

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const swaggerAPIDeleteBookByIdGET = SwaggerAPIApi.useDeleteBookByIdGET();
  const swaggerAPIUpdateBetslipsByBettorIdGET =
    SwaggerAPIApi.useUpdateBetslipsByBettorIdGET();
  const swaggerAPIUpdatePushNotificationTokenGET =
    SwaggerAPIApi.useUpdatePushNotificationTokenGET();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      segmentLogScreen(segment, 'Manage Books');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [removeBookId, setRemoveBookId] = React.useState('');
  const [sportsbooksSynced, setSportsbooksSynced] = React.useState(false);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { justifyContent: 'space-between' },
        dimensions.width
      )}
      scrollable={true}
      hasSafeArea={true}
    >
      {/* Top Bar */}
      <View>
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
                    segmentLogTrack(
                      segment,
                      'Back Button',
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
                {/* View 5 */}
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
            ></View>
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
                  try {
                    setGlobalVariableValue({
                      key: 'toggleSportsbookSyncInfoModal',
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
                    size={28}
                    color={theme.colors.lightLowImportanceText}
                    name={'Ionicons/ios-information-circle'}
                  />
                </View>
              </Touchable>
            </View>
          </View>
        </View>

        <SwaggerAPIApi.FetchGetAllBettorAccountsKate$sGET
          internalId={Constants['internalId']}
        >
          {({ loading, error, data, refetchGetAllBettorAccountsKate$s }) => {
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
                <View>
                  <View
                    style={StyleSheet.applyWidth(
                      { paddingLeft: '4%', paddingRight: '4%', paddingTop: 10 },
                      dimensions.width
                    )}
                  >
                    {/* Synced */}
                    <>
                      {booksSynced(fetchData) ? null : (
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.backgroundInverseMainFont,
                              fontFamily: 'System',
                              fontSize: 28,
                              fontWeight: '700',
                              textAlign: 'left',
                            },
                            dimensions.width
                          )}
                        >
                          {'These are the books you have synced'}
                        </Text>
                      )}
                    </>
                    {/* Not Synced */}
                    <>
                      {!booksSynced(fetchData) ? null : (
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.backgroundInverseMainFont,
                              fontFamily: 'System',
                              fontSize: 28,
                              fontWeight: '700',
                              textAlign: 'left',
                            },
                            dimensions.width
                          )}
                        >
                          {'Sync your first sportsbook'}
                        </Text>
                      )}
                    </>
                    {/* Not Synced */}
                    <>
                      {!booksSynced(fetchData) ? null : (
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.backgroundInverseMainFont,
                              fontFamily: 'System',
                              fontSize: 20,
                              fontWeight: '700',
                              marginTop: 48,
                              textAlign: 'left',
                            },
                            dimensions.width
                          )}
                        >
                          {
                            'Vault uses sportsbook sync technology to securely track your bets for you.'
                          }
                        </Text>
                      )}
                    </>
                    {/* Not Synced */}
                    <>
                      {!booksSynced(fetchData) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignContent: 'center',
                              alignItems: 'center',
                              height: 200,
                              justifyContent: 'center',
                              marginTop: 18,
                            },
                            dimensions.width
                          )}
                        >
                          <Image
                            style={StyleSheet.applyWidth(
                              { height: 200, width: '100%' },
                              dimensions.width
                            )}
                            resizeMode={'contain'}
                            source={Images.SecureLinkToBooks}
                          />
                        </View>
                      )}
                    </>
                    <>
                      {!booksSynced(fetchData) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'center', marginTop: 10 },
                            dimensions.width
                          )}
                        >
                          <Button
                            onPress={() => {
                              try {
                                setGlobalVariableValue({
                                  key: 'toggleSportsbookSyncInfoModal',
                                  value: true,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors['Background'],
                                borderRadius: 8,
                                fontFamily: 'System',
                                fontWeight: '700',
                                textAlign: 'center',
                                textDecorationLine: 'underline',
                              },
                              dimensions.width
                            )}
                            title={'Learn more'}
                          />
                        </View>
                      )}
                    </>
                  </View>
                </View>
                <FlatList
                  data={checkSportsbooksSynced(fetchData)}
                  listKey={'ICWiDCNP'}
                  keyExtractor={listData =>
                    listData?.id || listData?.uuid || JSON.stringify(listData)
                  }
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            marginBottom: 6,
                            marginLeft: '4%',
                            marginRight: '4%',
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 14,
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
                            <View
                              style={StyleSheet.applyWidth(
                                { marginRight: 8 },
                                dimensions.width
                              )}
                            >
                              <>
                                {bookStatus(listData) ? null : (
                                  <Icon
                                    color={theme.colors.good}
                                    name={'Ionicons/ios-checkmark-circle-sharp'}
                                    size={24}
                                  />
                                )}
                              </>
                              <>
                                {!bookStatus(listData) ? null : (
                                  <Icon
                                    name={'Ionicons/ios-close-circle-sharp'}
                                    size={24}
                                    color={theme.colors.lightLowImportanceText}
                                  />
                                )}
                              </>
                            </View>

                            <View>
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors.backgroundInverseMainFont,
                                    fontFamily: 'System',
                                    fontSize: 20,
                                    fontWeight: '700',
                                  },
                                  dimensions.width
                                )}
                              >
                                {listData?.book?.name}
                              </Text>
                              <>
                                {!bookStatus(listData) ? null : (
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          theme.colors.lightLowImportanceText,
                                        fontFamily: 'System',
                                        fontSize: 12,
                                        fontWeight: '400',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'Error connecting this book.'}
                                  </Text>
                                )}
                              </>
                            </View>
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
                            <>
                              {!bookStatus(listData) ? null : (
                                <Touchable
                                  onPress={() => {
                                    try {
                                      navigation.navigate(
                                        'SharpSportsFormScreen'
                                      );
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
                                  <View>
                                    {/* Retry */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color:
                                            theme.colors.lightLowImportanceText,
                                          fontFamily: 'System',
                                          fontWeight: '400',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'Retry'}
                                    </Text>
                                  </View>
                                </Touchable>
                              )}
                            </>
                            <Touchable
                              onPress={() => {
                                try {
                                  setRemoveBookId(listData?.id);
                                  setGlobalVariableValue({
                                    key: 'toggleRemoveSportsbookActionSheet',
                                    value: true,
                                  });
                                  segmentLogTrack(
                                    segment,
                                    'Open remove book action sheet',
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
                                { marginLeft: 20 },
                                dimensions.width
                              )}
                            >
                              <View>
                                {/* Remove */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    { color: theme.colors.badErrorCancel },
                                    dimensions.width
                                  )}
                                >
                                  {'Remove'}
                                </Text>
                              </View>
                            </Touchable>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  contentContainerStyle={StyleSheet.applyWidth(
                    { flex: 1, marginTop: 48 },
                    dimensions.width
                  )}
                  numColumns={1}
                />
              </>
            );
          }}
        </SwaggerAPIApi.FetchGetAllBettorAccountsKate$sGET>
      </View>
      {/* All Else */}
      <View>
        <SwaggerAPIApi.FetchGetAllBettorAccountsKate$sGET
          internalId={Constants['internalId']}
        >
          {({ loading, error, data, refetchGetAllBettorAccountsKate$s }) => {
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
              <View
                style={StyleSheet.applyWidth(
                  {
                    borderColor: theme.colors.divider,
                    borderTopWidth: 1,
                    justifyContent: 'center',
                    paddingBottom: 34,
                    paddingTop: 16,
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { paddingLeft: 34, paddingRight: 34, width: '100%' },
                      dimensions.width
                    )}
                  >
                    {/* Go To My Vault Button */}
                    <>
                      {booksSynced(fetchData) ? null : (
                        <Button
                          onPress={() => {
                            try {
                              navigation.navigate('MainTabNavigator');
                              segmentLogTrack(
                                segment,
                                'Navigate to main tabs',
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
                              backgroundColor: theme.colors.primary,
                              borderRadius: 8,
                              borderWidth: 1,
                              color: theme.colors.strongTextOnGoldButtons,
                              fontFamily: 'System',
                              fontSize: 16,
                              fontWeight: '700',
                              height: 54,
                              textAlign: 'center',
                            },
                            dimensions.width
                          )}
                          title={'Go To My Vault'}
                        >
                          {'Log In'}
                        </Button>
                      )}
                    </>
                    {/* Sync A Sportsbook Button */}
                    <>
                      {!booksSynced(fetchData) ? null : (
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
                              backgroundColor: theme.colors.primary,
                              borderRadius: 8,
                              borderWidth: 1,
                              color: theme.colors.strongTextOnGoldButtons,
                              fontFamily: 'System',
                              fontSize: 16,
                              fontWeight: '700',
                              height: 54,
                              textAlign: 'center',
                            },
                            dimensions.width
                          )}
                          title={'Sync A Sportsbook'}
                        >
                          {'Log In'}
                        </Button>
                      )}
                    </>
                    {/* Synced */}
                    <>
                      {booksSynced(fetchData) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              marginTop: 24,
                            },
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
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                height: '100%',
                                justifyContent: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.lightLowImportanceText,
                                  fontFamily: 'System',
                                  fontWeight: '700',
                                },
                                dimensions.width
                              )}
                            >
                              {'Sync another sportsbook'}
                            </Text>
                          </Touchable>
                        </View>
                      )}
                    </>
                    {/* Not Synced */}
                    <>
                      {!booksSynced(fetchData) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              marginTop: 24,
                            },
                            dimensions.width
                          )}
                        >
                          <Touchable
                            onPress={() => {
                              try {
                                navigation.navigate('MainTabNavigator');
                                segmentLogTrack(
                                  segment,
                                  'Navigate to main tabs',
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
                                alignItems: 'center',
                                height: '100%',
                                justifyContent: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.lightLowImportanceText,
                                  fontFamily: 'System',
                                  fontWeight: '700',
                                },
                                dimensions.width
                              )}
                            >
                              {'Skip this for now'}
                            </Text>
                          </Touchable>
                        </View>
                      )}
                    </>
                  </View>
                </View>
              </View>
            );
          }}
        </SwaggerAPIApi.FetchGetAllBettorAccountsKate$sGET>
      </View>
      {/* Action Sheet - Remove Book */}
      <ActionSheet visible={Constants['toggleRemoveSportsbookActionSheet']}>
        {/* Action Sheet Item - Remove Book */}
        <ActionSheetItem
          onPress={() => {
            const handler = async () => {
              try {
                await swaggerAPIDeleteBookByIdGET.mutateAsync({
                  bookId: removeBookId,
                });
                await swaggerAPIUpdateBetslipsByBettorIdGET.mutateAsync({
                  id: Constants['internalId'],
                });
                await SwaggerAPIApi.cacheUserBetsGET(Constants, {
                  internalId: Constants['internalId'],
                });
                setGlobalVariableValue({
                  key: 'toggleRemoveSportsbookActionSheet',
                  value: false,
                });
                Utils.showAlert({
                  title: 'Notice',
                  message:
                    'Your sportsbook has been removed but it may take up to 12 hours for these changes to show in your Vault',
                  buttonText: '',
                });
                segmentLogTrack(
                  segment,
                  'Sportsbook removed',
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
                  removeBookId,
                  undefined
                );
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={StyleSheet.applyWidth(
            { fontSize: 18, textAlign: 'center' },
            dimensions.width
          )}
          label={'Remove Sportsbook'}
        />
        <ActionSheetCancel
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'toggleRemoveSportsbookActionSheet',
                value: false,
              });
              segmentLogTrack(
                segment,
                'Close remove sportsbook action sheet',
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
            { fontFamily: 'System', fontSize: 18, fontWeight: '700' },
            dimensions.width
          )}
          label={'Cancel'}
        />
      </ActionSheet>
      {/* Sportsbook Sync Info Modal */}
      <Modal
        style={StyleSheet.applyWidth(
          { backgroundColor: theme.colors.background },
          dimensions.width
        )}
        visible={Constants['toggleSportsbookSyncInfoModal']}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              overflow: 'hidden',
            },
            dimensions.width
          )}
        >
          {/* Top Bar */}
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
                  alignItems: 'flex-start',
                  borderRadius: 0,
                  justifyContent: 'center',
                  width: '33%',
                },
                dimensions.width
              )}
            />
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
            />
            {/* Right Button */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-end',
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
                      key: 'toggleSportsbookSyncInfoModal',
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
                      alignItems: 'flex-end',
                      height: 50,
                      justifyContent: 'center',
                      paddingLeft: 16,
                      paddingRight: 16,
                    },
                    dimensions.width
                  )}
                >
                  {/* Close */}
                  <Icon
                    size={28}
                    color={theme.colors.lightLowImportanceText}
                    name={'Ionicons/ios-close'}
                  />
                </View>
              </Touchable>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={true} bounces={true}>
            <View
              style={StyleSheet.applyWidth(
                { paddingBottom: 28, paddingTop: 10 },
                dimensions.width
              )}
            >
              {/* Title */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', paddingLeft: 16, paddingRight: 16 },
                  dimensions.width
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Background Inverse (Main Font)'],
                      fontFamily: 'System',
                      fontSize: 28,
                      fontWeight: '700',
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                >
                  {'Sportsbook Syncing'}
                </Text>
              </View>
              {/* Security */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 32,
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  style={StyleSheet.applyWidth(
                    { marginRight: 12 },
                    dimensions.width
                  )}
                  name={'Ionicons/ios-lock-closed'}
                  color={theme.colors['Primary']}
                  size={40}
                />
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 1, flexWrap: 'nowrap' },
                    dimensions.width
                  )}
                >
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Background Inverse (Main Font)'],
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '700',
                        marginBottom: 3,
                      },
                      dimensions.width
                    )}
                  >
                    {'Private and Secure'}
                  </Text>

                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Light_low_importance_text'],
                        fontSize: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {
                      'Vault does not have access to your sportsbook login credentials and cannot deposit or withdraw funds. You can remove a book at any time.'
                    }
                  </Text>
                </View>
              </View>
              {/* Data Storage */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 28,
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  style={StyleSheet.applyWidth(
                    { marginRight: 12 },
                    dimensions.width
                  )}
                  color={theme.colors['Primary']}
                  size={40}
                  name={'Ionicons/ios-cloud'}
                />
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 1, flexWrap: 'nowrap' },
                    dimensions.width
                  )}
                >
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Background Inverse (Main Font)'],
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '700',
                        marginBottom: 3,
                      },
                      dimensions.width
                    )}
                  >
                    {'Data Storage'}
                  </Text>

                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Light_low_importance_text'],
                        fontSize: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {
                      'Sportsbooks store 6-12 months of historical bets. Vault stores up to 5000 of the most recent bets for each sportsbook.'
                    }
                  </Text>
                </View>
              </View>
              {/* Troubleshooting */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 28,
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  style={StyleSheet.applyWidth(
                    { marginRight: 12 },
                    dimensions.width
                  )}
                  color={theme.colors['Primary']}
                  size={40}
                  name={'Ionicons/ios-construct'}
                />
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 1, flexWrap: 'nowrap' },
                    dimensions.width
                  )}
                >
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors['Background Inverse (Main Font)'],
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '700',
                        marginBottom: 3,
                      },
                      dimensions.width
                    )}
                  >
                    {'Troubleshooting'}
                  </Text>
                  {/* Book won't sync */}
                  <View
                    style={StyleSheet.applyWidth(
                      { marginBottom: 10 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Light_low_importance_text'],
                          fontSize: 16,
                          marginBottom: 3,
                        },
                        dimensions.width
                      )}
                    >
                      {"My book isn't syncing"}
                    </Text>

                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingLeft: 15,
                        },
                        dimensions.width
                      )}
                    >
                      <Icon
                        size={12}
                        name={'Entypo/dot-single'}
                        color={theme.colors['Light_low_importance_text']}
                      />
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Light_low_importance_text'],
                            fontSize: 12,
                          },
                          dimensions.width
                        )}
                      >
                        {'Log into your sportsbook app to reauthenticate'}
                      </Text>
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingLeft: 15,
                        },
                        dimensions.width
                      )}
                    >
                      <Icon
                        size={12}
                        name={'Entypo/dot-single'}
                        color={theme.colors['Light_low_importance_text']}
                      />
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Light_low_importance_text'],
                            fontSize: 12,
                          },
                          dimensions.width
                        )}
                      >
                        {
                          'Be sure your account is verified on your sportsbook app'
                        }
                      </Text>
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingLeft: 15,
                        },
                        dimensions.width
                      )}
                    >
                      <Icon
                        size={12}
                        name={'Entypo/dot-single'}
                        color={theme.colors['Light_low_importance_text']}
                      />
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Light_low_importance_text'],
                            fontSize: 12,
                          },
                          dimensions.width
                        )}
                      >
                        {'Try syncing the book again'}
                      </Text>
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingLeft: 15,
                        },
                        dimensions.width
                      )}
                    >
                      <Icon
                        size={12}
                        name={'Entypo/dot-single'}
                        color={theme.colors['Light_low_importance_text']}
                      />
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Light_low_importance_text'],
                            fontSize: 12,
                          },
                          dimensions.width
                        )}
                      >
                        {
                          'The book may be down for maintenance - try again later'
                        }
                      </Text>
                    </View>
                  </View>
                  {/* Emails from sportsbook */}
                  <View
                    style={StyleSheet.applyWidth(
                      { marginBottom: 10 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Light_low_importance_text'],
                          fontSize: 16,
                          marginBottom: 3,
                        },
                        dimensions.width
                      )}
                    >
                      {"I'm getting login emails from my sportsbook"}
                    </Text>

                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingLeft: 15,
                        },
                        dimensions.width
                      )}
                    >
                      <Icon
                        size={12}
                        name={'Entypo/dot-single'}
                        color={theme.colors['Light_low_importance_text']}
                      />
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Light_low_importance_text'],
                            fontSize: 12,
                          },
                          dimensions.width
                        )}
                      >
                        {
                          'Vault needs to securely log into your account in order to sync'
                        }
                      </Text>
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingLeft: 15,
                        },
                        dimensions.width
                      )}
                    >
                      <Icon
                        size={12}
                        name={'Entypo/dot-single'}
                        color={theme.colors['Light_low_importance_text']}
                      />
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Light_low_importance_text'],
                            fontSize: 12,
                          },
                          dimensions.width
                        )}
                      >
                        {
                          "You can turn these email notifications off in your sportsbook's settings if you wish"
                        }
                      </Text>
                    </View>
                  </View>
                  {/* Disconnecting */}
                  <View
                    style={StyleSheet.applyWidth(
                      { marginBottom: 10 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Light_low_importance_text'],
                          fontSize: 16,
                          marginBottom: 3,
                        },
                        dimensions.width
                      )}
                    >
                      {'My sportsbook keeps disconnecting'}
                    </Text>

                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingLeft: 15,
                        },
                        dimensions.width
                      )}
                    >
                      <Icon
                        size={12}
                        name={'Entypo/dot-single'}
                        color={theme.colors['Light_low_importance_text']}
                      />
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors['Light_low_importance_text'],
                            fontSize: 12,
                          },
                          dimensions.width
                        )}
                      >
                        {'This happens occasionally - simply resync the book'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', marginTop: 28, paddingBottom: 75 },
                  dimensions.width
                )}
              >
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await WebBrowser.openBrowserAsync(
                          'https://www.vaultsportshq.com/contact'
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.primary,
                      borderRadius: 8,
                      color: theme.colors['Strong_Text_on_gold_buttons'],
                      fontFamily: 'System',
                      fontWeight: '700',
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Still having trouble?'}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(ManageBooksScreen);
