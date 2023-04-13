import React from 'react';
import * as CustomCode from '../CustomCode';
import * as SwaggerAPIApi from '../apis/SwaggerAPIApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import segmentLogIdentify from '../global-functions/segmentLogIdentify';
import segmentLogScreen from '../global-functions/segmentLogScreen';
import segmentLogTrack from '../global-functions/segmentLogTrack';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Checkbox,
  Icon,
  ScreenContainer,
  TextField,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import * as Notifications from 'expo-notifications';
import * as WebBrowser from 'expo-web-browser';
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUpScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const getAuthToken = result => {
    return 'Bearer ' + result.accessToken;
  };

  const signUpAsUsername = textUsername => {
    return textUsername == '' ? '' : ' as ' + textUsername;
  };

  const verifySignUp = signUpResult => {
    if (
      signUpResult ==
        'Username/Email Already Exists, Please Select a New One' ||
      signUpResult == 'Sign Up Failed'
    ) {
      return true;
    }
    username = signUpResult.username;
    authToken = signUpResult.accessToken;
    internalId = signUpResult.internalId;
    return false;
  };

  const myFunctionName = response => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules
    console.log(response);
  };

  const verifyPassword = textPassword => {
    return textPassword.length < 8 ? true : false;
  };

  const verifyEmail = textEmail => {
    /*const validate = (email) => {
const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r )?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r )?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

return expression.test(String(email).toLowerCase())
}*/

    // Can also use other examples from https://mailtrap.io/blog/react-native-email-validation/
    // Regex options:
    //  /\S+@\S+/
    //  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    //  (works) /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    //  /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r )?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r )?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i

    const emailRegex =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r )?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r )?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if (emailRegex.test(textEmail)) {
      return false; // false, the email is valid
    } else {
      return true; // true, the email is invalid
    }
  };

  const verifyCheckbox = () => {
    return checkboxTermsPrivacy == false ? true : false;
  };

  const getInternalId = result => {
    return result.internalId;
  };

  const verifyName = textName => {
    return textName.length < 1 ? true : false;
  };

  const schedulePushNotification = async (expoPushToken, title, body) => {
    let receiptID = await Notifications.scheduleNotificationAsync({
      content: {
        to: expoPushToken,
        title: title,
        body: body,
      },
      trigger: { seconds: 2 },
    });

    return receiptID;
  };

  const logEventTest = () => {
    const ampInstance = CustomCode.Amplitude.getInstance();

    ampInstance.init(f8c45ddffb54d0df4461048e7b0a7371);
  };

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const swaggerAPISignUpPOST = SwaggerAPIApi.useSignUpPOST();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      segmentLogScreen(segment, 'Sign Up');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [bodyGameDay, setBodyGameDay] = React.useState(
    "See what's on today's slate for NCAAF!"
  );
  const [checkboxError, setCheckboxError] = React.useState(false);
  const [checkboxTermsPrivacy, setCheckboxTermsPrivacy] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [styledTextAreaValue, setStyledTextAreaValue] = React.useState('');
  const [styledTextAreaValue2, setStyledTextAreaValue2] = React.useState('');
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [styledTextFieldValue2, setStyledTextFieldValue2] = React.useState('');
  const [styledTextFieldValue3, setStyledTextFieldValue3] = React.useState('');
  const [styledTextFieldValue4, setStyledTextFieldValue4] = React.useState('');
  const [styledTextFieldValue5, setStyledTextFieldValue5] = React.useState('');
  const [styledTextFieldValue6, setStyledTextFieldValue6] = React.useState('');
  const [styledTextFieldValue7, setStyledTextFieldValue7] = React.useState('');
  const [styledTextFieldValue8, setStyledTextFieldValue8] = React.useState('');
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textEmail, setTextEmail] = React.useState('');
  const [textFirstName, setTextFirstName] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textPassword, setTextPassword] = React.useState('');
  const [textUsername, setTextUsername] = React.useState('');
  const [titleGameDay, setTitleGameDay] = React.useState(
    "It's college game day! 🏈"
  );

  return (
    <ScreenContainer
      scrollable={true}
      hasTopSafeArea={false}
      hasSafeArea={true}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'never'}
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
            ></View>
          </View>
        </View>

        <View
          style={StyleSheet.applyWidth(
            {
              minHeight: 50,
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
                fontSize: 28,
                fontWeight: '700',
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {'Sign Up'}
          </Text>
          {/* Error Message */}
          <View>
            {/* Debug Text */}
            <>
              {!verifySignUp(Constants['debugVar']) ? null : (
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: theme.colors.badErrorCancel,
                      fontSize: 12,
                      paddingTop: 12,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  numberOfLines={50}
                >
                  {Constants['debugVar']}
                </Text>
              )}
            </>
            {/* Email Error Text */}
            <>
              {!emailError ? null : (
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: theme.colors.badErrorCancel,
                      fontSize: 12,
                      paddingTop: 12,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                >
                  {'Please enter a valid email'}
                </Text>
              )}
            </>
            {/* Password Error Text */}
            <>
              {!passwordError ? null : (
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: theme.colors.badErrorCancel,
                      fontSize: 12,
                      paddingTop: 12,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                >
                  {'Password must be at least 8 characters'}
                </Text>
              )}
            </>
            {/* TOS Error Text */}
            <>
              {!checkboxError ? null : (
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: theme.colors.badErrorCancel,
                      fontSize: 12,
                      paddingTop: 12,
                      textAlign: 'center',
                      textTransform: 'none',
                    },
                    dimensions.width
                  )}
                >
                  {'Please agree to the Terms of Service and Privacy Policy'}
                </Text>
              )}
            </>
            {/* First Name Error Text */}
            <>
              {!firstNameError ? null : (
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: theme.colors.badErrorCancel,
                      fontSize: 12,
                      paddingTop: 12,
                      textAlign: 'center',
                      textTransform: 'none',
                    },
                    dimensions.width
                  )}
                >
                  {'Please enter a valid first name'}
                </Text>
              )}
            </>
            {/* Last Name Error Text */}
            <>
              {!lastNameError ? null : (
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: theme.colors.badErrorCancel,
                      fontSize: 12,
                      paddingTop: 12,
                      textAlign: 'center',
                      textTransform: 'none',
                    },
                    dimensions.width
                  )}
                >
                  {'Please enter a valid last name'}
                </Text>
              )}
            </>
          </View>
          {/* First Last Name */}
          <View
            style={StyleSheet.applyWidth(
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 28,
              },
              dimensions.width
            )}
          >
            {/* Styled Text Field - First Name */}
            <TextField
              onChangeText={newStyledTextFieldFirstNameValue => {
                try {
                  setStyledTextFieldValue2(newStyledTextFieldFirstNameValue);
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
                  width: '48%',
                },
                dimensions.width
              )}
              error={firstNameError}
              placeholder={'First name'}
              value={styledTextFieldValue2}
              autoFocus={true}
              maxLength={35}
              returnKeyType={'next'}
              keyboardType={'default'}
              keyboardAppearance={'default'}
              editable={true}
              autoCapitalize={'words'}
              autoCorrect={false}
              type={'solid'}
              underlineColor={theme.colors.lightLowImportanceText}
              placeholderTextColor={theme.colors.lightLowImportanceText}
            />
            {/* Styled Text Field - Last Name */}
            <TextField
              onChangeText={newStyledTextFieldLastNameValue => {
                try {
                  setStyledTextFieldValue3(newStyledTextFieldLastNameValue);
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
                  width: '48%',
                },
                dimensions.width
              )}
              error={lastNameError}
              placeholder={'Last name'}
              value={styledTextFieldValue3}
              autoFocus={false}
              maxLength={35}
              returnKeyType={'next'}
              autoCapitalize={'words'}
              keyboardAppearance={'default'}
              keyboardType={'default'}
              editable={true}
              type={'solid'}
              underlineColor={theme.colors.lightLowImportanceText}
              placeholderTextColor={theme.colors.lightLowImportanceText}
            />
          </View>
          {/* Email Username Password */}
          <View>
            {/* Styled Text Field - Email */}
            <TextField
              onChangeText={newStyledTextFieldEmailValue => {
                try {
                  setStyledTextFieldValue5(newStyledTextFieldEmailValue);
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
                  marginTop: 20,
                },
                dimensions.width
              )}
              error={emailError}
              placeholder={'Your email'}
              value={styledTextFieldValue5}
              keyboardType={'email-address'}
              type={'solid'}
              autoCorrect={false}
              returnKeyType={'next'}
              editable={true}
              keyboardAppearance={'default'}
              underlineColor={theme.colors.lightLowImportanceText}
              placeholderTextColor={theme.colors.lightLowImportanceText}
            />
            {/* Styled Text Field - Username */}
            <TextField
              onChangeText={newStyledTextFieldUsernameValue => {
                try {
                  setStyledTextFieldValue4(newStyledTextFieldUsernameValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors.divider,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 8,
                  borderColor: theme.colors.divider,
                  borderRadius: 8,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 8,
                  color: theme.colors.backgroundInverseMainFont,
                  fontSize: 16,
                  marginTop: 20,
                },
                dimensions.width
              )}
              placeholder={'Choose a username'}
              value={styledTextFieldValue4}
              type={'solid'}
              maxLength={45}
              leftIconMode={'inset'}
              autoCorrect={false}
              returnKeyType={'next'}
              autoCapitalize={'none'}
              editable={true}
              keyboardAppearance={'default'}
              keyboardType={'default'}
              underlineColor={theme.colors.lightLowImportanceText}
              placeholderTextColor={theme.colors.lightLowImportanceText}
            />
            {/* Styled Text Field - Password */}
            <TextField
              onChangeText={newStyledTextFieldPasswordValue => {
                try {
                  setStyledTextFieldValue6(newStyledTextFieldPasswordValue);
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
                  marginTop: 20,
                },
                dimensions.width
              )}
              error={passwordError}
              placeholder={'Choose a password'}
              value={styledTextFieldValue6}
              type={'solid'}
              editable={true}
              autoCorrect={false}
              secureTextEntry={true}
              assistiveText={'Your password must be at least 8 characters.'}
              underlineColor={theme.colors.lightLowImportanceText}
              placeholderTextColor={theme.colors.lightLowImportanceText}
            />
          </View>
        </View>
        {/* Sign Up Button */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 70, minHeight: 50, paddingLeft: 34, paddingRight: 34 },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', marginBottom: 28 },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth({ width: '90%' }, dimensions.width)}
            >
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      await WebBrowser.openBrowserAsync(
                        'https://www.vaultsportshq.com/terms-of-service'
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.lightLowImportanceText,
                      fontSize: 12,
                      marginBottom: 5,
                      marginTop: 5,
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {
                    'By signing up you agree to our Terms of Service and Privacy Policy.'
                  }
                </Text>
              </Touchable>
            </View>
          </View>
          {/* Button Outline */}
          <>
            {Constants['loadingSignUp'] ? null : (
              <Button
                onPress={() => {
                  const handler = async () => {
                    try {
                      setFirstNameError(verifyName(styledTextFieldValue2));
                      if (verifyName(styledTextFieldValue2)) {
                        return;
                      }
                      setLastNameError(verifyName(styledTextFieldValue3));
                      if (verifyName(styledTextFieldValue3)) {
                        return;
                      }
                      setEmailError(verifyEmail(styledTextFieldValue5));
                      if (verifyEmail(styledTextFieldValue5)) {
                        return;
                      }
                      setPasswordError(verifyPassword(styledTextFieldValue6));
                      if (verifyPassword(styledTextFieldValue6)) {
                        return;
                      }
                      setGlobalVariableValue({
                        key: 'loadingSignUp',
                        value: true,
                      });
                      const signUpResult =
                        await swaggerAPISignUpPOST.mutateAsync({
                          email: styledTextFieldValue5,
                          firstName: styledTextFieldValue2,
                          lastName: styledTextFieldValue3,
                          password: styledTextFieldValue6,
                          referralCode: 'test',
                          username: styledTextFieldValue4,
                        });
                      setGlobalVariableValue({
                        key: 'debugVar',
                        value: signUpResult,
                      });
                      setGlobalVariableValue({
                        key: 'loadingSignUp',
                        value: false,
                      });
                      if (verifySignUp(signUpResult)) {
                        return;
                      }
                      setGlobalVariableValue({
                        key: 'userFirstName',
                        value: styledTextFieldValue3,
                      });
                      setGlobalVariableValue({
                        key: 'userUsername',
                        value: textUsername,
                      });
                      const test = setGlobalVariableValue({
                        key: 'internalId',
                        value: getInternalId(signUpResult),
                      });
                      setGlobalVariableValue({
                        key: 'authToken',
                        value: getAuthToken(signUpResult),
                      });
                      setGlobalVariableValue({
                        key: 'waitlisted',
                        value: false,
                      });
                      navigation.navigate('CreateProfileBetaStack', {
                        screen: 'CreateProfile4OtherPreferencesScreen',
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
                      segmentLogTrack(
                        segment,
                        'User signed up',
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
                        test,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        test,
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
                    borderRadius: 10,
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
                title={`Sign Up${signUpAsUsername(textUsername)}`}
              >
                {'Log In'}
              </Button>
            )}
          </>
          {/* Button Outline */}
          <>
            {!Constants['loadingSignUp'] ? null : (
              <Button
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.primary,
                    borderRadius: 6,
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
                title={'Signing Up'}
                loading={true}
              />
            )}
          </>
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 28,
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
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { alignItems: 'center', justifyContent: 'center' },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.lightLowImportanceText,
                    fontFamily: 'System',
                    fontWeight: '700',
                    marginBottom: 14,
                    marginLeft: 14,
                    marginRight: 14,
                    marginTop: 14,
                  },
                  dimensions.width
                )}
              >
                {'Existing user? Log in.'}
              </Text>
            </Touchable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(SignUpScreen);
