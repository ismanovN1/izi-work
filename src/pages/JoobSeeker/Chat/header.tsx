import React from 'react';

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

export const ChatHeader = () => {
  const navigate = useNavigate();
  const { current_chat } = useAppSelector((s) => s.chat);
  return (
    <View class_name="chat-header ph-20u">
      <View class_name="pointer pr-18" onClick={() => navigate(-1)}>
        <BackIcon />
      </View>
      <View class_name="fdc">
        <Text SubtitleM class_name="mb-5">
          {current_chat?.vacancy_id?.category_name}
        </Text>
        <View class_name="d-flex aic h-18">
          {/* <View class_name="mr-9 br-4 w-8 h-8" bg="green" />
          <Text SmallestL>в сети</Text> */}
        </View>
      </View>
    </View>
  );
};
