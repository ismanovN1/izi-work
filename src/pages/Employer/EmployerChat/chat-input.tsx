import React, { useState, useEffect } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';

// Helpers & Utils

// Images & Icons
import SendIcon from 'assets/icons/send.svg';

// Styles
import './index.scss';
import Input from 'components/custom-components/Input';
import { useAppDispatch, useAppSelector } from 'hooks';
import { create_message_thunk } from 'store/chat-store/chat-thunk';
import { CREATE_MESSAGE } from 'store/chat-store/constants';
import { removeSuccess } from 'store/common-store/common-slice';

export const ChatInput: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const { current_chat } = useAppSelector((s) => s.chat);
  const { loadings } = useAppSelector((s) => s.common);
  const [value, setValue] = useState('');

  return (
    <View class_name="chat-footer ph-20u">
      <Input
        class_name="f-grow-1"
        placeholder="Написать сообщение"
        value={value}
        disabled={loadings[CREATE_MESSAGE]}
        onChange={(e) => setValue(e.target.value)}
      />
      <View
        class_name={`send-button ${value && current_chat?._id && !loadings[CREATE_MESSAGE] ? '' : 'disabled'}`}
        onClick={() => {
          if (value.trim()) {
            dispatch(
              create_message_thunk(
                { chat_id: current_chat?._id, message: value, to_whom: current_chat.waiter_id },
                () => setValue(''),
              ),
            );
          }
        }}
      >
        <SendIcon />
      </View>
    </View>
  );
};
