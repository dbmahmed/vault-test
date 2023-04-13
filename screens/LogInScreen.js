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
  Icon,
  ScreenContainer,
  TextField,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import {
  Modal,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LogInScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const verifyLogin = loginResult => {
    if (loginResult == 'Invalid Username/Email or Password') {
      return true;
    }
    username = loginResult.username;
    authToken = loginResult.accessToken;
    internalId = loginResult.internalId;
    return false;
  };

  // Popup that prompts the user to enter their email for a password reset email to be sent to them.
  const forgetPasswordModal = () => {
    //import React, { useState } from "react";
    //import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";

    const App = () => {
      const [modalVisible, setModalVisible] = useState(false);
      return (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Forget your password?</Text>
                <Text style={styles.modalTextSmall}>
                  We'll send you an email so you can reset it.
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonSendEmail]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textSendEmail}>Send Email</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>
        </View>
      );
    };

    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: '#3a3838',
        borderRadius: 6,
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 35,
        paddingBottom: 27,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 3,
      },
      button: {
        borderRadius: 6,
        paddingRight: 32,
        paddingLeft: 32,
        paddingTop: 16,
        paddingBottom: 16,
        elevation: 0,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonSendEmail: {
        backgroundColor: '#BFAB80',
        marginBottom: 10,
      },
      buttonClose: {
        backgroundColor: 'transparent',
      },
      textSendEmail: {
        color: '#0f0f0f',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '14',
      },
      textStyle: {
        color: '#FE2900',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalTextSmall: {
        marginBottom: 16,
        color: '#F2F2F2',
        fontWeight: 'bold',
        fontSize: '14',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: '20',
        color: '#F2F2F2',
        textAlign: 'center',
      },
    });

    //export default App;

    //////// See https://reactnative.dev/docs/modal
    //////// Still need: Email text input area, send email button and link //////// through Zapier or whatever integration needed,
    //////// set "Forget your password?" touchable as open
    //////// Ideally remove cancel button and make clicking outside area
    //////// close the modal. Make button get darker when pressed (see other
    //////// main buttons to understand what I mean.

    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules
  };

  const forgotPasswordModalTwo = () => {
    const [visible, setVisible] = React.useState(false);

    // methods that handle a component's visibility state
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    // define styles for the Modal here
    const containerStyle = {
      backgroundColor: '#3a3838',
      paddingLeft: 35,
      paddingRight: 35,
      paddingTop: 35,
      paddingBottom: 27,
      marginLeft: 32,
      marginRight: 32,
      borderRadius: 6,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 3,
    };

    return (
      <Provider>
        <Portal>
          <Modal
            animationType="slide"
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#F2F2F2',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 10,
              }}
            >
              Forget your password?
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#F2F2F2',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 16,
              }}
            >
              We'll send you an email so you can reset it.
            </Text>
          </Modal>
        </Portal>
        {/* Below is a Button Component */}
        {/* You can use any Touchable component from React Native */}
        <Button
          style={{ marginTop: 0 }}
          labelStyle={{
            fontFamily: 'System',
            fontSize: 14,
            color: '#A5ADB7',
            fontWeight: '700',
            textTransform: 'none',
            textSpacing: '0',
          }}
          onPress={showModal}
        >
          Forget your password?
        </Button>
      </Provider>
    );
  };

  const getInternalId = result => {
    return result.internalId;
  };

  const initializeSegment = () => {
    return segment;
  };

  const getAuthToken = result => {
    return 'Bearer ' + result.accessToken;
  };

  const verifyPassword = textPassword => {
    return textPassword.length < 8 ? true : false;
  };

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const swaggerAPIForgotPasswordGET = SwaggerAPIApi.useForgotPasswordGET();
  const swaggerAPIResetPasswordGET = SwaggerAPIApi.useResetPasswordGET();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      segmentLogScreen(segment, 'Log In');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [alertTitle1, setAlertTitle1] = React.useState(
    'Your password has been reset'
  );
  const [forgotPasswordError, setForgotPasswordError] = React.useState(false);
  const [forgotResetPassword, setForgotResetPassword] = React.useState(true);
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [resetPasswordError, setResetPasswordError] = React.useState(false);
  const [styledTextAreaValue, setStyledTextAreaValue] = React.useState('');
  const [styledTextAreaValue2, setStyledTextAreaValue2] = React.useState('');
  const [styledTextAreaValue3, setStyledTextAreaValue3] = React.useState('');
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [styledTextFieldValue2, setStyledTextFieldValue2] = React.useState('');
  const [styledTextFieldValue3, setStyledTextFieldValue3] = React.useState('');
  const [styledTextFieldValue4, setStyledTextFieldValue4] = React.useState('');
  const [styledTextFieldValue5, setStyledTextFieldValue5] = React.useState('');
  const [styledTextFieldValue6, setStyledTextFieldValue6] = React.useState('');
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors.background },
        dimensions.width
      )}
      hasSafeArea={true}
      scrollable={true}
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
            />
          </View>
        </View>

        <View
          style={StyleSheet.applyWidth(
            { justifyContent: 'space-between' },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth({ minHeight: 50 }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth({ minHeight: 50 }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    minHeight: 50,
                    paddingLeft: '4%',
                    paddingRight: '4%',
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
                  {'Log In'}
                </Text>

                <View>
                  <>
                    {!verifyLogin(Constants['debugVar']) ? null : (
                      <Text
                        style={StyleSheet.applyWidth(
                          {
                            alignSelf: 'center',
                            color: theme.colors.badErrorCancel,
                            paddingTop: 12,
                            textAlign: 'center',
                          },
                          dimensions.width
                        )}
                      >
                        {Constants['debugVar']}
                      </Text>
                    )}
                  </>
                </View>
                {/* Email Password */}
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
                        marginTop: 28,
                      },
                      dimensions.width
                    )}
                    placeholder={'Email or Username'}
                    value={styledTextFieldValue5}
                    type={'solid'}
                    autoFocus={true}
                    autoCorrect={false}
                    returnKeyType={'next'}
                    autoCapitalize={'none'}
                    editable={true}
                    keyboardAppearance={'default'}
                    keyboardType={'email-address'}
                    placeholderTextColor={theme.colors.lightLowImportanceText}
                  />
                  {/* Styled Text Field - Password */}
                  <TextField
                    onChangeText={newStyledTextFieldPasswordValue => {
                      try {
                        setStyledTextFieldValue6(
                          newStyledTextFieldPasswordValue
                        );
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
                    placeholder={'Password'}
                    value={styledTextFieldValue6}
                    type={'solid'}
                    secureTextEntry={true}
                    autoCorrect={false}
                    returnKeyType={'next'}
                    autoCapitalize={'none'}
                    keyboardAppearance={'default'}
                    keyboardType={'default'}
                    editable={true}
                    underlineColor={theme.colors.lightLowImportanceText}
                    placeholderTextColor={theme.colors.lightLowImportanceText}
                  />
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      marginTop: 10,
                    },
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      try {
                        setGlobalVariableValue({
                          key: 'toggleForgotPasswordModal',
                          value: true,
                        });
                        segmentLogTrack(
                          segment,
                          'Forgot password clicked',
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
                      { alignItems: 'center', justifyContent: 'center' },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.lightLowImportanceText,
                          fontFamily: 'System',
                          fontWeight: '400',
                          marginBottom: 8,
                          marginTop: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'Forgot password?'}
                    </Text>
                  </Touchable>
                </View>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  {
                    marginTop: 40,
                    minHeight: 50,
                    paddingLeft: 34,
                    paddingRight: 34,
                  },
                  dimensions.width
                )}
              >
                {/* Button Outline */}
                <>
                  {Constants['loadingLogin'] ? null : (
                    <Button
                      onPress={() => {
                        const handler = async () => {
                          try {
                            setGlobalVariableValue({
                              key: 'loadingLogin',
                              value: true,
                            });
                            const loginResult = await SwaggerAPIApi.loginPOST(
                              Constants,
                              {
                                loginIdentity: styledTextFieldValue5,
                                passwrd: styledTextFieldValue6,
                              }
                            );
                            setGlobalVariableValue({
                              key: 'loadingLogin',
                              value: false,
                            });
                            setGlobalVariableValue({
                              key: 'debugVar',
                              value: loginResult,
                            });
                            if (verifyLogin(loginResult)) {
                              return;
                            }
                            const test = setGlobalVariableValue({
                              key: 'internalId',
                              value: getInternalId(loginResult),
                            });
                            setGlobalVariableValue({
                              key: 'authToken',
                              value: getAuthToken(loginResult),
                            });
                            setGlobalVariableValue({
                              key: 'waitlisted',
                              value: false,
                            });
                            navigation.navigate('MainTabNavigator', {
                              screen: 'MyBetsStack',
                              params: { screen: 'ProfileScreen' },
                            });
                            segmentLogTrack(
                              segment,
                              'User logged in',
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
                              styledTextFieldValue5,
                              undefined,
                              test,
                              styledTextFieldValue5,
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
                          height: 54,
                          textAlign: 'center',
                        },
                        dimensions.width
                      )}
                      loading={false}
                      disabled={false}
                      title={'Log In'}
                    >
                      {'Log In'}
                    </Button>
                  )}
                </>
                {/* Button Outline */}
                <>
                  {!Constants['loadingLogin'] ? null : (
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
                      title={'Logging In'}
                      loading={true}
                    />
                  )}
                </>
              </View>
            </View>
          </View>

          <View
            style={StyleSheet.applyWidth(
              { justifyContent: 'center', marginTop: 28 },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    navigation.navigate('Welcome_Stack', {
                      screen: 'SignUpScreen',
                    });
                    segmentLogTrack(
                      segment,
                      'Navigate to Sign Up',
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
                  {'Not a member? Sign up!'}
                </Text>
              </Touchable>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* Forgot Password Modal */}
      <Modal
        style={StyleSheet.applyWidth(
          { backgroundColor: theme.colors.background },
          dimensions.width
        )}
        visible={Constants['toggleForgotPasswordModal']}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background,
              borderRadius: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '100%',
              justifyContent: 'space-between',
            },
            dimensions.width
          )}
        >
          <View>
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
                        key: 'toggleForgotPasswordModal',
                        value: false,
                      });
                      setForgotResetPassword(true);
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
                      {'Back'}
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
              />
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
                { paddingLeft: '4%', paddingRight: '4%', paddingTop: 18 },
                dimensions.width
              )}
            >
              {/* Forgot Your Password View */}
              <>
                {!forgotResetPassword ? null : (
                  <View>
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontSize: 28,
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {'Forgot your password?'}
                    </Text>

                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'flex-start',
                          color: theme.colors.lightLowImportanceText,
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '400',
                          marginTop: 18,
                          textAlign: 'left',
                        },
                        dimensions.width
                      )}
                    >
                      {
                        "Enter the email associated with your account. We'll send you a link to reset your password."
                      }
                    </Text>
                    {/* Styled Text Field - Email */}
                    <TextField
                      onChangeText={newStyledTextFieldEmailValue => {
                        try {
                          setStyledTextFieldValue2(
                            newStyledTextFieldEmailValue
                          );
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
                          marginTop: 28,
                        },
                        dimensions.width
                      )}
                      placeholder={'Enter email'}
                      value={styledTextFieldValue2}
                      underlineColor={theme.colors.lightLowImportanceText}
                      autoFocus={true}
                      type={'solid'}
                      keyboardType={'email-address'}
                      keyboardAppearance={'default'}
                      editable={true}
                      autoCorrect={false}
                      returnKeyType={'next'}
                      autoCapitalize={'none'}
                      placeholderTextColor={theme.colors.lightLowImportanceText}
                    />
                    <>
                      {!forgotPasswordError ? null : (
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'flex-start',
                              color: theme.colors.badErrorCancel,
                              fontSize: 12,
                              marginTop: 6,
                              textAlign: 'left',
                            },
                            dimensions.width
                          )}
                        >
                          {'Please enter a valid email address.'}
                        </Text>
                      )}
                    </>
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', marginTop: 42 },
                        dimensions.width
                      )}
                    >
                      {/* Submit */}
                      <>
                        {submitLoading ? null : (
                          <Button
                            onPress={() => {
                              const handler = async () => {
                                try {
                                  setSubmitLoading(true);
                                  const forgotPasswordResult =
                                    await swaggerAPIForgotPasswordGET.mutateAsync(
                                      { email: styledTextFieldValue2 }
                                    );
                                  setForgotPasswordError(forgotPasswordResult);
                                  setSubmitLoading(false);
                                  if (forgotPasswordResult) {
                                    return;
                                  }
                                  setForgotResetPassword(false);
                                  segmentLogTrack(
                                    segment,
                                    'Password reset submitted',
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
                              },
                              dimensions.width
                            )}
                            title={'Submit'}
                          />
                        )}
                      </>
                      {/* Submit Loading */}
                      <>
                        {!submitLoading ? null : (
                          <Button
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors.primary,
                                borderRadius: 8,
                                color: theme.colors.strongTextOnGoldButtons,
                                fontFamily: 'System',
                                fontSize: 16,
                                fontWeight: '700',
                                textAlign: 'center',
                              },
                              dimensions.width
                            )}
                            title={'Submit'}
                            loading={true}
                          />
                        )}
                      </>
                    </View>
                  </View>
                )}
              </>
              {/* Reset Your Password View */}
              <>
                {forgotResetPassword ? null : (
                  <View>
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontSize: 28,
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {'Reset your password'}
                    </Text>

                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'flex-start',
                          color: theme.colors.lightLowImportanceText,
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '400',
                          marginTop: 18,
                          textAlign: 'left',
                        },
                        dimensions.width
                      )}
                    >
                      {'Enter the code that we sent to your email.'}
                    </Text>
                    {/* Styled Text Field - Code */}
                    <TextField
                      onChangeText={newStyledTextFieldCodeValue => {
                        try {
                          setStyledTextFieldValue3(newStyledTextFieldCodeValue);
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
                          marginTop: 28,
                        },
                        dimensions.width
                      )}
                      placeholder={'Enter code'}
                      value={styledTextFieldValue3}
                      placeholderTextColor={theme.colors.lightLowImportanceText}
                      autoFocus={true}
                      type={'solid'}
                      autoCorrect={false}
                      returnKeyType={'next'}
                      editable={true}
                      selectTextOnFocus={true}
                      keyboardAppearance={'default'}
                      keyboardType={'default'}
                      underlineColor={theme.colors.lightLowImportanceText}
                    />
                    <>
                      {!resetPasswordError ? null : (
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'flex-start',
                              color: theme.colors.badErrorCancel,
                              fontSize: 12,
                              marginTop: 6,
                              textAlign: 'left',
                            },
                            dimensions.width
                          )}
                        >
                          {'Please enter a valid code.'}
                        </Text>
                      )}
                    </>
                    {/* Styled Text Field - New Password */}
                    <TextField
                      onChangeText={newStyledTextFieldNewPasswordValue => {
                        try {
                          setStyledTextFieldValue4(
                            newStyledTextFieldNewPasswordValue
                          );
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
                      error={newPasswordError}
                      placeholder={'New password'}
                      value={styledTextFieldValue4}
                      type={'solid'}
                      placeholderTextColor={theme.colors.lightLowImportanceText}
                      assistiveText={'Password must be at least 8 characters.'}
                      secureTextEntry={true}
                      selectTextOnFocus={true}
                      autoCorrect={false}
                      returnKeyType={'next'}
                      autoCapitalize={'none'}
                      keyboardAppearance={'default'}
                      keyboardType={'default'}
                      editable={true}
                      underlineColor={theme.colors.lightLowImportanceText}
                    />
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', marginTop: 42 },
                        dimensions.width
                      )}
                    >
                      {/* Reset Password */}
                      <Button
                        onPress={() => {
                          const handler = async () => {
                            try {
                              setNewPasswordError(
                                verifyPassword(styledTextFieldValue4)
                              );
                              if (verifyPassword(styledTextFieldValue4)) {
                                return;
                              }
                              const resetPasswordResult =
                                await swaggerAPIResetPasswordGET.mutateAsync({
                                  code: styledTextFieldValue3,
                                  password: styledTextFieldValue4,
                                });
                              setResetPasswordError(resetPasswordResult);
                              if (resetPasswordResult) {
                                return;
                              }
                              setGlobalVariableValue({
                                key: 'toggleForgotPasswordModal',
                                value: false,
                              });
                              setForgotResetPassword(true);
                              Utils.showAlert({
                                title: 'Your password has been reset',
                                message: 'Log in using your new password',
                                buttonText: '',
                              });
                              segmentLogTrack(
                                segment,
                                'Password reset',
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
                          },
                          dimensions.width
                        )}
                        title={'Reset Password'}
                      />
                    </View>
                  </View>
                )}
              </>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(LogInScreen);
