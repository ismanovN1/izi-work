/* eslint-disable react/prop-types */
import { API_URL, BASE_URL } from 'api/init';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { addMessage, incCountUnreadMessages, mark_as_read } from 'store/chat-store/chat-slice';

const SocketWrapper = ({ children }) => {
  const socket = useRef(null);

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((s) => s.auth);
  const { current_chat } = useAppSelector((s) => s.chat);

  useEffect(() => {
    if (user?._id) {
      socket.current = io(BASE_URL, {
        transports: ['websocket'],
        secure: true,
        query: { user_id: user._id },
      });

      return () => {
        socket.current.disconnect();
      };
    }
  }, [user]);

  const onMessageCreated = (message) => {
    if (current_chat && current_chat._id === message.chat_id) {
      dispatch(addMessage(message));

      socket.current?.emit('message:confirm', {
        chat_id: message.chat_id,
        to_whom: message.user_id,
        is_employer: !!user?.is_employer,
      });
    } else {
      dispatch(incCountUnreadMessages(message.chat_id));
    }
  };

  const onMessageReaded = (id) => {
    if (current_chat && current_chat._id === id) {
      dispatch(mark_as_read());
    }
  };

  useEffect(() => {
    socket.current?.on('message:created', onMessageCreated);
    socket.current?.on('message:readed', onMessageReaded);
    return () => {
      socket.current?.off('message:created', onMessageCreated);
      socket.current?.off('message:readed', onMessageReaded);
    };
  }, [current_chat]);

  return <>{children}</>;
};

export default SocketWrapper;
