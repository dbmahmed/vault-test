import * as React from 'react';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator, AppState } from 'react-native';
import { Provider as ThemeProvider } from '@draftbit/ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createClient,
  AnalyticsProvider,
} from '@segment/analytics-react-native';

import AppNavigator from './AppNavigator';
import DraftbitTheme from './themes/DraftbitTheme.js';
import cacheAssetsAsync from './config/cacheAssetsAsync';
import { GlobalVariableProvider } from './config/GlobalVariableContext';
SplashScreen.preventAutoHideAsync();
const segmentClient = createClient({
  writeKey: 'ylFQIp2bMRiL7lGDcBD9i8TvxpEI7MF5',
  trackAppLifecycleEvents: true,
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const queryClient = new QueryClient();

const App = () => {
  const [isReady, setIsReady] = React.useState(false);
  const fontsLoaded = true;

  React.useEffect(() => {
    async function prepare() {
      try {
        await cacheAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (isReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded]);

  if (!isReady || !fontsLoaded) {
    return null;
  }

  return (
    <AnalyticsProvider client={segmentClient}>
      <SafeAreaProvider
        initialMetrics={initialWindowMetrics}
        onLayout={onLayoutRootView}
      >
        <GlobalVariableProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={DraftbitTheme}>
              <AppNavigator />
            </ThemeProvider>
          </QueryClientProvider>
        </GlobalVariableProvider>
      </SafeAreaProvider>
    </AnalyticsProvider>
  );
};

export default App;
