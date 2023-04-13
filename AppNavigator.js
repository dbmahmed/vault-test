import * as React from 'react';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/DraftbitTheme.js';
import LinkingConfiguration from './LinkingConfiguration.js';

import AdjustUnitSizeScreen from './screens/AdjustUnitSizeScreen';
import AllowNotificationsScreen from './screens/AllowNotificationsScreen';
import BankrollNetProfitScreen from './screens/BankrollNetProfitScreen';
import BlankTestingAreaScreen from './screens/BlankTestingAreaScreen';
import ChatsScreen from './screens/ChatsScreen';
import CreateProfile4OtherPreferencesScreen from './screens/CreateProfile4OtherPreferencesScreen';
import CreateProfile5ChooseYourPromoScreen from './screens/CreateProfile5ChooseYourPromoScreen';
import CreateProfile5SyncFirstSportsbookScreen from './screens/CreateProfile5SyncFirstSportsbookScreen';
import CreateProfileConfirmNumberScreen from './screens/CreateProfileConfirmNumberScreen';
import CreateProfilePhoneNumberScreen from './screens/CreateProfilePhoneNumberScreen';
import GamesScreen from './screens/GamesScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import LoadingSplashscreenScreen from './screens/LoadingSplashscreenScreen';
import LogInScreen from './screens/LogInScreen';
import ManageBooksScreen from './screens/ManageBooksScreen';
import MyBetsBetInfoScreen from './screens/MyBetsBetInfoScreen';
import NotificationPopUpScreen from './screens/NotificationPopUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsBetaScreen from './screens/SettingsBetaScreen';
import SharpSportsFormScreen from './screens/SharpSportsFormScreen';
import SignUpScreen from './screens/SignUpScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import TestScreen from './screens/TestScreen';
import WeeklyRecapScreen from './screens/WeeklyRecapScreen';
import Welcome1Screen from './screens/Welcome1Screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Placeholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#131A2A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#FFF',
        }}
      >
        Missing Screen
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        This screen is not in a navigator.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        Go to Navigation mode, and click the + (plus) icon in the Navigator tab
        on the left side to add this screen to a Navigator.
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 16, color: '#FFF' }}>
        If the screen is in a Tab Navigator, make sure the screen is assigned to
        a tab in the Config panel on the right.
      </Text>
    </View>
  );
}
function Welcome_Stack() {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="LoadingSplashscreenScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomColor: 'transparent',
        },
        cardStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.background_inverse,
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        headerTransparent: false,
        gestureEnabled: false,
        headerTitleStyle: theme.typography.custom184,
      }}
    >
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          title: 'Sign Up',
        }}
      />
      <Stack.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          title: 'Log In',
        }}
      />
      <Stack.Screen
        name="Welcome1Screen"
        component={Welcome1Screen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          title: 'Welcome 1',
        }}
      />
      <Stack.Screen
        name="LoadingSplashscreenScreen"
        component={LoadingSplashscreenScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          title: 'Loading Splashscreen',
        }}
      />
    </Stack.Navigator>
  );
}

function BankrollStack() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="screen"
      initialRouteName="BankrollNetProfitScreen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        cardOverlayEnabled: false,
        gestureEnabled: false,
        headerTitleStyle: theme.typography.custom208,
      }}
    >
      <Stack.Screen
        name="BankrollNetProfitScreen"
        component={BankrollNetProfitScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          title: 'Bankroll/Net Profit',
        }}
      />
    </Stack.Navigator>
  );
}

function MyBetsStack() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="screen"
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
        headerTitleStyle: theme.typography.custom211,
      }}
    >
      <Stack.Screen
        name="MyBetsBetInfoScreen"
        component={MyBetsBetInfoScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
            borderBottomColor: 'transparent',
          },
          headerTintColor: theme.colors.backgroundInverseMainFont,
          headerTitle: 'Bet Info',
          headerTitleAlign: 'center',
          headerTitleAllowFontScaling: true,
          gestureEnabled: true,
          headerTitleStyle: theme.typography.custom213,
          headerBackImage: ({ tintColor }) => (
            <Icon
              name="Entypo/chevron-thin-left"
              size={Platform.OS === 'ios' ? 21 : 24}
              color={tintColor}
              style={[styles.headerIcon, styles.headerIconLeft]}
            />
          ),
          headerBackTitle: 'Back',
          title: 'My Bets - Bet Info',
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          cardOverlayEnabled: true,
          gestureEnabled: false,
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="WeeklyRecapScreen"
        component={WeeklyRecapScreen}
        options={{
          headerShown: false,
          title: 'Weekly Recap',
        }}
      />
    </Stack.Navigator>
  );
}

function GamesStack() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="screen"
      initialRouteName="GamesScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomColor: 'transparent',
        },
        headerTintColor: theme.colors.background_inverse,
        headerTitle: 'VAULT',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
        headerTitleStyle: theme.typography.custom97,
      }}
    >
      <Stack.Screen
        name="GamesScreen"
        component={GamesScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          title: 'Games',
        }}
      />
    </Stack.Navigator>
  );
}

