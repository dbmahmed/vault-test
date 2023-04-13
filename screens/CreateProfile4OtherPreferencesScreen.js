import React from 'react';
import * as CustomCode from '../CustomCode';
import * as SwaggerAPIApi from '../apis/SwaggerAPIApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import segmentLogScreen from '../global-functions/segmentLogScreen';
import segmentLogTrack from '../global-functions/segmentLogTrack';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  ScreenContainer,
  TextField,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import { StatusBar, Text, View, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateProfile4OtherPreferencesScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const userDefaultUnitSizeError = userDefaultUnitSize => {
    return userDefaultUnitSize >= 1 ? false : true;
  };

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
      segmentLogScreen(segment, 'Unit Size');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [userDefaultUnitSize, setUserDefaultUnitSize] = React.useState('');

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { justifyContent: 'space-between' },
        dimensions.width
      )}
      scrollable={true}
      hasSafeArea={true}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={'never'}
      >
        <View
          style={StyleSheet.applyWidth(
            { marginBottom: 25, minHeight: 50 },
            dimensions.width
          )}
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
                    maxWidth: '34%',
                    minWidth: '33%',
                  },
                  dimensions.width
                )}
              ></View>
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

          <View
            style={StyleSheet.applyWidth({ minHeight: 50 }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                { minHeight: 50, paddingLeft: 16, paddingRight: 16 },
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
                    paddingTop: 10,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {"Welcome!  Let's customize your Vault 👋"}
              </Text>

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
                {'What is your usual unit size?'}
              </Text>

              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 25 },
                  dimensions.width
                )}
              >
                <TextField
                  onChangeText={newTextFieldValue => {
                    const userDefaultUnitSize = newTextFieldValue;
                    try {
                      setUserDefaultUnitSize(userDefaultUnitSize);
                      setGlobalVariableValue({
                        key: 'userDefaultUnitSize',
                        value: userDefaultUnitSize,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.divider,
                      borderColor: theme.colors.divider,
                      borderRadius: 8,
                      color: theme.colors.backgroundInverseMainFont,
                      fontSize: 20,
                    },
                    dimensions.width
                  )}
                  error={userDefaultUnitSizeError(userDefaultUnitSize)}
                  defaultValue={'10'}
                  type={'solid'}
                  value={userDefaultUnitSize}
                  autoFocus={true}
                  leftIconName={'MaterialIcons/attach-money'}
                  leftIconMode={'outset'}
                  editable={true}
                  keyboardType={'number-pad'}
                  returnKeyType={'next'}
                  placeholder={'Must be greater or equal to 1'}
                  placeholderTextColor={theme.colors.lightLowImportanceText}
                  returnKeyLabel={'Next'}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View
        style={StyleSheet.applyWidth(
          {
            borderColor: theme.colors.divider,
            borderTopWidth: 1,
            justifyContent: 'center',
            minHeight: 50,
            paddingBottom: 34,
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
            const handler = async () => {
              try {
                if (userDefaultUnitSizeError(userDefaultUnitSize)) {
                  return;
                }
                navigation.navigate('CreateProfileBetaStack', {
                  screen: 'AllowNotificationsScreen',
                });
                await SwaggerAPIApi.saveUnitSizeGET(Constants, {
                  internalId: 'f2735185-3df4-4d70-94c5-d4a8b3f58a10',
                  unitSize: userDefaultUnitSize,
                });
                segmentLogTrack(
                  segment,
                  'Unit Size added',
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
    </ScreenContainer>
  );
};

export default withTheme(CreateProfile4OtherPreferencesScreen);
