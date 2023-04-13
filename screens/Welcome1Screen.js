import React from 'react';
import Images from '../config/Images';
import segmentLogScreen from '../global-functions/segmentLogScreen';
import segmentLogTrack from '../global-functions/segmentLogTrack';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  ScreenContainer,
  Swiper,
  SwiperItem,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import {
  Image,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const Welcome1Screen = props => {
  const dimensions = useWindowDimensions();

  const segment = useAnalytics();

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
      segmentLogScreen(segment, 'Welcome');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { alignItems: 'center', justifyContent: 'space-between' },
        dimensions.width
      )}
      scrollable={false}
      hasSafeArea={true}
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
              { borderRadius: 0, width: '33%' },
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
          >
            {/* Full Logo */}
            <Image
              style={StyleSheet.applyWidth(
                { height: 50, opacity: 1, width: 125 },
                dimensions.width
              )}
              resizeMode={'contain'}
              source={Images.VaultLogoLightFontClearBackground}
            />
          </View>
          {/* Right Button */}
          <View
            style={StyleSheet.applyWidth(
              { borderRadius: 0, width: '33%' },
              dimensions.width
            )}
          />
        </View>
      </View>
      {/* Welcome Swiper */}
      <Swiper
        style={StyleSheet.applyWidth(
          { height: 425, width: '100%' },
          dimensions.width
        )}
        dotActiveColor={theme.colors.primary}
        dotColor={theme.colors.divider}
        dotsTouchable={true}
      >
        <SwiperItem
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
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
                marginBottom: 28,
                marginTop: 10,
              },
              dimensions.width
            )}
          >
            {'Sync your sportsbooks'}
          </Text>

          <View>
            <Image
              style={StyleSheet.applyWidth(
                { height: 325, width: 325 },
                dimensions.width
              )}
              resizeMode={'contain'}
              source={Images.WelcomeSync}
            />
          </View>
        </SwiperItem>

        <SwiperItem
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
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
                marginBottom: 28,
                marginTop: 10,
              },
              dimensions.width
            )}
          >
            {'Sweat your bets in one place!'}
          </Text>

          <View>
            <Image
              style={StyleSheet.applyWidth(
                { height: 325, width: 325 },
                dimensions.width
              )}
              resizeMode={'contain'}
              source={Images.WelcomeSweat}
            />
          </View>
        </SwiperItem>

        <SwiperItem
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
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
                marginBottom: 28,
                marginTop: 10,
              },
              dimensions.width
            )}
          >
            {'Analyze your stats'}
          </Text>

          <View>
            <Image
              style={StyleSheet.applyWidth(
                { height: 325, width: 325 },
                dimensions.width
              )}
              resizeMode={'contain'}
              source={Images.WelcomeAnalyze}
            />
          </View>
        </SwiperItem>

        <SwiperItem
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
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
                marginBottom: 28,
                marginTop: 10,
              },
              dimensions.width
            )}
          >
            {'Discover your strengths'}
          </Text>

          <View>
            <Image
              style={StyleSheet.applyWidth(
                { height: 325, width: 325 },
                dimensions.width
              )}
              resizeMode={'contain'}
              source={Images.WelcomeStrengths}
            />
          </View>
        </SwiperItem>

        <SwiperItem
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
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
                marginBottom: 28,
                marginTop: 10,
              },
              dimensions.width
            )}
          >
            {'See your profits!'}
          </Text>

          <View>
            <Image
              style={StyleSheet.applyWidth(
                { height: 325, width: 325 },
                dimensions.width
              )}
              resizeMode={'contain'}
              source={Images.WelcomeProfits}
            />
          </View>
        </SwiperItem>
      </Swiper>

      <View
        style={StyleSheet.applyWidth(
          {
            borderColor: theme.colors.divider,
            borderTopWidth: 1,
            paddingBottom: '4%',
            paddingLeft: 34,
            paddingRight: 34,
            width: '100%',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 14, width: '100%' },
            dimensions.width
          )}
        >
          {/* Button Outline */}
          <Button
            onPress={() => {
              try {
                navigation.navigate('Welcome_Stack', {
                  screen: 'SignUpScreen',
                });
                segmentLogTrack(
                  segment,
                  'Navigated to Sign Up',
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
            loading={false}
            title={'Sign Up'}
          >
            {'Log In'}
          </Button>

          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 14,
              },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('Welcome_Stack', {
                    screen: 'LogInScreen',
                  });
                  segmentLogTrack(
                    segment,
                    'Navigated to Log In',
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
                  justifyContent: 'center',
                  width: '50%',
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
                    marginBottom: 6,
                    marginTop: 6,
                  },
                  dimensions.width
                )}
              >
                {'Log In'}
              </Text>
            </Touchable>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Welcome1Screen);
