import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useStreamChatTheme } from "../useStreamChatTheme.js";
import {
  OverlayProvider,
  Streami18n,
  Chat,
  MessageActionListItem,
} from "stream-chat-expo";

const useClient = ({ apiKey, userData, tokenOrProvider }) => {
  const [chatClient, setChatClient] = React.useState(null);

  React.useEffect(() => {
    const client = new StreamChat(apiKey);
    // prevents application from setting stale client (user changed, for example)
    let didUserConnectInterrupt = false;

    const connectionPromise = client
      .connectUser(userData, tokenOrProvider)
      .then(() => {
        if (!didUserConnectInterrupt) setChatClient(client);
      })
      .catch((e) => console.log(e.message));

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(null);
      // wait for connection to finish before initiating closing sequence
      connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log("connection closed");
        });
    };
  }, [apiKey, userData.id, tokenOrProvider]);

  return chatClient;
};
// import { MessageActionListItem, OverlayProvider, useMessageActionAnimation } from 'stream-chat-react-native';

const CustomMessageActionListItem = ({ action, actionType, ...rest }) => {
  if (actionType === "flagMessage") {
    return null;
  } else {
    return (
      <MessageActionListItem
        action={action}
        actionType={actionType}
        {...rest}
      />
    );
  }
};

export const Index = ({ APIKEY, USER, GSTOKEN, children }) => {
  const bottom = useSafeAreaInsets();
  const stheme = useStreamChatTheme();

  const chatClient = useClient({
    apiKey: APIKEY,
    userData: USER,
    tokenOrProvider: GSTOKEN,
  });
  const streami18n = new Streami18n({
    language: "en",
  });

  return chatClient ? (
    <OverlayProvider
      bottomInset={bottom}
      i18nInstance={streami18n}
      translucentStatusBar
      MessageActionListItem={CustomMessageActionListItem}
      value={{ style: stheme }}
    >
      <View style={{ flex: 1 }}>
        <Chat client={chatClient}>{children}</Chat>
      </View>
    </OverlayProvider>
  ) : (
    <View style={styles.Viewbf78ff24}>
      <ActivityIndicator
        style={styles.ActivityIndicator89fafeca}
        animating={true}
        hidesWhenStopped={true}
        size={"large"}
      />
    </View>
  );
};
const styles = () =>
  StyleSheet.create({
    ActivityIndicator89fafeca: { height: 36, width: 36 },
    View2200bac7: { height: "100%" },
    Viewbf78ff24: { alignItems: "center", flex: 1, justifyContent: "center" },
  });