function ChatsStack() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="screen"
      initialRouteName="ChatsScreen"
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          title: 'Chats',
        }}
      />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="MyBetsStack"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.lightLowImportanceText,
        activeBackgroundColor: theme.colors.divider,
        inactiveBackgroundColor: theme.colors.divider,
        labelStyle: theme.typography.custom98,
        style: {
          backgroundColor: theme.colors.divider,
          borderTopColor: 'transparent',
        },
      }}
      backBehavior="none"
    >
      <Tab.Screen
        name="GamesStack"
        component={GamesStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Ionicons/ios-flag"
              size={25}
              color={
                focused
                  ? theme.colors.primary
                  : theme.colors.lightLowImportanceText
              }
            />
          ),
          tabBarLabel: 'Games',
          title: 'Games Stack',
        }}
      />
      <Tab.Screen
        name="BankrollStack"
        component={BankrollStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialCommunityIcons/chart-line"
              size={25}
              color={
                focused
                  ? theme.colors.primary
                  : theme.colors.lightLowImportanceText
              }
            />
          ),
          tabBarLabel: 'Money',
          title: 'Bankroll Stack',
        }}
      />
      <Tab.Screen
        name="MyBetsStack"
        component={MyBetsStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Ionicons/ios-person-circle"
              size={25}
              color={
                focused
                  ? theme.colors.primary
                  : theme.colors.lightLowImportanceText
              }
            />
          ),
          tabBarLabel: 'Me',
          title: 'My Bets Stack',
        }}
      />
      <Tab.Screen
        name="ChatsStack"
        component={ChatsStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Entypo/chat"
              size={25}
              color={
                focused
                  ? theme.colors.primary
                  : theme.colors.lightLowImportanceText
              }
            />
          ),
          tabBarLabel: 'Chats',
          title: 'Chats Stack',
        }}
      />
    </Tab.Navigator>
  );
}

function CreateProfileBetaStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="CreateProfile4OtherPreferencesScreen"
      screenOptions={{
        headerTransparent: true,
        gestureEnabled: false,
        gestureResponseDistance: { vertical: null, horizontal: 50 },
        headerTitleStyle: theme.typography.custom217,
      }}
    >
      <Stack.Screen
        name="CreateProfile4OtherPreferencesScreen"
        component={CreateProfile4OtherPreferencesScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          gestureEnabled: false,
          title: 'Create Profile 4 - Other Preferences',
        }}
      />
      <Stack.Screen
        name="CreateProfile5SyncFirstSportsbookScreen"
        component={CreateProfile5SyncFirstSportsbookScreen}
        options={{
          title: 'Create Profile 5 - Sync First Sportsbook',
        }}
      />
      <Stack.Screen
        name="ManageBooksScreen"
        component={ManageBooksScreen}
        options={{
          title: 'Manage Books',
        }}
      />
      <Stack.Screen
        name="CreateProfile5ChooseYourPromoScreen"
        component={CreateProfile5ChooseYourPromoScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          gestureEnabled: false,
          title: 'Create Profile 5 - Choose Your Promo',
        }}
      />
      <Stack.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
        options={{
          title: 'Leaderboard',
        }}
      />
      <Stack.Screen
        name="CreateProfilePhoneNumberScreen"
        component={CreateProfilePhoneNumberScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          gestureEnabled: false,
          title: 'Create Profile - Phone Number',
        }}
      />
      <Stack.Screen
        name="CreateProfileConfirmNumberScreen"
        component={CreateProfileConfirmNumberScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          gestureEnabled: false,
          title: 'Create Profile - Confirm Number',
        }}
      />
      <Stack.Screen
        name="AllowNotificationsScreen"
        component={AllowNotificationsScreen}
        options={{
          title: 'Allow Notifications',
        }}
      />
    </Stack.Navigator>
  );
}

function CreateChatStack() {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="none"
      initialRouteName="TestScreen"
      screenOptions={{
        headerTransparent: true,
        cardOverlayEnabled: true,
        gestureEnabled: true,
        gestureResponseDistance: { vertical: 135, horizontal: null },
        gestureVelocityImpact: 0.3,
        gestureDirection: 'horizontal',
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
        options={{
          gestureEnabled: true,
          title: 'Subscription',
        }}
      />
      <Stack.Screen
        name="BlankTestingAreaScreen"
        component={BlankTestingAreaScreen}
        options={{
          gestureEnabled: true,
          title: 'Blank Testing Area',
        }}
      />
      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{
          cardOverlayEnabled: true,
          gestureEnabled: true,
          animationEnabled: true,
          title: 'Test Screen',
        }}
      />
    </Stack.Navigator>
  );
}

export default function RootAppNavigator() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator
        mode="modal"
        headerMode="none"
        initialRouteName="Welcome_Stack"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
            borderBottomColor: 'transparent',
          },
          headerTintColor: theme.colors.background_inverse,
          headerTitleAllowFontScaling: false,
          headerTransparent: false,
          cardOverlayEnabled: true,
          gestureEnabled: false,
          headerTitleStyle: theme.typography.custom47,
          headerBackTitle: ' ',
        }}
      >
        <Stack.Screen
          name="SharpSportsFormScreen"
          component={SharpSportsFormScreen}
          options={{
            title: 'SharpSportsForm',
          }}
        />
        <Stack.Screen
          name="SettingsBetaScreen"
          component={SettingsBetaScreen}
          options={{
            title: 'Settings (Beta)',
          }}
        />
        <Stack.Screen
          name="AdjustUnitSizeScreen"
          component={AdjustUnitSizeScreen}
          options={{
            title: 'Adjust Unit Size',
          }}
        />
        <Stack.Screen
          name="NotificationPopUpScreen"
          component={NotificationPopUpScreen}
          options={{
            title: 'NotificationPopUp',
          }}
        />
        <Stack.Screen name="Welcome_Stack" component={Welcome_Stack} />
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
        <Stack.Screen
          name="CreateProfileBetaStack"
          component={CreateProfileBetaStack}
        />
        <Stack.Screen name="CreateChatStack" component={CreateChatStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({
    ios: {
      marginRight: 6,
    },
  }),
  headerIconRight: Platform.select({
    ios: {
      marginLeft: 6,
    },
  }),
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({
    ios: {
      marginLeft: 8,
    },
  }),
  headerContainerRight: Platform.select({
    ios: {
      marginRight: 8,
    },
  }),
  headerLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerLabel: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
});
