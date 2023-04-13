import React from 'react';
import * as CustomCode from '../CustomCode';
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
import { Text, View, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateProfileConfirmNumberScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const segment = useAnalytics();
  const userDefaultUnitSizeError = userDefaultUnitSize => {
    return userDefaultUnitSize >= 1 ? false : true;
  };

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      segmentLogScreen(segment, 'Confirm Phone Number');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [styledTextFieldValue2, setStyledTextFieldValue2] = React.useState('');
  const [styledTextFieldValue3, setStyledTextFieldValue3] = React.useState('');
  const [styledTextFieldValue4, setStyledTextFieldValue4] = React.useState('');

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { justifyContent: 'space-between' },
        dimensions.width
      )}
      scrollable={true}
      hasSafeArea={true}
      hasTopSafeArea={true}
    >
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={false}
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
                        minHeight: 50,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Back */}
                    <Icon
                      name={'Ionicons/ios-chevron-back-sharp'}
                      size={28}
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
                {'Confirm your phone number'}
              </Text>

              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.lightLowImportanceText,
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '400',
                    marginTop: 48,
                    textAlign: 'left',
                  },
                  dimensions.width
                )}
              >
                {'Verify your SMS code'}
              </Text>

              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 25 },
                  dimensions.width
                )}
              >
                <TextField
                  onChangeText={newStyledTextFieldValue => {
                    try {
                      setStyledTextFieldValue4(newStyledTextFieldValue);
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
                      fontSize: 16,
                    },
                    dimensions.width
                  )}
                  placeholder={'SMS code'}
                  value={styledTextFieldValue4}
                  type={'solid'}
                  underlineColor={theme.colors.light}
                  autoFocus={true}
                  placeholderTextColor={theme.colors.lightLowImportanceText}
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
            try {
              if (styledTextFieldValue) {
                return;
              }
              navigation.navigate('AllowNotificationsScreen');
              segmentLogTrack(
                segment,
                'Confirmed Phone Number',
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
          title={'Confirm'}
        >
          {'Log In'}
        </Button>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(CreateProfileConfirmNumberScreen);
