import React from 'react';
import * as CustomCode from '../CustomCode';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import segmentLogScreen from '../global-functions/segmentLogScreen';
import segmentLogTrack from '../global-functions/segmentLogTrack';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const CreateProfile5ChooseYourPromoScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const segment = useAnalytics();
  const clearTimer = () => {
    Constants.waitlistedTimer !== undefined
      ? clearTimeout(Constants.waitlistedTimer)
      : null;
  };

  const startTimer = () => {
    Constants.waitlistedTimer !== undefined
      ? clearTimeout(Constants.waitlistedTimer)
      : null;

    Constants.waitlistedTimer = setTimeout(() => {
      setVariable({ key: 'waitlisted', value: false });
      setVariable({ key: 'dummyVar', value: variables.dummyVar + 1 });

      fetch(
        'https://sportsbettingapi20201118035253.azurewebsites.net/Account/UpdateWaitlisted?internalId=' +
          variables.internalId +
          '&status=false',
        {
          headers: {
            Accept: 'application/json',
            Authorization: variables.authToken,
          },
        }
      );
    }, 20000);
  };

  const testVarChange = () => {
    console.log(Constants.testVar);

    Constants.testVar = false;

    console.log(Constants.testVar);
  };

  const startTimerTwo = () => {
    Constants.waitlistedTimer !== undefined
      ? clearTimeout(Constants.waitlistedTimer)
      : null;

    Constants.waitlistedTimer = setTimeout(() => {
      return false;
      //console.log(Constants.waitlisted);
    }, 5000);

    return true;

    //console.log(Constants.waitlisted);

    //console.log(Constants.testVar);
  };
  // to use a global variable
  const variables = CustomCode.useValues();

  // to update or modify the value of a global variable
  const setVariable = CustomCode.useSetValue();
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
      segmentLogScreen(segment, 'Choose A Promo');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [clickedPromo, setClickedPromo] = React.useState(false);
  const [seconds, setSeconds] = React.useState(true);

  return (
    <ScreenContainer
      scrollable={false}
      hasTopSafeArea={true}
      hasSafeArea={false}
      hasBottomSafeArea={false}
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
          />
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

      <View
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'space-between' },
          dimensions.width
        )}
      >
        <ScrollView
          contentContainerStyle={StyleSheet.applyWidth(
            { paddingBottom: 48 },
            dimensions.width
          )}
          bounces={true}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={StyleSheet.applyWidth({ minHeight: 50 }, dimensions.width)}
          >
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.backgroundInverseMainFont,
                  fontFamily: 'System',
                  fontSize: 28,
                  fontWeight: '700',
                  paddingLeft: '4%',
                  paddingRight: '4%',
                  paddingTop: 10,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'Choose your new user promo! 🤩'}
            </Text>
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                marginTop: 48,
                paddingLeft: '4%',
                paddingRight: '4%',
              },
              dimensions.width
            )}
          >
            {/* BetMGM */}
            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 6, marginBottom: 28 },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      await WebBrowser.openBrowserAsync(
                        'https://mediaserver.betmgmpartners.com/renderBanner.do?zoneId=1666694'
                      );
                      setClickedPromo(true);
                      segmentLogTrack(
                        segment,
                        'BetMGM promo clicked',
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
                  { borderRadius: 8, height: 130, width: 325 },
                  dimensions.width
                )}
              >
                <Surface
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.divider,
                      borderRadius: 8,
                      flex: 1,
                      height: 130,
                      width: 325,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 8,
                        height: 130,
                        overflow: 'hidden',
                        width: 325,
                      },
                      dimensions.width
                    )}
                  >
                    <Image
                      style={StyleSheet.applyWidth(
                        { height: 130, width: 325 },
                        dimensions.width
                      )}
                      resizeMode={'cover'}
                      source={Images.BetMGMWelcomePromo}
                    />
                  </View>
                </Surface>
              </Touchable>
            </View>
            {/* BetRivers */}
            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 8, marginBottom: 28 },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      await WebBrowser.openBrowserAsync(
                        'https://www.vaultsportshq.com/betrivers'
                      );
                      setClickedPromo(true);
                      segmentLogTrack(
                        segment,
                        'BetRivers promo clicked',
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
                  { borderRadius: 8, height: 130, width: 325 },
                  dimensions.width
                )}
              >
                <Surface
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.divider,
                      borderRadius: 8,
                      flex: 1,
                      height: 130,
                      width: 325,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 8,
                        height: 130,
                        overflow: 'hidden',
                        width: 325,
                      },
                      dimensions.width
                    )}
                  >
                    <Image
                      style={StyleSheet.applyWidth(
                        { height: 130, width: 325 },
                        dimensions.width
                      )}
                      resizeMode={'cover'}
                      source={Images.BetRiversWelcomePromo}
                    />
                  </View>
                </Surface>
              </Touchable>
            </View>
            {/* PrizePicks */}
            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 8, marginBottom: 28 },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      await WebBrowser.openBrowserAsync(
                        'https://app.prizepicks.com/sign-up?invite_code=VAULT'
                      );
                      setClickedPromo(true);
                      segmentLogTrack(
                        segment,
                        'PrizePicks promo clicked',
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
                  { borderRadius: 8, height: 130, width: 325 },
                  dimensions.width
                )}
              >
                <Surface
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.divider,
                      borderRadius: 8,
                      flex: 1,
                      height: 130,
                      width: 325,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 8,
                        height: 130,
                        overflow: 'hidden',
                        width: 325,
                      },
                      dimensions.width
                    )}
                  >
                    <Image
                      style={StyleSheet.applyWidth(
                        { height: 130, width: 325 },
                        dimensions.width
                      )}
                      resizeMode={'cover'}
                      source={Images.PrizePicksWelcomePromo}
                    />
                  </View>
                </Surface>
              </Touchable>
            </View>
            {/* Underdog Fantasy */}
            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 8, marginBottom: 28 },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      await WebBrowser.openBrowserAsync(
                        'https://play.underdogfantasy.com/p-vault'
                      );
                      setClickedPromo(true);
                      segmentLogTrack(
                        segment,
                        'Underdog Fantasy promo clicked',
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
                  { borderRadius: 8, height: 130, width: 325 },
                  dimensions.width
                )}
              >
                <Surface
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.divider,
                      borderRadius: 8,
                      flex: 1,
                      height: 130,
                      width: 325,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 8,
                        height: 130,
                        overflow: 'hidden',
                        width: 325,
                      },
                      dimensions.width
                    )}
                  >
                    <Image
                      style={StyleSheet.applyWidth(
                        { height: 130, width: 325 },
                        dimensions.width
                      )}
                      resizeMode={'cover'}
                      source={Images.UnderDogWelcomePromo}
                    />
                  </View>
                </Surface>
              </Touchable>
            </View>
            {/* Unibet */}
            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 8, marginBottom: 28 },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      await WebBrowser.openBrowserAsync(
                        'https://wlkindred.adsrv.eacdn.com/C.ashx?btag=a_2165b_334c_&affid=76&siteid=2165&adid=334&c=[acid]'
                      );
                      setClickedPromo(true);
                      segmentLogTrack(
                        segment,
                        'Unibet promo clicked',
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
                  { borderRadius: 8, height: 130, width: 325 },
                  dimensions.width
                )}
              >
                <Surface
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.divider,
                      borderRadius: 8,
                      flex: 1,
                      height: 130,
                      width: 325,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 8,
                        height: 130,
                        overflow: 'hidden',
                        width: 325,
                      },
                      dimensions.width
                    )}
                  >
                    <Image
                      style={StyleSheet.applyWidth(
                        { height: 130, width: 325 },
                        dimensions.width
                      )}
                      resizeMode={'cover'}
                      source={Images.UnibetWelcomePromo}
                    />
                  </View>
                </Surface>
              </Touchable>
            </View>
            <>
              {clickedPromo ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 10 },
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate('CreateProfileBetaStack');
                        segmentLogTrack(
                          segment,
                          'Skip for now clicked',
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
                          paddingBottom: 5,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 5,
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
                        {'Skip this'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
          </View>
        </ScrollView>
        <>
          {!clickedPromo ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  borderColor: theme.colors.divider,
                  borderTopWidth: 1,
                  justifyContent: 'center',
                  minHeight: 50,
                  paddingBottom: 68,
                  paddingLeft: 34,
                  paddingRight: 34,
                  paddingTop: 32,
                },
                dimensions.width
              )}
            >
              {/* Button Outline */}
              <Button
                onPress={() => {
                  try {
                    navigation.navigate('CreateProfileBetaStack');
                    segmentLogTrack(
                      segment,
                      'Next button clicked',
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
          )}
        </>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(CreateProfile5ChooseYourPromoScreen);
