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
import Image from 'components/custom-components/Image';

export const ChatHeader = () => {
  const navigate = useNavigate();
  const { current_chat } = useAppSelector((s) => s.chat);
  return (
    <View class_name="chat-header ph-20u">
      <View class_name="pointer" onClick={() => navigate(-1)}>
        <Image src={current_chat?.resume_id?.picture} class_name="w-40 h-40 br-20 mr-10" />
      </View>
      <View class_name="fdc">
        <Text SubtitleM class_name="mb-5">
          {current_chat?.resume_id?.name}
        </Text>
        <View class_name="d-flex aic h-18">
          {/* <View class_name="mr-9 br-4 w-8 h-8" bg="green" />
          <Text SmallestL>в сети</Text> */}
        </View>
      </View>
    </View>
  );
};
