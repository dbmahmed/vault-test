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

const AdjustUnitSizeScreen = props => {
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
      segmentLogScreen(segment, 'Adjust Unit Size');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [styledTextFieldValue2, setStyledTextFieldValue2] = React.useState('');
  const [userDefaultUnitSize, setUserDefaultUnitSize] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={true} scrollable={true}>
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
              />
            </View>
          </View>

          <View
            style={StyleSheet.applyWidth({ minHeight: 50 }, dimensions.width)}
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
                {'Adjust your unit size'}
              </Text>

              <View
                style={StyleSheet.applyWidth(
                  { marginLeft: '4%', marginRight: '4%', marginTop: 25 },
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
                  placeholder={'Must be greater or equal to 1'}
                  type={'solid'}
                  autoFocus={true}
                  leftIconMode={'outset'}
                  leftIconName={'MaterialIcons/attach-money'}
                  editable={true}
                  keyboardType={'number-pad'}
                  returnKeyLabel={'Next'}
                  returnKeyType={'next'}
                  value={userDefaultUnitSize}
                  defaultValue={'10'}
                  placeholderTextColor={theme.colors.lightLowImportanceText}
                />
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', marginTop: 35 },
                  dimensions.width
                )}
              >
                {/* Save */}
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        if (userDefaultUnitSizeError(userDefaultUnitSize)) {
                          return;
                        }
                        navigation.goBack();
                        setGlobalVariableValue({
                          key: 'toggleMenuModal',
                          value: true,
                        });
                        await SwaggerAPIApi.saveUnitSizeGET(Constants, {
                          internalId: Constants['internalId'],
                          unitSize: userDefaultUnitSize,
                        });
                        segmentLogTrack(
                          segment,
                          'Unit Size Adjusted',
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
                      color: theme.colors.strongTextOnGoldButtons,
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      textAlign: 'center',
                      width: 100,
                    },
                    dimensions.width
                  )}
                  title={'Save'}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(AdjustUnitSizeScreen);
