import React, { useCallback } from 'react';

// Components
import View from 'components/custom-components/View';
import Text from 'components/custom-components/Text';
import { MyMessage } from 'components/chat-components/my-message';
import { MeMessage } from 'components/chat-components/me-message';

// Helpers & Utils
import moment from 'moment';

// Images & Icons
import Image from 'components/custom-components/Image';

// Styles
import './index.scss';
import { useAppSelector } from 'hooks';
import { formatSalary } from 'helpers/common';
import { CREATE_MESSAGE } from 'store/chat-store/constants';
import { MoonLoader } from 'react-spinners';

export const ChatMessages: React.FC<any> = () => {
  const { loadings } = useAppSelector((s) => s.common);
  const { user } = useAppSelector((s) => s.auth);
  const { messages, current_chat } = useAppSelector((s) => s.chat);

  const FirstMessage = useCallback(() => {
    const message = messages[messages.length - 1];
    return (
      <MyMessage
        updated={moment(message?.created_at).format('HH:mm')}
        custom_element={
          <View maxWidth={312}>
            <View class_name="f-shrink-0 d-flex">
              <Image src={current_chat?.vacancy_id?.picture || ''} width={110} height={80} class_name="br-6 mr-18" />
              <View class_name="fdc mt-8">
                <Text DescriptionM>{current_chat?.vacancy_id?.category_name}</Text>
                <Text DescriptionB class_name="mt-4" red>
                  {formatSalary(current_chat?.vacancy_id?.salary_from, current_chat?.vacancy_id?.salary_to)}
                </Text>
              </View>
            </View>
            <Text Description class_name="mt-20">
              {message?.message}
            </Text>
          </View>
        }
        status={message?.unread ? 'unread' : 'readed'}
      />
    );
  }, [current_chat, messages]);

  return (
    <View class_name="chat-body scroll_bar_usual">
      {loadings[CREATE_MESSAGE] ? (
        <View class_name="pv-10 ph-15 full-w d-flex jce">
          <MoonLoader color="#038CA9" size={32} />
        </View>
      ) : null}
      {messages
        .slice(0, messages.length - 1)
        ?.map((item) =>
          item.user_id === user._id ? (
            <MyMessage
              key={item._id}
              message={item.message}
              updated={moment(item.created_at).format('hh:mm')}
              status={item.unread ? 'unread' : 'readed'}
            />
          ) : (
            <MeMessage key={item._id} message={item.message} updated={moment(item.created_at).format('HH:mm')} />
          ),
        )}
      <FirstMessage />
    </View>
  );
};
