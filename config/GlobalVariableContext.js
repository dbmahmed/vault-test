import React from "react";
import { View, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeviceVariables = {
  AUTH_HEADER: "some AUTH_HEADER",
  GS_API_KEY: "x65f7n98t9nq",
  USER: {},
  authToken:
    "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoieiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkJhc2ljVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiYTk4MWQyMzItZjU2MS00ZDhlLWFjMzQtOTgyNzNmYzI2MDAwIiwiZXhwIjoxNjgzNDIxOTIyLCJpc3MiOiJodHRwczovL3ZhdWx0c3BvcnRzaHEuY29tIiwiYXVkIjoiaHR0cHM6Ly92YXVsdHNwb3J0c2hxLmNvbSJ9.d6ewDLeuLx1IRQHLleqGK_HktsFwg1YjeNhredZJOTs",
  favLeague: [],
  favTeam: [],
  gamesScreenTutorial: false,
  lastBetRefresh: 0,
  meScreenTutorial: false,
  moneyScreenTutorial: false,
  oddsDisplayedDevice: ["basketball_nba", "spreads"],
  READ_ONLY_GS_CHANNELS: ["Announcements_b0843e02-c182-46af-a609-9c6e87ba25cd"],
  profilePictureUrl: "",
  profileTabDevice: "historical",
  pushNotificationsAllowed: false,
  showAllowNotificationsBackButton: false,
  showAllowNotificationsNextButton: false,
  showVaultLogo: false,
  subscriptionPaidAnnually: true,
  subscriptionPriceAnnual: 59.99,
  testVar: true,
  userDefaultUnitSize: "",
  userFirstName: "",
  userPushNotificationsBuffer: true,
  userPushNotificationsPrompt: false,
  userUsername: "",
  username: "",
  waitlisted: false,
};
const AppVariables = {
  CHANNEL: "",
  GS_USER: {},
  GS_USER_TOKEN: "",
  THREAD: "",
  combinedFiltersArray: [],
  debugVar: "",
  dummyVar: 15,
  filterBetStatus: "win",
  filterBetStatusApply: [],
  filterBetType: [],
  filterBetTypeApply: [],
  filterBonus: [],
  filterBonusApply: [],
  filterDate: [],
  filterDateApply: [],
  filterLeague: [],
  filterLeagueApply: [],
  filterLiveBet: [],
  filterLiveBetApply: [],
  filterOutcome: [],
  filterOutcomeApply: [],
  filterSportsbook: [],
  filterSportsbookApply: [],
  filterTeam: [],
  filterTeamApply: [],
  filterUnder: [],
  filterUnderApply: [],
  filterUnderdog: [],
  filterUnderdogApply: [],
  gamesTutorial: 1,
  globalFilters: "",
  initLoginCheck: 0,
  internalId: "9b3a52cc-7e94-465c-a030-57ce41a01088",
  loadingLogin: false,
  loadingRefresh: false,
  loadingSignUp: false,
  meTutorial: 1,
  mockSportsbookSyncModal: false,
  moneyTutorial: 1,
  oddsDisplayed: ["basketball_nba", "spreads"],
  profileCardSettings: false,
  profileTab: "historical",
  refreshPressCount: 3,
  ringLegendShown: false,
  selectedGame: [
    {
      id: "f9513b80a2533875a0d938447550ed0b",
      league: "basketball_nba",
      betType: "spreads",
      awayTeam: "Phoenix Suns",
      homeTeam: "New Orleans Pelicans",
      awayScore: 51,
      completed: false,
      homeScore: 46,
      startTime: "2022-04-23T01:30:00Z",
      bookmakers: [
        {
          key: "draftkings",
          title: "DraftKings",
          appUrl:
            "https://apps.apple.com/us/app/draftkings-sportsbook-casino/id1375031369",
          totalLine: null,
          lastUpdate: "04/22/2022 02:28:23",
          affiliateUrl: null,
          awayTeamLine: "-1.5",
          homeTeamLine: "1.5",
          cleansedTitle: "DraftKings",
          affiliateOffer: null,
          overOddsAmerican: null,
          underOddsAmerican: null,
          awayTeamOddsAmerican: "-110",
          homeTeamOddsAmerican: "-110",
        },
      ],
      winningTeam: 2,
    },
  ],
  selectedSportsbook: "Aggregate",
  selectedSportsbookChart: "init",
  shareScreenName: "username",
  showSportsbooksDisconnectedPrompt: true,
  sportsbooksSyncedVar: false,
  statsAtRisk: 0,
  statsLosses: 0,
  statsNetProfit: 0,
  statsPendingAmount: 0,
  statsPendingCount: 0,
  statsPushes: 0,
  statsWins: 0,
  stupidDoubleBack: 0,
  testVarTwo: true,
  toWinLosing: 0,
  toWinWinning: 0,
  toggleAdvancedFilters: false,
  toggleBankrollValues: "",
  toggleCreateChatModal: false,
  toggleDeleteAccountModal: false,
  toggleFiltersModal: false,
  toggleForgotPasswordModal: false,
  toggleGameInfoModal: false,
  toggleGamesModal: false,
  toggleGamesSearchBar: false,
  toggleGradesModal: false,
  toggleHistoricalBetsList: true,
  toggleLeaguesModal: false,
  toggleMenuModal: false,
  toggleMultilegBetInfo: "",
  toggleMyBetsAnalysis: "",
  toggleMyBetsMoreInfoModal: false,
  toggleOnboardSubModal: false,
  togglePendingBetsList: false,
  toggleRemoveSportsbookActionSheet: false,
  toggleRemoveSportsbookModal: false,
  toggleShareModal: false,
  toggleSignOutActionSheet: false,
  toggleSignOutModal: false,
  toggleSportsbookInfo: "",
  toggleSportsbookModal: false,
  toggleSportsbookSyncInfoModal: false,
  totalBankroll: 0,
  tryForADay: false,
  updatedSportsBook: 0,
  userPushNotificationRemind: true,
  waitlistedTimer: "",
  weeklyRecapSlide: 1,
  x_requests_remaining: "",
  x_requests_used: "",
};
const GlobalVariableContext = React.createContext();
const GlobalVariableUpdater = React.createContext();

// Attempt to parse a string as JSON. If the parse fails, return the string as-is.
// This is necessary to account for variables which are already present in local
// storage, but were not stored in JSON syntax (e.g. 'hello' instead of '"hello"').
function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

class GlobalVariable {
  /**
   *  Filters an object of key-value pairs for those that should be
   *  persisted to storage, and persists them.
   *
   *  @param values Record<string, string>
   */
  static async syncToLocalStorage(values) {
    const update = Object.entries(values)
      .filter(([key]) => key in DeviceVariables)
      .map(([key, value]) => [key, JSON.stringify(value)]);

    if (update.length > 0) {
      await AsyncStorage.multiSet(update);
    }

    return update;
  }

  static async loadLocalStorage() {
    const entries = await AsyncStorage.multiGet(Object.keys(DeviceVariables));

    // If values isn't set, use the default. These will be written back to
    // storage on the next render.
    const withDefaults = entries.map(([key, value]) => [
      key,
      value ? tryParseJson(value) : DeviceVariables[key],
    ]);

    return Object.fromEntries(withDefaults);
  }
}

class State {
  static defaultValues = {
    ...AppVariables,
    ...DeviceVariables,
  };

  static reducer(state, { type, payload }) {
    switch (type) {
      case "RESET":
        return { values: State.defaultValues, __loaded: true };
      case "LOAD_FROM_ASYNC_STORAGE":
        return { values: { ...state.values, ...payload }, __loaded: true };
      case "UPDATE":
        return state.__loaded
          ? {
              ...state,
              values: {
                ...state.values,
                [payload.key]: payload.value,
              },
            }
          : state;
      default:
        return state;
    }
  }

  static initialState = {
    __loaded: false,
    values: State.defaultValues,
  };
}

export function GlobalVariableProvider({ children }) {
  const [state, dispatch] = React.useReducer(State.reducer, State.initialState);

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  // This effect runs on mount to overwrite the default value of any
  // key that has a local value.
  React.useEffect(() => {
    async function initialStorageLoader() {
      try {
        const payload = await GlobalVariable.loadLocalStorage();
        dispatch({ type: "LOAD_FROM_ASYNC_STORAGE", payload });
      } catch (err) {
        console.error(err);
      }
    }
    initialStorageLoader();
  }, []);

  // This effect runs on every state update after the initial load. Gives us
  // best of both worlds: React state updates sync, but current state made
  // durable next async tick.
  React.useEffect(() => {
    async function syncToAsyncStorage() {
      try {
        await GlobalVariable.syncToLocalStorage(state.values);
      } catch (err) {
        console.error(err);
      }
    }
    if (state.__loaded) {
      syncToAsyncStorage();
    }
  }, [state]);

  const onLayoutRootView = React.useCallback(async () => {
    if (state.__loaded) {
      await SplashScreen.hideAsync();
    }
  }, [state.__loaded]);

  // We won't want an app to read a default state when there might be one
  // incoming from storage.
  if (!state.__loaded) {
    return null;
  }

  return (
    <GlobalVariableUpdater.Provider
      value={dispatch}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableContext.Provider value={state.values}>
        {children}
      </GlobalVariableContext.Provider>
    </GlobalVariableUpdater.Provider>
  );
}

// Hooks
export function useSetValue() {
  const dispatch = React.useContext(GlobalVariableUpdater);
  return ({ key, value }) => {
    dispatch({ type: "UPDATE", payload: { key, value } });
    return value;
  };
}

export function useValues() {
  return React.useContext(GlobalVariableContext);
}
