import React, { useState, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';

// Helpers & Utils

// Images & Icons
import BackIcon from 'assets/icons/back-arrow-blue.svg';

// Styles
import { ChatHeader } from './header';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_chat_thunk, get_messages_thunk } from 'store/chat-store/chat-thunk';
import { setCurrentChat, setMessages } from 'store/chat-store/chat-slice';

const ChatBody = () => {
  const dispatch = useAppDispatch();

  const { chatId } = useParams();

  useEffect(() => {
    if (chatId) {
      dispatch(get_chat_thunk({ chat_id: chatId }));
      dispatch(get_messages_thunk({ chat_id: chatId }));
    }
  }, [chatId]);

  useEffect(() => {
    return () => {
      dispatch(setCurrentChat(undefined));
      dispatch(setMessages([]));
    };
  }, []);

  return (
    <View class_name="employer-chat-container card ml-20" width={510}>
      <ChatHeader />
      <ChatMessages />
      <ChatInput onSubmit={(val) => setMessages((prev) => [val, ...prev])} />
    </View>
  );
};

export default ChatBody;
