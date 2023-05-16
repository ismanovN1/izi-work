/* eslint-disable react/prop-types */
import { API_URL } from 'api/init';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { addMessage } from 'store/chat-store/chat-slice';
const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8001' : 'https://izi-work-prod.onrender.com';

const SocketWrapper = ({ children }) => {
  const socket = useRef(null);

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((s) => s.auth);
  const { current_chat } = useAppSelector((s) => s.chat);

  useEffect(() => {
    if (user?._id) {
      socket.current = io(url, {
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
        is_employer: !!user?.is_employer,
      });
    }
  };

  useEffect(() => {
    socket.current?.on('message:created', onMessageCreated);
    return () => {
      socket.current?.off('message:created', onMessageCreated);
    };
  }, [current_chat]);

  return <>{children}</>;
};

export default SocketWrapper;
