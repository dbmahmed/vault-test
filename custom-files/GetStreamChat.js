// This import is required if you are defining react components in this module.
/*
import React from 'react';

import * as GlobalVariables from '../config/GlobalVariableContext';

import { IconButton, Surface, Divider, CircleImage } from '@draftbit/ui';
import {
  OverlayProvider,
  Streami18n,
  Chat,
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
} from 'stream-chat-expo';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStreamChatTheme } from '../useStreamChatTheme.js';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { StreamChat } from 'stream-chat';

const useClient = ({ apiKey, userData, tokenOrProvider }) => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const client = new StreamChat(apiKey);
    // prevents application from setting stale client (user changed, for example)
    let didUserConnectInterrupt = false;

    const connectionPromise = client
      .connectUser(userData, tokenOrProvider)
      .then(() => {
        if (!didUserConnectInterrupt) setChatClient(client);
      })
      .catch(e => console.log(e.message));

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(null);
      // wait for connection to finish before initiating closing sequence
      connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log('connection closed');
        });
    };
  }, [apiKey, userData.id, tokenOrProvider]);

  return chatClient;
};

export const GSChat = ({ APIKEY, USER, GSTOKEN, filters, theme }) => {
  const bottom = useSafeAreaInsets();
  const stheme = useStreamChatTheme();
  // const [channel, setChannel] = useState();
  // const [thread, setThread] = useState();
  const Variables = GlobalVariables.useValues();
  const setVariables = GlobalVariables.useSetValue();

  const channel = Variables['CHANNEL'];
  const thread = Variables['THREAD'];

  const setChannel = ch => setVariables({ key: 'CHANNEL', value: ch });
  const setThread = th => setVariables({ key: 'THREAD', value: th });

  const onBackPress = () => {
    if (thread) {
      setThread(undefined);
    } else if (channel) {
      setChannel(undefined);
    }
  };

  const streami18n = new Streami18n({
    language: 'en',
  });

  const chatClient = useClient({
    apiKey: APIKEY,
    userData: USER,
    tokenOrProvider: GSTOKEN,
  });

  const sort = { last_message_at: -1 };
  const options = {
    state: true,
    watch: true,
  };

  return chatClient ? (
    <OverlayProvider
      bottomInset={bottom}
      i18nInstance={streami18n}
      translucentStatusBar
      value={{ style: stheme }}
    >
      <>
        {!channel ? null : (
          <Surface
            // The shadow of this surface won't show up unless the background of
            // the chat is made to be transparent. However that creates issues
            // elsewhere. I'm keeping this here in case we find a solution someday.
            style={{
              backgroundColor: '#242323',
            }}
            elevation={3}
          >
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: "space-between",
                alignItems: 'center',
                height: 50,
                paddingRight: 16,
                //padding: 16
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
                style={styles(theme).IconButtonb180632a}
                size={35}
                icon={'Ionicons/ios-chevron-back'}
                color={theme.colors['Light']}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <CircleImage size={38} source={{ uri: channel.data?.image }} />
                <Text
                  style={{
                    color: '#F2F2F2',
                    marginLeft: 16,
                    fontWeight: 'bold',
                  }}
                >
                  {channel.data.name}
                </Text>
              </View>
            </View>
            <Divider
              style={{
                height: 1,
              }}
              color={'#3A3838'}
            />
          </Surface>

          // Old version of the layout below (New version above)
          // <View
          //   style={{
          //     flexDirection: "row",
          //     // justifyContent: "space-between",
          //     alignItems: "center",
          //     padding: 16,
          //   }}
          // >
          //   <IconButton
          //     onPress={() => {
          //       try {
          //         onBackPress();
          //       } catch (err) {
          //         console.error(err);
          //       }
          //     }}
          //     style={styles(theme).IconButtonb180632a}
          //     size={32}
          //     icon={"Ionicons/arrow-back"}
          //     color={theme.colors["Light"]}
          //   />
          //   <View
          //     style={{
          //       flexDirection: "row",
          //       // alignItems: "center",
          //     }}
          //   >
          //     <CircleImage size={32} source={{ uri: channel.data?.image }} />
          //     <Text
          //       style={{
          //         color: "white",
          //         marginLeft: 16,
          //       }}
          //     >
          //       {channel.data.name}
          //     </Text>
          //   </View>
          // </View>
        )}
      </>
      <View style={{ flex: 1 }}>
        <Chat client={chatClient}>
          {channel ? (
            <Channel
              channel={channel}
              keyboardVerticalOffset={100}
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
                    }}
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
        </Chat>
      </View>
    </OverlayProvider>
  ) : (
    <View style={styles.Viewbf78ff24}>
      <ActivityIndicator
        style={styles.ActivityIndicator89fafeca}
        animating={true}
        hidesWhenStopped={true}
        size={'large'}
      />
    </View>
  );
};

const styles = theme =>
  StyleSheet.create({
    ActivityIndicator89fafeca: { height: 36, width: 36 },
    View2200bac7: { height: '100%' },
    Viewbf78ff24: { alignItems: 'center', flex: 1, justifyContent: 'center' },
    IconButtonb180632a: {
      paddingTop: 7,
      paddingBottom: 7,
      marginRight: 16,
      //marginTop: 16,
    },
  });
*/
