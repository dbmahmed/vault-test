import React from "react";

import * as GlobalVariables from "../config/GlobalVariableContext";
import * as CustomPackages from "../custom-files/CustomPackages";

import { IconButton, CircleImage } from "@draftbit/ui";
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
} from "stream-chat-expo";
import { View, Text } from "react-native";

export const GSChat = ({ filters, theme }) => {
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
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
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
        </View>
      )}
      <View style={{ flex: 1 }}>
        {channel ? (
          <Channel
            channel={channel}
            keyboardVerticalOffset={120}
            thread={thread}
            threadList={!!thread}
          >
            {thread ? (
              <Thread />
            ) : (
              <>
                <MessageList onThreadSelect={setThread} />
                <MessageInput
                  additionalTextInputProps={{
                    autoFocus: false,
                    keyboardAppearance: "dark",
                  }}
                  // uploadNewImage={(image) => {}}
                />
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
