import React from 'react';
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
import { useAnalytics } from '@segment/analytics-react-native';
import {
  Image,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const CreateProfile5SyncFirstSportsbookScreen = props => {
  const dimensions = useWindowDimensions();

  const segment = useAnalytics();

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { justifyContent: 'space-between' },
        dimensions.width
      )}
      scrollable={true}
      hasSafeArea={true}
    >
      <View
        style={StyleSheet.applyWidth(
          { height: '80%', minHeight: 50 },
          dimensions.width
        )}
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
                      size={32}
                      name={'Ionicons/ios-chevron-back'}
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
              />
            </View>
          </View>
        </Surface>

        <View
          style={StyleSheet.applyWidth({ minHeight: 50 }, dimensions.width)}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                flex: 1,
                minHeight: 50,
                paddingBottom: '4%',
                paddingLeft: '4%',
                paddingRight: '4%',
                paddingTop: '4%',
              },
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
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'Sync your first sportsbook.'}
            </Text>

            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.backgroundInverseMainFont,
                  fontFamily: 'System',
                  fontSize: 20,
                  fontWeight: '700',
                  marginTop: 48,
                },
                dimensions.width
              )}
            >
              {
                'Vault uses sportsbook sync technology to securely track your bets for you.'
              }
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 24,
                  maxHeight: 200,
                },
                dimensions.width
              )}
            >
              <Image
                style={StyleSheet.applyWidth(
                  { maxHeight: 200, maxWidth: 300 },
                  dimensions.width
                )}
                resizeMode={'contain'}
              />
            </View>
          </View>
        </View>
      </View>

      <View
        style={StyleSheet.applyWidth(
          {
            borderColor: theme.colors.divider,
            borderTopWidth: 1,
            justifyContent: 'center',
            minHeight: 50,
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
            {/* Button Outline */}
            <Button
              onPress={() => {
                try {
                  navigation.navigate('RootNavigator');
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
              title={'Sync A Sportsbook'}
            >
              {'Log In'}
            </Button>

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
                  {'Skip for now'}
                </Text>
              </Touchable>
            </View>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(CreateProfile5SyncFirstSportsbookScreen);
