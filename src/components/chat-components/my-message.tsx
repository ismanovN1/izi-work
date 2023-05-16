/* eslint-disable react/display-name */
import React from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';

// Icons
import UnreadIcon from 'assets/icons/unread.svg';
import ReadedIcon from 'assets/icons/readed.svg';

// Styles

import './index.scss';
import { useCallback } from 'react';

type statusT = 'pending' | 'unread' | 'readed';

type propsType = {
  message?: string;
  custom_element?: React.ReactNode;
  status?: statusT;
  updated: string;
  for_employer?: boolean;
};

const getIconByStatus = (status: statusT) => {
  switch (status) {
    case 'unread':
      return <UnreadIcon />;
    case 'readed':
      return <ReadedIcon />;

    default:
      return (
        <Text Small grey>
          ⏱
        </Text>
      );
  }
};

const MyMessage: React.FC<propsType> = ({ custom_element, message, status, updated, for_employer }) => {
  const RenderMessage = useCallback(() => {
    return (
      <View class_name={`my-message-container ${for_employer ? 'jcs' : ''}`}>
        <View class_name="my-message-inner-container">
          {custom_element}
          <View maxWidth={265}>
            <Text Description>{message}</Text>
          </View>
          <View class_name="full-width d-flex jce mt-4 aic">
            <Text Smallest grey class_name="mr-5">
              {updated}
            </Text>
            {getIconByStatus(status)}
          </View>
        </View>
        <div className="vector my-vector">
          <div />
        </div>
      </View>
    );
  }, [status]);

  return <RenderMessage />;
};

export { MyMessage };
