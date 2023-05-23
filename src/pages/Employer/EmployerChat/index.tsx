import React from 'react';

// Components
import View from 'components/custom-components/View';
import { Outlet, useMatch } from 'react-router-dom';

// helpers
import { screen_height } from 'helpers/common';
import ChatList from './chat_list';

import './index.scss';

const EmployerChat = () => {
  const chat_list = useMatch('/chat');

  // Selectors

  return (
    <View class_name="full-width d-flex aifs employer-chat">
      <View width={125} class_name="f-shrink-1 " />
      <View
        card
        width={275}
        height={screen_height - 180}
        class_name={`f-shrink-0 p-10 mt-60 employer-chat-list-container ${!chat_list ? 'd-none-on-mobile' : ''}`}
      >
        <ChatList />
      </View>
      <View height={screen_height - 180} width="100%" class_name="mt-60">
        <Outlet />
      </View>
      <View width={125} class_name="f-shrink-1" />
    </View>
  );
};

export default EmployerChat;
