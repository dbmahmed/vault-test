import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

export const ActivityIndicatorStyles = theme =>
  StyleSheet.create({ 'Activity Indicator': { height: 36, width: 36 } });

export const ViewStyles = theme =>
  StyleSheet.create({
    'Back button View': { width: '25%' },
    'Back button bar Jan 19 2023': {
      borderRadius: 0,
      justifyContent: 'center',
    },
    'Back button bar Jan 19 2024': {
      borderRadius: 0,
      justifyContent: 'center',
    },
    'Back button bar Jan 19 2025': {
      borderRadius: 0,
      justifyContent: 'center',
    },
    'Back/Next Buttons from tutorial': {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    'Confirm Phone Number': { marginBottom: 25, minHeight: 50 },
    'Group Options': { borderRadius: 8, overflow: 'hidden' },
    'Logo View Mar 15, 2023': {
      alignContent: 'center',
      alignItems: 'center',
      height: 50,
      justifyContent: 'center',
    },
    'Next button Mar 21, 2023': {
      borderColor: theme.colors.divider,
      borderTopWidth: 1,
      justifyContent: 'center',
      minHeight: 50,
      paddingBottom: 34,
      paddingLeft: 34,
      paddingRight: 34,
      paddingTop: 32,
    },
    'Next button from onboarding': {
      borderColor: theme.colors.divider,
      borderTopWidth: 1,
      justifyContent: 'center',
      minHeight: 50,
      paddingBottom: 34,
      paddingLeft: 34,
      paddingRight: 34,
      paddingTop: 32,
    },
    'Search Bar Top of Page': {
      paddingBottom: 10,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 12,
    },
  });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      textAlign: 'center',
    },
  });

export const DividerStyles = theme =>
  StyleSheet.create({ Divider: { height: 1 } });

export const ImageStyles = theme =>
  StyleSheet.create({ Image: { height: 100, width: 100 } });

export const FlatListStyles = theme => StyleSheet.create({ List: { flex: 1 } });

export const SurfaceStyles = theme =>
  StyleSheet.create({
    'Menu Bar Jan 19, 2023': {
      backgroundColor: theme.colors.background,
      borderRadius: 0,
    },
    Surface: { minHeight: 40 },
  });

export const ScrollViewStyles = theme =>
  StyleSheet.create({ 'Scroll View Contacts': { height: '100%' } });

export const SwiperStyles = theme =>
  StyleSheet.create({ Swiper: { height: 300, width: '100%' } });

export const TextStyles = theme =>
  StyleSheet.create({ Text: { color: theme.colors.strong } });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Text Input': {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
    },
  });

export const WebViewStyles = theme =>
  StyleSheet.create({ 'Web View': { flex: 1 } });
