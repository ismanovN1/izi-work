import React, { useEffect, useState } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';

// Helpers & Utils

// Images & Icons
import BackIcon from 'assets/icons/back-arrow-blue.svg';

// Styles
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks';
import Image from 'components/custom-components/Image';
import BackButton from 'components/ui/BackButton';
import { user_is_online } from 'api/entities/employer/chat';

export const ChatHeader = () => {
  const navigate = useNavigate();
  const { current_chat } = useAppSelector((s) => s.chat);

  const [isOnline, setIsOnline] = useState(false);

  const check_user = () => {
    user_is_online(current_chat.waiter_id).then((res) => {
      if (res.status === 200) {
        setIsOnline(res.data);
      }
    });
  };

  useEffect(() => {
    if (current_chat?.waiter_id) {
      check_user();
      const id = setInterval(() => {
        check_user();
      }, 20000);

      return () => clearInterval(id);
    }
  }, [current_chat]);
  return (
    <View class_name="chat-header ph-20u">
      <BackButton class_name="mr-12" />
      <View class_name="pointer" onClick={() => navigate(-1)}>
        <Image src={current_chat?.resume_id?.picture} class_name="w-40 h-40 br-20 mr-10" />
      </View>
      <View class_name="fdc">
        <Text SubtitleM class_name="mb-5">
          {current_chat?.resume_id?.name}
        </Text>
        <View class_name="d-flex aic h-18">
          <View class_name="mr-9 br-4 w-8 h-8" bg={isOnline ? 'green' : 'red'} />
          <Text SmallestL>{isOnline ? 'в сети' : 'не в сети'}</Text>
        </View>
      </View>
    </View>
  );
};
