import React from "react";
import * as CustomCode from "../CustomCode";
import * as GlobalStyles from "../GlobalStyles.js";
import * as SwaggerAPIApi from "../apis/SwaggerAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import * as CustomPackages from "../custom-files/CustomPackages";
import * as GSComponentTree from "../custom-files/GSComponentTree";
import * as GSWrapper from "../custom-files/GSWrapper";
import * as GetStreamChat from "../custom-files/GetStreamChat";
import getNameInitials from "../global-functions/getNameInitials";
import getObjectEntries from "../global-functions/getObjectEntries";
import setFilter from "../global-functions/setFilter";
import showHeader from "../global-functions/showHeader";
import * as Utils from "../utils";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import {
  Button,
  Circle,
  CircleImage,
  Divider,
  Icon,
  IconButton,
  LinearGradient,
  ScreenContainer,
  Surface,
  Swiper,
  SwiperItem,
  Switch,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import { useAnalytics } from "@segment/analytics-react-native";
import * as WebBrowser from "expo-web-browser";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { Fetch } from "react-request";

const ChatsScreen = (props) => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();

  const onBackPress = () => {
    if (thread) {
      setThread(undefined);
    } else if (channel) {
      setChannel(undefined);
    }
  };

  const showHeader = () => {
    return !(Variables?.CHANNEL || Variables?.THREAD);
  };

  const getSelectableUsers = (Variables, fetchedUsers) => {
    return fetchedUsers?.filter((item) => item?.id !== Variables.USER.id);
  };

  const applyUserFilter = (query) => {
    setFilteredUsers((users) =>
      users.filter((prev) => {
        // console.log(prev.toLowerCase().includes(query.toLowerCase()))

        return !query || prev.id.toLowerCase().includes(query.toLowerCase());
      })
    );
  };

  const setInitialFilter = (Variables) => {
    setMemoizedFilters({
      members: { $in: [Variables.internalId] },
      // type: ["messaging", "livestream"],
    });
  };

  const isChannelCreateable = () => {
    return newChannelName.length > 0 && selectedMembers.length > 1;
  };

  const isSelectedContact = (contact) => {
    // console.log(selectedMembers.filter(item=> item.id === contact.id).length)
    return selectedMembers.filter((item) => item.id === contact.id).length > 0;
  };

  const deselectContact = (contact) => {
    setSelectedMembers((prev) => prev.filter((item) => item.id !== contact.id));
  };

  const applySearch = (contacts) => {
    return searchContact && contacts.length
      ? contacts.filter((item) =>
          item.name?.toLowerCase().includes(searchContact.toLowerCase())
        )
      : contacts;
  };

  const selectContactWithOneNumber = (contact) => {
    setSelectedMembers((prev) => [
      ...prev,
      {
        id: contact.id,
        name: contact.name,
        number: contact.phoneNumbers[0].number,
      },
    ]);
  };

  const readContacts = async () => {
    const { Contacts } = CustomPackages;

    const { status: grantedStatus } = await Contacts.requestPermissionsAsync();
    if (grantedStatus === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        data.sort((x, y) => {
          // let nameX = x.lastName || x.name || "";
          // let nameY = y.lastName || y.name || "";
          let nameX = x.lastName || "";
          let nameY = y.lastName || "";
          // return nameX - nameY;
          // return nameY.localeCompare(nameX, "en", { sensitivity: "base" });
          return nameX.localeCompare(nameY, "en", { sensitivity: "base" });
        });
        let grouped = {};
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          let { lastName } = item;
          let key = lastName ? lastName[0].toUpperCase() : "";

          if (Object.keys(grouped).includes(key))
            grouped[key] = [...grouped[key], item];
          else grouped[key] = [item];
        }
        setGroupedContacts(grouped);
        setContacts(data);
      }
    }
  };

  const selectContactWithManyNumber = (id, name, number) => {
    setSelectedMembers((prev) => [...prev, { id, name, number }]);
  };

  const getNameOrNumber = (item) => {
    return name || item.phoneNumbers[0].number;
  };

  const setFilter = (Variables, newVal) => {
    if (newVal)
      setMemoizedFilters((prev) => ({
        ...prev,
        name: { $autocomplete: newVal },
      }));
    else
      setMemoizedFilters({
        members: { $in: [Variables.internalId] },
        type: "messaging",
      });
  };

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    const handler = async () => {
      try {
        const gsToken = await SwaggerAPIApi.getStreamTokenGET(Constants, {
          internalId: Constants["internalId"],
        });
        setInitialFilter(Variables);
        setGlobalVariableValue({
          key: "GS_USER_TOKEN",
          value: gsToken,
        });
        const userInfo = await SwaggerAPIApi.getUserInfoGET(Constants, {
          interanlId: Constants["internalId"],
        });
        setUserAvatar(userInfo?.profilePicture);
        setUserFirstName(userInfo?.firstName);
        setUserLastName(userInfo?.lastName);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, []);

  React.useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  const swaggerAPIStreamInvitePOST = SwaggerAPIApi.useStreamInvitePOST();

  const [channel, setChannel] = React.useState({});
  const [contacts, setContacts] = React.useState([]);
  const [createModalTabI, setCreateModalTabI] = React.useState(0);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [groupImage, setGroupImage] = React.useState("");
  const [groupedContacts, setGroupedContacts] = React.useState({});
  const [isCreating, setIsCreating] = React.useState(false);
  const [memoizedFilters, setMemoizedFilters] = React.useState({});
  const [newChannelName, setNewChannelName] = React.useState("");
  const [newGroupName, setNewGroupName] = React.useState("");
  const [searchContact, setSearchContact] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedMembers, setSelectedMembers] = React.useState([]);
  const [showCreateGroupModal, setShowCreateGroupModal] = React.useState(false);
  const [showManyNubmerModal, setShowManyNubmerModal] = React.useState(false);
  const [showUserModal, setShowUserModal] = React.useState(false);
  const [switchValue, setSwitchValue] = React.useState(false);
  const [thread, setThread] = React.useState({});
  const [userAvatar, setUserAvatar] = React.useState("");
  const [userFirstName, setUserFirstName] = React.useState("");
  const [userLastName, setUserLastName] = React.useState("");
  const [userSearch, setUserSearch] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [viewingContactId, setViewingContactId] = React.useState("");
  const [viewingContactName, setViewingContactName] = React.useState("");
  const [viewingNumber, setViewingNumber] = React.useState([]);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { height: "100%", width: "100%" },
        dimensions.width
      )}
      scrollable={false}
      hasTopSafeArea={true}
      hasSafeArea={false}
    >
      {/* Header */}
      <>
        {!showHeader() ? null : (
          <View>
            {/* Menu Surface */}
            <Surface
              style={StyleSheet.applyWidth(
                { backgroundColor: theme.colors.background, borderRadius: 0 },
                dimensions.width
              )}
              elevation={3}
            >
              {/* Menu Bar */}
              <View
                style={StyleSheet.applyWidth(
                  { borderRadius: 0, justifyContent: "center" },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: "row", justifyContent: "space-between" },
                    dimensions.width
                  )}
                >
                  {/* Left Button */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: "flex-start",
                        borderRadius: 0,
                        justifyContent: "center",
                        width: "33%",
                      },
                      dimensions.width
                    )}
                  >
                    <Touchable
                      onPress={() => {
                        try {
                          setGlobalVariableValue({
                            key: "toggleMenuModal",
                            value: true,
                          });
                          setGlobalVariableValue({
                            key: "profileCardSettings",
                            value: false,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: "center",
                            flexDirection: "row",
                            height: 50,
                            paddingLeft: 16,
                            paddingRight: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Menu */}
                        <Icon
                          name={"Ionicons/ios-menu"}
                          size={28}
                          color={theme.colors.lightLowImportanceText}
                        />
                      </View>
                    </Touchable>
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: "center",
                        alignItems: "center",
                        height: 50,
                        justifyContent: "center",
                      },
                      dimensions.width
                    )}
                  >
                    {/* Vault Logo */}
                    <>
                      {!Constants["showVaultLogo"] ? null : (
                        <Image
                          style={StyleSheet.applyWidth(
                            { height: 50, width: 115 },
                            dimensions.width
                          )}
                          source={Images.VaultLogoLightFontClearBackground}
                          resizeMode={"contain"}
                        />
                      )}
                    </>
                  </View>
                  {/* Right Button */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: "stretch",
                        borderRadius: 0,
                        flexDirection: "row",
                        height: 50,
                        justifyContent: "flex-end",
                        width: "33%",
                      },
                      dimensions.width
                    )}
                  >
                    {/* Go to test screen */}
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate("CreateChatStack", {
                            screen: "TestScreen",
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      {/* View 3 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            height: 50,
                            justifyContent: "center",
                            marginRight: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: "center",
                              backgroundColor: theme.colors["Light Good"],
                              borderRadius: 20,
                              flexDirection: "row",
                              paddingBottom: 3,
                              paddingLeft: 6,
                              paddingRight: 6,
                              paddingTop: 3,
                            },
                            dimensions.width
                          )}
                        >
                          <Text
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)["Text"],
                                {
                                  color: theme.colors["Dark Good"],
                                  fontFamily: "System",
                                  fontSize: 12,
                                  fontWeight: "700",
                                  marginRight: 3,
                                  textAlign: "right",
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {"Add\nFriends"}
                          </Text>
                          <Icon
                            size={24}
                            name={"Ionicons/ios-people"}
                            color={theme.colors["Dark Good"]}
                          />
                        </View>
                      </View>
                    </Touchable>
                  </View>
                </View>
              </View>
            </Surface>
          </View>
        )}
      </>
      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
        {/* Title */}
        <>
          {!showHeader() ? null : (
            <View
              style={StyleSheet.applyWidth(
                { paddingLeft: 16, paddingRight: 16, paddingTop: 8 },
                dimensions.width
              )}
            >
              {/* Title */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors["Background Inverse (Main Font)"],
                    fontFamily: "System",
                    fontSize: 32,
                    fontWeight: "700",
                  },
                  dimensions.width
                )}
              >
                {"Chats"}
              </Text>
            </View>
          )}
        </>
        {/* Search Bar */}
        <>
          {!showHeader() ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  paddingBottom: 10,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 18,
                },
                dimensions.width
              )}
            >
              <TextInput
                onChangeText={(newTextInputValue) => {
                  try {
                    setSearchQuery(newTextInputValue);
                    setFilter(Variables, newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.divider,
                    borderRadius: 8,
                    color: theme.colors.backgroundInverseMainFont,
                    fontSize: 16,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={searchQuery}
                placeholder={"Search..."}
                placeholderTextColor={theme.colors.lightLowImportanceText}
                clearButtonMode={"always"}
                autoCapitalize={"words"}
                autoFocus={false}
              />
            </View>
          )}
        </>
        {/* GSWrapper */}
        <>
          {!Constants["GS_USER_TOKEN"] ? null : (
            <Utils.CustomCodeErrorBoundary>
              <GSWrapper.Index
                USER={{
                  id: Constants["internalId"],
                  image: userAvatar,
                  name: `${userFirstName} ${userLastName}`,
                }}
                GSTOKEN={Constants["GS_USER_TOKEN"]}
                APIKEY={Constants["GS_API_KEY"]}
                theme={theme}
              >
                {/* Chat Container */}
                <View
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                >
                  {/* GSComponentTree */}
                  <Utils.CustomCodeErrorBoundary>
                    <GSComponentTree.GSChat
                      filters={memoizedFilters}
                      theme={theme}
                      navigation={navigation}
                    />
                  </Utils.CustomCodeErrorBoundary>
                </View>
              </GSWrapper.Index>
            </Utils.CustomCodeErrorBoundary>
          )}
        </>
      </View>
      {/* Create Chat Modal */}
      <>
        {!showCreateGroupModal ? null : (
          <Modal
            transparent={true}
            presentationStyle={"pageSheet"}
            animationType={"slide"}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors.background,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  overflow: "hidden",
                },
                dimensions.width
              )}
            >
              {/* Main Area */}
              <>
                {showManyNubmerModal ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: theme.colors["Background"],
                        height: "100%",
                      },
                      dimensions.width
                    )}
                  >
                    {/* Choose Action */}
                    <>
                      {!(createModalTabI === 0) ? null : (
                        <View>
                          {/* Top Bar */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                flexDirection: "row",
                                height: 50,
                                justifyContent: "space-between",
                              },
                              dimensions.width
                            )}
                          >
                            {/* Left Button */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: "flex-start",
                                  borderRadius: 0,
                                  justifyContent: "center",
                                  width: "33%",
                                },
                                dimensions.width
                              )}
                            >
                              <Touchable
                                onPress={() => {
                                  try {
                                    setShowCreateGroupModal(false);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                activeOpacity={0.8}
                                disabledOpacity={0.8}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    { paddingLeft: 16, paddingRight: 16 },
                                    dimensions.width
                                  )}
                                >
                                  {/* Cancel */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          theme.colors[
                                            "Background Inverse (Main Font)"
                                          ],
                                        fontSize: 18,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {"Cancel"}
                                  </Text>
                                </View>
                              </Touchable>
                            </View>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: "center",
                                  alignItems: "center",
                                  height: 50,
                                  justifyContent: "center",
                                },
                                dimensions.width
                              )}
                            >
                              {/* New Chat */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors[
                                        "Background Inverse (Main Font)"
                                      ],
                                    fontFamily: "System",
                                    fontSize: 18,
                                    fontWeight: "600",
                                  },
                                  dimensions.width
                                )}
                              >
                                {"New Chat"}
                              </Text>
                            </View>
                            <View
                              style={StyleSheet.applyWidth(
                                { width: "33%" },
                                dimensions.width
                              )}
                            />
                          </View>

                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: "center",
                                marginTop: 60,
                                paddingLeft: 16,
                                paddingRight: 16,
                              },
                              dimensions.width
                            )}
                          >
                            <View>
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors[
                                        "Background Inverse (Main Font)"
                                      ],
                                    fontFamily: "System",
                                    fontSize: 20,
                                    fontWeight: "700",
                                  },
                                  dimensions.width
                                )}
                              >
                                {"Start a betting group chat to..."}
                              </Text>

                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors[
                                        "Background Inverse (Main Font)"
                                      ],
                                    fontSize: 16,
                                    marginTop: 24,
                                  },
                                  dimensions.width
                                )}
                              >
                                {
                                  "📊  Compare your stats with friends\n\n✅  See what your friends are betting on\n\n🏆  Start competitions"
                                }
                              </Text>
                            </View>
                          </View>

                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderRadius: 8,
                                marginTop: 48,
                                overflow: "hidden",
                              },
                              dimensions.width
                            )}
                          >
                            <Touchable
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    await readContacts();
                                    setCreateModalTabI(createModalTabI + 1);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                              activeOpacity={0.8}
                              disabledOpacity={0.8}
                            >
                              <Surface
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor: theme.colors.divider,
                                    marginLeft: 16,
                                    marginRight: 16,
                                    minHeight: 40,
                                  },
                                  dimensions.width
                                )}
                                elevation={1}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: "center",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      marginLeft: 8,
                                      marginRight: 8,
                                      minHeight: 50,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: "center",
                                        flexDirection: "row",
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <Icon
                                      style={StyleSheet.applyWidth(
                                        { marginLeft: 12, marginRight: 12 },
                                        dimensions.width
                                      )}
                                      size={24}
                                      name={
                                        "MaterialCommunityIcons/account-group"
                                      }
                                      color={
                                        theme.colors[
                                          "Background Inverse (Main Font)"
                                        ]
                                      }
                                    />
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color:
                                            theme.colors
                                              .backgroundInverseMainFont,
                                          fontFamily: "System",
                                          fontSize: 16,
                                          fontWeight: "700",
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {"New Group"}
                                    </Text>
                                  </View>
                                  <Icon
                                    name={"Ionicons/ios-chevron-forward"}
                                    size={24}
                                    color={
                                      theme.colors["Light_low_importance_text"]
                                    }
                                  />
                                </View>
                              </Surface>
                            </Touchable>
                          </View>
                        </View>
                      )}
                    </>
                    {/* Select Members */}
                    <>
                      {!(createModalTabI === 1) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { height: "100%" },
                            dimensions.width
                          )}
                        >
                          {/* Top Bar */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                flexDirection: "row",
                                height: 50,
                                justifyContent: "space-between",
                              },
                              dimensions.width
                            )}
                          >
                            {/* Left Button */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: "flex-start",
                                  borderRadius: 0,
                                  justifyContent: "center",
                                  width: "33%",
                                },
                                dimensions.width
                              )}
                            >
                              <IconButton
                                onPress={() => {
                                  try {
                                    setCreateModalTabI(createModalTabI - 1);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                size={32}
                                icon={"Entypo/chevron-small-left"}
                                color={
                                  theme.colors["Background Inverse (Main Font)"]
                                }
                              />
                            </View>
                            {/* title */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: "center",
                                  alignItems: "center",
                                  height: 50,
                                  justifyContent: "center",
                                },
                                dimensions.width
                              )}
                            >
                              {/* not selected */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors[
                                        "Background Inverse (Main Font)"
                                      ],
                                    fontFamily: "System",
                                    fontSize: 18,
                                    fontWeight: "600",
                                  },
                                  dimensions.width
                                )}
                              >
                                {"Select Members"}
                              </Text>
                              {/* se;ected */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors[
                                        "Background Inverse (Main Font)"
                                      ],
                                    fontFamily: "System",
                                    fontSize: 18,
                                    fontWeight: "600",
                                  },
                                  dimensions.width
                                )}
                              >
                                {selectedMembers?.length}
                                {" Members"}
                              </Text>
                            </View>
                            {/* Right Button */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: "flex-end",
                                  borderRadius: 0,
                                  justifyContent: "center",
                                  paddingRight: 16,
                                  width: "33%",
                                },
                                dimensions.width
                              )}
                            >
                              {/* Not selected */}
                              <>
                                {selectedMembers?.length ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedMembers([]);
                                        setCreateModalTabI(createModalTabI + 1);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    {/* Skip */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color:
                                            theme.colors[
                                              "Background Inverse (Main Font)"
                                            ],
                                          fontFamily: "System",
                                          fontSize: 18,
                                          fontWeight: "600",
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {"Skip"}
                                    </Text>
                                  </Touchable>
                                )}
                              </>
                              {/* Selected */}
                              <>
                                {!selectedMembers?.length ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setCreateModalTabI(createModalTabI + 1);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    {/* Next */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color:
                                            theme.colors[
                                              "Background Inverse (Main Font)"
                                            ],
                                          fontFamily: "System",
                                          fontSize: 18,
                                          fontWeight: "600",
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {"Next"}
                                    </Text>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                          {/* Search Bar */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                paddingBottom: 10,
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 12,
                              },
                              dimensions.width
                            )}
                          >
                            <TextInput
                              onChangeText={(newTextInputValue) => {
                                try {
                                  setSearchContact(newTextInputValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors["Divider"],
                                  borderRadius: 8,
                                  color:
                                    theme.colors[
                                      "Background Inverse (Main Font)"
                                    ],
                                  fontSize: 16,
                                  paddingBottom: 8,
                                  paddingLeft: 8,
                                  paddingRight: 8,
                                  paddingTop: 8,
                                },
                                dimensions.width
                              )}
                              value={searchContact}
                              placeholder={"Search by name or number..."}
                              clearButtonMode={"always"}
                              placeholderTextColor={
                                theme.colors["Light_low_importance_text"]
                              }
                              autoCapitalize={"words"}
                              contextMenuHidden={false}
                            />
                          </View>
                          {/* Selected Member List */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: "flex-start",
                                flexDirection: "column",
                                paddingBottom: 8,
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 4,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Selected Contact */}
                            <FlatList
                              data={selectedMembers}
                              listKey={"A7ecWGUv"}
                              keyExtractor={(selectedContactData) =>
                                selectedContactData?.id
                              }
                              renderItem={({ item }) => {
                                const selectedContactData = item;
                                return (
                                  <>
                                    {/* Selected Member */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: "center",
                                          backgroundColor:
                                            theme.colors["NFT_TIME_Gray"],
                                          borderRadius: 16,
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          marginRight: 8,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Circle
                                        bgColor={
                                          theme.colors[
                                            "Background Inverse (Main Font)"
                                          ]
                                        }
                                        size={32}
                                      >
                                        {/* Default Profile Picture */}
                                        <Circle
                                          bgColor={
                                            theme.colors.lightLowImportanceText
                                          }
                                          size={32}
                                        >
                                          <LinearGradient
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignItems: "center",
                                                height: "100%",
                                                justifyContent: "center",
                                                width: "100%",
                                              },
                                              dimensions.width
                                            )}
                                            endY={100}
                                            endX={100}
                                            color2={theme.colors.divider}
                                            color1={
                                              theme.colors
                                                .lightLowImportanceText
                                            }
                                          >
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors
                                                      .backgroundInverseMainFont,
                                                  fontFamily: "System",
                                                  fontSize: 18,
                                                  fontWeight: "400",
                                                  textAlign: "center",
                                                  textTransform: "uppercase",
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {getNameInitials(
                                                selectedContactData?.name
                                              )}
                                            </Text>
                                          </LinearGradient>
                                        </Circle>
                                      </Circle>

                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors[
                                                "Background Inverse (Main Font)"
                                              ],
                                            fontSize: 16,
                                            paddingLeft: 4,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {selectedContactData?.name}
                                      </Text>

                                      <Touchable
                                        onPress={() => {
                                          try {
                                            deselectContact(
                                              selectedContactData
                                            );
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        }}
                                        activeOpacity={0.8}
                                        disabledOpacity={0.8}
                                      >
                                        <Icon
                                          style={StyleSheet.applyWidth(
                                            { marginLeft: 4, marginRight: 4 },
                                            dimensions.width
                                          )}
                                          color={
                                            theme.colors[
                                              "Background Inverse (Main Font)"
                                            ]
                                          }
                                          size={16}
                                          name={"Ionicons/ios-close-outline"}
                                        />
                                      </Touchable>
                                    </View>
                                  </>
                                );
                              }}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              showsHorizontalScrollIndicator={true}
                              showsVerticalScrollIndicator={true}
                              horizontal={true}
                            />
                          </View>
                          {/* Grouped Contacts */}
                          <FlatList
                            data={(() => {
                              const e = getObjectEntries(groupedContacts);
                              console.log(e);
                              return e;
                            })()}
                            listKey={"0yifzOBa"}
                            keyExtractor={(groupedContactsData) =>
                              groupedContactsData && groupedContactsData[0]
                            }
                            renderItem={({ item }) => {
                              const groupedContactsData = item;
                              return (
                                <>
                                  {/* Alphabetical List */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        flex: 1,
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                        paddingTop: 32,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Letter */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color:
                                            theme.colors[
                                              "Background Inverse (Main Font)"
                                            ],
                                          fontFamily: "System",
                                          fontSize: 18,
                                          fontWeight: "600",
                                          marginBottom: 10,
                                          marginLeft: 6,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {groupedContactsData &&
                                        groupedContactsData[0]}
                                    </Text>

                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          borderRadius: 8,
                                          flex: 1,
                                          overflow: "hidden",
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Contacts */}
                                      <FlatList
                                        data={
                                          groupedContactsData &&
                                          groupedContactsData[1]
                                        }
                                        listKey={JSON.stringify(
                                          groupedContactsData &&
                                            groupedContactsData[1]
                                        )}
                                        keyExtractor={(contactsData) =>
                                          contactsData?.id
                                        }
                                        renderItem={({ item }) => {
                                          const contactsData = item;
                                          return (
                                            <>
                                              {!contactsData?.phoneNumbers
                                                ?.length ? null : (
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    { minHeight: 50 },
                                                    dimensions.width
                                                  )}
                                                >
                                                  <Surface
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        backgroundColor:
                                                          theme.colors.divider,
                                                      },
                                                      dimensions.width
                                                    )}
                                                    elevation={1}
                                                  >
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignItems: "center",
                                                          flexDirection: "row",
                                                          justifyContent:
                                                            "space-between",
                                                          minHeight: 50,
                                                          paddingLeft: 20,
                                                          paddingRight: 20,
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      <View
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            alignItems:
                                                              "center",
                                                            flexDirection:
                                                              "row",
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        <>
                                                          {!contactsData?.name ? null : (
                                                            <Circle
                                                              size={38}
                                                              bgColor={
                                                                theme.colors[
                                                                  "Background Inverse (Main Font)"
                                                                ]
                                                              }
                                                            >
                                                              {/* Default Profile Picture */}
                                                              <Circle
                                                                bgColor={
                                                                  theme.colors
                                                                    .lightLowImportanceText
                                                                }
                                                                size={38}
                                                              >
                                                                <LinearGradient
                                                                  style={StyleSheet.applyWidth(
                                                                    {
                                                                      alignItems:
                                                                        "center",
                                                                      height:
                                                                        "100%",
                                                                      justifyContent:
                                                                        "center",
                                                                      width:
                                                                        "100%",
                                                                    },
                                                                    dimensions.width
                                                                  )}
                                                                  endY={100}
                                                                  endX={100}
                                                                  color2={
                                                                    theme.colors
                                                                      .divider
                                                                  }
                                                                  color1={
                                                                    theme.colors
                                                                      .lightLowImportanceText
                                                                  }
                                                                >
                                                                  <Text
                                                                    style={StyleSheet.applyWidth(
                                                                      {
                                                                        color:
                                                                          theme
                                                                            .colors
                                                                            .backgroundInverseMainFont,
                                                                        fontFamily:
                                                                          "System",
                                                                        fontSize: 20,
                                                                        fontWeight:
                                                                          "400",
                                                                        textAlign:
                                                                          "center",
                                                                        textTransform:
                                                                          "uppercase",
                                                                      },
                                                                      dimensions.width
                                                                    )}
                                                                  >
                                                                    {getNameInitials(
                                                                      contactsData?.name
                                                                    )}
                                                                  </Text>
                                                                </LinearGradient>
                                                              </Circle>
                                                            </Circle>
                                                          )}
                                                        </>
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            {
                                                              color:
                                                                theme.colors
                                                                  .backgroundInverseMainFont,
                                                              fontFamily:
                                                                "System",
                                                              fontSize: 18,
                                                              fontWeight: "400",
                                                              marginLeft: 12,
                                                            },
                                                            dimensions.width
                                                          )}
                                                        >
                                                          {contactsData?.name}{" "}
                                                        </Text>
                                                      </View>
                                                      {/* Selected */}
                                                      <>
                                                        {!isSelectedContact(
                                                          contactsData
                                                        ) ? null : (
                                                          <IconButton
                                                            onPress={() => {
                                                              try {
                                                                deselectContact(
                                                                  contactsData
                                                                );
                                                              } catch (err) {
                                                                console.error(
                                                                  err
                                                                );
                                                              }
                                                            }}
                                                            size={28}
                                                            color={
                                                              theme.colors[
                                                                "Background Inverse (Main Font)"
                                                              ]
                                                            }
                                                            icon={
                                                              "FontAwesome/circle"
                                                            }
                                                          />
                                                        )}
                                                      </>
                                                      {/* unselected */}
                                                      <>
                                                        {isSelectedContact(
                                                          contactsData
                                                        ) ? null : (
                                                          <View>
                                                            {/* on number */}
                                                            <>
                                                              {contactsData
                                                                ?.phoneNumbers
                                                                ?.length >
                                                              1 ? null : (
                                                                <IconButton
                                                                  onPress={() => {
                                                                    try {
                                                                      selectContactWithOneNumber(
                                                                        contactsData
                                                                      );
                                                                    } catch (err) {
                                                                      console.error(
                                                                        err
                                                                      );
                                                                    }
                                                                  }}
                                                                  icon={
                                                                    "FontAwesome/circle-thin"
                                                                  }
                                                                  size={28}
                                                                  color={
                                                                    theme
                                                                      .colors[
                                                                      "Light_low_importance_text"
                                                                    ]
                                                                  }
                                                                />
                                                              )}
                                                            </>
                                                            {/* many number */}
                                                            <>
                                                              {!(
                                                                contactsData
                                                                  ?.phoneNumbers
                                                                  ?.length > 1
                                                              ) ? null : (
                                                                <IconButton
                                                                  onPress={() => {
                                                                    try {
                                                                      setViewingNumber(
                                                                        contactsData?.phoneNumbers
                                                                      );
                                                                      setViewingContactId(
                                                                        contactsData?.id
                                                                      );
                                                                      setViewingContactName(
                                                                        contactsData?.name
                                                                      );
                                                                      setShowManyNubmerModal(
                                                                        true
                                                                      );
                                                                    } catch (err) {
                                                                      console.error(
                                                                        err
                                                                      );
                                                                    }
                                                                  }}
                                                                  icon={
                                                                    "FontAwesome/circle-thin"
                                                                  }
                                                                  color={
                                                                    theme
                                                                      .colors[
                                                                      "Light_low_importance_text"
                                                                    ]
                                                                  }
                                                                  size={28}
                                                                />
                                                              )}
                                                            </>
                                                          </View>
                                                        )}
                                                      </>
                                                    </View>
                                                  </Surface>

                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        alignItems: "center",
                                                        flexDirection: "row",
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    <Divider
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          height: 0.5,
                                                          width: 70,
                                                        },
                                                        dimensions.width
                                                      )}
                                                      color={
                                                        theme.colors["Divider"]
                                                      }
                                                    />
                                                    <Divider
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          height: 0.5,
                                                          width: "100%",
                                                        },
                                                        dimensions.width
                                                      )}
                                                      color={
                                                        theme.colors[
                                                          "NFT_TIME_Icons"
                                                        ]
                                                      }
                                                    />
                                                  </View>
                                                </View>
                                              )}
                                            </>
                                          );
                                        }}
                                        numColumns={1}
                                        onEndReachedThreshold={0.5}
                                        showsHorizontalScrollIndicator={true}
                                        showsVerticalScrollIndicator={true}
                                      />
                                    </View>
                                  </View>
                                </>
                              );
                            }}
                            numColumns={1}
                            onEndReachedThreshold={0.5}
                            showsHorizontalScrollIndicator={true}
                            showsVerticalScrollIndicator={true}
                          />
                        </View>
                      )}
                    </>
                    {/* Name Group */}
                    <>
                      {!(createModalTabI === 2) ? null : (
                        <View>
                          {/* Top Bar */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                flexDirection: "row",
                                height: 50,
                                justifyContent: "space-between",
                              },
                              dimensions.width
                            )}
                          >
                            {/* Left Button */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: "flex-start",
                                  borderRadius: 0,
                                  justifyContent: "center",
                                  width: "33%",
                                },
                                dimensions.width
                              )}
                            >
                              <IconButton
                                onPress={() => {
                                  try {
                                    setCreateModalTabI(createModalTabI - 1);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                size={32}
                                icon={"Entypo/chevron-small-left"}
                                color={
                                  theme.colors["Background Inverse (Main Font)"]
                                }
                              />
                            </View>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: "center",
                                  alignItems: "center",
                                  height: 50,
                                  justifyContent: "center",
                                },
                                dimensions.width
                              )}
                            >
                              {/* Title */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors[
                                        "Background Inverse (Main Font)"
                                      ],
                                    fontFamily: "System",
                                    fontSize: 18,
                                    fontWeight: "600",
                                  },
                                  dimensions.width
                                )}
                              >
                                {"Name Group"}
                              </Text>
                            </View>
                            {/* Right Button */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: "flex-end",
                                  borderRadius: 0,
                                  justifyContent: "center",
                                  paddingRight: 16,
                                  width: "33%",
                                },
                                dimensions.width
                              )}
                            >
                              <Touchable
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      setShowCreateGroupModal(false);
                                      setCreateModalTabI(0);
                                      await swaggerAPIStreamInvitePOST.mutateAsync(
                                        {
                                          creatorId: Constants["internalId"],
                                          groupImage: groupImage,
                                          groupName: newGroupName,
                                          phoneNumbers: selectedMembers,
                                        }
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                              >
                                {/* Create */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color:
                                        theme.colors[
                                          "Background Inverse (Main Font)"
                                        ],
                                      fontFamily: "System",
                                      fontSize: 18,
                                      fontWeight: "600",
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {"Create"}
                                </Text>
                              </Touchable>
                            </View>
                          </View>

                          <ScrollView
                            style={StyleSheet.applyWidth(
                              { height: "100%" },
                              dimensions.width
                            )}
                            contentContainerStyle={StyleSheet.applyWidth(
                              { paddingLeft: 16, paddingRight: 16 },
                              dimensions.width
                            )}
                            showsVerticalScrollIndicator={true}
                            bounces={true}
                            showsHorizontalScrollIndicator={false}
                          >
                            {/* Name and Photo */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: "center",
                                  backgroundColor: theme.colors["Divider"],
                                  borderRadius: 8,
                                  flexDirection: "row",
                                  marginTop: 22,
                                  paddingBottom: 16,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 16,
                                },
                                dimensions.width
                              )}
                            >
                              <Touchable
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      const groupAvatar =
                                        await Utils.openImagePicker({});
                                      setGroupImage(groupAvatar);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                style={StyleSheet.applyWidth(
                                  { marginRight: 16 },
                                  dimensions.width
                                )}
                                activeOpacity={0.8}
                                disabledOpacity={0.8}
                              >
                                {/* Profile Picture */}
                                <>
                                  {!groupImage ? null : (
                                    <CircleImage
                                      size={64}
                                      source={{ uri: `${groupImage}` }}
                                    />
                                  )}
                                </>
                                {/* Default Profile Picture */}
                                <>
                                  {groupImage ? null : (
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: "center",
                                          borderColor:
                                            theme.colors["NFT_TIME_Icons"],
                                          borderRadius: 32,
                                          borderWidth: 2,
                                          height: 64,
                                          justifyContent: "center",
                                          width: 64,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Icon
                                        name={"Ionicons/ios-camera-outline"}
                                        size={35}
                                        color={
                                          theme.colors[
                                            "Background Inverse (Main Font)"
                                          ]
                                        }
                                      />
                                    </View>
                                  )}
                                </>
                              </Touchable>
                              <TextInput
                                onChangeText={(newTextInputValue) => {
                                  try {
                                    setNewGroupName(newTextInputValue);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors[
                                        "Background Inverse (Main Font)"
                                      ],
                                    fontSize: 18,
                                  },
                                  dimensions.width
                                )}
                                value={newGroupName}
                                placeholder={"Group Name (Required)"}
                                placeholderTextColor={
                                  theme.colors["Light_low_importance_text"]
                                }
                                clearButtonMode={"never"}
                                autoCapitalize={"words"}
                              />
                            </View>
                            {/* Members List */}
                            <View
                              style={StyleSheet.applyWidth(
                                { marginTop: 32 },
                                dimensions.width
                              )}
                            >
                              {/* Members */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors[
                                        "Background Inverse (Main Font)"
                                      ],
                                    fontFamily: "System",
                                    fontSize: 18,
                                    fontWeight: "600",
                                    marginBottom: 10,
                                    marginLeft: 6,
                                  },
                                  dimensions.width
                                )}
                              >
                                {"Members"}
                              </Text>

                              <View
                                style={StyleSheet.applyWidth(
                                  { borderRadius: 8, overflow: "hidden" },
                                  dimensions.width
                                )}
                              >
                                {/* Selected Member */}
                                <FlatList
                                  data={selectedMembers}
                                  listKey={"R47ACKoP"}
                                  keyExtractor={(selectedMemberData) =>
                                    selectedMemberData?.id
                                  }
                                  renderItem={({ item }) => {
                                    const selectedMemberData = item;
                                    return (
                                      <>
                                        <Surface
                                          style={StyleSheet.applyWidth(
                                            {
                                              backgroundColor:
                                                theme.colors.divider,
                                            },
                                            dimensions.width
                                          )}
                                          elevation={1}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignItems: "center",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                minHeight: 50,
                                                paddingLeft: 20,
                                                paddingRight: 20,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: "center",
                                                  flexDirection: "row",
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <Circle
                                                size={38}
                                                bgColor={
                                                  theme.colors[
                                                    "Background Inverse (Main Font)"
                                                  ]
                                                }
                                              >
                                                {/* Default Profile Picture */}
                                                <Circle
                                                  bgColor={
                                                    theme.colors
                                                      .lightLowImportanceText
                                                  }
                                                  size={38}
                                                >
                                                  <LinearGradient
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        alignItems: "center",
                                                        height: "100%",
                                                        justifyContent:
                                                          "center",
                                                        width: "100%",
                                                      },
                                                      dimensions.width
                                                    )}
                                                    endY={100}
                                                    endX={100}
                                                    color2={
                                                      theme.colors.divider
                                                    }
                                                    color1={
                                                      theme.colors
                                                        .lightLowImportanceText
                                                    }
                                                  >
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          color:
                                                            theme.colors
                                                              .backgroundInverseMainFont,
                                                          fontFamily: "System",
                                                          fontSize: 20,
                                                          fontWeight: "400",
                                                          textAlign: "center",
                                                          textTransform:
                                                            "uppercase",
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {getNameInitials(
                                                        selectedMemberData?.name
                                                      )}
                                                    </Text>
                                                  </LinearGradient>
                                                </Circle>
                                              </Circle>

                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors
                                                        .backgroundInverseMainFont,
                                                    fontFamily: "System",
                                                    fontSize: 18,
                                                    fontWeight: "400",
                                                    marginLeft: 12,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {selectedMemberData?.name}
                                              </Text>
                                            </View>
                                          </View>
                                        </Surface>

                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: "center",
                                              flexDirection: "row",
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          <Divider
                                            style={StyleSheet.applyWidth(
                                              { height: 0.5, width: 70 },
                                              dimensions.width
                                            )}
                                            color={theme.colors["Divider"]}
                                          />
                                          <Divider
                                            style={StyleSheet.applyWidth(
                                              { height: 0.5, width: "100%" },
                                              dimensions.width
                                            )}
                                            color={
                                              theme.colors["NFT_TIME_Icons"]
                                            }
                                          />
                                        </View>
                                      </>
                                    );
                                  }}
                                  numColumns={1}
                                  onEndReachedThreshold={0.5}
                                  showsHorizontalScrollIndicator={true}
                                  showsVerticalScrollIndicator={true}
                                />
                              </View>
                            </View>
                          </ScrollView>
                        </View>
                      )}
                    </>
                  </View>
                )}
              </>
              {/* Number Modal */}
              <>
                {!showManyNubmerModal ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: "center",
                        height: "100%",
                        justifyContent: "center",
                        width: "100%",
                      },
                      dimensions.width
                    )}
                  >
                    {/* Numbers */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors["Bronze"],
                          borderRadius: 12,
                          padding: 16,
                          width: "65%",
                        },
                        dimensions.width
                      )}
                    >
                      {/* Numbers */}
                      <FlatList
                        data={viewingNumber}
                        listKey={"VKLvvvq5"}
                        keyExtractor={(numbersData) => numbersData?.label}
                        renderItem={({ item }) => {
                          const numbersData = item;
                          return (
                            <Touchable
                              onPress={() => {
                                try {
                                  selectContactWithManyNumber(
                                    viewingContactId,
                                    viewingContactName,
                                    numbersData
                                  );
                                  setShowManyNubmerModal(false);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    borderBottomWidth: 1,
                                    borderColor: theme.colors["Blue"],
                                    padding: 8,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.TextStyles(theme)["Text"],
                                    dimensions.width
                                  )}
                                >
                                  {numbersData?.number}
                                </Text>
                              </View>
                            </Touchable>
                          );
                        }}
                        numColumns={1}
                        onEndReachedThreshold={0.5}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                      />
                    </View>
                  </View>
                )}
              </>
            </View>
          </Modal>
        )}
      </>
      {/* Menu Modal */}
      <Modal
        visible={Constants["toggleMenuModal"]}
        animationType={"slide"}
        presentationStyle={"pageSheet"}
        transparent={true}
      >
        <Touchable
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: "toggleMenuModal",
                value: false,
              });
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ height: "30%" }, dimensions.width)}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background,
              borderRadius: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: "70%",
              justifyContent: "space-between",
              paddingBottom: 36,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { justifyContent: "space-between" },
              dimensions.width
            )}
          >
            {/* Menu Bar */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: "row", justifyContent: "space-between" },
                dimensions.width
              )}
            >
              {/* Left Button */}
              <View
                style={StyleSheet.applyWidth(
                  { width: "25%" },
                  dimensions.width
                )}
              />
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50%",
                  },
                  dimensions.width
                )}
              />
              <View
                style={StyleSheet.applyWidth({ width: 25 }, dimensions.width)}
              >
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: "toggleMenuModal",
                        value: false,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: "center",
                        flexDirection: "row",
                        height: 50,
                        justifyContent: "flex-end",
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Close */}
                    <Icon
                      name={"Ionicons/ios-close"}
                      size={32}
                      color={theme.colors.lightLowImportanceText}
                    />
                  </View>
                </Touchable>
              </View>
            </View>

            <View
              style={StyleSheet.applyWidth(
                { paddingLeft: "4%", paddingRight: "4%" },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: "center", flexDirection: "row" },
                  dimensions.width
                )}
              >
                {/* Profile Information Fetch */}
                <SwaggerAPIApi.FetchGetUserInfoGET
                  interanlId={Constants["internalId"]}
                >
                  {({ loading, error, data, refetchGetUserInfo }) => {
                    const profileInformationFetchData = data;
                    if (!profileInformationFetchData || loading) {
                      return <ActivityIndicator />;
                    }

                    if (error) {
                      return (
                        <Text style={{ textAlign: "center" }}>
                          There was a problem fetching this data
                        </Text>
                      );
                    }

                    return (
                      <View
                        style={StyleSheet.applyWidth(
                          { alignItems: "center", flexDirection: "row" },
                          dimensions.width
                        )}
                      >
                        <Surface
                          style={StyleSheet.applyWidth(
                            { borderRadius: 31 },
                            dimensions.width
                          )}
                          elevation={2}
                        >
                          <Circle
                            size={62}
                            bgColor={theme.colors.backgroundInverseMainFont}
                          >
                            {/* Profile Picture */}
                            <>
                              {!Constants["profilePictureUrl"] ? null : (
                                <CircleImage
                                  source={{
                                    uri: `${Constants["profilePictureUrl"]}`,
                                  }}
                                  size={60}
                                />
                              )}
                            </>
                            {/* Default Profile Picture */}
                            <>
                              {Constants["profilePictureUrl"] ? null : (
                                <Circle
                                  size={60}
                                  bgColor={theme.colors.lightLowImportanceText}
                                >
                                  <LinearGradient
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: "center",
                                        height: "100%",
                                        justifyContent: "center",
                                        width: "100%",
                                      },
                                      dimensions.width
                                    )}
                                    endY={100}
                                    endX={100}
                                    color2={theme.colors.divider}
                                    color1={theme.colors.lightLowImportanceText}
                                  >
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color:
                                            theme.colors
                                              .backgroundInverseMainFont,
                                          fontFamily: "System",
                                          fontSize: 30,
                                          fontWeight: "400",
                                          textAlign: "center",
                                          textTransform: "uppercase",
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {profileInformationFetchData?.firstName}
                                      {profileInformationFetchData?.lastName}
                                    </Text>
                                  </LinearGradient>
                                </Circle>
                              )}
                            </>
                          </Circle>
                        </Surface>

                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: "flex-start",
                              flex: 1,
                              justifyContent: "center",
                              marginLeft: 16,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Name */}
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.backgroundInverseMainFont,
                                fontFamily: "System",
                                fontSize: 20,
                                fontWeight: "700",
                              },
                              dimensions.width
                            )}
                          >
                            {profileInformationFetchData?.firstName}{" "}
                            {profileInformationFetchData?.lastName}
                          </Text>
                          {/* Username */}
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.lightLowImportanceText,
                                fontFamily: "System",
                                fontSize: 12,
                                fontWeight: "700",
                              },
                              dimensions.width
                            )}
                          >
                            {"@"}
                            {profileInformationFetchData?.userName}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                </SwaggerAPIApi.FetchGetUserInfoGET>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { alignItems: "flex-start", marginTop: 22 },
                  dimensions.width
                )}
              >
                {/* Profile & Settings */}
                <Button
                  onPress={() => {
                    try {
                      navigation.navigate("SettingsBetaScreen");
                      setGlobalVariableValue({
                        key: "toggleMenuModal",
                        value: false,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.background,
                      borderRadius: 8,
                      color: theme.colors.backgroundInverseMainFont,
                      fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "700",
                      marginBottom: 10,
                      textAlign: "center",
                    },
                    dimensions.width
                  )}
                  title={"Profile & Settings"}
                  icon={"Ionicons/ios-settings-sharp"}
                />
                {/* Sync A Sportsbook */}
                <>
                  {Constants["waitlisted"] ? null : (
                    <Button
                      onPress={() => {
                        try {
                          setGlobalVariableValue({
                            key: "toggleMenuModal",
                            value: false,
                          });
                          navigation.navigate("SharpSportsFormScreen");
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.background,
                          borderRadius: 8,
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: "System",
                          fontSize: 16,
                          fontWeight: "700",
                          marginBottom: 10,
                          textAlign: "center",
                        },
                        dimensions.width
                      )}
                      title={"Sync a Sportsbook"}
                      icon={"Ionicons/ios-add-circle"}
                    />
                  )}
                </>
                {/* Adjust Unit Size */}
                <Button
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: "toggleMenuModal",
                        value: false,
                      });
                      navigation.navigate("AdjustUnitSizeScreen");
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.background,
                      borderRadius: 8,
                      color: theme.colors.backgroundInverseMainFont,
                      fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "700",
                      marginBottom: 10,
                      textAlign: "center",
                    },
                    dimensions.width
                  )}
                  title={`Adjust Unit Size ($${Constants["userDefaultUnitSize"]})`}
                  icon={"MaterialCommunityIcons/plus-minus-box"}
                />
                {/* Join the Discord */}
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await WebBrowser.openBrowserAsync(
                          "https://discord.gg/6bGRD7BpUD"
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.background,
                      borderRadius: 8,
                      color: theme.colors.backgroundInverseMainFont,
                      fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "700",
                      marginBottom: 10,
                      textAlign: "center",
                    },
                    dimensions.width
                  )}
                  title={"Join the Discord"}
                  icon={"MaterialCommunityIcons/discord"}
                />
              </View>
            </View>
          </View>

          <View
            style={StyleSheet.applyWidth(
              { alignItems: "center" },
              dimensions.width
            )}
          >
            {/* Sign Out */}
            <Button
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: "toggleMenuModal",
                    value: false,
                  });
                  setGlobalVariableValue({
                    key: "toggleSignOutActionSheet",
                    value: true,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors.divider,
                  borderRadius: 8,
                  color: theme.colors.backgroundInverseMainFont,
                  fontFamily: "System",
                  fontSize: 16,
                  fontWeight: "700",
                  textAlign: "center",
                },
                dimensions.width
              )}
              title={"Sign Out"}
            />
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(ChatsScreen);
