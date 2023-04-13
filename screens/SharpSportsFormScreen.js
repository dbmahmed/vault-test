import React from 'react';
import * as CustomCode from '../CustomCode';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as SharpSports from '../custom-files/SharpSports';
import segmentLogScreen from '../global-functions/segmentLogScreen';
import segmentLogTrack from '../global-functions/segmentLogTrack';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Icon, ScreenContainer, Touchable, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import { StatusBar, Text, View, useWindowDimensions } from 'react-native';

const SharpSportsFormScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const refreshSportsbook = updatedSportsbook => {
    return updatedSportsbook + 1;
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
      segmentLogScreen(segment, 'Sync A Sportsbook');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        {
          backgroundColor: theme.colors['White SS Background'],
          paddingBottom: 28,
        },
        dimensions.width
      )}
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      {/* Menu Bar */}
      <View
        style={StyleSheet.applyWidth(
          { borderRadius: 0, height: 50, justifyContent: 'center' },
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
                  setGlobalVariableValue({
                    key: 'updatedSportsBook',
                    value: refreshSportsbook(Constants['updatedSportsBook']),
                  });
                  segmentLogTrack(
                    segment,
                    'Navigated Back',
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
                  { alignItems: 'center', flexDirection: 'row', height: 50 },
                  dimensions.width
                )}
              >
                {/* Back */}
                <Icon
                  name={'Ionicons/ios-chevron-back'}
                  size={32}
                  color={theme.colors['Strong_Text_on_gold_buttons']}
                />
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Strong_Text_on_gold_buttons'],
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
                width: '50%',
              },
              dimensions.width
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Strong_Text_on_gold_buttons'],
                  fontFamily: 'System',
                  fontSize: 17,
                  fontWeight: '700',
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {'Sync A Sportsbook'}
            </Text>
          </View>
          {/* Right Button */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'flex-end', borderRadius: 0, width: '25%' },
              dimensions.width
            )}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(SharpSportsFormScreen);
