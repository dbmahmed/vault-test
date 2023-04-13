import React from 'react';
import * as CustomCode from '../CustomCode';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SwaggerAPIApi from '../apis/SwaggerAPIApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
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
  TextField,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import * as Linking from 'expo-linking';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const BlankTestingAreaScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const checkFanduelSynced = x => {
    return [x].book.name.includes('Fanduel');
  };

  const refreshBets = () => {
    const SSpublicKey = 'ded051886fb76987f7d80664cdb73b99fad637c0';
    const SSprivateKey = '31891124503a015f1f9421f768341c364a8e6a53';
    const sharpsports = new SharpSports(
      Constants.internalId,
      SSpublicKey,
      SSprivateKey
    );

    sharpsports.Refresh();
  };

  const firstCharacter = x => {
    return x.charAt(0);
  };

  const balanceSyntax = x => {
    return x < 0
      ? '-$' + Math.abs(x / 100).toFixed(2)
      : '$' + Math.abs(x / 100).toFixed(2);
  };

  const getTotalPending = x => {
    return x[0];
  };

  const shareScreenNameUsername = x => {
    return x == 'username';
  };

  const shareScreenNameName = x => {
    return x == 'name';
  };

  const shareScreenNameHidden = x => {
    return x == 'hidden';
  };

  const { theme } = props;
  const { navigation } = props;

  return (
    <ScreenContainer hasSafeArea={true} scrollable={false}>
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
              {'Select Members'}
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
                  navigation.navigate('SubscriptionScreen');
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
                {/* Skip */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Background Inverse (Main Font)'],
                      fontSize: 18,
                    },
                    dimensions.width
                  )}
                >
                  {'Skip'}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
      </View>
      {/* Select Members */}
      <View>
        {/* Search Bar */}
        <View
          style={StyleSheet.applyWidth(
            {
              paddingBottom: 10,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 12,
            },
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
        {/* Selected Member List */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              flexDirection: 'column',
              paddingBottom: 8,
              paddingTop: 4,
            },
            dimensions.width
          )}
        >
          {/* Selected Member */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: theme.colors['NFT_TIME_Gray'],
                borderRadius: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 8,
              },
              dimensions.width
            )}
          >
            <Circle
              bgColor={theme.colors['Background Inverse (Main Font)']}
              size={32}
            >
              {/* Default Profile Picture */}
              <Circle bgColor={theme.colors.lightLowImportanceText} size={32}>
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
                        fontSize: 18,
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
                  color: theme.colors['Background Inverse (Main Font)'],
                  fontSize: 16,
                  paddingLeft: 4,
                },
                dimensions.width
              )}
            >
              {'First'}
            </Text>

            <Touchable activeOpacity={0.8} disabledOpacity={0.8}>
              <Icon
                style={StyleSheet.applyWidth(
                  { marginLeft: 4, marginRight: 4 },
                  dimensions.width
                )}
                color={theme.colors['Background Inverse (Main Font)']}
                size={16}
                name={'Ionicons/ios-close-outline'}
              />
            </Touchable>
          </View>
        </View>

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
                    {/* Selected */}
                    <Icon
                      size={28}
                      color={theme.colors['Primary']}
                      name={'Ionicons/ios-checkmark-circle'}
                    />
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
                    {/* Unselected */}
                    <Icon
                      color={theme.colors['Light_low_importance_text']}
                      name={'FontAwesome/circle-thin'}
                      size={28}
                    />
                  </View>
                </Surface>
              </Touchable>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(BlankTestingAreaScreen);
