import React, { useState, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';

// Helpers & Utils

// Images & Icons
import BackIcon from 'assets/icons/back-arrow-blue.svg';

// Styles
import './index.scss';
import { ChatHeader } from './header';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { get_chat_thunk, get_messages_thunk } from 'store/chat-store/chat-thunk';
import { setCurrentChat, setMessages } from 'store/chat-store/chat-slice';

const Chat = () => {
  const dispatch = useAppDispatch();

  const { chatId } = useParams();

  const { current_chat } = useAppSelector((s) => s.chat);

  useEffect(() => {
    if (!current_chat || current_chat._id !== chatId) {
      dispatch(get_chat_thunk({ chat_id: chatId }));
    }
    dispatch(get_messages_thunk({ chat_id: chatId }));
  }, [chatId]);

  useEffect(() => {
    return () => {
      dispatch(setCurrentChat(undefined));
      dispatch(setMessages([]));
    };
  }, []);

  return (
    <View class_name="chat-container">
      <ChatHeader />
      <ChatMessages />
      <ChatInput onSubmit={(val) => setMessages((prev) => [val, ...prev])} />
    </View>
  );
};

export default Chat;
