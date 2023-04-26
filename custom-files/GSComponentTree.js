import React from "react";

import * as GlobalVariables from "../config/GlobalVariableContext";
import * as CustomPackages from "../custom-files/CustomPackages";

import { IconButton, CircleImage, Touchable } from "@draftbit/ui";
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  messageActions as defaultActions,
  User as UserIcon,
} from "stream-chat-expo";
import { View, Text } from "react-native";

export const GSChat = ({ filters, theme, navigation }) => {
  const Variables = GlobalVariables.useValues();
  const setVariables = GlobalVariables.useSetValue();
  const headerHeight = CustomPackages.useHeaderHeight();
  const { setTopInset } = CustomPackages.useAttachmentPickerContext();

  React.useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight]);

  const channel = Variables["CHANNEL"];
  const thread = Variables["THREAD"];

  const setChannel = (ch) => setVariables({ key: "CHANNEL", value: ch });
  const setThread = (th) => setVariables({ key: "THREAD", value: th });

  const onBackPress = () => {
    if (thread) {
      setThread(undefined);
    } else if (channel) {
      setChannel(undefined);
    }
  };

  const customChannelFilterFunction = (channels) => {
    // setTestText(JSON.stringify(channels));
    return channels;
    // return channels.filter(/** your custom filter logic */);
  };
  const isMember = channel?.state.membership.role === "member";

  const sort = { last_message_at: -1 };
  const options = {
    state: true,
    watch: true,
  };

  return (
    <>
      {!channel ? null : (
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <IconButton
            onPress={() => {
              try {
                onBackPress();
              } catch (err) {
                console.error(err);
              }
            }}
            size={32}
            icon={"Ionicons/arrow-back"}
            color={theme.colors["Light"]}
          />

          <Touchable
            onPress={() => {
              // console.log("channel role", channel?.state.membership.role);
              navigation.navigate("SettingsBetaScreen");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CircleImage size={32} source={{ uri: channel.data?.image }} />
              <Text
                style={{
                  color: "white",
                  marginLeft: 16,
                }}
              >
                {channel.data.name}
              </Text>
            </View>
          </Touchable>
        </View>
      )}
      <View style={{ flex: 1 }}>
        {channel ? (
          <Channel
            channel={channel}
            keyboardVerticalOffset={120}
            thread={thread}
            threadList={!!thread}
            messageActions={(param) => {
              const { message, dismissOverlay, isMyMessage } = param;
              const actions = defaultActions({ ...param });
              if (!isMyMessage)
                actions.push({
                  action: async () => {
                    // dismiss;
                    dismissOverlay();
                    console.log("go to user id", message.user.id);
                    navigation.navigate("SettingsBetaScreen");
                  },
                  actionType: "seeProfile",
                  title: "See Profile",
                  icon: <UserIcon />,
                });
              return actions;
            }}
          >
            {thread ? (
              <Thread />
            ) : (
              <>
                <MessageList onThreadSelect={setThread} />
                {(!Variables.READ_ONLY_GS_CHANNELS.includes(channel.data.id) ||
                  !isMember) && (
                  <MessageInput
                    additionalTextInputProps={{
                      autoFocus: false,
                      keyboardAppearance: "dark",
                    }}
                    // uploadNewImage={(image) => {}}
                  />
                )}
              </>
            )}
          </Channel>
        ) : (
          <ChannelList
            onSelect={setChannel}
            filters={filters}
            sort={sort}
            options={options}
          />
        )}
      </View>
    </>
  );
};
