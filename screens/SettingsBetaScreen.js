import React from 'react';
import * as CustomCode from '../CustomCode';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SwaggerAPIApi from '../apis/SwaggerAPIApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import segmentLogIdentify from '../global-functions/segmentLogIdentify';
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
  Divider,
  Icon,
  LinearGradient,
  ScreenContainer,
  Surface,
  Switch,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
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
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const SettingsBetaScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const firstCharacter = x => {
    return x == null ? '' : x.charAt(0);
  };

  const profileCardCheck = x => {
    return x == true;
  };

  const checkDemoInternalId = x => {
    return x == '5ae5ade8-b3ca-4250-ad5e-8613bbd6653b';
  };

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const swaggerAPIUpdateProfilePictureGET =
    SwaggerAPIApi.useUpdateProfilePictureGET();
  const swaggerAPIDeleteAccountGET = SwaggerAPIApi.useDeleteAccountGET();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      segmentLogScreen(segment, 'Settings');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [switchValue, setSwitchValue] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      <Surface
        style={StyleSheet.applyWidth(
          { backgroundColor: theme.colors.background, borderRadius: 0 },
          dimensions.width
        )}
        elevation={0}
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
                    if (profileCardCheck(Constants['profileCardSettings'])) {
                      return;
                    }
                    setGlobalVariableValue({
                      key: 'toggleMenuModal',
                      value: true,
                    });
                    segmentLogTrack(
                      segment,
                      'Navigate back',
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
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxHeight: 50,
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
                {'Profile & Settings'}
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
            />
          </View>
        </View>
      </Surface>

      <ScrollView
        style={StyleSheet.applyWidth({ flexGrow: 1 }, dimensions.width)}
        contentContainerStyle={StyleSheet.applyWidth(
          { justifyContent: 'space-between' },
          dimensions.width
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View>
          {/* Account Image Name Section */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                paddingLeft: '4%',
                paddingRight: '4%',
                paddingTop: 18,
              },
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
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <Surface
                      style={StyleSheet.applyWidth(
                        { borderRadius: 38 },
                        dimensions.width
                      )}
                      elevation={2}
                    >
                      <Circle
                        size={77}
                        bgColor={theme.colors.backgroundInverseMainFont}
                      >
                        {/* Profile Picture */}
                        <>
                          {!Constants['profilePictureUrl'] ? null : (
                            <CircleImage
                              size={75}
                              source={{
                                uri: `${Constants['profilePictureUrl']}`,
                              }}
                            />
                          )}
                        </>
                        {/* Default Profile Picture */}
                        <>
                          {Constants['profilePictureUrl'] ? null : (
                            <Circle
                              size={75}
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
                          )}
                        </>
                      </Circle>
                    </Surface>
                    {/* Change Profile Photo */}
                    <Button
                      onPress={() => {
                        const handler = async () => {
                          try {
                            const pickerValue = await Utils.openImagePicker({
                              allowsEditing: true,
                            });
                            setGlobalVariableValue({
                              key: 'profilePictureUrl',
                              value: pickerValue,
                            });
                            segmentLogTrack(
                              segment,
                              'Profile picture updated',
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
                          color: theme.colors.primary,
                          fontFamily: 'System',
                          fontSize: 14,
                          fontWeight: '700',
                          textAlign: 'center',
                        },
                        dimensions.width
                      )}
                      title={'Change Profile Photo'}
                    />
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', marginTop: 6 },
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
          {/* All Options Section */}
          <View
            style={StyleSheet.applyWidth({ marginTop: 40 }, dimensions.width)}
          >
            <View>
              {/* Account Section */}
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: 28, paddingLeft: 16, paddingRight: 16 },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row', opacity: 1 },
                    dimensions.width
                  )}
                >
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
                    {'Account'}
                  </Text>
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 18 },
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      try {
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
                  >
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Divider'],
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* Adjust Unit Size View */}
                      <View>
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
                          {/* View_ABC */}
                          <View
                            style={StyleSheet.applyWidth(
                              { alignItems: 'center', flexDirection: 'row' },
                              dimensions.width
                            )}
                          >
                            <Icon
                              style={StyleSheet.applyWidth(
                                { marginRight: 6 },
                                dimensions.width
                              )}
                              size={24}
                              color={theme.colors.error}
                              name={'MaterialCommunityIcons/plus-minus-box'}
                            />
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
                              {'Adjust unit size ($'}
                              {Constants['userDefaultUnitSize']}
                              {')'}
                            </Text>
                          </View>
                          <Icon
                            name={'Ionicons/ios-chevron-forward'}
                            size={24}
                            color={theme.colors.backgroundInverseMainFont}
                          />
                        </View>
                      </View>
                    </Surface>
                  </Touchable>
                  <Divider
                    style={StyleSheet.applyWidth(
                      { height: 0.5 },
                      dimensions.width
                    )}
                    color={theme.colors.nFTTIMEIcons}
                    height={1}
                  />
                  <Utils.CustomCodeErrorBoundary>
                    <CustomCode.ShareVault />
                  </Utils.CustomCodeErrorBoundary>
                  <Divider
                    style={StyleSheet.applyWidth(
                      { height: 0.5 },
                      dimensions.width
                    )}
                    color={theme.colors.nFTTIMEIcons}
                    height={1}
                  />
                  <Surface
                    style={StyleSheet.applyWidth(
                      { backgroundColor: theme.colors.divider, minHeight: 40 },
                      dimensions.width
                    )}
                    elevation={1}
                  >
                    {/* Show Vault Logo */}
                    <View>
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
                              { marginRight: 6 },
                              dimensions.width
                            )}
                            size={24}
                            color={theme.colors.error}
                            name={'Ionicons/ios-eye'}
                          />
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
                            {'Display Vault logo'}
                          </Text>
                        </View>
                        <Switch
                          onValueChange={newSwitchValue => {
                            try {
                              setSwitchValue(newSwitchValue);
                              setGlobalVariableValue({
                                key: 'showVaultLogo',
                                value: newSwitchValue,
                              });
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          activeTrackColor={theme.colors['Good']}
                          defaultValue={Constants['showVaultLogo']}
                        />
                      </View>
                    </View>
                  </Surface>
                  <Divider
                    style={StyleSheet.applyWidth(
                      { height: 0.5 },
                      dimensions.width
                    )}
                    color={theme.colors.nFTTIMEIcons}
                    height={1}
                  />
                  <Touchable
                    onPress={() => {
                      try {
                        setGlobalVariableValue({
                          key: 'toggleSignOutActionSheet',
                          value: true,
                        });
                        segmentLogTrack(
                          segment,
                          'Navigated to Sign Out action sheet',
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
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Divider'],
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 8,
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* Sign Out View */}
                      <View>
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
                                { marginRight: 6 },
                                dimensions.width
                              )}
                              size={24}
                              color={theme.colors.error}
                              name={'Ionicons/log-out'}
                            />
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
                              {'Sign out'}
                            </Text>
                          </View>
                          <Icon
                            name={'Ionicons/ios-chevron-forward'}
                            size={24}
                            color={theme.colors.backgroundInverseMainFont}
                          />
                        </View>
                      </View>
                    </Surface>
                  </Touchable>
                </View>
              </View>
              {/* Sportsbooks Section */}
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: 28, paddingLeft: 16, paddingRight: 16 },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row', opacity: 1 },
                    dimensions.width
                  )}
                >
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
                    {'Sportsbooks'}
                  </Text>
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 18 },
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
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Divider'],
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* Sync Sportsbook View */}
                      <>
                        {Constants['waitlisted'] ? null : (
                          <View>
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
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  style={StyleSheet.applyWidth(
                                    { marginRight: 6 },
                                    dimensions.width
                                  )}
                                  size={24}
                                  name={'Ionicons/ios-add-circle'}
                                  color={theme.colors.custom_rgb0_122_255}
                                />
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color:
                                        theme.colors.backgroundInverseMainFont,
                                      fontFamily: 'System',
                                      fontWeight: '700',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Sync a sportsbook'}
                                </Text>
                              </View>
                              <Icon
                                name={'Ionicons/ios-chevron-forward'}
                                size={24}
                                color={theme.colors.backgroundInverseMainFont}
                              />
                            </View>
                          </View>
                        )}
                      </>
                    </Surface>
                  </Touchable>
                  <Divider
                    style={StyleSheet.applyWidth(
                      { height: 0.5 },
                      dimensions.width
                    )}
                    height={1}
                    color={theme.colors.nFTTIMEIcons}
                  />
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate('CreateProfileBetaStack', {
                          screen: 'ManageBooksScreen',
                        });
                        segmentLogTrack(
                          segment,
                          'Navigated to Manage Sportsbooks',
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
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Divider'],
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 8,
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* Manage Books View */}
                      <>
                        {Constants['waitlisted'] ? null : (
                          <View>
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
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  style={StyleSheet.applyWidth(
                                    { marginRight: 6 },
                                    dimensions.width
                                  )}
                                  size={24}
                                  color={theme.colors.custom_rgb0_122_255}
                                  name={'Ionicons/ios-list-circle'}
                                />
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color:
                                        theme.colors.backgroundInverseMainFont,
                                      fontFamily: 'System',
                                      fontWeight: '700',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Manage sportsbooks'}
                                </Text>
                              </View>
                              <Icon
                                name={'Ionicons/ios-chevron-forward'}
                                size={24}
                                color={theme.colors.backgroundInverseMainFont}
                              />
                            </View>
                          </View>
                        )}
                      </>
                    </Surface>
                  </Touchable>
                </View>
              </View>
              {/* Support Section */}
              <View
                style={StyleSheet.applyWidth(
                  { paddingLeft: 16, paddingRight: 16 },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row', opacity: 1 },
                    dimensions.width
                  )}
                >
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
                    {'Support'}
                  </Text>
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 18 },
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await WebBrowser.openBrowserAsync(
                            'https://www.vaultsportshq.com/contact'
                          );
                          segmentLogTrack(
                            segment,
                            'Send us a message clicked',
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
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Divider'],
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* Contact */}
                      <View>
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
                                { marginRight: 6 },
                                dimensions.width
                              )}
                              size={24}
                              color={theme.colors.good}
                              name={'Ionicons/ios-chatbubble-ellipses'}
                            />
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
                              {'Send us a message'}
                            </Text>
                          </View>
                          <Icon
                            name={'Ionicons/ios-chevron-forward'}
                            size={24}
                            color={theme.colors.backgroundInverseMainFont}
                          />
                        </View>
                      </View>
                    </Surface>
                  </Touchable>
                  <Divider
                    style={StyleSheet.applyWidth(
                      { height: 0.5 },
                      dimensions.width
                    )}
                    height={1}
                    color={theme.colors.nFTTIMEIcons}
                  />
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await WebBrowser.openBrowserAsync(
                            'https://docs.google.com/forms/d/e/1FAIpQLSdeviZa5Q1Aj2O8KJiIJsa90dfXASqE-3FgV5S33hU52vxguQ/viewform?usp=sf_link'
                          );
                          segmentLogTrack(
                            segment,
                            'Give us feedback clicked',
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
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Divider'],
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* Give Us Feedback */}
                      <View>
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
                                { marginRight: 6 },
                                dimensions.width
                              )}
                              size={24}
                              color={theme.colors.good}
                              name={'MaterialIcons/feedback'}
                            />
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
                              {'Give us feedback'}
                            </Text>
                          </View>
                          <Icon
                            name={'Ionicons/ios-chevron-forward'}
                            size={24}
                            color={theme.colors.backgroundInverseMainFont}
                          />
                        </View>
                      </View>
                    </Surface>
                  </Touchable>
                  <Divider
                    style={StyleSheet.applyWidth(
                      { height: 0.5 },
                      dimensions.width
                    )}
                    height={1}
                    color={theme.colors.nFTTIMEIcons}
                  />
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await WebBrowser.openBrowserAsync(
                            'https://apps.apple.com/us/app/vault-the-sports-bet-tracker/id1595719004'
                          );
                          segmentLogTrack(
                            segment,
                            'Rate on the App Store clicked',
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
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Divider'],
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* Rate and Review */}
                      <View>
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
                                { marginRight: 6 },
                                dimensions.width
                              )}
                              size={24}
                              color={theme.colors.good}
                              name={'MaterialCommunityIcons/star-circle'}
                            />
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
                              {'Rate on the App Store'}
                            </Text>
                          </View>
                          <Icon
                            name={'Ionicons/ios-chevron-forward'}
                            size={24}
                            color={theme.colors.backgroundInverseMainFont}
                          />
                        </View>
                      </View>
                    </Surface>
                  </Touchable>
                  <Divider
                    style={StyleSheet.applyWidth(
                      { height: 0.5 },
                      dimensions.width
                    )}
                    height={1}
                    color={theme.colors.nFTTIMEIcons}
                  />
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate('MainTabNavigator', {
                          screen: 'MyBetsStack',
                          params: { screen: 'ProfileScreen' },
                        });
                        setGlobalVariableValue({
                          key: 'gamesScreenTutorial',
                          value: true,
                        });
                        setGlobalVariableValue({
                          key: 'moneyScreenTutorial',
                          value: true,
                        });
                        setGlobalVariableValue({
                          key: 'meScreenTutorial',
                          value: true,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Divider'],
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* View Tutorial */}
                      <View>
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
                                { marginRight: 6 },
                                dimensions.width
                              )}
                              size={24}
                              color={theme.colors.good}
                              name={'Ionicons/ios-help-circle'}
                            />
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
                              {'View tutorial'}
                            </Text>
                          </View>
                          <Icon
                            name={'Ionicons/ios-chevron-forward'}
                            size={24}
                            color={theme.colors.backgroundInverseMainFont}
                          />
                        </View>
                      </View>
                    </Surface>
                  </Touchable>
                  <Divider
                    style={StyleSheet.applyWidth(
                      { height: 0.5 },
                      dimensions.width
                    )}
                    height={1}
                    color={theme.colors.nFTTIMEIcons}
                  />
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await WebBrowser.openBrowserAsync(
                            'https://www.vaultsportshq.com/'
                          );
                          segmentLogTrack(
                            segment,
                            'Visit our website clicked',
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
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Divider'],
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* Visit Website */}
                      <View>
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
                                { marginRight: 6 },
                                dimensions.width
                              )}
                              size={24}
                              color={theme.colors.good}
                              name={'MaterialCommunityIcons/web'}
                            />
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
                              {'Visit our website'}
                            </Text>
                          </View>
                          <Icon
                            name={'Ionicons/ios-chevron-forward'}
                            size={24}
                            color={theme.colors.backgroundInverseMainFont}
                          />
                        </View>
                      </View>
                    </Surface>
                  </Touchable>
                  <Divider
                    style={StyleSheet.applyWidth(
                      { height: 0.5 },
                      dimensions.width
                    )}
                    height={1}
                    color={theme.colors.nFTTIMEIcons}
                  />
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await WebBrowser.openBrowserAsync(
                            'https://www.vaultsportshq.com/terms-of-service'
                          );
                          segmentLogTrack(
                            segment,
                            'TOS clicked',
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
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Divider'],
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* TOS */}
                      <View>
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
                                { marginRight: 6 },
                                dimensions.width
                              )}
                              size={24}
                              color={theme.colors.good}
                              name={'Ionicons/ios-information-circle'}
                            />
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
                              {'Terms of Service'}
                            </Text>
                          </View>
                          <Icon
                            name={'Ionicons/ios-chevron-forward'}
                            size={24}
                            color={theme.colors.backgroundInverseMainFont}
                          />
                        </View>
                      </View>
                    </Surface>
                  </Touchable>
                  <Divider
                    style={StyleSheet.applyWidth(
                      { height: 0.5 },
                      dimensions.width
                    )}
                    height={1}
                    color={theme.colors.nFTTIMEIcons}
                  />
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await WebBrowser.openBrowserAsync(
                            'https://www.vaultsportshq.com/privacy'
                          );
                          segmentLogTrack(
                            segment,
                            'Privacy policy clicked',
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
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Divider'],
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* Privacy */}
                      <View>
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
                                { marginRight: 6 },
                                dimensions.width
                              )}
                              size={24}
                              color={theme.colors.good}
                              name={'Ionicons/ios-shield-checkmark'}
                            />
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
                              {'Privacy Policy'}
                            </Text>
                          </View>
                          <Icon
                            name={'Ionicons/ios-chevron-forward'}
                            size={24}
                            color={theme.colors.backgroundInverseMainFont}
                          />
                        </View>
                      </View>
                    </Surface>
                  </Touchable>
                  <Divider
                    style={StyleSheet.applyWidth(
                      { height: 0.5 },
                      dimensions.width
                    )}
                    height={1}
                    color={theme.colors.nFTTIMEIcons}
                  />
                  <Touchable
                    onPress={() => {
                      try {
                        setGlobalVariableValue({
                          key: 'toggleDeleteAccountModal',
                          value: true,
                        });
                        segmentLogTrack(
                          segment,
                          'Open delete account action sheet',
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
                    <Surface
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.divider,
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 8,
                          minHeight: 40,
                        },
                        dimensions.width
                      )}
                      elevation={1}
                    >
                      {/* Delete Vault Account */}
                      <View>
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
                                { marginRight: 6 },
                                dimensions.width
                              )}
                              size={24}
                              name={'Ionicons/ios-close-circle'}
                              color={theme.colors['Light_low_importance_text']}
                            />
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
                              {'Delete your Vault account'}
                            </Text>
                          </View>
                          <Icon
                            name={'Ionicons/ios-chevron-forward'}
                            size={24}
                            color={theme.colors.backgroundInverseMainFont}
                          />
                        </View>
                      </View>
                    </Surface>
                  </Touchable>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 44,
              paddingBottom: 34,
              paddingLeft: 32,
              paddingRight: 32,
              paddingTop: 14,
            },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                setGlobalVariableValue({
                  key: 'toggleSignOutActionSheet',
                  value: true,
                });
                segmentLogTrack(
                  segment,
                  'Open sign out action sheet',
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
                  justifyContent: 'center',
                  paddingBottom: 10,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 10,
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'center',
                    color: theme.colors.lightLowImportanceText,
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '700',
                  },
                  dimensions.width
                )}
              >
                {'Sign Out'}
              </Text>
            </View>
          </Touchable>

          <View
            style={StyleSheet.applyWidth({ marginTop: 25 }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: 'mockSportsbookSyncModal',
                    value: true,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['Light_low_importance_text'],
                    fontSize: 10,
                  }),
                  dimensions.width
                )}
              >
                {'© 2023 Vault Media & Technology Corporation'}
              </Text>
            </Touchable>
          </View>
        </View>
      </ScrollView>
      {/* Delete Vault Account Modal */}
      <Modal
        visible={Constants['toggleDeleteAccountModal']}
        animationType={'slide'}
        transparent={true}
        presentationStyle={'pageSheet'}
      >
        <Touchable
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'toggleDeleteAccountModal',
                value: false,
              });
              segmentLogTrack(
                segment,
                'Delete account modal closed',
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
          style={StyleSheet.applyWidth({ height: '60%' }, dimensions.width)}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background,
              borderRadius: 0,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '40%',
              justifyContent: 'space-between',
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
              >
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'toggleDeleteAccountModal',
                        value: false,
                      });
                      segmentLogTrack(
                        segment,
                        'Close delete account modal',
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
                  {'Delete Account'}
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
                {
                  alignItems: 'center',
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 10,
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.backgroundInverseMainFont,
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
              >
                {
                  "Your sportsbook accounts will be disconnected, and your stats and other personal data will be deleted. This can't be undone. Are you sure?"
                }
              </Text>
            </View>

            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', paddingTop: 35 },
                dimensions.width
              )}
            >
              {/* Delete Account */}
              <>
                {checkDemoInternalId(Constants['internalId']) ? null : (
                  <Button
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await swaggerAPIDeleteAccountGET.mutateAsync({
                            internalid: Constants['internalId'],
                          });
                          setGlobalVariableValue({
                            key: 'authToken',
                            value: '',
                          });
                          setGlobalVariableValue({
                            key: 'toggleDeleteAccountModal',
                            value: false,
                          });
                          navigation.navigate('Welcome_Stack', {
                            screen: 'Welcome1Screen',
                          });
                          segmentLogTrack(
                            segment,
                            'User deleted account',
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
                          segmentLogIdentify(
                            segment,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            Constants['internalId'],
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
                        borderColor: theme.colors.background,
                        borderRadius: 8,
                        color: theme.colors.badErrorCancel,
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '700',
                        textAlign: 'center',
                      },
                      dimensions.width
                    )}
                    title={'Delete Account'}
                  />
                )}
              </>
              {/* Delete Account Fake */}
              <>
                {!checkDemoInternalId(Constants['internalId']) ? null : (
                  <Button
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.background,
                        borderRadius: 8,
                        color: theme.colors.badErrorCancel,
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '700',
                        textAlign: 'center',
                      },
                      dimensions.width
                    )}
                    title={'Delete Account'}
                  />
                )}
              </>
            </View>
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
                'User sign out',
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
            { fontSize: 18, textAlign: 'center' },
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
              segmentLogTrack(
                segment,
                'Cancel sign out action sheet',
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

      <Modal
        visible={Constants['mockSportsbookSyncModal']}
        animationType={'none'}
      >
        {/* Menu Surface */}
        <Surface
          style={StyleSheet.applyWidth(
            GlobalStyles.SurfaceStyles(theme)['Menu Bar Jan 19, 2023'],
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
              ></View>

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
                          setGlobalVariableValue({
                            key: 'mockSportsbookSyncModal',
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
                  )}
                </>
              </View>
            </View>
          </View>
        </Surface>

        <View
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ViewStyles(theme)['Logo View Mar 15, 2023'],
              { marginTop: 50 }
            ),
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
                resizeMode={'contain'}
                source={Images.VaultLogoRecap}
              />
            )}
          </>
        </View>

        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', marginTop: 100 },
            dimensions.width
          )}
        >
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['Background Inverse (Main Font)'],
                fontFamily: 'System',
                fontSize: 20,
                fontWeight: '700',
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'Sportsbook Sync'}
          </Text>

          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['Light_low_importance_text'],
                marginTop: 10,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {
              'Enter your sportsbook username or email to temporarily connect to Vault.'
            }
          </Text>
          <TextInput
            onChangeText={newTextInputValue => {
              const textInputValue = newTextInputValue;
              try {
                setTextInputValue(newTextInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextInputStyles(theme)['Text Input'],
                { marginTop: 30 }
              ),
              dimensions.width
            )}
            value={textInputValue}
            autoCapitalize={'none'}
            placeholder={'Enter a value...'}
          />
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(SettingsBetaScreen);
