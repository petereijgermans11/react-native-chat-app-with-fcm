/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { GiftedChat } from 'react-native-gifted-chat'

import { useState, useCallback, useEffect } from "react";
import messaging from '@react-native-firebase/messaging';

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

// Register background handler
// Get the notification
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Extract the body
  let message_body = remoteMessage.notification.body;
  // Extract the title
  let message_title = remoteMessage.notification.title;
  // Extract the notification image 
  let avatar = remoteMessage.notification.android.imageUrl;

  // Add the notification to the messages array
  setMessages(messages => GiftedChat.append(messages, {
    _id: Math.round(Math.random() * 1000000),
    text: message_body,
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Piet Hein 3.0",
      avatar: avatar,
    },
  }));

  // Send a notification alert
  Alert.alert(message_title, message_body);
});


const App: () => Node = () => {
  const [messages, setMessages] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Get the notification message
    const subscribe = messaging().onMessage(async remoteMessage => {

      // Get the message body
      let message_body = remoteMessage.notification.body;

      // Get the message title
      let message_title = remoteMessage.notification.title;

      // Get message image
      let avatar = remoteMessage.notification.android.imageUrl;

      // Append the message to the current messages state
      setMessages(messages => GiftedChat.append(messages, {
        _id: Math.round(Math.random() * 1000000),
        text: message_body,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Jamed Bond 007",
          avatar: avatar,
        },
      }));

      // Show an alert to the user
      Alert.alert(message_title, message_body);
    });

    return subscribe;
  }, [messages]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello there',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'PartyA',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages)) // append the new message to present messages
  }, [])

  return (
    <GiftedChat
      backgroundColor={isDarkMode ? Colors.black : Colors.white}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
